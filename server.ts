import express, { type Request, type Response } from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Initialize Supabase (Server-side)
const supabaseUrl = process.env.VITE_SUPABASE_URL || "";
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(express.json());

type ImpactRecord = {
  id: string;
  created_at: string;
  co2_saved_kg: number;
  waste_diverted_kg: number;
  tree_id: string | null;
};

type ImpactStats = {
  totalCo2: number;
  totalWaste: number;
  treeCount: number;
  credits: number;
  records: ImpactRecord[];
};

const emptyStats: ImpactStats = {
  totalCo2: 0,
  totalWaste: 0,
  treeCount: 0,
  credits: 0,
  records: []
};

const demoRecords: ImpactRecord[] = [
  { id: "mock-record-1", created_at: "2026-04-18T09:00:00.000Z", co2_saved_kg: 7.6, waste_diverted_kg: 2.3, tree_id: "tree-1" },
  { id: "mock-record-2", created_at: "2026-04-15T09:00:00.000Z", co2_saved_kg: 5.9, waste_diverted_kg: 1.9, tree_id: null },
  { id: "mock-record-3", created_at: "2026-04-12T09:00:00.000Z", co2_saved_kg: 8.2, waste_diverted_kg: 2.8, tree_id: "tree-2" },
  { id: "mock-record-4", created_at: "2026-04-09T09:00:00.000Z", co2_saved_kg: 6.4, waste_diverted_kg: 2.1, tree_id: null },
  { id: "mock-record-5", created_at: "2026-04-06T09:00:00.000Z", co2_saved_kg: 9.1, waste_diverted_kg: 3.0, tree_id: "tree-3" }
];

const demoStats: ImpactStats = {
  totalCo2: demoRecords.reduce((sum, record) => sum + record.co2_saved_kg, 0),
  totalWaste: demoRecords.reduce((sum, record) => sum + record.waste_diverted_kg, 0),
  treeCount: demoRecords.filter((record) => Boolean(record.tree_id)).length,
  credits: demoRecords.reduce((sum, record) => sum + record.co2_saved_kg, 0) / 1000,
  records: demoRecords
};

const loggedNotices = new Set<string>();

function logNoticeOnce(key: string, message: string) {
  if (loggedNotices.has(key)) return;
  loggedNotices.add(key);
  console.log(message);
}

function isMissingTableError(error: { code?: string; message?: string } | null | undefined) {
  if (!error) return false;

  const normalizedMessage = JSON.stringify(error).toLowerCase();

  return (
    error.code === "PGRST205" ||
    error.code === "42P01" ||
    normalizedMessage.includes("schema cache") ||
    normalizedMessage.includes("could not find the table") ||
    normalizedMessage.includes("relation") && normalizedMessage.includes("does not exist") ||
    normalizedMessage.includes("esg_records")
  );
}

function getAccessToken(req: Request) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return null;
  return header.slice("Bearer ".length).trim();
}

async function getAuthenticatedUserId(req: Request) {
  const accessToken = getAccessToken(req);
  if (!accessToken) return null;

  const { data, error } = await supabase.auth.getUser(accessToken);
  if (error || !data.user) return null;

  return data.user.id;
}

async function getImpactStatsForUser(userId: string): Promise<ImpactStats> {
  const [{ data: records, error: recordsError }, { data: ledger, error: ledgerError }] = await Promise.all([
    supabase.from("esg_records").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
    supabase.from("carbon_ledger").select("credits_earned").eq("user_id", userId)
  ]);

  if (recordsError || ledgerError) {
    throw recordsError || ledgerError;
  }

  const safeRecords = Array.isArray(records) ? records : [];
  const safeLedger = Array.isArray(ledger) ? ledger : [];

  return {
    totalCo2: safeRecords.reduce((sum, record) => sum + Number(record.co2_saved_kg || 0), 0),
    totalWaste: safeRecords.reduce((sum, record) => sum + Number(record.waste_diverted_kg || 0), 0),
    treeCount: safeRecords.filter((record) => Boolean(record.tree_id)).length,
    credits: safeLedger.reduce((sum, entry) => sum + Number(entry.credits_earned || 0), 0),
    records: safeRecords
  };
}

// API Routes: Production ESG Engine
// Create Order & Impact Logic
app.post("/api/orders/create", async (req, res) => {
  const authenticatedUserId = await getAuthenticatedUserId(req);
  const { productId, quantity } = req.body ?? {};

  if (!authenticatedUserId) {
    return res.status(401).json({ error: "Please sign in to create an order." });
  }

  const normalizedQuantity = Number(quantity);
  if (!productId || !Number.isInteger(normalizedQuantity) || normalizedQuantity <= 0) {
    return res.status(400).json({ error: "A valid product and quantity are required." });
  }

  try {
    // 1. Get Product CO2 Factors
    const { data: product, error: pError } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();

    if (pError || !product) throw new Error("Product not found");

    const totalPrice = Number(product.base_price) * normalizedQuantity;
    const co2Saved = Number(product.co2_factor) * normalizedQuantity;
    const wasteDiverted = Number(product.waste_factor) * normalizedQuantity;

    // 2. Create Order
    const { data: order, error: oError } = await supabase
      .from("orders")
      .insert({
        user_id: authenticatedUserId,
        product_id: productId,
        quantity: normalizedQuantity,
        total_price: totalPrice
      })
      .select()
      .single();

    if (oError) throw oError;

    // 3. Assign Tree
    const { data: tree, error: tError } = await supabase
      .from("trees")
      .insert({
        user_id: authenticatedUserId,
        location: "Agra Reforest Zone B-12",
        status: "seed"
      })
      .select()
      .single();

    if (tError) throw tError;

    // 4. Record ESG Impact
    const { error: eError } = await supabase
      .from("esg_records")
      .insert({
        order_id: order.id,
        user_id: authenticatedUserId,
        co2_saved_kg: co2Saved,
        waste_diverted_kg: wasteDiverted,
        tree_id: tree.id
      });

    if (eError) throw eError;

    // 5. Update Carbon Ledger (1 credit = 1000kg)
    const creditsEarned = co2Saved / 1000;
    const { error: lError } = await supabase
      .from("carbon_ledger")
      .insert({
        user_id: authenticatedUserId,
        credits_earned: creditsEarned,
        source_order_id: order.id
      });

    if (lError) throw lError;

    res.json({ success: true, orderId: order.id, impact: { co2Saved, creditsEarned } });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

async function handleImpactRequest(req: Request, res: Response) {
  const useDemoFallback = req.query.demo === "true";
  const authenticatedUserId = await getAuthenticatedUserId(req);
  const requestedUserId = req.params.userId;

  try {
    if (!authenticatedUserId) {
      return res.json(useDemoFallback ? demoStats : emptyStats);
    }

    if (requestedUserId && requestedUserId !== authenticatedUserId) {
      return res.status(403).json({ error: "You can only view your own impact data." });
    }

    const stats = await getImpactStatsForUser(authenticatedUserId);
    return res.json(stats);
  } catch (error: any) {
    if (isMissingTableError(error)) {
      logNoticeOnce("missing-impact-tables", "Notice: Supabase impact tables are not set up yet. Falling back to demo or empty dashboard data.");
      return res.json(useDemoFallback ? demoStats : emptyStats);
    }

    if (useDemoFallback) {
      return res.json(demoStats);
    }

    console.error("Impact API error:", error.message);
    return res.json(emptyStats);
  }
}

// Fetch Comprehensive Impact Stats
app.get("/api/impact", handleImpactRequest);
app.get("/api/impact/:userId", handleImpactRequest);

// Seed Data Endpoint (Utility)
app.post("/api/admin/seed", async (req, res) => {
  const userId = "00000000-0000-0000-0000-000000000000";
  
  try {
    // 1. Get a product ID
    const { data: product } = await supabase.from("products").select("id").limit(1).single();
    if (!product) throw new Error("Please run the SQL schema first to add products.");

    // 2. Generate 10 entries
    for (let i = 0; i < 10; i++) {
      const co2 = (Math.random() * 10 + 2).toFixed(1);
      const waste = (Math.random() * 5 + 1).toFixed(1);
      
      // Create Order
      const { data: order } = await supabase.from("orders").insert({
        user_id: userId,
        product_id: product.id,
        quantity: 1,
        total_price: 5000
      }).select().single();

      if (order) {
        // Create Tree
        const { data: tree } = await supabase.from("trees").insert({
          user_id: userId,
          location: `Agra Zone ${String.fromCharCode(65 + i)}-${i}`,
          status: i > 5 ? "sapling" : "seed"
        }).select().single();

        // Create ESG Record
        await supabase.from("esg_records").insert({
          order_id: order.id,
          user_id: userId,
          co2_saved_kg: parseFloat(co2),
          waste_diverted_kg: parseFloat(waste),
          tree_id: tree?.id
        });

        // Update Ledger
        await supabase.from("carbon_ledger").insert({
          user_id: userId,
          credits_earned: parseFloat(co2) / 1000,
          source_order_id: order.id
        });
      }
    }

    res.json({ success: true, message: "10 impact records seeded for dummy user." });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

const sampleProducts = [
  { name: "Eco-Luxury Leather Wallet", category: "Men's Fold Wallet", description: "Minimalist bifold wallet crafted from 100% recovered UP leather waste.", base_price: 45, co2_factor: 1.2, waste_factor: 0.15, image_url: "/images/products/wallet-classic.jpg" },
  { name: "Mosaic Zip Wallet", category: "Women's Zip Wallet", description: "Elegant zip-around wallet featuring our signature kaleidoscope mosaic pattern.", base_price: 55, co2_factor: 1.5, waste_factor: 0.2, image_url: "/images/products/wallet-zip.jpg" },
  { name: "Urban Backpack", category: "Bags", description: "Durable and water-resistant backpack made for city life, structured with circular leather.", base_price: 180, co2_factor: 6.8, waste_factor: 1.2, image_url: "/images/products/urban-backpack.jpg" },
  { name: "Executive Tote", category: "Ladies' Handbag", description: "Spacious luxury tote bag that breathes new life into discarded industrial leather.", base_price: 210, co2_factor: 8.5, waste_factor: 1.5, image_url: "/images/products/executive-tote.jpg" },
  { name: "Classic Comfort Loafer", type: "Loafer", category: "Footwear", description: "A timeless loafer silhouette engineered for all-day verified comfort.", base_price: 120, co2_factor: 5.5, waste_factor: 1.0, image_url: "/images/products/loafer.jpg" },
  { name: "Semi-Formal Derby", category: "Footwear", description: "The perfect balance between business and casual, upcycled for the modern professional.", base_price: 130, co2_factor: 6.0, waste_factor: 1.1, image_url: "/images/products/derby.jpg" },
  { name: "Signature Sneaker", category: "Footwear", description: "Everyday streetwear staple built securely on a foundation of reclaimed materials.", base_price: 95, co2_factor: 4.5, waste_factor: 0.8, image_url: "/images/products/signature-sneaker.jpg" },
  { name: "All-Weather Ankle Boot", category: "Footwear", description: "Rugged yet refined boot offering superior protection against the elements.", base_price: 160, co2_factor: 7.2, waste_factor: 1.4, image_url: "/images/products/ankle-boot.jpg" },
  { name: "Braided Keychain", category: "Accessories", description: "Hand-braided keychain crafted from the smallest offcuts, ensuring zero waste.", base_price: 25, co2_factor: 0.3, waste_factor: 0.05, image_url: "/images/products/braided-keychain.jpg" },
  { name: "Minimalist Cardholder", category: "Accessories", description: "Slim, pocket-friendly cardholder holding up to 6 cards.", base_price: 35, co2_factor: 0.5, waste_factor: 0.08, image_url: "/images/products/cardholder.jpg" }
];

app.get("/api/catalog", async (req, res) => {
  try {
    const { data: existing, error } = await supabase.from("products").select("*");
    
    if (error || !existing || existing.length < 5) {
      if (!error) {
        // Attempt to insert the sample products into the database if missing
        await supabase.from("products").insert(sampleProducts);
      }
      return res.json(sampleProducts); // Fallback
    }

    res.json(existing);
  } catch (err) {
    res.json(sampleProducts); // Error Fallback guarantee
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", supabase: supabaseUrl ? "configured" : "pending" });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", async () => {
    console.log(`EkoKintsugi Backend running on http://0.0.0.0:${PORT}`);
    
    // Background Auto-Seeder
    const dummyId = "00000000-0000-0000-0000-000000000000";
    try {
      const { count, error: countErr } = await supabase.from("esg_records").select("*", { count: "exact", head: true });
      if (countErr) {
        if (isMissingTableError(countErr)) {
          logNoticeOnce("missing-seed-tables", "Notice: Supabase tables pending setup. Auto-seeder paused until you run supabase_schema.sql.");
          return;
        }
        console.log("Notice: Auto-seeder paused due to a Supabase error.");
        return;
      }
      
      if (count === 0 || count === null) {
        console.log("ESG Database empty. Running auto-seeder...");
        const { data: product, error: pErr } = await supabase.from("products").select("id").limit(1).single();
        if (pErr) return;
        
        if (product) {
          for (let i = 0; i < 10; i++) {
            const co2 = (Math.random() * 8 + 3).toFixed(1);
            const waste = (Math.random() * 4 + 1).toFixed(1);
            
            const { data: order, error: oErr } = await supabase.from("orders").insert({
              user_id: dummyId, product_id: product.id, quantity: 1, total_price: 3500 + (i * 100)
            }).select().single();
            if (oErr) return;
            
            if (order) {
              const { data: tree, error: tErr } = await supabase.from("trees").insert({
                user_id: dummyId, location: `Agra Bio-Site ${i}`, status: i%2 === 0 ? "sapling" : "seed"
              }).select().single();
              if (tErr) return;
              
              const { error: eErr } = await supabase.from("esg_records").insert({
                order_id: order.id, user_id: dummyId, co2_saved_kg: parseFloat(co2), waste_diverted_kg: parseFloat(waste), tree_id: tree?.id
              });
              if (eErr) return;
              
              const { error: lErr } = await supabase.from("carbon_ledger").insert({
                user_id: dummyId, credits_earned: parseFloat(co2) / 1000, source_order_id: order.id
              });
              if (lErr) return;
            }
          }
          console.log("Auto-seeding complete.");
        }
      }
    } catch (err) {
      // Sliently skip if tables are not initialized
    }
  });
}

startServer();

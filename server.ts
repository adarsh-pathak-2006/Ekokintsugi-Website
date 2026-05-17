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
const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);
const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseKey) : null;

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
  if (!supabase) return null;

  const accessToken = getAccessToken(req);
  if (!accessToken) return null;

  const { data, error } = await supabase.auth.getUser(accessToken);
  if (error || !data.user) return null;

  return data.user.id;
}

async function getImpactStatsForUser(userId: string): Promise<ImpactStats> {
  if (!supabase) {
    return emptyStats;
  }

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
  if (!supabase) {
    return res.status(503).json({ error: "Supabase is not configured on the server yet." });
  }

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
  if (!supabase) {
    return res.status(503).json({ error: "Supabase is not configured on the server yet." });
  }

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
  { name: "Mosaic Sling Bag", category: "Bags", description: "Compact crossbody sling with reclaimed hexagon panels and a hands-free everyday profile.", base_price: 92, co2_factor: 3.8, waste_factor: 0.7, image_url: "/images/products/urban-backpack.jpg" },
  { name: "Mosaic Structured Tote", category: "Bags", description: "Clean-lined shoulder tote with a structured base, double handles, and premium circular leather construction.", base_price: 128, co2_factor: 4.6, waste_factor: 0.9, image_url: "/images/products/executive-tote.jpg" },
  { name: "Mosaic City Backpack", category: "Bags", description: "Medium-format backpack built for daily commuting with a mosaic upper and durable black trim.", base_price: 136, co2_factor: 4.9, waste_factor: 1.0, image_url: "/images/products/urban-backpack.jpg" },
  { name: "Mosaic Messenger Bag", category: "Bags", description: "Boxy messenger silhouette with flap closure for tablets, notebooks, and on-the-go essentials.", base_price: 118, co2_factor: 4.3, waste_factor: 0.8, image_url: "/images/products/executive-tote.jpg" },
  { name: "Mosaic Weekender Briefcase", category: "Bags", description: "Travel-ready briefcase with top handles and detachable strap for work trips and light overnights.", base_price: 154, co2_factor: 5.2, waste_factor: 1.1, image_url: "/images/products/urban-backpack.jpg" },
  { name: "Round Logo Keychain", category: "Accessories", description: "Round branded key fob in earthy leather tones, sized for everyday carry and gifting.", base_price: 18, co2_factor: 0.2, waste_factor: 0.04, image_url: "/images/products/braided-keychain.jpg" },
  { name: "Hexagon Patchwork Keychain", category: "Accessories", description: "Patchwork hexagon keychain cut from leather offcuts to celebrate zero-waste detailing.", base_price: 22, co2_factor: 0.2, waste_factor: 0.04, image_url: "/images/products/braided-keychain.jpg" },
  { name: "Signature Luggage Tag", category: "Accessories", description: "Slim travel tag with branded motif and reinforced loop for luggage, totes, or work bags.", base_price: 20, co2_factor: 0.2, waste_factor: 0.04, image_url: "/images/products/braided-keychain.jpg" },
  { name: "Mini Sneaker Keychain", category: "Accessories", description: "Collectible sneaker-shaped keychain that mirrors the brand's circular footwear design language.", base_price: 26, co2_factor: 0.3, waste_factor: 0.05, image_url: "/images/products/braided-keychain.jpg" },
  { name: "Teardrop Tree Keychain", category: "Accessories", description: "Teardrop keychain embossed with a tree mark, designed from compact reclaimed leather pieces.", base_price: 19, co2_factor: 0.2, waste_factor: 0.04, image_url: "/images/products/braided-keychain.jpg" },
  { name: "Forest Runner Sneaker", category: "Men's Footwear", description: "Athletic-inspired sneaker in moss and cocoa tones with lightweight comfort and mosaic side panels.", base_price: 112, co2_factor: 4.2, waste_factor: 0.9, image_url: "/images/products/signature-sneaker.jpg" },
  { name: "Graphite Runner Sneaker", category: "Men's Footwear", description: "Charcoal performance sneaker with a streamlined profile for versatile smart-casual wear.", base_price: 116, co2_factor: 4.3, waste_factor: 0.9, image_url: "/images/products/signature-sneaker.jpg" },
  { name: "Compact Zip Backpack", category: "Bags", description: "Slim backpack with front zip pocket, upright silhouette, and easy day-trip capacity.", base_price: 124, co2_factor: 4.4, waste_factor: 0.9, image_url: "/images/products/urban-backpack.jpg" },
  { name: "Mosaic Shopper Tote", category: "Bags", description: "Tall shopper tote with elongated handles for workday carry, retail presentation, and weekend movement.", base_price: 122, co2_factor: 4.5, waste_factor: 0.9, image_url: "/images/products/executive-tote.jpg" },
  { name: "Mosaic Crossbody Camera Bag", category: "Bags", description: "Compact zip crossbody with wide strap and boxy proportions for essentials-first daily use.", base_price: 94, co2_factor: 3.7, waste_factor: 0.7, image_url: "/images/products/executive-tote.jpg" },
  { name: "Mosaic Travel Duffel", category: "Bags", description: "Soft travel duffel with structured ends and generous storage for short stays and carry-on duty.", base_price: 168, co2_factor: 5.8, waste_factor: 1.2, image_url: "/images/products/urban-backpack.jpg" },
  { name: "Mosaic Belt Bag", category: "Bags", description: "Curved belt bag with front-facing style and lightweight convenience for urban movement.", base_price: 74, co2_factor: 2.9, waste_factor: 0.5, image_url: "/images/products/executive-tote.jpg" },
  { name: "Mosaic Laptop Briefcase", category: "Bags", description: "Professional briefcase with top handles, shoulder strap, and space for a laptop and documents.", base_price: 148, co2_factor: 5.0, waste_factor: 1.0, image_url: "/images/products/urban-backpack.jpg" },
  { name: "Patchwork Bifold Wallet", category: "Wallets & Cardholders", description: "Classic bifold wallet finished in warm patchwork leather blocks for a handcrafted premium look.", base_price: 42, co2_factor: 1.1, waste_factor: 0.14, image_url: "/images/products/wallet-classic.jpg" },
  { name: "Patchwork Cardholder", category: "Wallets & Cardholders", description: "Slim multi-slot cardholder with a compact footprint and color-blocked reclaimed leather face.", base_price: 28, co2_factor: 0.6, waste_factor: 0.08, image_url: "/images/products/cardholder.jpg" },
  { name: "Mosaic Bifold Wallet", category: "Wallets & Cardholders", description: "Everyday bifold wallet featuring a geometric mosaic pattern and practical bill-and-card organization.", base_price: 44, co2_factor: 1.2, waste_factor: 0.15, image_url: "/images/products/wallet-classic.jpg" },
  { name: "Patchwork Passport Holder", category: "Wallets & Cardholders", description: "Travel document holder with a vertical format designed for passports, tickets, and slim itineraries.", base_price: 38, co2_factor: 0.9, waste_factor: 0.12, image_url: "/images/products/wallet-zip.jpg" },
  { name: "Indigo Floral Ballet Flats", category: "Women's Footwear", description: "Ballet flats with indigo-toned floral patchwork, almond toe shape, and lightweight everyday comfort.", base_price: 86, co2_factor: 3.1, waste_factor: 0.6, image_url: "/images/products/loafer.jpg" },
  { name: "Espresso Floral Ballet Flats", category: "Women's Footwear", description: "Warm espresso floral flats designed to blend artisanal surface detail with easy slip-on wear.", base_price: 86, co2_factor: 3.1, waste_factor: 0.6, image_url: "/images/products/loafer.jpg" },
  { name: "Sand Floral Ballet Flats", category: "Women's Footwear", description: "Soft sand-colored ballet flats with floral patchwork panels suited to lighter seasonal wardrobes.", base_price: 84, co2_factor: 3.0, waste_factor: 0.6, image_url: "/images/products/loafer.jpg" },
  { name: "Meadow Floral Ballet Flats", category: "Women's Footwear", description: "Multicolor floral flats with a greener palette and flexible day-to-evening styling.", base_price: 88, co2_factor: 3.2, waste_factor: 0.6, image_url: "/images/products/loafer.jpg" },
  { name: "Sunrise Floral Ballet Flats", category: "Women's Footwear", description: "Bright floral flats with golden and amber patchwork accents for expressive casual dressing.", base_price: 88, co2_factor: 3.2, waste_factor: 0.6, image_url: "/images/products/loafer.jpg" }
];

app.get("/api/catalog", async (req, res) => {
  if (!supabase) {
    return res.json(sampleProducts);
  }

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
    if (!supabase) {
      console.log("Notice: Supabase environment variables are missing. API features that require Supabase will stay in fallback mode.");
      return;
    }
    
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

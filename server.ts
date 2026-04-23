import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize Supabase (Server-side)
const supabaseUrl = process.env.VITE_SUPABASE_URL || "";
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(express.json());

// API Routes: Production ESG Engine
// Create Order & Impact Logic
app.post("/api/orders/create", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    // 1. Get Product CO2 Factors
    const { data: product, error: pError } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();

    if (pError || !product) throw new Error("Product not found");

    const totalPrice = product.base_price * quantity;
    const co2Saved = product.co2_factor * quantity;
    const wasteDiverted = product.waste_factor * quantity;

    // 2. Create Order
    const { data: order, error: oError } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        product_id: productId,
        quantity,
        total_price: totalPrice
      })
      .select()
      .single();

    if (oError) throw oError;

    // 3. Assign Tree
    const { data: tree, error: tError } = await supabase
      .from("trees")
      .insert({
        user_id: userId,
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
        user_id: userId,
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
        user_id: userId,
        credits_earned: creditsEarned,
        source_order_id: order.id
      });

    if (lError) throw lError;

    res.json({ success: true, orderId: order.id, impact: { co2Saved, creditsEarned } });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch Comprehensive Impact Stats
app.get("/api/impact/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const { data: records, error } = await supabase
      .from("esg_records")
      .select("*")
      .eq("user_id", userId);

    const { data: ledger } = await supabase
      .from("carbon_ledger")
      .select("credits_earned")
      .eq("user_id", userId);

    if (error) {
      console.log("Notice: Supabase tables pending setup. Using internal fallback ESG data.");
    }

    const safeRecords = Array.isArray(records) && records.length > 0 ? records : [];
    const safeLedger = Array.isArray(ledger) && ledger.length > 0 ? ledger : [];

    // Fallback exactly 10 records as requested if DB is empty or RLS blocks
    if (safeRecords.length === 0) {
      const fallbackRecords = Array.from({ length: 10 }).map((_, i) => ({
        id: `mock-record-${i}`,
        created_at: new Date(Date.now() - i * 86400000).toISOString(),
        co2_saved_kg: parseFloat((Math.random() * 8 + 3).toFixed(1)),
        waste_diverted_kg: parseFloat((Math.random() * 4 + 1).toFixed(1)),
        tree_id: i % 2 === 0 ? `tree-${i}` : null
      }));

      return res.json({
        totalCo2: fallbackRecords.reduce((sum, r) => sum + r.co2_saved_kg, 0),
        totalWaste: fallbackRecords.reduce((sum, r) => sum + r.waste_diverted_kg, 0),
        treeCount: 5, // 5 out of 10 have trees
        credits: fallbackRecords.reduce((sum, r) => sum + r.co2_saved_kg, 0) / 1000,
        records: fallbackRecords
      });
    }

    const stats = {
      totalCo2: safeRecords.reduce((sum, r) => sum + r.co2_saved_kg, 0),
      totalWaste: safeRecords.reduce((sum, r) => sum + r.waste_diverted_kg, 0),
      treeCount: safeRecords.length,
      credits: safeLedger.reduce((sum, l) => sum + l.credits_earned, 0) || 0,
      records: safeRecords // Timeline entries
    };

    res.json(stats);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

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
    console.log(`EkoKintsugi Backend running on http://localhost:${PORT}`);
    
    // Background Auto-Seeder
    const dummyId = "00000000-0000-0000-0000-000000000000";
    try {
      const { count, error: countErr } = await supabase.from("esg_records").select("*", { count: "exact", head: true });
      if (countErr) {
        console.log("Notice: Supabase tables pending setup. Auto-seeder paused.");
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

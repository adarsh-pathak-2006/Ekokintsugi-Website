import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ChevronRight, ShieldCheck, TreePine, Leaf, Sparkles, ShoppingBag, UserRound } from "lucide-react";
import { useProductsCatalog } from "../hooks/useProductsCatalog";
import { useCart } from "../lib/CartContext";
import { useAuth } from "../lib/AuthContext";
import ProductCatalogueGrid from "../components/ProductCatalogueGrid";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { products, isLoading, error } = useProductsCatalog();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const product = products.find((p) => String(p.id) === String(id));

  // Determine circular sourcing details based on name/category
  const getSourcingDetails = (category = "") => {
    const cat = category.toLowerCase();
    if (cat.includes("footwear") || cat.includes("flat") || cat.includes("sneaker")) {
      return "Constructed using premium leather offcuts from Indian artisan clusters, combined with natural crepe rubber outsoles. 100% traceably handcrafted.";
    }
    if (cat.includes("backpack") || cat.includes("bag")) {
      return "Made entirely from mosaic-stitched leather panels sourced from workshop excess. Built with circular heavy-duty hardware designed for easy disassembly.";
    }
    return "Crafted from precise leather offcuts salvaged from master artisan workshops in Uttar Pradesh. Minimizes even the smallest waste footmarks.";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/10 flex justify-center items-center py-20">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-muted/10 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-card border border-border/60 rounded-[2.5rem] p-10 md:p-14 shadow-soft text-center">
            <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-accent font-bold mb-4">
              Item Unavailable
            </p>
            <h1 className="text-4xl md:text-5xl font-serif text-primary font-bold mb-5">Product Not Found</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              This product may be temporarily out of stock or relocated. You can browse our main categories.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground px-7 py-3 text-[11px] font-mono tracking-[0.3em] uppercase font-bold hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back To Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Related products (same category, different id)
  const relatedProducts = products
    .filter((p) => p.category === product.category && String(p.id) !== String(id))
    .slice(0, 4);

  const co2Val = product.co2_factor ? parseFloat(String(product.co2_factor)) : 0;
  const wasteVal = product.waste_factor ? parseFloat(String(product.waste_factor)) : 0;

  return (
    <div className="py-20 min-h-screen bg-muted/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="mb-10 flex flex-wrap items-center gap-3 text-[10px] font-mono tracking-[0.35em] uppercase">
          <Link to="/products" className="text-muted-foreground hover:text-accent transition-colors">
            Products
          </Link>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">{product.category || "Item"}</span>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <span className="text-accent font-bold truncate max-w-48">{product.name}</span>
        </div>

        {/* Product Split Grid */}
        <section className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start mb-24">
          {/* Left Column: Image with Spring Zooms */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="bg-card border border-border/50 rounded-[2.55rem] overflow-hidden shadow-soft group hover:border-accent/30 transition-colors"
          >
            <div className="aspect-[4/3] bg-muted overflow-hidden relative">
              <motion.img
                src={product.image_url || product.image || "/logo_eko.png"}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Right Column: details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 25, delay: 0.1 }}
            className="flex flex-col space-y-8"
          >
            <div>
              <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-accent font-black block mb-3">
                {product.category || "Circular Collection"}
              </span>
              <h1 className="text-4xl md:text-5xl font-serif text-primary font-bold mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-muted-foreground italic leading-relaxed">
                {product.description || product.desc || "A masterpiece of circular utility and traceable craftsmanship."}
              </p>
            </div>

            {/* Circular Sourcing Breakdown */}
            <div className="bg-card border border-border/50 rounded-3xl p-6 shadow-sm flex gap-4">
              <ShieldCheck className="w-6 h-6 text-accent shrink-0 mt-1" />
              <div>
                <h4 className="text-xs font-mono tracking-widest text-primary font-bold uppercase mb-2">
                  Circular Materials & Sourcing
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {getSourcingDetails(product.category)}
                </p>
              </div>
            </div>

            {/* Circular Impact Panels */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-muted/30 border border-border/50 p-5 rounded-2xl flex items-center gap-4">
                <Leaf className="w-8 h-8 text-accent" />
                <div>
                  <p className="text-[9px] font-mono tracking-widest text-muted-foreground uppercase">CO2 Diverted</p>
                  <p className="text-xl font-serif font-bold text-primary">{co2Val.toFixed(1)} kg</p>
                </div>
              </div>
              <div className="bg-muted/30 border border-border/50 p-5 rounded-2xl flex items-center gap-4">
                <TreePine className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-[9px] font-mono tracking-widest text-muted-foreground uppercase">Waste Reclaimed</p>
                  <p className="text-xl font-serif font-bold text-primary">{wasteVal.toFixed(1)} kg</p>
                </div>
              </div>
            </div>

            {/* Add to Cart CTA */}
            <div className="pt-4 border-t border-border/50 space-y-4">
              {user ? (
                <motion.button
                  onClick={() => addToCart(product)}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="w-full flex items-center justify-center gap-3 rounded-full bg-accent text-accent-foreground px-8 py-4 font-mono text-[10px] tracking-widest uppercase font-black hover:bg-primary hover:text-primary-foreground transition-all shadow-md cursor-pointer group"
                >
                  <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
                  Add to Circular Selection
                </motion.button>
              ) : (
                <Link
                  to="/auth"
                  className="w-full flex items-center justify-center gap-3 rounded-full bg-primary text-primary-foreground px-8 py-4 font-mono text-[10px] tracking-widest uppercase font-black hover:bg-accent hover:text-accent-foreground transition-all shadow-md cursor-pointer group"
                >
                  <UserRound className="w-4 h-4 transition-transform group-hover:scale-110" />
                  Sign In To Access Cart
                </Link>
              )}
              <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground font-mono">
                <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
                <span>Supports immediate ecological restoration in rural craft zones.</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Related Products Recommendation */}
        {relatedProducts.length > 0 && (
          <section className="border-t border-border/50 pt-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-accent font-bold mb-3">
                  Circular Recommendations
                </p>
                <h2 className="text-3xl font-serif font-bold text-primary">Related Designs</h2>
              </div>
              <Link
                to="/products"
                className="inline-flex items-center gap-3 text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground hover:text-accent transition-colors font-bold"
              >
                <ArrowLeft className="w-4 h-4" />
                Explore All Products
              </Link>
            </div>

            <ProductCatalogueGrid
              products={relatedProducts}
              isLoading={false}
              error={null}
              emptyMessage="No related designs available."
            />
          </section>
        )}
      </div>
    </div>
  );
}

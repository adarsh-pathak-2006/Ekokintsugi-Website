import { motion } from "motion/react";
import { Euro, Box, Tag, PackageOpen, XCircle } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/catalog')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Products API returned unexpected data:", data);
          setProducts([]); 
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Could not fetch products", err);
        setProducts([]); 
        setIsLoading(false);
      });
  }, []);

  const filteredProducts = useMemo(() => {
    if (!categoryFilter) return products;
    return products.filter(p => 
      p.category?.toLowerCase().includes(categoryFilter.toLowerCase()) ||
      p.name?.toLowerCase().includes(categoryFilter.toLowerCase())
    );
  }, [products, categoryFilter]);

  const removeFilter = () => {
    setSearchParams({});
  };

  return (
    <div className="py-20 min-h-screen bg-muted/10">
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-20">
          <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-accent font-bold mb-4 block">RESCHUH Collections</span>
          <h1 className="text-5xl md:text-7xl font-serif text-primary font-bold mb-6">Sustainable Footwear Portfolio</h1>
          <p className="text-xl text-muted-foreground italic max-w-2xl mx-auto">
            Each shoe is made from production waste. Achieving 50–70% recycled leather content across multiple different designs.
          </p>
        </header>

        {/* Pricing Strategy */}
        <div className="bg-card border text-center border-border/50 p-12 rounded-[2.5rem] shadow-sm mb-20 grid md:grid-cols-2 gap-12">
           <div className="p-8 bg-primary text-white rounded-3xl relative overflow-hidden">
             <Euro className="w-10 h-10 text-accent mb-6 opacity-80" />
             <h3 className="text-2xl font-serif font-bold mb-2">Cost & Value</h3>
             <p className="text-5xl font-black mb-4 tracking-tighter">€20-€35</p>
             <p className="text-sm font-mono tracking-widest uppercase opacity-80">EU FOB Export Price</p>
           </div>
           
           <div className="flex flex-col justify-center text-left">
             <Tag className="w-8 h-8 text-primary mb-4" />
             <h3 className="text-2xl font-serif font-bold mb-2 text-primary">Retail Positioning</h3>
             <p className="text-4xl text-accent font-bold font-serif mb-3">€80 – €120</p>
             <p className="text-muted-foreground">
               This makes RESCHUH premium but highly affordable. Providing substantial higher-margin opportunities for our European distribution partners compared to competitors like Veja (€130-€170) and Allbirds (€110-€150).
             </p>
           </div>
        </div>

        {/* Product Catalogue */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-10 border-b border-border/50 pb-4">
            <PackageOpen className="text-accent shrink-0" />
            <h2 className="text-3xl font-serif font-bold text-primary flex-grow">
              {categoryFilter ? `Filtered: ${categoryFilter}` : "Core Lineup & Accessories"}
            </h2>
            {categoryFilter && (
              <button 
                onClick={removeFilter} 
                className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase font-bold text-muted-foreground hover:text-accent transition-colors"
                title="Clear Category Filter"
              >
                Clear Filter <XCircle className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-card rounded-[2rem] border border-border">
               <p className="text-muted-foreground font-mono">No products available for this category.</p>
               {categoryFilter && (
                 <button onClick={removeFilter} className="mt-4 px-6 py-2 bg-primary text-white rounded-full text-xs font-mono tracking-widest uppercase hover:bg-accent transition-colors">
                   View All Products
                 </button>
               )}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((item, idx) => (
                <motion.div 
                  key={item.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-card border border-border/50 rounded-[2rem] overflow-hidden group hover:border-accent/40 shadow-soft transition-all flex flex-col"
                >
                  <div className="aspect-[4/3] bg-muted overflow-hidden relative">
                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover grayscale opacity-80 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" />
                    <div className="absolute top-4 right-4 bg-background/90 backdrop-blur px-3 py-1.5 rounded-full border border-border shadow-sm">
                      <span className="font-serif font-bold text-primary">€{item.base_price}</span>
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <p className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold mb-2">{item.category}</p>
                    <h4 className="font-serif text-xl text-primary font-bold mb-3">{item.name}</h4>
                    <p className="text-sm text-muted-foreground italic flex-grow mb-4">{item.description}</p>
                    <div className="mt-auto flex justify-between items-center text-xs font-mono font-bold uppercase tracking-widest pt-4 border-t border-border">
                      <span className="text-accent opacity-70">CO₂: -{parseFloat(item.co2_factor).toFixed(1)}kg</span>
                      <span className="text-primary opacity-60">Waste: -{parseFloat(item.waste_factor).toFixed(1)}kg</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Kaleidoscope feature */}
        <div className="bg-primary p-12 lg:p-20 rounded-[3rem] text-white overflow-hidden relative flex flex-col md:flex-row items-center gap-12">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5">
             <div className="w-[800px] h-[800px] bg-accent rotate-45 -ml-64 -mt-64" />
          </div>
          <div className="relative z-10 w-full md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Future Designs</h2>
            <p className="text-xl italic opacity-80 mb-8">
              Unique kaleidoscope mosaic patterns for next season collections, leveraging geometric recycled leather sheet creation.
            </p>
            <div className="flex items-center gap-4 border border-white/20 p-4 rounded-xl max-w-fit">
              <Box className="text-accent w-6 h-6" />
              <span className="font-mono text-xs tracking-widest uppercase font-bold">In CAD Development</span>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative space-y-4">
             <div className="bg-white/10 p-4 rounded-2xl border border-white/20 shadow-lg backdrop-blur text-center font-mono text-sm">
                Kaleidoscopic Mosaic Sheets Engineered in Jharkhand
             </div>
             <div className="bg-white/10 p-4 rounded-2xl border border-white/20 shadow-lg backdrop-blur text-center font-mono text-sm ml-8">
                Assembled by Experienced Workforce in UP
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}

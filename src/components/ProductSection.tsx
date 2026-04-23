import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProductSection() {
  const navigate = useNavigate();

  const categories = [
    {
      id: "keychains",
      title: "Keychains",
      desc: "Delicate braided accessories crafted from the smallest offcuts, ensuring absolute zero waste while maintaining premium durability.",
      img: "/images/products/braided-keychain.jpg",
      query: "Keychains" // Using query param friendly strings, will match later
    },
    {
      id: "wallets",
      title: "Men's Wallets",
      desc: "Minimalist bifold and cardholders engineered for the modern professional, crafted from recovered industrial leather.",
      img: "/images/products/wallet-classic.jpg",
      query: "Wallet"
    },
    {
      id: "bags",
      title: "Bags",
      desc: "Durable, water-resistant backpacks structured with circular leather designed to withstand the intensity of city life.",
      img: "/images/products/urban-backpack.jpg",
      query: "Bags"
    },
    {
      id: "handbags",
      title: "Ladies' Handbags",
      desc: "Spacious luxury totes breathing new life into discarded material without compromising on high-fashion elegance.",
      img: "/images/products/executive-tote.jpg",
      query: "Handbag"
    }
  ];

  return (
    <section id="products" className="py-32 bg-primary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 text-primary-foreground">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-accent/20 border border-accent/30 text-accent font-bold">
            <span className="text-xs font-mono tracking-widest uppercase">Eko Luxury Collections</span>
          </div>
          <h2 className="text-5xl font-serif md:text-6xl mb-6">Store Categories</h2>
          <p className="text-xl text-primary-foreground max-w-2xl mx-auto opacity-80 italic italic">Refining elegance with artisan material intelligence. Select a category below to explore our verified circular products.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => navigate(`/products?category=${encodeURIComponent(cat.query)}`)}
              className="group bg-card border border-primary-foreground/5 rounded-[2.5rem] overflow-hidden shadow-strong transition-all cursor-pointer flex flex-col md:flex-row h-full"
            >
              <div className="md:w-2/5 h-64 md:h-auto overflow-hidden relative shrink-0">
                <img src={cat.img} alt={cat.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              <div className="p-8 md:p-10 flex flex-col flex-grow justify-center">
                <h4 className="text-3xl font-serif text-primary mb-4 font-bold">{cat.title}</h4>
                <p className="text-muted-foreground mb-8 text-base flex-grow font-sans leading-relaxed">{cat.desc}</p>
                <div className="mt-auto flex items-center font-mono text-sm uppercase tracking-widest font-bold text-accent justify-between pt-4 border-t border-border">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PRODUCT_CATEGORIES } from "../lib/productCatalog";

export default function ProductSection() {
  const navigate = useNavigate();

  return (
    <section id="products" className="py-32 bg-primary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 text-primary-foreground">
          <div className="section-badge mb-6">
            <span className="section-badge-label">Eko Luxury Products</span>
          </div>
          <h2 className="text-5xl font-serif md:text-6xl mb-6">Browse By Category</h2>
          <p className="text-xl text-primary-foreground max-w-3xl mx-auto opacity-80 italic">
            Explore dedicated product pages for leather backpacks, leather bags, wallets, accessories, and distinct
            men's and women's footwear collections. Each category opens into a focused page with only the relevant
            products.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {PRODUCT_CATEGORIES.map((category, idx) => (
            <motion.button
              key={category.slug}
              type="button"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => navigate(`/products/category/${category.slug}`)}
              className="group bg-card border border-primary-foreground/5 rounded-[2.5rem] overflow-hidden shadow-strong transition-all cursor-pointer flex flex-col md:flex-row h-full text-left"
            >
              <div className="md:w-2/5 h-64 md:h-auto overflow-hidden relative shrink-0">
                <img
                  src={category.image}
                  alt={category.shortTitle}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  style={{ objectPosition: category.imagePosition ?? "center" }}
                />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              <div className="p-8 md:p-10 flex flex-col flex-grow justify-center">
                <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-accent font-bold mb-4">
                  {category.eyebrow}
                </p>
                <h3 className="text-3xl font-serif text-primary mb-4 font-bold">{category.shortTitle}</h3>
                <p className="text-muted-foreground mb-8 text-base flex-grow font-sans leading-relaxed">
                  {category.description}
                </p>
                <div className="mt-auto flex items-center font-mono text-sm uppercase tracking-widest font-bold text-accent justify-between pt-4 border-t border-border">
                  <span>View Products</span>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

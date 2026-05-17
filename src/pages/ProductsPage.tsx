import { ArrowRight, Layers3, PackageOpen } from "lucide-react";
import { motion } from "motion/react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { useProductsCatalog } from "../hooks/useProductsCatalog";
import {
  getCategoryFromQuery,
  getProductCountByCategory,
  PRODUCT_CATEGORIES
} from "../lib/productCatalog";

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const categoryQuery = searchParams.get("category");
  const matchedCategory = getCategoryFromQuery(categoryQuery);
  const { products, isLoading, error } = useProductsCatalog();
  const categoryCounts = getProductCountByCategory(products);

  if (matchedCategory) {
    return <Navigate to={`/products/category/${matchedCategory.slug}`} replace />;
  }

  return (
    <div className="py-20 min-h-screen bg-muted/10">
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-20">
          <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-accent font-bold mb-4 block">
            EkoKintsugi Products
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-primary font-bold mb-6">Product Categories</h1>
          <p className="text-xl text-muted-foreground italic max-w-3xl mx-auto">
            Choose a product family first, then explore a focused product page built around that category. The layout
            stays clean, responsive, and consistent with the rest of the site.
          </p>
        </header>

        <div className="bg-card border border-border/50 p-8 md:p-12 rounded-[2.5rem] shadow-sm mb-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-5">
                <Layers3 className="w-6 h-6 text-accent" />
                <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-accent font-bold">
                  Product Navigation
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-primary font-bold mb-4">
                Dedicated product pages for every product family
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Each category now opens into its own product page, showing only the relevant items while keeping the
                overall visual language aligned with the rest of the website.
              </p>
            </div>

            <div className="bg-primary text-primary-foreground rounded-3xl px-6 py-5 min-w-56">
              <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-primary-foreground/85 mb-2">Product Status</p>
              <p className="text-3xl font-serif font-bold mb-1">
                {isLoading ? "Syncing..." : error ? "Offline" : `${products.length} Products`}
              </p>
              <p className="text-sm opacity-80">Live grouping across bags, wallets, accessories, and separate men's and women's footwear lines.</p>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <div className="flex items-center gap-4 mb-10 border-b border-border/50 pb-4">
            <PackageOpen className="text-accent shrink-0" />
            <h2 className="text-3xl font-serif font-bold text-primary flex-grow">Browse Product Pages</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {PRODUCT_CATEGORIES.map((category, idx) => (
              <motion.article
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
                className="group bg-card border border-border/60 rounded-[2.5rem] overflow-hidden shadow-soft hover:border-accent/40 transition-all"
              >
                <div className="grid md:grid-cols-[1.05fr_1.2fr] h-full">
                  <div className="relative min-h-72 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.shortTitle}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/10 to-transparent" />
                    <div className="absolute left-6 bottom-6 right-6">
                      <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-accent font-bold mb-2">
                        {category.eyebrow}
                      </p>
                      <h3 className="text-3xl font-serif text-primary-foreground font-bold">{category.shortTitle}</h3>
                    </div>
                  </div>

                  <div className="p-8 md:p-10 flex flex-col">
                    <p className="text-muted-foreground leading-relaxed mb-6">{category.description}</p>
                    <div className="flex items-center justify-between gap-4 py-4 border-y border-border/60 mb-8">
                      <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-muted-foreground font-bold">
                        Products in this category
                      </span>
                      <span className="text-2xl font-serif text-primary font-bold">
                        {isLoading ? "--" : error ? "0" : categoryCounts[category.slug] ?? 0}
                      </span>
                    </div>
                    <Link
                      to={`/products/category/${category.slug}`}
                      className="mt-auto inline-flex items-center justify-between gap-4 rounded-full border border-accent/40 px-6 py-3 text-[11px] font-mono tracking-[0.3em] uppercase font-bold text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      View Products
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

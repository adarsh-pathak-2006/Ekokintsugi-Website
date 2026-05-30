import { motion } from "motion/react";
import { BarChart3, TreePine } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";

export default function ImpactPage() {
  const { t } = useLanguage();

  return (
    <div className="py-32 surface-gradient min-h-screen">
      <div className="max-w-7xl mx-auto px-6 space-y-24">
        
        {/* Page Header */}
        <header className="text-center max-w-3xl mx-auto space-y-6">
          <span className="section-badge">
            <span className="section-badge-label">{t("impactpage.badge")}</span>
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-black text-primary tracking-tight">
            {t("impactpage.title")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground italic leading-relaxed">
            {t("impactpage.subtitle")}
          </p>
        </header>

        {/* Core Pillars Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             whileHover={{ y: -8, scale: 1.015 }}
             transition={{ type: "spring", stiffness: 400, damping: 25 }}
             className="bg-card border border-border/80 p-12 rounded-[2.5rem] flex flex-col justify-center group cursor-pointer hover:border-accent/40 hover:shadow-strong transition-all duration-300"
           >
              <h3 className="text-4xl font-serif font-bold text-primary mb-6">{t("impactpage.loop.title")}</h3>
              <p className="text-muted-foreground italic text-lg leading-relaxed mb-8">
                 {t("impactpage.loop.desc")}
              </p>
              
              <div className="space-y-4 text-sm font-semibold uppercase font-mono tracking-widest text-accent">
                 <p>{t("impactpage.loop.item1")}</p>
                 <p>{t("impactpage.loop.item2")}</p>
                 <p>{t("impactpage.loop.item3")}</p>
              </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             whileHover={{ y: -8, scale: 1.015 }}
             transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.1 }}
             className="bg-primary text-primary-foreground p-12 rounded-[2.5rem] flex flex-col justify-center relative overflow-hidden group cursor-pointer hover:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.3)] transition-all duration-300"
           >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-bl-[100px] blur-2xl" />
              <h3 className="text-4xl font-serif font-bold mb-6 text-primary-foreground">{t("impactpage.handshake.title")}</h3>
              <ul className="space-y-4">
                 <li className="flex items-start gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 animate-pulse" />
                    <p className="text-lg opacity-90"><strong className="text-primary-foreground font-black">{t("impactpage.handshake.item1_bold")}</strong>{t("impactpage.handshake.item1_text")}</p>
                 </li>
                 <li className="flex items-start gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 animate-pulse" />
                    <p className="text-lg opacity-90"><strong className="text-primary-foreground font-black">{t("impactpage.handshake.item2_bold")}</strong>{t("impactpage.handshake.item2_text")}</p>
                 </li>
                 <li className="flex items-start gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 animate-pulse" />
                    <p className="text-lg opacity-90"><strong className="text-primary-foreground font-black">{t("impactpage.handshake.item3_bold")}</strong>{t("impactpage.handshake.item3_text")}</p>
                 </li>
              </ul>
           </motion.div>
        </div>

        {/* Tree Parenting & Metrics */}
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             whileHover={{ y: -8, scale: 1.015 }} 
             transition={{ type: "spring", stiffness: 400, damping: 25 }} 
             className="bg-card border border-border/80 p-12 rounded-[2.5rem] flex flex-col justify-center group cursor-pointer hover:border-accent/40 hover:shadow-strong transition-all duration-300"
           >
              <BarChart3 className="text-accent w-10 h-10 mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:translate-x-1" />
              <h3 className="text-3xl font-serif font-bold text-primary mb-6">{t("impactpage.metrics.title")}</h3>
              <ul className="space-y-6 mt-6">
                 <li className="flex justify-between items-center border-b border-border pb-4">
                    <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground font-bold">{t("impactpage.metrics.waste")}</span>
                    <span className="text-2xl font-serif font-black text-primary">250-400 <span className="text-sm font-sans tracking-normal opacity-70">{t("impactpage.metrics.waste_unit")}</span></span>
                 </li>
                 <li className="flex justify-between items-center border-b border-border pb-4">
                    <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground font-bold">{t("impactpage.metrics.carbon")}</span>
                    <span className="text-2xl font-serif font-black text-accent">40-55%</span>
                 </li>
                 <li className="flex justify-between items-center border-b border-border pb-4">
                    <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground font-bold">{t("impactpage.metrics.water")}</span>
                    <span className="text-xl font-serif font-bold text-primary italic">{t("impactpage.metrics.water_val")}</span>
                 </li>
              </ul>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             whileHover={{ y: -8, scale: 1.015 }} 
             transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.2 }} 
             className="bg-accent text-primary-foreground p-12 rounded-[2.5rem] relative overflow-hidden group cursor-pointer hover:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-300"
           >
              <div className="absolute inset-0 bg-[url('/images/sections/forest.jpg')] bg-cover opacity-10 mix-blend-overlay" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                 <div>
                    <TreePine className="w-12 h-12 text-accent-foreground mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
                    <h3 className="text-4xl font-serif font-bold text-accent-foreground mb-2 leading-tight whitespace-pre-line">{t("impactpage.tree.title")}</h3>
                    <p className="text-accent-foreground/80 italic mb-8 border-l-2 border-accent-foreground/30 pl-4">{t("impactpage.tree.subtitle")}</p>
                 </div>
                 
                 <div className="space-y-3 font-medium text-accent-foreground/90 bg-primary/20 backdrop-blur p-6 rounded-2xl">
                    <p>{t("impactpage.tree.item1")}</p>
                    <p>{t("impactpage.tree.item2")}</p>
                    <p>{t("impactpage.tree.item3")}</p>
                    <p>{t("impactpage.tree.item4")}</p>
                 </div>
              </div>
           </motion.div>
        </div>

      </div>
    </div>
  );
}

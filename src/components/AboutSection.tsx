import { Brain, Heart, Earth, Award } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../lib/LanguageContext";

export default function AboutSection() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Brain,
      title: t("about.feat_ai_title"),
      description: t("about.feat_ai_desc")
    },
    {
      icon: Heart,
      title: t("about.feat_artisan_title"),
      description: t("about.feat_artisan_desc")
    },
    {
      icon: Earth,
      title: t("about.feat_impact_title"),
      description: t("about.feat_impact_desc")
    },
    {
      icon: Award,
      title: t("about.feat_quality_title"),
      description: t("about.feat_quality_desc")
    }
  ];

  return (
    <section id="about" className="py-32 surface-gradient overflow-hidden relative border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="section-badge mb-6">
              <span className="section-badge-label">{t("about.badge")}</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif leading-[1.1] mb-10 font-bold text-primary">
              {t("about.title_part1")} <br />{t("about.title_part2")} <span className="italic text-accent">{t("about.title_accent")}</span>
            </h2>
            <div className="space-y-8 text-muted-foreground text-lg mb-12 leading-relaxed max-w-lg">
              <p className="border-l-4 border-accent pl-6 italic">
                {t("about.quote")}
              </p>
              <p>
                {t("about.description")}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-8 rounded-2xl bg-card border border-primary/5 hover:border-accent/30 transition-all group shadow-sm"
                >
                  <div className="p-3 bg-primary/5 rounded-lg w-fit mb-6 group-hover:bg-accent/10 transition-colors">
                    <item.icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3 font-serif">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-strong aspect-[4/5] border-[12px] border-card">
              <img 
                src="/images/sections/about-workshop.jpg" 
                alt="EkoKintsugi Workshop"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-accent/20 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

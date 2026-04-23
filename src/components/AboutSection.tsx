import { Brain, Heart, Earth, Award } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered",
    description: "Advanced material intelligence for quality and efficiency"
  },
  {
    icon: Heart,
    title: "Artisan Craft",
    description: "Supporting local communities and traditional skills"
  },
  {
    icon: Earth,
    title: "Global Impact",
    description: "EU-certified with international partnerships"
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Export-grade products that don't compromise"
  }
];

export default function AboutSection() {
  return (
    <section id="about" className="py-32 bg-background overflow-hidden relative border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-accent/20 border border-accent/20">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent font-bold">The Heritage</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif leading-[1.1] mb-10 font-bold text-primary">
              Redefining Waste <br />as a <span className="italic text-accent">Resource</span>
            </h2>
            <div className="space-y-8 text-muted-foreground text-lg mb-12 leading-relaxed max-w-lg">
              <p className="border-l-4 border-accent pl-6 italic">
                EkoKintsugi transforms leather and material waste into premium products. 
              </p>
              <p>
                Inspired by the Japanese art of Kintsugi—where broken pottery is mended with gold—we believe in making beautiful things from what others discard.
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

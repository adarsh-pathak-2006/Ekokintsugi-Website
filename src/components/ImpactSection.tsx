import { TrendingDown, Leaf, Users, Award } from "lucide-react";
import { motion } from "motion/react";

const metrics = [
  {
    icon: TrendingDown,
    value: "5.3kg",
    label: "CO₂ Saved Per Piece",
    desc: "Achieved via material intelligence"
  },
  {
    icon: Leaf,
    value: "70%",
    label: "Circular Content",
    desc: "Reclaimed waste in every product"
  },
  {
    icon: Users,
    value: "500+",
    label: "Artisans Uplifted",
    desc: "Across rural communities"
  },
  {
    icon: Award,
    value: "100%",
    label: "Traceable Chain",
    desc: "Digital passport certification"
  }
];

const certs = [
  "EU Digital Product Passport",
  "MSME-Udyam Certified",
  "Startup India Recognized",
  "ISO Quality Standards",
  "Fair Trade Practices",
  "Carbon Neutral Operations"
];

export default function ImpactSection() {
  return (
    <section id="impact" className="py-32 relative overflow-hidden bg-primary">
      {/* Rich vivid gradients for color */}
      <div className="absolute top-0 left-0 w-full h-full opacity-40 bg-[radial-gradient(circle_at_20%_20%,var(--color-accent)_0%,transparent_50%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-primary-foreground">
        <div className="text-center mb-24">
          <div className="inline-block px-5 py-2 mb-8 rounded-full bg-primary-foreground/10 backdrop-blur-xl border border-primary-foreground/20 shadow-xl">
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-accent font-black">Environmental Stewardship</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-serif font-bold mb-8 leading-none">Making a <span className="italic text-accent">Real</span> Impact</h2>
          <p className="text-xl text-primary-foreground/70 max-w-2xl mx-auto font-medium leading-relaxed italic">
            Every decorative piece contributes to a circular economy, supporting traditional craft with modern environmental science.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-32">
          {metrics.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-10 text-center bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/15 rounded-[2.5rem] hover:bg-primary-foreground/20 hover:scale-105 transition-all shadow-xl group"
            >
              <div className="flex justify-center mb-10">
                <div className="p-5 rounded-3xl bg-accent text-accent-foreground shadow-lg group-hover:rotate-12 transition-transform">
                  <item.icon className="w-8 h-8" />
                </div>
              </div>
              <p className="text-6xl font-black font-serif mb-3 tracking-tighter">{item.value}</p>
              <p className="text-lg font-bold mb-4 uppercase tracking-widest text-accent">{item.label}</p>
              <p className="text-sm text-primary-foreground/60 leading-relaxed font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="p-16 rounded-[3rem] bg-black/20 backdrop-blur-xl border border-primary-foreground/20 shadow-2xl">
          <div className="flex items-center gap-6 mb-16 px-4">
            <div className="h-px flex-1 bg-primary-foreground/20" />
            <h3 className="text-3xl font-serif text-center font-bold px-6">Certifications & Standards</h3>
            <div className="h-px flex-1 bg-primary-foreground/20" />
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {certs.map((c, i) => (
              <div key={i} className="flex items-center gap-6 p-6 rounded-2xl bg-primary-foreground/10 border border-primary-foreground/10 group hover:bg-accent/20 hover:border-accent/40 transition-all cursor-default">
                <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_15px_var(--color-accent)] group-hover:scale-150 transition-transform" />
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-black group-hover:text-accent-foreground transition-colors">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

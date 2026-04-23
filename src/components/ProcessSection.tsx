import { Recycle, Cpu, Scissors, Package } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    icon: Recycle,
    step: "01",
    location: "Jharkhand Processing Unit",
    title: "Collection & Sorting",
    description: "AI-powered material intelligence identifies and sorts waste materials for maximum quality and efficiency"
  },
  {
    icon: Cpu,
    step: "02",
    location: "AI Quality Lab",
    title: "Quality Control",
    description: "Advanced AI systems ensure consistent quality while reducing rejection rates by 30-40%"
  },
  {
    icon: Scissors,
    step: "03",
    location: "Agra Manufacturing Unit",
    title: "Artisan Crafting",
    description: "Skilled artisans transform materials into unique mosaic patterns and product components"
  },
  {
    icon: Package,
    step: "04",
    location: "Export Facility",
    title: "Assembly & Export",
    description: "Final assembly with Digital Product Passport for full traceability and EU compliance"
  }
];

export default function ProcessSection() {
  return (
    <section id="process" className="py-32 bg-muted/20 border-y border-border/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold">
            <span className="text-xs font-mono tracking-widest uppercase">The Circular Lifecycle</span>
          </div>
          <h2 className="text-5xl font-serif text-primary md:text-7xl mb-6">From Waste to Wonder</h2>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">A seamless orchestration of AI-enabled technology and generational craftsmanship.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {steps.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-12 border border-primary/10 bg-card rounded-3xl relative overflow-hidden group hover:shadow-strong transition-all"
            >
              <div className="absolute -top-12 -right-8 text-[14rem] font-bold text-primary/5 select-none pointer-events-none group-hover:text-accent/[0.08] transition-colors leading-none font-serif italic">
                {item.step}
              </div>
              <div className="relative z-10">
                <div className="flex items-start gap-6 mb-8">
                  <div className="p-4 rounded-xl bg-primary text-primary-foreground shadow-lg group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <item.icon className="w-10 h-10" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono tracking-widest text-accent uppercase font-black mb-1">{item.location}</p>
                    <h3 className="text-3xl font-serif text-primary font-bold leading-tight">{item.title}</h3>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-strong aspect-video relative z-10 border-[8px] border-card">
              <img 
                src="/images/sections/ai-tech.jpg" 
                alt="AI Technology"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
            </div>
            <div className="absolute -inset-4 border-2 border-accent/20 rounded-3xl -z-10" />
          </div>
          <div>
            <h3 className="text-4xl font-serif text-primary mb-8 font-bold">AI Material Intelligence</h3>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed italic">
              "Our proprietary AI systems analyze material integrity at a microscopic level, ensuring waste is not just reused, but reborn."
            </p>
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="p-8 rounded-3xl bg-card border border-accent/30 shadow-sm group hover:bg-accent transition-colors">
                <p className="text-5xl font-bold text-primary mb-2 group-hover:text-white transition-colors">35%</p>
                <p className="text-xs font-mono tracking-tight uppercase font-black text-accent group-hover:text-white transition-colors">Faster Sorting</p>
              </div>
              <div className="p-8 rounded-3xl bg-card border border-accent/30 shadow-sm group hover:bg-accent transition-colors">
                <p className="text-5xl font-bold text-primary mb-2 group-hover:text-white transition-colors">40%</p>
                <p className="text-xs font-mono tracking-tight uppercase font-black text-accent group-hover:text-white transition-colors">Lower Rejection</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

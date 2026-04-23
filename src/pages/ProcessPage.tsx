import { motion } from "motion/react";
import { Cpu, Repeat, MapPin, Truck, CheckCircle2 } from "lucide-react";

export default function ProcessPage() {
  return (
    <div className="py-20 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6">
        
        <header className="mb-20">
          <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-accent font-bold mb-4 block text-center">Operational Architecture</span>
          <h1 className="text-5xl md:text-7xl font-serif text-primary font-bold text-center mb-6">Dual-State Efficiency.</h1>
          <p className="text-xl text-muted-foreground italic text-center max-w-2xl mx-auto">
            A hybrid model that unlocks government subsidies, guarantees the lowest cost per pair, and ensures high quality consistency across India.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-12 mb-20 text-primary">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-10 border-2 border-border/80 rounded-[2.5rem] relative overflow-hidden bg-card"
          >
            <MapPin className="text-accent w-10 h-10 mb-6" />
            <h3 className="text-3xl font-serif font-bold mb-2">Jharkhand</h3>
            <p className="text-accent font-mono text-xs font-bold tracking-widest uppercase mb-8">Processing & Recycling</p>
            
            <ul className="space-y-4 font-sans text-muted-foreground text-sm flex flex-col gap-2">
              <li className="flex gap-3 items-center"><CheckCircle2 className="w-5 h-5 text-primary" /> Waste sorting</li>
              <li className="flex gap-3 items-center"><CheckCircle2 className="w-5 h-5 text-primary" /> Removal of contaminants</li>
              <li className="flex gap-3 items-center"><CheckCircle2 className="w-5 h-5 text-primary" /> Leather mince conversion</li>
              <li className="flex gap-3 items-center"><CheckCircle2 className="w-5 h-5 text-primary" /> Recycled mosaic sheet creation</li>
              <li className="flex gap-3 items-center"><CheckCircle2 className="w-5 h-5 text-accent" /> Tribal workforce empowerment</li>
            </ul>
             <div className="mt-8 border-t border-border pt-4">
              <span className="text-xs font-mono tracking-widest font-bold uppercase opacity-60">Lead Time: 30 Days</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-10 border-2 border-primary rounded-[2.5rem] relative overflow-hidden bg-primary text-primary-foreground"
          >
            <MapPin className="text-primary-foreground/50 w-10 h-10 mb-6" />
            <h3 className="text-3xl font-serif font-bold mb-2">Uttar Pradesh</h3>
            <p className="text-accent font-mono text-xs font-bold tracking-widest uppercase mb-8">Cutting, Assembly & Export</p>
            
            <ul className="space-y-4 font-sans text-primary-foreground/80 text-sm flex flex-col gap-2">
              <li className="flex gap-3 items-center"><CheckCircle2 className="w-5 h-5 text-accent" /> Upper construction</li>
              <li className="flex gap-3 items-center"><CheckCircle2 className="w-5 h-5 text-accent" /> Sole assembly</li>
              <li className="flex gap-3 items-center"><CheckCircle2 className="w-5 h-5 text-accent" /> Stitching</li>
              <li className="flex gap-3 items-center"><CheckCircle2 className="w-5 h-5 text-accent" /> Packaging</li>
              <li className="flex gap-3 items-center"><CheckCircle2 className="w-5 h-5 text-accent" /> Export documentation & logistics</li>
            </ul>
            <div className="mt-8 border-t border-primary-foreground/20 pt-4 flex gap-6">
              <span className="text-xs font-mono tracking-widest font-bold uppercase opacity-60">Lead Time: 30 Days</span>
              <span className="text-xs font-mono tracking-widest font-bold uppercase text-accent flex items-center gap-2"><Truck className="w-4 h-4"/> Transport: 45 Days</span>
            </div>
          </motion.div>
        </div>

        <section className="bg-card border border-border p-12 md:p-20 rounded-[3rem] shadow-sm">
          <h2 className="text-3xl font-serif font-bold text-primary mb-12 flex items-center gap-4 justify-center text-center">
            <Cpu className="w-8 h-8 text-accent" /> The Technology Advantage
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
             {[
               { title: "AI-powered QC", desc: "Automating visual quality metrics for European compliance." },
               { title: "AI Waste Sorting", desc: "Predicting yields and enabling contaminant elimination algorithms." },
               { title: "Material Dashboard", desc: "Intelligent analytics for transparent closed-loop tracking." },
               { title: "DPP Ready", desc: "Built straight into the database for the 2026 Passport mandates." },
               { title: "Yield Analytics", desc: "Production forecasting down to the gram." },
               { title: "EU Exclusive", desc: "Exclusive technology access tailored for Taleco Handles GmbH." }
             ].map((tech, i) => (
               <div key={i} className="p-6 rounded-2xl bg-muted/40 hover:bg-muted/80 transition-colors">
                  <h4 className="font-bold text-primary font-mono text-sm tracking-tight mb-2 flex items-center gap-2"><Repeat className="w-4 h-4 text-accent" /> {tech.title}</h4>
                  <p className="text-muted-foreground text-sm">{tech.desc}</p>
               </div>
             ))}
          </div>
        </section>

      </div>
    </div>
  );
}

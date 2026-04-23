import { motion } from "motion/react";
import { TreePine, BarChart3, AlertTriangle, ShieldCheck } from "lucide-react";

export default function ImpactPage() {
  return (
    <div className="py-20 min-h-screen bg-muted/10">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-20 text-center">
          <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-accent font-bold mb-4 block">Environmental Framework</span>
          <h1 className="text-5xl md:text-7xl font-serif text-primary font-bold mb-6">Solving the Leather Crisis</h1>
          <p className="text-xl text-muted-foreground italic max-w-2xl mx-auto">
            Leather is one of the world's most polluting materials. Millions of tonnes are landfilled annually, with high CO₂ footprints and chemical permanence.
          </p>
        </header>

        {/* Problem vs Solution */}
        <div className="grid md:grid-cols-2 gap-12 mb-20 text-primary">
           <div className="bg-red-50 p-12 rounded-[3.5rem] border border-red-100">
             <AlertTriangle className="text-red-500 w-12 h-12 mb-6" />
             <h3 className="text-3xl font-serif font-bold mb-8">The Dual Problem</h3>
             
             <div className="mb-6 space-y-2">
               <h4 className="font-mono text-sm tracking-widest uppercase font-bold text-red-900 border-b border-red-200 pb-2 mb-4">India's Manufacturing Waste</h4>
               <p className="text-red-800 text-sm italic">India is a massive footwear hub. Yet 20-30% of material becomes factory waste—burned, dumped, or sent to low-quality recyclers.</p>
             </div>

             <div className="mt-8 space-y-2">
               <h4 className="font-mono text-sm tracking-widest uppercase font-bold text-red-900 border-b border-red-200 pb-2 mb-4">European Regulation Pressures</h4>
               <ul className="text-red-800 text-sm flex flex-col gap-2 font-mono">
                 <li>• Digital Product Passport (DPP 2026)</li>
                 <li>• Green Claims Regulation</li>
                 <li>• Circularity reporting & auditing</li>
               </ul>
             </div>
           </div>

           <div className="bg-primary text-primary-foreground p-12 rounded-[3.5rem] shadow-strong">
             <ShieldCheck className="text-accent w-12 h-12 mb-6" />
             <h3 className="text-3xl font-serif font-bold mb-8">The EkoKintsugi Solution</h3>
             
             <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                  <p className="text-lg opacity-90"><strong className="text-primary-foreground font-black">Convert waste:</strong> Transform raw scraps into highly usable, EU-market ready material.</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                  <p className="text-lg opacity-90"><strong className="text-primary-foreground font-black">Create:</strong> Produce premium footwear from recycled mosaic sheets.</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                  <p className="text-lg opacity-90"><strong className="text-primary-foreground font-black">Verify:</strong> Provide full traceability and DPP data directly through AI and Cloud ledgers.</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                  <p className="text-lg opacity-90"><strong className="text-primary-foreground font-black">Close the Loop:</strong> Support European retailers with a ready-made circular sustainability solution.</p>
                </li>
             </ul>
           </div>
        </div>

        {/* Tree Parenting & Metrics */}
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="bg-card border border-border/80 p-12 rounded-[2.5rem] flex flex-col justify-center"
           >
             <BarChart3 className="text-accent w-10 h-10 mb-6" />
             <h3 className="text-3xl font-serif font-bold text-primary mb-6">Metrics Per Pair</h3>
             <ul className="space-y-6 mt-6">
                <li className="flex justify-between items-center border-b border-border pb-4">
                   <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground font-bold">Waste Saved</span>
                   <span className="text-2xl font-serif font-black text-primary">250-400 <span className="text-sm font-sans tracking-normal opacity-70">grams</span></span>
                </li>
                <li className="flex justify-between items-center border-b border-border pb-4">
                   <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground font-bold">Carbon Reduction</span>
                   <span className="text-2xl font-serif font-black text-accent">40-55%</span>
                </li>
                <li className="flex justify-between items-center border-b border-border pb-4">
                   <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground font-bold">Water Footprint</span>
                   <span className="text-xl font-serif font-bold text-primary italic">Drastically Lowered</span>
                </li>
             </ul>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="bg-accent text-primary-foreground p-12 rounded-[2.5rem] relative overflow-hidden"
           >
             <div className="absolute inset-0 bg-[url('/images/sections/forest.jpg')] bg-cover opacity-10 mix-blend-overlay" />
             <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <TreePine className="w-12 h-12 text-white mb-6" />
                  <h3 className="text-4xl font-serif font-bold text-white mb-2 leading-tight">One Sneaker =<br/>One Tree Parent</h3>
                  <p className="text-white/80 italic mb-8 border-l-2 border-white/20 pl-4">The Talking to the Tree Program.</p>
                </div>
                
                <div className="space-y-3 font-medium text-white/90 bg-primary/20 backdrop-blur p-6 rounded-2xl">
                   <p>• Every RESCHUH pair has a unique QR code.</p>
                   <p>• Customers virtually "Adopt a Tree" in an Indian plantation.</p>
                   <p>• They can track growth and social impact.</p>
                   <p>• European retailers instantly acquire ESG storytelling credentials and customer loyalty.</p>
                </div>
             </div>
           </motion.div>
        </div>

      </div>
    </div>
  );
}

import { motion } from "motion/react";
import { Handshake, Target, Globe, ShieldCheck, QrCode, Download } from "lucide-react";

export default function AboutPage() {
  const qrPattern = [
    "111111101111111",
    "100000101000001",
    "101110101011101",
    "101110101011101",
    "101110101011101",
    "100000101000001",
    "111111101111111",
    "000000000000000",
    "110011000110011",
    "001100111001100",
    "111001001001111",
    "001111000111100",
    "110000111000011",
    "100000101000001",
    "111111101111111"
  ];

  return (
    <div className="py-20 min-h-screen surface-gradient">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="section-badge mb-4">
            <span className="section-badge-label">Company Profile</span>
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-primary font-bold mb-6">Who is EkoKintsugi LLP?</h1>
          <p className="text-xl text-muted-foreground italic">
            An Indian circular-economy footwear manufacturer that turns industry waste leather into high-quality sneakers. 
            Our brand RESCHUH represents rebirth, sustainability, and purpose-driven design.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ y: -8, scale: 1.015 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="p-12 bg-primary text-primary-foreground rounded-[2.5rem] shadow-strong relative overflow-hidden group cursor-pointer hover:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.3)] transition-shadow duration-300"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-125 group-hover:bg-accent/30" />
            <Target className="w-12 h-12 text-accent mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
            <h2 className="text-3xl font-serif font-bold mb-4">Our Mission</h2>
            <p className="text-lg opacity-80 leading-relaxed">
              To transform waste into value through premium footwear, technology, and strategic partnerships.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ y: -8, scale: 1.015 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="p-12 bg-card border border-border rounded-[2.5rem] shadow-sm relative overflow-hidden group cursor-pointer hover:border-accent/40 hover:shadow-strong transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-125 group-hover:bg-primary/10" />
            <Globe className="w-12 h-12 text-primary mb-8 transition-transform duration-700 group-hover:rotate-[30deg] group-hover:scale-110" />
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">Our Vision</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A world where no leather waste enters landfills—only new products, new value, and new opportunities.
            </p>
          </motion.div>
        </div>

        <div className="mb-24">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-4xl font-serif text-primary font-bold mb-4">The European Focus</h2>
            <p className="text-muted-foreground max-w-2xl">
              We align perfectly with leading EU regulations, preparing brands for the Digital Product Passport (DPP 2026) and the Green Claims Act through mandatory transparency.
            </p>
          </div>

          <motion.div 
            whileHover={{ y: -6, scale: 1.008 }} 
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="bg-card border border-border rounded-[2.5rem] p-10 overflow-hidden shadow-strong group hover:border-accent/40 transition-all duration-300"
          >
            <h3 className="text-2xl font-serif font-bold text-primary mb-8 text-center flex items-center justify-center gap-3">
              <Handshake className="text-accent transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" /> Partnership Value
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8 items-center bg-muted/10 p-8 rounded-3xl">
              <div>
                <h4 className="font-bold text-primary mb-2">EkoKintsugi LLP Strengths</h4>
                <ul className="space-y-3 font-mono text-sm text-muted-foreground">
                  {[
                    { label: "Circular Production", icon: ShieldCheck, color: "text-accent" },
                    { label: "AI QC Tech", icon: ShieldCheck, color: "text-accent" },
                    { label: "Dual-state cost efficiency", icon: ShieldCheck, color: "text-accent" },
                    { label: "ESG Leadership", icon: ShieldCheck, color: "text-accent" },
                    { label: "India Manufacturing Strength", icon: ShieldCheck, color: "text-accent" }
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 group/li hover:translate-x-1.5 transition-transform duration-300">
                      <item.icon className={`w-4 h-4 ${item.color} transition-transform duration-300 group-hover/li:scale-110 group-hover/li:rotate-6`} /> {item.label}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-l-2 border-border/50 pl-8">
                <h4 className="font-bold text-primary mb-2">Ideal Distribution Partner Match</h4>
                <ul className="space-y-3 font-mono text-sm text-muted-foreground">
                  {[
                    { label: "European Distribution", icon: Globe, color: "text-primary" },
                    { label: "Market Insights & Retail Network", icon: Globe, color: "text-primary" },
                    { label: "Customer Trust & European Retail Culture", icon: Globe, color: "text-primary" }
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 group/li hover:translate-x-1.5 transition-transform duration-300">
                      <item.icon className={`w-4 h-4 ${item.color} transition-transform duration-300 group-hover/li:scale-110 group-hover/li:rotate-12`} /> {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-10"
        >
          <motion.div 
            whileHover={{ y: -6, scale: 1.008 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="bg-card border border-border rounded-[2.5rem] p-10 md:p-12 shadow-sm group hover:shadow-strong transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="flex-1">
                <p className="section-badge mb-4">
                  <span className="section-badge-label">Mobile Experience</span>
                </p>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Scan to Download the App</h3>
                <p className="text-muted-foreground mb-6 max-w-xl">
                  Use this QR as a visual demo of our future mobile onboarding flow for partners and customers.
                </p>
                <div className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-5 py-3 rounded-xl cursor-pointer hover:bg-accent hover:text-accent-foreground transition-all duration-300 group/btn">
                  <Download className="w-4 h-4 text-accent transition-transform duration-500 group-hover/btn:translate-y-0.5" />
                  <span className="font-mono text-[10px] tracking-widest uppercase font-bold">Demo Download QR</span>
                </div>
                <p className="mt-4 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  Dummy placeholder: scanning will not download the app.
                </p>
              </div>

              <div className="shrink-0 bg-muted/30 border border-border rounded-3xl p-5 transition-all duration-500 group-hover:bg-primary/5 group-hover:border-primary/20 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)]">
                <div className="bg-white rounded-2xl p-4 shadow-sm transition-transform duration-500 group-hover:scale-[1.02]">
                  <div className="grid grid-cols-[repeat(15,minmax(0,1fr))] gap-[2px] w-[190px] h-[190px]">
                    {qrPattern.flatMap((row, rowIndex) =>
                      row.split("").map((cell, cellIndex) => (
                        <div
                          key={`${rowIndex}-${cellIndex}`}
                          className={cell === "1" ? "bg-primary rounded-[1px]" : "bg-transparent"}
                        />
                      ))
                    )}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-center gap-2 text-primary">
                  <QrCode className="w-4 h-4 text-accent transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold">App QR Demo</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}

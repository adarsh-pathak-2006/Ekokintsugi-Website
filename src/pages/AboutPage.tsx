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
    <div className="py-20 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-accent font-bold mb-4 block">Company Profile</span>
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
            className="p-12 bg-primary text-primary-foreground rounded-[2.5rem] shadow-strong relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -mr-32 -mt-32" />
            <Target className="w-12 h-12 text-accent mb-8" />
            <h2 className="text-3xl font-serif font-bold mb-4">Our Mission</h2>
            <p className="text-lg opacity-80 leading-relaxed">
              To transform waste into value through premium footwear, technology, and strategic partnerships.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-12 bg-card border border-border rounded-[2.5rem] shadow-sm relative overflow-hidden"
          >
            <Globe className="w-12 h-12 text-primary mb-8" />
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

          <div className="bg-card border border-border rounded-[2.5rem] p-10 overflow-hidden shadow-strong">
            <h3 className="text-2xl font-serif font-bold text-primary mb-8 text-center flex items-center justify-center gap-3">
              <Handshake className="text-accent" /> Partnership Value
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8 items-center bg-muted/10 p-8 rounded-3xl">
              <div>
                <h4 className="font-bold text-primary mb-2">EkoKintsugi LLP Strengths</h4>
                <ul className="space-y-3 font-mono text-sm text-muted-foreground">
                  <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-accent" /> Circular Production</li>
                  <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-accent" /> AI QC Tech</li>
                  <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-accent" /> Dual-state cost efficiency</li>
                  <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-accent" /> ESG Leadership</li>
                  <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-accent" /> India Manufacturing Strength</li>
                </ul>
              </div>
              <div className="border-l-2 border-border/50 pl-8">
                <h4 className="font-bold text-primary mb-2">Ideal Distribution Partner Match</h4>
                <ul className="space-y-3 font-mono text-sm text-muted-foreground">
                  <li className="flex items-center gap-2"><Globe className="w-4 h-4 text-primary" /> European Distribution</li>
                  <li className="flex items-center gap-2"><Globe className="w-4 h-4 text-primary" /> Market Insights & Retail Network</li>
                  <li className="flex items-center gap-2"><Globe className="w-4 h-4 text-primary" /> Customer Trust & European Retail Culture</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-10"
        >
          <div className="bg-card border border-border rounded-[2.5rem] p-10 md:p-12 shadow-sm">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="flex-1">
                <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-accent font-bold mb-4">Mobile Experience</p>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Scan to Download the App</h3>
                <p className="text-muted-foreground mb-6 max-w-xl">
                  Use this QR as a visual demo of our future mobile onboarding flow for partners and customers.
                </p>
                <div className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-5 py-3 rounded-xl">
                  <Download className="w-4 h-4 text-accent" />
                  <span className="font-mono text-[10px] tracking-widest uppercase font-bold">Demo Download QR</span>
                </div>
                <p className="mt-4 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  Dummy placeholder: scanning will not download the app.
                </p>
              </div>

              <div className="shrink-0 bg-muted/30 border border-border rounded-3xl p-5">
                <div className="bg-white rounded-2xl p-4 shadow-sm">
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
                  <QrCode className="w-4 h-4 text-accent" />
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold">App QR Demo</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

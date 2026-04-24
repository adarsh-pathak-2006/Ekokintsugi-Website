import { motion } from "motion/react";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-32 bg-muted/20 relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-20 text-center">
          <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-accent font-bold mb-4 block">Let's Build The Future</span>
          <h2 className="text-5xl md:text-7xl font-serif text-primary font-bold mb-6">Partnership Invitation</h2>
          <p className="text-xl text-muted-foreground italic max-w-2xl mx-auto">
            This proposal is built upon a decade of trust, shared values, and a vision for a more sustainable world.
          </p>
        </header>

        <div className="bg-primary text-primary-foreground p-12 md:p-20 rounded-[3rem] shadow-strong flex flex-col md:flex-row gap-20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl -mr-64 -mt-64 pointer-events-none" />

          <div className="flex-1 relative z-10 space-y-12">
            <div>
              <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6">Together, we build the largest India-EU circular footwear ecosystem.</h3>
              <p className="opacity-80 italic">We invite Taleco Handles GmbH to become our:</p>
            </div>

            <ul className="space-y-6">
              {[
                "Exclusive European Partner",
                "Circular footwear expansion leader",
                "Closed-loop sustainability pioneer",
                "Technology-enabled distribution partner"
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 text-lg font-medium border-b border-white/10 pb-4"
                >
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                  {item}
                </motion.li>
              ))}
            </ul>

            <p className="opacity-60 text-sm max-w-md font-mono mt-8">
              Your decision will always be respected. We will move at your comfort and convenience.
            </p>
          </div>

          <div className="flex-1 relative z-10 w-full max-w-md bg-card text-foreground p-10 rounded-[2.5rem] shadow-2xl">
            <h3 className="text-2xl font-serif font-bold mb-8 text-primary">Reach Out</h3>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <MapPin className="text-accent mt-1" />
                <div>
                  <p className="font-bold text-primary">EkoKintsugi LLP Head Office</p>
                  <p className="text-sm text-muted-foreground mt-1">326-C SpaceGreen, Shastripuram<br/>Agra UP INDIA</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Phone className="text-accent" />
                <div>
                  <p className="text-sm font-mono tracking-widest text-muted-foreground">DIRECT LINE</p>
                  <p className="font-bold text-primary">+91 9359546639</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Mail className="text-accent" />
                <div>
                  <p className="text-sm font-mono tracking-widest text-muted-foreground">PRESENTED BY</p>
                  <p className="font-bold text-primary">Dushyant Singh</p>
                </div>
              </div>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Your Name" className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent" />
              <input type="email" placeholder="Your Email" className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent" />
              <button type="submit" className="w-full bg-accent text-accent-foreground rounded-xl py-3 text-[10px] font-mono tracking-widest uppercase font-bold hover:bg-primary transition-colors">
                Initiate Dialogue
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

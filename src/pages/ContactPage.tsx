import { motion } from "motion/react";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";
import React, { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="py-20 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-24">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Connect With Us</span>
          </div>
          <h1 className="text-5xl font-serif text-primary md:text-7xl mb-8 font-bold leading-tight">Let's Create <br /><span className="text-accent underline decoration-4 underline-offset-8 transition-all hover:decoration-primary">Together</span></h1>
          <p className="text-xl text-muted-foreground italic max-w-2xl mx-auto">
            Interested in bespoke decoratives or partnership opportunities? Reach out to our team of material specialists.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-12 bg-card border-2 border-primary/20 rounded-[2.5rem] shadow-none relative h-fit group hover:border-primary transition-colors duration-500"
          >
            <div className="absolute top-0 right-12 w-20 h-2 bg-accent rounded-b-full" />
            {!submitted ? (
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-black text-primary mb-3 font-mono uppercase tracking-[0.2em]">Your Name</label>
                    <input required type="text" placeholder="Name" className="w-full px-6 py-5 rounded-xl bg-transparent border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium text-lg placeholder:text-muted-foreground/50" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-primary mb-3 font-mono uppercase tracking-[0.2em]">Email Address</label>
                    <input required type="email" placeholder="example@email.com" className="w-full px-6 py-5 rounded-xl bg-transparent border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium text-lg placeholder:text-muted-foreground/50" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-primary mb-3 font-mono uppercase tracking-[0.2em]">Subject</label>
                  <input required type="text" placeholder="Subject of inquiry" className="w-full px-6 py-5 rounded-xl bg-transparent border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium text-lg placeholder:text-muted-foreground/50" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-primary mb-3 font-mono uppercase tracking-[0.2em]">Message</label>
                  <textarea required rows={5} placeholder="Project details and message..." className="w-full px-6 py-5 rounded-xl bg-transparent border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all resize-none font-medium text-lg placeholder:text-muted-foreground/50" />
                </div>
                <button type="submit" className="w-full py-6 bg-primary text-primary-foreground font-black text-[12px] tracking-[0.3em] uppercase rounded-2xl flex items-center justify-center gap-4 hover:bg-accent hover:text-accent-foreground transition-all shadow-xl group">
                  Send Inquiry <Send className="w-6 h-6 group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-300" />
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-20 text-center"
              >
                <div className="inline-flex p-6 bg-accent/10 rounded-full text-accent mb-6">
                  <CheckCircle className="w-16 h-16" />
                </div>
                <h3 className="text-3xl font-serif font-bold text-primary mb-4">Message Sent</h3>
                <p className="text-muted-foreground italic">Thank you for reaching out. Our material specialists will contact you soon.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-10 text-[10px] font-black uppercase tracking-widest text-accent border-b-2 border-accent pb-1"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </motion.div>

          <div className="flex flex-col gap-10">
            <div className="p-12 bg-primary text-primary-foreground rounded-[2.5rem] shadow-strong relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-full bg-accent/20 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
              <div className="relative z-10">
                <h3 className="text-3xl font-serif mb-12 font-bold decoration-accent decoration-2">Direct Contact</h3>
                <div className="space-y-12">
                  <div className="flex items-center gap-8">
                    <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md text-accent ring-1 ring-white/20 group-hover:rotate-12 transition-transform">
                      <Phone className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono tracking-[0.3em] uppercase font-black text-accent mb-2">Speak Expertly</p>
                      <a href="tel:+919359546639" className="text-2xl font-serif hover:text-accent transition-colors">+91 93595 46639</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md text-accent ring-1 ring-white/20 group-hover:-rotate-12 transition-transform">
                      <Mail className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono tracking-[0.3em] uppercase font-black text-accent mb-2">Digital Inquiry</p>
                      <a href="mailto:info@ekokintsugi.com" className="text-2xl font-serif hover:text-accent transition-colors">info@ekokintsugi.com</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-12 bg-card border-2 border-primary/20 rounded-[2.5rem] shadow-none group hover:border-primary transition-colors duration-500">
              <div className="flex items-start gap-8">
                <div className="p-5 rounded-2xl bg-accent/20 text-accent">
                  <MapPin className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-[10px] font-mono tracking-[0.3em] uppercase font-black text-primary mb-2">Artisan Hub</p>
                  <p className="text-2xl font-serif text-primary leading-tight font-bold">Agra, Uttar Pradesh <br />India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

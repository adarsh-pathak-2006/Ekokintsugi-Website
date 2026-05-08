import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    title: "Artisan Decoratives",
    description: "Everyday luxury from reclaimed materials.",
    image: "/images/hero/hero-1.jpg",
    link: "#products"
  },
  {
    id: 2,
    title: "Sustainable Living",
    description: "Crafted for durability and style.",
    image: "/images/hero/hero-2.jpg",
    link: "#products"
  },
  {
    id: 3,
    title: "Eco Luxury Craft",
    description: "Redefining elegance with purpose.",
    image: "/images/hero/hero-3.jpg",
    link: "#products"
  },
  {
    id: 4,
    title: "Circular Footwear Edition",
    description: "Signature sneakers reimagined through reclaimed leather and precision craft.",
    image: "/images/products/signature-sneaker.jpg",
    link: "#products"
  }
];

import { useNavigate } from "react-router-dom";

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-8 md:py-10">
      <div className="relative h-[480px] md:h-[540px] rounded-3xl overflow-hidden border border-primary/10 bg-primary group shadow-strong">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[6000ms] group-hover:scale-110"
              style={{ backgroundImage: `url(${slides[index].image})` }}
            />
            {/* Rich Colorful Overlays from screenshot colors */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/60 to-transparent" />
            
            <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-20 max-w-3xl">
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="w-12 h-0.5 bg-accent" />
                <span className="text-xs font-mono tracking-[0.4em] uppercase text-accent font-bold">Sustainable Innovation</span>
              </motion.div>
              
              <motion.h1 
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-5xl md:text-7xl font-serif font-bold text-white mb-5 leading-[0.9]"
              >
                {slides[index].title.split(' ')[0]}<br />
                <span className="text-accent">{slides[index].title.split(' ').slice(1).join(' ')}</span>
              </motion.h1>
              
              <motion.p 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-lg md:text-xl text-primary-foreground font-sans mb-10 max-w-lg opacity-80 leading-relaxed"
              >
                {slides[index].description}
              </motion.p>
              
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex items-center gap-6"
              >
                <button 
                  onClick={() => navigate('/products')}
                  className="bg-accent text-accent-foreground px-10 py-5 rounded-full text-[10px] font-mono tracking-widest uppercase font-bold hover:bg-primary-foreground hover:text-primary transition-all shadow-xl"
                >
                  Explore Collection
                </button>
                <div className="w-16 h-px bg-white/20" />
                <span className="text-[10px] font-mono tracking-widest uppercase text-white/50">Verified Tech</span>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Improved Smooth Horizontal Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="group relative flex flex-col items-center"
            >
              <div className={`w-16 h-0.5 transition-all duration-500 mb-3 ${
                i === index ? "bg-accent scale-x-100" : "bg-white/20 scale-x-50 group-hover:scale-x-75 group-hover:bg-white/40"
              }`} />
              <span className={`text-[10px] font-mono transition-all duration-300 ${i === index ? "text-accent opacity-100" : "text-white opacity-40 group-hover:opacity-100"}`}>
                0{i + 1}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

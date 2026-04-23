import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../lib/ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function Navbar({ onImpactClick }: { onImpactClick: () => void }) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Process', path: '/process' },
    { name: 'Impact', path: '/impact' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center group">
          <img src="/logo.png" alt="EkoKintsugi Logo" className="h-12 w-auto transition-transform duration-500 group-hover:scale-105" />
        </Link>

        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className="text-[10px] font-mono tracking-[0.25em] uppercase transition-all duration-300 py-1 text-primary/70 hover:text-accent font-bold relative group/link"
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover/link:w-full ${isActive ? 'w-full' : ''}`} />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-border/50 text-muted-foreground hover:text-primary hover:border-border transition-colors bg-card"
            title="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button 
            onClick={onImpactClick}
            className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase font-black px-6 py-2.5 rounded-full border-2 border-accent text-accent hover:bg-accent hover:text-white transition-all shadow-sm"
          >
            My Impact
          </button>
          <Link 
            to="/contact"
            className="bg-primary text-white px-7 py-2.5 rounded text-[10px] font-mono tracking-widest uppercase font-bold hover:bg-accent hover:text-accent-foreground transition-all shadow-md"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </header>
  );
}

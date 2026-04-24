import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../lib/ThemeContext";
import { LogOut, Moon, Sun, UserRound } from "lucide-react";
import { useAuth } from "../lib/AuthContext";

export default function Navbar({ onImpactClick }: { onImpactClick: () => void }) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user, displayName, signOut } = useAuth();

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
          <span className="logo-surface px-3 py-2 transition-transform duration-500 group-hover:scale-105">
            <img src="/logo.png" alt="EkoKintsugi Logo" className="h-16 w-auto" />
          </span>
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
          {user ? (
            <div className="flex items-center gap-2">
              <div className="hidden xl:flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-primary">
                <UserRound className="w-4 h-4 text-accent" />
                <span className="max-w-28 truncate text-[10px] font-mono tracking-widest uppercase font-black">
                  {displayName}
                </span>
              </div>
              <button
                onClick={signOut}
                className="p-2.5 rounded-full border border-border/50 text-muted-foreground hover:text-primary hover:border-border transition-colors bg-card"
                title="Sign out"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="bg-primary text-primary-foreground px-7 py-2.5 rounded text-[10px] font-mono tracking-widest uppercase font-bold hover:bg-accent hover:text-accent-foreground transition-all shadow-md"
            >
              Sign In / Up
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

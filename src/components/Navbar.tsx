import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../lib/ThemeContext";
import { LogOut, Moon, Sun, UserRound, ShoppingBag } from "lucide-react";
import { useAuth } from "../lib/AuthContext";
import { useCart } from "../lib/CartContext";
import { useLanguage } from "../lib/LanguageContext";
import { motion } from "motion/react";

export default function Navbar({ onImpactClick }: { onImpactClick: () => void }) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const { totalItems, setCartOpen } = useCart();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { name: t("nav.home"), path: '/' },
    { name: t("nav.about"), path: '/about' },
    { name: t("nav.products"), path: '/products' },
    { name: t("nav.process"), path: '/process' },
    { name: t("nav.impact"), path: '/impact' },
    { name: t("nav.contact"), path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 navbar-premium">
      <div className="max-w-7xl mx-auto px-6 py-2.5 flex justify-between items-center">
        {/* Left Side: Brand Logo (Raw and uncontained) */}
        <Link to="/" className="flex items-center group">
          <span className="logo-surface transition-transform duration-500 group-hover:scale-[1.02]">
            <img src="/logo_eko.png" alt="EkoKintsugi Logo" className="h-14 w-auto logo-image-premium" />
          </span>
        </Link>

        {/* Center: Minimalist Nav Links */}
        <nav className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => {
            const isActive = link.path === "/products"
              ? location.pathname === "/products" || location.pathname.startsWith("/products/")
              : location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className="text-[9px] font-mono tracking-[0.25em] uppercase transition-all duration-300 py-1 text-primary/80 hover:text-accent font-bold relative group/link nav-link-premium"
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover/link:w-full ${isActive ? 'w-full' : ''}`} />
              </Link>
            );
          })}
        </nav>

        {/* Right Side: Consolidated Control Panel */}
        <div className="flex items-center gap-3">
          {/* Integrated Preferences Control Pill (Theme + Language) */}
          <div className="flex items-center rounded-full px-1.5 py-1 gap-1 transition-all pref-pill-premium">
            {/* Language Toggler */}
            <button
              onClick={() => setLanguage(language === "en" ? "de" : "en")}
              className="px-2 py-1 rounded-full text-[9px] font-mono tracking-wider font-bold transition-colors cursor-pointer"
              title={language === "en" ? "Switch to German" : "Auf Englisch wechseln"}
            >
              <span className={language === "en" ? "text-accent" : ""}>EN</span>
              <span className="text-border/30 text-[8px] mx-1 font-light">|</span>
              <span className={language === "de" ? "text-accent" : ""}>DE</span>
            </button>
            
            <div className="w-px h-3 bg-border/40" />
            
            {/* Theme Toggler */}
            <button
              onClick={toggleTheme}
              className="p-1 rounded-full transition-colors cursor-pointer"
              title="Toggle theme"
            >
              {theme === "dark" ? <Sun size={12} /> : <Moon size={12} />}
            </button>
          </div>

          {/* Cart Button */}
          {user && (
            <button
              onClick={() => setCartOpen(true)}
              className="p-2 rounded-full relative cursor-pointer group btn-premium"
              title="Open cart"
            >
              <ShoppingBag size={14} className="transition-transform duration-300 group-hover:scale-105" />
              {totalItems > 0 && (
                <motion.span
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   className="absolute -top-1.5 -right-1.5 bg-accent text-accent-foreground text-[8px] font-mono font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border border-background shadow-sm"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
          )}

          {/* Compact 'My Impact' Action Button */}
          <button 
            onClick={onImpactClick}
            className="flex items-center gap-1.5 text-[9px] font-mono tracking-widest uppercase font-bold px-4 py-2.5 rounded-full cursor-pointer hover:scale-[1.01] transition-all impact-btn-premium"
          >
            {t("nav.my_impact")}
          </button>

          {/* User Account / Authentication Buttons */}
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/account"
                className="p-2 rounded-full cursor-pointer btn-premium"
                title={t("nav.view_account")}
              >
                <UserRound size={14} />
              </Link>
              <button
                onClick={signOut}
                className="p-2 rounded-full cursor-pointer btn-premium"
                title={t("nav.sign_out")}
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="px-5 py-2.5 rounded-full text-[9px] font-mono tracking-widest uppercase font-bold hover:scale-[1.01] transition-all signin-btn-premium"
            >
              {t("nav.sign_in")}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

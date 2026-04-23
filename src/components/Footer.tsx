import { Link, useNavigate } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  
  return (
    <footer className="py-20 bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="mb-6">
              <img src="/logo.png" alt="EkoKintsugi Logo" className="h-16 w-auto" />
            </div>
            <p className="text-muted-foreground text-lg max-w-sm leading-relaxed">
              Transforming waste into beautiful, sustainable products through AI material intelligence and artisan craftsmanship.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-primary text-xl font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Products", path: "/products" },
                { name: "Process", path: "/process" },
                { name: "Impact", path: "/impact" },
                { name: "Contact", path: "/contact" }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-muted-foreground hover:text-accent transition-colors font-medium cursor-pointer"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-primary text-xl font-bold mb-6">Products</h4>
            <ul className="space-y-4">
              {[
                { name: "Accessories & Keychains", query: "Keychains" },
                { name: "Men's Wallets", query: "Wallet" },
                { name: "Sustainable Bags", query: "Bags" },
                { name: "Ladies' Handbags", query: "Handbag" },
                { name: "View All Collections", query: "" }
              ].map((product) => (
                <li key={product.name}>
                  <button 
                    onClick={() => {
                      if (product.query) {
                        navigate(`/products?category=${encodeURIComponent(product.query)}`);
                      } else {
                        navigate(`/products`);
                      }
                    }}
                    className="text-muted-foreground hover:text-accent transition-colors text-left"
                  >
                    {product.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-muted-foreground">
              © {currentYear} EkoKintsugi LLP. All rights reserved.
            </p>
            <div className="flex gap-8">
              <Link to="/" className="text-sm text-muted-foreground hover:text-accent transition-colors font-medium">
                Privacy Policy
              </Link>
              <Link to="/" className="text-sm text-muted-foreground hover:text-accent transition-colors font-medium">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

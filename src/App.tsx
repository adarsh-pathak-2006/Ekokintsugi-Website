/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ImpactDashboard from "./components/ImpactDashboard";
import { useState } from "react";
import ScrollToTop from "./components/ScrollToTop";

import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import ProcessPage from "./pages/ProcessPage";
import ImpactPage from "./pages/ImpactPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  const [isImpactOpen, setIsImpactOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground flex flex-col">
        <Navbar onImpactClick={() => setIsImpactOpen(true)} />
        
        <main className="pt-20 flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/process" element={<ProcessPage />} />
            <Route path="/impact" element={<ImpactPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        <Footer />
        <ImpactDashboard isOpen={isImpactOpen} onClose={() => setIsImpactOpen(false)} />
      </div>
    </Router>
  );
}

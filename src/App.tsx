import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LandingPage } from "./pages/LandingPage";
import { AuthPage } from "./pages/AuthPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { DashboardPage } from "./pages/DashboardPage";
import { PrivacyPolicy, RefundPolicy, Disclaimer } from "./pages/LegalPages";
import { ContactPage } from "./pages/ContactPage";

type Page = "landing" | "login" | "signup" | "checkout" | "dashboard" | "privacy" | "refund" | "disclaimer" | "contact";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    const onBack = () => setCurrentPage("landing");
    
    switch (currentPage) {
      case "landing":
        return <LandingPage onNavigate={(p) => setCurrentPage(p as Page)} />;
      case "login":
        return <AuthPage mode="login" onNavigate={(p) => setCurrentPage(p as Page)} />;
      case "signup":
        return <AuthPage mode="signup" onNavigate={(p) => setCurrentPage(p as Page)} />;
      case "checkout":
        return <CheckoutPage onNavigate={(p) => setCurrentPage(p as Page)} />;
      case "dashboard":
        return <DashboardPage onNavigate={(p) => setCurrentPage(p as Page)} />;
      case "privacy":
        return <PrivacyPolicy onBack={onBack} />;
      case "refund":
        return <RefundPolicy onBack={onBack} />;
      case "disclaimer":
        return <Disclaimer onBack={onBack} />;
      case "contact":
        return <ContactPage onBack={onBack} />;
      default:
        return <LandingPage onNavigate={(p) => setCurrentPage(p as Page)} />;
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

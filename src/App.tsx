import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./lib/firebase";
import { LandingPage } from "./pages/LandingPage";
import { AuthPage } from "./pages/AuthPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { DashboardPage } from "./pages/DashboardPage";
import { PrivacyPolicy, RefundPolicy, Disclaimer } from "./pages/LegalPages";
import { ContactPage } from "./pages/ContactPage";

type Page = "landing" | "login" | "signup" | "checkout" | "dashboard" | "privacy" | "refund" | "disclaimer" | "contact";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for deep-link from Extension
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get("page");
    if (pageParam === "login" || pageParam === "signup") {
      setCurrentPage(pageParam as Page);
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      // Sync with Chrome Extension if present
      const syncData = currentUser ? {
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        timestamp: Date.now()
      } : null;

      window.dispatchEvent(new CustomEvent('PROMPT_SPARK_AUTH_SYNC', { 
        detail: syncData 
      }));
      
      // If user logs in while on auth pages, send to dashboard
      // Dashboard will self-gate: it checks Firestore and redirects to checkout if no active subscription
      if (currentUser && (currentPage === "login" || currentPage === "signup")) {
        setCurrentPage("dashboard");
      }
    });

    return () => unsubscribe();
  }, [currentPage]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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

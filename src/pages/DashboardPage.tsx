import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Zap, 
  LayoutDashboard, 
  History, 
  Settings, 
  CreditCard, 
  LogOut, 
  Search, 
  Bell,
  MoreVertical,
  ExternalLink,
  Plus,
  Clock,
  CheckCircle2,
  User,
  Shield,
  Download,
  Trash2,
  ChevronRight,
  Lock,
  Loader2
} from "lucide-react";
import { Button, Card, Input } from "../components/UI";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

type Tab = "overview" | "history" | "billing" | "settings";

export const DashboardPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [accessStatus, setAccessStatus] = useState<"loading" | "granted" | "denied">("loading");
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        // Not logged in at all → send to login
        onNavigate("login");
        return;
      }
      setUserEmail(user.email);
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          const data = snap.data();
          const tier = data?.tier || "free";
          if (tier === "unlimited" || tier === "pro") {
            setAccessStatus("granted");
          } else {
            setAccessStatus("denied");
          }
        } else {
          // No Firestore record → treat as free
          setAccessStatus("denied");
        }
      } catch (e) {
        console.error("Subscription check error:", e);
        setAccessStatus("denied");
      }
    });
    return () => unsubscribe();
  }, [onNavigate]);

  // ── Loading spinner ──────────────────────────────────────────
  if (accessStatus === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4 text-gray-500">
          <Loader2 className="animate-spin" size={40} />
          <p className="text-sm font-medium">Checking your subscription…</p>
        </div>
      </div>
    );
  }

  // ── Access denied — no active subscription ───────────────────
  if (accessStatus === "denied") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
            <Lock size={36} className="text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-black mb-2">Dashboard Locked</h1>
          <p className="text-gray-500 mb-1 text-sm">
            Signed in as <span className="font-medium text-black">{userEmail}</span>
          </p>
          <p className="text-gray-500 mb-8 text-sm">
            A Prompt Engine Pro subscription is required to access your dashboard.
          </p>
          <div className="space-y-3">
            <Button
              onClick={() => onNavigate("checkout")}
              className="w-full bg-black text-white hover:bg-gray-800 py-3 text-base font-semibold"
            >
              Subscribe Now · $5 / month
            </Button>
            <button
              onClick={() => onNavigate("landing")}
              className="w-full text-sm text-gray-400 hover:text-black transition-colors"
            >
              Back to home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }



  const versions = [
    { id: 1, title: "Product Description v3", date: "2 hours ago", platform: "Shopify", tokens: 124 },
    { id: 2, title: "SEO Blog Post Hook", date: "Yesterday", platform: "Notion", tokens: 89 },
    { id: 3, title: "Email Marketing Sequence", date: "3 days ago", platform: "Gmail", tokens: 450 },
    { id: 4, title: "Technical Documentation", date: "1 week ago", platform: "Google Docs", tokens: 1200 },
    { id: 5, title: "Ad Copy Generator", date: "2 weeks ago", platform: "Facebook", tokens: 56 },
    { id: 6, title: "Customer Support Reply", date: "2 weeks ago", platform: "Zendesk", tokens: 112 },
  ];

  const NavItems = () => (
    <>
      <button 
        onClick={() => { setActiveTab("overview"); setIsMobileMenuOpen(false); }}
        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeTab === "overview" ? "bg-gray-100 text-black font-medium" : "text-gray-500 hover:bg-gray-50 hover:text-black"}`}
      >
        <LayoutDashboard size={18} />
        Dashboard
      </button>
      <button 
        onClick={() => { setActiveTab("history"); setIsMobileMenuOpen(false); }}
        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeTab === "history" ? "bg-gray-100 text-black font-medium" : "text-gray-500 hover:bg-gray-50 hover:text-black"}`}
      >
        <History size={18} />
        History
      </button>
      <button 
        onClick={() => { setActiveTab("billing"); setIsMobileMenuOpen(false); }}
        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeTab === "billing" ? "bg-gray-100 text-black font-medium" : "text-gray-500 hover:bg-gray-50 hover:text-black"}`}
      >
        <CreditCard size={18} />
        Billing
      </button>
      <button 
        onClick={() => { setActiveTab("settings"); setIsMobileMenuOpen(false); }}
        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeTab === "settings" ? "bg-gray-100 text-black font-medium" : "text-gray-500 hover:bg-gray-50 hover:text-black"}`}
      >
        <Settings size={18} />
        Settings
      </button>
    </>
  );

  const OverviewView = () => (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Prompts Optimized</p>
            <p className="text-3xl font-bold">1,284</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
            <Zap size={24} />
          </div>
        </Card>
        <Card className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Time Saved</p>
            <p className="text-3xl font-bold">42h</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <Clock size={24} />
          </div>
        </Card>
        <Card className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Subscription</p>
            <p className="text-xl font-bold text-green-600 flex items-center gap-1">
              <CheckCircle2 size={18} />
              Active
            </p>
          </div>
          <div className="h-12 w-12 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center">
            <CreditCard size={24} />
          </div>
        </Card>
      </div>

      {/* Subscription Card */}
      <Card className="bg-gradient-to-r from-gray-900 to-black text-white p-8 border-none relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Prompt Engine Pro</h2>
            <p className="text-gray-400">Your subscription is active and will renew on May 6, 2026.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" onClick={() => setActiveTab("billing")}>
              Manage Billing
            </Button>
            <Button className="bg-white text-black hover:bg-gray-100">
              Download Extension
            </Button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
      </Card>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* History Preview */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Recent History</h3>
            <button onClick={() => setActiveTab("history")} className="text-sm text-accent font-medium hover:underline">View all</button>
          </div>
          <div className="space-y-3">
            {versions.slice(0, 4).map((v) => (
              <Card key={v.id} className="p-4 flex items-center justify-between hover:border-gray-300 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-black transition-colors">
                    <History size={20} />
                  </div>
                  <div>
                    <p className="font-medium">{v.title}</p>
                    <p className="text-xs text-gray-500">{v.platform} • {v.date}</p>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-black">
                  <MoreVertical size={16} />
                </button>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-3">
            <button className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-white hover:border-black transition-all text-left">
              <div className="h-10 w-10 rounded-lg bg-accent-soft text-accent flex items-center justify-center">
                <Plus size={20} />
              </div>
              <div>
                <p className="font-medium">New Prompt</p>
                <p className="text-xs text-gray-500">Create from scratch</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-white hover:border-black transition-all text-left">
              <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <ExternalLink size={20} />
              </div>
              <div>
                <p className="font-medium">Open Extension</p>
                <p className="text-xs text-gray-500">Launch in browser</p>
              </div>
            </button>
          </div>

          <div className="p-6 bg-gray-100 rounded-2xl mt-4">
            <h4 className="font-bold mb-2">Need help?</h4>
            <p className="text-sm text-gray-600 mb-4">Our support team is available 24/7 for Pro members.</p>
            <Button variant="outline" size="sm" className="w-full" onClick={() => onNavigate("contact")}>Contact Support</Button>
          </div>
        </div>
      </div>
    </div>
  );

  const HistoryView = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Prompt History</h2>
          <p className="text-gray-500">View and manage your optimized prompts.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" icon={Download}>Export CSV</Button>
          <Button variant="outline" size="sm" icon={Trash2} className="text-red-500 hover:text-red-600">Clear All</Button>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Prompt Title</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Platform</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Tokens</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Date</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {versions.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded bg-gray-100 flex items-center justify-center text-gray-400 group-hover:text-black">
                        <History size={16} />
                      </div>
                      <span className="font-medium text-gray-900">{v.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{v.platform}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{v.tokens}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{v.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-black">
                      <ChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const BillingView = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Billing & Subscription</h2>
        <p className="text-gray-500">Manage your plan, payment methods, and invoices.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">Current Plan</h3>
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded uppercase">Active</span>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-sm font-bold">Prompt Engine Pro</p>
            <p className="text-2xl font-bold mt-1">$5.00<span className="text-sm font-normal text-gray-500">/month</span></p>
            <p className="text-xs text-gray-500 mt-2">Renews on May 6, 2026</p>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-medium">Plan Features:</p>
            <ul className="space-y-2">
              {["Unlimited optimizations", "Version history", "Priority support"].map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 size={14} className="text-green-500" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <Button variant="outline" className="w-full text-red-500 hover:text-red-600">Cancel Subscription</Button>
        </Card>

        <Card className="space-y-6">
          <h3 className="font-bold">Payment Method</h3>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="h-10 w-12 bg-gray-100 rounded flex items-center justify-center">
                <CreditCard size={20} className="text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-bold">Visa ending in 4242</p>
                <p className="text-xs text-gray-500">Expires 12/28</p>
              </div>
            </div>
            <button className="text-sm text-accent font-medium hover:underline">Edit</button>
          </div>
          <Button variant="outline" className="w-full">Add New Method</Button>
          
          <div className="pt-4 border-t border-gray-100">
            <h4 className="text-sm font-bold mb-4">Recent Invoices</h4>
            <div className="space-y-3">
              {[
                { date: "Apr 6, 2026", amount: "$5.00", status: "Paid" },
                { date: "Mar 6, 2026", amount: "$5.00", status: "Paid" },
              ].map((inv, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{inv.date}</span>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">{inv.amount}</span>
                    <button className="text-accent hover:underline"><Download size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const SettingsView = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Account Settings</h2>
        <p className="text-gray-500">Update your profile and application preferences.</p>
      </div>

      <div className="max-w-2xl space-y-8">
        <Card className="space-y-6">
          <h3 className="font-bold flex items-center gap-2">
            <User size={18} />
            Profile Information
          </h3>
          <div className="flex items-center gap-6">
            <img 
              src="https://picsum.photos/seed/user1/80/80" 
              className="h-20 w-20 rounded-full border-2 border-gray-100"
              referrerPolicy="no-referrer"
            />
            <Button variant="outline" size="sm">Change Avatar</Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Full Name" defaultValue="HNG AI Lab User" />
            <Input label="Email Address" defaultValue="hypenest.official@gmail.com" disabled />
          </div>
          <Button size="sm">Save Changes</Button>
        </Card>

        <Card className="space-y-6">
          <h3 className="font-bold flex items-center gap-2">
            <Shield size={18} />
            Security
          </h3>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Change your password to keep your account secure.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Current Password" type="password" />
              <Input label="New Password" type="password" />
            </div>
            <Button variant="outline" size="sm">Update Password</Button>
          </div>
        </Card>

        <Card className="space-y-6 border-red-100">
          <h3 className="font-bold text-red-600 flex items-center gap-2">
            <Trash2 size={18} />
            Danger Zone
          </h3>
          <p className="text-sm text-gray-600">Permanently delete your account and all associated data. This action cannot be undone.</p>
          <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">Delete Account</Button>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return <OverviewView />;
      case "history": return <HistoryView />;
      case "billing": return <BillingView />;
      case "settings": return <SettingsView />;
      default: return <OverviewView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 h-16 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img src="/hng-logo.png" alt="HNG AI LAB Logo" className="h-10 w-auto" />
          <span className="font-serif font-bold text-xl sr-only">Prompt Engine</span>
        </div>

        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-500"
        >
          {isMobileMenuOpen ? <Plus className="rotate-45 transition-transform" /> : <LayoutDashboard />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed inset-0 z-40 bg-white pt-20 px-4"
          >
            <nav className="space-y-2">
              <NavItems />
              <button 
                onClick={() => onNavigate("landing")}
                className="flex items-center gap-3 px-3 py-2 text-gray-500 hover:text-red-500 transition-colors w-full"
              >
                <LogOut size={18} />
                Log out
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar (Desktop) */}
      <aside className="w-64 border-r border-gray-200 bg-white hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-2">
          <img src="/hng-logo.png" alt="HNG AI LAB Logo" className="h-10 w-auto" />
          <span className="font-serif font-bold text-xl sr-only">Prompt Engine</span>
        </div>


        <nav className="flex-1 px-4 space-y-1">
          <NavItems />
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="p-4 bg-accent-soft rounded-xl">
            <p className="text-xs font-bold text-accent uppercase tracking-wider mb-1">Pro Plan</p>
            <p className="text-sm text-gray-600 mb-3">Unlimited access active</p>
            <div className="h-1.5 w-full bg-white rounded-full overflow-hidden">
              <div className="h-full w-full bg-accent" />
            </div>
          </div>
          <button 
            onClick={() => onNavigate("landing")}
            className="flex items-center gap-3 px-3 py-2 mt-4 rounded-lg text-gray-500 hover:text-red-500 transition-colors w-full"
          >
            <LogOut size={18} />
            Log out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header (Desktop) */}
        <header className="h-16 bg-white border-b border-gray-200 hidden lg:flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search prompts..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-1 focus:ring-black outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-black transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 h-2 w-2 bg-accent rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">hypenest.official@gmail.com</p>
                <p className="text-xs text-gray-500">Pro Member</p>
              </div>
              <img 
                src="https://picsum.photos/seed/user1/40/40" 
                className="h-10 w-10 rounded-full border border-gray-200"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

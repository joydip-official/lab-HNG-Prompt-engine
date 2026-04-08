import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Zap, History, Globe, ArrowRight, Star, LayoutDashboard, Plus } from "lucide-react";
import { Button } from "../components/UI";

export const LandingPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full glass border-b border-gray-100">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <img src="/hng-logo.png" alt="HNG AI LAB Logo" className="h-12 w-auto" />
            <span className="text-xl font-serif font-bold tracking-tight sr-only">Prompt Engine</span>
          </div>

          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => onNavigate("login")}>Log in</Button>
            <Button size="sm" onClick={() => onNavigate("signup")}>Get Started</Button>
          </div>

          {/* Mobile Nav Toggle */}
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <Plus className="rotate-45" /> : <LayoutDashboard size={20} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
            >
              <div className="flex flex-col p-4 gap-2">
                <Button variant="ghost" className="justify-start" onClick={() => { onNavigate("login"); setIsMobileMenuOpen(false); }}>Log in</Button>
                <Button className="justify-start" onClick={() => { onNavigate("signup"); setIsMobileMenuOpen(false); }}>Get Started</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-[120px]" />
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block rounded-full bg-accent-soft px-4 py-1.5 text-xs font-semibold text-accent mb-6">
              V2.0 is now live
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-gray-900 mb-6 leading-[1.1]">
              Turn Basic Prompts into <br />
              <span className="text-accent italic">Expert-Level</span> Instructions
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 mb-10 leading-relaxed">
              The Chrome extension that optimizes your AI prompts with one click. 
              Get better results from ChatGPT, Claude, and Gemini instantly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" onClick={() => onNavigate("signup")} icon={ArrowRight}>
                Upgrade to Pro – $5/month
              </Button>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://picsum.photos/seed/user${i}/32/32`}
                      className="h-8 w-8 rounded-full border-2 border-white"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
                <span>Trusted by 10,000+ users</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Before vs After */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">See the Difference</h2>
            <p className="text-gray-600">Stop settling for mediocre AI outputs. Get precision every time.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl border border-gray-200 soft-shadow"
            >
              <div className="flex items-center gap-2 text-red-500 font-semibold mb-4">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                Before
              </div>
              <p className="text-gray-500 italic mb-4">"Write a blog post about coffee."</p>
              <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                Generic, surface-level output...
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl border-2 border-accent soft-shadow relative"
            >
              <div className="absolute -top-3 -right-3 bg-accent text-white p-2 rounded-lg shadow-lg">
                <Zap size={16} fill="currentColor" />
              </div>
              <div className="flex items-center gap-2 text-accent font-semibold mb-4">
                <span className="h-2 w-2 rounded-full bg-accent" />
                After Prompt Engine
              </div>
              <p className="text-gray-900 font-medium mb-4">
                "Act as a professional barista and food critic. Write a 1,500-word deep dive into the chemistry of espresso extraction, focusing on pressure, temperature, and bean origin..."
              </p>
              <div className="h-32 bg-accent-soft/30 rounded-lg flex items-center justify-center text-accent text-sm font-medium">
                Expert, nuanced, and detailed output.
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center text-black">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold">Unlimited Optimization</h3>
              <p className="text-gray-600">Optimize as many prompts as you need. No daily limits, no hidden fees.</p>
            </div>
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center text-black">
                <History size={24} />
              </div>
              <h3 className="text-xl font-bold">Prompt Versioning</h3>
              <p className="text-gray-600">Save your best prompts and track changes over time. Never lose a great instruction again.</p>
            </div>
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center text-black">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-bold">Works Everywhere</h3>
              <p className="text-gray-600">Seamlessly integrates with ChatGPT, Notion, Google Docs, and more via our extension.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md bg-white rounded-3xl border border-gray-200 overflow-hidden soft-shadow">
            <div className="p-8 text-center border-b border-gray-100">
              <h3 className="text-2xl font-bold mb-2">Pro Plan</h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold">$5</span>
                <span className="text-gray-500">/month</span>
              </div>
            </div>
            <div className="p-8 space-y-4">
              {[
                "Unlimited prompt optimization",
                "Prompt versioning & history",
                "Priority support",
                "Early access to new features",
                "Works across all major AI platforms"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Check size={12} />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
              <Button className="w-full mt-6" size="lg" onClick={() => onNavigate("signup")}>
                Get Started Now
              </Button>
              <p className="text-center text-xs text-gray-400 mt-4">No credit card required to start</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-black text-white flex items-center justify-center">
              <Zap size={12} fill="currentColor" />
            </div>
            <span className="font-serif font-bold">Prompt Engine</span>
          </div>
          <p className="text-sm text-gray-500">© 2026 HNG AI Lab. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <a href="privacy.html" className="hover:text-black transition-colors">Privacy</a>
            <a href="terms.html" className="hover:text-black transition-colors">Refunds</a>
            <a href="terms.html" className="hover:text-black transition-colors">Terms</a>
            <a href="mailto:support@hypenestglobal.com" className="hover:text-black transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

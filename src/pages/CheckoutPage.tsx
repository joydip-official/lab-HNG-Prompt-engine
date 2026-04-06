import { motion } from "motion/react";
import { ShieldCheck, CreditCard, Calendar, Lock, ArrowLeft, Check } from "lucide-react";
import { Button, Input, Card } from "../components/UI";

export const CheckoutPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={() => onNavigate("signup")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to account details
        </button>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left: Payment Form */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h1 className="text-3xl font-serif font-bold mb-2">Checkout</h1>
              <p className="text-gray-500">Complete your subscription to Prompt Engine Pro.</p>
            </div>

            <Card className="p-8">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <CreditCard size={20} />
                Payment Method
              </h2>
              
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onNavigate("dashboard"); }}>
                <Input label="Cardholder Name" placeholder="John Doe" required />
                <Input label="Card Number" placeholder="0000 0000 0000 0000" required />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Expiry Date" placeholder="MM/YY" required />
                  <Input label="CVV" placeholder="123" required />
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 flex items-start gap-3">
                  <ShieldCheck className="text-green-600 mt-0.5" size={18} />
                  <div>
                    <p className="text-sm font-medium">Secure Checkout</p>
                    <p className="text-xs text-gray-500">Your payment information is encrypted and never stored on our servers.</p>
                  </div>
                </div>

                <Button className="w-full" size="lg" type="submit">
                  Subscribe Now – $5.00
                </Button>
                
                <p className="text-center text-xs text-gray-400">
                  By subscribing, you agree to our Terms of Service and Privacy Policy.
                  30-day money-back guarantee.
                </p>
              </form>
            </Card>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-8 space-y-6">
              <Card className="p-6 bg-black text-white border-none">
                <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Prompt Engine Pro</p>
                      <p className="text-xs text-gray-400">Monthly Subscription</p>
                    </div>
                    <p className="font-bold">$5.00</p>
                  </div>
                  
                  <div className="border-t border-white/10 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Subtotal</span>
                      <span>$5.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Tax</span>
                      <span>$0.00</span>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                    <span className="font-bold">Total due today</span>
                    <span className="text-2xl font-bold">$5.00</span>
                  </div>
                </div>
              </Card>

              <div className="space-y-4 px-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">What's included</h3>
                <ul className="space-y-3">
                  {[
                    "Unlimited prompt optimization",
                    "Prompt version history",
                    "Multi-platform support",
                    "Priority AI processing"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                      <Check size={14} className="text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

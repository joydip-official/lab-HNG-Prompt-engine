import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ShieldCheck, CreditCard, Calendar, Lock, ArrowLeft, Check, Loader2 } from "lucide-react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { Button, Input, Card } from "../components/UI";

declare global {
  interface Window {
    paypal?: any;
  }
}

export const CheckoutPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Load PayPal SDK
    if (window.paypal) {
      setIsSdkLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=Aae8Cxwth8tVLr3UYVaPhwtGsN8mC9rfs5i6T0_KM0tcFBbrYSXtwDzfyYeZivS8CGdmf-REB-szkK1t&vault=true&intent=subscription`;
    script.async = true;
    script.onload = () => setIsSdkLoaded(true);
    script.onerror = () => setError("Failed to load payment system. Please refresh.");
    document.body.appendChild(script);

    return () => {
      // Clean up if needed
    };
  }, []);

  useEffect(() => {
    if (isSdkLoaded && window.paypal) {
      window.paypal.Buttons({
        style: {
          shape: 'rect',
          color: 'gold',
          layout: 'vertical',
          label: 'subscribe'
        },
        createSubscription: (data: any, actions: any) => {
          return actions.subscription.create({
            plan_id: 'P-4CH36570HS833343HNHKHI4Y'
          });
        },
        onApprove: async (data: any, actions: any) => {
          setIsProcessing(true);
          try {
            const user = auth.currentUser;
            if (user) {
              await setDoc(doc(db, "users", user.uid), {
                tier: "unlimited",
                subscriptionId: data.subscriptionID,
                updatedAt: serverTimestamp()
              }, { merge: true });
              
              onNavigate("dashboard");
            } else {
              setError("Session expired. Please log in again.");
            }
          } catch (err: any) {
            console.error("Sync error:", err);
            setError("Payment successful, but sync failed. Contact support.");
          } finally {
            setIsProcessing(false);
          }
        },
        onError: (err: any) => {
          console.error("PayPal Error:", err);
          setError("An error occurred during payment. Please try again.");
        }
      }).render("#paypal-button-container");
    }
  }, [isSdkLoaded, onNavigate]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={() => onNavigate("dashboard")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to account details
        </button>

        <div className="grid lg:grid-cols-5 gap-12 text-black">
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
              
              {error && (
                <div className="p-4 mb-6 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600 flex items-start gap-3">
                  {error}
                </div>
              )}

              {isProcessing ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <Loader2 className="animate-spin text-accent" size={40} />
                  <p className="text-sm font-medium">Activating your Pro membership...</p>
                </div>
              ) : (
                <div id="paypal-button-container" className="min-h-[150px]">
                  {!isSdkLoaded && !error && (
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-pulse text-gray-400">Loading payment methods...</div>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100 flex items-start gap-3">
                <ShieldCheck className="text-green-600 mt-0.5" size={18} />
                <div>
                  <p className="text-sm font-medium">Secure Checkout</p>
                  <p className="text-xs text-gray-500">Payments are processed securely via PayPal. Recurring billing starts today.</p>
                </div>
              </div>
              
              <p className="mt-6 text-center text-xs text-gray-400">
                By subscribing, you agree to our Terms of Service and Privacy Policy.
                Manage your subscription anytime in your dashboard.
              </p>
            </Card>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-8 space-y-6">
              <Card className="p-6 border border-gray-100">
                <h2 className="text-lg font-bold mb-4 text-black">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-start text-black">
                    <div>
                      <p className="font-medium">Prompt Engine Pro</p>
                      <p className="text-xs text-gray-500">Monthly Subscription</p>
                    </div>
                    <p className="font-bold">$5.00</p>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4 space-y-2">
                    <div className="flex justify-between text-sm text-black">
                      <span className="text-gray-500">Subtotal</span>
                      <span>$5.00</span>
                    </div>
                    <div className="flex justify-between text-sm text-black">
                      <span className="text-gray-500">Tax</span>
                      <span>$0.00</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4 flex justify-between items-center text-black">
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

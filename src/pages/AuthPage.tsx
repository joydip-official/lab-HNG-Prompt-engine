import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Zap, Mail, Lock, ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification
} from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";
import { Button, Input, Card } from "../components/UI";

export const AuthPage = ({ mode, onNavigate }: { mode: "login" | "signup"; onNavigate: (page: string) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"default" | "forgot" | "verify">("default");

  // If a user is already loaded but unverified, automatically show them the verify screen
  useEffect(() => {
    if (auth.currentUser && auth.currentUser.providerData.some(p => p.providerId === 'password') && !auth.currentUser.emailVerified) {
      setViewMode("verify");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
        onNavigate("checkout");
      } else {

        await createUserWithEmailAndPassword(auth, email, password);
        // Skip email verification and go directly to checkout
        onNavigate("checkout");
      }

    } catch (err: any) {
      setError(err.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      onNavigate("checkout");
    } catch (err: any) {
      setError(err.message || "Google Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setViewMode("default");
      alert("Password reset email sent! Check your inbox.");
    } catch (err: any) {
      setError(err.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (auth.currentUser) {
      setLoading(true);
      setError("");
      try {
        await sendEmailVerification(auth.currentUser);
        alert("Verification email resent!");
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const checkVerificationStatus = async () => {
    if (auth.currentUser) {
      setLoading(true);
      setError("");
      await auth.currentUser.reload();
      if (auth.currentUser.emailVerified) {
        onNavigate("checkout");
      } else {
        setError("Email still not verified. Please check your inbox or spam folder.");
      }
      setLoading(false);
    }
  };

  if (viewMode === "verify") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-md text-center">
          <div className="h-16 w-16 mx-auto rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
            <Mail size={32} />
          </div>
          <h1 className="text-3xl font-serif font-bold text-black mb-2">Verify your email</h1>
          <p className="text-gray-500 mb-8">
            We sent a secure verification link to <strong>{email || auth.currentUser?.email}</strong>. 
            Please click the link in the email to activate your account.
          </p>
          
          <Card className="p-8 space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-xs text-red-600 text-left">
                {error}
              </div>
            )}
            <Button className="w-full" onClick={checkVerificationStatus} isLoading={loading}>
               I've clicked the link
            </Button>
            <Button variant="outline" className="w-full" onClick={handleResendVerification} disabled={loading}>
               Resend Email
            </Button>
          </Card>
          
          <button 
            onClick={() => { auth.signOut(); setViewMode("default"); }} 
            className="mt-6 text-sm text-gray-500 hover:text-black hover:underline"
          >
            Sign out and use a different account
          </button>
        </div>
      </div>
    );
  }

  if (viewMode === "forgot") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <button 
          onClick={() => setViewMode("default")}
          className="absolute top-8 left-8 flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors"
        >
          <ArrowLeft size={16} />
          Back to login
        </button>

        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-8">
            <div className="h-12 w-12 rounded-xl bg-black text-white flex items-center justify-center mb-4 shadow-lg">
              <Lock size={24} />
            </div>
            <h1 className="text-3xl font-serif font-bold text-black">Reset password</h1>
            <p className="text-gray-500 mt-2 text-center">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          <Card className="p-8">
            <form className="space-y-4" onSubmit={handleResetPassword}>
              {error && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-xs text-red-600">
                  {error}
                </div>
              )}
              
              <Input 
                label="Email address" 
                type="email" 
                placeholder="name@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
              
              <Button className="w-full" type="submit" isLoading={loading}>
                Send Reset Link
              </Button>
            </form>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <button 
        onClick={() => onNavigate("landing")}
        className="absolute top-8 left-8 flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors"
      >
        <ArrowLeft size={16} />
        Back to home
      </button>

      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="mb-4">
            <img src="/hng-logo.png" alt="HNG AI LAB Logo" className="h-16 w-auto" />
          </div>

          <h1 className="text-3xl font-serif font-bold text-black">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-gray-500 mt-2">
            {mode === "login" ? "Enter your details to access your account" : "Start optimizing your prompts today"}
          </p>
        </div>

        <Card className="p-8">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-xs text-red-600">
                {error}
              </div>
            )}
            
            <Input 
              label="Email address" 
              type="email" 
              placeholder="name@company.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <Input 
              label="Password" 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            
            {mode === "login" && (
              <div className="flex justify-end">
                <button 
                  type="button" 
                  onClick={() => setViewMode("forgot")}
                  className="text-xs text-accent font-medium hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <Button className="w-full" type="submit" isLoading={loading}>
              {mode === "login" ? "Sign in" : "Create account"}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-400">Or continue with</span>
              </div>
            </div>

            <Button variant="outline" className="w-full" type="button" onClick={handleGoogleAuth} disabled={loading}>
              <img src="https://www.google.com/favicon.ico" className="mr-2 h-4 w-4" alt="Google" />
              Google
            </Button>
          </form>
        </Card>

        <p className="text-center text-sm text-gray-500 mt-6">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <button 
                onClick={(e) => { e.preventDefault(); onNavigate("signup"); }} 
                className="text-black font-semibold hover:underline"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button 
                onClick={(e) => { e.preventDefault(); onNavigate("login"); }} 
                className="text-black font-semibold hover:underline"
              >
                Log in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

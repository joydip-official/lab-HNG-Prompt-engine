import { motion } from "motion/react";
import { Zap, Mail, Lock, ArrowLeft } from "lucide-react";
import { Button, Input, Card } from "../components/UI";

export const AuthPage = ({ mode, onNavigate }: { mode: "login" | "signup"; onNavigate: (page: string) => void }) => {
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
          <div className="h-12 w-12 rounded-xl bg-black text-white flex items-center justify-center mb-4 shadow-lg">
            <Zap size={24} fill="currentColor" />
          </div>
          <h1 className="text-3xl font-serif font-bold">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-gray-500 mt-2">
            {mode === "login" ? "Enter your details to access your account" : "Start optimizing your prompts today"}
          </p>
        </div>

        <Card className="p-8">
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onNavigate(mode === "signup" ? "checkout" : "dashboard"); }}>
            <Input 
              label="Email address" 
              type="email" 
              placeholder="name@company.com" 
              required 
            />
            <Input 
              label="Password" 
              type="password" 
              placeholder="••••••••" 
              required 
            />
            
            {mode === "login" && (
              <div className="flex justify-end">
                <button type="button" className="text-xs text-accent font-medium hover:underline">
                  Forgot password?
                </button>
              </div>
            )}

            <Button className="w-full" type="submit">
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

            <Button variant="outline" className="w-full" type="button">
              <img src="https://www.google.com/favicon.ico" className="mr-2 h-4 w-4" alt="Google" />
              Google
            </Button>
          </form>
        </Card>

        <p className="text-center text-sm text-gray-500 mt-6">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <button onClick={() => onNavigate("signup")} className="text-black font-semibold hover:underline">
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button onClick={() => onNavigate("login")} className="text-black font-semibold hover:underline">
                Log in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

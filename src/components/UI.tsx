import React from "react";
import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  isLoading?: boolean;
  [key: string]: any;
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  isLoading,
  className = "",
  ...props
}: ButtonProps) => {
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-accent text-white hover:bg-accent/90",
    outline: "border border-gray-200 bg-white hover:bg-gray-50 text-gray-900",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-600",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : Icon ? (
        <Icon className="mr-2 h-4 w-4" />
      ) : null}
      {children}
    </motion.button>
  );
};

export const Input = ({ label, error, ...props }: { label?: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="w-full space-y-1.5">
    {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
    <input
      className={`w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 outline-none transition-all focus:border-black focus:ring-1 focus:ring-black ${error ? "border-red-500" : ""}`}
      {...props}
    />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

export const Card = ({ children, className = "", ...props }: { children: React.ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`rounded-xl border border-gray-100 bg-white p-6 soft-shadow ${className}`} {...props}>
    {children}
  </div>
);

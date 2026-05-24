"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  icon: Icon,
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-primary text-accent hover:bg-primary-light shadow-sm",
    secondary: "bg-accent text-primary hover:bg-accent-muted border border-primary/20",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-accent",
    ghost: "text-primary hover:bg-primary/10",
    danger: "bg-danger text-white hover:bg-red-700",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </button>
  );
}

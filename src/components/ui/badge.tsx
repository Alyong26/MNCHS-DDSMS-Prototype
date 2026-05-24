import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info" | "accent";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "bg-neutral-100 text-neutral-700",
    success: "bg-green-50 text-success border border-green-200",
    warning: "bg-amber-50 text-warning border border-amber-200",
    danger: "bg-red-50 text-danger border border-red-200",
    info: "bg-blue-50 text-info border border-blue-200",
    accent: "bg-accent text-primary border border-primary/20",
  };

  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", variants[variant], className)}>
      {children}
    </span>
  );
}

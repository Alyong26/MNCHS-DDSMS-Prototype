import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

export function Card({ children, className, hover = false, padding = "md" }: CardProps) {
  const paddings = { sm: "p-4", md: "p-5", lg: "p-6" };
  return (
    <div
      className={cn(
        "bg-card rounded-xl border border-neutral-200/80 shadow-sm",
        paddings[padding],
        hover && "card-hover cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: LucideIcon;
  className?: string;
}

export function StatCard({ label, value, change, trend = "neutral", icon: Icon, className }: StatCardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor = trend === "up" ? "text-success" : trend === "down" ? "text-danger" : "text-neutral-500";

  return (
    <div className={cn("bg-card rounded-xl border border-neutral-200/80 p-5 shadow-sm card-hover", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm text-neutral-500 font-medium">{label}</p>
          <p className="text-2xl font-bold text-primary mt-1">{value}</p>
          {change && (
            <div className={cn("flex items-center gap-1 mt-2 text-xs font-medium line-clamp-2", trendColor)}>
              <TrendIcon className="h-3 w-3 flex-shrink-0" />
              <span className="break-words">{change}</span>
            </div>
          )}
        </div>
        <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
    </div>
  );
}

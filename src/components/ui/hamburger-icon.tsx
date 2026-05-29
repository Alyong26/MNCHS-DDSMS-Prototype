import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Matches Lucide nav icons (20×20, 2px stroke) with inset lines so width aligns with tab icons */
export function HamburgerIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className={cn("h-5 w-5 shrink-0", className)}
      aria-hidden
    >
      <path d="M6 8h12M6 12h12M6 16h12" />
    </svg>
  );
}

/** Fixed-size slot so hamburger aligns with other bottom-nav icons */
export function NavIconSlot({
  children,
  active,
  className,
}: {
  children: ReactNode;
  active?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex h-5 w-5 shrink-0 items-center justify-center",
        active && "scale-110",
        className,
      )}
    >
      {children}
    </span>
  );
}

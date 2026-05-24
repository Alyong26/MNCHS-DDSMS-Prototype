import { cn } from "@/lib/utils";

interface TableScrollProps {
  children: React.ReactNode;
  className?: string;
  /** Hint shown on small screens when table scrolls horizontally */
  hint?: boolean;
}

export function TableScroll({ children, className, hint = true }: TableScrollProps) {
  return (
    <div className={cn("table-scroll -mx-1 px-1", className)}>
      {hint && (
        <p className="text-[11px] text-neutral-500 mb-2 sm:hidden">Swipe horizontally to see all columns</p>
      )}
      {children}
    </div>
  );
}

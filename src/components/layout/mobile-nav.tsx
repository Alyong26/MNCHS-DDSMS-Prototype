"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { getNavIcon } from "@/lib/icons";
import type { NavItem } from "@/types";

const MAX_MOBILE_TABS = 4;

interface MobileNavProps {
  navItems: NavItem[];
  onMoreClick?: () => void;
}

export function MobileNav({ navItems, onMoreClick }: MobileNavProps) {
  const pathname = usePathname();
  const useMore = navItems.length > MAX_MOBILE_TABS + 1;
  const tabItems = useMore ? navItems.slice(0, MAX_MOBILE_TABS) : navItems.slice(0, 5);
  const overflowItems = useMore ? navItems.slice(MAX_MOBILE_TABS) : [];
  const moreIsActive = overflowItems.some((item) => pathname === item.href);

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-neutral-200/80 safe-area-pb">
      <div className="flex items-center justify-around px-1 py-2">
        {tabItems.map((item) => {
          const Icon = getNavIcon(item.icon);
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg min-w-[56px] transition-colors",
                isActive ? "text-primary" : "text-neutral-400",
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "scale-110")} />
              <span className="text-[10px] font-medium leading-tight text-center line-clamp-2 max-w-[64px]">
                {item.mobileLabel || item.label.split(" ")[0]}
              </span>
              {isActive && <span className="w-1 h-1 rounded-full bg-primary" />}
            </Link>
          );
        })}
        {useMore && onMoreClick && (
          <button
            type="button"
            onClick={onMoreClick}
            className={cn(
              "flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg min-w-[56px] transition-colors",
              moreIsActive ? "text-primary" : "text-neutral-400",
            )}
            aria-label="Open more navigation"
          >
            <Menu className={cn("h-5 w-5", moreIsActive && "scale-110")} />
            <span className="text-[10px] font-medium leading-tight">More</span>
            {moreIsActive && <span className="w-1 h-1 rounded-full bg-primary" />}
          </button>
        )}
      </div>
    </nav>
  );
}

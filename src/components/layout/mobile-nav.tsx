"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getNavIcon } from "@/lib/icons";
import type { NavItem } from "@/types";

interface MobileNavProps {
  navItems: NavItem[];
}

export function MobileNav({ navItems }: MobileNavProps) {
  const pathname = usePathname();
  const mobileItems = navItems.slice(0, 5);

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-neutral-200/80 safe-area-pb">
      <div className="flex items-center justify-around px-1 py-2">
        {mobileItems.map((item) => {
          const Icon = getNavIcon(item.icon);
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg min-w-[56px] transition-colors",
                isActive ? "text-primary" : "text-neutral-400"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "scale-110")} />
              <span className="text-[10px] font-medium leading-tight text-center line-clamp-2 max-w-[64px]">{item.mobileLabel || item.label.split(" ")[0]}</span>
              {isActive && <span className="w-1 h-1 rounded-full bg-primary" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { getNavIcon } from "@/lib/icons";
import { HamburgerIcon, NavIconSlot } from "@/components/ui/hamburger-icon";
import type { NavItem } from "@/types";

const MAX_MOBILE_TABS = 4;

const tabClassName = (active: boolean) =>
  cn(
    "flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg min-w-[56px] transition-colors",
    active ? "text-primary" : "text-neutral-400",
  );

function MobileNavTab({
  active,
  label,
  icon: Icon,
  children,
}: {
  active: boolean;
  label: string;
  icon?: LucideIcon;
  children?: ReactNode;
}) {
  return (
    <>
      <NavIconSlot active={active}>
        {children ?? (Icon ? <Icon className="h-5 w-5 shrink-0" strokeWidth={2} /> : null)}
      </NavIconSlot>
      <span className="text-[10px] font-medium leading-tight text-center line-clamp-2 max-w-[64px]">
        {label}
      </span>
      {active && <span className="w-1 h-1 rounded-full bg-primary" />}
    </>
  );
}

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
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-neutral-200/80 safe-area-pb shadow-[0_-4px_12px_rgba(0,0,0,0.06)]"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-around px-1 py-2">
        {tabItems.map((item) => {
          const Icon = getNavIcon(item.icon);
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={tabClassName(isActive)}>
              <MobileNavTab
                active={isActive}
                label={item.mobileLabel || item.label.split(" ")[0]}
                icon={Icon}
              />
            </Link>
          );
        })}
        {useMore && onMoreClick && (
          <button
            type="button"
            onClick={onMoreClick}
            className={tabClassName(moreIsActive)}
            aria-label="Open more navigation"
          >
            <MobileNavTab active={moreIsActive} label="More">
              <HamburgerIcon />
            </MobileNavTab>
          </button>
        )}
      </div>
    </nav>
  );
}

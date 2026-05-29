"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { getNavIcon } from "@/lib/icons";
import { getProfileHref, roleLabels } from "@/lib/navigation";
import { HamburgerIcon, NavIconSlot } from "@/components/ui/hamburger-icon";
import type { NavItem, UserRole } from "@/types";

const MAX_MOBILE_TABS = 4;

const tabClassName = (active: boolean) =>
  cn(
    "flex flex-col items-center justify-end gap-0.5 px-2 py-1.5 rounded-lg min-w-[56px] min-h-[52px] transition-colors",
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
      <span className="h-1 flex items-center justify-center" aria-hidden>
        {active ? <span className="w-1 h-1 rounded-full bg-current" /> : <span className="w-1 h-1" />}
      </span>
    </>
  );
}

interface MobileNavProps {
  navItems: NavItem[];
  onMoreClick?: () => void;
  userName: string;
  role: UserRole;
}

export function MobileNav({ navItems, onMoreClick, userName, role }: MobileNavProps) {
  const pathname = usePathname();
  const useMore = navItems.length > MAX_MOBILE_TABS + 1;
  const tabItems = useMore ? navItems.slice(0, MAX_MOBILE_TABS) : navItems.slice(0, 5);
  const overflowItems = useMore ? navItems.slice(MAX_MOBILE_TABS) : [];
  const moreIsActive = overflowItems.some((item) => pathname === item.href);
  const profileHref = getProfileHref(role);

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex flex-col shadow-[0_-4px_24px_rgba(0,0,0,0.1)]">
      <div className="bg-sidebar text-accent px-4 pt-3 pb-4 border-b border-white/15">
        <Link
          href={profileHref}
          className="flex items-center gap-3 min-h-[44px]"
          aria-label={`${userName} profile`}
        >
          <Image
            src="/images/profile-placeholder.png"
            alt=""
            width={40}
            height={40}
            className="rounded-full border-2 border-accent/25 flex-shrink-0 h-10 w-10 object-cover"
          />
          <div className="min-w-0 flex flex-col justify-center gap-0.5 py-0.5">
            <p className="text-sm font-semibold text-accent leading-snug truncate">{userName}</p>
            <p className="text-xs text-accent/75 capitalize leading-snug">{roleLabels[role]}</p>
          </div>
        </Link>
      </div>

      <nav className="bg-card border-t border-neutral-200/80 safe-area-pb" aria-label="Main navigation">
        <div className="flex items-stretch justify-around px-1 py-2">
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
    </div>
  );
}

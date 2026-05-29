"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { TopNav } from "./top-nav";
import { MobileNav } from "./mobile-nav";
import { roleNav } from "@/lib/navigation";
import { APP_SHORT } from "@/lib/constants";
import type { UserRole } from "@/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChevronLeft, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { SchoolLogo } from "@/components/ui/school-logo";
import { getNavIcon } from "@/lib/icons";

/** Height of docked mobile tab bar — drawer stops above it to avoid overlap / L-shape */
const MOBILE_DOCK_HEIGHT = "4.75rem";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: UserRole;
  userName: string;
  pageTitle?: string;
}

export function DashboardLayout({ children, role, userName, pageTitle }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = roleNav[role];
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background lg:flex lg:min-h-screen">
      <Sidebar
        navItems={navItems}
        role={role}
        userName={userName}
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} aria-hidden />
          <aside
            className="absolute left-0 top-0 flex w-72 max-w-[85vw] animate-fade-in flex-col bg-sidebar text-accent"
            style={{ bottom: `calc(${MOBILE_DOCK_HEIGHT} + env(safe-area-inset-bottom, 0px))` }}
          >
            <div className="shrink-0 border-b border-white/10 p-4">
              <Link
                href="/"
                className="flex flex-col items-center gap-2 text-center"
                onClick={() => setMobileOpen(false)}
              >
                <SchoolLogo size={52} />
                <span className="text-sm font-bold">{APP_SHORT}</span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm text-accent/80 transition-colors hover:bg-white/10"
                aria-label="Close menu"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Hide menu</span>
              </button>
            </div>
            <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto p-3">
              {navItems.map((item) => {
                const Icon = getNavIcon(item.icon);
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
                      isActive ? "bg-accent text-primary" : "text-accent/80 hover:bg-white/10",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="shrink-0 border-t border-white/10 px-3 pb-4 pt-4">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-accent/70 transition-colors hover:bg-white/10 hover:text-accent"
              >
                <LogOut className="h-5 w-5 flex-shrink-0" />
                Sign Out
              </Link>
            </div>
          </aside>
        </div>
      )}

      {/* Mobile: viewport-locked shell. Desktop: natural page scroll with sticky sidebar sibling. */}
      <div
        className={cn(
          "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden",
          "h-[100dvh] max-h-[100dvh]",
          "lg:h-auto lg:max-h-none lg:min-h-screen lg:overflow-visible",
        )}
      >
        <TopNav role={role} userName={userName} onMenuClick={() => setMobileOpen(true)} title={pageTitle} />
        <main className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain p-4 lg:overflow-visible lg:p-6">
          {children}
        </main>
        <MobileNav navItems={navItems} onMoreClick={() => setMobileOpen(true)} />
      </div>
    </div>
  );
}

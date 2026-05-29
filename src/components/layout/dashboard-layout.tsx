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
    <div className="min-h-screen bg-background">
      <Sidebar
        navItems={navItems}
        role={role}
        userName={userName}
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} aria-hidden />
          <aside className="absolute bottom-0 left-0 top-0 flex w-72 max-w-[85vw] animate-fade-in flex-col bg-sidebar text-accent">
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
            <div className="shrink-0 border-t border-white/10 p-3 safe-area-pb">
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

      <div
        className={cn(
          "flex min-h-screen min-w-0 flex-col overflow-x-hidden transition-[padding] duration-300",
          collapsed ? "lg:pl-[72px]" : "lg:pl-64",
        )}
      >
        <TopNav role={role} userName={userName} onMenuClick={() => setMobileOpen(true)} title={pageTitle} />
        <main className="flex-1 overflow-x-hidden p-4 pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] max-w-full lg:p-6 lg:pb-6">
          {children}
        </main>
      </div>

      <MobileNav navItems={navItems} onMoreClick={() => setMobileOpen(true)} />
    </div>
  );
}

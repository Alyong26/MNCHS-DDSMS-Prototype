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
import Image from "next/image";
import { X, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { SchoolLogo } from "@/components/ui/school-logo";
import { getNavIcon } from "@/lib/icons";
import { roleLabels } from "@/lib/navigation";

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
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-sidebar text-accent flex flex-col animate-fade-in">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <Link href="/" className="flex items-center gap-3">
                <SchoolLogo size={44} />
                <span className="font-bold text-sm">{APP_SHORT}</span>
              </Link>
              <button onClick={() => setMobileOpen(false)} className="p-1 hover:bg-white/10 rounded">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = getNavIcon(item.icon);
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium",
                      isActive ? "bg-accent text-primary" : "text-accent/80 hover:bg-white/10"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="p-3 pb-5 border-t border-white/10">
              <div className="flex items-center gap-3 px-3 pt-2 pb-3 mb-2">
                <Image
                  src="/images/profile-placeholder.png"
                  alt=""
                  width={32}
                  height={32}
                  className="rounded-full flex-shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{userName}</p>
                  <p className="text-xs text-accent/60 capitalize">{role}</p>
                </div>
              </div>
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-accent/70 hover:bg-white/10 hover:text-accent transition-colors"
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
          "flex min-h-screen flex-col min-w-0 transition-[padding] duration-300 overflow-x-hidden",
          collapsed ? "lg:pl-[72px]" : "lg:pl-64",
        )}
      >
        <TopNav role={role} userName={userName} onMenuClick={() => setMobileOpen(true)} title={pageTitle} />
        <main className="flex-1 p-4 lg:p-6 pb-36 lg:pb-6 overflow-x-hidden max-w-full">{children}</main>
        <MobileNav
          navItems={navItems}
          userName={userName}
          role={role}
          onMoreClick={() => setMobileOpen(true)}
        />
      </div>
    </div>
  );
}

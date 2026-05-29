"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SchoolLogo } from "@/components/ui/school-logo";
import { cn } from "@/lib/utils";
import { getNavIcon } from "@/lib/icons";
import { roleLabels } from "@/lib/navigation";
import { APP_SHORT } from "@/lib/constants";
import type { NavItem, UserRole } from "@/types";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";

interface SidebarProps {
  navItems: NavItem[];
  role: UserRole;
  userName: string;
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ navItems, role, userName, collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "hidden shrink-0 flex-col bg-sidebar text-accent transition-[width] duration-300",
        "lg:sticky lg:top-0 lg:z-40 lg:flex lg:h-svh lg:max-h-svh lg:self-start",
        collapsed ? "lg:w-[72px]" : "lg:w-64",
      )}
    >
      <div className="flex h-full min-h-0 flex-col">
        <div className="shrink-0 border-b border-white/10 p-4">
          <Link href="/" className="flex items-center gap-3">
            <SchoolLogo size={48} />
            {!collapsed && (
              <div className="min-w-0">
                <p className="font-bold text-sm leading-tight">{APP_SHORT}</p>
                <p className="truncate text-xs text-accent/70">{roleLabels[role]}</p>
              </div>
            )}
          </Link>
          {onToggle && (
            <button
              type="button"
              onClick={onToggle}
              className="mt-3 flex w-full items-center justify-center rounded-lg p-2 transition-colors hover:bg-white/10"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          )}
        </div>

        <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto p-3">
          {navItems.map((item) => {
            const Icon = getNavIcon(item.icon);
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-accent text-primary shadow-sm"
                    : "text-accent/80 hover:bg-white/10 hover:text-accent",
                )}
                title={collapsed ? item.label : undefined}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="shrink-0 border-t border-white/10 p-3">
          {!collapsed && (
            <div className="mb-2 flex items-center gap-3 px-3 py-2">
              <Image src="/images/profile-placeholder.png" alt="" width={32} height={32} className="rounded-full" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{userName}</p>
                <p className="text-xs capitalize text-accent/60">{role}</p>
              </div>
            </div>
          )}
          <Link
            href="/login"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-accent/70 transition-colors hover:bg-white/10 hover:text-accent"
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>Sign Out</span>}
          </Link>
        </div>
      </div>
    </aside>
  );
}

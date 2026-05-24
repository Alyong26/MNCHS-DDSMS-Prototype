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
        "hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex flex-col bg-sidebar text-accent transition-all duration-300",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      <div className="p-4 border-b border-white/10">
        <Link href="/" className="flex items-center gap-3">
          <SchoolLogo size={48} />
          {!collapsed && (
            <div className="min-w-0">
              <p className="font-bold text-sm leading-tight">{APP_SHORT}</p>
              <p className="text-xs text-accent/70 truncate">{roleLabels[role]}</p>
            </div>
          )}
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = getNavIcon(item.icon);
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-accent text-primary shadow-sm"
                  : "text-accent/80 hover:bg-white/10 hover:text-accent"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/10">
        {!collapsed && (
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <Image src="/images/profile-placeholder.png" alt="" width={32} height={32} className="rounded-full" />
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{userName}</p>
              <p className="text-xs text-accent/60 capitalize">{role}</p>
            </div>
          </div>
        )}
        <Link
          href="/login"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-accent/70 hover:bg-white/10 hover:text-accent transition-colors"
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span>Sign Out</span>}
        </Link>
        {onToggle && (
          <button
            onClick={onToggle}
            className="w-full mt-2 flex items-center justify-center p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        )}
      </div>
    </aside>
  );
}
"use client";

import Link from "next/link";
import Image from "next/image";
import { Bell, LogOut, Search } from "lucide-react";
import { HamburgerIcon } from "@/components/ui/hamburger-icon";
import { getProfileHref, roleLabels } from "@/lib/navigation";
import type { UserRole } from "@/types";

interface TopNavProps {
  role: UserRole;
  userName: string;
  onMenuClick?: () => void;
  title?: string;
}

export function TopNav({ role, userName, onMenuClick, title }: TopNavProps) {
  const profileHref = getProfileHref(role);

  return (
    <header className="sticky top-0 z-30 bg-card/95 backdrop-blur-md border-b border-neutral-200/80">
      <div className="flex items-center justify-between gap-2 px-4 lg:px-6 h-16 min-w-0">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          {onMenuClick && (
            <button
              type="button"
              onClick={onMenuClick}
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-lg hover:bg-neutral-100 transition-colors flex-shrink-0"
              aria-label="Open menu"
            >
              <HamburgerIcon className="text-primary" />
            </button>
          )}
          <div className="min-w-0">
            <p className="text-xs text-neutral-500 hidden sm:block truncate">{roleLabels[role]}</p>
            <h2 className="text-base sm:text-lg font-semibold text-primary truncate">{title || "Dashboard"}</h2>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <div className="hidden md:flex items-center gap-2 bg-neutral-100 rounded-lg px-3 py-2">
            <Search className="h-4 w-4 text-neutral-400" />
            <input
              type="search"
              placeholder="Search..."
              className="bg-transparent text-sm outline-none w-40 lg:w-56 placeholder:text-neutral-400"
            />
          </div>
          <button className="relative p-2 rounded-lg hover:bg-neutral-100 transition-colors" aria-label="Notifications">
            <Bell className="h-5 w-5 text-primary" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
          </button>
          <Link
            href={profileHref}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-neutral-100 transition-colors min-w-0"
            aria-label={`${userName} profile`}
          >
            <Image
              src="/images/profile-placeholder.png"
              alt=""
              width={36}
              height={36}
              className="rounded-full border-2 border-primary/20 flex-shrink-0 h-9 w-9"
            />
            <div className="hidden lg:block min-w-0">
              <p className="text-sm font-medium text-primary truncate max-w-[140px]">{userName}</p>
              <p className="text-xs text-neutral-500 capitalize">{role}</p>
            </div>
          </Link>
          <Link
            href="/login"
            className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors flex-shrink-0"
            aria-label="Sign out"
          >
            <LogOut className="h-5 w-5 text-primary" />
          </Link>
        </div>
      </div>
    </header>
  );
}

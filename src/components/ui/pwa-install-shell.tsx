"use client";

import type { ReactNode } from "react";
import { PwaInstallBar, PwaInstallProvider } from "@/components/ui/pwa-install-bar";

/** Wraps the app so the install bar can show on any page (landing, dashboard, report card, etc.). */
export function PwaInstallShell({ children }: { children: ReactNode }) {
  return (
    <PwaInstallProvider>
      {children}
      <PwaInstallBar />
    </PwaInstallProvider>
  );
}

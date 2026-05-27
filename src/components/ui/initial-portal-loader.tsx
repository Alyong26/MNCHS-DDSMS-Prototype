"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { PortalLoader } from "@/components/ui/portal-loader";

const SESSION_KEY = "mnchs_sms_portal_initial_loader_shown_v1";
const MIN_SHOW_MS = 650;

export function InitialPortalLoader() {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    try {
      const alreadyShown = sessionStorage.getItem(SESSION_KEY) === "1";
      if (alreadyShown) return;
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // If storage is blocked, still show once per mount.
    }

    setShow(true);
    const t = window.setTimeout(() => setShow(false), MIN_SHOW_MS);
    return () => window.clearTimeout(t);
  }, []);

  if (!mounted || !show) return null;

  return createPortal(
    <div className="fixed inset-0 z-[120]">
      <PortalLoader message="Preparing your portal…" className="min-h-screen" />
    </div>,
    document.body,
  );
}


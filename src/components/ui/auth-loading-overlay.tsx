"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { PortalLoader } from "@/components/ui/portal-loader";

interface AuthLoadingOverlayProps {
  message?: string;
}

export function AuthLoadingOverlay({ message = "Loading your portal…" }: AuthLoadingOverlayProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100]">
      <PortalLoader message={message} className="min-h-screen" />
    </div>,
    document.body,
  );
}

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Download, Smartphone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PWA_INSTALL_NAME } from "@/lib/constants";

const DISMISS_KEY = "mnchs_pwa_install_banner_dismissed_v1";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function isStandalone() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function isIosDevice() {
  if (typeof window === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

interface PwaInstallContextValue {
  install: () => Promise<void>;
  dismissBanner: () => void;
  canInstall: boolean;
  showBanner: boolean;
  showIosHint: boolean;
  setShowIosHint: (value: boolean) => void;
}

const PwaInstallContext = createContext<PwaInstallContextValue | null>(null);

function usePwaInstallContext() {
  const ctx = useContext(PwaInstallContext);
  if (!ctx) throw new Error("PwaInstall components must be used within PwaInstallProvider");
  return ctx;
}

export function PwaInstallProvider({ children }: { children: ReactNode }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [ios, setIos] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(true);
  const [showIosHint, setShowIosHint] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setInstalled(isStandalone());
    setIos(isIosDevice());
    try {
      setBannerDismissed(localStorage.getItem(DISMISS_KEY) === "1");
    } catch {
      setBannerDismissed(false);
    }
    setReady(true);

    const onInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", onInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onInstallPrompt);
  }, []);

  const dismissBanner = useCallback(() => {
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
    setBannerDismissed(true);
    setShowIosHint(false);
  }, []);

  const install = useCallback(async () => {
    if (installed) return;

    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      if (outcome === "accepted") {
        setInstalled(true);
        dismissBanner();
      }
      return;
    }

    if (ios) setShowIosHint(true);
  }, [deferredPrompt, dismissBanner, installed, ios]);

  const canInstall = !installed && (Boolean(deferredPrompt) || ios);
  const showBanner = ready && canInstall && !bannerDismissed;

  const value = useMemo(
    () => ({
      install,
      dismissBanner,
      canInstall,
      showBanner,
      showIosHint,
      setShowIosHint,
    }),
    [install, dismissBanner, canInstall, showBanner, showIosHint],
  );

  return <PwaInstallContext.Provider value={value}>{children}</PwaInstallContext.Provider>;
}

export function PwaInstallBanner() {
  const { install, dismissBanner, showBanner, showIosHint, setShowIosHint } = usePwaInstallContext();

  if (!showBanner) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 pointer-events-none"
      role="region"
      aria-label="Install app"
    >
      <div className="pointer-events-auto max-w-lg mx-auto bg-card border border-primary/20 rounded-xl shadow-xl p-4 animate-fade-in">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
            <Smartphone className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-primary text-sm">Install {PWA_INSTALL_NAME}</p>
            <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
              Add a shortcut to your home screen for quick access to grades, records, and announcements.
            </p>
            {showIosHint && (
              <p className="text-xs text-primary mt-2 leading-relaxed bg-primary/5 rounded-lg p-2">
                On iPhone or iPad: tap <strong>Share</strong>, then <strong>Add to Home Screen</strong>, and confirm{" "}
                <strong>{PWA_INSTALL_NAME}</strong>.
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={dismissBanner}
            className="p-1 rounded-lg text-neutral-400 hover:text-primary hover:bg-neutral-100 flex-shrink-0"
            aria-label="Close install prompt"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex gap-2 mt-3">
          <Button type="button" className="flex-1" icon={Download} onClick={() => void install()}>
            Download App Shortcut
          </Button>
          {showIosHint && (
            <Button type="button" variant="outline" size="sm" onClick={() => setShowIosHint(false)}>
              Got it
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

interface PwaInstallButtonProps {
  className?: string;
  variant?: "secondary" | "outline";
}

export function PwaInstallButton({ className, variant = "outline" }: PwaInstallButtonProps) {
  const { install, canInstall } = usePwaInstallContext();

  if (!canInstall) return null;

  return (
    <Button
      type="button"
      variant={variant}
      size="lg"
      className={className}
      icon={Download}
      onClick={() => void install()}
    >
      Install App
    </Button>
  );
}

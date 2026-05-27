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

const DISMISS_KEY = "mnchs_pwa_install_banner_dismissed_v3";

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
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

function isAndroidDevice() {
  if (typeof window === "undefined") return false;
  return /Android/i.test(navigator.userAgent);
}

interface PwaInstallContextValue {
  install: () => Promise<void>;
  dismissBanner: () => void;
  canInstall: boolean;
  showBanner: boolean;
  isIos: boolean;
  isAndroid: boolean;
  hasNativePrompt: boolean;
}

const PwaInstallContext = createContext<PwaInstallContextValue | null>(null);

export function PwaInstallProvider({ children }: { children: ReactNode }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [ios, setIos] = useState(false);
  const [android, setAndroid] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setInstalled(isStandalone());
    setIos(isIosDevice());
    setAndroid(isAndroidDevice());
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

    // iOS / Android without native prompt: steps are shown in the banner; no programmatic install API.
  }, [deferredPrompt, dismissBanner, installed]);

  const hasNativePrompt = Boolean(deferredPrompt);
  /** Show on any device when not already installed — desktop often never fires beforeinstallprompt without a service worker */
  const canInstall = !installed;
  const showBanner = ready && canInstall && !bannerDismissed;

  const value = useMemo(
    () => ({
      install,
      dismissBanner,
      canInstall,
      showBanner,
      isIos: ios,
      isAndroid: android,
      hasNativePrompt,
    }),
    [install, dismissBanner, canInstall, showBanner, ios, android, hasNativePrompt],
  );

  return <PwaInstallContext.Provider value={value}>{children}</PwaInstallContext.Provider>;
}

/** Install prompt bar — place at top of landing hero, above navigation */
export function PwaInstallBanner() {
  const ctx = useContext(PwaInstallContext);
  if (!ctx?.showBanner) return null;

  const { install, dismissBanner, isIos, isAndroid, hasNativePrompt } = ctx;

  return (
    <div className="relative z-50 w-full px-4 pt-3 sm:pt-4" role="region" aria-label="Install app">
      <div className="max-w-4xl mx-auto bg-card/95 backdrop-blur-sm border border-primary/20 rounded-xl shadow-lg p-3 sm:p-4 animate-fade-in">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0 hidden sm:block">
            <Smartphone className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-primary text-sm sm:text-base">Install {PWA_INSTALL_NAME}</p>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 leading-relaxed">
              {hasNativePrompt && (
                <>Tap install to add this portal to your home screen for quick access.</>
              )}
              {isIos && !hasNativePrompt && (
                <>
                  On iPhone or iPad: tap <strong className="text-primary">Share</strong>, then{" "}
                  <strong className="text-primary">Add to Home Screen</strong>, and confirm{" "}
                  <strong className="text-primary">{PWA_INSTALL_NAME}</strong>.
                </>
              )}
              {!hasNativePrompt && !isIos && (
                <>
                  {isAndroid ? (
                    <>
                      Tap the browser menu <strong className="text-primary">(⋮)</strong>, choose{" "}
                      <strong className="text-primary">Install app</strong> or{" "}
                      <strong className="text-primary">Add to Home screen</strong>, then confirm.
                    </>
                  ) : (
                    <>
                      In Chrome or Edge: use the <strong className="text-primary">install icon</strong> in the
                      address bar, or open the menu <strong className="text-primary">(⋮)</strong> and choose{" "}
                      <strong className="text-primary">Install app</strong> /{" "}
                      <strong className="text-primary">Apps → Install this site as an app</strong>.
                    </>
                  )}
                </>
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={dismissBanner}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-primary hover:bg-neutral-100 flex-shrink-0"
            aria-label="Close install prompt"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {hasNativePrompt && (
          <div className="mt-3 sm:pl-12">
            <Button type="button" className="w-full sm:w-auto" icon={Download} onClick={() => void install()}>
              Install App
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

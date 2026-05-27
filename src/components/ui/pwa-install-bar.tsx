"use client";

import { Download, Smartphone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PWA_INSTALL_NAME } from "@/lib/constants";
import { PwaInstallBanner, PwaInstallProvider, usePwaInstall } from "@/components/ui/pwa-install-banner";

/** Global install bar — use inside PwaInstallProvider */
export function PwaInstallBar() {
  const ctx = usePwaInstall();
  if (!ctx?.showBanner) return null;

  const { install, dismissBanner, isIos, isAndroid, hasNativePrompt } = ctx;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] px-3 pb-3 pt-2 sm:px-4 sm:pb-4 pointer-events-none"
      role="region"
      aria-label="Install app"
    >
      <div className="max-w-4xl mx-auto pointer-events-auto rounded-xl border border-primary/25 bg-white shadow-2xl p-3 sm:p-4 animate-fade-in">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
            <Smartphone className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-primary text-sm sm:text-base">Install {PWA_INSTALL_NAME}</p>
            <p className="text-xs sm:text-sm text-neutral-700 mt-1 leading-relaxed">
              {hasNativePrompt && (
                <>Tap <strong className="text-primary">Install App</strong> below to add this portal to your home screen.</>
              )}
              {isIos && !hasNativePrompt && (
                <>
                  On iPhone/iPad: tap <strong className="text-primary">Share</strong> →{" "}
                  <strong className="text-primary">Add to Home Screen</strong> → confirm{" "}
                  <strong className="text-primary">{PWA_INSTALL_NAME}</strong>.
                </>
              )}
              {!hasNativePrompt && !isIos && isAndroid && (
                <>
                  Tap the menu <strong className="text-primary">(⋮)</strong> →{" "}
                  <strong className="text-primary">Install app</strong> or{" "}
                  <strong className="text-primary">Add to Home screen</strong>.
                </>
              )}
              {!hasNativePrompt && !isIos && !isAndroid && (
                <>
                  In Chrome/Edge: use the <strong className="text-primary">install icon</strong> in the address bar, or
                  menu <strong className="text-primary">(⋮)</strong> →{" "}
                  <strong className="text-primary">Install app</strong>.
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
          <div className="mt-3 pl-0 sm:pl-12">
            <Button type="button" className="w-full sm:w-auto" icon={Download} onClick={() => void install()}>
              Install App
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export { PwaInstallProvider, PwaInstallBanner };

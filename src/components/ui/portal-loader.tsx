import { APP_SHORT } from "@/lib/constants";
import { SchoolLogo } from "@/components/ui/school-logo";
import { cn } from "@/lib/utils";

interface PortalLoaderProps {
  message?: string;
  compact?: boolean;
  className?: string;
}

export function PortalLoader({
  message = "Loading your portal…",
  compact = false,
  className,
}: PortalLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={message}
      className={cn(
        "portal-loader-bg flex flex-col items-center justify-center",
        compact ? "py-16 px-4" : "min-h-screen px-4",
        className,
      )}
    >
      <div className="relative mb-8">
        <div className="portal-loader-ring" aria-hidden="true" />
        <div className="portal-loader-ring portal-loader-ring-delay" aria-hidden="true" />
        <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-accent/95 shadow-[0_0_40px_rgba(254,255,211,0.35)] portal-loader-logo">
          <SchoolLogo size={72} priority />
        </div>
      </div>

      <div className="text-center space-y-3">
        <p className="text-lg font-semibold tracking-wide text-accent portal-loader-text">{APP_SHORT}</p>
        <p className="text-sm text-accent/70">{message}</p>
        <div className="flex items-center justify-center gap-2 pt-1" aria-hidden="true">
          <span className="portal-loader-dot" />
          <span className="portal-loader-dot portal-loader-dot-2" />
          <span className="portal-loader-dot portal-loader-dot-3" />
        </div>
      </div>
    </div>
  );
}

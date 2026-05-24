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
      <div className="mb-8 portal-loader-logo">
        <SchoolLogo size={96} priority />
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

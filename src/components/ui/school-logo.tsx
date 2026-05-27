import Image from "next/image";
import { cn } from "@/lib/utils";

/** Central MNCHS logo — bump LOGO_VERSION when replacing public/images/logo.png */
const LOGO_VERSION = "20260527-v5";
const LOGO_SRC = `/images/logo.png?v=${LOGO_VERSION}`;

interface SchoolLogoProps {
  size?: number;
  className?: string;
  priority?: boolean;
  alt?: string;
}

export function SchoolLogo({
  size = 56,
  className,
  priority = false,
  alt = "Mati National Comprehensive High School Logo",
}: SchoolLogoProps) {
  return (
    <Image
      src={LOGO_SRC}
      alt={alt}
      width={size}
      height={size}
      priority={priority}
      unoptimized
      className={cn("object-contain flex-shrink-0 bg-transparent", className)}
    />
  );
}

export { LOGO_SRC };

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function AuthBackButton() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-primary transition-colors mb-6"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to Home
    </Link>
  );
}

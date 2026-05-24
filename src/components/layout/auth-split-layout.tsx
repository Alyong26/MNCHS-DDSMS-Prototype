import Image from "next/image";
import { SchoolLogo } from "@/components/ui/school-logo";

interface AuthSplitLayoutProps {
  brandTitle: string;
  brandDescription: string;
  children: React.ReactNode;
}

export function AuthSplitLayout({ brandTitle, brandDescription, children }: AuthSplitLayoutProps) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2 bg-background">
      <div className="hidden lg:block relative h-screen sticky top-0">
        <Image src="/images/landing-bg.png" alt="MNCHS Campus" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/80 flex flex-col items-center justify-center p-12 text-accent">
          <SchoolLogo size={100} className="mb-6 ring-4 ring-accent/30 rounded-full" />
          <h1 className="text-3xl font-bold text-center mb-3">{brandTitle}</h1>
          <p className="text-accent/80 text-center max-w-md">{brandDescription}</p>
        </div>
      </div>

      <div className="min-h-screen lg:h-screen lg:overflow-y-auto">
        <div className="min-h-full px-6 sm:px-10 py-8 lg:py-10">
          <div className="w-full max-w-md mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}

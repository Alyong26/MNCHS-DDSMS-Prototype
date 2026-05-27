import { InitialPortalLoader } from "@/components/ui/initial-portal-loader";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-fade-in min-h-screen">
      <InitialPortalLoader />
      {children}
    </div>
  );
}

import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { APP_NAME, APP_SHORT, PWA_INSTALL_NAME } from "@/lib/constants";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${APP_NAME} | School Management System Portal`,
  description:
    "MNCHS-DDSMS Portal for Mati National Comprehensive High School — grades, class records, report cards, and school announcements.",
  applicationName: PWA_INSTALL_NAME,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: PWA_INSTALL_NAME,
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: [{ url: "/icons/icon-192.png", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#520A0E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-screen bg-background antialiased">{children}</body>
    </html>
  );
}

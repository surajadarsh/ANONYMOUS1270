import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  metadataBase: new URL("https://anonymous1270.com"),
  title: { default: "ANONYMOUS1270 Studios — Gaming. Tech. Beyond.", template: "%s — ANONYMOUS1270 Studios" },
  description: "Premium gaming and technology media covering games, hardware, creators, esports and the stories shaping the industry.",
  keywords: ["gaming", "technology", "gaming news", "tech reviews", "esports", "ANONYMOUS1270"],
  authors: [{ name: "ANONYMOUS1270 Studios" }],
  robots: { index: true, follow: true },
  openGraph: { type: "website", siteName: "ANONYMOUS1270 Studios", title: "ANONYMOUS1270 Studios — Gaming. Tech. Beyond.", description: "Gaming, technology, reviews, news, videos, livestreams, events and tournaments." },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#090909" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><div className="border-b border-white/10 bg-[#d90429] px-4 py-2 text-center text-[10px] font-bold uppercase tracking-[.18em]">Gaming. Tech. Beyond.</div><SiteHeader />{children}<SiteFooter /></body></html>;
}

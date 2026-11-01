import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://anonymous1270.com"),
  title: {
    default: "ANONYMOUS1270 Studios — Gaming. Tech. Beyond.",
    template: "%s — ANONYMOUS1270 Studios",
  },
  description:
    "Gaming, technology, reviews, news, videos, livestreams, events and tournaments from ANONYMOUS1270 Studios.",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

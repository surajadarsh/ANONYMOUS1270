import type { MetadataRoute } from "next";
import { site, primaryNav, footerNav } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...primaryNav.map(item => item.href), ...footerNav.map(item => item.href), "/privacy", "/terms", "/affiliate-disclosure"];
  return [...new Set(paths)].map(path => ({ url: `${site.url}${path}`, lastModified: new Date(), changeFrequency: path === "/" ? "daily" : "weekly", priority: path === "/" ? 1 : .7 }));
}

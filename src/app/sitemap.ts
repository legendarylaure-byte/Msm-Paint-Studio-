import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // fixed dates: `new Date()` is not allowed at prerender under cache components
  const lastModified = "2026-10-20";

  return [
    { url: site.url, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/accessibility`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}

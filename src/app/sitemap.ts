import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { cases } from "@/content/cases";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/cases`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/kontakty`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const caseRoutes: MetadataRoute.Sitemap = cases.map((c) => ({
    url: `${site.url}/cases/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...caseRoutes];
}

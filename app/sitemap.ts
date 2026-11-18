import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { cases } from "@/content/work";
import { services } from "@/content/services";
import { notes } from "@/content/journal";

/** Served at /sitemap.xml. Submit this URL in Google Search Console > Sitemaps. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly") => ({ url: `${site.url}${path}`, lastModified: now, changeFrequency, priority });
  return [
    page("/", 1, "weekly"),
    page("/work", 0.9, "weekly"),
    page("/services", 0.9),
    page("/contact", 0.8),
    page("/films", 0.7),
    page("/process", 0.6),
    page("/studio", 0.6),
    page("/journal", 0.6, "weekly"),
    page("/privacy", 0.2, "yearly"),
    ...cases.map((c) => page(`/work/${c.slug}`, 0.8)),
    ...services.map((s) => page(`/services/${s.slug}`, 0.85)),
    ...notes.map((n) => page(`/journal/${n.slug}`, 0.5)),
  ];
}

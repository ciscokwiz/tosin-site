import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/rates/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/booking/`, lastModified: now, changeFrequency: "yearly", priority: 0.9 },
  ];
}

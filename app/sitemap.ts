import type { MetadataRoute } from "next";

import { site } from "@/lib/content";
import { INDUSTRIES } from "@/lib/industries";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/industries`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...INDUSTRIES.map((i) => ({
      url: `${site.url}/industries/${i.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

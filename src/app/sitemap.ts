import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/products";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const productEntries: MetadataRoute.Sitemap = getAllSlugs().map((slug) => ({
    url: `${site.url}/producto/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...productEntries,
  ];
}

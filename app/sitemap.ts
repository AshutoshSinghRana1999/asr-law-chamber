import type { MetadataRoute } from "next";

import { expertiseSlugs } from "@/data/expertise";
import { getAllInsights } from "@/lib/mdx";

const SITE_URL = "https://asrlaw.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const insights = getAllInsights();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/insights`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const expertisePages: MetadataRoute.Sitemap =
    expertiseSlugs.map((slug) => ({
      url: `${SITE_URL}/expertise/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  const insightPages: MetadataRoute.Sitemap =
    insights.map((insight) => ({
      url: `${SITE_URL}/insights/${insight.slug}`,
      lastModified: insight.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [
    ...staticPages,
    ...expertisePages,
    ...insightPages,
  ];
}
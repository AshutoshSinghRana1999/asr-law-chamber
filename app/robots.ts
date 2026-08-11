import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://asrlaw.in/sitemap.xml",
    host: "https://asrlaw.in",
  };
}
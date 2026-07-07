import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://finora.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/how-it-works", "/sign-in", "/sign-up"],
        disallow: ["/dashboard/", "/api/"],
      },
    ],
    sitemap: `${APP_URL}/sitemap.xml`,
  };
}

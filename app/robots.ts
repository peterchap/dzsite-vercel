import type { MetadataRoute } from "next";

// www.datazag.com is the canonical apex — keep the www (see app/layout.tsx).
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.datazag.com";

/** /robots.txt — points crawlers at the sitemap and keeps them out of non-content routes. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/studio", "/benchmark", "/legacy-home", "/contact/thanks"],
      },
    ],
    sitemap: new URL("/sitemap.xml", SITE_URL).toString(),
    host: SITE_URL,
  };
}

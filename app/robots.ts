import type { MetadataRoute } from "next";

// www.datazag.com is the canonical apex — keep the www (see app/layout.tsx).
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.datazag.com";

/**
 * /robots.txt — points crawlers at the sitemap and keeps them out of non-content routes.
 *
 * Pages kept out of the index (/benchmark, /contact/thanks) are NOT disallowed here: they
 * carry a noindex robots meta, and a Disallow line would stop Google fetching the page to
 * read it, leaving a linked URL "Indexed, though blocked by robots.txt".
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/studio"],
      },
    ],
    sitemap: new URL("/sitemap.xml", SITE_URL).toString(),
    host: SITE_URL,
  };
}

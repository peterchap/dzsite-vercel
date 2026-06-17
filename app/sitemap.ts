import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/fetch";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.datazag.com";

// Slugs to exclude from the sitemap (cruft, duplicates, stubs, internal/research pages).
// Adjust as the page set is reconciled.
const DENY = new Set([
  "home2",
  "contact-us", // duplicate of /contact
  "partner",
  "security-teams",
  "redundant",
  "test-sections",
  "enterprise",
  "log-analytics",
  "q1-2026-platform-impersonation-analysis",
]);

// Public app routes that are not Sanity page documents.
const STATIC_PATHS = ["/docs", "/blog", "/trust", "/legal/privacy", "/legal/terms", "/legal/dpa"];

const SITEMAP_QUERY = `*[_type in ["page","useCase"] && defined(slug.current) && count(sections) > 0]{ "slug": slug.current }`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let rows: { slug: string }[] = [];
  try {
    rows = (await sanityFetch<{ slug: string }[]>(SITEMAP_QUERY, {}, 3600)) || [];
  } catch {
    rows = [];
  }

  const paths = new Set<string>(["/"]);
  for (const { slug } of rows) {
    if (!slug || DENY.has(slug)) continue;
    paths.add(slug === "home" ? "/" : `/${slug}`);
  }
  for (const p of STATIC_PATHS) paths.add(p);

  const lastModified = new Date();
  return [...paths].map((p) => ({
    url: `${base}${p}`,
    lastModified,
    changeFrequency: "weekly",
    priority: p === "/" ? 1 : 0.7,
  }));
}

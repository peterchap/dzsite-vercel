import type { MetadataRoute } from "next";

import { getDatasetSlugs } from "@/lib/datasets/load";
import { isLegacyRedirectSource } from "@/lib/legacy-redirects";
import { sanityFetch } from "@/sanity/fetch";

// www.datazag.com is the canonical apex — keep the www (see app/layout.tsx).
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.datazag.com";

/**
 * /sitemap.xml — served by Next.js from this file for Google Search Console.
 *
 * Deliberately excluded:
 *   /benchmark                  — robots: noindex until the metrics mature
 *   /legacy-home                — reference copy of the old homepage
 *   /home, /internet-never-stands-still — server redirects to /
 *   /contact/thanks             — post-submit confirmation
 *   /studio, /api               — CMS and JSON endpoints
 *   /enterprise                 — noindex skeleton, deferred (WU-C7)
 *   legacy 301 sources          — see lib/legacy-redirects.ts (WU-C5)
 */

type StaticEntry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const STATIC_ROUTES: StaticEntry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/how-it-works", changeFrequency: "monthly", priority: 0.9 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.9 },
  { path: "/domain-intelligence", changeFrequency: "monthly", priority: 0.8 },
  { path: "/infrastructure-intelligence", changeFrequency: "monthly", priority: 0.8 },
  { path: "/brand-protection", changeFrequency: "monthly", priority: 0.8 },
  { path: "/datasets", changeFrequency: "weekly", priority: 0.8 },
  { path: "/intelligence/one-signal-150-domains", changeFrequency: "monthly", priority: 0.8 },
  { path: "/alerts", changeFrequency: "monthly", priority: 0.7 },
  { path: "/reports", changeFrequency: "monthly", priority: 0.7 },
  { path: "/reports/sample", changeFrequency: "monthly", priority: 0.6 },
  { path: "/domain-search", changeFrequency: "monthly", priority: 0.6 },
  { path: "/esp-partners", changeFrequency: "monthly", priority: 0.7 },
  { path: "/mssp-partners", changeFrequency: "monthly", priority: 0.7 },
  { path: "/docs", changeFrequency: "monthly", priority: 0.7 },
  { path: "/docs/search-stream", changeFrequency: "monthly", priority: 0.6 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
  { path: "/trust", changeFrequency: "monthly", priority: 0.6 },
  { path: "/trust/responsible-disclosure", changeFrequency: "yearly", priority: 0.4 },
  { path: "/legal/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/legal/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/legal/dpa", changeFrequency: "yearly", priority: 0.3 },
];

// Slugs with lastModified, for the dynamic Sanity content.
const blogSitemapQuery = `
*[_type == "blogPost" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()]{
  "slug": slug.current,
  "updated": coalesce(_updatedAt, publishedAt)
}
`;

// "home" is a CMS alias that app/home/page.tsx redirects to "/" — skip it.
const cmsPageSitemapQuery = `
*[_type in ["page", "useCase"] && defined(slug.current) && slug.current != "home"]{
  "slug": slug.current,
  "updated": _updatedAt
}
`;

/**
 * CMS slugs that resolve but must not be advertised. /enterprise is a deferred
 * skeleton carrying `robots: noindex` (see app/(marketing)/[...slug]/page.tsx);
 * listing it in the sitemap would ask Google to crawl a page we tell it to
 * ignore. Drop the slug here when the page ships.
 */
const NOINDEX_SLUGS = new Set(["enterprise"]);

type SlugRow = { slug: string; updated?: string };

const abs = (path: string) => new URL(path, SITE_URL).toString();

const toDate = (value?: string) => {
  if (!value) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d;
};

async function safe<T>(label: string, fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    // A CMS hiccup must not take the whole sitemap down — ship the static set.
    console.warn(`[sitemap] ${label} lookup failed:`, err);
    return fallback;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogPosts, datasetSlugs, cmsPages] = await Promise.all([
    safe("blog", () => sanityFetch<SlugRow[]>(blogSitemapQuery, {}, 3600), []),
    safe("datasets", () => getDatasetSlugs(), []),
    safe("pages", () => sanityFetch<SlugRow[]>(cmsPageSitemapQuery, {}, 3600), []),
  ]);

  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: abs(r.path),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  for (const post of blogPosts ?? []) {
    if (!post?.slug) continue;
    entries.push({
      url: abs(`/blog/${post.slug}`),
      lastModified: toDate(post.updated),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const slug of datasetSlugs ?? []) {
    if (!slug) continue;
    entries.push({
      url: abs(`/datasets/${slug}`),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // CMS pages served by app/(marketing)/[...slug]. Some slugs (pricing,
  // contact, …) also have file routes; those already appear above.
  for (const page of cmsPages ?? []) {
    if (!page?.slug) continue;
    const slug = page.slug.replace(/^\/+/, "");
    // A retired route 301s and a noindex route is excluded by its own metadata —
    // neither belongs in the sitemap, whatever the CMS still holds.
    if (isLegacyRedirectSource(slug) || NOINDEX_SLUGS.has(slug)) continue;
    entries.push({
      url: abs(`/${slug}`),
      lastModified: toDate(page.updated),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // Dedupe by URL, first occurrence wins (static entries carry the intended priority).
  const seen = new Set<string>();
  return entries.filter((e) => {
    if (seen.has(e.url)) return false;
    seen.add(e.url);
    return true;
  });
}

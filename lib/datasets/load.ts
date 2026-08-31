/**
 * Loader for dataset documentation pages.
 *
 * Source of truth for CONTENT is Sanity. Source of truth for AVAILABILITY is
 * this module: /datasets/<slug> is the documentation link on a live
 * marketplace listing, so a slug with a committed fallback resolves even when
 * Sanity has nothing for it (see ./fallback.ts for why).
 *
 * Precedence is all-or-nothing per document, deliberately. Merging CMS fields
 * over fallback fields field-by-field would mean an editor who clears a
 * section sees the old committed text reappear, with no way to remove it —
 * a CMS that will not let you delete anything. So: if Sanity has the document,
 * Sanity's version is what renders, in full.
 *
 * Figures are NOT resolved here. Rendering resolves {{TOKEN}} markers via
 * ./stat-tokens.ts, so the raw authored text stays inspectable at this layer.
 */
import { draftMode } from "next/headers";

import { sanityFetch } from "@/sanity/fetch";
import { sanityPreviewFetch } from "@/sanity/preview";
import { datasetBySlugQuery, datasetsListQuery, datasetSlugsQuery } from "@/sanity/queries";

import { DATASET_FALLBACKS, FALLBACK_SLUGS, getDatasetFallback } from "./fallback";
import type { DatasetDoc, DatasetSummary } from "./types";

/** These pages are public, indexable and change rarely — cache for an hour. */
const REVALIDATE_SECONDS = 3600;

async function fetcher<T>(query: string, params?: Record<string, unknown>): Promise<T | null> {
  let preview = false;
  try {
    preview = (await draftMode()).isEnabled;
  } catch {
    // draftMode() throws outside a request scope (e.g. generateStaticParams).
    preview = false;
  }
  try {
    if (preview) return await sanityPreviewFetch<T>(query, params);
    return await sanityFetch<T>(query, params, REVALIDATE_SECONDS);
  } catch (err) {
    // A CMS outage must not take down a URL a marketplace listing points at.
    console.error("datasets: Sanity fetch failed, falling back to committed content.", err);
    return null;
  }
}

export async function getDataset(slug: string): Promise<DatasetDoc | null> {
  const doc = await fetcher<DatasetDoc>(datasetBySlugQuery, { slug });
  if (doc && Array.isArray(doc.columns) && doc.columns.length > 0) return doc;

  const fallback = getDatasetFallback(slug);
  if (fallback && doc) {
    console.error(
      `datasets: "${slug}" exists in Sanity but has no columns — rendering the committed ` +
        `fallback so the marketplace documentation link stays valid. Fix the document.`,
    );
  }
  return fallback;
}

/**
 * Index listing: Sanity documents, plus any committed fallback whose slug
 * Sanity does not cover. Without that union, a dataset with a live listing
 * could resolve at its own URL and be missing from the index above it.
 */
export async function getDatasets(): Promise<DatasetSummary[]> {
  const docs = (await fetcher<DatasetSummary[]>(datasetsListQuery)) ?? [];
  const seen = new Set(docs.map((d) => d.slug));

  const extras: DatasetSummary[] = FALLBACK_SLUGS.filter((slug) => !seen.has(slug)).map((slug) => {
    const f = DATASET_FALLBACKS[slug];
    return {
      title: f.title,
      slug: f.slug,
      summary: f.summary,
      eyebrow: f.eyebrow,
      order: f.order,
      columnCount: f.columns.length,
    };
  });

  return [...docs, ...extras].sort(
    (a, b) => (a.order ?? 100) - (b.order ?? 100) || a.title.localeCompare(b.title),
  );
}

/** Slugs to prerender: everything in Sanity, plus every committed fallback. */
export async function getDatasetSlugs(): Promise<string[]> {
  const slugs = (await fetcher<string[]>(datasetSlugsQuery)) ?? [];
  return Array.from(new Set([...slugs, ...FALLBACK_SLUGS]));
}

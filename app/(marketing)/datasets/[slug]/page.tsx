import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DatasetDocPage } from "@/components/datasets/DatasetDocPage";
import { getDataset, getDatasetSlugs } from "@/lib/datasets/load";
import { resolveStatTokens } from "@/lib/datasets/stat-tokens";

/**
 * /datasets/<slug> — dataset documentation.
 *
 * ⚠️ DURABLE URL. These paths are submitted to cloud marketplaces as the
 * documentation link for a listing. A listing is long-lived; changing a slug
 * after submission breaks it for every buyer. Add datasets, do not rename them.
 *
 * Public and indexable by design — people search for how to do IP-to-ASN
 * enrichment, and this page is a real answer to that.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.datazag.com";

export const revalidate = 3600;
/** Slugs come from Sanity plus the committed fallbacks; allow new ones on demand. */
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getDatasetSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dataset = await getDataset(slug);
  if (!dataset) return { title: "Dataset not found | Datazag" };

  const canonical = new URL(`/datasets/${dataset.slug}`, SITE_URL).toString();
  const title =
    dataset.seo?.metaTitle ?? `${resolveStatTokens(dataset.title)} | Datazag Datasets`;
  const description =
    dataset.seo?.metaDescription ?? resolveStatTokens(dataset.summary);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical },
    // Explicit: this page is the public documentation for a marketplace
    // listing. It must never be noindexed by an inherited default.
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      url: canonical,
      siteName: "Datazag",
      title: dataset.seo?.ogTitle ?? title,
      description: dataset.seo?.ogDescription ?? description,
    },
    twitter: {
      card: "summary_large_image",
      title: dataset.seo?.ogTitle ?? title,
      description: dataset.seo?.ogDescription ?? description,
    },
  };
}

export default async function DatasetPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dataset = await getDataset(slug);
  if (!dataset) notFound();

  // Dataset structured data — this page documents a real, downloadable
  // dataset, so say so in the markup rather than leaving it as a generic
  // article. Figures go through the same token resolution as the visible copy.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: resolveStatTokens(dataset.title),
    description: resolveStatTokens(dataset.summary),
    url: new URL(`/datasets/${dataset.slug}`, SITE_URL).toString(),
    creator: { "@type": "Organization", name: "Datazag", url: SITE_URL },
    isAccessibleForFree: true,
    variableMeasured: dataset.columns.map((c) => ({
      "@type": "PropertyValue",
      name: c.name,
      description: resolveStatTokens(c.description),
    })),
    ...(dataset.listingUrl
      ? { distribution: [{ "@type": "DataDownload", contentUrl: dataset.listingUrl }] }
      : {}),
    ...(dataset.changelog?.length
      ? { dateModified: [...dataset.changelog].sort((a, b) => (a.date < b.date ? 1 : -1))[0].date }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DatasetDocPage dataset={dataset} />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

import { DatasetCard } from "@/components/datasets/DatasetCard";
import { DATASET_CATALOG } from "@/lib/datasets/catalog";
import { getDatasets } from "@/lib/datasets/load";
import { resolveStatTokens } from "@/lib/datasets/stat-tokens";

/**
 * /datasets — the public catalog of Datazag data products.
 *
 * ⚠️ DURABLE URL. Referenced from marketplace listings; do not move it.
 *
 * Cards render from lib/datasets/catalog.ts (tier, routes, availability) with
 * figures from lib/site-stats.ts. A card links to its /datasets/<slug> page
 * only when that page resolves — a dead link here would be worse than none.
 *
 * Any doc page the catalog does not list is still shown below the cards, so a
 * dataset with a live documentation URL is never missing from its index.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.datazag.com";

export const revalidate = 3600;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Datasets | Datazag",
  description:
    "Datazag datasets, served direct from R2. See live coverage, tier, and access through the customer portal or Databricks and Snowflake marketplaces.",
  alternates: { canonical: new URL("/datasets", SITE_URL).toString() },
  robots: { index: true, follow: true },
};

export default async function DatasetsIndexPage() {
  const docs = await getDatasets();
  const docSlugs = new Set(docs.map((d) => d.slug));
  const catalog = [...DATASET_CATALOG].sort((a, b) => a.order - b.order);
  const catalogSlugs = new Set(catalog.map((e) => e.slug));
  const uncataloged = docs.filter((d) => !catalogSlugs.has(d.slug));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DataCatalog",
    name: "Datazag Datasets",
    url: new URL("/datasets", SITE_URL).toString(),
    creator: { "@type": "Organization", name: "Datazag", url: SITE_URL },
    dataset: catalog
      .filter((e) => docSlugs.has(e.slug))
      .map((e) => ({
        "@type": "Dataset",
        name: e.name,
        description: e.description,
        url: new URL(`/datasets/${e.slug}`, SITE_URL).toString(),
        isAccessibleForFree: e.tier !== "Paid",
      })),
  };

  return (
    <div className="relative overflow-hidden bg-[#030619] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative border-b border-white/10 py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(56,189,248,0.10),transparent_36%)]" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            Datasets
          </span>
          <h1 className="mt-6 max-w-3xl text-3xl font-bold tracking-tight text-white md:text-5xl">
            Datasets
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Every Datazag dataset is served direct from R2. Get it through the customer portal, or
            through Databricks and Snowflake once a listing is live. One artifact, two routes, one
            coverage figure.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400">
            We mark a route available only when it is live. Figures update daily.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2">
            {catalog.map((entry) => (
              <DatasetCard key={entry.slug} entry={entry} hasDocPage={docSlugs.has(entry.slug)} />
            ))}
          </div>

          {uncataloged.length > 0 ? (
            <div className="mt-12">
              <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-slate-500">
                More documentation
              </h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {uncataloged.map((ds) => (
                  <Link
                    key={ds.slug}
                    href={`/datasets/${ds.slug}`}
                    className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/25 hover:bg-white/[0.04]"
                  >
                    <h3 className="text-lg font-semibold text-white">{resolveStatTokens(ds.title)}</h3>
                    <p className="mt-2 flex-1 text-sm leading-6 text-slate-400">
                      {resolveStatTokens(ds.summary)}
                    </p>
                    <span className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-sky-300">
                      Read the documentation
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}

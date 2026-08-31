import type { Metadata } from "next";
import Link from "next/link";

import { getDatasets } from "@/lib/datasets/load";
import { resolveStatTokens } from "@/lib/datasets/stat-tokens";

/**
 * /datasets — index of dataset documentation pages.
 *
 * Sibling to every /datasets/<slug> page. Sanity documents and committed
 * fallbacks are unioned by the loader, so a dataset with a live marketplace
 * listing is always reachable from here.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.datazag.com";

export const revalidate = 3600;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Datasets | Datazag",
  description:
    "Documentation for Datazag datasets: schema reference, join guides, and methodology for each dataset we publish to cloud marketplaces.",
  alternates: { canonical: new URL("/datasets", SITE_URL).toString() },
  robots: { index: true, follow: true },
};

export default async function DatasetsIndexPage() {
  const datasets = await getDatasets();

  return (
    <div className="relative overflow-hidden bg-[#030619] text-white">
      <section className="relative border-b border-white/10 py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(56,189,248,0.10),transparent_36%)]" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            Dataset documentation
          </span>
          <h1 className="mt-6 max-w-3xl text-3xl font-bold tracking-tight text-white md:text-5xl">
            Datasets
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Schema reference, join guides, and methodology for every dataset Datazag publishes.
            Each page documents only what actually ships.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {datasets.length === 0 ? (
            <p className="text-slate-400">No datasets published yet.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {datasets.map((ds) => (
                <Link
                  key={ds.slug}
                  href={`/datasets/${ds.slug}`}
                  className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/25 hover:bg-white/[0.04]"
                >
                  {ds.eyebrow ? (
                    <span className="font-mono text-[11px] uppercase tracking-[0.13em] text-slate-500">
                      {ds.eyebrow}
                    </span>
                  ) : null}
                  <h2 className="mt-2 text-lg font-semibold text-white">
                    {resolveStatTokens(ds.title)}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-400">
                    {resolveStatTokens(ds.summary)}
                  </p>
                  <span className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-sky-300">
                    Read the documentation
                    {typeof ds.columnCount === "number" && ds.columnCount > 0
                      ? ` · ${ds.columnCount} columns`
                      : ""}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

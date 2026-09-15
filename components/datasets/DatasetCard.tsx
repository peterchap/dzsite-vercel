import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { isAvailable, type CatalogEntry, type RouteStatus } from "@/lib/datasets/catalog";
import { DISPLAY_STATS, STATS_AS_OF } from "@/lib/site-stats";

/**
 * One card on the /datasets index. Renders a catalog entry and nothing else:
 * figures come from DISPLAY_STATS with their own as-of, availability comes
 * from the entry's routes.
 */

function asOfLabel(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso.slice(0, 10);
  // Same "Measured 31 Aug 2026" form as the homepage's live figures.
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function RouteRow({ name, route }: { name: string; route: RouteStatus }) {
  const live = route.status === "available";
  return (
    <li className="flex items-center justify-between gap-4 py-2">
      <span className="text-sm text-slate-300">{name}</span>
      {live ? (
        <a
          href={route.url}
          className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.12em] text-emerald-300 transition hover:text-emerald-200"
        >
          Available
          <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
        </a>
      ) : (
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-slate-500">
          Coming soon
        </span>
      )}
    </li>
  );
}

export function DatasetCard({ entry, hasDocPage }: { entry: CatalogEntry; hasDocPage: boolean }) {
  const available = isAvailable(entry);
  const coverage = (entry.coverage ?? []).map((c) => ({
    ...c,
    value: DISPLAY_STATS[c.stat],
    asOf: STATS_AS_OF[c.stat],
  }));

  return (
    <article className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${
            available
              ? "border-emerald-400/30 text-emerald-300"
              : "border-white/15 text-slate-400"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${available ? "bg-emerald-400" : "bg-slate-500"}`}
          />
          {available ? "Available" : "Coming soon"}
        </span>
        <span className="rounded-full border border-white/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-300">
          {entry.tier}
        </span>
      </div>

      <h2 className="mt-4 text-lg font-semibold text-white">{entry.name}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-400">{entry.description}</p>

      {entry.includes?.length ? (
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Includes: {entry.includes.join(", ")}.
        </p>
      ) : null}

      {coverage.length > 0 ? (
        <dl className="mt-5 grid gap-3 sm:grid-cols-2">
          {coverage.map((c) => (
            <div key={c.stat} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <dt className="font-mono text-[11px] uppercase tracking-[0.13em] text-slate-400">
                {c.label}
              </dt>
              <dd className="mt-2 font-mono text-lg font-bold tabular-nums text-white">{c.value}</dd>
              <dd className="mt-1 text-xs text-slate-500">
                Measured <time dateTime={c.asOf}>{asOfLabel(c.asOf)}</time>
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      <div className="mt-5 flex-1">
        <h3 className="font-mono text-[11px] uppercase tracking-[0.13em] text-slate-500">
          Access routes
        </h3>
        <ul className="mt-1 divide-y divide-white/[0.06]">
          <RouteRow name="Customer portal (direct from R2)" route={entry.routes.portal} />
          <RouteRow name="Databricks / Snowflake Marketplace" route={entry.routes.marketplace} />
        </ul>
      </div>

      {hasDocPage ? (
        <Link
          href={`/datasets/${entry.slug}`}
          className="mt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-sky-300 transition hover:text-sky-200"
        >
          Read the documentation
        </Link>
      ) : (
        <span className="mt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-slate-500">
          Documentation coming soon
        </span>
      )}
    </article>
  );
}

export default DatasetCard;

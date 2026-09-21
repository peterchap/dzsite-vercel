import React from "react";
import Link from "next/link";
import { ArrowUpRight, KeyRound } from "lucide-react";

import { DatasetCode } from "@/components/datasets/DatasetCode";
import {
  assertNoRawFigures,
  resolveStatTokens,
  resolveStatTokensAll,
} from "@/lib/datasets/stat-tokens";
import type { DatasetDoc } from "@/lib/datasets/types";

/**
 * THE reusable dataset documentation template.
 *
 * Adding /datasets/asn-reputation is a content drop: create the Sanity
 * document, and this component renders it. Nothing here is specific to any one
 * dataset — sections that have no content simply do not render.
 *
 * Every string that reaches the page goes through resolveStatTokens first, so
 * {{DOMAINS}} and friends resolve to the canonical figure from
 * lib/site-stats.ts, and no figure is ever typed into copy by hand.
 */

/** Resolve tokens and flag any figure an editor typed instead of tokenizing. */
function copy(text: string | undefined | null, where: string): string | undefined {
  if (typeof text !== "string") return undefined;
  const resolved = resolveStatTokens(text);
  assertNoRawFigures(text, where);
  return resolved;
}

function SectionHeading({
  num,
  id,
  children,
}: {
  num: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-7 flex items-baseline gap-4">
      <span className="font-mono text-sm font-semibold text-sky-300">{num}</span>
      <h2 id={id} className="scroll-mt-24 text-2xl font-semibold tracking-tight text-white md:text-3xl">
        {children}
      </h2>
    </div>
  );
}

export function DatasetDocPage({ dataset }: { dataset: DatasetDoc }) {
  const d = dataset;

  const overview = resolveStatTokensAll(d.overview);
  d.overview?.forEach((p, i) => assertNoRawFigures(p, `${d.slug} → overview[${i}]`));

  const facts = (d.facts ?? []).map((f, i) => ({
    ...f,
    value: copy(f.value, `${d.slug} → facts[${i}].value`) ?? f.value,
    note: copy(f.note, `${d.slug} → facts[${i}].note`),
  }));

  const methodology = d.methodology ?? [];
  const codeExamples = d.codeExamples ?? [];
  const changelog = [...(d.changelog ?? [])].sort((a, b) => (a.date < b.date ? 1 : -1));
  const related = d.relatedDatasets ?? [];

  // Only sections that exist get an anchor in the contents rail.
  const toc = [
    { id: "overview", label: "Overview", show: overview.length > 0 },
    { id: "schema", label: "Schema reference", show: d.columns.length > 0 },
    { id: "join-guide", label: copy(d.joinGuideTitle, "joinGuideTitle") ?? "Join guide", show: codeExamples.length > 0 },
    { id: "methodology", label: "Methodology & caveats", show: methodology.length > 0 },
    { id: "related", label: "Related datasets", show: related.length > 0 },
    { id: "changelog", label: "Changelog", show: changelog.length > 0 },
  ].filter((t) => t.show);

  return (
    <div className="relative overflow-hidden bg-[#030619] text-white">
      {/* ---------- Hero ---------- */}
      <section className="relative border-b border-white/10 py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(56,189,248,0.10),transparent_36%),radial-gradient(circle_at_84%_74%,rgba(45,212,191,0.08),transparent_36%)]" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-slate-500">
              <li>
                <Link href="/datasets" className="transition hover:text-slate-300">
                  Datasets
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-400">{d.slug}</li>
            </ol>
          </nav>

          {d.eyebrow ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              {d.eyebrow}
            </span>
          ) : null}

          <h1 className="mt-6 max-w-3xl text-3xl font-bold tracking-tight text-white md:text-5xl">
            {copy(d.title, `${d.slug} → title`)}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            {copy(d.summary, `${d.slug} → summary`)}
          </p>

          {/* A dataset can be documented before it is listed — B was, deliberately, because
              the docs URL has to resolve BEFORE a listing is submitted (the IP-to-ASN
              listing was rejected once for a docs link that did not). So the note renders
              on its own; only the button needs a listing to point at. */}
          {d.listingUrl || d.contactNote ? (
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              {d.listingUrl ? (
              <a
                href={d.listingUrl}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                {d.listingLabel ?? "View the listing"}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              ) : null}
              {d.contactNote ? (
                <p className="max-w-sm text-sm leading-6 text-slate-400">
                  {copy(d.contactNote, `${d.slug} → contactNote`)}
                </p>
              ) : null}
            </div>
          ) : null}

          {facts.length > 0 ? (
            <dl className="mt-10 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
              {facts.map((f) => (
                <div
                  key={f._key ?? f.label}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <dt className="font-mono text-[11px] uppercase tracking-[0.13em] text-slate-400">
                    {f.label}
                  </dt>
                  <dd className="mt-2 font-mono text-lg font-bold tabular-nums text-white">
                    {f.value}
                  </dd>
                  {f.note ? (
                    // A bare count leaves a buyer asking "is anything missing?".
                    // The qualifier answers that next to the number, not in prose
                    // three sections further down.
                    <dd className="mt-1.5 text-xs leading-5 text-emerald-300/90">{f.note}</dd>
                  ) : null}
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </section>

      {/* ---------- Contents ---------- */}
      {toc.length > 1 ? (
        <nav
          aria-label="On this page"
          className="border-b border-white/10 bg-white/[0.02] py-4"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.12em] text-slate-400">
              {toc.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className="transition hover:text-white">
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      ) : null}

      {/* ---------- Overview ---------- */}
      {overview.length > 0 ? (
        <section className="border-b border-white/10 py-14 md:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionHeading num="01" id="overview">
              Overview
            </SectionHeading>
            <div className="max-w-3xl space-y-5">
              {overview.map((p, i) => (
                <p key={i} className="text-base leading-7 text-slate-300">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ---------- Schema reference ---------- */}
      {d.columns.length > 0 ? (
        <section className="border-b border-white/10 py-14 md:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionHeading num="02" id="schema">
              Schema reference
            </SectionHeading>

            {d.tableName ? (
              <p className="mb-6 font-mono text-sm text-slate-400">
                Table: <span className="text-white">{d.tableName}</span>
              </p>
            ) : null}

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]">
              <table className="w-full min-w-[42rem] border-collapse text-left">
                <caption className="sr-only">
                  Columns shipped in {d.tableName ?? d.title}
                </caption>
                <thead>
                  <tr className="border-b border-white/10">
                    <th
                      scope="col"
                      className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.13em] text-slate-400"
                    >
                      Column
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.13em] text-slate-400"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.13em] text-slate-400"
                    >
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {d.columns.map((col, i) => (
                    <tr
                      key={col._key ?? col.name}
                      className={i < d.columns.length - 1 ? "border-b border-white/[0.06]" : ""}
                    >
                      <th scope="row" className="px-5 py-3.5 align-top font-normal">
                        <code className="whitespace-nowrap font-mono text-[13px] text-sky-200">
                          {col.name}
                        </code>
                        {col.isJoinKey ? (
                          <span className="mt-1.5 flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.12em] text-emerald-300">
                            <KeyRound className="h-3 w-3" aria-hidden="true" />
                            Join key
                          </span>
                        ) : null}
                      </th>
                      <td className="px-5 py-3.5 align-top font-mono text-[13px] text-slate-400">
                        {col.type}
                      </td>
                      <td className="px-5 py-3.5 align-top text-sm leading-6 text-slate-300">
                        {copy(col.description, `${d.slug} → columns[${i}].description`)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {d.schemaNote ? (
              <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-400">
                {copy(d.schemaNote, `${d.slug} → schemaNote`)}
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* ---------- Join guide ---------- */}
      {codeExamples.length > 0 ? (
        <section className="border-b border-white/10 py-14 md:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionHeading num="03" id="join-guide">
              {copy(d.joinGuideTitle, `${d.slug} → joinGuideTitle`) ?? "Join guide"}
            </SectionHeading>

            {d.joinGuideIntro ? (
              <p className="mb-8 max-w-3xl text-base leading-7 text-slate-300">
                {copy(d.joinGuideIntro, `${d.slug} → joinGuideIntro`)}
              </p>
            ) : null}

            <div className="space-y-10">
              {codeExamples.map((ex, i) => (
                <div key={ex._key ?? ex.title}>
                  <h3 className="text-lg font-semibold text-white">
                    {copy(ex.title, `${d.slug} → codeExamples[${i}].title`)}
                  </h3>
                  {ex.description ? (
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                      {copy(ex.description, `${d.slug} → codeExamples[${i}].description`)}
                    </p>
                  ) : null}
                  <div className="mt-4">
                    <DatasetCode code={ex.code} language={ex.language ?? "sql"} />
                  </div>
                  {ex.note ? (
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">{ex.note}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ---------- Methodology & caveats ---------- */}
      {methodology.length > 0 ? (
        <section className="border-b border-white/10 py-14 md:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionHeading num="04" id="methodology">
              Methodology &amp; caveats
            </SectionHeading>
            <div className="grid gap-5 md:grid-cols-2">
              {methodology.map((n, i) => (
                <div
                  key={n._key ?? n.title}
                  className={`rounded-r-xl border-l-[3px] bg-white/[0.03] px-6 py-5 ${
                    n.tone === "caveat" ? "border-amber-400/80" : "border-sky-400/70"
                  }`}
                >
                  <h3 className="text-base font-semibold text-white">
                    {copy(n.title, `${d.slug} → methodology[${i}].title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {copy(n.body, `${d.slug} → methodology[${i}].body`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ---------- Related datasets ---------- */}
      {related.length > 0 ? (
        <section className="border-b border-white/10 py-14 md:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionHeading num="05" id="related">
              Related datasets
            </SectionHeading>
            <div className="grid gap-4 md:grid-cols-2">
              {related.map((r) => {
                const body = (
                  <>
                    <h3 className="text-base font-semibold text-white">{r.title}</h3>
                    {r.summary ? (
                      <p className="mt-2 text-sm leading-6 text-slate-400">{r.summary}</p>
                    ) : null}
                    <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-sky-300">
                      {r.unpublished ? "Documentation coming soon" : "Read the documentation"}
                    </span>
                  </>
                );

                // An unpublished sibling is named, not linked — a dead link on
                // the page a marketplace listing points at is worse than none.
                return r.unpublished ? (
                  <div
                    key={r.slug}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
                  >
                    {body}
                  </div>
                ) : (
                  <Link
                    key={r.slug}
                    href={`/datasets/${r.slug}`}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/25 hover:bg-white/[0.04]"
                  >
                    {body}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* ---------- Changelog ---------- */}
      {changelog.length > 0 ? (
        <section className="py-14 md:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionHeading num="06" id="changelog">
              Changelog
            </SectionHeading>
            <ol className="max-w-3xl space-y-4">
              {/* A release can carry several entries on one date — B shipped four on
                  2026-09-21 — and keying on the date alone makes React drop all but one
                  of them. The index is stable here: this list is sorted, not reordered. */}
              {changelog.map((c, i) => (
                <li
                  key={c._key ?? `${c.date}-${i}`}
                  className="flex flex-col gap-1.5 border-l-2 border-white/10 pl-5 sm:flex-row sm:gap-6"
                >
                  <time
                    dateTime={c.date}
                    className="shrink-0 font-mono text-xs uppercase tracking-[0.12em] text-slate-500 sm:w-28"
                  >
                    {c.date}
                  </time>
                  <p className="text-sm leading-6 text-slate-300">{c.summary}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default DatasetDocPage;

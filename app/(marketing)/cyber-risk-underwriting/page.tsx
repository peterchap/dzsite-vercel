import type { Metadata } from "next";
import type React from "react";

import {
  copyCta,
  copyText,
  getCopySection,
  resolveCopyCards,
  type MarketingPageCopy,
} from "@/lib/marketing-copy";
import { sanityFetch } from "@/sanity/fetch";
import { marketingPageCopyBySlugQuery } from "@/sanity/marketingCopy";
import { PageShell } from "@/components/layout/PageShell";
import { loadIntelligenceFigures } from "@/lib/observatory-figures";
import { DATASET_CATALOG, isAvailable } from "@/lib/datasets/catalog";
import { getDatasets } from "@/lib/datasets/load";
import { DELIVERY_POSTURES } from "@/lib/trust-posture";
import { formatLegalDate } from "@/lib/legal-entity";
import { SLUG, content } from "./copy";
import { recordAgeFrom, isRecordAgePublishable } from "./freshness";
import { getSiteStats } from "@/lib/site-stats-live";

export const metadata: Metadata = {
  title: "Cyber insurance risk intelligence: portfolio concentration and underwriting — Datazag",
  description:
    "See which providers your insureds share, weighted by resilience and exit friction, and which policies are exposed when one fails. Pre-bind assessment and in-period review from public infrastructure, with the evidence for every finding.",
};

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-xs font-semibold text-slate-300">
      {children}
    </span>
  );
}

function SectionHeader({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
      {body ? <p className="mt-5 text-base leading-7 text-slate-300 md:text-lg md:leading-8">{body}</p> : null}
    </div>
  );
}

function Section({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t border-white/10 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

function Card({ title, text, tags }: { title?: string; text?: string; tags?: string[] }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-400">{text}</p>
      {tags?.length ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </div>
      ) : null}
    </article>
  );
}

/**
 * The evidence visual. Deliberately a RENDERED STRUCTURE, not a screenshot:
 * it shows the real shape of a Cross-Estate finding — confidence tier, the
 * relationship that evidenced it, and the reason a control fired — using the
 * vocabulary the reports actually emit. Inventing a customer's estate as a
 * fake screenshot would be the same defect this brief exists to remove.
 */
function EvidencePanel() {
  const discovered = [
    { tier: "Declared", note: "Given on the submission", tone: "text-slate-300" },
    { tier: "Strongly associated", note: "Shared certificate SAN + mail exchanger", tone: "text-cyan-200" },
    { tier: "Possible", note: "Registration relationship, review", tone: "text-amber-200" },
    { tier: "Defensive", note: "Registered, unused, worth monitoring", tone: "text-slate-400" },
  ];

  const findings = [
    { control: "DMARC", state: "p=none", reason: "Published but not enforcing — impersonation is reported, not blocked" },
    { control: "SPF", state: "pass", reason: "Enforcing, within the lookup limit" },
    { control: "MTA-STS", state: "absent", reason: "Available at this provider, not deployed" },
  ];

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#07102b]/85 p-4 shadow-2xl shadow-black/25 md:p-5">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:44px_44px] opacity-35" />
      <div className="relative rounded-[1.5rem] border border-white/10 bg-[#030619]/75">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/70">Submission assessment</p>
          <p className="text-xs text-slate-400">Structure of a finding</p>
        </div>

        <div className="grid gap-4 p-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Estate discovery</p>
            <div className="mt-3 grid gap-2">
              {discovered.map((row) => (
                <div key={row.tier} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-xl border border-white/10 bg-[#030619]/50 px-3 py-2">
                  <span className={`text-sm font-semibold ${row.tone}`}>{row.tier}</span>
                  <span className="text-xs text-slate-400">{row.note}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-500">
              Every tier above &ldquo;Declared&rdquo; shows the relationship that evidenced it.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Control findings</p>
            <div className="mt-3 grid gap-2">
              {findings.map((f) => (
                <div key={f.control} className="rounded-xl border border-white/10 bg-[#030619]/50 px-3 py-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold text-white">{f.control}</span>
                    <span className="font-mono text-xs text-cyan-200">{f.state}</span>
                  </div>
                  <p className="mt-1 text-xs leading-5 text-slate-400">{f.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Compound exposure, drawn as a mechanism rather than as data: one insured,
 * two functions, and what one provider outage removes in each arrangement.
 * No counts — there is no measured book to draw them from on this page.
 */
function CompoundDiagram() {
  const arrangements = [
    {
      key: "separate",
      label: "Separate providers",
      rows: [
        { fn: "DNS", provider: "Provider A", lost: true },
        { fn: "Mail", provider: "Provider B", lost: false },
      ],
      result: "Provider A fails: one function lost.",
      tone: "border-white/10",
    },
    {
      key: "shared",
      label: "One provider for both",
      rows: [
        { fn: "DNS", provider: "Provider A", lost: true },
        { fn: "Mail", provider: "Provider A", lost: true },
      ],
      result: "Provider A fails: both functions lost.",
      tone: "border-amber-300/30",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {arrangements.map((a) => (
        <figure key={a.key} className={`rounded-2xl border ${a.tone} bg-[#030619]/60 p-5`}>
          <figcaption className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{a.label}</figcaption>
          <div className="mt-4 grid gap-2">
            {a.rows.map((r) => (
              <div key={r.fn} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
                <span className="text-sm font-semibold text-white">{r.fn}</span>
                <span className="flex items-center gap-2 text-xs text-slate-400">
                  {r.provider}
                  <span
                    aria-hidden
                    className={`h-2 w-2 rounded-full ${r.lost ? "bg-amber-300" : "bg-emerald-400"}`}
                  />
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-300">{a.result}</p>
        </figure>
      ))}
    </div>
  );
}

export default async function CyberRiskUnderwritingPage() {
  const pageCopy = await sanityFetch<MarketingPageCopy>(marketingPageCopyBySlugQuery, { slug: SLUG }, 300);
  // Internet-wide concentration, from the Observatory store (never typed). Null → the callout is omitted.
  const concentrationFigures = (await loadIntelligenceFigures())?.concentration ?? null;
  // Link a dataset row to its doc page only when that page resolves — the same rule /datasets uses.
  // Measured record age, from the live feed (hourly). Renders nothing until the feed carries it.
  const RECORD_AGE = recordAgeFrom(await getSiteStats());
  const docSlugs = new Set((await getDatasets().catch(() => [])).map((d) => d.slug));

  const section = (key: string) => getCopySection(pageCopy, key);
  const hero = section("hero");
  const readers = section("readers");
  const decisions = section("decisions");
  const signals = section("signals");
  const concentration = section("concentration");
  const compound = section("compound");
  const reverse = section("reverse");
  const change = section("change");
  const freshness = section("freshness");
  const datasets = section("datasets");
  const diligence = section("diligence");
  const evidence = section("evidence");
  const delivery = section("delivery");
  const privacy = section("privacy");
  const cta = section("cta");

  const heroPrimary = copyCta(hero?.primaryCta, content.hero.primaryCta!);
  const heroSecondary = copyCta(hero?.secondaryCta, content.hero.secondaryCta!);
  const ctaPrimary = copyCta(cta?.primaryCta, content.cta.primaryCta!);
  const ctaSecondary = copyCta(cta?.secondaryCta, content.cta.secondaryCta!);
  const evidencePrimary = copyCta(evidence?.primaryCta, content.evidence.primaryCta!);

  const readerCards = resolveCopyCards(content.readers.items!, readers);
  const decisionCards = resolveCopyCards(content.decisions.items!, decisions);
  const signalCards = resolveCopyCards(content.signals.items!, signals);
  const dimensionCards = resolveCopyCards(content.concentration.items!, concentration);
  const reverseCards = resolveCopyCards(content.reverse.items!, reverse);
  const changeCards = resolveCopyCards(content.change.items!, change);
  const freshnessCards = resolveCopyCards(content.freshness.items!, freshness);
  const diligenceCards = resolveCopyCards(content.diligence.items!, diligence);
  const evidenceCards = resolveCopyCards(content.evidence.items!, evidence);
  const deliveryCards = resolveCopyCards(content.delivery.items!, delivery);

  // Only catalog entries render, with their real availability. A question keyed
  // to a slug the catalog does not have is dropped rather than invented.
  const datasetRows = resolveCopyCards(content.datasets.items!, datasets).flatMap((card) => {
    const entry = DATASET_CATALOG.find((e) => e.slug === card.key);
    return entry ? [{ card, entry, available: isAvailable(entry), hasDoc: docSlugs.has(entry.slug) }] : [];
  });

  return (
    <PageShell>
      {/* Hero — the book first, the individual risk beneath it. */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(55,222,245,0.16),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(139,92,246,0.13),transparent_34%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/[0.1] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">
                {copyText(hero?.eyebrow, content.hero.eyebrow!)}
              </p>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-6xl">
                {copyText(hero?.title, content.hero.title!)}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                {copyText(hero?.body, content.hero.body!)}
              </p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
                {copyText(hero?.secondaryBody, content.hero.secondaryBody!)}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={heroPrimary.href} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
                  {heroPrimary.label}
                </a>
                <a href={heroSecondary.href} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">
                  {heroSecondary.label}
                </a>
              </div>
            </div>

            {/* Two readers, two questions. */}
            <div className="grid gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">
                  {copyText(readers?.eyebrow, content.readers.eyebrow!)}
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                  {copyText(readers?.title, content.readers.title!)}
                </h2>
              </div>
              {readerCards.map((card) => (
                <div key={card.key} className="rounded-2xl border border-white/10 bg-[#07102b]/80 p-6">
                  <p className="text-xl font-semibold text-white">{card.title}</p>
                  <p className="mt-2 text-sm text-slate-400">{card.text}</p>
                  {card.tags?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {card.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Underwriting — the individual-risk promise. */}
      <Section id="underwriting">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">
              {copyText(decisions?.eyebrow, content.decisions.eyebrow!)}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">
              {copyText(decisions?.title, content.decisions.title!)}
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-300 md:text-lg md:leading-8">
              {copyText(decisions?.body, content.decisions.body!)}
            </p>
            <p className="mt-4 text-base leading-7 text-slate-400">
              {copyText(decisions?.secondaryBody, content.decisions.secondaryBody!)}
            </p>
            <div className="mt-8 grid gap-4">
              {decisionCards.map((card) => <Card key={card.key} title={card.title} text={card.text} tags={card.tags} />)}
            </div>
          </div>
          <div className="lg:sticky lg:top-28">
            <EvidencePanel />
            <a href={heroPrimary.href} className="mt-4 inline-flex text-sm font-semibold text-cyan-200 underline-offset-4 hover:underline">
              {heroPrimary.label} →
            </a>
          </div>
        </div>

        <div className="mt-16">
          <SectionHeader
            eyebrow={copyText(signals?.eyebrow, content.signals.eyebrow!)}
            title={copyText(signals?.title, content.signals.title!)}
            body={copyText(signals?.body, content.signals.body!)}
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {signalCards.map((card) => <Card key={card.key} title={card.title} text={card.text} />)}
          </div>
        </div>
      </Section>

      {/* Concentration — the differentiated number. */}
      <Section id="concentration">
        <SectionHeader
          eyebrow={copyText(concentration?.eyebrow, content.concentration.eyebrow!)}
          title={copyText(concentration?.title, content.concentration.title!)}
          body={copyText(concentration?.body, content.concentration.body!)}
        />
        <p className="mx-auto mt-5 max-w-3xl text-center text-base leading-7 text-slate-400">
          {copyText(concentration?.secondaryBody, content.concentration.secondaryBody!)}
        </p>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {dimensionCards.map((card) => (
            <div key={card.key} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <h3 className="text-base font-semibold text-white">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{card.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200/80">
              {copyText(compound?.eyebrow, content.compound.eyebrow!)}
            </p>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-3xl">
              {copyText(compound?.title, content.compound.title!)}
            </h3>
            <p className="mt-4 text-base leading-7 text-slate-300">
              {copyText(compound?.body, content.compound.body!)}
            </p>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              {copyText(compound?.secondaryBody, content.compound.secondaryBody!)}
            </p>
          </div>
          <CompoundDiagram />
        </div>

        {concentrationFigures ? (
          <p className="mt-10 max-w-3xl rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.055] p-5 text-sm leading-6 text-slate-300">
            The same concentration exists across the internet.{" "}
            <strong className="text-white">{concentrationFigures.half.value}</strong> networks carry half of all domains
            that sit on a network, and <strong className="text-white">{concentrationFigures.ninety.value}</strong> carry
            nine in ten.{" "}
            <a href={concentrationFigures.half.href} className="font-semibold text-cyan-200 underline-offset-4 hover:underline">
              Method and caveats →
            </a>
          </p>
        ) : null}
      </Section>

      {/* Reverse index — start from the provider. */}
      <Section id="reverse-index">
        <SectionHeader
          eyebrow={copyText(reverse?.eyebrow, content.reverse.eyebrow!)}
          title={copyText(reverse?.title, content.reverse.title!)}
          body={copyText(reverse?.body, content.reverse.body!)}
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {reverseCards.map((card) => <Card key={card.key} title={card.title} text={card.text} />)}
        </div>
      </Section>

      {/* Change during the term, and how fresh the data is. */}
      <Section id="change">
        <SectionHeader
          eyebrow={copyText(change?.eyebrow, content.change.eyebrow!)}
          title={copyText(change?.title, content.change.title!)}
          body={copyText(change?.body, content.change.body!)}
        />
        <p className="mx-auto mt-5 max-w-3xl text-center text-sm leading-6 text-slate-400">
          {copyText(change?.secondaryBody, content.change.secondaryBody!)}
        </p>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {changeCards.map((card) => <Card key={card.key} title={card.title} text={card.text} />)}
        </div>

        <div className="mt-16 rounded-[2rem] border border-white/10 bg-[#07102b]/70 p-6 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">
            {copyText(freshness?.eyebrow, content.freshness.eyebrow!)}
          </p>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-3xl">
            {copyText(freshness?.title, content.freshness.title!)}
          </h3>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
            {copyText(freshness?.body, content.freshness.body!)}
          </p>
          <dl className="mt-8 grid gap-4 md:grid-cols-3">
            {freshnessCards.map((card) => (
              <div key={card.key} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <dt className="text-base font-semibold text-white">{card.title}</dt>
                <dd className="mt-2 text-sm leading-6 text-slate-400">{card.text}</dd>
              </div>
            ))}
          </dl>
          {/* Measured, or nothing. See ./freshness.ts. */}
          {isRecordAgePublishable(RECORD_AGE) ? (
            <p className="mt-6 text-sm leading-6 text-slate-300">
              Measured record age across the served corpus: median{" "}
              <strong className="text-white">{RECORD_AGE.median}</strong>, 95th percentile{" "}
              <strong className="text-white">{RECORD_AGE.p95}</strong>. Measured{" "}
              <time dateTime={RECORD_AGE.measuredAt}>{formatLegalDate(RECORD_AGE.measuredAt)}</time>.
            </p>
          ) : null}
          <p className="mt-6 border-l-2 border-cyan-300/40 pl-4 text-sm leading-6 text-slate-300">
            {copyText(freshness?.secondaryBody, content.freshness.secondaryBody!)}
          </p>
        </div>
      </Section>

      {/* Datasets for analysts — one line each, linking to the catalog. */}
      {datasetRows.length ? (
        <Section id="datasets">
          <SectionHeader
            eyebrow={copyText(datasets?.eyebrow, content.datasets.eyebrow!)}
            title={copyText(datasets?.title, content.datasets.title!)}
            body={copyText(datasets?.body, content.datasets.body!)}
          />
          <div className="mx-auto mt-12 max-w-5xl divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]">
            {datasetRows.map(({ card, entry, available, hasDoc }) => (
              <div key={entry.slug} className="grid gap-3 p-5 md:grid-cols-[1.2fr_1fr_auto] md:items-center md:gap-6">
                <div>
                  <p className="text-base font-semibold text-white">{card.title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-400">{card.text}</p>
                </div>
                <p className="text-sm font-semibold text-slate-200">
                  {hasDoc ? (
                    <a href={`/datasets/${entry.slug}`} className="text-cyan-200 underline-offset-4 hover:underline">
                      {entry.name} →
                    </a>
                  ) : (
                    entry.name
                  )}
                </p>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${available ? "bg-emerald-400" : "bg-slate-500"}`} />
                  {available ? "Available" : "Coming soon"}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-slate-400">
            <a href="/datasets" className="font-semibold text-cyan-200 underline-offset-4 hover:underline">
              All datasets and delivery routes →
            </a>
          </p>
        </Section>
      ) : null}

      {/* Delivery — Assess / Enrich, then the two privacy positions. */}
      <Section id="delivery">
        <SectionHeader
          eyebrow={copyText(delivery?.eyebrow, content.delivery.eyebrow!)}
          title={copyText(delivery?.title, content.delivery.title!)}
          body={copyText(delivery?.body, content.delivery.body!)}
        />
        <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-2">
          {deliveryCards.map((card) => <Card key={card.key} title={card.title} text={card.text} tags={card.tags} />)}
        </div>

        {/* The share-path claim renders from lib/trust-posture.ts, the wording
            /trust uses, and each route carries its own consequence line so the
            share claim cannot be read as covering the API or a report. */}
        <div className="mt-16">
          <SectionHeader
            eyebrow={copyText(privacy?.eyebrow, content.privacy.eyebrow!)}
            title={copyText(privacy?.title, content.privacy.title!)}
            body={copyText(privacy?.body, content.privacy.body!)}
          />
          <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
            {DELIVERY_POSTURES.map((p) => (
              <article
                key={p.key}
                className={`rounded-2xl border p-6 ${p.key === "share" ? "border-cyan-300/25 bg-cyan-300/[0.05]" : "border-white/10 bg-white/[0.035]"}`}
              >
                <h3 className="text-lg font-semibold text-white">{p.mode}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{p.dataFlow}</p>
                <p className="mt-3 text-sm leading-6 text-slate-400">{p.consequence}</p>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-6 text-slate-400">
            {copyText(privacy?.secondaryBody, content.privacy.secondaryBody!)}{" "}
            <a href="/trust" className="font-semibold text-cyan-200 underline-offset-4 hover:underline">
              Trust center →
            </a>
          </p>
        </div>
      </Section>

      {/* M&A due diligence — same exposure intelligence, different buyer and moment. */}
      <Section id="diligence">
        <SectionHeader
          eyebrow={copyText(diligence?.eyebrow, content.diligence.eyebrow!)}
          title={copyText(diligence?.title, content.diligence.title!)}
          body={copyText(diligence?.body, content.diligence.body!)}
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {diligenceCards.map((card) => <Card key={card.key} title={card.title} text={card.text} />)}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-slate-400">
          {copyText(diligence?.secondaryBody, content.diligence.secondaryBody!)}
        </p>
      </Section>

      {/* Evidence */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">
              {copyText(evidence?.eyebrow, content.evidence.eyebrow!)}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">
              {copyText(evidence?.title, content.evidence.title!)}
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-300">
              {copyText(evidence?.body, content.evidence.body!)}
            </p>
            <p className="mt-4 text-base leading-7 text-slate-400">
              {copyText(evidence?.secondaryBody, content.evidence.secondaryBody!)}
            </p>
            <a href={evidencePrimary.href} className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl border border-cyan-300/50 bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
              {evidencePrimary.label}
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {evidenceCards.map((card) => (
              <div key={card.key} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-base font-semibold text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Closing CTA — split by reader. The free domain report is secondary
          here: an insurer tests against their book, not their own domain. */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">
            {copyText(cta?.eyebrow, content.cta.eyebrow!)}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">
            {copyText(cta?.title, content.cta.title!)}
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-300">
            {copyText(cta?.body, content.cta.body!)}
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Underwriters</p>
              <a href={ctaPrimary.href} className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
                {ctaPrimary.label}
              </a>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Analysts</p>
              <a href={ctaSecondary.href} className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">
                {ctaSecondary.label}
              </a>
            </div>
          </div>
          <p className="mt-6 text-sm text-slate-400">
            Or <a href="/#free-report" className="font-semibold text-cyan-200 underline-offset-4 hover:underline">check one domain free</a>.
          </p>
        </div>
      </Section>
    </PageShell>
  );
}

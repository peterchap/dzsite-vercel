import Link from "next/link";

import { ObservatoryFiguresPanel } from "@/components/diagrams/ObservatoryPreview/ObservatoryPreview";
import { LivingInternetBackdrop } from "@/components/story/diagrams/LivingInternetBackdrop";
import { estateFromPrice, getPriceTable, snapshotFromPrice, SNAPSHOT_BUY_URL } from "@/lib/estate-prices";
import { asOfLabel } from "@/lib/live-activity-guard";
import { loadObservatoryFigures, OBSERVATORY_URL } from "@/lib/observatory-figures";
import { getObservatoryHealth } from "@/lib/observatory-health";
import { getPaidReportPrice, PAID_REPORT_BUY_URL } from "@/lib/paid-report-price";
import { ESTATE_REPORT_NAME, ESTATE_SNAPSHOT_NAME, FREE_REPORT_NAME, PAID_REPORT_NAME } from "@/lib/report-names";
import { getSiteStats } from "@/lib/site-stats-live";
import { AUDIENCES, COVERAGE, DELIVERY, EVIDENCE, FREE_REPORT, HERO, OBSERVATORY, PRICING } from "./copy";
import { FreeReportForm } from "./FreeReportForm";
import { SampleTabs, type Sample } from "./SampleTabs";
import { TrackedLink } from "./TrackedLink";

/*
 * HOMEPAGE — demand generation restructure (brief: Peter, 7 Oct 2026).
 *
 * Goal: in five seconds a visitor knows what Datazag provides and whether it is for
 * them, then takes one step: the free report, the datasets, or their audience page.
 *
 *   1 Hero                 who it serves, what it does, two buttons, live stat
 *   2 Audiences            five tiles, the first four matching the hero list
 *   3 Free report          inline form, handed to the portal's free-report flow
 *   4 Evidence             real sample renders with downloads
 *   5 Coverage and method  published stats with definitions, method, cadence
 *   6 Delivery             only channels that are live today
 *   7 Observatory          hidden when the Observatory stops publishing
 *   8 Pricing              every price read from the portal
 *
 * Replaces StoryPage (2026-09-25 intelligence repositioning), which stays in the repo.
 * Copy lives in ./copy.ts. Nothing here types a figure or a price.
 */

// Estate CTA routing, the same gate as /reports: the portal's /scope once it is live.
const scopeLive = process.env.NEXT_PUBLIC_SCOPE_LIVE === "true";
const ESTATE_HREF = scopeLive
  ? process.env.NEXT_PUBLIC_SCOPE_URL || "https://portal.datazag.com/scope?src=home"
  : "/reports#cross-estate";

const SAMPLES: Sample[] = [
  {
    key: "health",
    tab: "Health Report",
    title: PAID_REPORT_NAME,
    text: "The full report for one domain: email controls, platform impersonation, hosting and subdomains, with a fix for each finding.",
    image: { src: "/samples/health-report-sample.png", alt: "First page of a sample attack surface report for the fictional Meridian Holdings" },
    downloads: [{ label: "Download the PDF", href: "/samples/health-report-sample.pdf", format: "pdf" }],
  },
  {
    key: "estate",
    tab: "Estate Report",
    title: ESTATE_REPORT_NAME,
    text: "Every domain a group of companies owns, graded for exposure, with the evidence behind each finding.",
    image: { src: "/samples/estate-report-sample.png", alt: "First screen of a sample estate report for the fictional Acme Group" },
    downloads: [
      { label: "Download the PDF", href: "/samples/estate-report-sample.pdf", format: "pdf" },
      { label: "Open in your browser", href: "/samples/estate-attack-surface-report.html", format: "html" },
    ],
  },
  {
    key: "alerts",
    tab: "Alerts",
    title: "Impersonation alerts",
    text: "Each alert names the lookalike domain, the brand it copies and the evidence we found. Alerts use the STIX 2.1 standard.",
    image: { src: "/samples/alert-sample.png", alt: "A sample impersonation alert for a fictional brand" },
    downloads: [{ label: "Download the JSON", href: "/samples/alert-sample.json", format: "json" }],
  },
  {
    key: "datasets",
    tab: "Datasets",
    title: "IP-to-ASN dataset",
    text: "Each IP range mapped to the network that announces it. See the schema and sample rows before you subscribe.",
    image: { src: "/samples/dataset-sample.png", alt: "The first rows of the IP-to-ASN dataset" },
    downloads: [
      { label: "Download the schema", href: "/samples/dataset-ip-asn-schema.csv", format: "csv-schema" },
      { label: "Download sample rows", href: "/samples/dataset-ip-asn-sample.csv", format: "csv" },
    ],
  },
];

const kickerClass = "text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70";
const h2Class = "mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl";
const primaryBtn =
  "inline-flex min-h-12 items-center justify-center rounded-full border border-cyan-300/50 bg-cyan-300 px-6 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300/70";
const secondaryBtn =
  "inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-300/70";
const textLink = "font-semibold text-cyan-200 underline-offset-4 hover:underline";

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative scroll-mt-24 border-t border-white/10 py-16 md:py-24 ${className}`}>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export default async function HomePage() {
  const [stats, paid, table, observatory] = await Promise.all([
    getSiteStats(),
    getPaidReportPrice(),
    getPriceTable(),
    getObservatoryHealth(),
  ]);
  const figures = observatory.show ? await loadObservatoryFigures({ exclude: ["corpus_domains"] }) : null;

  const domainsAsOf = asOfLabel(stats.STATS_AS_OF.domainsMonitored);
  // "from $X" -> "From $X" at the start of a card line.
  const cap = (s: string | null) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : null);
  const snapshotFrom = cap(snapshotFromPrice(table));
  const estateFrom = cap(estateFromPrice(table));

  return (
    <main className="relative overflow-hidden bg-[#030619] text-white">
      {/* 1 · Hero */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <LivingInternetBackdrop />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
              {HERO.eyebrow}
            </p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">{HERO.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
              {HERO.intro.join(" ").replace("{domains}", stats.DOMAINS_DISPLAY)}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedLink href={HERO.primary.href} event="hero_cta_click" params={{ cta: "free_report" }} className={primaryBtn}>
                {HERO.primary.label}
              </TrackedLink>
              <TrackedLink href={HERO.secondary.href} event="hero_cta_click" params={{ cta: "samples" }} className={secondaryBtn}>
                {HERO.secondary.label}
              </TrackedLink>
            </div>
            <p className="mt-8 text-sm text-slate-400">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400 align-middle" aria-hidden="true" />
              Live: {stats.DOMAINS_DISPLAY} resolving domains
              {domainsAsOf ? <> · as of {domainsAsOf}</> : null}
              {observatory.show ? (
                <>
                  {" · "}
                  <TrackedLink href={OBSERVATORY_URL} event="observatory_link_click" params={{ location: "hero" }} className={textLink}>
                    {HERO.observatoryLink} →
                  </TrackedLink>
                </>
              ) : null}
            </p>
          </div>
        </div>
      </section>

      {/* 2 · Audiences */}
      <Section id="who-its-for">
        <p className={kickerClass}>What can I use it for?</p>
        <h2 className={h2Class}>Choose your team and your problem.</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {AUDIENCES.map((a) => (
            <TrackedLink
              key={a.key}
              href={a.href === "estate" ? ESTATE_HREF : a.href}
              event="audience_tile_click"
              params={{ audience: a.key }}
              className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-cyan-300/30 hover:bg-white/[0.06]"
            >
              <h3 className="text-lg font-semibold text-white">{a.audience}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-200">{a.problem}</p>
              <p className="mt-2 flex-1 text-sm leading-6 text-slate-400">{a.outcome}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-200">
                Learn more <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </span>
            </TrackedLink>
          ))}
        </div>
      </Section>

      {/* 3 · Free report. The #free-report anchor is where the portal's return_to lands. */}
      <Section id="free-report">
        <div className="grid gap-10 rounded-[2rem] border border-white/10 bg-[#07102b]/85 p-5 md:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className={kickerClass}>{FREE_REPORT.kicker}</p>
            <h2 className={h2Class}>{FREE_REPORT.title}</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">{FREE_REPORT.intro}</p>
            <div className="mt-6">
              <FreeReportForm />
            </div>
            <p className="mt-5 text-sm text-slate-300">
              Need the full picture?{" "}
              {paid ? <>The {PAID_REPORT_NAME} is {paid.display}. </> : <>See the {PAID_REPORT_NAME}. </>}
              <TrackedLink href={PAID_REPORT_BUY_URL} event="pricing_link_click" params={{ product: "paid_report", location: "free_report" }} className={textLink}>
                Buy the full report →
              </TrackedLink>
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">What the free report shows</p>
            <ul className="mt-4 grid gap-3">
              {FREE_REPORT.bullets.map((b) => (
                <li key={b.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="font-semibold text-cyan-100">{b.title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">{b.text}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-slate-400">
              Not ready yet?{" "}
              <Link href="/reports/sample" className={textLink}>
                {FREE_REPORT.sampleLink}
              </Link>
            </p>
          </div>
        </div>
      </Section>

      {/* 4 · Evidence and sample outputs */}
      <Section id="samples">
        <p className={kickerClass}>{EVIDENCE.kicker}</p>
        <h2 className={h2Class}>{EVIDENCE.title}</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">{EVIDENCE.intro}</p>
        <div className="mt-8">
          <SampleTabs samples={SAMPLES} />
        </div>
        {/* Lead-time proof block (WU22) mounts HERE once a measured, published figure
            exists. Hidden until then: hub work/cc-task-lead-time-metric.md. */}
      </Section>

      {/* 5 · Coverage and methodology */}
      <Section id="coverage">
        <p className={kickerClass}>{COVERAGE.kicker}</p>
        <h2 className={h2Class}>{COVERAGE.title}</h2>
        {stats.publishedStats.length ? (
          <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.publishedStats.map((s, i) => (
              <div key={s.key} className="flex flex-col rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.055] p-5">
                <dt className="mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-100/85">
                  {s.label}
                  <sup className="ml-0.5 text-cyan-200/80">
                    <a href={`#def-${s.key}`} aria-label={`Definition ${i + 1}`}>{i + 1}</a>
                  </sup>
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white">{s.display}</dd>
                {asOfLabel(s.measuredAt) ? <dd className="mt-2 text-xs text-slate-400">As of {asOfLabel(s.measuredAt)}</dd> : null}
              </div>
            ))}
          </dl>
        ) : null}
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div>
            <p className="text-base leading-7 text-slate-300">{COVERAGE.method.join(" ")}</p>
            <p className="mt-4 text-base leading-7 text-slate-300">{COVERAGE.cadence}</p>
            <p className="mt-4">
              <Link href={COVERAGE.methodLink.href} className={textLink}>{COVERAGE.methodLink.label} →</Link>
            </p>
          </div>
          {stats.publishedStats.length ? (
            <ol className="grid gap-2 text-xs leading-5 text-slate-400">
              {stats.publishedStats.map((s, i) => (
                <li key={s.key} id={`def-${s.key}`} className="scroll-mt-24">
                  <span className="font-semibold text-slate-300">{i + 1}. {s.label}:</span> {s.definition}
                </li>
              ))}
            </ol>
          ) : null}
        </div>
      </Section>

      {/* 6 · Delivery. Only channels live today: portal reports and the Snowflake listing.
          Databricks, the public API and the Sentinel/TAXII feed join when they launch. */}
      <Section id="delivery">
        <p className={kickerClass}>{DELIVERY.kicker}</p>
        <h2 className={h2Class}>{DELIVERY.title}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {DELIVERY.channels.map((c) => (
            <Link key={c.key} href={c.href} className="group rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition hover:border-cyan-300/30 hover:bg-white/[0.06]">
              <h3 className="text-lg font-semibold text-white">{c.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{c.text}</p>
              <span className="mt-4 inline-flex text-sm font-semibold text-cyan-200">{c.link} →</span>
            </Link>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-base leading-7 text-slate-300">{DELIVERY.daas}</p>
        <p className="mt-3 text-sm">
          <Link href={DELIVERY.other.href} className={textLink}>{DELIVERY.other.label}</Link>
        </p>
      </Section>

      {/* 7 · Observatory. Hidden when the latest publish is stale (lib/observatory-health). */}
      {observatory.show ? (
        <Section id="observatory">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className={kickerClass}>{OBSERVATORY.kicker}</p>
              <h2 className={h2Class}>{OBSERVATORY.title}</h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">{OBSERVATORY.text}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <TrackedLink href={OBSERVATORY_URL} event="observatory_link_click" params={{ location: "section" }} className={primaryBtn}>
                  {OBSERVATORY.button}
                </TrackedLink>
                <Link href={OBSERVATORY.about.href} className={secondaryBtn}>{OBSERVATORY.about.label}</Link>
              </div>
            </div>
            <ObservatoryFiguresPanel figures={figures} />
          </div>
        </Section>
      ) : null}

      {/* 8 · Pricing and next step. Every price is read from the portal. */}
      <Section id="pricing">
        <p className={kickerClass}>{PRICING.kicker}</p>
        <h2 className={h2Class}>{PRICING.title}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <PriceCard
            title="Domain health reports"
            lines={[
              `${FREE_REPORT_NAME}: ${PRICING.free}`,
              paid ? `${PAID_REPORT_NAME}: ${paid.display}` : PAID_REPORT_NAME,
            ]}
            href={PAID_REPORT_BUY_URL}
            link="Buy the full report"
            product="paid_report"
          />
          <PriceCard title={ESTATE_SNAPSHOT_NAME} lines={[snapshotFrom ?? "Priced by number of organizations"]} href={SNAPSHOT_BUY_URL} link="Order a snapshot" product="snapshot" />
          <PriceCard title={ESTATE_REPORT_NAME} lines={[estateFrom ?? "Priced by number of domains"]} href={ESTATE_HREF} link="Scope your estate" product="estate" />
          <PriceCard title={PRICING.datasets.title} lines={[PRICING.datasets.text]} href={PRICING.datasets.href} link={PRICING.datasets.link} product="datasets" />
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 rounded-[2rem] border border-cyan-300/20 bg-cyan-300/[0.06] p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <h3 className="text-2xl font-semibold text-white">{PRICING.closing.title}</h3>
            <p className="mt-2 text-slate-300">{PRICING.closing.text}</p>
          </div>
          <TrackedLink href={HERO.primary.href} event="closing_cta_click" params={{ cta: "free_report" }} className={primaryBtn}>
            {HERO.primary.label}
          </TrackedLink>
        </div>
      </Section>
    </main>
  );
}

function PriceCard({ title, lines, href, link, product }: { title: string; lines: string[]; href: string; link: string; product: string }) {
  return (
    <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.035] p-5">
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <ul className="mt-3 flex-1 space-y-1 text-sm leading-6 text-slate-300">
        {lines.map((l) => <li key={l}>{l}</li>)}
      </ul>
      <TrackedLink href={href} event="pricing_link_click" params={{ product, location: "pricing" }} className={`mt-4 ${textLink} text-sm`}>
        {link} →
      </TrackedLink>
    </div>
  );
}

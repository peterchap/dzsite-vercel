import type { Metadata } from "next";

import { ObservatoryFiguresPanel } from "@/components/diagrams/ObservatoryPreview/ObservatoryPreview";
import { loadObservatoryFigures, OBSERVATORY_URL } from "@/lib/observatory-figures";

/**
 * The page on this site that describes the Observatory.
 *
 * The Observatory is a separate host by decision (brief D1): an institution
 * a reader bookmarks and cites, not a section of a vendor site. What makes
 * a subdomain legible as part of Datazag rather than a stray property is a
 * page here that says what it is — what it measures, over what population,
 * how often, why it is open, and how to cite it — and carries the
 * apex-domain link to it. Cloudflare Radar has the equivalent on
 * cloudflare.com; this is ours.
 *
 * No figure on this page is typed in. The panel reads the Observatory's
 * published statistics at build (lib/observatory-figures), and the prose
 * describes populations and cadences without quoting numbers that would go
 * stale the day after they were written.
 */
export const metadata: Metadata = {
  title: "The Datazag Observatory — open internet measurements",
  description:
    "What the Datazag Observatory measures, over what population, how often, why it is published openly, and how to cite it. Daily statistics on email authentication, routing hygiene, hosting concentration, domain parking and impersonation.",
  alternates: { canonical: "/observatory" },
};

const SECTIONS = [
  {
    title: "Email security posture",
    question: "Who actually runs the world's email, and how much of it is protected?",
    body: "SPF, DMARC, MTA-STS and BIMI adoption across every resolving domain, split by whether a domain operates mail, by parking, and by mail provider. Enforcement is measured separately from publication.",
    href: `${OBSERVATORY_URL}/mail`,
  },
  {
    title: "Malicious actors",
    question: "Where is malicious infrastructure being built?",
    body: "Impersonation detections by platform and brand, and how few networks carry them. Routing anomalies are measured from Datazag's own BGP collection, and the share that turns out to be benign multi-homing is published alongside the share that does not.",
    href: `${OBSERVATORY_URL}/actors`,
  },
  {
    title: "Internet infrastructure",
    question: "Who controls the routes and the hosting?",
    body: "How few networks carry most of the internet's domains, and what share of prefix announcements carry a valid, missing or invalid RPKI origin claim.",
    href: `${OBSERVATORY_URL}/infrastructure`,
  },
  {
    title: "The internet, explained",
    question: "What do these terms mean, and what does the corpus say about each?",
    body: "Plain-language explanations of ASN, prefix, MOAS, BGP hijacking, RPKI, SPF, DMARC, BIMI, MTA-STS, CAA, DNSSEC and domain parking, each drawn as a diagram and paired with the figure measured for it.",
    href: `${OBSERVATORY_URL}/learn`,
  },
];

function SectionHeader({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
      {body ? <p className="mt-5 text-base leading-7 text-slate-300 md:text-lg md:leading-8">{body}</p> : null}
    </div>
  );
}

export default async function ObservatoryPage() {
  const figures = await loadObservatoryFigures();
  const citationDate = figures?.asOf ?? "YYYY-MM-DD";

  return (
    <main className="overflow-hidden bg-[#030619] text-white">
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(55,222,245,0.16),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(139,92,246,0.13),transparent_34%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Datazag Observatory</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">See how the internet is changing.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Datazag continuously observes domains, DNS, certificates, email infrastructure and internet
                routing. The Observatory turns those observations into open statistics you can explore,
                compare and cite.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={OBSERVATORY_URL} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-cyan-300/50 bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
                  Open the Observatory
                </a>
                <a href="#cite" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">
                  How to cite it
                </a>
              </div>
            </div>
            <ObservatoryFiguresPanel figures={figures} />
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What it measures"
            title="Organized around the questions people ask, not the datasets behind them."
            body="Every section opens with the question it answers, and every figure on it carries a denominator, an as-of date, a source and a method."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {SECTIONS.map((section) => (
              <a
                key={section.href}
                href={section.href}
                className="group rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6 transition hover:border-cyan-300/40 hover:bg-white/[0.06]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/70">{section.title}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{section.question}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{section.body}</p>
                <p className="mt-4 text-sm font-semibold text-cyan-200">Open the section →</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Population and cadence" title="Measured over the whole corpus, not sampled from a survey." />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/70">Population</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Every resolving domain in the Datazag corpus, and the networks, prefixes and certificates it
                resolves to. A figure states which population it is computed over — resolving domains,
                mail-operating domains, announced prefixes — because a rate without its denominator is not
                a measurement.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/70">Cadence</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                The threat landscape is published daily from the previous complete day. The corpus
                statistics are re-measured on a stated cadence and each carries the date it describes,
                with the change since the previous measurement beside it.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/70">Source</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Datazag&apos;s own DNS, certificate and BGP collection, cross-referenced over time. Routing
                figures come from Datazag&apos;s own BGP feeds checked against public RPKI data, not from a
                third-party report.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why it is open"
            title="Evidence is more useful when other people can check it."
            body="The Observatory publishes measurements, definitions and methods. It does not argue. Analysts, journalists and researchers can quote any figure freely with attribution, download the data behind it, and follow every number to the page that defines it."
          />
        </div>
      </section>

      <section id="cite" className="relative border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="How to cite it"
            title="Name the source, the date and the population."
            body="Every figure on the Observatory has a Copy-figure control that produces a citation in this form, and a stable link that survives a rebuild."
          />
          <div className="mx-auto mt-12 max-w-3xl">
            <pre className="overflow-x-auto rounded-[1.5rem] border border-white/10 bg-[#050b22] p-6 text-sm leading-7 text-cyan-100">
              <code>{`Source: Datazag Observatory, ${citationDate}.
DMARC records at enforcement, resolving domains publishing DMARC.
${OBSERVATORY_URL}/mail#dmarc_enforced`}</code>
            </pre>
            <p className="mt-6 text-sm leading-6 text-slate-400">
              The statistics are also served as Parquet, so a figure can be checked rather than trusted:
            </p>
            <pre className="mt-3 overflow-x-auto rounded-[1.5rem] border border-white/10 bg-[#050b22] p-6 text-sm leading-7 text-cyan-100">
              <code>{`SELECT * FROM read_parquet('${OBSERVATORY_URL}/observatory_statistics.parquet');`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">Need this intelligence at domain level?</h2>
          <p className="mt-5 text-base leading-7 text-slate-300 md:text-lg md:leading-8">
            The Observatory publishes population-level figures. The per-domain answers are available as
            reports, alerts and cloud-native datasets.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="/datasets" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-cyan-300/50 bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
              Datasets
            </a>
            <a href="/how-it-works" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">
              How Datazag detects
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

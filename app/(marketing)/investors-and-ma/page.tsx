import type { Metadata } from "next";

import { FreeScopeForm } from "@/components/home/FreeScopeForm";
import { TrackedLink } from "@/components/home/TrackedLink";
import { BookCallLink } from "@/components/partners/PartnerClosing";
import { FoundingCard } from "@/components/pricing/FoundingCard";
import { CurrencyText } from "@/components/ui/CurrencyText";
import { PriceCurrencyControl } from "@/components/ui/PriceCurrencyControl";
import { withSrc } from "@/lib/booking";
import { PRICING, foundingOffer, offerPrice, portfolioBuyUrl, skuFor, startLink } from "@/lib/pricing";

// Investors and M&A (brief: founding offers, investor page and funnel, 14 Oct 2026, part B).
// For venture capital, private equity, M&A advisors and corporate development. Every price
// renders from the shared pricing config through lib/pricing.ts; none is typed here.

export const metadata: Metadata = {
  title: "Domain risk for portfolios and deals — Datazag",
  description:
    "Check the domain estate of a portfolio or an acquisition target. Free portfolio snapshot, deal-grade estate reports, no retention of your lists.",
  alternates: { canonical: "/investors-and-ma" },
};

// Re-rendered at least hourly, so the founding offer hides after its deadline without a deploy.
export const revalidate = 3600;

const SRC = "investors";

const primaryButton = "inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-200";
const secondaryButton = "inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-center text-sm font-semibold text-white transition hover:bg-white/[0.08]";
const textLink = "font-semibold text-cyan-200 underline-offset-4 hover:underline";

const JOBS = [
  {
    title: "Watch a portfolio",
    text: "For VCs and PE operating partners. See which portfolio companies leave their domains open to impersonation, which certificates are about to lapse, and which providers many of them share. Rerun every quarter to show what has been fixed.",
  },
  {
    title: "Check a deal",
    text: "For acquirers and their advisors. An acquirer inherits the whole estate, including the parts the target has forgotten. See what the target owns, how it is configured and which providers it depends on, before the deal closes.",
  },
];

// The wording of the insurer page's M&A section (cyber-risk-underwriting/copy.ts).
const FINDINGS = [
  { title: "The forgotten estate", text: "Domains the target owns but may no longer track, found through shared certificates, mail and registration records, each with a confidence level." },
  { title: "Inherited posture", text: "Whether email authentication, certificates and DNS controls are in place across the whole estate, not just the main domain." },
  { title: "Provider dependencies", text: "Which mail, DNS, hosting and CDN providers the estate relies on, and how much of it sits with each one." },
];

const CONFIDENTIAL = [
  { title: "No retention by default", text: "We do not keep the list of companies or domains you submit. You can opt in to keep it for reruns." },
  { title: "Targets cannot tell", text: "We read public records and our own observations. Nothing we do looks different from normal internet traffic." },
  { title: "Private querying for sensitive deals", text: "On request, we run the assessment on dedicated infrastructure, so Datazag never learns which companies you assess." },
  { title: "No contact with portfolio companies or targets", text: "Findings go only to you." },
];

const STEPS = [
  "A 20-minute call to agree the portfolio or the deal to assess.",
  "You send the company names or domains. We find the rest of each estate.",
  "You receive the reports, with evidence for every finding and a review call if you want one.",
];

const QUESTIONS = [
  { question: "What do you need from us?", answer: "A company name and its main website for each company. We discover the rest." },
  { question: "How fast is it?", answer: "Snapshots arrive in minutes. Estate reports arrive within the hour, or the same day for larger estates." },
  { question: "Is this a security rating?", answer: "No. Every finding shows the record it came from, so it can be raised with the company and checked." },
];

const PRICE_IDS = ["portfolio_25", "portfolio_50", "org_estate_10", "org_estate_50", "org_estate_250", "diligence", "monitoring"];

function SectionHeader({ eyebrow, title, body }: { eyebrow?: string; title: string; body?: string }) {
  return (
    <div className="mb-10 max-w-3xl">
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/70">{eyebrow}</p> : null}
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
      {body ? <p className="mt-4 text-base leading-7 text-slate-300">{body}</p> : null}
    </div>
  );
}

function Dot() {
  return <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />;
}

function SnapshotLink({ location }: { location: string }) {
  return (
    <TrackedLink href="#snapshot" event="hero_cta_click" params={{ page: SRC, cta: "portfolio_snapshot", location }} className={primaryButton}>
      Get a free portfolio snapshot
    </TrackedLink>
  );
}

function PriceRows() {
  const rows = PRICE_IDS.flatMap((id) => {
    const price = offerPrice(id);
    if (!price) return [];
    const sku = skuFor(id);
    return [{
      id,
      product: sku?.product ?? "Annual monitoring",
      scope: sku?.scope ?? `${PRICING.monitoring.cadence}, for any report above.`,
      delivery: sku?.delivery ?? "Every quarter",
      price,
      // Portfolio reports bought from here open in the investor edition.
      start: id.startsWith("portfolio_") ? { label: "Buy the report", href: portfolioBuyUrl(SRC, "investor") } : startLink(id, SRC),
    }];
  });
  return (
    <div className="overflow-x-auto rounded-[1.5rem] border border-white/10 bg-white/[0.035] px-5">
      <table className="w-full min-w-[640px] text-left">
        <thead>
          <tr className="border-b border-white/10 text-xs uppercase tracking-[0.16em] text-slate-500">
            <th className="py-3 pr-4 font-semibold">Report and scope</th>
            <th className="py-3 pr-4 font-semibold">Delivery</th>
            <th className="py-3 pr-4 font-semibold">Price</th>
            <th className="py-3" />
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-white/10 align-top last:border-b-0">
              <td className="py-4 pr-4">
                <p className="font-semibold text-white">{r.product}</p>
                <p className="mt-1 text-sm leading-6 text-slate-400">{r.scope}</p>
              </td>
              <td className="py-4 pr-4 text-sm text-slate-300">{r.delivery}</td>
              <td className="py-4 pr-4 text-lg font-semibold text-white"><CurrencyText value={r.price.value} />{r.price.suffix}</td>
              <td className="py-4 text-right">
                {r.start ? <a href={r.start.href} className="inline-flex min-h-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-4 text-sm font-semibold text-white transition hover:bg-white/[0.08]">{r.start.label}</a> : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function InvestorsAndMaPage() {
  const dealPass = foundingOffer("founding_investor");
  return (
    <main className="relative overflow-hidden bg-[#030619] text-white">
      {/* B1 · Hero */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(55,222,245,0.16),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(139,92,246,0.12),transparent_34%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/[0.1] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">Investors and M&amp;A</p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">See the domain risk in a portfolio or a deal, before it becomes yours.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              For venture capital, private equity, M&amp;A advisors and corporate development. We map each company&apos;s domains, email controls and providers from public records. You get the evidence, not a score.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <SnapshotLink location="hero" />
              <BookCallLink src={SRC} location="hero" className={secondaryButton} />
            </div>
          </div>
        </div>
      </section>

      {/* B2 · Two jobs */}
      <section className="relative border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          {JOBS.map((job) => (
            <article key={job.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <h3 className="text-2xl font-semibold tracking-tight text-white">{job.title}</h3>
              <p className="mt-4 text-base leading-7 text-slate-300">{job.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* B3 · Free portfolio snapshot: the Estate Scope form, "Our portfolio companies" chosen. */}
      <section id="snapshot" className="relative scroll-mt-24 border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:px-8">
          <div>
            <SectionHeader eyebrow="Free portfolio snapshot" title="Start with a free snapshot of your portfolio." body="Give us the primary domains of up to 25 companies. We grade each one and show the top issue for each company." />
            <p className="text-sm font-semibold text-white">Included</p>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-300">
              {["Email security for each primary domain.", "Certificate and registration status.", "One finding in full, with its evidence and fix."].map((x) => (
                <li key={x} className="flex gap-3"><Dot /><span>{x}</span></li>
              ))}
            </ul>
          </div>
          <div id="free-scope">
            <FreeScopeForm location={SRC} src={SRC} defaultPersona="pe_vc" />
          </div>
        </div>
      </section>

      {/* B4 · What a deal assessment finds */}
      <section className="relative border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Deal assessment" title="What a deal assessment finds." />
          <div className="grid gap-5 md:grid-cols-3">
            {FINDINGS.map((f) => (
              <article key={f.title} className="rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{f.text}</p>
              </article>
            ))}
          </div>
          <a href={withSrc("/reports/sample#cross-estate", SRC)} className={`mt-6 inline-block text-sm ${textLink}`}>See a sample estate report →</a>
        </div>
      </section>

      {/* B5 · Confidential by design */}
      <section className="relative border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Confidential by design" title="Your deal list stays yours." />
          <div className="grid gap-5 md:grid-cols-2">
            {CONFIDENTIAL.map((c) => (
              <article key={c.title} className="rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-base font-semibold text-white">{c.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{c.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* B6 · Prices, with the Deal Pass founding card first. */}
      <section id="prices" className="relative border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Prices" title="Reports for a portfolio or a deal." />
          <PriceCurrencyControl className="mb-6" />
          {dealPass ? <FoundingCard offer={dealPass} src={SRC} page={SRC} className="mb-6 lg:max-w-3xl" /> : null}
          <PriceRows />
        </div>
      </section>

      {/* B7 · What happens next, and B8 · Questions */}
      <section className="relative border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-2 lg:items-start lg:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 md:p-8">
            <h3 className="text-2xl font-semibold text-white">What happens next</h3>
            <ol className="mt-5 grid gap-4">
              {STEPS.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-xs font-semibold text-cyan-100">{index + 1}</span>
                  <span className="pt-1 text-sm leading-6 text-slate-300">{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <BookCallLink src={SRC} location="next_steps" />
              <SnapshotLink location="next_steps" />
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 md:p-8">
            <h3 className="text-2xl font-semibold text-white">Questions</h3>
            <dl className="mt-5 grid gap-5">
              {QUESTIONS.map((q) => (
                <div key={q.question}>
                  <dt className="text-sm font-semibold text-white">{q.question}</dt>
                  <dd className="mt-2 text-sm leading-6 text-slate-400">{q.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </main>
  );
}

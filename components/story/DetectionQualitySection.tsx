import Link from "next/link";

import { CASE_STUDY } from "@/app/(marketing)/intelligence/one-signal-150-domains/data";
import { DOMAINS_DISPLAY } from "@/lib/site-stats";

/**
 * Detection Quality section (WU27-A). Copy is LOCKED per the WU27 spec §2/§3 —
 * deviations need sign-off. In particular:
 *  - stage 02's corpus figure is imported from lib/site-stats (never a literal);
 *  - stage 04 keeps "over the full evidence" and "the same review, on every
 *    alert" (the AI adjudicates stages 1–3's output — no "AI-powered" phrasing);
 *  - NO rate, percentage or FP/FN number appears anywhere in this section —
 *    mechanism only, numbers return via WU27-C when measurable;
 *  - the FN line's concession ("the failure you never see") stays — it is what
 *    makes the pivot claim credible.
 *
 * Full variant: homepage, in the slot after the case-study teaser.
 * Condensed variant (chips row + dial paragraph): MSSP page.
 */

const STAGES = [
  {
    n: "01",
    label: "DNS profile match",
    line: "Does its DNS configuration match how the impersonated platform actually resolves — or how attackers stage it?",
  },
  {
    n: "02",
    label: "Infrastructure risk",
    line: `Where does it live? Hosting network, IP abuse history, certificate patterns — scored against ${DOMAINS_DISPLAY} domains of prior observation.`,
  },
  {
    n: "03",
    label: "Website check",
    line: "What's actually being served? Content and behavior, checked against the platform it claims to be.",
  },
  {
    n: "04",
    label: "AI analyst review",
    line: "A final adjudication pass over the full evidence before a high-confidence verdict — the same review, on every alert, at machine speed.",
  },
] as const;

const DIAL_PARAGRAPH =
  "Every alert ships with its confidence tier and the reasons behind the score — so you set the threshold. Block high-confidence automatically; route the rest to review. And because every verdict is explainable, every disagreement is auditable: you can see exactly why we flagged it, and tell us when we're wrong.";

function StageCard({ stage }: { stage: (typeof STAGES)[number] }) {
  return (
    <li className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm font-bold tracking-wide text-cyan-300">{stage.n}</span>
        <h3 className="text-base font-semibold text-white">{stage.label}</h3>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-400">{stage.line}</p>
    </li>
  );
}

export function DetectionQualitySection() {
  return (
    <section id="detection-quality" className="relative border-t border-white/10 py-20 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(55,222,245,0.09),transparent_32%),radial-gradient(circle_at_14%_78%,rgba(16,185,129,0.08),transparent_34%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Detection quality</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Every alert earns its confidence score.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            A suspicious domain doesn&rsquo;t become an alert because one signal fired. It has to
            survive four independent checks — each looking at evidence the others can&rsquo;t see.
          </p>
        </div>

        {/* Horizontal 4-chip row on desktop, vertical stepper at 375px (WU27-A §4). */}
        <ol className="mt-10 grid gap-3.5 md:grid-cols-2 xl:grid-cols-4">
          {STAGES.map((stage) => (
            <StageCard key={stage.n} stage={stage} />
          ))}
        </ol>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <p className="max-w-xl text-base leading-7 text-slate-300">{DIAL_PARAGRAPH}</p>
          <p className="max-w-xl border-l-2 border-emerald-300/40 pl-5 text-base leading-7 text-slate-400">
            Missed threats are the failure you never see — so we don&rsquo;t hunt domain by domain.
            One confirmed signal pivots to the entire hosting cluster, surfacing the domains no
            per-domain scanner would ever individually flag.{" "}
            <Link
              href={CASE_STUDY.path}
              className="font-semibold text-emerald-300 transition hover:text-emerald-200"
            >
              We found 150 that way from a single certificate →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

/** Condensed variant for the MSSP page: stages as a single row of four chips + the dial paragraph. */
export function DetectionQualityCondensed() {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Detection quality</p>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
        Every alert earns its confidence score.
      </h3>
      <ol className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {STAGES.map((stage) => (
          <li
            key={stage.n}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#030619]/50 px-4 py-3"
          >
            <span className="font-mono text-xs font-bold text-cyan-300">{stage.n}</span>
            <span className="text-sm font-semibold text-slate-200">{stage.label}</span>
          </li>
        ))}
      </ol>
      <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-400">{DIAL_PARAGRAPH}</p>
    </div>
  );
}

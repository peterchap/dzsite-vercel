import Link from "next/link";

import { CASE_STUDY } from "@/app/(marketing)/intelligence/one-signal-150-domains/data";
import { FP_STATUS } from "@/lib/fp-status";
import { DOMAINS_DISPLAY } from "@/lib/site-stats";

/**
 * Detection section (WU27-A), REWORDED 2026-09-28 with founder sign-off to the
 * site-wide false-positive framing in lib/fp-status.ts. What changed and why:
 *  - "Every alert earns its confidence score" / "high-confidence verdict" /
 *    "block high-confidence automatically" / "at machine speed" are gone: each
 *    implies a measured quality or latency we do not have (the FP rate is not
 *    re-measured since the guards went in).
 *  - Stage 04 was "AI analyst review". AI is not sold as a differentiator —
 *    everyone has it — so it is now "Final review", described by what it does.
 *  - The FN line no longer says "no per-domain scanner would ever" flag them.
 * Copy is still LOCKED against drift — deviations need sign-off. Original WU27 notes:
 *  - stage 02's corpus figure is imported from lib/site-stats (never a literal);
 *  - stage 04 keeps "over the full evidence" and "the same review, on every
 *    alert" (the AI adjudicates stages 1–3's output — no "AI-powered" phrasing);
 *  - NO rate, percentage or FP/FN number appears anywhere in this section —
 *    mechanism only, numbers return via WU27-C when measurable;
 *  - the FN line's concession ("the failure you never see") stays — it is what
 *    makes the pivot claim credible.
 *
 * Full variant: /alerts (moved off the homepage in WU-C9).
 * The condensed MSSP variant was REMOVED on 2026-09-28: /mssp-partners now sells
 * the corpus (components/partners/CorpusAdvantage.tsx), and detection claims
 * are held there until the false-positive measurement backs them.
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
    line: `Where does it live? Hosting network, IP abuse history, certificate patterns — checked against ${DOMAINS_DISPLAY} domains of prior observation.`,
  },
  {
    n: "03",
    label: "Website check",
    line: "What's actually being served? Content and behavior, checked against the platform it claims to be.",
  },
  {
    n: "04",
    label: "Final review",
    line: "A last pass over all the evidence from the first three checks before an alert is raised. The same review runs on every alert.",
  },
] as const;

const DIAL_PARAGRAPH =
  "Every alert lists what each check found. You set the threshold, and you decide what to block and what to review.";

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
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">How an alert is built</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Every alert shows its evidence.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            A suspicious domain does not become an alert because one signal fired. It has to pass
            four checks, each looking at different evidence.
          </p>
        </div>

        {/* Horizontal 4-chip row on desktop, vertical stepper at 375px (WU27-A §4). */}
        <ol className="mt-10 grid gap-3.5 md:grid-cols-2 xl:grid-cols-4">
          {STAGES.map((stage) => (
            <StageCard key={stage.n} stage={stage} />
          ))}
        </ol>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="max-w-xl">
            <p className="text-base leading-7 text-slate-300">{DIAL_PARAGRAPH}</p>
            <p className="mt-4 text-sm leading-6 text-slate-400">{FP_STATUS}</p>
          </div>
          <p className="max-w-xl border-l-2 border-emerald-300/40 pl-5 text-base leading-7 text-slate-400">
            Missed threats are the failure you never see — so we don&rsquo;t hunt domain by domain.
            One confirmed signal pivots to the whole hosting cluster, surfacing domains that a
            per-domain check would not flag on their own.{" "}
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

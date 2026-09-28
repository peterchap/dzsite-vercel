import Link from "next/link";

/**
 * Segment router (WU28-A §3.9): the ONLY per-segment presence on the homepage.
 * One section, four tiles, one line each — replaces the per-segment content
 * previously distributed through the page (MSSP economics, insurer framing,
 * ESP pitches live on their dedicated pages).
 */

//
// 2026-09-25 (intelligence repositioning): ordered Email / Insurers / MSSPs per the
// brief, and each line now sells intelligence rather than detection. "Earlier alerts"
// came off the MSSP tile — it is a lead-time claim, gated like the hero's. The insurer
// line says exposure, not scoring: calibrated risk scores are gated on SCORE-1.
//
// 2026-09-28: each tile names the intelligence line its page leads with — email,
// risk, threat — and Enterprise gets all three as data. Keep these in step with
// the page eyebrows (esp-partners, cyber-risk-underwriting, mssp-partners copy.ts).
const SEGMENTS = [
  {
    title: "Email",
    pillar: "Email intelligence",
    line: "Know which domains can take mail, who runs it, and which are parked.",
    href: "/esp-partners",
  },
  {
    title: "Insurers",
    pillar: "Risk intelligence",
    line: "External exposure and provider concentration, for underwriting and portfolio monitoring.",
    href: "/cyber-risk-underwriting",
  },
  {
    title: "MSSPs",
    pillar: "Threat intelligence",
    line: "Threat alerts, brand protection and email security reviews you can offer across your client base.",
    href: "/mssp-partners",
  },
  {
    // WU-C7: /enterprise is deferred and still a skeleton, so the largest buyer
    // segment is routed to the page that actually makes the argument. The
    // skeleton is noindexed meanwhile (app/(marketing)/[...slug]/page.tsx).
    // Point this back at /enterprise when that page ships. (Linked direct to
    // /infrastructure-intelligence: /domain-intelligence only redirects there.)
    title: "Enterprise",
    pillar: "All three, as data",
    line: "Threat, email and risk intelligence in your own warehouse.",
    href: "/infrastructure-intelligence",
  },
] as const;

export function SegmentRouter() {
  return (
    <section className="relative border-t border-white/10 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Who it&rsquo;s for</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            One intelligence layer. Start where you work.
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {SEGMENTS.map((segment) => (
            <Link
              key={segment.title}
              href={segment.href}
              className="group rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-cyan-300/30 hover:bg-white/[0.06]"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-200/70">{segment.pillar}</p>
              <h3 className="mt-2 text-lg font-semibold text-white">{segment.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{segment.line}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-200">
                Explore
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

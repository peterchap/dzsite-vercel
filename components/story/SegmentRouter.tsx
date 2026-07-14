import Link from "next/link";

/**
 * Segment router (WU28-A §3.9): the ONLY per-segment presence on the homepage.
 * One section, four tiles, one line each — replaces the per-segment content
 * previously distributed through the page (MSSP economics, insurer framing,
 * ESP pitches live on their dedicated pages).
 */

const SEGMENTS = [
  {
    title: "MSSPs",
    line: "White-label investigations and earlier alerts across your whole client base.",
    href: "/mssp-partners",
  },
  {
    title: "Insurers",
    line: "External infrastructure signal for underwriting and portfolio monitoring.",
    href: "/cyber-risk-underwriting",
  },
  {
    title: "ESPs",
    line: "Safer sending and onboarding decisions from infrastructure intelligence.",
    href: "/esp-partners",
  },
  {
    title: "Enterprise",
    line: "Scored, explainable intelligence delivered into the stack you already run.",
    href: "/enterprise",
  },
] as const;

export function SegmentRouter() {
  return (
    <section className="relative border-t border-white/10 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Who it&rsquo;s for</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            One intelligence layer. Four ways in.
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {SEGMENTS.map((segment) => (
            <Link
              key={segment.title}
              href={segment.href}
              className="group rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-cyan-300/30 hover:bg-white/[0.06]"
            >
              <h3 className="text-lg font-semibold text-white">{segment.title}</h3>
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

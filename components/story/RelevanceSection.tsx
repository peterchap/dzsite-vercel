import { DOMAINS_DISPLAY } from "@/lib/site-stats";

/**
 * Step 2 of the enterprise journey (WU28-A §3.3): "We identify what's relevant
 * to YOUR organisation." How a customer's protected platforms, brands and
 * keywords scope the graph into their watchlist. One diagram, house tokens.
 */

const SCOPE_INPUTS = [
  {
    title: "Platforms you operate",
    text: "The SaaS, cloud and payment platforms your business runs on — the infrastructure attackers imitate to reach your people.",
  },
  {
    title: "Brands you own",
    text: "Your names, product marks and domains — the strings attackers register against, character-swap and wrap in certificates.",
  },
  {
    title: "Keywords you protect",
    text: "Campaign terms, executive names, product launches — the language your attackers borrow before they send anything.",
  },
] as const;

const WATCHLIST_TRAITS = ["Scored", "Reason codes", "Confidence tiers", "Deduplicated"] as const;

export function RelevanceSection() {
  return (
    <section className="relative border-t border-white/10 py-20 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_22%,rgba(55,222,245,0.09),transparent_32%),radial-gradient(circle_at_84%_74%,rgba(139,92,246,0.08),transparent_34%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Your slice of the graph</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">
            {DOMAINS_DISPLAY} domains. You care about the ones aimed at you.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            You tell us what you operate, own and protect. That scope carves the full infrastructure
            graph down to the domains, certificates and networks being built against your
            organisation — and what comes out is a watchlist, not a firehose.
          </p>
        </div>

        {/* The one diagram: three scoping inputs → the graph → your watchlist. */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_auto_0.8fr] lg:items-center">
          <div className="grid gap-3.5 sm:grid-cols-3">
            {SCOPE_INPUTS.map((input) => (
              <div key={input.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-base font-semibold text-white">{input.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{input.text}</p>
              </div>
            ))}
          </div>

          <div className="hidden items-center lg:flex" aria-hidden>
            <span className="h-px w-10 bg-cyan-300/40" />
            <span className="text-cyan-300/70">→</span>
          </div>

          <div className="rounded-2xl border border-cyan-300/25 bg-cyan-300/[0.07] p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-200/80">Out the other side</p>
            <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
              Your watchlist — the infrastructure targeting you.
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {WATCHLIST_TRAITS.map((trait) => (
                <span
                  key={trait}
                  className="rounded-full border border-white/10 bg-[#030619]/50 px-3 py-1 text-xs font-semibold text-slate-200"
                >
                  {trait}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Every entry arrives scored and explained, so it can be triaged, blocked or escalated
              without a human re-deriving why it matters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";

/**
 * Step 4 of the enterprise journey (WU28-A §3.7): "Benchmark us against your
 * existing feeds before you buy."
 *
 * ────────────────────────────────────────────────────────────────────────────
 * GATED OFF — DO NOT MOUNT until BOTH gates clear (WU28-B §4 / WU28-C §4):
 *  1. "Run it with us" requires the WU27-C dress rehearsal: the corroboration
 *     join run internally over ≥1 full window and the win-rate/lead-time
 *     distribution reviewed by founders. Publishing a public "measure us"
 *     challenge before knowing the numbers is prohibited.
 *  2. "Run it yourself" requires the marketplace listing URL to exist
 *     (set MARKETPLACE_LISTING_URL below).
 * The section may ship with only the self-serve button once gate 2 clears;
 * never mount with a dead CTA. To mount: import into StoryPage between the
 * delivery section and the ticker.
 * ────────────────────────────────────────────────────────────────────────────
 */

// Set when the Snowflake/Databricks listing goes live (gate 2).
const MARKETPLACE_LISTING_URL: string | null = null;

export function BenchmarkSection({ withUsLive = false }: { withUsLive?: boolean }) {
  const selfServeLive = Boolean(MARKETPLACE_LISTING_URL);
  if (!selfServeLive && !withUsLive) return null; // never a dead CTA

  return (
    <section className="relative border-t border-white/10 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Before you buy</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Benchmark us against your existing feeds.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            The meeting ends with evidence, not a demonstration.
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {selfServeLive ? (
            <a
              href={MARKETPLACE_LISTING_URL!}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-cyan-300/50 bg-cyan-300 px-6 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Run it yourself on Snowflake or Databricks
            </a>
          ) : null}
          {withUsLive ? (
            <Link
              href="/benchmark"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Run it with us
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

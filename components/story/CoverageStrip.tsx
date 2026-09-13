import { asOfLabel } from "@/lib/live-activity-guard";
import { publishedStats, statsAsOfLabel } from "@/lib/site-stats";

/**
 * COVERAGE — how much of the internet Datazag actually observes.
 *
 * This is a buyer's qualifying question, asked early and answered with a number:
 * can you see enough of the internet for your claims to mean anything? A vendor
 * that cannot answer it is not yet in the evaluation. So the figures belong on
 * the homepage, next to the argument they underwrite — the hero claims one
 * signal reached 150 domains, and this is the corpus that made that possible.
 *
 * WHAT THIS IS NOT. WU-C9 moved the "internet right now" panel — certificates
 * observed, new domains, routing changes in the last hour — off the homepage to
 * the Observatory, and that stays moved. The two are different things wearing
 * similar clothes:
 *
 *   COVERAGE is a standing fact about scale. It answers "do you see enough?",
 *   changes slowly, and is the thing a buyer needs before anything else lands.
 *
 *   LIVE ACTIVITY is a demonstration. It answers "is it running right now?",
 *   changes hourly, and is exactly what the Observatory exists to own under the
 *   settled content split.
 *
 * The brief's other reason for moving the counters — that they were one of six
 * conflicting corpus figures in circulation — no longer applies. There is one
 * source now (the R2 feed), every figure carries its definition, and a guard
 * fails the build on a hand-typed one.
 *
 * Every figure here renders its own definition and its own measured-at. A number
 * without its population is a guess with a comma in it, and a buyer checking
 * coverage is precisely the reader who will notice.
 *
 * publishedStats() returns only figures the feed supplied, so a figure the
 * producer could not give us is absent rather than stale — and if none are
 * publishable, the whole section renders nothing.
 */
export function CoverageStrip() {
  const stats = publishedStats();
  if (stats.length === 0) return null;

  const measured = statsAsOfLabel();

  return (
    <section className="relative border-t border-white/10 py-16 md:py-20">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Coverage</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            The graph behind that answer.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
            Finding the other 149 domains means already holding the ones they connect to.
            This is what Datazag observes, and what each figure counts.
          </p>
        </div>

        <dl className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.key}
              className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.055] p-5"
            >
              <dd className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {stat.display}
              </dd>
              <dt className="mt-3 border-t border-white/10 pt-3 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-100/85">
                {stat.label}
              </dt>
              {/* The population, not a tagline. WU-C3: the definition travels
                  with the value, from one place, so no two surfaces can
                  describe the same number differently. */}
              <p className="mt-3 text-xs leading-5 text-slate-400">{stat.definition}</p>
              {asOfLabel(stat.measuredAt) ? (
                <p className="mt-3 text-[11px] text-slate-500">
                  Measured {asOfLabel(stat.measuredAt)}
                </p>
              ) : null}
            </div>
          ))}
        </dl>

        <p className="mt-6 text-sm leading-6 text-slate-400">
          {measured ? <>Coverage measured {measured}. </> : null}
          What the internet is doing <em>right now</em> — certificates, newly observed
          domains, routing changes —{" "}
          <a
            href="https://observatory.datazag.com"
            className="font-semibold text-cyan-200 underline-offset-4 hover:underline"
          >
            lives in the Observatory
          </a>
          .
        </p>
      </div>
    </section>
  );
}

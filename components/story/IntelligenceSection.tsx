import { loadIntelligenceFigures, OBSERVATORY_URL, type CountFigure } from "@/lib/observatory-figures";

/**
 * INTELLIGENCE, NOT JUST DATA — the homepage's proof band (2026-09-25 brief).
 *
 * The coverage strip above answers "do you see enough?". This answers "so
 * what?": the same corpus, read. Three findings, each a measured Observatory
 * statistic loaded at build (lib/observatory-figures), each linked to the
 * page that states its method and caveats. No figure here is typed.
 *
 * WHAT IS HELD, AND WHY (do not add these here without the evidence):
 *   - Threat-detection / impersonation-alert claims. The false-positive rate
 *     has not been re-measured since the guards went in.
 *   - Calibrated risk-score claims. Gated on SCORE-1; frame as exposure.
 *   - Named systemic findings still under coordinated disclosure. The
 *     capability is described generically below; a named case waits until
 *     the disclosure concludes and is written up.
 *
 * If the Observatory cannot be read, the figure cards drop out and the
 * capability row still renders — the section never shows an invented number.
 */

const CAPABILITIES = [
  {
    title: "Classify",
    text: "Each domain carries labels a machine can act on: can it take mail, is it parked, who runs its mail, which network hosts it.",
  },
  {
    title: "Connect",
    text: "Domains, certificates, IPs and networks are linked. One record leads to the rest.",
  },
  {
    title: "Track change",
    text: "We measure every day. You see what changed, not only what exists.",
  },
  {
    title: "Show the method",
    text: "Every published figure states what it counts, when it was measured and how.",
  },
] as const;

// `topic` names the figure, so each link has a distinct accessible name (several
// "Method and caveats" links on one page point at different Observatory cards).
function Source({ figure, topic }: { figure: CountFigure; topic: string }) {
  return (
    <a
      href={figure.href}
      aria-label={`Method and caveats: ${topic}`}
      className="mt-4 inline-flex text-xs font-semibold text-cyan-200 underline-offset-4 hover:underline"
    >
      Method and caveats →
    </a>
  );
}

export async function IntelligenceSection() {
  const figures = await loadIntelligenceFigures();
  const measured = figures?.asOf ?? null;

  return (
    <section id="intelligence" className="relative border-t border-white/10 py-16 md:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">
            Intelligence, not just data
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Records say what exists. We say what it means.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            A list of domains is data. Knowing which ones matter is intelligence. Here is what our
            data shows once it is read. Every figure is measured, dated and linked to its method.
          </p>
        </div>

        {figures ? (
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {figures.certificateOnly ? (
              <article className="flex flex-col rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.055] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/85">
                  See what lists miss
                </p>
                <p className="mt-4 text-4xl font-semibold tracking-tight text-white">
                  {figures.certificateOnly.value}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  domains that no zone file we receive lists. We found them through certificate
                  transparency.
                </p>
                <p className="mt-3 text-xs leading-5 text-slate-400">
                  Zone files are the usual way to list domains. They are not enough.
                </p>
                <div className="mt-auto">
                  <Source figure={figures.certificateOnly} topic="domains seen only in certificates" />
                </div>
              </article>
            ) : null}

            {figures.mailFunnel ? (
              <article className="flex flex-col rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.055] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/85">
                  Know who can take mail
                </p>
                <dl className="mt-4 grid gap-3">
                  {[
                    "publish a mail (MX) record",
                    "can actually receive mail",
                    "can receive mail and are not parked",
                  ].map((label, i) => (
                    // dt before dd in the markup (a <dl> requirement); order-first keeps
                    // the value on the left.
                    <div key={label} className="flex items-baseline gap-3">
                      <dt className="text-sm leading-6 text-slate-300">{label}</dt>
                      <dd
                        className={`order-first w-28 shrink-0 font-semibold tabular-nums tracking-tight ${
                          i === 2 ? "text-3xl text-white" : "text-2xl text-slate-200"
                        }`}
                      >
                        {figures.mailFunnel![i].value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-xs leading-5 text-slate-400">
                  A domain with an MX record is not a mailbox. We classify each one.
                </p>
                <div className="mt-auto">
                  <Source figure={figures.mailFunnel[2]} topic="domains that can receive mail" />
                </div>
              </article>
            ) : null}

            {figures.concentration ? (
              <article className="flex flex-col rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.055] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/85">
                  See where risk concentrates
                </p>
                <p className="mt-4 text-4xl font-semibold tracking-tight text-white">
                  {figures.concentration.half.value}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  networks carry half of all domains that sit on a network.{" "}
                  {figures.concentration.ninety.value} carry nine in ten. A problem at one of them
                  reaches a large share of the internet.
                </p>
                <p className="mt-3 text-xs leading-5 text-slate-400">
                  Out of {figures.concentration.half.population ?? "the networks observed"}.
                </p>
                <div className="mt-auto">
                  <Source figure={figures.concentration.half} topic="network concentration" />
                </div>
              </article>
            ) : null}
          </div>
        ) : null}

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {CAPABILITIES.map((c) => (
            <div key={c.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <h3 className="text-base font-semibold text-white">{c.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{c.text}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm leading-6 text-slate-400">
          {measured ? <>Figures as of {measured}. </> : null}
          We publish findings like these at internet scale, with the numbers to check them, in{" "}
          <a href={OBSERVATORY_URL} className="font-semibold text-cyan-200 underline-offset-4 hover:underline">
            the Observatory
          </a>
          .
        </p>
      </div>
    </section>
  );
}

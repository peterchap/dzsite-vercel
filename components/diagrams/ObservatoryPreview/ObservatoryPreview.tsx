import { loadObservatoryFigures, OBSERVATORY_URL, type ObservatoryFigures } from "@/lib/observatory-figures";

/**
 * The homepage's Observatory section.
 *
 * THE MOCKUP IS GONE. The right-hand panel used to be a simulated pivot
 * builder — a search box reading "microsoft", counters at 412 / 83 / 17,
 * "Snapshot 06:00 UTC", bars and a timeline drawn from literals. It was a
 * picture of something that genuinely exists one subdomain away, and it
 * did not link there: the section's CTAs went to /how-it-works and the
 * free report. Now the panel shows figures read from the Observatory's own
 * published statistics, each dated and each linking to the page that
 * defines it, and the CTAs go to the Observatory and to the page on this
 * site that describes it.
 *
 * A server component: the figures are fetched at build and revalidated
 * daily (lib/observatory-figures). If they cannot be read, the panel keeps
 * its links and shows no numbers — never an invented one.
 */
export async function ObservatoryPreview() {
  const figures = await loadObservatoryFigures();

  return (
    <section className="relative border-t border-white/10 py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(55,222,245,0.12),transparent_32%),radial-gradient(circle_at_78%_72%,rgba(139,92,246,0.12),transparent_34%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Datazag Observatory</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">The internet, measured daily.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Open statistics from Datazag&apos;s continuously updated internet graph: email authentication,
              routing hygiene, hosting concentration, domain parking and impersonation. Explore, compare,
              visualize and cite — every figure carries its date and population.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {/* WU-C10: this block describes searching, comparing and citing, so the
                  CTA goes to the Observatory that does it — via OBSERVATORY_URL rather
                  than a second copy of the host name. */}
              <a href={OBSERVATORY_URL} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-cyan-300/50 bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
                Open the Observatory
              </a>
              <a href="/observatory" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">
                What it measures, and how to cite it
              </a>
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-400">
              The same graph mapped 150 domains from a single signal:{" "}
              <a href="/intelligence/one-signal-150-domains" className="font-semibold text-cyan-200 underline-offset-4 hover:underline">
                read the investigation →
              </a>
            </p>
          </div>

          <ObservatoryFiguresPanel figures={figures} />
        </div>
      </div>
    </section>
  );
}

/**
 * The figures, as a panel. Shared with /observatory so the two surfaces
 * cannot show different numbers for the same thing.
 */
export function ObservatoryFiguresPanel({ figures }: { figures: ObservatoryFigures | null }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#07102b]/85 p-4 shadow-2xl shadow-black/25 md:p-5">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:44px_44px] opacity-35" />
      <div className="relative rounded-[1.5rem] border border-white/10 bg-[#030619]/75">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/70">Live from the Observatory</p>
          {figures?.asOf ? <p className="text-xs text-slate-400">Data as of {figures.asOf}</p> : null}
        </div>

        {figures ? (
          <div className="grid gap-4 p-4 md:grid-cols-2">
            {figures.figures.map((figure) => (
              <a
                key={figure.id}
                href={figure.href}
                className="group rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-cyan-300/40 hover:bg-white/[0.06]"
              >
                <p className="text-3xl font-semibold text-white">{figure.value}</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">{figure.label}</p>
                <p className="mt-2 text-xs text-slate-500">
                  {figure.population ? `${figure.population} · ` : ""}
                  {figure.asOf ? `as of ${figure.asOf}` : ""}
                </p>
                <p className="mt-2 text-xs font-semibold text-cyan-200 opacity-0 transition group-hover:opacity-100">
                  Method and denominator →
                </p>
              </a>
            ))}
          </div>
        ) : (
          <div className="p-6 text-sm leading-6 text-slate-400">
            The Observatory publishes every figure with its date, population and method.{" "}
            <a href={OBSERVATORY_URL} className="font-semibold text-cyan-200 underline-offset-4 hover:underline">
              Open it →
            </a>
          </div>
        )}

        <div className="border-t border-white/10 px-4 py-3 text-xs text-slate-500">
          Free to quote with attribution. Each figure links to its definition.
        </div>
      </div>
    </div>
  );
}

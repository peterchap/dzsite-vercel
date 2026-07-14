const datasets = ["Domains", "DNS", "Certificates", "Routing", "Platforms"];
const pivots = ["Provider", "ASN", "Platform", "TLD", "Risk"];
const activityRows = [
  { label: "New domains", value: "412", note: "last hour" },
  { label: "Alert candidates", value: "83", note: "scored" },
  { label: "Routing changes", value: "17", note: "snapshot" },
];

export function ObservatoryPreview() {
  return (
    <section className="relative border-t border-white/10 py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(55,222,245,0.12),transparent_32%),radial-gradient(circle_at_78%_72%,rgba(139,92,246,0.12),transparent_34%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Datazag Observatory</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">Explore the relationships behind the internet.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Search, pivot, visualise and download aggregated infrastructure intelligence from Datazag's continuously updated internet graph.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/how-it-works" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-cyan-300/50 bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
                See how it works
              </a>
              <a href="/#free-report" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">
                Analyse your domain
              </a>
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-400">
              The same pivot builder mapped 150 domains from a single signal:{" "}
              <a href="/intelligence/one-signal-150-domains" className="font-semibold text-cyan-200 underline-offset-4 hover:underline">
                read the investigation →
              </a>
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#07102b]/85 p-4 shadow-2xl shadow-black/25 md:p-5">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:44px_44px] opacity-35" />
            <div className="relative rounded-[1.5rem] border border-white/10 bg-[#030619]/75">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-300/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/70" />
                </div>
                <p className="text-xs text-slate-400">Snapshot 06:00 UTC</p>
              </div>

              <div className="grid gap-4 p-4 lg:grid-cols-[0.7fr_1.3fr]">
                <aside className="grid gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/70">Search</p>
                    <div className="mt-3 rounded-xl border border-cyan-300/20 bg-cyan-300/[0.06] px-3 py-2 text-sm text-slate-200">microsoft</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/70">Datasets</p>
                    <div className="mt-3 grid gap-2">
                      {datasets.map((item) => (
                        <div key={item} className="flex items-center justify-between rounded-xl border border-white/10 bg-[#030619]/50 px-3 py-2 text-xs text-slate-300">
                          <span>{item}</span>
                          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                        </div>
                      ))}
                    </div>
                  </div>
                </aside>

                <div className="grid gap-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    {activityRows.map((row) => (
                      <div key={row.label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                        <p className="text-2xl font-semibold text-white">{row.value}</p>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">{row.label}</p>
                        <p className="mt-1 text-xs text-slate-500">{row.note}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/70">Pivot builder</p>
                      <p className="text-xs text-slate-500">Preview</p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {pivots.map((pivot) => (
                        <span key={pivot} className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs text-slate-300">{pivot}</span>
                      ))}
                    </div>
                    <div className="mt-5 grid gap-2">
                      {[84, 68, 52, 37].map((width, index) => (
                        <div key={width} className="grid grid-cols-[6rem_1fr] items-center gap-3 text-xs text-slate-400">
                          <span>{["Cloudflare", "Microsoft", "Google", "Amazon"][index]}</span>
                          <div className="h-2 rounded-full bg-white/[0.06]">
                            <div className="h-2 rounded-full bg-cyan-300/70" style={{ width: `${width}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/70">Timeline</p>
                      <div className="mt-4 flex h-24 items-end gap-2">
                        {[28, 44, 35, 60, 42, 72, 54, 80].map((height) => (
                          <span key={height} className="flex-1 rounded-t bg-cyan-300/45" style={{ height: `${height}%` }} />
                        ))}
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/70">Graph</p>
                      <div className="relative mt-4 h-24 overflow-hidden rounded-xl border border-white/10 bg-[#030619]/50">
                        <span className="absolute left-[18%] top-[42%] h-3 w-3 rounded-full bg-cyan-300" />
                        <span className="absolute left-[44%] top-[22%] h-2.5 w-2.5 rounded-full bg-violet-300" />
                        <span className="absolute left-[70%] top-[58%] h-3 w-3 rounded-full bg-emerald-300" />
                        <span className="absolute left-[30%] top-[68%] h-2 w-2 rounded-full bg-amber-300" />
                        <span className="absolute left-[20%] right-[30%] top-[49%] h-px rotate-[-12deg] bg-cyan-300/35" />
                        <span className="absolute left-[45%] right-[18%] top-[43%] h-px rotate-[18deg] bg-cyan-300/35" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

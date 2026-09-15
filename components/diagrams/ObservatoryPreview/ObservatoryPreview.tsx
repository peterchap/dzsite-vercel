import { ACTIVITY_MAX_AGE_HOURS, asOfLabel, publishableFigures } from "@/lib/live-activity-guard";
import { fetchStatsFeed } from "@/lib/stats-feed";

const datasets = ["Domains", "DNS", "Certificates", "Routing", "Platforms"];
const pivots = ["Provider", "ASN", "Platform", "TLD", "Risk"];

type ActivityFeed = {
  certificates?: number | null;
  new_domains?: number | null;
  routing_changes?: number | null;
  window?: string;
  as_of?: Record<string, string | null>;
  definitions?: Record<string, string>;
};

type StatusFeed = {
  graph_updated?: string | null;
};

// The activity rows are live figures from activity.json. They used to be typed
// here — "412 new domains / last hour", "83 alert candidates / scored",
// "17 routing changes", "Snapshot 06:00 UTC" — invented numbers under
// live-sounding notes, on the homepage. Each row now renders only when its own
// figure is valid and inside the hourly budget; a figure that fails is absent,
// never a stand-in, and if none survive the strip is not rendered at all.
//
// `alerts` is deliberately not offered. It is brand + platform impersonation
// candidates, and platform impersonations are dominated by legitimate cloud
// domains — see ACTIVITY_DEFINITIONS in riskscore/orchestration/website_stats.py.
// `san_domains` is marked UNVERIFIED by the producer and is not offered either.
const ACTIVITY_ROWS = [
  { key: "certificates", label: "Certificates observed" },
  { key: "new_domains", label: "New domains" },
  { key: "routing_changes", label: "Routing changes" },
] as const;

// Literal class strings so Tailwind keeps them; the grid follows the rows that survive.
const ROW_GRID = ["", "", "md:grid-cols-2", "md:grid-cols-3"] as const;

function formatCompact(value: number): string {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(value >= 100_000_000 ? 0 : 1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(value >= 10_000 ? 0 : 1)}k`;
  return value.toLocaleString("en-US");
}

export async function ObservatoryPreview() {
  const [activity, status] = await Promise.all([
    fetchStatsFeed<ActivityFeed>("activity.json"),
    fetchStatsFeed<StatusFeed>("status.json"),
  ]);

  // The producer's own definition travels with each figure (as a tooltip), so
  // the population a number describes is never retyped here.
  const rows = publishableFigures(
    ACTIVITY_ROWS.map((row) => ({
      ...row,
      value: activity?.[row.key],
      asOf: activity?.as_of?.[row.key],
      definition: activity?.definitions?.[row.key],
    })),
    ACTIVITY_MAX_AGE_HOURS,
  );
  const windowLabel = activity?.window ? `Last ${activity.window} · ` : "";

  // An absolute build time, not status.snapshot: that field reads "00:00 UTC"
  // for a genuine midnight build, which the placeholder guard (rightly) blanks.
  const graphBuilt = asOfLabel(status?.graph_updated);

  return (
    <section className="relative border-t border-white/10 py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(55,222,245,0.12),transparent_32%),radial-gradient(circle_at_78%_72%,rgba(139,92,246,0.12),transparent_34%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Datazag Observatory</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">Explore the relationships behind the internet.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Search, pivot, visualize and download aggregated infrastructure intelligence from Datazag's continuously updated internet graph.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {/* WU-C10: this block promises search, pivot, visualize and download —
                  send visitors to the Observatory that actually does it, not to
                  /how-it-works. */}
              <a
                href="https://observatory.datazag.com"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-cyan-300/50 bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                Open the Observatory
              </a>
              <a href="/#free-report" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">
                Analyze your domain
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
                {graphBuilt ? <p className="text-xs text-slate-400">Graph built {graphBuilt}</p> : null}
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
                  {rows.length > 0 ? (
                    <div className={`grid gap-4 ${ROW_GRID[rows.length]}`}>
                      {rows.map((row) => (
                        <div key={row.key} title={row.definition} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                          <p className="text-2xl font-semibold text-white">{formatCompact(row.value)}</p>
                          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">{row.label}</p>
                          <p className="mt-1 text-xs text-slate-500">{windowLabel}as of {asOfLabel(row.asOf)}</p>
                        </div>
                      ))}
                    </div>
                  ) : null}

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

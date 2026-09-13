import {
  asOfLabel,
  isActivityPanelRenderable,
  isStale,
  safeSnapshotLabel,
} from "@/lib/live-activity-guard";
import { PUBLISHED_STATS } from "@/lib/site-stats";

// activity.json also carries `alerts` (brand + platform impersonation counts).
// It is deliberately not surfaced: platform impersonations are dominated by
// legitimate cloud domains, so the total is not a usable alert figure. The
// producer now ships that reasoning as a definition inside the file itself
// (ACTIVITY_DEFINITIONS in riskscore/orchestration/website_stats.py), so the
// field cannot be picked up by another surface without it.
type ActivitySnapshot = {
  certificates?: number | null;
  new_domains?: number | null;
  san_domains?: number | null;
  routing_changes?: number | null;
  window?: string;
  updated?: string;
  /** Per-figure as-of. `updated` is when the FILE was built, not when any
   *  figure was measured — see live-activity-guard's as-of section. */
  as_of?: Record<string, string | null>;
};

// How old an hourly figure may be before it stops being a live figure. Three
// hours: enough slack for a late run, short enough that a stalled certstream
// blob disappears from the page instead of being republished under a fresh
// timestamp. Measured 2026-08-22, the blob was 3.7h stale while activity.json
// carried an `updated` of "now" — this is the case that budget catches.
const ACTIVITY_MAX_AGE_HOURS = 3;

type StatusSnapshot = {
  certstream?: string;
  dns?: string;
  scores?: string;
  graph_updated?: string;
  snapshot?: string;
  updated?: string;
};

// The fallback is now ALL NULL on purpose. It used to carry hard-coded figures
// (412 new domains, 17 routing changes) stamped 2026-06-28, so a failed fetch
// rendered two-month-old invented numbers under a "Last 1h" heading. A fallback
// for a LIVE panel can only honestly be "we do not know" — the nulls fail
// isActivityPanelRenderable and the panel hides, which is the designed
// behaviour. The static corpus tiles above it are unaffected.
const fallbackActivity: Required<ActivitySnapshot> = {
  certificates: null,
  new_domains: null,
  san_domains: null,
  routing_changes: null,
  window: "1h",
  updated: "",
  as_of: {},
};

const fallbackStatus: Required<StatusSnapshot> = {
  certstream: "live",
  dns: "live",
  scores: "live",
  graph_updated: "2026-06-28T06:12:00+00:00",
  snapshot: "06:00 UTC",
  updated: "2026-06-28T11:03:00+00:00",
};

async function fetchJson<T>(baseUrl: string | undefined, path: string, fallback: T): Promise<T> {
  if (!baseUrl) return fallback;

  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/${path}`, {
      next: { revalidate: 900 },
    });

    if (!response.ok) return fallback;
    return { ...fallback, ...(await response.json()) };
  } catch {
    return fallback;
  }
}

function formatCompact(value: number | null | undefined, suffix = "") {
  if (value === null || value === undefined) return "—";
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B${suffix}`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(value >= 100_000_000 ? 0 : 1)}M${suffix}`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(value >= 10_000 ? 0 : 1)}k${suffix}`;
  return `${value.toLocaleString()}${suffix}`;
}

function formatUpdatedLabel(value?: string) {
  if (!value) return "Updated hourly";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Updated hourly";
  return `Updated ${date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" })} UTC`;
}

export async function LiveInternetIntelligence() {
  const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_STATS_URL;
  const [activity, status] = await Promise.all([
    fetchJson<ActivitySnapshot>(baseUrl, "activity.json", fallbackActivity),
    fetchJson<StatusSnapshot>(baseUrl, "status.json", fallbackStatus),
  ]);

  // WU26: coverage tiles come from the canonical site-stats module (refreshed
  // from CertaLake at build time) so the corpus figures here are literally the
  // same strings as everywhere else on the site — no separate runtime fetch.
  // Every tile carries its OWN as-of. The four coverage tiles are daily and the
  // activity tiles hourly; before this they shared one "Updated HH:MM UTC" chip
  // that belonged to the hourly panel, so a total measured 13 hours earlier read
  // as live. `asOf` renders under the label; a tile with no as-of says so rather
  // than inheriting a neighbour's.
  // WU-C3: label, value, definition and measured-at all travel together from
  // lib/site-stats. These four `detail` sentences used to be typed here — the
  // only place on the site where a figure's population was written down at all,
  // and a copy that could drift from the number it described without anything
  // noticing. The definition now belongs to the figure.
  const coverageMetrics = (
    ["domainsMonitored", "ipsHostingDomains", "ipv4Indexed", "networksProfiled"] as const
  ).map((key) => {
    const stat = PUBLISHED_STATS[key];
    return {
      value: stat.display,
      label: stat.label,
      asOf: asOfLabel(stat.measuredAt),
      detail: stat.definition,
    };
  });

  // "Certificates observed" is the RAW CertStream firehose for the window —
  // every certificate CT logged, matched or not. It is legitimately larger than
  // the corpus certificate total (a filtered retention set), and rendered
  // without saying so the pair reads as broken. The label now says which one
  // this is; see ACTIVITY_DEFINITIONS in the producer for the canonical wording.
  const activityMetrics = [
    { value: formatCompact(activity.certificates), label: "Certificates observed", asOf: asOfLabel(activity.as_of?.certificates), detail: "Every certificate logged to public Certificate Transparency in the window, whether or not it matches tracked infrastructure." },
    { value: formatCompact(activity.new_domains), label: "New domains", asOf: asOfLabel(activity.as_of?.new_domains), detail: "Domains seen in the window that are not yet in the main corpus." },
    { value: formatCompact(activity.routing_changes), label: "Routing changes", asOf: asOfLabel(activity.as_of?.routing_changes), detail: "Prefixes that appeared under a new origin network in the latest routing diff." },
  ];

  const platformStatus = [
    { label: "Certificate stream", value: status.certstream ?? "live" },
    { label: "DNS intelligence", value: status.dns ?? "live" },
    { label: "Risk scores", value: status.scores ?? "live" },
    // WU25 §1: never surface a placeholder snapshot like "00:00 UTC".
    { label: "Infrastructure graph", value: safeSnapshotLabel(status.snapshot) ?? "live" },
  ];

  // WU25 §1 (STOP-LINE): the per-hour activity panel renders only if EVERY
  // metric is non-zero and non-null. On any zero/null it is hidden entirely so
  // we never render a self-refuting live zero (e.g. "0 certificates").
  //
  // 2026-08-22 — extended to STALENESS. A non-zero figure measured four hours
  // ago is just as self-refuting under a "Last 1h" heading as a zero, and it is
  // harder to spot because it looks healthy. The panel now hides when the CT
  // figures' own as-of is older than the window's budget, rather than
  // republishing them under a fresh `updated`.
  const activityFresh =
    !isStale(activity.as_of?.certificates, ACTIVITY_MAX_AGE_HOURS) &&
    !isStale(activity.as_of?.routing_changes, ACTIVITY_MAX_AGE_HOURS);
  const activityPanelVisible =
    isActivityPanelRenderable([
      activity.certificates,
      activity.new_domains,
      activity.routing_changes,
    ]) && activityFresh;

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#07102b]/80 p-5 shadow-2xl shadow-black/20 md:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(55,222,245,0.15),transparent_30%),radial-gradient(circle_at_82%_78%,rgba(16,185,129,0.11),transparent_32%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:48px_48px] opacity-35" />

      <div className="relative">
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">The internet right now</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">Live observations from the Datazag Intelligence Platform.</h3>
            <p className="mt-5 text-sm leading-6 text-slate-300 md:text-base">
              Datazag continuously observes public internet infrastructure and turns domains, certificates, DNS, routing and platform relationships into operational intelligence.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {platformStatus.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3">
                <span className="text-sm text-slate-300">{item.label}</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.08] px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {coverageMetrics.map((metric) => (
            <article key={metric.label} className="grid min-h-[13rem] grid-rows-[auto_auto_1fr] rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.055] p-5">
              <p className="text-4xl font-semibold tracking-tight text-white">{metric.value}</p>
              <h4 className="mt-4 border-t border-white/10 pt-4 text-sm font-semibold uppercase tracking-[0.15em] text-cyan-100/85">{metric.label}</h4>
              <div className="mt-3">
                <p className="text-sm leading-6 text-slate-300">{metric.detail}</p>
                {/* This figure's OWN as-of — never the page's, never a neighbour's. */}
                {metric.asOf ? (
                  <p className="mt-2 text-xs text-slate-400">Measured {metric.asOf}</p>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <div className={`mt-5 grid gap-5 ${activityPanelVisible ? "lg:grid-cols-[1.05fr_0.95fr]" : ""}`}>
          {activityPanelVisible ? (
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/70">Last {activity.window ?? "1h"}</p>
                  <h4 className="mt-2 text-xl font-semibold text-white">Infrastructure activity</h4>
                </div>
                {/* Deliberately NOT a single "Updated HH:MM" chip any more. That
                    chip was the file's build time and it sat above figures of
                    two different cadences, which is how a 13-hour-old total came
                    to read as live. Each tile carries its own "Measured …". */}
                <p className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300">Per-figure timestamps below</p>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {activityMetrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-white/10 bg-[#030619]/50 p-4">
                    <p className="text-2xl font-semibold text-white">{metric.value}</p>
                    <p className="mt-2 text-sm font-semibold text-slate-100">{metric.label}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">{metric.detail}</p>
                    {metric.asOf ? (
                      <p className="mt-2 text-xs text-slate-500">Measured {metric.asOf}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="rounded-[1.5rem] border border-white/10 bg-[#030619]/55 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/70">Coverage model</p>
            <h4 className="mt-2 text-xl font-semibold text-white">Infrastructure relationships, not threat-feed lists.</h4>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Public telemetry is normalized into Datazag's own graph so customers see explainable relationships, provider context and historical change rather than isolated indicators.
            </p>
            <div className="mt-5 grid gap-2">
              {["DNS intelligence", "Certificate intelligence", "Subdomain intelligence", "Routing context", "Provider and platform mapping"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 text-sm text-slate-300">
                  <span className="h-2 w-2 rounded-full bg-cyan-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

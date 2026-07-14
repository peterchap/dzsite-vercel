import { isActivityPanelRenderable, safeSnapshotLabel } from "@/lib/live-activity-guard";
import { siteStats } from "@/lib/site-stats";

type CoverageSnapshot = {
  domains?: number;
  ips?: number;
  threat_ips?: number;
  infrastructure_ips?: number;
  certificates?: number;
  asns?: number;
  prefixes?: number;
  updated?: string;
};

type ActivitySnapshot = {
  certificates?: number | null;
  new_domains?: number | null;
  san_domains?: number | null;
  alerts?: number | null;
  routing_changes?: number | null;
  window?: string;
  updated?: string;
};

type StatusSnapshot = {
  certstream?: string;
  dns?: string;
  scores?: string;
  graph_updated?: string;
  snapshot?: string;
  updated?: string;
};

const fallbackCoverage: Required<CoverageSnapshot> = {
  domains: siteStats.domainsMonitored,
  ips: 3210567890,
  threat_ips: 10543210,
  infrastructure_ips: 10543210,
  certificates: 428341,
  asns: 184532,
  prefixes: 1322123,
  updated: "2026-06-28T11:00:00+00:00",
};

const fallbackActivity: Required<ActivitySnapshot> = {
  certificates: null,
  new_domains: 412,
  san_domains: null,
  alerts: 83,
  routing_changes: 17,
  window: "1h",
  updated: "2026-06-28T11:00:00+00:00",
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
  const [coverage, activity, status] = await Promise.all([
    fetchJson<CoverageSnapshot>(baseUrl, "coverage.json", fallbackCoverage),
    fetchJson<ActivitySnapshot>(baseUrl, "activity.json", fallbackActivity),
    fetchJson<StatusSnapshot>(baseUrl, "status.json", fallbackStatus),
  ]);

  const domainLinkedIps = coverage.infrastructure_ips ?? coverage.threat_ips;

  const coverageMetrics = [
    { value: formatCompact(coverage.domains), label: "Domains monitored", detail: "Continuously correlated against DNS, certificates and infrastructure history." },
    { value: formatCompact(domainLinkedIps), label: "IPs hosting domains", detail: "IP addresses currently linked to domains in the Datazag corpus." },
    { value: formatCompact(coverage.ips), label: "IPv4 addresses indexed", detail: "Total IP space indexed for context and infrastructure correlation." },
    { value: formatCompact(coverage.asns), label: "Networks profiled", detail: "ASN ownership and routing context for infrastructure intelligence." },
  ];

  const activityMetrics = [
    { value: formatCompact(activity.certificates), label: "Certificates observed", detail: "Certificate activity in the latest window." },
    { value: formatCompact(activity.new_domains), label: "New domains", detail: "Domains not yet in the main corpus." },
    { value: formatCompact(activity.alerts), label: "Alert candidates", detail: "Signals queued for scoring or review." },
    { value: formatCompact(activity.routing_changes), label: "Routing changes", detail: "Network movement observed in the latest window." },
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
  const activityPanelVisible = isActivityPanelRenderable([
    activity.certificates,
    activity.new_domains,
    activity.alerts,
    activity.routing_changes,
  ]);

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
              <p className="mt-3 text-sm leading-6 text-slate-300">{metric.detail}</p>
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
                <p className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300">{formatUpdatedLabel(activity.updated ?? status.updated)}</p>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {activityMetrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-white/10 bg-[#030619]/50 p-4">
                    <p className="text-2xl font-semibold text-white">{metric.value}</p>
                    <p className="mt-2 text-sm font-semibold text-slate-100">{metric.label}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">{metric.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="rounded-[1.5rem] border border-white/10 bg-[#030619]/55 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/70">Coverage model</p>
            <h4 className="mt-2 text-xl font-semibold text-white">Infrastructure relationships, not threat-feed lists.</h4>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Public telemetry is normalised into Datazag's own graph so customers see explainable relationships, provider context and historical change rather than isolated indicators.
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

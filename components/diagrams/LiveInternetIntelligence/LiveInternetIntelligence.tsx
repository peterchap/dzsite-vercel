const coverage = {
  domains: 342010111,
  internetIps: 3210567890,
  infrastructureIps: 10543210,
  certificates: 428341,
  asns: 184532,
  prefixes: 1322123,
  updated: "2026-06-28T11:00:00+00:00",
};

const activity = {
  certificates: null as number | null,
  newDomains: 412,
  sanDomains: null as number | null,
  alerts: 83,
  routingChanges: 17,
  window: "1h",
  updated: "2026-06-28T11:00:00+00:00",
};

const status = {
  certstream: "live",
  dns: "live",
  scores: "live",
  graphUpdated: "2026-06-28T06:12:00+00:00",
  snapshot: "06:00 UTC",
  updated: "2026-06-28T11:03:00+00:00",
};

function formatCompact(value: number | null, suffix = "") {
  if (value === null) return "—";
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B${suffix}`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(value >= 100_000_000 ? 0 : 1)}M${suffix}`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(value >= 10_000 ? 0 : 1)}k${suffix}`;
  return `${value.toLocaleString()}${suffix}`;
}

const coverageMetrics = [
  { value: formatCompact(coverage.domains), label: "Domains monitored", detail: "Continuously correlated against DNS, certificates and infrastructure history." },
  { value: formatCompact(coverage.infrastructureIps), label: "Infrastructure IPs", detail: "Active IP relationships mapped from the domain corpus." },
  { value: formatCompact(coverage.asns), label: "ASN profiles", detail: "Network ownership and routing context for infrastructure intelligence." },
  { value: formatCompact(coverage.prefixes), label: "Prefixes tracked", detail: "Routing-level context updated from infrastructure snapshots." },
];

const activityMetrics = [
  { value: formatCompact(activity.newDomains), label: "New domains", detail: "Not yet in the main corpus." },
  { value: formatCompact(activity.alerts), label: "Alert candidates", detail: "Signals queued for scoring or review." },
  { value: formatCompact(activity.routingChanges), label: "Routing changes", detail: "Network movement observed in the latest window." },
  { value: status.snapshot, label: "Latest snapshot", detail: "Hourly infrastructure update." },
];

const platformStatus = [
  { label: "Certificate stream", value: status.certstream },
  { label: "DNS intelligence", value: status.dns },
  { label: "Risk scores", value: status.scores },
  { label: "Infrastructure graph", value: "updated" },
];

export function LiveInternetIntelligence() {
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
              <div key={item.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3">
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

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/70">Last hour</p>
                <h4 className="mt-2 text-xl font-semibold text-white">Infrastructure activity</h4>
              </div>
              <p className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300">Updated {status.snapshot}</p>
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

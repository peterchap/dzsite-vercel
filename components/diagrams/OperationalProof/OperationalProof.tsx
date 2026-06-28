const proofMetrics = [
  {
    value: "340M+",
    label: "Domains monitored",
    detail: "Continuously correlated against DNS, certificate and infrastructure history.",
    tone: "cyan",
  },
  {
    value: "10M+",
    label: "Active IP relationships",
    detail: "A and AAAA relationships mapped into infrastructure context.",
    tone: "violet",
  },
  {
    value: "~10s",
    label: "Certificate alert target",
    detail: "Detection can trigger within seconds of SSL certificate publication.",
    tone: "amber",
  },
  {
    value: "24/7",
    label: "Infrastructure observation",
    detail: "Signals are refreshed continuously across public internet sources.",
    tone: "emerald",
  },
];

const proofCapabilities = [
  "Explainable risk reasons",
  "Platform and provider mapping",
  "DNS, MX, NS and subdomain context",
  "Cloud-ready intelligence outputs",
];

function metricClasses(tone: string) {
  if (tone === "violet") return "border-violet-300/25 bg-violet-300/[0.06]";
  if (tone === "amber") return "border-amber-300/25 bg-amber-300/[0.06]";
  if (tone === "emerald") return "border-emerald-300/25 bg-emerald-300/[0.06]";
  return "border-cyan-300/25 bg-cyan-300/[0.06]";
}

function dotClasses(tone: string) {
  if (tone === "violet") return "bg-violet-300";
  if (tone === "amber") return "bg-amber-300";
  if (tone === "emerald") return "bg-emerald-300";
  return "bg-cyan-300";
}

export function OperationalProof() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#07102b]/80 p-5 shadow-2xl shadow-black/20 md:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(55,222,245,0.14),transparent_30%),radial-gradient(circle_at_76%_74%,rgba(16,185,129,0.11),transparent_32%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:48px_48px] opacity-35" />

      <div className="relative">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Datazag in operation</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">Evidence from a live infrastructure intelligence system.</h3>
            <p className="mt-5 text-sm leading-6 text-slate-300 md:text-base">
              The homepage should not rely only on claims. These operating metrics frame Datazag as a continuously running intelligence layer, ready to become live counters later.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {proofMetrics.map((metric) => (
              <article key={metric.label} className={`grid min-h-[12rem] grid-rows-[auto_auto_1fr] rounded-2xl border p-5 ${metricClasses(metric.tone)}`}>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-4xl font-semibold tracking-tight text-white">{metric.value}</p>
                  <span className={`h-2.5 w-2.5 rounded-full ${dotClasses(metric.tone)}`} />
                </div>
                <h4 className="mt-4 border-t border-white/10 pt-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-100">{metric.label}</h4>
                <p className="mt-3 text-sm leading-6 text-slate-300">{metric.detail}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4 md:grid-cols-4">
          {proofCapabilities.map((capability) => (
            <div key={capability} className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#030619]/45 px-3 py-3 text-sm font-medium text-slate-200">
              <span className="h-2 w-2 shrink-0 rounded-full bg-cyan-300" />
              <span>{capability}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

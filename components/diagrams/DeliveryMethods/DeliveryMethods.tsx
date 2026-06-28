const deliveryMethods = [
  {
    title: "Reports",
    description: "Executive and technical views for domain posture, platform exposure and remediation.",
    items: ["Domain Health", "Platform Map", "DNS Review", "Recommendations"],
    tone: "cyan",
  },
  {
    title: "Alerts",
    description: "Real-time intelligence for SOC workflows, partner monitoring and platform abuse teams.",
    items: ["Webhooks", "SIEM", "Splunk", "Sentinel"],
    tone: "amber",
  },
  {
    title: "API",
    description: "Lookup, score and enrich domains, infrastructure and platform indicators inside your products.",
    items: ["REST", "Bulk Lookup", "Risk Scoring", "Evidence"],
    tone: "violet",
  },
  {
    title: "Cloud Datasets",
    description: "Continuously refreshed intelligence delivered into your analytics and marketplace stack.",
    items: ["Snowflake", "Databricks", "Iceberg", "Delta"],
    tone: "emerald",
  },
];

function methodClasses(tone: string) {
  if (tone === "amber") return "border-amber-300/25 bg-amber-300/[0.06]";
  if (tone === "violet") return "border-violet-300/25 bg-violet-300/[0.06]";
  if (tone === "emerald") return "border-emerald-300/25 bg-emerald-300/[0.06]";
  return "border-cyan-300/25 bg-cyan-300/[0.06]";
}

function dotClasses(tone: string) {
  if (tone === "amber") return "bg-amber-300";
  if (tone === "violet") return "bg-violet-300";
  if (tone === "emerald") return "bg-emerald-300";
  return "bg-cyan-300";
}

export function DeliveryMethods() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#07102b]/80 p-5 shadow-2xl shadow-black/20 md:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(55,222,245,0.15),transparent_28%),radial-gradient(circle_at_20%_88%,rgba(139,92,246,0.12),transparent_28%),radial-gradient(circle_at_82%_80%,rgba(16,185,129,0.11),transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:48px_48px] opacity-35" />

      <div className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">One platform · multiple delivery methods</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-4xl">The same intelligence graph powers every output.</h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
            Reports, alerts, APIs and datasets are not separate products. They are different ways to consume Datazag's continuously updated infrastructure intelligence.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-2xl rounded-[1.5rem] border border-cyan-300/25 bg-cyan-300/[0.07] p-5 text-center shadow-2xl shadow-cyan-950/20">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-100/75">Datazag Intelligence Platform</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-white">Infrastructure Graph</p>
          <p className="mx-auto mt-2 max-w-lg text-xs leading-5 text-slate-300">Domains, DNS, certificates, hosting, ASNs, platforms, history, evidence and risk context.</p>
        </div>

        <div className="relative mx-auto hidden h-16 max-w-5xl md:block" aria-hidden="true">
          <div className="absolute left-1/2 top-0 h-16 w-px -translate-x-1/2 bg-gradient-to-b from-cyan-300/60 to-cyan-300/15" />
          <div className="absolute left-[12.5%] right-[12.5%] top-12 h-px bg-gradient-to-r from-cyan-300/10 via-cyan-300/45 to-cyan-300/10" />
          {[12.5, 37.5, 62.5, 87.5].map((left) => (
            <div key={left} className="absolute top-12 h-5 w-px -translate-y-0 bg-cyan-300/25" style={{ left: `${left}%` }} />
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:mt-0 md:grid-cols-4">
          {deliveryMethods.map((method) => (
            <article key={method.title} className={`grid min-h-[17rem] grid-rows-[auto_1fr_auto] rounded-2xl border p-5 ${methodClasses(method.tone)}`}>
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className={`h-2.5 w-2.5 rounded-full ${dotClasses(method.tone)}`} />
                  <h4 className="text-lg font-semibold text-white">{method.title}</h4>
                </div>
                <p className="text-sm leading-6 text-slate-300">{method.description}</p>
              </div>
              <div />
              <div className="mt-5 grid gap-2 border-t border-white/10 pt-4">
                {method.items.map((item) => (
                  <div key={item} className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs font-medium text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

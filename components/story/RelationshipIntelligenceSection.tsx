const stages = ["Signal", "Relationships", "Campaign surface", "Intelligence", "Evidence packages"];

function Node({ label, tone = "default" }: { label: string; tone?: "default" | "primary" | "output" }) {
  const classes = tone === "primary"
    ? "border-cyan-300/35 bg-cyan-300/[0.11] text-cyan-50"
    : tone === "output"
      ? "border-emerald-300/30 bg-emerald-300/[0.09] text-emerald-50"
      : "border-white/10 bg-[#030619]/78 text-slate-200";

  return (
    <div className={`rounded-2xl border px-4 py-3 text-center text-xs font-semibold shadow-lg shadow-black/20 ${classes}`}>
      {label}
    </div>
  );
}

function RelationshipGraph() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#07102b]/80 p-5 shadow-2xl shadow-black/20 md:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(55,222,245,0.15),transparent_30%),radial-gradient(circle_at_50%_92%,rgba(16,185,129,0.1),transparent_34%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:44px_44px] opacity-35" />

      <div className="relative grid gap-5">
        <div className="mx-auto w-full max-w-xs"><Node label="New certificate or DNS change" tone="primary" /></div>
        <div className="mx-auto h-8 w-px bg-cyan-300/35" />
        <div className="mx-auto w-full max-w-sm"><Node label="First suspicious domain" tone="primary" /></div>

        <div className="relative h-8">
          <div className="absolute left-1/2 top-0 h-8 w-px -translate-x-1/2 bg-cyan-300/25" />
          <div className="absolute left-[16.5%] right-[16.5%] top-8 h-px bg-cyan-300/20" />
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <Node label="Shared IPs" />
          <Node label="Related domains" />
          <Node label="Shared certificates" />
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <Node label="Providers" />
          <Node label="ASN / prefix" />
          <Node label="Historical context" />
        </div>

        <div className="relative h-8">
          <div className="absolute left-[16.5%] right-[16.5%] top-0 h-px bg-cyan-300/16" />
          <div className="absolute left-1/2 top-0 h-8 w-px -translate-x-1/2 bg-cyan-300/25" />
        </div>

        <div className="mx-auto w-full max-w-md"><Node label="Campaign blast area" tone="primary" /></div>
        <div className="mx-auto h-8 w-px bg-cyan-300/35" />
        <div className="mx-auto w-full max-w-sm"><Node label="Relationship Intelligence" tone="primary" /></div>

        <div className="grid gap-3 pt-2 md:grid-cols-4">
          <Node label="Reports" tone="output" />
          <Node label="Alerts" tone="output" />
          <Node label="API" tone="output" />
          <Node label="Data shares" tone="output" />
        </div>
      </div>
    </div>
  );
}

export function RelationshipIntelligenceSection() {
  return (
    <section className="relative border-t border-white/10 py-20 md:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Relationship Intelligence</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">Signals reveal relationships. Relationships become intelligence.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              A certificate, DNS change or routing event is only the first clue. Datazag uses it as a pivot into related domains, IPs, certificates, providers, networks and historical observations.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-400">
              That relationship context turns one signal into a wider campaign view. Intelligence then becomes evidence packaged for the way each team works: reports, alerts, APIs and cloud data shares.
            </p>

            <div className="mt-8 grid gap-3">
              {stages.map((stage, index) => (
                <div key={stage} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] text-xs font-semibold text-cyan-100">{index + 1}</span>
                  <span className="text-sm font-semibold text-slate-200">{stage}</span>
                </div>
              ))}
            </div>
          </div>

          <RelationshipGraph />
        </div>
      </div>
    </section>
  );
}

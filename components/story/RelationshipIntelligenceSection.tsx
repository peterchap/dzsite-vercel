const relationshipNodes = [
  { label: "Certificate", x: "left-[42%]", y: "top-[7%]", emphasis: true },
  { label: "Suspicious domain", x: "left-[33%]", y: "top-[25%]", emphasis: true },
  { label: "Shared IPs", x: "left-[8%]", y: "top-[43%]" },
  { label: "Related domains", x: "left-[36%]", y: "top-[48%]" },
  { label: "Shared certificates", x: "left-[67%]", y: "top-[42%]" },
  { label: "Providers", x: "left-[14%]", y: "top-[68%]" },
  { label: "History", x: "left-[58%]", y: "top-[70%]" },
  { label: "Campaign infrastructure", x: "left-[30%]", y: "top-[84%]", emphasis: true },
];

const stages = ["Signal", "Relationships", "Campaign context", "Intelligence", "Action"];

function RelationshipGraph() {
  return (
    <div className="relative min-h-[33rem] overflow-hidden rounded-[2rem] border border-white/10 bg-[#07102b]/80 p-5 shadow-2xl shadow-black/20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(55,222,245,0.15),transparent_30%),radial-gradient(circle_at_50%_88%,rgba(16,185,129,0.1),transparent_34%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:44px_44px] opacity-35" />

      <div className="absolute left-[49%] top-[15%] h-[70%] w-px bg-cyan-300/20" />
      <div className="absolute left-[22%] top-[38%] h-px w-[56%] bg-cyan-300/20" />
      <div className="absolute left-[24%] top-[62%] h-px w-[52%] bg-cyan-300/20" />
      <div className="absolute left-[18%] top-[48%] h-[34%] w-px rotate-[-24deg] bg-cyan-300/15" />
      <div className="absolute left-[70%] top-[48%] h-[34%] w-px rotate-[24deg] bg-cyan-300/15" />

      {relationshipNodes.map((node) => (
        <div
          key={node.label}
          className={`absolute ${node.x} ${node.y} -translate-x-1/2 rounded-2xl border px-4 py-3 text-center text-xs font-semibold shadow-lg shadow-black/20 ${node.emphasis ? "border-cyan-300/35 bg-cyan-300/[0.12] text-cyan-50" : "border-white/10 bg-[#030619]/80 text-slate-200"}`}
        >
          {node.label}
        </div>
      ))}
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
              Every certificate, DNS change or routing event is only the beginning. Datazag connects domains, infrastructure, providers and historical observations to reveal the relationships behind each signal.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-400">
              Those relationships expose campaign infrastructure, uncover related domains and IPs that may not look suspicious on first view, and provide the context defenders need to make confident decisions.
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

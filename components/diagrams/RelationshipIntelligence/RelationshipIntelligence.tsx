const upperNodes = ["DNS", "Certificates", "Email"];
const lowerNodes = ["Subdomains", "Platforms", "Suppliers"];

function Node({ label, emphasis = false }: { label: string; emphasis?: boolean }) {
  return (
    <div className={`rounded-2xl border px-4 py-3 text-center text-sm font-semibold ${emphasis ? "border-cyan-300/35 bg-cyan-300/[0.1] text-cyan-50" : "border-white/10 bg-white/[0.045] text-slate-200"}`}>
      {label}
    </div>
  );
}

export function RelationshipIntelligence() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#07102b]/80 p-5 shadow-2xl shadow-black/20 md:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_16%,rgba(55,222,245,0.14),transparent_30%),radial-gradient(circle_at_50%_84%,rgba(139,92,246,0.12),transparent_34%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:44px_44px] opacity-35" />

      <div className="relative grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Why it matters</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">Every organization leaves an infrastructure footprint.</h2>
          <p className="mt-5 text-sm leading-6 text-slate-300 md:text-base">
            Domains, DNS, certificates, mail, providers and subdomains create observable relationships. Datazag maps those relationships so exposure can be understood before attackers exploit it.
          </p>
        </div>

        <div className="relative rounded-[1.75rem] border border-white/10 bg-[#030619]/60 p-5 md:p-6">
          <div className="mx-auto grid max-w-3xl gap-4">
            <div className="mx-auto w-full max-w-xs"><Node label="Organization" emphasis /></div>
            <div className="mx-auto h-8 w-px bg-cyan-300/35" />
            <div className="mx-auto w-full max-w-sm"><Node label="Primary domain" emphasis /></div>

            <div className="relative h-8">
              <div className="absolute left-1/2 top-0 h-8 w-px -translate-x-1/2 bg-cyan-300/30" />
              <div className="absolute left-[16.5%] right-[16.5%] top-8 h-px bg-cyan-300/25" />
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {upperNodes.map((node) => <Node key={node} label={node} />)}
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {lowerNodes.map((node) => <Node key={node} label={node} />)}
            </div>

            <div className="relative h-8">
              <div className="absolute left-[16.5%] right-[16.5%] top-0 h-px bg-cyan-300/20" />
              <div className="absolute left-1/2 top-0 h-8 w-px -translate-x-1/2 bg-cyan-300/30" />
            </div>

            <div className="mx-auto w-full max-w-md"><Node label="Infrastructure relationships" /></div>
            <div className="mx-auto h-8 w-px bg-cyan-300/35" />
            <div className="mx-auto w-full max-w-sm"><Node label="Datazag Intelligence" emphasis /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

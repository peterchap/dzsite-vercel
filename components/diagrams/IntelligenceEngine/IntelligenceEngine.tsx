const observeSignals = ["Domains", "DNS", "Certificates", "Subdomains", "Hosting"];
const enrichSignals = ["ASN", "BGP", "Geo", "Providers", "Platform Detection", "Threat Feeds"];
const graphSignals = ["Infrastructure Graph", "Historical Context", "Relationships", "Evidence"];
const explainSignals = ["Risk", "Confidence", "Reasons", "Recommendations"];
const outputs = ["Reports", "Alerts", "API", "Marketplace Datasets"];

type EngineStageProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
  tone?: "blue" | "purple" | "cyan" | "amber" | "green";
  featured?: boolean;
};

const toneClasses = {
  blue: "border-sky-300/20 bg-sky-300/[0.05] text-sky-100",
  purple: "border-violet-300/20 bg-violet-300/[0.05] text-violet-100",
  cyan: "border-cyan-300/25 bg-cyan-300/[0.06] text-cyan-100",
  amber: "border-amber-300/20 bg-amber-300/[0.06] text-amber-100",
  green: "border-emerald-300/20 bg-emerald-300/[0.05] text-emerald-100",
};

function EngineStage({ eyebrow, title, description, items, tone = "cyan", featured = false }: EngineStageProps) {
  return (
    <article className={`relative rounded-[1.75rem] border p-5 shadow-2xl shadow-black/10 ${toneClasses[tone]} ${featured ? "md:p-7" : ""}`}>
      <div className="absolute inset-0 rounded-[1.75rem] bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.14),transparent_34%)]" />
      <div className="relative">
        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.28em] opacity-70">{eyebrow}</p>
        <h3 className={`${featured ? "mt-3 text-2xl md:text-3xl" : "mt-2 text-lg"} font-semibold tracking-tight text-white`}>{title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {items.map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1.5 text-xs font-medium text-slate-200">
              {item}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function FlowConnector({ split = false }: { split?: boolean }) {
  return (
    <div className="flex justify-center py-3" aria-hidden="true">
      <div className="relative h-10 w-px bg-gradient-to-b from-cyan-300/10 via-cyan-300/60 to-cyan-300/10">
        {split ? <div className="absolute left-1/2 top-5 h-px w-28 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" /> : null}
        <div className="absolute bottom-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-b border-r border-cyan-300/60" />
      </div>
    </div>
  );
}

export function IntelligenceEngine() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#07102b]/80 p-5 shadow-2xl shadow-black/20 md:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(55,222,245,0.16),transparent_28%),radial-gradient(circle_at_18%_18%,rgba(139,92,246,0.14),transparent_28%),radial-gradient(circle_at_80%_84%,rgba(16,185,129,0.11),transparent_28%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />

      <div className="relative mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Datazag Intelligence Engine</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-4xl">One infrastructure graph. Multiple intelligence products.</h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
            Datazag observes public internet changes, enriches them with context, connects them into an infrastructure graph and publishes explainable intelligence.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <EngineStage eyebrow="01" title="Observe" description="Collect public signals as internet infrastructure changes." items={observeSignals} tone="blue" />
          <EngineStage eyebrow="02" title="Enrich" description="Add network, provider, platform and threat context." items={enrichSignals} tone="purple" />
        </div>

        <FlowConnector split />

        <EngineStage
          eyebrow="03"
          title="Connect"
          description="Resolve signals into relationships, history and evidence inside a continuously updated infrastructure graph."
          items={graphSignals}
          tone="cyan"
          featured
        />

        <FlowConnector />

        <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
          <EngineStage eyebrow="04" title="Explain" description="Convert graph context into human-readable risk and action." items={explainSignals} tone="amber" />
          <EngineStage eyebrow="05" title="Deliver" description="Package the same intelligence into the format each customer needs." items={outputs} tone="green" />
        </div>
      </div>
    </div>
  );
}

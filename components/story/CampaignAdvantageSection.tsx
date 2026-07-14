const outcomes = [
  {
    title: "Remove the attacker's advantage",
    text: "Attackers prepare domains, certificates and infrastructure before launching. Early visibility removes the element of surprise and gives defenders time to prepare.",
    steps: ["Prep", "Detect", "Defend", "Launch"],
  },
  {
    title: "Block before go-live",
    text: "Domains, certificates, IPs and hostnames can be pushed into defensive controls before the first phishing email is delivered or credential page goes live.",
    steps: ["Domain", "Policy", "Gateway", "Blocked"],
  },
  {
    title: "Reveal the campaign surface",
    text: "The first signal becomes a pivot point. Datazag analyses surrounding domains, IPs, certificates, providers and history to identify the wider attacker infrastructure.",
    steps: ["Signal", "Pivots", "Related", "Campaign"],
    highlight: true,
  },
  {
    title: "Improve the next detection",
    text: "Every relationship adds context. Related infrastructure makes future signals easier to score, helping detections become faster, smarter and more complete over time.",
    steps: ["Context", "Score", "Detect", "Improve"],
  },
];

function OutcomeCard({ outcome }: { outcome: (typeof outcomes)[number] }) {
  return (
    <article className={`grid min-h-[21rem] grid-rows-[auto_1fr_auto] rounded-[1.5rem] border p-5 ${outcome.highlight ? "border-cyan-300/35 bg-cyan-300/[0.08]" : "border-white/10 bg-white/[0.035]"}`}>
      <div>
        <div className="flex items-center justify-between gap-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.08] text-sm font-semibold text-cyan-100">●</span>
          {outcome.highlight ? <span className="rounded-full border border-cyan-300/25 bg-cyan-300/[0.08] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">Campaign surface</span> : null}
        </div>
        <h3 className="mt-5 text-xl font-semibold tracking-tight text-white">{outcome.title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">{outcome.text}</p>
      </div>

      <div className="mt-6 grid gap-2 self-end">
        {outcome.steps.map((step, index) => (
          <div key={step} className="flex items-center gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#030619]/60 text-xs font-semibold text-cyan-100">{index + 1}</span>
            <div className="flex-1 rounded-xl border border-white/10 bg-[#030619]/45 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">{step}</div>
          </div>
        ))}
      </div>
    </article>
  );
}

export function CampaignAdvantageSection() {
  return (
    <section className="relative border-t border-white/10 py-20 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(55,222,245,0.1),transparent_32%),radial-gradient(circle_at_80%_70%,rgba(139,92,246,0.1),transparent_34%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Early insight</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">More insight reveals the campaign, not just one domain.</h2>
          </div>
          <p className="max-w-3xl text-lg leading-8 text-slate-300">
            Seeing infrastructure before it goes live gives Datazag time to map the surrounding campaign surface: related domains, IPs, certificates, providers and history. That wider view helps defenders block more of the campaign and improves the next detection.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {outcomes.map((outcome) => <OutcomeCard key={outcome.title} outcome={outcome} />)}
        </div>

        <div className="mt-8 rounded-[1.5rem] border border-cyan-300/20 bg-cyan-300/[0.06] p-5 text-center">
          <p className="text-xl font-semibold tracking-tight text-white md:text-2xl">Earlier visibility creates better intelligence.</p>
        </div>
      </div>
    </section>
  );
}

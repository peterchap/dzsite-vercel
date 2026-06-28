const timelineEvents = [
  {
    label: "Infrastructure created",
    detail: "Domains, certificates, DNS and hosting begin to appear.",
    phase: "pre",
  },
  {
    label: "Datazag observes",
    detail: "New signals are detected while infrastructure is still forming.",
    phase: "datazag",
  },
  {
    label: "Datazag investigates",
    detail: "Signals are enriched, scored and connected to context.",
    phase: "datazag",
  },
  {
    label: "Campaign launched",
    detail: "Infrastructure becomes operational and targets users.",
    phase: "attack",
  },
  {
    label: "Traditional detection",
    detail: "Most controls react after delivery, user exposure or abuse reports.",
    phase: "late",
  },
];

function phaseClasses(phase: string) {
  if (phase === "datazag") return "border-cyan-300/35 bg-cyan-300/[0.08] text-cyan-100";
  if (phase === "attack") return "border-amber-300/30 bg-amber-300/[0.07] text-amber-100";
  if (phase === "late") return "border-slate-400/20 bg-slate-400/[0.05] text-slate-200";
  return "border-sky-300/20 bg-sky-300/[0.05] text-sky-100";
}

export function EarlyWarningTimeline() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#07102b]/80 p-5 shadow-2xl shadow-black/20 md:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_30%,rgba(55,222,245,0.16),transparent_30%),radial-gradient(circle_at_76%_54%,rgba(245,158,11,0.12),transparent_32%)]" />
      <div className="relative">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Datazag Early Warning Timeline</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-4xl">Datazag sees the preparation phase.</h3>
          <p className="mt-4 text-sm leading-6 text-slate-300 md:text-base">
            Attack infrastructure leaves observable traces before campaigns reach inboxes, browsers, endpoints or users.
          </p>
        </div>

        <div className="relative hidden md:block">
          <div className="absolute left-[8%] right-[8%] top-[3.15rem] h-px bg-gradient-to-r from-sky-300/20 via-cyan-300/70 via-45% to-slate-300/25" />
          <div className="absolute left-[28%] right-[38%] top-[2.55rem] h-5 rounded-full border border-cyan-300/25 bg-cyan-300/[0.08]" />
          <p className="absolute left-[31%] top-0 rounded-full border border-cyan-300/25 bg-cyan-300/[0.08] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-cyan-100">
            Early warning window
          </p>
          <div className="grid grid-cols-5 gap-4 pt-12">
            {timelineEvents.map((event, index) => (
              <article key={event.label} className="relative">
                <div className="absolute left-1/2 top-[-1.12rem] z-10 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-cyan-300/30 bg-[#07102b] text-xs font-semibold text-cyan-100">
                  {index + 1}
                </div>
                <div className={`min-h-[12rem] rounded-2xl border p-4 ${phaseClasses(event.phase)}`}>
                  <h4 className="text-sm font-semibold text-white">{event.label}</h4>
                  <p className="mt-3 text-xs leading-5 text-slate-300">{event.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="grid gap-3 md:hidden">
          {timelineEvents.map((event, index) => (
            <article key={event.label} className={`rounded-2xl border p-4 ${phaseClasses(event.phase)}`}>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-300/30 bg-[#07102b] text-xs font-semibold text-cyan-100">
                  {index + 1}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{event.label}</h4>
                  <p className="mt-2 text-xs leading-5 text-slate-300">{event.detail}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.06] p-4">
            <p className="text-sm font-semibold text-cyan-100">Datazag advantage</p>
            <p className="mt-2 text-xs leading-5 text-slate-300">Observe, investigate and respond before campaigns become visible to most downstream controls.</p>
          </div>
          <div className="rounded-2xl border border-slate-400/15 bg-white/[0.035] p-4">
            <p className="text-sm font-semibold text-slate-100">Traditional window</p>
            <p className="mt-2 text-xs leading-5 text-slate-300">Email, browser, endpoint and blacklist systems usually react once infrastructure is already active.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

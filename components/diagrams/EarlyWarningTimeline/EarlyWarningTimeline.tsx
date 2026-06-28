const detectionMarkers = [
  {
    label: "SSL certificate published",
    time: "0s",
    detail: "New attack infrastructure becomes visible in public certificate streams.",
    position: "left-[6%]",
    tone: "start",
  },
  {
    label: "Datazag alert",
    time: "~10s",
    detail: "Certificate, domain, DNS and platform signals are correlated and scored.",
    position: "left-[20%]",
    tone: "datazag",
  },
  {
    label: "Campaign live",
    time: "minutes → hours",
    detail: "Infrastructure is connected to pages, redirects, mail flows or other campaign assets.",
    position: "left-[48%]",
    tone: "attack",
  },
  {
    label: "Other tools",
    time: "hours → days",
    detail: "Many controls react after crawling, user exposure, abuse reports or blacklist publication.",
    position: "left-[74%]",
    tone: "late",
  },
];

function markerClasses(tone: string) {
  if (tone === "datazag") return "border-cyan-300/45 bg-cyan-300/[0.1] text-cyan-100 shadow-cyan-950/40";
  if (tone === "attack") return "border-amber-300/30 bg-amber-300/[0.07] text-amber-100";
  if (tone === "late") return "border-slate-400/20 bg-slate-400/[0.05] text-slate-200";
  return "border-sky-300/20 bg-sky-300/[0.05] text-sky-100";
}

export function EarlyWarningTimeline() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#07102b]/80 p-5 shadow-2xl shadow-black/20 md:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_42%,rgba(55,222,245,0.18),transparent_31%),radial-gradient(circle_at_82%_56%,rgba(245,158,11,0.12),transparent_34%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:48px_48px] opacity-35" />

      <div className="relative">
        <div className="mb-8 grid gap-5 md:grid-cols-[1fr_auto] md:items-start">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Datazag Early Warning Timeline</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-4xl">Alert within ~10 seconds of certificate publication.</h3>
            <p className="mt-4 text-sm leading-6 text-slate-300 md:text-base">
              Attack infrastructure usually appears before the campaign. Datazag watches those first public signals, while many downstream tools react hours or days later.
            </p>
          </div>
          <div className="rounded-2xl border border-cyan-300/25 bg-cyan-300/[0.08] px-5 py-4 text-center shadow-2xl shadow-cyan-950/20">
            <p className="text-4xl font-semibold tracking-tight text-white md:text-5xl">~10s</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/80">to alert</p>
          </div>
        </div>

        <div className="relative hidden min-h-[21rem] md:block">
          <div className="absolute left-[7%] right-[7%] top-[8.3rem] h-2 rounded-full bg-gradient-to-r from-cyan-300 via-cyan-300/70 via-[24%] via-amber-300/45 to-slate-400/25" />
          <div className="absolute left-[7%] right-[7%] top-[8.05rem] h-3 rounded-full bg-white/[0.035]" />
          <div className="absolute left-[7%] top-[7.05rem] h-8 w-[18%] rounded-full border border-cyan-300/35 bg-cyan-300/[0.08]" />
          <p className="absolute left-[8%] top-[5.1rem] rounded-full border border-cyan-300/25 bg-cyan-300/[0.08] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-cyan-100">
            Datazag window
          </p>
          <p className="absolute right-[7%] top-[5.1rem] rounded-full border border-slate-400/20 bg-white/[0.04] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-slate-300">
            Conventional window
          </p>

          {detectionMarkers.map((marker) => (
            <article key={marker.label} className={`absolute top-[7.1rem] w-[11.5rem] -translate-x-1/2 ${marker.position}`}>
              <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#07102b] text-xs font-semibold text-white shadow-xl shadow-black/20">
                <span className={marker.tone === "datazag" ? "text-cyan-200" : marker.tone === "attack" ? "text-amber-200" : "text-slate-200"}>{marker.time}</span>
              </div>
              <div className={`min-h-[10.5rem] rounded-2xl border p-4 shadow-xl ${markerClasses(marker.tone)}`}>
                <h4 className="text-sm font-semibold text-white">{marker.label}</h4>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] opacity-75">{marker.time}</p>
                <p className="mt-3 text-xs leading-5 text-slate-300">{marker.detail}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="grid gap-3 md:hidden">
          {detectionMarkers.map((marker) => (
            <article key={marker.label} className={`rounded-2xl border p-4 ${markerClasses(marker.tone)}`}>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#07102b] text-xs font-semibold text-white">
                  {marker.time}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{marker.label}</h4>
                  <p className="mt-2 text-xs leading-5 text-slate-300">{marker.detail}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.06] p-4 md:col-span-2">
            <p className="text-sm font-semibold text-cyan-100">Earlier than campaign evidence</p>
            <p className="mt-2 text-xs leading-5 text-slate-300">Certificate publication is often the first observable signal. Datazag uses it to trigger enrichment and alerting before users are exposed.</p>
          </div>
          <div className="rounded-2xl border border-slate-400/15 bg-white/[0.035] p-4">
            <p className="text-sm font-semibold text-slate-100">Hours or days later</p>
            <p className="mt-2 text-xs leading-5 text-slate-300">Crawlers, abuse reports and blacklist pipelines usually need active infrastructure or user exposure first.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

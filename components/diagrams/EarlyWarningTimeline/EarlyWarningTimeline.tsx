const detectionMarkers = [
  {
    label: "SSL certificate published",
    time: "0s",
    timeShort: "0s",
    detail: "New attack infrastructure becomes visible in public certificate streams.",
    tone: "start",
  },
  {
    label: "Datazag alert",
    time: "~10 seconds",
    timeShort: "~10s",
    detail: "Certificate, domain, DNS and platform signals are correlated and scored.",
    tone: "datazag",
  },
  {
    label: "Campaign live",
    time: "Minutes → hours",
    timeShort: "M→H",
    detail: "Infrastructure is connected to pages, redirects, mail flows or campaign assets.",
    tone: "attack",
  },
  {
    label: "Conventional detection",
    time: "Hours → days",
    timeShort: "H→D",
    detail: "Crawlers, abuse reports and blacklist pipelines catch up after exposure.",
    tone: "late",
  },
];

function markerClasses(tone: string) {
  if (tone === "datazag") return "border-cyan-300/45 bg-cyan-300/[0.1] text-cyan-100 shadow-cyan-950/40";
  if (tone === "attack") return "border-amber-300/30 bg-amber-300/[0.07] text-amber-100";
  if (tone === "late") return "border-slate-400/20 bg-slate-400/[0.05] text-slate-200";
  return "border-sky-300/20 bg-sky-300/[0.05] text-sky-100";
}

function markerTextClasses(tone: string) {
  if (tone === "datazag") return "text-cyan-200";
  if (tone === "attack") return "text-amber-200";
  if (tone === "late") return "text-slate-200";
  return "text-sky-200";
}

export function EarlyWarningTimeline() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#07102b]/80 p-5 shadow-2xl shadow-black/20 md:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_42%,rgba(55,222,245,0.18),transparent_31%),radial-gradient(circle_at_82%_56%,rgba(245,158,11,0.12),transparent_34%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:48px_48px] opacity-35" />

      <div className="relative">
        <div className="mb-8 grid gap-5 md:grid-cols-[1fr_auto] md:items-start">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Datazag Detection Advantage</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-4xl">Detect the threat before it goes live.</h3>
            <p className="mt-4 text-sm leading-6 text-slate-300 md:text-base">
              Datazag identifies suspicious infrastructure within ~10 seconds of SSL certificate publication, often hours or days before conventional detection pipelines observe active abuse.
            </p>
          </div>
          <div className="rounded-2xl border border-cyan-300/25 bg-cyan-300/[0.08] px-5 py-4 text-center shadow-2xl shadow-cyan-950/20">
            <p className="text-4xl font-semibold tracking-tight text-white md:text-5xl">~10s</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/80">to alert</p>
          </div>
        </div>

        <div className="hidden md:block">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-2 rounded-full border border-cyan-300/25 bg-cyan-300/[0.08] px-3 py-2 text-center text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-cyan-100">
              Datazag window — early advantage
            </div>
            <div className="col-span-2 rounded-full border border-slate-400/20 bg-white/[0.04] px-3 py-2 text-center text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-slate-300">
              Conventional window — reactive
            </div>
          </div>

          <div className="mt-5 grid grid-cols-4 gap-4">
            {detectionMarkers.map((marker, index) => (
              <div key={`${marker.label}-timeline`} className="grid grid-rows-[2.75rem_1.5rem] items-center">
                <div className="relative flex items-center justify-center">
                  <div className="absolute left-0 right-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-white/[0.035]" />
                  <div className={`absolute left-0 right-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full ${index < 2 ? "bg-cyan-300/80" : index === 2 ? "bg-amber-300/45" : "bg-slate-400/35"}`} />
                  <div className="relative z-10 flex h-11 min-w-11 items-center justify-center rounded-full border border-white/15 bg-[#07102b] px-3 text-xs font-semibold text-white shadow-xl shadow-black/20">
                    <span className={markerTextClasses(marker.tone)}>{marker.timeShort}</span>
                  </div>
                </div>
                <p className="text-center text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-slate-400">{marker.time}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-4 gap-4">
            {detectionMarkers.map((marker) => (
              <article key={marker.label} className={`grid min-h-[13rem] grid-rows-[3.25rem_2rem_1fr] rounded-2xl border p-4 shadow-xl ${markerClasses(marker.tone)}`}>
                <h4 className="flex items-start text-sm font-semibold leading-5 text-white">{marker.label}</h4>
                <p className="flex items-center border-t border-white/10 pt-2 text-xs font-semibold uppercase tracking-[0.16em] opacity-75">{marker.time}</p>
                <p className="border-t border-white/10 pt-3 text-xs leading-5 text-slate-300">{marker.detail}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="grid gap-3 md:hidden">
          {detectionMarkers.map((marker) => (
            <article key={marker.label} className={`rounded-2xl border p-4 ${markerClasses(marker.tone)}`}>
              <div className="flex items-start gap-3">
                <div className="flex h-10 min-w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#07102b] px-2 text-xs font-semibold text-white">
                  {marker.timeShort}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{marker.label}</h4>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] opacity-75">{marker.time}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-300">{marker.detail}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.06] p-4">
          <p className="text-sm font-semibold text-cyan-100">Up to 48 hours earlier than traditional blacklists.</p>
          <p className="mt-2 text-xs leading-5 text-slate-300">Stop phishing, platform impersonation and fraud before the infrastructure starts receiving victims.</p>
        </div>
      </div>
    </div>
  );
}

const trustSignals = [
  "No questionnaire",
  "No asset inventory",
  "Public infrastructure only",
  "Delivered by email",
];

const analysisSteps = [
  "DNS analysed",
  "Platforms mapped",
  "Certificates checked",
  "Infrastructure reviewed",
  "Risk calculated",
];

const reportSections = [
  { label: "Platform exposure", value: "Microsoft 365 · Cloudflare · Google Workspace" },
  { label: "DNS health", value: "SPF ✓ · DMARC ⚠ · MTA-STS ✓" },
  { label: "External threat", value: "Platform impersonation opportunities" },
];

function ReportPreview() {
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#030619]/75 p-5 shadow-2xl shadow-black/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_12%,rgba(55,222,245,0.14),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.12),transparent_30%)]" />
      <div className="relative">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/70">Preview</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Domain Health Report</h3>
            <p className="mt-1 text-sm text-slate-400">example.com</p>
          </div>
          <div className="rounded-full border border-amber-300/25 bg-amber-300/[0.08] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-amber-100">
            Medium risk
          </div>
        </div>

        <div className="mt-5 grid gap-3">
          {reportSections.map((section) => (
            <div key={section.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/70">{section.label}</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">{section.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.06] p-4">
          <p className="text-sm font-semibold text-cyan-100">Recommended action</p>
          <p className="mt-2 text-xs leading-5 text-slate-300">Review email authentication, exposed platforms and subdomain ownership before attackers exploit weak signals.</p>
        </div>
      </div>
    </div>
  );
}

function AnalysisProgress() {
  return (
    <div className="grid gap-2">
      {analysisSteps.map((step) => (
        <div key={step} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 text-xs text-slate-300">
          <span>{step}</span>
          <span className="text-cyan-200">✓</span>
        </div>
      ))}
    </div>
  );
}

export function DomainHealthReportCta({ buttonHref = "/#free-report" }: { buttonHref?: string }) {
  return (
    <section id="free-report" className="relative border-t border-white/10 py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(55,222,245,0.13),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.1),transparent_32%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#07102b]/85 p-5 shadow-2xl shadow-black/25 md:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Domain Health Report</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">Analyse your domain in under two minutes.</h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                See your organisation the way an attacker does. Datazag reviews public DNS, visible platforms, subdomains, certificates and impersonation exposure, then sends a report you can share with technical and executive teams.
              </p>

              <div className="mt-8 rounded-2xl border border-white/10 bg-[#030619]/65 p-3 md:p-4">
                <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                  <input
                    type="email"
                    placeholder="Enter your work email"
                    className="min-h-12 rounded-xl border border-white/10 bg-white/[0.055] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/20"
                  />
                  <a href={buttonHref} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-cyan-300/50 bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
                    Generate report
                  </a>
                </div>
              </div>

              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {trustSignals.map((signal) => (
                  <div key={signal} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 text-sm text-slate-300">
                    <span className="h-2 w-2 rounded-full bg-cyan-300" />
                    <span>{signal}</span>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-xs leading-5 text-slate-500">
                We use publicly observable infrastructure signals. The report is free because it demonstrates the value of continuous external monitoring.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-[0.82fr_1.18fr] lg:grid-cols-1 xl:grid-cols-[0.82fr_1.18fr]">
              <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/70">Generated analysis</p>
                <h3 className="mt-3 text-xl font-semibold text-white">What happens next</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">The report is generated from live checks, platform fingerprints and infrastructure intelligence.</p>
                <div className="mt-5">
                  <AnalysisProgress />
                </div>
              </div>
              <ReportPreview />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

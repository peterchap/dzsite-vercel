import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Sample Reports — Datazag",
  description:
    "Datazag sample reports showing the anatomy of a free Domain Health Report and a Cross-Estate Domain Risk Report.",
};

const domainSummary = [
  ["Domain", "example-business.co.uk"],
  ["Report type", "Free single-domain health report"],
  ["Primary exposure", "Microsoft 365 and payment-platform lures relevant to visible platform footprint"],
  ["DNS defence", "DMARC present but not enforcing; SPF and DKIM require alignment review"],
  ["First action", "Harden email authentication and review stale DNS records"],
];

const domainSections = [
  {
    title: "Executive summary",
    text: "The domain shows a visible Microsoft 365 mail footprint, public helpdesk and payment-related platform signals. External suspicious infrastructure is appearing around several of those platform lures. DNS defences are partially configured but not yet strong enough to give a high-confidence anti-spoofing posture.",
    points: ["Threat exposure is mainly platform-led, not direct brand impersonation", "DMARC policy is not enforcing", "Several subdomains expose third-party platform usage", "First remediation should focus on email authentication and stale DNS review"],
  },
  {
    title: "Platform-led threat exposure",
    text: "Detected platform footprint makes Microsoft 365, Stripe and Zendesk-themed lures relevant to this organisation. The report highlights suspicious infrastructure using login, verify, billing and support language around those platforms.",
    points: ["Detected platform: Microsoft 365", "Detected platform: payment workflow", "Detected platform: support/helpdesk", "Recommended action: move high-confidence platform lures into alerts"],
  },
  {
    title: "DNS and email defence analysis",
    text: "The public DNS records show basic mail authentication is present but not hardened. The domain should move gradually from monitoring to enforcement after SPF and DKIM alignment is verified.",
    points: ["DMARC: p=none, not enforcing", "SPF: present, review includes and lookup depth", "DKIM: provider keys visible, alignment check required", "MTA-STS and BIMI not detected"],
  },
  {
    title: "Remediation priorities",
    text: "The first fixes are practical: verify mail authentication alignment, move DMARC towards enforcement, review stale CNAMEs and monitor platform-led impersonation around visible vendors.",
    points: ["Priority 1: verify SPF/DKIM alignment", "Priority 2: move DMARC towards quarantine/reject", "Priority 3: review stale CNAMEs and unused subdomains", "Priority 4: enable alerts for detected platform lures"],
  },
];

const portfolioSummary = [
  ["Estate", "42 domains across brands, subsidiaries and legacy properties"],
  ["Report type", "Cross-Estate Domain Risk Report"],
  ["Systemic issue", "DMARC non-enforcement repeated across 61% of active domains"],
  ["Operational risk", "Inconsistent mail and DNS ownership across business units"],
  ["Programme priority", "Standardise email authentication and review exposed platform dependencies"],
];

const portfolioSections = [
  {
    title: "Portfolio summary",
    text: "The organisation owns multiple active, parked and legacy domains. Individual findings matter, but the bigger issue is inconsistency: the same DNS and email weaknesses appear repeatedly across brands and subsidiaries.",
    points: ["42 domains reviewed", "18 active business domains", "11 parked or defensive domains", "13 legacy or unclear ownership domains"],
  },
  {
    title: "Systemic risk patterns",
    text: "Paid reporting groups repeated issues so leadership can see which weaknesses are isolated and which require a programme-level fix.",
    points: ["DMARC monitoring-only policy appears across 61% of active domains", "SPF records vary by business unit", "Several domains expose old marketing or helpdesk CNAMEs", "Supplier and platform footprints are inconsistent across subsidiaries"],
  },
  {
    title: "Domain ranking",
    text: "The report ranks domains by exposure, importance and remediation urgency so teams can avoid treating every domain as equal.",
    points: ["High: customer-facing login and payment domains", "Medium: active brand and campaign domains", "Low: parked defensive registrations", "Review: legacy domains with unclear ownership"],
  },
  {
    title: "Remediation programme",
    text: "The output is designed to support an organised remediation programme: standardise controls, assign owners, remove stale records and move high-risk domains into monitoring.",
    points: ["Create a domain ownership register", "Set a standard DMARC progression plan", "Review CNAMEs and third-party service ownership", "Monitor priority brands, platforms and suppliers"],
  },
];

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">{children}</div>;
}

function SummaryGrid({ items }: { items: string[][] }) {
  return (
    <div className="grid gap-4 md:grid-cols-5">
      {items.map(([label, value]) => (
        <Card key={label}>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
          <p className="mt-3 text-sm font-semibold leading-6 text-slate-200">{value}</p>
        </Card>
      ))}
    </div>
  );
}

function ReportSections({ sections }: { sections: { title: string; text: string; points: string[] }[] }) {
  return (
    <div className="space-y-5">
      {sections.map((section) => (
        <div key={section.title} className="rounded-[2rem] border border-white/10 bg-[#050b22] p-6">
          <h3 className="text-2xl font-semibold text-white">{section.title}</h3>
          <p className="mt-4 text-sm leading-6 text-slate-300">{section.text}</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {section.points.map((point) => (
              <div key={point} className="rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm leading-6 text-slate-300">{point}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SampleReportsPage() {
  return (
    <main className="min-h-screen bg-[#030619] text-white">
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(55,222,245,0.16),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(139,92,246,0.13),transparent_34%)]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <a href="/reports" className="text-sm font-semibold text-cyan-100">← Back to reports</a>
          <p className="mt-8 inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/[0.1] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">Sample reports</p>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">Report anatomy examples.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Two sample reports showing what a recipient actually sees: the summary, findings, evidence and next actions.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#domain-health" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Free report sample</a>
            <a href="#cross-estate" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">Cross-Estate sample</a>
          </div>
        </div>
      </section>

      <section id="domain-health" className="border-t border-white/10 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Sample free report</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">Free Domain Health Report</h2>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">A one-domain report showing platform-led threat exposure, DNS defence gaps and first remediation priorities.</p>
          <div className="mt-10"><SummaryGrid items={domainSummary} /></div>
          <div className="mt-10"><ReportSections sections={domainSections} /></div>
        </div>
      </section>

      <section id="cross-estate" className="border-t border-white/10 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Sample paid report</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">Cross-Estate Domain Risk Report</h2>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">A paid report showing individual domain findings, repeated weaknesses and systemic risk across the estate an organisation owns.</p>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
            <a href="/samples/cross-estate-domain-risk-report.html" className="font-semibold text-cyan-100 hover:text-cyan-50">Open the full sample report (the Acme Group render) →</a>
          </p>
          <div className="mt-10"><SummaryGrid items={portfolioSummary} /></div>
          <div className="mt-10"><ReportSections sections={portfolioSections} /></div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="/#free-report" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Get my free report</a>
            <a href="/reports" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">Back to reports</a>
          </div>
        </div>
      </section>
    </main>
  );
}

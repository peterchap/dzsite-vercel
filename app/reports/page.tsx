import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Reports — Datazag",
  description:
    "Free single-domain threat exposure and DNS defence reports, plus paid portfolio reporting for systemic domain risk and remediation planning.",
};

const outcomes = [
  {
    title: "Threats targeting your platform footprint",
    text: "Identify external threat activity around the platforms, providers and vendors visible from your domain's public records.",
  },
  {
    title: "Detailed DNS defence analysis",
    text: "Review DNS and email records to find defence weaknesses across SPF, DKIM, DMARC, BIMI, MTA-STS, MX and provider configuration.",
  },
  {
    title: "Remediation priorities",
    text: "Translate findings into clear actions, likely owners and practical remediation effort so teams know what to fix first.",
  },
  {
    title: "Portfolio systemic risk",
    text: "Paid reporting shows whether weaknesses repeat across domains, brands, subsidiaries, suppliers or acquired assets.",
  },
];

const reportSections = [
  {
    title: "Platform-led threat exposure",
    sell: "Which visible platforms and providers are being used as lures, and which suspicious domains, certificates or DNS patterns are relevant to them?",
    powers: ["Platform lures", "Vendor footprint", "Brand terms", "Certificates", "DNS changes", "Evidence"],
  },
  {
    title: "DNS and email defence analysis",
    sell: "Which DNS and email records create spoofing, trust, routing or configuration weaknesses that should be fixed?",
    powers: ["SPF", "DKIM", "DMARC", "BIMI", "MTA-STS", "MX providers"],
  },
  {
    title: "Platform and vendor footprint",
    sell: "Which email platforms, cloud services, SaaS providers, CDNs, nameservers and hosting relationships are visible?",
    powers: ["Email platform", "Cloud", "CDN", "Hosting", "Nameservers", "SaaS signals"],
  },
  {
    title: "Subdomain and infrastructure view",
    sell: "Which public subdomains, CNAMEs, provider relationships and hosting patterns expose the operating footprint?",
    powers: ["Subdomains", "A/AAAA", "CNAMEs", "Hosting", "ASN", "Related infrastructure"],
  },
  {
    title: "Remediation effort and cost indicators",
    sell: "Which issues are high priority, who is likely to own them, and what level of effort should be expected?",
    powers: ["Risk ranking", "Evidence", "Next steps", "Owners", "Effort bands", "Monitoring path"],
  },
];

const sampleReports = [
  {
    title: "Sample free Domain Health Report",
    href: "/reports/sample#domain-health",
    text: "A dummy one-domain report showing threat exposure around visible platforms, DNS defence gaps and first remediation priorities.",
    sections: ["Executive summary", "Threat exposure", "DNS defence analysis", "Remediation priorities"],
  },
  {
    title: "Sample paid Portfolio Risk Report",
    href: "/reports/sample#portfolio-risk",
    text: "A dummy portfolio report showing individual domain findings, recurring weaknesses, systemic risk and remediation planning across many domains.",
    sections: ["Portfolio summary", "Systemic risk", "Domain ranking", "Remediation programme"],
  },
];

const reportTypes = [
  {
    title: "Free Domain Health Report",
    text: "One domain. Platform-led threat exposure, detailed DNS defence analysis and first remediation priorities.",
  },
  {
    title: "Executive Surface Report",
    text: "A plain-language summary for leadership, account reviews, board updates or customer-facing security conversations.",
  },
  {
    title: "Technical Remediation Report",
    text: "A deeper issue list for DNS, email, infrastructure and security teams with evidence, fix guidance and effort indicators.",
  },
  {
    title: "Portfolio Risk Report",
    text: "Paid reporting across the domains an organisation owns, showing individual findings and systemic risk across the portfolio.",
  },
  {
    title: "Partner-branded Report",
    text: "White-label or partner-led reporting for MSSPs, ESPs and service providers delivering reports under their own brand.",
  },
];

const sampleFindings = [
  ["Platform threat exposure", "Which platforms and vendors are visible, and is suspicious infrastructure appearing around those lures?"],
  ["DNS defence gaps", "Which SPF, DKIM, DMARC, BIMI, MTA-STS, MX or nameserver weaknesses should be remediated first?"],
  ["Mail platform alignment", "Does the public DNS footprint match the expected email platform and sender configuration?"],
  ["Systemic portfolio risk", "For paid reports, are the same weaknesses repeated across many domains, brands, subsidiaries or suppliers?"],
  ["Remediation plan", "What should be fixed first, who is likely to own it, and what level of effort or cost should be expected?"],
];

const upgradePaths = [
  ["Alerts", "Move priority brands, domains or platforms into live alerting for platform abuse, brand impersonation and suspicious infrastructure."],
  ["Portfolio reporting", "Track individual domain findings and systemic risk across clients, subsidiaries, suppliers, acquisition targets or domain portfolios."],
  ["Cloud data shares", "Join report findings with analytical datasets for hunting, enrichment, trend analysis and marketplace delivery."],
  ["Partner services", "Use reports as a customer-facing motion for MSSPs, ESPs, consultancies and managed-service providers."],
];

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-xs font-semibold text-slate-300">{children}</span>;
}

function SectionHeader({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
      {body ? <p className="mt-5 text-base leading-7 text-slate-300 md:text-lg md:leading-8">{body}</p> : null}
    </div>
  );
}

function ReportStackPanel() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-cyan-950/20">
      <div className="rounded-[1.5rem] border border-cyan-300/25 bg-cyan-300/[0.08] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/80">Free single-domain report</p>
        <h3 className="mt-3 text-2xl font-semibold text-white">Threat exposure and DNS defence analysis</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">A practical report showing external threat context, DNS defence weaknesses and remediation priorities for one domain.</p>
      </div>
      <div className="mx-auto h-8 w-px bg-cyan-300/30" />
      <div className="rounded-[1.5rem] border border-white/10 bg-[#050b22] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">What it contains</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {["Threat exposure", "DNS records", "Email posture", "Platforms", "Vendors", "Certificates", "Infrastructure", "Remediation"].map((item) => (
            <div key={item} className="rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 text-sm font-semibold text-slate-200">{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ReportsPage() {
  return (
    <main className="overflow-hidden bg-[#030619] text-white">
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(55,222,245,0.16),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(139,92,246,0.13),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.82fr] lg:items-center lg:px-8">
          <div>
            <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/[0.1] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">Reports</p>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">See the threats and defence gaps around your domain.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              The free Domain Health Report looks at one domain, maps the platforms your organisation appears to use, checks external threat activity around those platforms, and analyses DNS records for defence weaknesses.
            </p>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              Paid reports expand the analysis across the domains an organisation owns, combining individual domain findings with portfolio-wide patterns and systemic risk.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/#free-report" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Get my free report</a>
              <a href="#sample-reports" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">View sample reports</a>
            </div>
          </div>
          <ReportStackPanel />
        </div>
      </section>

      <section className="border-t border-white/10 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Report value"
            title="External threat exposure and DNS defence gaps, in one report."
            body="The free report is not just a posture snapshot. It connects the platforms visible around one domain with threat activity targeting those platforms, then identifies the DNS and email weaknesses that affect defence and remediation priorities."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {outcomes.map((outcome) => (
              <article key={outcome.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <h2 className="text-lg font-semibold text-white">{outcome.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">{outcome.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="sample-reports" className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Sample reports"
            title="View the anatomy in a few seconds."
            body="Rather than explain how reports are produced, the samples show what a recipient actually sees: the summary, findings, evidence and next actions."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {sampleReports.map((report) => (
              <a key={report.title} href={report.href} className="group rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 transition hover:border-cyan-300/40 hover:bg-white/[0.055]">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/70">Dummy report</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{report.title}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-400">{report.text}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {report.sections.map((section) => <Tag key={section}>{section}</Tag>)}
                </div>
                <p className="mt-6 text-sm font-semibold text-cyan-100 group-hover:text-cyan-50">Open sample →</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What the report contains"
            title="Threat context, DNS analysis and remediation priorities."
            body="The value is in the contents: what is exposed, what is weak, what is being targeted and what should be fixed first."
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            {reportSections.map((section, index) => (
              <div key={section.title} className={`grid gap-5 p-5 md:grid-cols-[0.32fr_0.42fr_0.26fr] md:items-start ${index > 0 ? "border-t border-white/10" : ""}`}>
                <div>
                  <h3 className="text-xl font-semibold text-white">{section.title}</h3>
                </div>
                <p className="text-sm leading-6 text-slate-300">{section.sell}</p>
                <div className="flex flex-wrap gap-2">
                  {section.powers.map((item) => <Tag key={item}>{item}</Tag>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Report catalogue"
            title="Start with one domain, then understand the portfolio."
            body="The free report gives a useful single-domain analysis. Paid reports expand the scope to the domains an organisation owns and expose recurring weaknesses, inconsistent controls and systemic risk."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {reportTypes.map((item) => (
              <article key={item.title} className="flex min-h-[15rem] flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Sample findings"
            title="The report explains threat context, defence gaps and what to fix next."
            body="A useful report should not simply list records. It should explain the external threat context, the defence weakness, the likely owner and the next action."
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            {sampleFindings.map(([title, text], index) => (
              <div key={title} className={`grid gap-3 p-5 md:grid-cols-[0.28fr_0.72fr] ${index > 0 ? "border-t border-white/10" : ""}`}>
                <h3 className="text-sm font-semibold text-white">{title}</h3>
                <p className="text-sm leading-6 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Where reports lead"
            title="A report should create the next security action."
            body="The free report gives the single-domain baseline. Paid reports add portfolio-wide coverage, systemic risk analysis and recurring reporting across the domains an organisation owns."
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            {upgradePaths.map(([title, text], index) => (
              <div key={title} className={`grid gap-3 p-5 md:grid-cols-[0.28fr_0.72fr] ${index > 0 ? "border-t border-white/10" : ""}`}>
                <h3 className="text-sm font-semibold text-white">{title}</h3>
                <p className="text-sm leading-6 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Next step</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">View the sample, then get your own report.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            The dummy examples show the report anatomy. The free report applies the same structure to one domain using current Datazag intelligence.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="/#free-report" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Get my free report</a>
            <a href="#sample-reports" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">View sample reports</a>
          </div>
        </div>
      </section>
    </main>
  );
}

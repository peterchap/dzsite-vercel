import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Reports — Datazag",
  description:
    "Free domain reports, DNS and email posture reviews, platform exposure analysis and portfolio reporting powered by Datazag infrastructure intelligence.",
};

const outcomes = [
  {
    title: "Start with one domain",
    text: "Enter a work email and Datazag analyses the domain behind it. No asset list, questionnaire or scoping call is needed for the free report.",
  },
  {
    title: "See visible posture",
    text: "Review DNS, email controls, nameservers, MX providers, subdomains, platform footprint and obvious remediation priorities.",
  },
  {
    title: "Understand exposure",
    text: "Map the platforms and vendors visible from public records, then check relevant impersonation and infrastructure context.",
  },
  {
    title: "Move into monitoring",
    text: "Use the report to decide which domains, brands, platforms or suppliers should move into alerts, portfolio reporting or data sharing.",
  },
];

const reportSections = [
  {
    title: "DNS and email posture",
    sell: "Show whether the domain has the external trust controls needed to reduce spoofing, abuse and misconfiguration risk.",
    powers: ["SPF", "DKIM", "DMARC", "BIMI", "MTA-STS", "MX providers"],
  },
  {
    title: "Visible platform footprint",
    sell: "Identify email platforms, cloud services, SaaS providers, CDNs, nameservers and hosting patterns visible from public records.",
    powers: ["Email platform", "Cloud", "CDN", "Hosting", "Nameservers", "SaaS signals"],
  },
  {
    title: "Subdomain and infrastructure view",
    sell: "Surface public subdomains, provider relationships, hosting context and externally visible infrastructure patterns.",
    powers: ["Subdomains", "A/AAAA", "CNAMEs", "Hosting", "ASN", "Related infrastructure"],
  },
  {
    title: "Impersonation exposure",
    sell: "Check for suspicious domains, certificates, DNS activity and keyword-led infrastructure around relevant platforms and brands.",
    powers: ["Platform lures", "Brand terms", "Certificates", "DNS changes", "Suspicious keywords", "Evidence"],
  },
  {
    title: "Remediation priorities",
    sell: "Translate technical findings into clear actions for security, DNS, email, infrastructure and supplier owners.",
    powers: ["Risk ranking", "Evidence", "Next steps", "Owners", "Fix guidance", "Monitoring path"],
  },
];

const reportTypes = [
  {
    title: "Free Domain Health Report",
    text: "A single-domain view of DNS posture, email configuration, visible platforms and first impersonation signals.",
  },
  {
    title: "Executive Surface Report",
    text: "A plain-language summary for leadership, account reviews, board updates or customer-facing security conversations.",
  },
  {
    title: "Technical Remediation Report",
    text: "A deeper issue list for DNS, email, infrastructure and security teams with evidence and suggested fixes.",
  },
  {
    title: "Portfolio Report",
    text: "Recurring reporting across clients, subsidiaries, acquisition targets, suppliers, domains or brands.",
  },
  {
    title: "Partner-branded Report",
    text: "White-label or partner-led reporting for MSSPs, ESPs and service providers delivering reports under their own brand.",
  },
];

const flow = [
  { title: "Submit", text: "Start with a work email or agreed domain scope depending on the report type." },
  { title: "Map", text: "Resolve DNS, email posture, subdomains, providers, platforms and external infrastructure." },
  { title: "Check", text: "Compare posture and exposure against Datazag signals for impersonation, infrastructure risk and suspicious activity." },
  { title: "Explain", text: "Turn findings into evidence, plain-language summaries and remediation priorities." },
  { title: "Monitor", text: "Move important domains, brands, platforms or suppliers into alerts, portfolio views or data shares." },
];

const sampleFindings = [
  ["DMARC posture", "Is the domain protected by an enforcement policy, or still exposed through monitoring-only or missing controls?"],
  ["Mail platform", "Which provider appears to handle mail, and does the public DNS footprint match the expected setup?"],
  ["Visible vendors", "Which platforms, CDNs, hosting providers and SaaS relationships can be inferred from DNS and infrastructure?"],
  ["Impersonation context", "Are there suspicious domains, certificates or keyword-led patterns around the platforms and brands in scope?"],
  ["Remediation path", "What should be fixed first, who is likely to own it, and when should the domain move into continuous monitoring?"],
];

const upgradePaths = [
  ["Alerts", "Move priority brands, domains or platforms into live alerting for platform abuse, brand impersonation and suspicious infrastructure."],
  ["Portfolio reporting", "Track posture and exposure across clients, subsidiaries, suppliers, acquisition targets or domain portfolios."],
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
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/80">Free starting point</p>
        <h3 className="mt-3 text-2xl font-semibold text-white">Domain Health Report</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">A practical view of DNS, email posture, visible platforms, impersonation exposure and first remediation priorities.</p>
      </div>
      <div className="mx-auto h-8 w-px bg-cyan-300/30" />
      <div className="rounded-[1.5rem] border border-white/10 bg-[#050b22] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Powered by Datazag</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {["DNS", "Email posture", "Subdomains", "Platforms", "Vendors", "Certificates", "Infrastructure", "Remediation"].map((item) => (
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
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">See what the internet reveals about your domain.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Datazag reports turn public DNS, email, platform, certificate and infrastructure signals into a practical view of domain posture, exposure and remediation priorities.
            </p>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              Start with a free single-domain report, review the sample format, then move priority domains, brands or portfolios into alerts, recurring reports or cloud data shares.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/#free-report" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Get my free report</a>
              <a href="/reports/sample" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">See sample report</a>
            </div>
          </div>
          <ReportStackPanel />
        </div>
      </section>

      <section className="border-t border-white/10 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Report value"
            title="A useful first view without an asset list."
            body="The report is designed to be useful on its own and clear enough to show what should happen next."
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

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What the report includes"
            title="Posture, exposure and remediation in one view."
            body="The free report starts with the externally visible signals that security and infrastructure teams need to understand."
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
            title="Start free, then expand the scope."
            body="Different buyers need different report views: a quick domain check, an executive summary, a technical remediation queue or a recurring portfolio report."
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
            eyebrow="Report workflow"
            title="From one email address to decision-ready findings."
            body="The report turns external observations into evidence, summaries and actions that a security or infrastructure owner can use."
          />
          <div className="mt-12 rounded-[2rem] border border-white/10 bg-[#07102b]/80 p-5 md:p-7">
            <div className="grid gap-3 lg:grid-cols-5">
              {flow.map((step, index) => (
                <article key={step.title} className="relative rounded-2xl border border-white/10 bg-[#030619]/70 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] text-xs font-semibold text-cyan-100">{index + 1}</span>
                    {index < flow.length - 1 ? <span className="hidden text-cyan-200/40 lg:block">→</span> : null}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Sample findings"
            title="The report explains what changed, why it matters and what to do next."
            body="A good report should not simply list records. It should explain evidence, ownership and next actions."
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            {sampleFindings.map(([title, text], index) => (
              <div key={title} className={`grid gap-3 p-5 md:grid-cols-[0.28fr_0.72fr] ${index > 0 ? "border-t border-white/10" : ""}`}>
                <h3 className="text-sm font-semibold text-white">{title}</h3>
                <p className="text-sm leading-6 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <a href="/reports/sample" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">View the sample report</a>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Where reports lead"
            title="A report should create the next security action."
            body="The first report gives the baseline. The next step is usually monitoring, portfolio coverage, partner packaging or deeper data access."
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
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">Get the free report first.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Use one domain to see the quality of the data, the clarity of the findings and the remediation value. Review the sample report first if you want to see the format before submitting your own work email.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="/#free-report" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Get my free report</a>
            <a href="/reports/sample" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">See sample report</a>
          </div>
        </div>
      </section>
    </main>
  );
}

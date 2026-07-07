import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Reports — Datazag",
  description:
    "Start free with the Domain Health Report on one domain. The Domain Risk Report gives the full single-domain assessment; the Cross-Estate Domain Risk Report finds the estate you actually own and the systemic risk across it.",
};

// CTA routing per the amended WU19/WU20 buying model: the Domain Risk Report
// is a direct card buy (WU16; renders "Contact us" until that flow ships) and
// the Cross-Estate report is NEVER a bare buy — its CTA is the WU20 scope flow.
// The flip is env-gated: set NEXT_PUBLIC_SCOPE_LIVE=true when WU20 deploys and
// the copy/link switch to "Scope my estate" → portal /scope with no code change;
// default (off) keeps the "Talk to us about your estate" contact fallback.
const contactHref = "/contact";
const scopeLive = process.env.NEXT_PUBLIC_SCOPE_LIVE === "true";
const scopePortalUrl = process.env.NEXT_PUBLIC_SCOPE_URL || "https://portal.datazag.com/scope?src=reports";
const scopeEstateCta = scopeLive
    ? { label: "Scope my estate", href: scopePortalUrl }
    : { label: "Talk to us about your estate", href: contactHref };
const crossEstateSampleHref = "/samples/cross-estate-domain-risk-report.html";

const freeReportValue = [
  {
    title: "Threats targeting your platform footprint",
    text: "Identify external threat activity around the platforms, providers and vendors visible from your domain's public records.",
  },
  {
    title: "Detailed DNS defence analysis",
    text: "We check the baseline controls every domain should enforce (SPF, DKIM, DMARC), and show where the advanced and gold-standard layers (MTA-STS, TLS reporting, CAA, DNSSEC, BIMI) are available to you — as a maturity path, not a list of failures.",
  },
  {
    title: "Remediation priorities",
    text: "Translate findings into clear actions, likely owners and practical remediation effort so teams know what to fix first.",
  },
];

const discoveryTiers = [
  { name: "Declared", tag: "The domains you told us about", accent: "border-l-slate-400" },
  { name: "Strongly associated", tag: "High-confidence: you own these", accent: "border-l-emerald-400" },
  { name: "Possible", tag: "Medium-confidence: review these", accent: "border-l-amber-400" },
  { name: "Defensive", tag: "Consider recovering or monitoring", accent: "border-l-cyan-400" },
];

const crossEstateValue = [
  {
    title: "Estate discovery",
    text: "You declare the domains you know. Discovery walks certificate, mail and registration relationships to evidence the ones you don't — sorted into four confidence tiers (declared, strongly associated, possible, defensive) with the connection shown for every domain. No guesses; every finding carries its evidence.",
  },
  {
    title: "Systemic risk",
    text: "Some risk only exists across domains: how much of the estate depends on one provider (weighted by who that provider is — a majority on a hyperscale platform is a different risk from the same share on a commodity registrar), which weaknesses repeat across segments, which acquisitions sit below the group standard, and what expires next. The Cross-Estate report is built to show exactly this layer.",
  },
];

const domainReportAnatomy = [
  {
    title: "Platform-led threat exposure",
    sell: "Which visible platforms and providers are being used as lures, and which suspicious domains, certificates or DNS patterns are relevant to them?",
    powers: ["Platform lures", "Vendor footprint", "Brand terms", "Certificates", "DNS changes", "Evidence"],
  },
  {
    title: "DNS and email defence analysis",
    sell: "Which DNS and email records create spoofing, trust, routing or configuration weaknesses that should be fixed?",
    powers: ["Baseline: SPF · DKIM · DMARC", "Advanced: MTA-STS · TLS reporting", "Gold standard: CAA · DNSSEC · BIMI", "MX providers"],
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
  {
    title: "Technical remediation appendix",
    sell: "Current state, target state, paste-ready records, staged rollout.",
    powers: ["Current state", "Target state", "Paste-ready records", "Staged rollout"],
  },
];

const crossEstateAnatomy = [
  {
    title: "Estate discovery",
    sell: "Declared, strongly associated, possible, defensive. Every discovered domain carries its connection evidence: a shared certificate, a mail route, a registration record.",
  },
  {
    title: "Concentration & accumulation",
    sell: "The share of your estate on each provider, weighted by provider resilience and exit friction. The biggest number is not always the biggest finding — the report says which is which.",
  },
  {
    title: "Posture variance & correlated weakness",
    sell: "Which segments sit below the group standard, and what's wrong the same way everywhere. A weakness on one domain is a ticket; on half the estate it's a policy gap, and it gets fixed at policy level.",
  },
  {
    title: "Operational calendar & exception register",
    sell: "What expires next, what's already lapsed, and a single prioritised list of what to act on, in order.",
  },
  {
    title: "Remediation worksheet",
    sell: "An appendix your IT team executes: exact records per domain, staged where staging matters (DMARC before SPF hard-fail), grouped by the account that administers each zone so one team's work lands in one change window.",
  },
];

const sampleReports = [
  {
    title: "Sample free Domain Health Report",
    href: "/reports/sample#domain-health",
    text: "A sample one-domain report showing threat exposure around visible platforms, DNS defence gaps and first remediation priorities.",
    sections: ["Platform exposure", "Email control maturity", "DNS posture", "What to fix first"],
  },
  {
    title: "Sample Cross-Estate Domain Risk Report",
    href: crossEstateSampleHref,
    text: "A six-page assessment across a whole estate, opened by discovery — the domains you declared, plus the ones we found and can evidence — and closed by a worksheet your IT team can execute.",
    sections: ["Estate discovery", "Concentration & posture variance", "Exception register", "Remediation worksheet"],
  },
];

type CatalogueEntry = {
  title: string;
  note?: string;
  text: string;
  price?: string;
  cadence?: string;
  cta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

const reportTypes: CatalogueEntry[] = [
  {
    title: "Free Domain Health Report",
    text: "One domain. Platform-led threat exposure, detailed DNS defence analysis and first remediation priorities.",
    price: "Free",
    cta: { label: "Get your free report", href: "/#free-report" },
  },
  {
    title: "Domain Risk Report",
    note: "Single domain · paid",
    text: "The full assessment of one domain — yours, a client's, a vendor's, an acquisition target's. An executive core any board can read: threat exposure, defence posture, and the evidence behind every claim. Plus a technical remediation appendix your engineers execute: every finding with current state, target state, and paste-ready records, staged in the order a change should actually land.",
    price: "From £495",
    cadence: "per report",
    cta: { label: "Contact us", href: contactHref },
    secondaryCta: { label: "See pricing", href: "/pricing#reports" },
  },
  {
    title: "Cross-Estate Domain Risk Report",
    note: "Multi-domain · paid",
    text: "The same assessment at estate scope, opened by discovery: the domains you declared, the ones we found and can evidence, and the systemic layer no single-domain report can show — concentration, posture variance, correlated weakness, the operational calendar — closed by a worksheet grouped by the team that administers each zone. Variants for technical teams, and for insurance underwriting and M&A due diligence.",
    price: "Banded",
    cadence: "by domain count",
    cta: scopeEstateCta,
    secondaryCta: { label: "See the sample", href: crossEstateSampleHref },
  },
  {
    title: "Partner-branded reports",
    text: "White-label or partner-led reporting for MSSPs, ESPs and service providers delivering reports under their own brand. Any report in this catalogue, delivered under your brand.",
    price: "By agreement",
    cta: { label: "Talk to us", href: contactHref },
  },
];

const sampleFindings = [
  ["Platform threat exposure", "Which platforms and vendors are visible, and is suspicious infrastructure appearing around those lures?"],
  ["DNS defence gaps", "Which baseline controls (SPF, DKIM, DMARC) need enforcing first, and which advanced and gold-standard layers (MTA-STS, TLS reporting, CAA, DNSSEC, BIMI) are available next on the maturity path?"],
  ["Mail platform alignment", "Does the public DNS footprint match the expected email platform and sender configuration?"],
  ["Systemic portfolio risk", "For paid reports, are the same weaknesses repeated across many domains, brands, subsidiaries or suppliers?"],
  ["Remediation plan", "What should be fixed first, who is likely to own it, and what level of effort or cost should be expected?"],
  ["Discovery evidence", "You declared 9 domains. Discovery evidenced 24 — including one expired acquisition name available for anyone to register."],
  ["Concentration weighting", "64% of the estate sits on one commodity registrar with no transfer locks — while the 79% certificate-authority concentration is a config change to leave. The report ranks which concentration is the finding."],
];

const upgradePaths = [
  ["Alerts", "Move priority brands, domains or platforms into live alerting for platform abuse, brand impersonation and suspicious infrastructure."],
  ["Estate monitoring", "A report is the map on the day it runs. Under monitoring, discovery re-walks the estate every run — new domains join automatically, candidates queue for your confirmation, and the grade trend shows whether remediation is landing. The live feed covers what happens between runs."],
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

function AnatomyColumn({ eyebrow, title, blocks }: { eyebrow: string; title: string; blocks: { title: string; sell: string; powers?: string[] }[] }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
      <div className="border-b border-white/10 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/70">{eyebrow}</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">{title}</h3>
      </div>
      {blocks.map((block, index) => (
        <div key={block.title} className={`p-5 ${index > 0 ? "border-t border-white/10" : ""}`}>
          <h4 className="text-lg font-semibold text-white">{block.title}</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">{block.sell}</p>
          {block.powers ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {block.powers.map((item) => <Tag key={item}>{item}</Tag>)}
            </div>
          ) : null}
        </div>
      ))}
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
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">See the threats and defence gaps around your domains — including the ones you don't know you own.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Start free on a single domain. The Cross-Estate Domain Risk Report then walks certificate, mail and registration relationships to find the rest of your estate — and shows you the risk that only appears when you look across it.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/#free-report" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Get your free report</a>
              <a href="#catalogue" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">See the paid reports</a>
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
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {freeReportValue.map((outcome) => (
              <article key={outcome.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <h2 className="text-lg font-semibold text-white">{outcome.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">{outcome.text}</p>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center text-base leading-7 text-slate-300 md:text-lg md:leading-8">
            The free report covers one domain. Most organisations own more than they think — that's the first thing the Cross-Estate report shows you.
          </p>
        </div>
      </section>

      <section id="cross-estate" className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Cross-Estate Domain Risk Report"
            title="You've seen what one domain looks like. This is what the estate looks like."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {discoveryTiers.map((tier) => (
              <div key={tier.name} className={`rounded-xl border border-white/10 border-l-[3px] bg-white/[0.035] px-4 py-3 ${tier.accent}`}>
                <p className="text-sm font-semibold text-white">{tier.name}</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">{tier.tag}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {crossEstateValue.map((outcome) => (
              <article key={outcome.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <h2 className="text-lg font-semibold text-white">{outcome.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">{outcome.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={scopeEstateCta.href} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">{scopeEstateCta.label}</a>
            <a href={crossEstateSampleHref} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">See the sample</a>
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
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/70">Sample report</p>
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
          <div className="mt-12 grid gap-5 lg:grid-cols-2 lg:items-start">
            <AnatomyColumn eyebrow="Single domain" title="Domain Risk Report" blocks={domainReportAnatomy} />
            <AnatomyColumn eyebrow="Multi-domain" title="Cross-Estate Domain Risk Report" blocks={crossEstateAnatomy} />
          </div>
        </div>
      </section>

      <section id="catalogue" className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Report catalogue"
            title="Start with one domain, then understand the estate."
            body="The free report gives a useful single-domain analysis. Paid reports expand the scope to the domains an organisation owns and expose recurring weaknesses, inconsistent controls and systemic risk."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {reportTypes.map((item) => (
              <article key={item.title} className="flex min-h-[15rem] flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                {item.note ? <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/70">{item.note}</p> : null}
                <h3 className={`text-xl font-semibold text-white ${item.note ? "mt-2" : ""}`}>{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{item.text}</p>
                <div className="mt-auto flex flex-col gap-2 pt-5">
                  {item.price ? (
                    <div className="flex items-end gap-1.5 pb-1">
                      <span className="text-2xl font-semibold tracking-tight text-white">{item.price}</span>
                      {item.cadence ? <span className="pb-0.5 text-xs text-slate-400">{item.cadence}</span> : null}
                    </div>
                  ) : null}
                  <a href={item.cta.href} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-cyan-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">{item.cta.label}</a>
                  {item.secondaryCta ? (
                    <a href={item.secondaryCta.href} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-4 text-sm font-semibold text-white transition hover:bg-white/[0.08]">{item.secondaryCta.label}</a>
                  ) : null}
                </div>
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
            body="The free report gives the single-domain baseline. Paid reports add estate-wide coverage, systemic risk analysis and recurring reporting across the domains an organisation owns."
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
            The sample examples show the report anatomy. The free report applies the same structure to one domain using current Datazag intelligence.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="/#free-report" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Get my free report</a>
            <a href={scopeEstateCta.href} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">{scopeEstateCta.label}</a>
          </div>
          <p className="mt-6 text-sm">
            <a href={crossEstateSampleHref} className="font-semibold text-cyan-100 hover:text-cyan-50">See a sample Cross-Estate report →</a>
          </p>
        </div>
      </section>
    </main>
  );
}

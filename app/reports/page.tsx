import type { Metadata } from "next";

import ProductConceptPage from "@/components/sections/blocks/ProductConceptPage";

export const metadata: Metadata = {
  title: "Reports — Datazag",
  description:
    "Free external platform threat reports, domain health checks and portfolio reporting for security teams, partners and executives.",
};

export default function ReportsPage() {
  return (
    <ProductConceptPage
      eyebrow="Free Domain Report"
      title="Get a free report on what the internet reveals about your domain."
      intro="Enter your work email and Datazag analyses the domain behind it. The report shows your external DNS and email posture, visible platforms and vendors, and early signs of impersonation risk around the infrastructure your organisation depends on."
      primaryCta={{ label: "Get my free report", href: "/#free-report" }}
      secondaryCta={{ label: "See alerting", href: "/alerts" }}
      proof={[
        { title: "No asset list", text: "Start with a work email. We derive the domain and analyse what is externally visible." },
        { title: "DNS and email posture", text: "Review SPF, DKIM, DMARC, BIMI, MTA-STS, nameservers, MX providers and common configuration gaps." },
        { title: "Platform footprint", text: "Identify visible email, cloud, SaaS, CDN, hosting and vendor infrastructure from public records." },
        { title: "Impersonation exposure", text: "See whether suspicious infrastructure is forming around the platforms and brands your organisation relies on." },
      ]}
      narrative={{
        kicker: "Why get the report",
        title: "It is a useful security check and a live demonstration of Datazag intelligence.",
        body: [
          "A domain leaves a visible trail: DNS records, mail configuration, subdomains, providers, SaaS platforms, cloud footprints and infrastructure relationships. Attackers can inspect those signals. Most organisations do not review them often enough.",
          "The free report turns those external signals into a plain-language view of your domain. It shows what is visible, what looks weak, which platforms can be inferred, and whether there are early impersonation signals around the platforms and brands connected to your organisation.",
          "It is also a demonstration of the Datazag dataset. The same intelligence that powers the report can be used for real-time alerts, portfolio reporting, cloud data shares and partner-delivered security services.",
        ],
      }}
      flowTitle="From one email address to a decision-ready report."
      flow={[
        { title: "Enter email", text: "Submit a work email. No asset list, questionnaire or scoping call is needed for the free report." },
        { title: "Map domain", text: "Resolve DNS, mail, subdomains, providers, visible platforms, cloud footprints and exposed infrastructure." },
        { title: "Check risk", text: "Assess DNS and email posture, platform exposure, impersonation context and obvious remediation priorities." },
        { title: "Get report", text: "Receive a practical report that shows findings, evidence, remediation steps and upgrade paths." },
      ]}
      alertTypeSection={{
        kicker: "What the free report includes",
        title: "A practical snapshot of your external security posture.",
        intro: "The free report is designed to be useful on its own. It does not try to replace a full audit, but it gives a clear first view of the signals attackers can see from outside your organisation.",
        stats: [
          { title: "DNS", text: "records, nameservers, MX and visible configuration." },
          { title: "Platforms", text: "inferred email, cloud, SaaS, CDN and vendor footprint." },
          { title: "Threat", text: "impersonation and suspicious infrastructure context." },
        ],
        types: [
          {
            title: "DNS and email posture",
            subtitle: "Trust controls",
            coverage: "SPF, DKIM, DMARC, BIMI, MTA-STS, MX records, nameservers and related configuration signals.",
            action: "Use this section to identify obvious weaknesses and prioritise remediation with the right technical owner.",
            text: "Email and DNS controls are often the first external trust signals a security team needs to fix. The report explains the issue, the evidence and the practical next step.",
            evidence: [
              "DMARC enforcement status and policy posture",
              "SPF and DKIM presence and alignment checks",
              "MX provider and mail platform inference",
              "Suggested remediation steps for weak or missing controls",
            ],
          },
          {
            title: "Platform and vendor footprint",
            subtitle: "Visible dependencies",
            coverage: "Email platforms, SaaS providers, cloud services, hosting providers, CDNs, nameservers and supplier infrastructure inferred from public records.",
            action: "Use this section to understand which third-party platforms are externally visible and could become impersonation lures.",
            text: "Attackers often impersonate the platforms an organisation already uses. Mapping the visible platform footprint helps explain which lures are more relevant to that organisation.",
            evidence: [
              "Detected mail, cloud, CDN and hosting providers",
              "SaaS and platform indicators from DNS and infrastructure patterns",
              "Vendor and supplier infrastructure signals",
              "Context for platform-led impersonation monitoring",
            ],
          },
          {
            title: "Impersonation and remediation",
            subtitle: "Threat context",
            coverage: "Suspicious infrastructure around detected platforms, customer brand terms, keyword-led subdomains and related hosting or certificate activity.",
            action: "Use this section to decide whether to remediate DNS, investigate suspicious infrastructure or move into continuous alerting.",
            text: "The report connects posture findings with external threat context. It shows not only what is misconfigured, but also what attackers may already be preparing around the platforms and brands in scope.",
            evidence: [
              "Platform or brand impersonation context",
              "Suspicious domain, certificate, DNS or hosting signals",
              "Risk-ranked remediation recommendations",
              "Suggested upgrade path into real-time alerts or portfolio monitoring",
            ],
          },
        ],
        note: "The free report is the fastest way to see the kind of intelligence Datazag provides. Paid reports add deeper evidence, historical context, portfolio coverage, executive summaries and technical remediation queues.",
      }}
      exampleAlert={{
        kicker: "Example free report output",
        title: "A finding should explain the issue, evidence and next step.",
        intro: "The report should not overwhelm the reader with raw DNS records. It should turn records and infrastructure context into findings that are clear enough for a business owner and specific enough for a technical owner.",
        severity: "REPORT | HIGH",
        status: "Email Authentication Gap",
        domain: "examplebrand.com",
        fields: [
          { label: "Finding ID", value: "RPT-placeholder-001" },
          { label: "Category", value: "DNS and email posture" },
          { label: "Signal", value: "DMARC policy not enforcing" },
          { label: "Observed record", value: "p=none" },
          { label: "Risk", value: "Domain can be easier to abuse for spoofing" },
          { label: "Priority", value: "High" },
          { label: "Remediation", value: "Move toward quarantine or reject after monitoring" },
          { label: "Owner", value: "Email / DNS administration" },
        ],
        reasons: [
          "DMARC record exists but does not enforce policy",
          "SPF and DKIM should be reviewed before tightening enforcement",
          "Mail platform footprint detected from MX and related DNS",
          "Finding can be used as a remediation task or tracked in portfolio reporting",
        ],
        latency: "Report finding generated from external DNS and platform analysis",
      }}
      secondaryExampleAlert={{
        kicker: "Example data demonstration",
        title: "The report shows the data layers behind Datazag.",
        intro: "The free report is also a controlled sample of the intelligence layer: public DNS, platform mapping, infrastructure relationships, impersonation signals and remediation logic in one output.",
        severity: "DATA | SAMPLE",
        status: "External Footprint Mapped",
        domain: "examplebrand.com",
        fields: [
          { label: "DNS layer", value: "A, AAAA, MX, TXT, NS and related records" },
          { label: "Mail layer", value: "Mail platform, SPF, DKIM, DMARC and authentication posture" },
          { label: "Platform layer", value: "Visible SaaS, cloud, CDN, hosting and supplier indicators" },
          { label: "Threat layer", value: "Platform, brand and keyword infrastructure context" },
          { label: "Remediation layer", value: "Prioritised next steps with technical owner guidance" },
          { label: "Upgrade path", value: "Real-time alerts, portfolio monitoring or cloud data access" },
          { label: "Audience", value: "Security, IT, compliance, executives or account teams" },
          { label: "Scope", value: "Single domain first, portfolio later" },
        ],
        reasons: [
          "Shows the external signals available without internal access",
          "Demonstrates how Datazag maps platforms and infrastructure from public data",
          "Connects technical posture to impersonation and remediation context",
          "Creates a natural path from a free report into paid reporting, alerts or data products",
        ],
        latency: "Free report output acts as a sample of the wider Datazag intelligence graph",
      }}
      packagesTitle="Where the free report leads."
      packages={[
        { title: "Free external platform threat report", text: "Single-domain report covering DNS posture, visible platforms, impersonation context and first remediation steps." },
        { title: "Domain health report", text: "Deeper DNS, email, subdomain, provider and infrastructure posture reporting for one organisation." },
        { title: "Portfolio report", text: "Recurring reporting across many domains, clients, subsidiaries, suppliers, brands or acquisition targets." },
        { title: "Executive summary", text: "Board-friendly summary of exposure, priority findings and movement since the last report." },
        { title: "Technical remediation queue", text: "Actionable findings for DNS, email, security and infrastructure owners." },
        { title: "Monitoring upgrade", text: "Move priority domains or brands from reporting into real-time alerts and evidence capture." },
      ]}
      finalTitle="Get the free report first."
      finalBody="Use one domain to see the quality of the data, the clarity of the findings and the remediation value. Then decide whether to expand into domain health reporting, portfolio monitoring, real-time alerts or cloud data access."
    />
  );
}

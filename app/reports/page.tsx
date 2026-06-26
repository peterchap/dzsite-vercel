import type { Metadata } from "next";

import ProductConceptPage from "@/components/sections/blocks/ProductConceptPage";

export const metadata: Metadata = {
  title: "Reports — Datazag",
  description:
    "External platform threat reports, domain health checks and portfolio reporting for security teams, partners and executives.",
};

export default function ReportsPage() {
  return (
    <ProductConceptPage
      eyebrow="Health and Portfolio Reports"
      title="Show what the internet already reveals about an organisation."
      intro="Datazag reports turn external infrastructure, DNS posture, platform exposure and impersonation signals into clear findings for security teams, executives, customers and portfolio owners."
      primaryCta={{ label: "Get a free report", href: "/#free-report" }}
      secondaryCta={{ label: "See alerting", href: "/alerts" }}
      proof={[
        { title: "Free entry point", text: "A single-domain report gives prospects immediate value without an asset list, scoping call or questionnaire." },
        { title: "DNS and email posture", text: "Assess SPF, DKIM, DMARC, BIMI, MTA-STS, nameservers, MX providers and related configuration weaknesses." },
        { title: "Platform exposure", text: "Identify visible platforms, SaaS vendors, email systems, cloud providers and supplier infrastructure from the domain footprint." },
        { title: "Portfolio view", text: "Extend the same report logic across clients, subsidiaries, suppliers, acquisition targets or managed customer estates." },
      ]}
      narrative={{
        kicker: "The problem",
        title: "Most organisations cannot see the external trust signals attackers use against them.",
        body: [
          "A company may know its main domain, but not all of the DNS, subdomains, mail controls, platforms, suppliers and infrastructure signals that shape its real external risk.",
          "The report is designed to answer two practical questions: what can attackers see from the outside, and what has already been built to exploit the platforms and brands an organisation depends on?",
          "The free report creates a useful first view. The paid reports go deeper into remediation, evidence, historical context and portfolio-wide prioritisation.",
        ],
      }}
      flowTitle="From domain to decision-ready report."
      flow={[
        { title: "Discover", text: "Start from a domain, portfolio, client list, subsidiary group, vendor set or acquisition target." },
        { title: "Map", text: "Resolve DNS, mail, subdomains, platforms, providers, cloud footprints and exposed infrastructure." },
        { title: "Assess", text: "Check posture, impersonation exposure, infrastructure risk, configuration gaps and remediation priority." },
        { title: "Report", text: "Deliver findings for technical remediation, executive visibility, customer reporting or portfolio governance." },
      ]}
      alertTypeSection={{
        kicker: "Report types",
        title: "One intelligence base, three report products.",
        intro: "The reports should create a simple path: a useful free report for one domain, a deeper domain health report for one organisation, and portfolio reporting for teams responsible for many domains, clients, suppliers or companies.",
        stats: [
          { title: "1 domain", text: "Free report for lead capture and immediate external visibility." },
          { title: "1 organisation", text: "Deeper domain health report with remediation and evidence." },
          { title: "Many domains", text: "Portfolio reporting across customers, subsidiaries, vendors or acquisition targets." },
        ],
        types: [
          {
            title: "Free external platform threat report",
            subtitle: "Lead report",
            coverage: "One submitted work email domain, external DNS and visible platform footprint.",
            action: "Show immediate findings, collect consent, and create a clear path to remediation or monitoring.",
            text: "This is the low-friction entry point. The user gives a work email, Datazag derives the domain, analyses the external posture and shows the issues that are visible without asking for an asset list.",
            evidence: [
              "DNS and mail posture summary",
              "Detected platforms and visible vendor footprint",
              "Initial impersonation exposure around those platforms",
              "Priority remediation steps for obvious weaknesses",
            ],
          },
          {
            title: "Domain health report",
            subtitle: "Organisation report",
            coverage: "One organisation, its core domains, subdomains, DNS, mail posture, platforms and infrastructure exposure.",
            action: "Provide technical remediation, executive summary and a baseline for ongoing alerts.",
            text: "This report goes deeper than the free report. It gives the security or IT team a more complete view of their external posture and turns findings into a prioritised remediation queue.",
            evidence: [
              "SPF, DKIM, DMARC, BIMI and MTA-STS posture",
              "Subdomain and exposed service findings",
              "Provider, platform and cloud footprint mapping",
              "Risk-ranked remediation backlog",
            ],
          },
        ],
        note: "The portfolio report is the same intelligence model applied at scale: many domains, many owners and a recurring view of what changed. That makes it suitable for MSSPs, agencies, insurers, portfolio companies, supplier-risk teams and M&A due diligence.",
      }}
      exampleAlert={{
        kicker: "Example report finding",
        title: "What a single report finding can look like.",
        intro: "The report should not overwhelm the reader with raw DNS records. It should turn records and infrastructure context into a finding that explains the issue, the evidence and the next step.",
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
        kicker: "Example portfolio view",
        title: "What portfolio reporting adds.",
        intro: "Portfolio reporting is not just many PDFs. It is a recurring view of which domains, clients or companies need attention first, and which issues are changing over time.",
        severity: "PORTFOLIO | PRIORITY",
        status: "Remediation Queue Generated",
        domain: "120 monitored domains",
        fields: [
          { label: "Scope", value: "Clients, subsidiaries, suppliers or acquisition targets" },
          { label: "High priority", value: "Domains with mail-authentication gaps or live impersonation evidence" },
          { label: "Medium priority", value: "Domains with weak DNS posture, exposed services or platform-risk signals" },
          { label: "Trend", value: "New, resolved and recurring findings separated" },
          { label: "Output", value: "Executive summary and technical remediation queue" },
          { label: "Cadence", value: "One-off, monthly or continuous" },
          { label: "Audience", value: "Security, IT, compliance, account teams or portfolio owners" },
          { label: "Next step", value: "Move high-risk domains into alerting or remediation workflow" },
        ],
        reasons: [
          "Shows which domains need attention first",
          "Separates posture weaknesses from active impersonation evidence",
          "Supports customer, board, insurer, supplier-risk and M&A reporting",
          "Creates a path from static report into continuous monitoring",
        ],
        latency: "Portfolio findings updated as the external footprint changes",
      }}
      packagesTitle="Report products."
      packages={[
        { title: "Free external platform threat report", text: "Single-domain entry report covering DNS posture, visible platforms and early impersonation exposure." },
        { title: "Domain health report", text: "Deeper DNS, email, subdomain, provider and infrastructure posture reporting for one organisation." },
        { title: "Portfolio report", text: "Recurring reporting across many domains, clients, subsidiaries, suppliers, brands or acquisition targets." },
        { title: "Executive summary", text: "Board-friendly summary of exposure, priority findings and movement since the last report." },
        { title: "Technical remediation queue", text: "Actionable findings for DNS, email, security and infrastructure owners." },
        { title: "Monitoring upgrade", text: "Move priority domains or brands from reporting into real-time alerts and evidence capture." },
      ]}
      finalTitle="Start with one domain. Expand to the whole portfolio."
      finalBody="The free report gives a fast view of one organisation. Portfolio reporting extends the same intelligence across customers, companies, subsidiaries, suppliers, vendors or brands."
    />
  );
}

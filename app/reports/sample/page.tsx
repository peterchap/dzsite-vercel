import type { Metadata } from "next";

import ProductConceptPage from "@/components/sections/blocks/ProductConceptPage";

export const metadata: Metadata = {
  title: "Sample Domain Report — Datazag",
  description:
    "A sample Datazag domain report showing DNS and email posture, platform footprint, impersonation exposure, remediation steps and upgrade paths.",
};

export default function SampleReportPage() {
  return (
    <ProductConceptPage
      eyebrow="Sample Report"
      title="See what a free domain report can show."
      intro="This sample illustrates the kind of external security and infrastructure findings Datazag can return from a work email domain: DNS posture, mail controls, platform footprint, impersonation exposure and practical remediation steps."
      primaryCta={{ label: "Get my free report", href: "/#free-report" }}
      secondaryCta={{ label: "Back to reports", href: "/reports" }}
      proof={[
        { title: "No asset list", text: "The starting point is a work email domain. Datazag maps what is externally visible from public infrastructure." },
        { title: "Plain-English findings", text: "The report explains what was found, why it matters and what to fix first." },
        { title: "Evidence-backed", text: "Findings are tied to DNS, mail, hosting, platform, certificate and impersonation context where available." },
        { title: "Upgrade-ready", text: "The free report can lead into monitoring, alerts, portfolio reporting, API access or data shares." },
      ]}
      narrative={{
        kicker: "Sample only",
        title: "A report should make external exposure understandable without a scoping call.",
        body: [
          "Most organisations have a visible external footprint they do not fully track: email controls, DNS records, SaaS and cloud dependencies, hosting relationships, platform usage and infrastructure that may already be impersonating the brands or platforms they rely on.",
          "The free Datazag report is designed to give a practical first view of that footprint. It should be clear enough for a business owner or executive to understand, but specific enough for a technical team to act on.",
          "This sample is illustrative. Live report contents depend on the domain, what is visible externally, which records are present, and which signals are active at the time the report is generated.",
        ],
      }}
      flowTitle="What the sample report covers."
      flow={[
        { title: "Identify", text: "Use the submitted work email to identify the organisation domain and its externally visible infrastructure." },
        { title: "Assess", text: "Check DNS, mail authentication, hosting, platform footprint, certificates and obvious posture gaps." },
        { title: "Correlate", text: "Compare detected platforms and naming patterns with impersonation and infrastructure intelligence." },
        { title: "Explain", text: "Return findings, evidence, severity, remediation steps and options for monitoring or deeper analysis." },
      ]}
      wideFlowLayout
      alertTypeSection={{
        kicker: "Report sections",
        title: "The report is structured around what the recipient can understand and act on.",
        intro: "The free version should show enough useful value to justify the exchange, while leaving clear paths into paid monitoring, portfolio reporting, alerts, API enrichment or data-share access.",
        stats: [
          { title: "Posture", text: "DNS, email and external hygiene." },
          { title: "Footprint", text: "platforms, vendors and providers." },
          { title: "Exposure", text: "impersonation and remediation context." },
        ],
        types: [
          {
            title: "DNS and email posture",
            subtitle: "Security hygiene",
            coverage: "SPF, DKIM, DMARC, MX, NS, registrar, TLS/certificate context and visible DNS configuration.",
            action: "Highlight gaps that affect spoofing, deliverability, domain trust and basic internet-facing security hygiene.",
            text: "This section should be practical. The goal is to show whether the domain has the basic records and policies that reduce spoofing and improve trust with mail providers and recipients.",
            evidence: [
              "DMARC policy and alignment indicators",
              "SPF and DKIM presence where visible",
              "MX and nameserver provider context",
              "Plain-language remediation priority",
            ],
          },
          {
            title: "Platform and vendor footprint",
            subtitle: "What the domain appears to use",
            coverage: "Mail providers, SaaS, cloud, CDN, hosting, collaboration tools, support platforms and other vendor/provider signals inferred from DNS and public infrastructure.",
            action: "Show which platforms may expose the organisation to impersonation, supplier dependency or customer-trust risk.",
            text: "Attackers often impersonate the platforms an organisation actually uses. Mapping that footprint makes the report more relevant than generic brand monitoring.",
            evidence: [
              "Detected mail and SaaS providers",
              "Cloud/CDN/hosting context where visible",
              "Platform categories relevant to impersonation",
              "Signals suitable for follow-up monitoring",
            ],
          },
          {
            title: "Impersonation exposure",
            subtitle: "External threat context",
            coverage: "Platform impersonation, brand naming patterns, suspicious keyword infrastructure, lookalike domains and infrastructure context where available.",
            action: "Explain what suspicious external infrastructure has been observed and whether the right response is monitor, block, investigate or request a deeper review.",
            text: "The free report should not overstate certainty. It should separate posture gaps from external threat signals and show the evidence behind any finding.",
            evidence: [
              "Platform or brand match context",
              "Suspicious naming or keyword signals",
              "Hosting, ASN or certificate context",
              "Escalation path for evidence packs and alerts",
            ],
          },
          {
            title: "Remediation and next steps",
            subtitle: "Action plan",
            coverage: "Priority fixes, suggested checks, monitoring options, evidence-pack escalation, portfolio reporting and alerting upgrade paths.",
            action: "Give the recipient a small number of next steps that can be acted on by IT, security, leadership or a partner provider.",
            text: "A good report should not only diagnose. It should make the next action obvious, whether that is tightening DMARC, reviewing a provider dependency, monitoring a platform or asking for a deeper portfolio view.",
            evidence: [
              "Prioritised recommendations",
              "Business-readable summary",
              "Technical remediation notes",
              "Upgrade path to monitoring or evidence-led response",
            ],
          },
        ],
        note: "The sample is intentionally generic. Live findings should be generated from the submitted domain and current Datazag intelligence, not from static claims.",
      }}
      exampleAlert={{
        kicker: "Example finding",
        title: "Email authentication gap.",
        intro: "This is an example of a useful free-report finding: specific enough for a technical team to validate, but written clearly enough for a non-specialist recipient to understand the risk.",
        severity: "REPORT | HIGH",
        status: "DMARC Policy Not Enforcing",
        domain: "example-business.co.uk",
        fields: [
          { label: "Finding", value: "DMARC record present but policy is not enforcing" },
          { label: "Observed policy", value: "p=none" },
          { label: "Why it matters", value: "Attackers may have an easier path to spoofing the domain if other controls are weak or misaligned" },
          { label: "Recipient impact", value: "Customers and staff may find it harder to distinguish legitimate mail from impersonation" },
          { label: "Suggested next step", value: "Review SPF/DKIM alignment, monitor failures, then move gradually towards quarantine or reject" },
          { label: "Owner", value: "IT, security, MSP or email administrator" },
          { label: "Evidence", value: "DNS TXT record and mail-authentication posture" },
          { label: "Upgrade path", value: "Monitor spoofing, platform impersonation and suspicious infrastructure around detected vendors" },
        ],
        reasons: [
          "The finding is based on externally visible DNS records",
          "The risk is explainable without requiring internal telemetry",
          "The remediation path can be staged rather than disruptive",
          "The same domain can be monitored for related impersonation activity",
        ],
        latency: "Sample finding — live report values depend on the submitted domain",
      }}
      secondaryExampleAlert={{
        kicker: "Example footprint",
        title: "Detected platforms and why they matter.",
        intro: "The report should connect platform footprint to risk. If a company uses Microsoft, Google, Shopify, Stripe, Zendesk, HubSpot or similar platforms, attackers may impersonate those relationships rather than only the company's own brand.",
        severity: "REPORT | FOOTPRINT",
        status: "Platform Footprint Mapped",
        domain: "example-business.co.uk",
        fields: [
          { label: "Email platform", value: "Microsoft 365 indicators detected" },
          { label: "Collaboration", value: "Microsoft / cloud collaboration footprint inferred" },
          { label: "Payments", value: "Payment-platform review recommended if customer links are used" },
          { label: "Support / CRM", value: "Support or CRM platform checks available in expanded report" },
          { label: "Hosting", value: "Hosting and CDN context can be joined to infrastructure risk" },
          { label: "Impersonation relevance", value: "Attackers often spoof platforms the organisation already uses" },
          { label: "Monitoring option", value: "Track platform impersonation, brand naming and suspicious keyword infrastructure" },
          { label: "Partner option", value: "MSSPs and ESPs can package this as a customer-facing report" },
        ],
        reasons: [
          "Platform impersonation can be more common than direct brand impersonation",
          "Detected vendor footprint makes external threat context more relevant",
          "Customers can see risks tied to tools they actually use",
          "Expanded monitoring can watch for new infrastructure around those platforms",
        ],
        latency: "Sample footprint — platform detection depends on public records and available signals",
      }}
      tertiaryExampleAlert={{
        kicker: "Example remediation summary",
        title: "A useful report ends with a short action plan.",
        intro: "The sample report should avoid overwhelming the recipient. A small, ranked set of actions is more useful than a long technical dump.",
        severity: "REPORT | ACTION PLAN",
        status: "Priority Remediation Summary",
        domain: "example-business.co.uk",
        fields: [
          { label: "Priority 1", value: "Move email authentication towards enforcement after alignment review" },
          { label: "Priority 2", value: "Confirm ownership and configuration of detected mail, DNS and hosting providers" },
          { label: "Priority 3", value: "Monitor suspicious domains using detected platform and brand terms" },
          { label: "Priority 4", value: "Review any high-risk hosting, ASN or provider dependencies found in expanded data" },
          { label: "Business summary", value: "External controls are partially visible and should be tightened before impersonation risk increases" },
          { label: "Technical summary", value: "DNS and mail posture review recommended before policy enforcement" },
          { label: "Monitoring", value: "Alerts available for platform, brand and keyword-led suspicious infrastructure" },
          { label: "Data option", value: "Portfolio, API or cloud data-share packages available for recurring analysis" },
        ],
        reasons: [
          "Prioritised actions help convert findings into remediation",
          "Business and technical summaries support different readers",
          "Monitoring bridges the gap between a one-off report and ongoing defence",
          "Partners can reuse the same structure for branded customer reports",
        ],
        latency: "Sample action plan — final recommendations depend on actual report findings",
      }}
      packagesTitle="What the real report can lead to."
      packages={[
        { title: "One-off free report", text: "A practical external snapshot of one domain's posture, footprint and exposure." },
        { title: "Domain health report", text: "A deeper technical report covering DNS, email, provider and remediation context." },
        { title: "Threat alerts", text: "Ongoing monitoring for platform, brand and keyword-led suspicious infrastructure." },
        { title: "Evidence packs", text: "Screenshots, abuse contacts and lifecycle context for brand impersonation or takedown workflows." },
        { title: "Portfolio reporting", text: "Repeatable reports across customers, subsidiaries, suppliers, brands or acquired assets." },
        { title: "API and data shares", text: "Infrastructure intelligence delivered into customer systems, warehouses or partner services." },
      ]}
      finalTitle="Ready to see your own domain?"
      finalBody="Use a work email to generate a free report on the domain behind it. The sample shows the structure; the live report uses current Datazag intelligence for your own domain."
    />
  );
}

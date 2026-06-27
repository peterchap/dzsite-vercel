import type { Metadata } from "next";

import ProductConceptPage from "@/components/sections/blocks/ProductConceptPage";

export const metadata: Metadata = {
  title: "Sample Domain Report — Datazag",
  description:
    "A sample Datazag domain report showing DNS and email posture, subdomain discovery, platform footprint, impersonation exposure, remediation steps and upgrade paths.",
};

export default function SampleReportPage() {
  return (
    <ProductConceptPage
      eyebrow="Sample Report"
      title="See what a free domain report can show."
      intro="This sample illustrates the kind of external security and infrastructure findings Datazag can return from a work email domain: DNS posture, mail controls, subdomain discovery, platform footprint, impersonation exposure and practical remediation steps."
      primaryCta={{ label: "Get my free report", href: "/#free-report" }}
      secondaryCta={{ label: "Back to reports", href: "/reports" }}
      proof={[
        { title: "No asset list", text: "The starting point is a work email domain. Datazag maps what is externally visible from public infrastructure." },
        { title: "Subdomain discovery", text: "The report can surface visible subdomains, derive platform usage and flag issues such as hanging CNAMEs." },
        { title: "External threat", text: "Detected platform usage can be compared with external impersonation infrastructure targeting those same platforms." },
        { title: "Actionable output", text: "Findings are written with evidence, remediation steps and upgrade paths into monitoring or evidence-led response." },
      ]}
      narrative={{
        kicker: "Sample only",
        title: "A report should make external exposure understandable without a scoping call.",
        body: [
          "Most organisations have a visible external footprint they do not fully track: email controls, DNS records, subdomains, SaaS and cloud dependencies, hosting relationships, platform usage and infrastructure that may already be impersonating the brands or platforms they rely on.",
          "The free Datazag report is designed to give a practical first view of that footprint. It should be clear enough for a business owner or executive to understand, but specific enough for a technical team to act on.",
          "This sample is illustrative. Live report contents depend on the domain, what is visible externally, which records are present, which subdomains are discovered, and which threat signals are active at the time the report is generated.",
        ],
      }}
      flowTitle="What the sample report covers."
      flow={[
        { title: "Discover", text: "Use the submitted work email to identify the organisation domain, visible subdomains and externally observable infrastructure." },
        { title: "Assess", text: "Check DNS, mail authentication, CNAMEs, hosting, platform footprint, certificates and obvious posture gaps." },
        { title: "Correlate", text: "Compare detected platforms, subdomain patterns and naming signals with impersonation and infrastructure intelligence." },
        { title: "Explain", text: "Return findings, evidence, severity, remediation steps and options for monitoring or deeper analysis." },
      ]}
      wideFlowLayout
      alertTypeSection={{
        kicker: "Report sections",
        title: "The report is structured around what the recipient can understand and act on.",
        intro: "The free version should show enough useful value to justify the exchange, while leaving clear paths into paid monitoring, portfolio reporting, alerts, API enrichment or data-share access.",
        stats: [
          { title: "Posture", text: "DNS, email and external hygiene." },
          { title: "Footprint", text: "subdomains, platforms and providers." },
          { title: "Threat", text: "external impersonation and remediation context." },
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
            title: "Subdomain discovery",
            subtitle: "Hidden external surface",
            coverage: "Visible subdomains, CNAME targets, service aliases, platform-derived records, abandoned-looking hostnames and potential dangling or hanging CNAME issues.",
            action: "Surface subdomains that reveal platform usage, forgotten services, shadow infrastructure, takeover risk or configuration drift.",
            text: "Subdomains often expose the real operating footprint: customer portals, login flows, marketing tools, helpdesk systems, storage buckets, CDNs and test environments. They can also reveal hanging CNAMEs where a DNS record points to a service that is no longer properly claimed.",
            evidence: [
              "Discovered hostnames and service aliases",
              "CNAME target and provider attribution",
              "Potential dangling or hanging CNAME indicators",
              "Subdomain-derived platform and vendor footprint",
            ],
          },
          {
            title: "Platform and vendor footprint",
            subtitle: "What the domain appears to use",
            coverage: "Mail providers, SaaS, cloud, CDN, hosting, collaboration tools, support platforms and other vendor/provider signals inferred from DNS, subdomains and public infrastructure.",
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
            title: "External platform threat",
            subtitle: "Impersonation around what you use",
            coverage: "Platform impersonation targeting detected vendors such as Microsoft, Google, Apple, PayPal, Stripe, Shopify, Slack, Zendesk, HubSpot or other platforms visible in the domain footprint.",
            action: "Show whether external infrastructure is being created to impersonate platforms the organisation actually depends on, even when the organisation's own brand is not directly copied.",
            text: "This is a core Datazag distinction. A customer may not see a fake version of their own brand, but attackers may still exploit trust by impersonating the login, payment, support, storage or collaboration platforms their staff and customers already recognise.",
            evidence: [
              "Detected platform dependency mapped from the domain footprint",
              "External platform impersonation patterns observed in Datazag intelligence",
              "Hosting, ASN, certificate and naming context for suspicious infrastructure",
              "Recommended response: monitor, block, investigate or expand to alerts",
            ],
          },
          {
            title: "Remediation and next steps",
            subtitle: "Action plan",
            coverage: "Priority fixes, suggested checks, subdomain cleanup, hanging-CNAME remediation, monitoring options, evidence-pack escalation, portfolio reporting and alerting upgrade paths.",
            action: "Give the recipient a small number of next steps that can be acted on by IT, security, leadership or a partner provider.",
            text: "A good report should not only diagnose. It should make the next action obvious, whether that is tightening DMARC, removing stale CNAMEs, reviewing a provider dependency, monitoring a platform or asking for a deeper portfolio view.",
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
        kicker: "Example subdomain issue",
        title: "Subdomain discovery can reveal platform and takeover risk.",
        intro: "Subdomains are one of the most useful parts of the free report because they expose real platform usage and stale integrations that are easy to miss in an internal asset list.",
        severity: "REPORT | SUBDOMAIN",
        status: "Potential Hanging CNAME Review",
        domain: "help.example-business.co.uk → example-business.zendesk.com",
        fields: [
          { label: "Subdomain", value: "help.example-business.co.uk" },
          { label: "Record type", value: "CNAME" },
          { label: "Target", value: "example-business.zendesk.com" },
          { label: "Derived platform", value: "Zendesk / helpdesk platform" },
          { label: "Issue type", value: "Potential stale service alias or hanging CNAME requiring ownership verification" },
          { label: "Why it matters", value: "Unclaimed or misconfigured service aliases can expose a customer-facing subdomain to takeover or confusion" },
          { label: "Suggested check", value: "Confirm the service is active, claimed by the organisation and still required" },
          { label: "Monitoring option", value: "Track new subdomains, CNAME targets, provider changes and suspicious platform lookalikes" },
        ],
        reasons: [
          "Subdomains often reveal platforms that are not visible from the apex domain alone",
          "CNAME targets help derive vendor and platform footprint",
          "Hanging CNAMEs can indicate stale external dependencies",
          "Subdomain-derived platforms improve impersonation monitoring relevance",
        ],
        latency: "Sample subdomain issue — live report values depend on discovered records and verification logic",
      }}
      tertiaryExampleAlert={{
        kicker: "Example external threat",
        title: "Platform impersonation targeting what the organisation uses.",
        intro: "The report should show not only internal posture, but the external threat around detected platforms. This is different from saying the customer's own brand has been copied.",
        severity: "REPORT | EXTERNAL THREAT",
        status: "Platform Impersonation Exposure",
        domain: "Detected platform: Microsoft 365 · external suspicious infrastructure observed",
        fields: [
          { label: "Detected dependency", value: "Microsoft 365 indicators found in mail and DNS footprint" },
          { label: "External pattern", value: "Newly observed domains using Microsoft login, account, verify or secure naming patterns" },
          { label: "Customer relevance", value: "Staff and customers may trust Microsoft-branded login or file-sharing prompts" },
          { label: "Not a takedown claim", value: "This is platform impersonation context, not necessarily direct brand impersonation of the customer" },
          { label: "Recommended action", value: "Monitor and block high-confidence platform impersonation infrastructure where appropriate" },
          { label: "Evidence available in paid alerts", value: "Domain, DNS, certificate, hosting, ASN, confidence, reason codes and de-escalation link" },
          { label: "Business summary", value: "Threat actors may target the platforms your organisation relies on, not only your own brand" },
          { label: "Upgrade path", value: "Threat alerts for platform, brand and keyword-led suspicious infrastructure" },
        ],
        reasons: [
          "Platform impersonation can create risk even without direct customer-brand copying",
          "Detected vendor footprint makes external threat context more relevant",
          "Blocking and monitoring are usually more appropriate than takedown for third-party platform impersonation",
          "Expanded alerts can separate platform, brand and keyword-led suspicious infrastructure",
        ],
        latency: "Sample external threat — live values depend on detected platforms and current impersonation intelligence",
      }}
      packagesTitle="What the real report can lead to."
      packages={[
        { title: "One-off free report", text: "A practical external snapshot of one domain's posture, subdomains, footprint and exposure." },
        { title: "Domain health report", text: "A deeper technical report covering DNS, email, subdomain, provider and remediation context." },
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

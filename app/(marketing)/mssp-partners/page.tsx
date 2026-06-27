import type { Metadata } from "next";

import ProductConceptPage from "@/components/sections/blocks/ProductConceptPage";

export const metadata: Metadata = {
  title: "MSSP Partners — Datazag",
  description:
    "Partner with Datazag to add predictive domain intelligence, phishing defence and impersonation monitoring to managed security services.",
};

export default function MsspPartnersPage() {
  return (
    <ProductConceptPage
      eyebrow="MSSP Partners"
      title="Add predictive phishing defence without adding analyst load."
      intro="Datazag helps MSSPs turn early internet infrastructure signals into managed security services: platform impersonation alerts, brand evidence packs, keyword infrastructure detection, portfolio reporting and cloud-native domain intelligence."
      primaryCta={{ label: "Partner with Datazag", href: "/contact" }}
      secondaryCta={{ label: "See alerts", href: "/alerts" }}
      proof={[
        { title: "New service revenue", text: "Package early phishing and impersonation intelligence as a premium managed service." },
        { title: "Lower analyst burden", text: "False-positive controls, evidence and de-escalation workflows reduce manual triage." },
        { title: "Client portfolio scale", text: "Monitor many client brands, domains, subsidiaries and suppliers from one intelligence layer." },
        { title: "SIEM/SOAR ready", text: "Deliver signals into existing SOC workflows rather than creating another analyst console." },
      ]}
      narrative={{
        kicker: "The MSSP opportunity",
        title: "Your clients need earlier warning than traditional threat feeds can provide.",
        body: [
          "Most managed security services react after a domain, URL or sender has already appeared in logs. Datazag shifts the service earlier by detecting infrastructure while it is being assembled: domains, certificates, DNS changes, hosting, parking and suspicious subdomain activity.",
          "For MSSPs, the value is not just another feed. It is a managed service layer: explainable alerts, evidence packs, portfolio reporting and client-ready remediation context that can be sold across the customer base.",
          "The partner model should protect margins. Datazag handles the collection, enrichment and false-positive controls; the MSSP packages the intelligence into detection, advisory, reporting, takedown and customer success workflows.",
        ],
      }}
      flowTitle="How MSSPs use Datazag."
      flow={[
        { title: "Monitor", text: "Track client brands, domains, suppliers, visible platforms and suspicious infrastructure around each customer." },
        { title: "Triage", text: "Separate platform alerts, brand evidence-pack alerts and keyword infrastructure alerts with reason codes attached." },
        { title: "Deliver", text: "Route high-confidence signals into SIEM, SOAR, Slack, webhooks, reports or customer portals." },
        { title: "Expand", text: "Turn one client service into portfolio monitoring, board reports, takedown support and data enrichment." },
      ]}
      alertTypeSection={{
        kicker: "Partner service modules",
        title: "Build managed services around the three alert classes."
        ,intro: "The same alert taxonomy from the Threat Alerts product becomes a practical MSSP service catalogue. Platform alerts support blocking and detection; brand alerts support evidence and takedown workflows; keyword infrastructure alerts support investigation and watchlisting.",
        stats: [
          { title: "Detect", text: "find suspicious infrastructure before campaigns mature." },
          { title: "Evidence", text: "turn findings into client-ready proof and remediation." },
          { title: "Report", text: "show portfolio risk movement across client estates." },
        ],
        types: [
          {
            title: "Zero-hour phishing defence",
            subtitle: "Detection service",
            coverage: "Platform impersonation, suspicious certificates, new DNS, parked apex domains, keyword-led subdomains and hosting context.",
            action: "Sell as an early-warning service that blocks or escalates suspicious infrastructure before clients receive campaigns.",
            text: "This is the core MSSP offer: earlier detection, explainable signals and operational delivery into the customer's existing security stack.",
            evidence: [
              "Platform and keyword infrastructure alerts",
              "Reason codes and confidence context",
              "SIEM/SOAR/webhook delivery",
              "Client de-escalation feedback loop",
            ],
          },
          {
            title: "Brand protection add-on",
            subtitle: "Evidence service",
            coverage: "Customer-owned brands, subsidiaries, priority domains, aliases, login terms and live phishing evidence.",
            action: "Sell as a premium add-on for clients that need evidence packs, screenshots, abuse contacts and takedown support.",
            text: "Brand alerts give MSSPs a higher-value service than generic monitoring because the output can become a customer-ready incident and takedown workflow.",
            evidence: [
              "Brand impersonation evidence packs",
              "Website screenshots when content appears",
              "Hosting provider and abuse contact details",
              "Lifecycle tracking and customer reporting",
            ],
          },
          {
            title: "Portfolio risk reporting",
            subtitle: "Governance service",
            coverage: "Client domains, subsidiaries, suppliers, acquisition targets, DNS posture, platform exposure and recurring remediation findings.",
            action: "Use recurring reports to create account touchpoints, board-ready summaries and remediation programmes across the client base.",
            text: "Portfolio reporting helps MSSPs show movement over time: what changed, what was fixed, which clients need attention and where managed monitoring should expand.",
            evidence: [
              "Client-by-client risk summaries",
              "DNS and email posture findings",
              "Platform footprint and impersonation exposure",
              "Remediation queue and trend reporting",
            ],
          },
        ],
        note: "Partner pricing should be separate from public enterprise pricing. MSSP terms normally depend on number of client brands, monitored domains, alert volume, integration depth, white-label requirements, reporting cadence and SLA. Current indicative partner pricing starts around $12,000–$20,000 per month.",
      }}
      exampleAlert={{
        kicker: "Example MSSP service package",
        title: "What an MSSP can sell using Datazag."
        ,intro: "This placeholder shows how Datazag intelligence can become a packaged managed service rather than a raw feed. The MSSP owns the client relationship and service wrapper; Datazag supplies the detection and intelligence layer.",
        severity: "PARTNER | PACKAGE",
        status: "Managed Phishing Defence",
        domain: "25 clients · 120 brands · SIEM delivery · monthly reports",
        fields: [
          { label: "Service", value: "Zero-hour phishing and impersonation defence" },
          { label: "Coverage", value: "Client brands, domains, visible platforms and keyword infrastructure" },
          { label: "Alert types", value: "Platform, brand and keyword infrastructure" },
          { label: "Delivery", value: "SIEM/SOAR, Slack, webhooks or MSSP portal" },
          { label: "Evidence", value: "Screenshots, abuse contacts and takedown-ready evidence for brand hits" },
          { label: "Reporting", value: "Monthly client and portfolio reports" },
          { label: "De-escalation", value: "Client feedback loop for known-good findings" },
          { label: "Commercial model", value: "Partner agreement with client/brand-based scaling" },
        ],
        reasons: [
          "Creates a premium managed service using Datazag intelligence",
          "Reduces analyst load by pre-filtering and explaining alerts",
          "Supports both operational SOC workflows and client reporting",
          "Scales across client portfolios without building collection infrastructure internally",
        ],
        latency: "Partner package example — final scope depends on client estate, delivery model and SLA",
      }}
      secondaryExampleAlert={{
        kicker: "Where Datazag fits",
        title: "Intelligence layer in the MSSP operating model.",
        intro: "Datazag should sit behind the managed service, feeding the systems and reports the MSSP already uses. The goal is not another pane of glass; it is better signals, earlier evidence and more valuable client outcomes.",
        severity: "WORKFLOW | MSSP",
        status: "Integrated Partner Delivery",
        domain: "Detection · enrichment · evidence · reporting",
        fields: [
          { label: "Collection", value: "Domains, certstream, DNS, hosting, parking, ASN and infrastructure context" },
          { label: "Classification", value: "Platform, brand and keyword infrastructure alert classes" },
          { label: "Filtering", value: "Brand/platform baselines, cloud allowlists, DNS context and de-escalation feedback" },
          { label: "Routing", value: "SIEM, SOAR, Slack, webhook, API, data share or customer portal" },
          { label: "Evidence", value: "Reason codes, screenshots, abuse contacts, lifecycle state and remediation guidance" },
          { label: "Reporting", value: "Client reports, portfolio summaries and account review material" },
          { label: "Upsell", value: "From phishing defence to brand protection, portfolio monitoring and data enrichment" },
          { label: "Partner role", value: "Own client relationship, response, service packaging and commercial model" },
        ],
        reasons: [
          "Improves MSSP margin by reducing manual investigation time",
          "Gives account teams a recurring reporting and remediation story",
          "Creates an upgrade path from alerts to evidence packs and portfolio monitoring",
          "Keeps Datazag invisible or co-branded depending on partner model",
        ],
        latency: "Designed for managed service integration rather than standalone analyst triage",
      }}
      packagesTitle="MSSP partner motions."
      packages={[
        { title: "Zero-hour phishing defence", text: "Early infrastructure detection for clients before campaigns become visible in logs or inboxes." },
        { title: "Brand protection add-on", text: "Evidence-pack and takedown-ready workflows for clients with high-value brands." },
        { title: "Portfolio monitoring", text: "Recurring visibility across many client domains, subsidiaries, suppliers and brands." },
        { title: "SOC enrichment", text: "JOIN-ready or API-delivered domain intelligence for hunting, triage and correlation." },
        { title: "Client reporting", text: "Executive summaries, remediation queues and movement since the last review." },
        { title: "White-label delivery", text: "Partner-controlled packaging, client experience, commercial terms and service naming." },
      ]}
      finalTitle="Turn early infrastructure intelligence into a managed service."
      finalBody="Datazag gives MSSPs the detection, evidence and reporting layer. Partners package it into client-facing services that improve protection, retention and margin."
    />
  );
}

import type { Metadata } from "next";

import ProductConceptPage from "@/components/sections/blocks/ProductConceptPage";

export const metadata: Metadata = {
  title: "MSSP Partners — Datazag",
  description:
    "White-label Datazag intelligence for MSSPs: integrate domain, infrastructure and impersonation data into partner platforms, services and revenue lines.",
};

export default function MsspPartnersPage() {
  return (
    <ProductConceptPage
      eyebrow="MSSP Partners"
      title="Your brand. Our data. New security revenue lines."
      intro="Datazag gives MSSPs the domain, infrastructure and impersonation intelligence layer to power partner-branded services: client reports, SOC enrichment, brand protection, portfolio monitoring, evidence packs and customer portals."
      primaryCta={{ label: "Partner with Datazag", href: "/contact" }}
      secondaryCta={{ label: "See reports", href: "/reports" }}
      proof={[
        { title: "Your brand", text: "Offer Datazag-powered intelligence under your service name, portal, reports and customer relationship." },
        { title: "Our data", text: "Use Datazag's domain, DNS, certstream, infrastructure, platform and impersonation intelligence without building the collection layer." },
        { title: "New revenue lines", text: "Add brand protection, portfolio monitoring, executive reporting and SOC enrichment to existing managed services." },
        { title: "Systems-first delivery", text: "Push intelligence into your SIEM, SOAR, data lake, portal, reports or customer-facing workflows." },
      ]}
      narrative={{
        kicker: "The MSSP opportunity",
        title: "The stronger partner play is not another phishing product. It is intelligence inside your services.",
        body: [
          "MSSPs already own the client relationship, the service wrapper and the operational workflow. Datazag should strengthen those assets rather than force a new standalone product or another analyst console.",
          "The partner proposition is simple: your brand, our data. Datazag supplies the external domain, DNS, certificate, hosting, platform, brand and infrastructure intelligence. The MSSP packages that intelligence into services their clients already understand and trust.",
          "Phishing defence remains a strong use case, but it should sit inside a broader data-led partner story: brand protection, portfolio visibility, account reviews, supplier-risk reporting, SOC enrichment, customer portals and new recurring revenue lines.",
        ],
      }}
      flowTitle="How MSSPs integrate Datazag intelligence."
      flow={[
        { title: "Ingest", text: "Use API, webhooks, data shares or reports to bring Datazag intelligence into partner systems." },
        { title: "Package", text: "Wrap the intelligence as your branded service: reports, alerts, enrichment, evidence packs or customer portal features." },
        { title: "Deliver", text: "Expose findings through your SOC workflow, client reports, account reviews, dashboards or managed response process." },
        { title: "Monetise", text: "Create new attachable revenue lines across brand protection, portfolio monitoring, remediation and data enrichment." },
      ]}
      alertTypeSection={{
        kicker: "White-label service lines",
        title: "Build partner-branded services on Datazag intelligence."
        ,intro: "The service catalogue should lead with outcomes MSSPs can sell under their own brand. Datazag data can power multiple revenue lines: brand protection, portfolio reporting, SOC enrichment and early infrastructure detection.",
        stats: [
          { title: "Brand", text: "customer-facing protection and evidence services." },
          { title: "Portfolio", text: "recurring visibility across client estates." },
          { title: "Data", text: "enrichment inside partner systems and workflows." },
        ],
        types: [
          {
            title: "Brand protection service",
            subtitle: "New revenue line",
            coverage: "Customer-owned brands, subsidiaries, priority domains, aliases, login terms, live phishing evidence and related infrastructure.",
            action: "Sell as a partner-branded service for clients that need brand monitoring, evidence packs, abuse contacts and takedown-ready reporting.",
            text: "This is likely the strongest commercial wedge. Many MSSP clients understand brand risk, but the MSSP can deliver it as part of a broader managed security relationship rather than a standalone brand-protection tool.",
            evidence: [
              "Brand impersonation evidence packs",
              "Website screenshots when content appears",
              "Hosting provider and abuse contact details",
              "Lifecycle tracking and client-ready reporting",
            ],
          },
          {
            title: "Portfolio intelligence reports",
            subtitle: "Account and governance service",
            coverage: "Client domains, subsidiaries, suppliers, acquisition targets, DNS posture, platform footprint and recurring risk findings.",
            action: "Use recurring reports to create account touchpoints, board-ready summaries, renewal conversations and remediation programmes.",
            text: "Portfolio reporting gives MSSPs a structured reason to speak with clients regularly. It shows what changed, what was fixed, what remains exposed and where the client should expand monitoring.",
            evidence: [
              "Client-by-client risk summaries",
              "DNS and email posture findings",
              "Platform and vendor footprint mapping",
              "Remediation queues and trend reporting",
            ],
          },
          {
            title: "SOC and platform enrichment",
            subtitle: "Data integration",
            coverage: "Domain risk, DNS history, certificate activity, hosting context, ASN risk, platform matches, brand matches and keyword infrastructure signals.",
            action: "Integrate Datazag into SIEM, SOAR, data lake, case management, customer portal or internal scoring systems.",
            text: "For mature MSSPs, the value is the data layer. Datazag intelligence can enrich alerts, support hunting, improve triage and add context inside systems the partner already operates.",
            evidence: [
              "API, webhook and data-share delivery",
              "Reason codes and confidence context",
              "Platform, brand and keyword infrastructure classifications",
              "Cloud-native data products for partner analytics",
            ],
          },
        ],
        note: "Phishing defence remains a use case, but the partner proposition should be broader: white-label intelligence and new service revenue. Partner pricing should remain separate from public enterprise pricing and depend on client estate, data volume, integration depth, white-label requirements, reporting cadence and SLA.",
      }}
      exampleAlert={{
        kicker: "Example white-label package",
        title: "What an MSSP can sell under its own brand."
        ,intro: "This placeholder shows Datazag as the intelligence layer behind a partner-branded service. The client sees the MSSP's product, reports and portal; Datazag powers the data, evidence and monitoring underneath.",
        severity: "PARTNER | WHITE LABEL",
        status: "Your Brand · Datazag Intelligence",
        domain: "25 clients · 120 brands · partner portal · monthly reports",
        fields: [
          { label: "Partner offer", value: "Brand Risk Intelligence powered by Datazag" },
          { label: "Client experience", value: "MSSP-branded report, portal, account review and remediation workflow" },
          { label: "Data layer", value: "Domains, DNS, certificates, hosting, ASN, platform and impersonation intelligence" },
          { label: "Revenue lines", value: "Brand protection, portfolio reports, SOC enrichment and evidence packs" },
          { label: "Delivery", value: "API, webhook, data share, PDF/report export or portal integration" },
          { label: "Evidence", value: "Screenshots, abuse contacts, reason codes and lifecycle state for relevant findings" },
          { label: "De-escalation", value: "Client feedback loop for known-good or accepted findings" },
          { label: "Commercial model", value: "Partner agreement with client, brand, data-volume and white-label scaling" },
        ],
        reasons: [
          "Lets the MSSP add a differentiated service without building the data collection layer",
          "Creates attachable recurring revenue across existing clients",
          "Supports both executive reporting and operational SOC enrichment",
          "Keeps the partner's brand and customer relationship at the centre",
        ],
        latency: "White-label package example — final scope depends on client estate, delivery model and SLA",
      }}
      secondaryExampleAlert={{
        kicker: "Where Datazag fits",
        title: "Data layer inside the MSSP operating model.",
        intro: "Datazag should sit behind the managed service, feeding the partner systems and customer outputs the MSSP already uses. The goal is not another pane of glass; it is better data inside the partner's own service model.",
        severity: "WORKFLOW | MSSP",
        status: "Integrated Partner Delivery",
        domain: "Data · enrichment · evidence · reporting",
        fields: [
          { label: "Collection", value: "Domains, certstream, DNS, hosting, parking, ASN and infrastructure context" },
          { label: "Classification", value: "Platform, brand and keyword infrastructure intelligence" },
          { label: "Filtering", value: "Brand/platform baselines, cloud allowlists, DNS context and de-escalation feedback" },
          { label: "Routing", value: "SIEM, SOAR, Slack, webhook, API, data share or customer portal" },
          { label: "Evidence", value: "Reason codes, screenshots, abuse contacts, lifecycle state and remediation guidance" },
          { label: "Reporting", value: "Client reports, portfolio summaries and account review material" },
          { label: "Revenue expansion", value: "From reports to brand protection, portfolio monitoring, data enrichment and managed response" },
          { label: "Partner role", value: "Own client relationship, service packaging, response and commercial model" },
        ],
        reasons: [
          "Improves MSSP margin by turning data into repeatable service modules",
          "Gives account teams a recurring reporting and remediation story",
          "Creates an upgrade path from free/report-led value into brand protection and monitoring",
          "Keeps Datazag invisible, co-branded or explicit depending on partner model",
        ],
        latency: "Designed for partner system integration rather than standalone analyst triage",
      }}
      packagesTitle="MSSP partner motions."
      packages={[
        { title: "White-label reports", text: "Partner-branded domain, brand, supplier and portfolio reports powered by Datazag intelligence." },
        { title: "Brand protection", text: "Evidence-pack and takedown-ready workflows for clients with high-value brands." },
        { title: "Portfolio monitoring", text: "Recurring visibility across many client domains, subsidiaries, suppliers and brands." },
        { title: "SOC enrichment", text: "API, webhook or data-share intelligence for hunting, triage, scoring and correlation." },
        { title: "Customer portal data", text: "Embed Datazag findings inside the partner's own portal, dashboards and account review workflows." },
        { title: "Managed response", text: "Use Datazag evidence to support investigation, escalation, remediation and client communication." },
      ]}
      finalTitle="Your brand. Our data. Your new revenue line."
      finalBody="Datazag gives MSSPs the intelligence layer. Partners decide how to package it, price it and deliver it to their clients."
    />
  );
}

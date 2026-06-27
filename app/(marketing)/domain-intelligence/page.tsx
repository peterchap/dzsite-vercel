import type { Metadata } from "next";

import ProductConceptPage from "@/components/sections/blocks/ProductConceptPage";

export const metadata: Metadata = {
  title: "Domain Intelligence API & Data Shares — Datazag",
  description:
    "Domain, DNS, certificate, hosting, ASN and impersonation intelligence delivered through API, cloud data shares and marketplace-ready datasets.",
};

export default function DomainIntelligencePage() {
  return (
    <ProductConceptPage
      eyebrow="Domain Intelligence"
      title="Internet intelligence built to live inside your systems."
      intro="Datazag turns domains, DNS, certificates, hosting, ASN context, platform matches, brand signals and suspicious infrastructure into structured intelligence you can query, join, enrich and operationalise."
      primaryCta={{ label: "Get a free report", href: "/#free-report" }}
      secondaryCta={{ label: "See pricing", href: "/pricing" }}
      proof={[
        { title: "API", text: "Low-latency domain enrichment for scoring, triage, onboarding, campaign checks and product workflows." },
        { title: "Data shares", text: "Cloud-native datasets for teams that want to join Datazag intelligence directly to their own logs and tables." },
        { title: "Marketplaces", text: "Package intelligence for Snowflake, Databricks, AWS, Azure, Google Cloud and private data-share routes." },
        { title: "Explainable risk", text: "Risk scores are paired with reason codes, infrastructure evidence and context for human or automated decisions." },
      ]}
      narrative={{
        kicker: "The data problem",
        title: "Security teams do not need another flat feed. They need intelligence they can join to their own data.",
        body: [
          "Most domain intelligence arrives as disconnected indicators: a domain, a score, a category or a feed match. That is useful, but it often leaves the consuming team to reconstruct the evidence, context and relationship graph themselves.",
          "Datazag is designed as a systems layer. It provides structured domain and infrastructure intelligence that can enrich SIEM events, SMTP logs, signup flows, case management, customer portals, threat-hunting notebooks, AI-agent workflows and cloud analytics environments.",
          "The same intelligence can be consumed in different ways: API for low-latency lookups, webhooks for operational events, data shares for bulk analytics, and marketplace delivery for procurement-friendly cloud adoption.",
        ],
      }}
      flowTitle="From internet signal to integrated intelligence."
      flow={[
        { title: "Collect", text: "Continuously observe domains, DNS, certificates, hosting, parking, ASN context, platform patterns and threat signals." },
        { title: "Enrich", text: "Attach risk scores, reason codes, infrastructure context, brand/platform matches and historical relationships." },
        { title: "Deliver", text: "Expose the intelligence through API, webhooks, cloud data shares, object storage or marketplace listings." },
        { title: "Join", text: "Use Datazag inside your logs, dashboards, scoring systems, AI agents and security workflows." },
      ]}
      alertTypeSection={{
        kicker: "Delivery paths",
        title: "Choose the consumption model that fits your architecture."
        ,intro: "Datazag can be used as an operational enrichment API, a cloud-native dataset, a marketplace product or a partner intelligence layer. The right route depends on whether you need live decisions, bulk analytics, procurement simplicity or embedded product intelligence.",
        stats: [
          { title: "Live", text: "API and webhooks for decisions in motion." },
          { title: "Bulk", text: "data shares and object storage for analytics." },
          { title: "Embedded", text: "partner and product integrations." },
        ],
        types: [
          {
            title: "Domain Intelligence API",
            subtitle: "Real-time enrichment",
            coverage: "Domain risk, DNS context, certificates, hosting, ASN risk, platform matches, brand matches and suspicious infrastructure signals.",
            action: "Use the API inside signup checks, campaign screening, enrichment workflows, case triage, product features and AI-agent decisions.",
            text: "The API is the best route when a system needs an answer during a workflow. It turns a domain or link into a structured decision input with risk, reasons and supporting context.",
            evidence: [
              "Low-latency lookup and enrichment",
              "Risk score, reason codes and confidence context",
              "Machine-readable output for scoring and automation",
              "Useful for ESPs, MSSPs, SOC teams, platforms and fraud workflows",
            ],
          },
          {
            title: "Cloud data shares",
            subtitle: "JOIN-ready datasets",
            coverage: "Domain corpus, DNS facts, certificate observations, hosting context, risk scores, platform mappings and infrastructure relationships.",
            action: "Join Datazag intelligence to your SIEM logs, SMTP logs, customer domains, threat-hunting data, fraud records or internal analytics tables.",
            text: "Data shares are for teams that want the intelligence in their warehouse or lakehouse. Instead of making repeated API calls, they can query and join the data directly where their analysts and pipelines already work.",
            evidence: [
              "Snowflake, Databricks, AWS, Azure and Google Cloud delivery paths",
              "Hourly, daily or scoped refresh models",
              "Historical context and time-aware analysis",
              "Designed for security engineering, data teams and platform analytics",
            ],
          },
          {
            title: "Marketplace datasets",
            subtitle: "Procurement-friendly delivery",
            coverage: "Curated domain, risk, DNS, platform, brand, infrastructure and alert datasets packaged for cloud marketplace buyers.",
            action: "Use marketplace listings or private offers when buyers need cloud-native procurement, vendor onboarding and data delivery in the same motion.",
            text: "Marketplaces make Datazag easier to buy and easier to consume. They are suitable for customers who want cloud-native access, committed-spend procurement or private data-share agreements.",
            evidence: [
              "Public or private marketplace offers",
              "Curated packages for SOC, ESP, MSSP, brand and platform use cases",
              "Cloud-native data access without file-transfer friction",
              "Annual and enterprise data-share commercial models",
            ],
          },
          {
            title: "Embedded partner intelligence",
            subtitle: "Your product, our data",
            coverage: "Domain and infrastructure intelligence embedded inside partner portals, dashboards, reports, scoring systems and customer-facing services.",
            action: "Use Datazag behind partner-branded services such as brand protection, portfolio reporting, data cleaning, abuse prevention and SOC enrichment.",
            text: "For partners, the data should disappear into the product experience. Datazag supplies the intelligence layer; the partner controls the packaging, workflow, pricing and customer relationship.",
            evidence: [
              "White-label or co-branded output",
              "API, webhook, report or data-share integration",
              "Reasoning fields for customer trust and explainability",
              "Supports new partner revenue lines",
            ],
          },
        ],
        note: "The same underlying intelligence can support multiple products: free reports, operational alerts, ESP platform controls, MSSP services, brand protection, security enrichment and cloud datasets. The delivery model changes; the evidence layer stays consistent.",
      }}
      exampleAlert={{
        kicker: "Example API output",
        title: "What a domain enrichment response should explain."
        ,intro: "The point of the API is not only to return a score. It should explain why a domain, link or infrastructure signal is relevant so downstream systems can automate, escalate or display the result with confidence.",
        severity: "API | ENRICHMENT",
        status: "Domain Risk Context Returned",
        domain: "secure-login-example.net",
        fields: [
          { label: "Risk score", value: "High · reasoned score available for thresholding" },
          { label: "Domain context", value: "Newly observed domain with limited corpus history" },
          { label: "DNS context", value: "Recent A record and nameserver activity" },
          { label: "Certificate context", value: "Recent certificate observation with suspicious naming" },
          { label: "Infrastructure", value: "Hosting, ASN and IP context attached" },
          { label: "Classification", value: "Platform, brand or keyword infrastructure signals" },
          { label: "Machine use", value: "Scoring, blocking, routing, AI-agent or case enrichment" },
          { label: "Human use", value: "Readable reasons for analyst or customer explanation" },
        ],
        reasons: [
          "Risk score is accompanied by explainable reason codes",
          "Infrastructure context reduces blind trust in a simple category label",
          "Output can be used by automated systems or human analysts",
          "The same enrichment can power ESP, MSSP, SOC, fraud and platform workflows",
        ],
        latency: "Example enrichment output — final fields depend on plan, endpoint and delivery model",
      }}
      secondaryExampleAlert={{
        kicker: "Example data share use",
        title: "What cloud-native buyers can do with the dataset.",
        intro: "Data shares make sense when the customer wants to analyse many domains, join intelligence to internal logs, build dashboards or train internal scoring and agentic workflows on structured evidence.",
        severity: "DATA | SHARE",
        status: "JOIN-Ready Intelligence",
        domain: "customer_logs JOIN datazag_domain_intelligence",
        fields: [
          { label: "Input table", value: "SMTP logs, SIEM events, signup domains, customer URLs or threat-hunting tables" },
          { label: "Join key", value: "Domain, root domain, hostname, link domain, IP or ASN depending on package" },
          { label: "Output", value: "Risk, reasons, DNS, hosting, certificate, platform and infrastructure context" },
          { label: "Refresh", value: "Hourly, daily or scoped update cadence" },
          { label: "Consumer", value: "Security engineering, data science, SOC, ESP abuse, MSSP platform or fraud team" },
          { label: "Procurement", value: "Cloud marketplace, private offer, annual agreement or enterprise data share" },
          { label: "Analytics", value: "Trend reporting, portfolio views, customer risk, model features and dashboards" },
          { label: "Action", value: "Block, enrich, prioritise, report, investigate or alert" },
        ],
        reasons: [
          "Cloud data shares avoid repeated API calls for high-volume analytics",
          "JOIN-ready fields let teams add context to their own records",
          "Marketplace delivery simplifies procurement and cloud adoption",
          "Historical and refreshable data supports trend and portfolio analysis",
        ],
        latency: "Data-share example — cadence and schema depend on package scope",
      }}
      packagesTitle="Domain intelligence packages."
      packages={[
        { title: "API enrichment", text: "Real-time domain and link intelligence for scoring, routing, automation and product workflows." },
        { title: "Cloud data share", text: "JOIN-ready domain, DNS, risk and infrastructure datasets for warehouse and lakehouse analytics." },
        { title: "Marketplace dataset", text: "Curated data packages for Snowflake, Databricks, AWS, Azure, Google Cloud and private offers." },
        { title: "Partner integration", text: "Datazag intelligence embedded behind partner-branded services, reports, portals and scoring systems." },
        { title: "Threat hunting enrichment", text: "Domain and infrastructure context for SOC, SIEM, SOAR, notebooks and investigation workflows." },
        { title: "Platform intelligence", text: "Data layer for ESPs, MSSPs, security vendors, fraud teams and customer-facing products." },
      ]}
      finalTitle="Bring Datazag intelligence into your own stack."
      finalBody="Use the API for live decisions, data shares for bulk analytics, marketplaces for procurement-friendly access and partner integrations for white-label services."
    />
  );
}

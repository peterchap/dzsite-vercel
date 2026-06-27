import type { Metadata } from "next";

import ProductConceptPage from "@/components/sections/blocks/ProductConceptPage";

export const metadata: Metadata = {
  title: "Contact — Datazag",
  description:
    "Contact Datazag about free reports, threat alerts, infrastructure intelligence, API access, data shares, MSSP partnerships, ESP partnerships and marketplace private offers.",
};

export default function ContactPage() {
  return (
    <ProductConceptPage
      eyebrow="Contact"
      title="Tell us what you want to do with Datazag."
      intro="Datazag supports several buyer paths: free domain reports, real-time threat alerts, infrastructure intelligence, API and data-share access, partner services, and cloud marketplace offers. The fastest route is to tell us which path fits your use case."
      primaryCta={{ label: "Get a free report", href: "/#free-report" }}
      secondaryCta={{ label: "See sample report", href: "/reports/sample" }}
      proof={[
        { title: "Reports", text: "Use a work email to get a domain report, or discuss portfolio and customer-facing report options." },
        { title: "Alerts", text: "Talk to us about platform, brand and keyword-led suspicious infrastructure monitoring." },
        { title: "Data", text: "Discuss API enrichment, cloud data shares, marketplace datasets and private offers." },
        { title: "Partners", text: "Explore MSSP, MDR, ESP, platform or white-label uses of Datazag intelligence." },
      ]}
      narrative={{
        kicker: "Enquiry routing",
        title: "A useful contact page should qualify intent before a sales conversation.",
        body: [
          "Datazag has more than one product motion. Someone asking for a free domain report needs a different follow-up from an MSSP looking for white-label services, an ESP evaluating link-risk checks, or a data buyer asking about Snowflake and Databricks delivery.",
          "This page should help visitors choose the most relevant path and give Datazag enough context to respond properly: the domain or portfolio involved, the intended workflow, preferred delivery model, buyer type and urgency.",
          "The current version is a routing page. The next step is to wire these paths into a form, CRM, email workflow or portal-backed intake process.",
        ],
      }}
      flowTitle="How to route the enquiry."
      flow={[
        { title: "Choose path", text: "Select the closest use case: report, alerting, API, data share, partner service, ESP control or marketplace offer." },
        { title: "Share scope", text: "Provide domain, brand, customer portfolio, platform workflow, data volume or marketplace requirement where relevant." },
        { title: "Review fit", text: "Datazag maps the enquiry to the right product: report, monitoring, enrichment, dataset, partner package or private offer." },
        { title: "Next action", text: "Move to report generation, technical scoping, pilot, pricing, private offer or partner-commercial discussion." },
      ]}
      wideFlowLayout
      alertTypeSection={{
        kicker: "Choose your path",
        title: "Route the enquiry by what you need, not by job title alone.",
        intro: "The same Datazag intelligence can support different outcomes. These routes keep the conversation focused and help avoid a generic contact form that hides buyer intent.",
        stats: [
          { title: "Report", text: "domain or portfolio snapshot." },
          { title: "Monitor", text: "alerts and evidence workflow." },
          { title: "Integrate", text: "API, data share or partner product." },
        ],
        types: [
          {
            title: "Free report or domain review",
            subtitle: "Report request",
            coverage: "One domain, multiple domains, subsidiaries, suppliers, clients, acquisition targets or customer portfolios.",
            action: "Request a free report, a sample output review, a deeper domain health report or a portfolio reporting discussion.",
            text: "This path is for people who want to see what Datazag can observe about a domain before committing to monitoring or data access.",
            evidence: [
              "Domain or portfolio scope",
              "Business and technical recipient details",
              "Report type: free, technical, executive or portfolio",
              "Follow-up interest: monitoring, remediation or data access",
            ],
          },
          {
            title: "Threat alerts and monitoring",
            subtitle: "Operational security",
            coverage: "Platform impersonation, brand impersonation, keyword-led suspicious infrastructure, evidence packs, de-escalation paths and alert delivery.",
            action: "Discuss monitoring scope, alert channels, severity thresholds, SOC workflow, evidence requirements and pilot structure.",
            text: "This path is for teams that want recurring intelligence rather than a one-off report.",
            evidence: [
              "Brands, platforms or keywords to monitor",
              "Alert destination: email, webhook, Slack, SIEM or portal",
              "Blocking, investigation or takedown workflow",
              "Pilot scope and success criteria",
            ],
          },
          {
            title: "API, data share or marketplace",
            subtitle: "Infrastructure intelligence",
            coverage: "Domain intelligence, ASN/prefix reputation, IP-to-ASN lookup, provider intelligence, historical slices, Snowflake, Databricks, AWS, Azure or GCP marketplace access.",
            action: "Discuss schema, delivery model, refresh cadence, licensing, private offers, evaluation access and technical integration.",
            text: "This path is for buyers who want Datazag intelligence inside their own systems, warehouse, lakehouse or marketplace procurement process.",
            evidence: [
              "Use case and consuming system",
              "API vs data share vs marketplace preference",
              "Volume, cadence and field requirements",
              "Security, procurement and licensing constraints",
            ],
          },
          {
            title: "MSSP, ESP or partner route",
            subtitle: "Your brand, our data",
            coverage: "White-label reports, brand protection, portfolio monitoring, ESP signup checks, outbound-link screening, SMTP enrichment and embedded partner services.",
            action: "Discuss partner packaging, commercial model, customer workflow, white-label requirements, portal integration and data delivery.",
            text: "This path is for organisations that want to use Datazag as the intelligence layer behind their own service or platform.",
            evidence: [
              "Partner type: MSSP, MDR, ESP, platform or consultancy",
              "Customer count, domain volume or message volume",
              "White-label, co-branded or internal-only delivery",
              "Desired service packaging and commercial model",
            ],
          },
        ],
        note: "A single buyer may fit more than one route. For example, an ESP may want a sample report, outbound-link checks, SMTP-log enrichment and a white-label customer protection product.",
      }}
      flagshipFieldsTitle="What to include in the enquiry."
      flagshipFields={[
        { title: "Your domain or portfolio", text: "The domain you want reviewed, or the number of customer, supplier, subsidiary or portfolio domains involved." },
        { title: "Your use case", text: "Report, monitoring, alerting, brand protection, platform impersonation, API enrichment, data share, ESP abuse control or partner service." },
        { title: "Buyer type", text: "SOC, MSSP, ESP, insurer, platform, fraud team, data team, consultancy, agency or business owner." },
        { title: "Delivery preference", text: "Report, email, webhook, API, Snowflake, Databricks, object storage, private marketplace offer or partner portal integration." },
        { title: "Operational workflow", text: "Block, investigate, enrich, report, remediate, monitor, score, takedown, customer-success review or executive reporting." },
        { title: "Timing and scope", text: "Whether this is a one-off review, pilot, partner evaluation, procurement exercise, urgent incident or recurring data requirement." },
      ]}
      exampleAlert={{
        kicker: "Example routed enquiry",
        title: "A better enquiry gives enough context to route correctly.",
        intro: "This is the kind of information the eventual form should capture. It keeps follow-up focused and avoids asking the same qualification questions later.",
        severity: "CONTACT | ROUTING",
        status: "Partner Data Enquiry",
        domain: "MSSP · 120 customer domains · brand protection reports",
        fields: [
          { label: "Path", value: "MSSP / white-label reporting" },
          { label: "Scope", value: "120 customer domains, monthly reports, optional alerts" },
          { label: "Use case", value: "Customer-facing domain health and impersonation exposure reporting" },
          { label: "Delivery", value: "Partner-branded report export and API integration" },
          { label: "Data required", value: "DNS posture, subdomains, platform footprint, impersonation exposure and remediation steps" },
          { label: "Commercial model", value: "Partner package with customer volume tiers" },
          { label: "Next step", value: "Sample report review and pilot scope" },
          { label: "Related page", value: "/reports/sample and /mssp-partners" },
        ],
        reasons: [
          "The enquiry identifies the buyer path",
          "Scope and delivery model are clear",
          "The follow-up can focus on pilot design and commercial packaging",
          "The right internal product route is visible immediately",
        ],
        latency: "Example only — final routing can be wired into a form or CRM later",
      }}
      secondaryExampleAlert={{
        kicker: "Example technical enquiry",
        title: "Data buyers need a different intake path.",
        intro: "A cloud-data or API buyer should be routed towards schema, cadence, licensing and delivery questions rather than a generic sales call.",
        severity: "CONTACT | DATA",
        status: "Marketplace / Data Share Enquiry",
        domain: "Security platform · domain risk enrichment · Snowflake preferred",
        fields: [
          { label: "Path", value: "Infrastructure intelligence / marketplace dataset" },
          { label: "Use case", value: "Join domain risk and ASN context to platform event logs" },
          { label: "Delivery", value: "Snowflake private offer or Iceberg/Delta data share" },
          { label: "Cadence", value: "Daily full snapshot with regular deltas preferred" },
          { label: "Fields", value: "Domain risk, reasons, DNS posture, ASN, provider, platform and historical context" },
          { label: "Licensing", value: "License-clean derived intelligence only" },
          { label: "Evaluation", value: "Sample schema and scoped trial requested" },
          { label: "Related page", value: "/domain-intelligence and /trust" },
        ],
        reasons: [
          "Delivery model is specified early",
          "Schema and cadence become the first discussion",
          "Marketplace/private-offer procurement can be handled separately",
          "Licensing boundaries are explicit from the start",
        ],
        latency: "Example only — exact fields depend on package and marketplace route",
      }}
      packagesTitle="Common enquiry types."
      packages={[
        { title: "Free report", text: "Request a domain report using a work email and review the externally visible posture and exposure." },
        { title: "Threat alerts", text: "Scope monitoring for platform, brand and keyword-led suspicious infrastructure." },
        { title: "Infrastructure intelligence", text: "Discuss API access, data shares, schemas, cadence, licensing and marketplace delivery." },
        { title: "MSSP partnership", text: "Package Datazag intelligence into white-label reports, alerts, portfolio monitoring or SOC enrichment." },
        { title: "ESP partnership", text: "Use Datazag for signup checks, outbound-link screening, data cleaning, SMTP enrichment or branded security services." },
        { title: "Private offer", text: "Discuss Snowflake, Databricks, AWS, Azure, GCP, annual contracts or private marketplace procurement." },
      ]}
      finalTitle="Route the enquiry to the right Datazag path."
      finalBody="Start with the free report if you want to see the data on one domain. Use the contact route for monitoring, partner, API, data-share or marketplace discussions."
    />
  );
}

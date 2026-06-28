import type { Metadata } from "next";

import ProductConceptPage from "@/components/sections/blocks/ProductConceptPage";

export const metadata: Metadata = {
  title: "Pricing — Datazag",
  description:
    "Pricing for Datazag reports, threat intelligence, API credits and cloud data shares.",
};

export default function PricingPage() {
  return (
    <ProductConceptPage
      eyebrow="Pricing"
      title="Choose how you want to consume Datazag."
      intro="Datazag is an internet intelligence platform with several buying paths: free and paid reports, threat intelligence feeds, brand protection, API credits and cloud data shares. Start with the product that fits your workflow, then expand as your use case grows."
      primaryCta={{ label: "Get a free report", href: "/#free-report" }}
      secondaryCta={{ label: "Talk to us", href: "/contact" }}
      proof={[
        { title: "Free", text: "Domain Health Report for a single domain." },
        { title: "Credits", text: "Intelligence API usage purchased through the portal." },
        { title: "Feeds", text: "Platform, keyword and brand-focused threat intelligence." },
        { title: "Shares", text: "Cloud data shares purchased directly or through marketplaces." },
      ]}
      narrative={{
        kicker: "The pricing logic",
        title: "Price by workflow, not by feature list.",
        body: [
          "Different teams consume internet intelligence in different ways. Some need a one-off report, some need a portfolio assessment, some need real-time alerts, some need API enrichment and others need cloud-native datasets inside their analytics stack.",
          "The pricing structure separates those buying paths so buyers can quickly identify the right starting point. Reports are assessment-led, threat intelligence is monitoring-led, the API is credit-based and cloud data shares can be bought directly or through marketplaces.",
          "The free Domain Health Report remains the low-friction entry point. Paid products begin when an organisation wants portfolio coverage, production monitoring, API enrichment or cloud-native data delivery.",
        ],
      }}
      flowTitle="Start small. Scale when you're ready."
      flow={[
        { title: "Free report", text: "Analyse one domain and understand DNS, subdomain, platform and infrastructure exposure." },
        { title: "Portfolio report", text: "Assess multiple domains, brands, subsidiaries or client portfolios in one view." },
        { title: "Threat intelligence", text: "Subscribe to platform, keyword or brand-specific intelligence depending on the workflow." },
        { title: "API or data share", text: "Integrate intelligence into products, portals, SIEM workflows or cloud analytics platforms." },
      ]}
      alertTypeSection={{
        kicker: "Commercial paths",
        title: "Four ways to buy the same underlying intelligence.",
        intro: "Datazag products are powered by the same infrastructure graph. The commercial path depends on whether you need an assessment, an alert feed, a developer integration or a cloud-native dataset.",
        stats: [
          { title: "Reports", text: "Free single-domain report plus paid portfolio assessments." },
          { title: "Threat intelligence", text: "Generic platform and keyword feeds, plus per-brand protection." },
          { title: "API + data", text: "Portal credit purchases and cloud marketplace procurement." },
        ],
        types: [
          {
            title: "Domain Reports",
            subtitle: "Free and portfolio assessments",
            coverage: "DNS posture, platform exposure, subdomain health, visible infrastructure, external exposure and prioritised remediation.",
            action: "Use when a security team, consultant, MSP, investor or portfolio owner needs a clear assessment rather than a continuous feed.",
            text: "Start with the free Domain Health Report for one domain. Move to a paid Portfolio Health Report when you need to assess multiple domains, brands, subsidiaries, acquisition targets or client estates.",
            evidence: [
              "Free Domain Health Report: single-domain assessment",
              "Portfolio Health Report: paid multi-domain assessment",
              "Includes executive summary, technical findings and prioritised remediation",
              "Designed for security teams, MSPs, consultants, private equity and multi-brand organisations",
            ],
          },
          {
            title: "Threat Intelligence",
            subtitle: "Platform, keyword and brand monitoring",
            coverage: "Newly observed domains, certificates, subdomains, DNS, hosting context, platform patterns, keyword matches and brand-scoped evidence.",
            action: "Use when a SOC, MSSP, ESP, brand-protection team or abuse team needs ongoing monitoring rather than a one-off assessment.",
            text: "Platform Intelligence and Keyword Intelligence are generic feeds that customers can filter for relevant platforms, terms and workflows. Brand Protection is scoped per brand, with dedicated monitoring and evidence for customer-owned brands.",
            evidence: [
              "Platform Intelligence Feed: generic feed for major platform impersonation patterns",
              "Keyword Intelligence Feed: generic feed for sensitive terms such as login, payroll, invoice, VPN or HR",
              "Brand Protection: per-brand monitoring, evidence and lifecycle context",
              "Delivery options include portal, webhook, SIEM/SOAR and partner workflows",
            ],
          },
          {
            title: "Intelligence API",
            subtitle: "Credit-based developer access",
            coverage: "Domain lookup, risk scoring, DNS context, provider mapping, platform signals, subdomain context and enrichment fields.",
            action: "Use when intelligence needs to live inside a product, portal, scoring engine, compliance workflow, onboarding process or internal tool.",
            text: "API access is credit-based. Customers can buy credits through the portal and use them for real-time enrichment, bulk scoring and product integrations.",
            evidence: [
              "Portal-based credit purchase",
              "REST API for real-time domain intelligence",
              "Bulk lookup and enrichment workflows",
              "Suitable for ESPs, SaaS platforms, security tools, KYC/KYB and internal risk systems",
            ],
          },
        ],
        note: "Cloud Data Shares are the fourth commercial path: cloud-native datasets delivered directly or through marketplaces. They are designed for buyers who want Datazag intelligence inside Snowflake, Databricks, Fabric, Iceberg, Delta or similar analytics environments.",
      }}
      exampleAlert={{
        kicker: "Product catalogue",
        title: "Reports and threat intelligence cover different buying moments.",
        intro: "Reports help buyers understand exposure at a point in time. Threat intelligence keeps monitoring for new infrastructure, platform patterns, keyword matches and brand-specific impersonation.",
        severity: "PRICING | CATALOGUE",
        status: "Consumption Model",
        domain: "Reports · Threat Intelligence · API · Cloud Data Shares",
        fields: [
          { label: "Free Domain Health Report", value: "Free single-domain assessment and lead-in to the platform" },
          { label: "Portfolio Health Report", value: "Paid multi-domain, multi-brand or multi-entity assessment" },
          { label: "Platform Intelligence Feed", value: "Generic feed; customers filter the platforms relevant to them" },
          { label: "Keyword Intelligence Feed", value: "Generic feed; customers filter terms relevant to their workflows" },
          { label: "Brand Protection", value: "Per-brand monitoring and evidence for customer-owned brands" },
          { label: "Intelligence API", value: "Credit-based usage purchased through the portal" },
          { label: "Cloud Data Shares", value: "Direct purchase or marketplace procurement" },
          { label: "Partner agreements", value: "Separate terms for MSSPs, ESPs, platforms and white-label delivery" },
        ],
        reasons: [
          "Separates one-off assessment from ongoing monitoring",
          "Distinguishes generic feeds from per-brand protection",
          "Makes API pricing credit-based rather than plan-led",
          "Supports both direct and marketplace procurement for data shares",
        ],
        latency: "Use this page to choose the buying path; final scope depends on volume, coverage and delivery route",
      }}
      secondaryExampleAlert={{
        kicker: "What affects final scope",
        title: "The right package depends on coverage, volume and delivery method.",
        intro: "Some products can be bought directly, such as API credits. Others depend on brand count, portfolio size, feed volume, marketplace route or partner use case.",
        severity: "PRICING | SCOPE",
        status: "Scope-Based Adjustments",
        domain: "Brands · domains · keywords · API credits · feeds · cloud shares",
        fields: [
          { label: "Portfolio size", value: "Number of domains, brands, subsidiaries, clients, suppliers or acquisition targets" },
          { label: "Alert category", value: "Platform impersonation, keyword intelligence or brand-specific monitoring" },
          { label: "Brand count", value: "Per-brand pricing for dedicated brand protection workflows" },
          { label: "API usage", value: "Credits purchased through the portal and consumed by lookup or enrichment workflows" },
          { label: "Data delivery", value: "Portal, webhook, SIEM/SOAR, API, Iceberg, Delta, Snowflake, Databricks or marketplace" },
          { label: "Refresh cadence", value: "Report snapshot, hourly updates, near-real-time alerts or custom data-share cadence" },
          { label: "Evidence level", value: "DNS context, screenshots, lifecycle tracking, abuse contacts, PDF evidence or API evidence" },
          { label: "Commercial route", value: "Self-serve, direct contract, private offer, marketplace purchase or partner agreement" },
        ],
        reasons: [
          "Buyers can identify the right entry point before speaking to sales",
          "Generic feeds remain separate from per-brand monitoring",
          "API credits can scale through the portal",
          "Cloud data shares can support procurement through customer marketplaces",
        ],
        latency: "Scope the commercial path around the workflow, not around a generic SaaS plan",
      }}
      packagesTitle="Pricing paths."
      packages={[
        { title: "Free Domain Health Report", text: "Free assessment for one domain. Includes executive summary, DNS health, platform exposure, subdomain review and prioritised remediation." },
        { title: "Portfolio Health Report", text: "Paid assessment for multiple domains, brands, subsidiaries, clients or acquisition targets with portfolio-level risk and domain-level findings." },
        { title: "Platform Intelligence Feed", text: "Generic platform impersonation feed. Customers filter the platforms and workflows relevant to their organisation." },
        { title: "Keyword Intelligence Feed", text: "Generic keyword intelligence feed for sensitive terms such as login, payroll, invoice, VPN, HR or customer-defined themes." },
        { title: "Brand Protection", text: "Per-brand monitoring, evidence and lifecycle context for customer-owned brands and branded attack infrastructure." },
        { title: "Intelligence API", text: "Credit-based API access purchased through the portal for lookup, enrichment, scoring and product integrations." },
        { title: "Cloud Data Shares", text: "Cloud-native datasets available directly or through marketplaces such as Snowflake, Databricks, Fabric or compatible lake formats." },
        { title: "Partner Pricing", text: "Separate agreements for MSSPs, MDRs, ESPs, security vendors, private offers and white-label delivery." },
      ]}
      finalTitle="Choose the entry point. Expand into the platform."
      finalBody="Start with a free report, portfolio assessment, alert feed, API credits or cloud data share. Each path is powered by the same Datazag intelligence graph, so customers can expand without changing platforms."
    />
  );
}

import type { Metadata } from "next";

import ProductConceptPage from "@/components/sections/blocks/ProductConceptPage";

export const metadata: Metadata = {
  title: "ESP Partners — Datazag",
  description:
    "Datazag intelligence for Email Service Providers: white-label brand protection, data cleaning, outbound link risk checks and SMTP log enrichment.",
};

export default function EspPartnersPage() {
  return (
    <ProductConceptPage
      eyebrow="ESP Partners"
      title="Protect deliverability. Reduce fraud exposure. Add new revenue lines."
      intro="Datazag helps Email Service Providers turn domain and infrastructure intelligence into platform value: white-label brand protection, customer data cleaning, outbound link risk checks and enriched SMTP analytics."
      primaryCta={{ label: "Partner with Datazag", href: "/contact" }}
      secondaryCta={{ label: "See pricing", href: "/pricing" }}
      proof={[
        { title: "Commodity pressure", text: "Differentiate beyond send volume, templates and automation by adding security and trust intelligence to your platform." },
        { title: "Regulatory pressure", text: "Show stronger controls to reduce fraud, abuse and negligent platform use by bad actors." },
        { title: "Deliverability pressure", text: "Support cleaner sender behaviour as inbox providers increase expectations around data quality and abuse prevention." },
        { title: "New revenue", text: "Launch partner-branded protection, hygiene and analytics services powered by Datazag data." },
      ]}
      narrative={{
        kicker: "The ESP challenge",
        title: "ESPs need to protect the platform while finding new ways to grow revenue.",
        body: [
          "The ESP market is crowded and price-sensitive. Many providers compete on volume, automation, templates and integrations, which makes it hard to create margin without adding new value around trust, security and data quality.",
          "At the same time, regulators, customers and inbox providers expect ESPs to take stronger steps against online fraud, bad actors, poor list hygiene and malicious campaigns. Deliverability is no longer only a technical performance issue; it is also a trust and abuse-control issue.",
          "Datazag gives ESPs a data layer they can embed into their platform: protect customer brands, clean risky customer data, check outbound campaign links and enrich SMTP logs with external domain and infrastructure intelligence.",
        ],
      }}
      flowTitle="How ESPs use Datazag intelligence."
      flow={[
        { title: "Ingest", text: "Bring Datazag intelligence into onboarding, list hygiene, campaign checks, SMTP logs and customer reporting." },
        { title: "Score", text: "Assess domains, links, brands, platforms and infrastructure before campaigns create deliverability or abuse problems." },
        { title: "Act", text: "Block, throttle, review, warn, clean data, enrich logs or create customer-facing reports." },
        { title: "Monetise", text: "Package white-label brand protection, data cleaning and analytics as premium services under your brand." },
      ]}
      alertTypeSection={{
        kicker: "Four ESP use cases",
        title: "Datazag intelligence can sit inside your platform and your commercial model."
        ,intro: "For ESPs, Datazag should not be positioned as a standalone phishing product. It is a data and intelligence layer that helps you reduce platform risk, improve deliverability controls and create new partner-branded services.",
        stats: [
          { title: "Protect", text: "reduce fraud and abuse exposure." },
          { title: "Improve", text: "support data quality and deliverability." },
          { title: "Monetise", text: "launch branded security services." },
        ],
        types: [
          {
            title: "White-label brand protection",
            subtitle: "New revenue line",
            coverage: "Customer brands, domains, aliases, login terms, impersonation infrastructure, website evidence and abuse contacts.",
            action: "Sell a branded protection service to your customers at your own price, with Datazag powering the intelligence underneath.",
            text: "This gives ESPs a differentiated paid service beyond core sending. Customers get brand monitoring, evidence and protection under the ESP's brand; Datazag supplies the detection and infrastructure data layer.",
            evidence: [
              "Brand impersonation alerts and evidence packs",
              "Screenshots and abuse contacts when content appears",
              "Customer-facing report or portal outputs",
              "White-label or co-branded service packaging",
            ],
          },
          {
            title: "Customer data cleaning",
            subtitle: "Hygiene service",
            coverage: "Customer domains, email domains, landing-page domains, list-quality indicators, risky infrastructure and poor-quality data signals.",
            action: "Build a premium data cleaning service that identifies risky, suspicious or low-quality data before it harms sender reputation.",
            text: "Better customer data supports better deliverability and lower platform abuse risk. Datazag can help identify domains and infrastructure signals that indicate bad data, risky senders or weak customer posture.",
            evidence: [
              "Risk scoring for domains and links in customer data",
              "Weak DNS and email posture indicators",
              "Suspicious or newly observed infrastructure context",
              "Customer-facing hygiene and remediation recommendations",
            ],
          },
          {
            title: "Outbound link risk checks",
            subtitle: "Bad actor detection",
            coverage: "Links, landing-page domains, redirect chains, newly observed domains, parked domains, suspicious subdomains and hosting context.",
            action: "Check links in outbound campaigns before or during send to detect malicious, suspicious or policy-breaking activity using your platform.",
            text: "Bad actors can abuse ESP infrastructure by sending campaigns that link to malicious or deceptive destinations. Datazag gives ESPs a way to score those destinations and route risky sends for block, throttle or review.",
            evidence: [
              "Domain risk and infrastructure context for outbound links",
              "Keyword, platform and brand impersonation signals",
              "Parking, DNS, certificate and hosting context",
              "Inputs for automated block, throttle or review decisions",
            ],
          },
          {
            title: "SMTP log enrichment",
            subtitle: "Deliverability analytics",
            coverage: "Sending domains, recipient-domain patterns, campaign links, infrastructure risk, domain posture and historical context.",
            action: "Enhance SMTP logs and analytics with Datazag intelligence to improve deliverability, abuse detection and customer reporting.",
            text: "SMTP logs become more valuable when joined with domain and infrastructure intelligence. ESPs can improve internal analytics, customer success reporting, abuse operations and deliverability decisions.",
            evidence: [
              "Domain and infrastructure enrichment for logs",
              "Risk and reason fields for analytics pipelines",
              "Signals for deliverability, abuse and reputation teams",
              "API, data-share or warehouse-friendly delivery",
            ],
          },
        ],
        note: "The ESP opportunity is balanced: reduce platform abuse and regulatory exposure while creating new branded services. Datazag provides the intelligence layer; the ESP controls customer experience, pricing, enforcement policy and support model.",
      }}
      exampleAlert={{
        kicker: "Example ESP product line",
        title: "What you can sell under your brand."
        ,intro: "This placeholder shows Datazag as the intelligence layer behind an ESP-branded customer service. Your customer sees your product, your report and your support model; Datazag powers the monitoring and evidence underneath.",
        severity: "PARTNER | WHITE LABEL",
        status: "Brand Protection Add-On",
        domain: "Customer brands · impersonation alerts · evidence packs · reports",
        fields: [
          { label: "Partner offer", value: "Brand Protection powered by Datazag" },
          { label: "Customer experience", value: "Your branded dashboard, reports, alerts and support workflow" },
          { label: "Coverage", value: "Customer brands, domains, aliases, impersonation and related infrastructure" },
          { label: "Evidence", value: "Screenshots, abuse contacts, reason codes and lifecycle state" },
          { label: "Pricing", value: "You choose the customer price and packaging" },
          { label: "Delivery", value: "API, webhook, report export, data share or portal integration" },
          { label: "Commercial impact", value: "New recurring service revenue beyond core sending" },
          { label: "Datazag role", value: "Detection, enrichment and evidence intelligence layer" },
        ],
        reasons: [
          "Adds a differentiated paid service in a commodity market",
          "Uses your existing customer relationship and platform distribution",
          "Provides security value without building internet-scale intelligence collection",
          "Creates an upgrade path from sending platform to trust and protection platform",
        ],
        latency: "White-label service example — final packaging and customer pricing are partner-controlled",
      }}
      secondaryExampleAlert={{
        kicker: "Example platform control",
        title: "How outbound campaign intelligence can reduce abuse risk.",
        intro: "This placeholder shows Datazag as an input to ESP platform controls. A campaign link or landing-page domain can be enriched before the send, during the send or during post-send analysis.",
        severity: "ESP | LINK RISK",
        status: "Outbound Link Review Candidate",
        domain: "campaign-link.example · newly observed · suspicious infrastructure",
        fields: [
          { label: "Decision path", value: "Allow, warn, throttle, block or send to review" },
          { label: "Signal", value: "Newly observed landing-page domain with suspicious infrastructure context" },
          { label: "Campaign context", value: "Outbound link found in customer campaign content" },
          { label: "Risk context", value: "DNS, hosting, certificate, parking and corpus novelty indicators" },
          { label: "Machine output", value: "Structured enrichment for scoring, policy or AI-agent workflow" },
          { label: "Human output", value: "Readable reason codes for abuse, support and customer success teams" },
          { label: "Deliverability impact", value: "Reduce abusive sends that can harm platform reputation" },
          { label: "Analytics output", value: "Join SMTP logs with domain and infrastructure intelligence" },
        ],
        reasons: [
          "Campaign links can carry risk even when the sending account looks normal",
          "Reason codes make enforcement decisions easier to explain",
          "Log enrichment supports deliverability, abuse analytics and customer reporting",
          "Policy thresholds remain under ESP control",
        ],
        latency: "Link-risk example — final checks can run pre-send, near-real-time or in analytics pipelines",
      }}
      packagesTitle="ESP partner motions."
      packages={[
        { title: "White-label brand protection", text: "Sell customer-facing brand monitoring and evidence services under your own brand and pricing." },
        { title: "Data cleaning service", text: "Identify risky, suspicious or low-quality customer data before it harms deliverability or trust." },
        { title: "Outbound link checks", text: "Score campaign links and landing-page domains to detect bad actors using your platform." },
        { title: "SMTP log enrichment", text: "Join send logs with domain, DNS, infrastructure and risk intelligence for deeper analytics." },
        { title: "Deliverability analytics", text: "Support reputation, customer success, abuse and compliance teams with better context." },
        { title: "Customer portal data", text: "Embed Datazag-powered findings into your own reporting, dashboards and premium features." },
      ]}
      finalTitle="Turn trust intelligence into platform value."
      finalBody="Datazag gives ESPs the data layer for abuse prevention, deliverability analytics and partner-branded revenue. You decide how to package it, enforce it and sell it to your customers."
    />
  );
}

import type { Metadata } from "next";

import ProductConceptPage from "@/components/sections/blocks/ProductConceptPage";

export const metadata: Metadata = {
  title: "Pricing — Datazag",
  description:
    "Transparent list pricing for Datazag Threat Alerts, Phishing Defence, Domain Intelligence API, Data Shares and Brand Protection.",
};

export default function PricingPage() {
  return (
    <ProductConceptPage
      eyebrow="Pricing"
      title="Transparent pricing for security intelligence."
      intro="Datazag pricing is structured around how intelligence is consumed: early security signals, brand-scoped phishing incidents, domain enrichment, cloud data shares and evidence-led brand protection. Prices below are current enterprise list pricing and may change as packages evolve."
      primaryCta={{ label: "Get a free report", href: "/#free-report" }}
      secondaryCta={{ label: "See reports", href: "/reports" }}
      proof={[
        { title: "$499/mo", text: "Domain Intelligence API Developer tier for evaluation and integration." },
        { title: "$1,500/mo", text: "Security Signalling Foundation and Brand Defender entry points." },
        { title: "$2,500/mo", text: "Single-brand Phishing Defence for brand-scoped incidents and evidence." },
        { title: "$5,500/mo", text: "Operational Security Signalling for active SOC workflows." },
      ]}
      narrative={{
        kicker: "The pricing logic",
        title: "Price by the way intelligence is consumed.",
        body: [
          "Security teams do not all consume intelligence in the same way. Some need near-real-time signals in a SIEM or SOAR workflow. Some need brand-specific phishing incidents with evidence. Others need API enrichment, cloud-native datasets or legal-ready evidence packs.",
          "The current pricing structure separates those buying paths so a prospect can understand the starting point before speaking to Datazag. Larger deployments, cloud marketplace private offers and partner/MSSP agreements can still be scoped separately.",
          "The free report remains the lead magnet and demonstration path. The paid pricing below starts where an organisation moves from one-domain visibility into production intelligence, monitoring, evidence or data delivery.",
        ],
      }}
      flowTitle="A simple path from free report to production intelligence."
      flow={[
        { title: "Report", text: "Start with a free domain report to see DNS posture, visible platforms and impersonation context." },
        { title: "Signal", text: "Use Threat Alerts for early detection of suspicious domains, certificates, DNS and infrastructure." },
        { title: "Defend", text: "Use Phishing Defence or Brand Protection when incidents require evidence, lifecycle tracking or takedown support." },
        { title: "Integrate", text: "Use the Domain Intelligence API or Data Share when intelligence needs to live inside your systems." },
      ]}
      alertTypeSection={{
        kicker: "Main product lines",
        title: "Choose the commercial path that matches the workflow.",
        intro: "The current published pricing is best understood as five product lines: Threat Alerts, Phishing Defence, Domain Intelligence API, Domain Intelligence Data Share and Brand Protection. Partner and MSSP pricing remains separate from these enterprise list prices.",
        stats: [
          { title: "Alerts", text: "from $1,500/month for upstream security signalling." },
          { title: "API", text: "from $499/month for domain intelligence enrichment." },
          { title: "Brand", text: "from $2,500/month for brand-scoped phishing defence." },
        ],
        types: [
          {
            title: "Threat Alerts",
            subtitle: "Security Signalling",
            coverage: "Newly created domains, certificates, DNS changes, hosting context, parking detection and suspicious infrastructure signals.",
            action: "Use when SOC, SIEM, SOAR, ESP abuse or MSSP teams need early warning before campaigns are fully operational.",
            text: "Threat Alerts provide upstream security signals. Foundation is designed for integration and evaluation; Operational adds screenshot capture, lifecycle tracking, abuse contact details and higher-frequency polling; Enterprise handles scale and private offers.",
            evidence: [
              "Foundation: $1,500/month",
              "Operational: $5,500/month",
              "Enterprise: $10,500–$15,500/month",
              "Includes structured JSON signals, DNS and infrastructure context, lifecycle updates and optional higher-support terms",
            ],
          },
          {
            title: "Phishing Defence",
            subtitle: "Brand-scoped incidents",
            coverage: "Brand-specific phishing incidents enriched with DNS, hosting, lifecycle and evidence context.",
            action: "Use when an enterprise, ESP or MSSP needs brand-specific incident creation, evidence and takedown-ready intelligence.",
            text: "Phishing Defence converts upstream signals into brand-scoped incidents. It is the operational bridge between early infrastructure detection and actionable brand protection workflows.",
            evidence: [
              "Single Brand: $2,500/month",
              "5 Brand Pack: $10,000/month",
              "10 Brand Pack: $15,000/month",
              "Includes early incident creation, live DNS/mail/hosting assessment, visual evidence and lifecycle tracking",
            ],
          },
          {
            title: "Domain Intelligence API",
            subtitle: "Real-time enrichment",
            coverage: "Low-latency domain enrichment for security, email, compliance, KYC/KYB, abuse and product workflows.",
            action: "Use when domains need to be scored or enriched inside an existing product, workflow or platform.",
            text: "The API gives teams direct access to domain intelligence without needing a full data share. It is useful for evaluation, production enrichment and higher-scale platform use cases.",
            evidence: [
              "Developer: $499/month — 100,000 API queries/month, 10 requests/sec, non-commercial evaluation",
              "Business: $2,499/month — 1M API queries/month, 50 requests/sec, commercial use",
              "Enterprise: $8,500/month — custom query volumes and additional DNS/risk fields",
              "Usage upgrades are handled by plan adjustment rather than per-request overage billing",
            ],
          },
        ],
        note: "Domain Intelligence Data Share and Brand Protection are larger or more specialised buying paths. Data Share starts from $5,000/month for Standard, $10,000/month for Advanced and $20,000/month for Enterprise. Brand Protection starts at $1,500/month for Brand Defender, $4,900/month for Corporate Guardian and $12,000/month for Global Enterprise.",
      }}
      exampleAlert={{
        kicker: "Published price card",
        title: "Current enterprise list pricing snapshot.",
        intro: "This section mirrors the existing published pricing structure. The exact package names and prices can change, but it gives the pricing page a concrete starting point rather than a generic contact-us message.",
        severity: "PRICING | LIST",
        status: "Current Published Pricing",
        domain: "Threat Alerts · Phishing Defence · Domain Intelligence · Brand Protection",
        fields: [
          { label: "Threat Alerts Foundation", value: "$1,500/month" },
          { label: "Threat Alerts Operational", value: "$5,500/month" },
          { label: "Threat Alerts Enterprise", value: "$10,500–$15,500/month" },
          { label: "Phishing Defence", value: "$2,500/month single brand · $10,000/month 5 brands · $15,000/month 10 brands" },
          { label: "Domain Intelligence API", value: "$499/month Developer · $2,499/month Business · $8,500/month Enterprise" },
          { label: "Domain Intelligence Data Share", value: "from $5,000/month Standard · $10,000/month Advanced · $20,000/month Enterprise" },
          { label: "Brand Protection", value: "$1,500/month Brand Defender · $4,900/month Corporate Guardian · $12,000/month Global Enterprise" },
          { label: "Partner and MSSP pricing", value: "Separate agreements" },
        ],
        reasons: [
          "Shows public pricing instead of forcing every buyer into a sales conversation",
          "Keeps enterprise list pricing distinct from partner, MSSP and private-offer pricing",
          "Separates signal, incident, API, data-share and evidence-pack buying paths",
          "Leaves room for the package names and prices to change as the offer matures",
        ],
        latency: "Current published pricing snapshot — subject to package and commercial updates",
      }}
      secondaryExampleAlert={{
        kicker: "What affects final scope",
        title: "List prices set expectations; scope defines the final package.",
        intro: "Most buyers should be able to self-qualify from the published prices. The final quote may still depend on coverage, volume, delivery method, evidence requirements, marketplace route and support needs.",
        severity: "PRICING | SCOPE",
        status: "Scope-Based Adjustments",
        domain: "Brands · domains · signals · API volume · data delivery · support",
        fields: [
          { label: "Monitored entities", value: "Brands, domains, subsidiaries, suppliers, clients or acquisition targets" },
          { label: "Signal volume", value: "New domains, certificates, DNS changes, alert volume and investigation window" },
          { label: "Evidence level", value: "Screenshots, lifecycle tracking, HTML capture, abuse contacts, PDF or API evidence packages" },
          { label: "API volume", value: "Query allowance, request rate, commercial use and custom fields" },
          { label: "Data delivery", value: "API, webhooks, SIEM/SOAR, cloud marketplace, Iceberg, Delta or private data share" },
          { label: "Refresh cadence", value: "Standard polling, 5-minute polling, daily refreshes, hourly updates or custom cadence" },
          { label: "Support", value: "Community/docs, email/chat, onboarding, tuning, SLAs or dedicated support" },
          { label: "Commercial model", value: "Monthly plan, annual agreement, private offer, partner agreement or service-provider terms" },
        ],
        reasons: [
          "Published prices create confidence and reduce friction",
          "Scope-based adjustments protect large or data-heavy deployments",
          "Cloud marketplace and partner agreements can be handled separately",
          "The free report remains the low-friction entry point before paid production use",
        ],
        latency: "Use list pricing for buyer orientation and scope-based terms for final contracts",
      }}
      packagesTitle="Pricing paths."
      packages={[
        { title: "Threat Alerts", text: "Foundation $1,500/mo, Operational $5,500/mo, Enterprise $10,500–$15,500/mo for upstream security signalling." },
        { title: "Phishing Defence", text: "Single Brand $2,500/mo, 5 Brand Pack $10,000/mo, 10 Brand Pack $15,000/mo for brand-scoped phishing incidents." },
        { title: "Domain Intelligence API", text: "Developer $499/mo, Business $2,499/mo, Enterprise $8,500/mo for real-time domain enrichment." },
        { title: "Domain Intelligence Data Share", text: "Standard from $5,000/mo, Advanced from $10,000/mo, Enterprise from $20,000/mo for cloud-native datasets." },
        { title: "Brand Protection", text: "Brand Defender $1,500/mo, Corporate Guardian $4,900/mo, Global Enterprise $12,000/mo for evidence packages." },
        { title: "Partner Pricing", text: "Separate agreements for MSSPs, MDRs, ESPs, security vendors, private offers and white-label delivery." },
      ]}
      finalTitle="Show the price. Scope the deployment."
      finalBody="The pricing page should give buyers enough information to decide whether Datazag fits their budget, while reserving custom terms for large enterprise deployments, cloud marketplace delivery and partner agreements."
    />
  );
}

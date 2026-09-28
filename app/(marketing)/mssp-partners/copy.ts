import type { PageContent } from "@/sanity/seedMarketingCopy";

export const SLUG = "mssp-partners";
export const TITLE = "MSSP Partners";

// 2026-09-28 — REBUILT around two things (site-edits brief, Edit 2):
//   1. The spine: "Your service in front. Our intelligence behind it." — our
//      data, the partner's brand. Now the hero title.
//   2. The scarce asset: the domain corpus, DNS history, certificate
//      transparency, BGP and provider attribution, and the relationships
//      between them (components/partners/CorpusAdvantage.tsx, store-backed).
//
// HELD until the false-positive measurement backs them: threat alert feeds,
// brand protection / impersonation monitoring, and any "we detect threats"
// line. They come back as catalog items when the FP number supports them.
// "AI analyst review" is no longer sold as a differentiator — everyone has AI.
// Also held, as before: "early", "real-time", "managed detection" as what we
// supply, and any analyst-workload promise (WU28).
//
// PUBLISHED because they are proven: enrichment and coverage, cross-client
// concentration, email posture, and internet-scale findings (the Observatory).
//
// No figures in this file: it is seeded into Sanity, where a typed number
// would freeze. Figures render from the stores in CorpusAdvantage.
export const content: PageContent = {
  hero: {
    eyebrow: "Threat intelligence · MSSP partners",
    title: "Your service in front. Our intelligence behind it.",
    body: "Datazag holds what very few organizations have: the live domain corpus with its DNS history, certificate transparency, BGP routing and provider attribution, and the infrastructure links between them. You turn it into services for your clients.",
    secondaryBody: "SOC enrichment, cross-client exposure, email security reviews and reporting. Every finding comes with its evidence, and every service carries your brand.",
    primaryCta: { label: "Start a partner pilot", href: "/contact" },
    secondaryCta: { label: "Explore partner services", href: "#services" },
  },
  partnerValue: {
    eyebrow: "Partner value",
    title: "Launch new services. Keep the margin.",
    body: "Use Datazag instead of building internet-scale collection, then package the same intelligence into new client-facing revenue lines.",
    items: [
      { key: "evidence-first", title: "Give analysts the evidence", text: "Each finding arrives with its infrastructure context and the records behind it, so an analyst can check it rather than rebuild it." },
      { key: "launch-services", title: "Launch new services", text: "Add SOC enrichment, email security reviews, exposure reports and portfolio monitoring without building the intelligence layer yourself." },
      { key: "deliver-brand", title: "Deliver under your brand", text: "Keep the service experience inside your own portal, reports, account reviews and commercial model." },
      { key: "integrate-stack", title: "Integrate into your stack", text: "Use API, webhooks, reports, exports or cloud data shares depending on how your operations and customers already work." },
    ],
  },
  serviceCatalogue: {
    eyebrow: "Partner service catalog",
    title: "Create services your clients already understand.",
    body: "Choose the first commercial motion: SOC enrichment, cross-client exposure, email security reviews, client reporting, portal intelligence or a premium add-on to existing services.",
    items: [
      { key: "soc-enrichment", title: "SOC enrichment", text: "Add domain, DNS, certificate, network, provider and relationship context to cases and investigations.", tags: ["Domain context", "DNS history", "Certificates", "Network and provider", "Related infrastructure"] },
      { key: "cross-client", title: "Cross-client exposure", text: "See which mail, DNS, hosting and CDN providers your clients share, so a provider problem shows up as one view across your client base.", tags: ["Shared providers", "Shared networks", "Concentration", "Client-scoped views"] },
      { key: "email-security", title: "Email security reviews", text: "Show each client which of their domains can take mail, whether DMARC is enforced, and where their mail setup is incomplete.", tags: ["DMARC enforcement", "SPF", "MTA-STS", "Mail provider", "Parked domains"] },
      { key: "portfolio-monitoring", title: "Portfolio monitoring", text: "Track posture and infrastructure changes across client domains, subsidiaries and suppliers.", tags: ["DNS posture", "Email posture", "Historical changes", "Provider changes"] },
      { key: "internet-findings", title: "Internet-scale findings", text: "Put a client's estate in context with findings measured across the whole internet, the kind we publish in the Observatory.", tags: ["Observatory", "Benchmarks", "Dated figures", "Method notes"] },
      { key: "client-reporting", title: "Client reporting", text: "Create recurring security reports for account reviews, executive updates and remediation planning.", tags: ["Executive summaries", "Technical evidence", "Trend analysis", "Remediation queues", "White-label exports"] },
      { key: "portal-intelligence", title: "Customer portal intelligence", text: "Embed Datazag intelligence inside your own portal, dashboards and customer-facing service views.", tags: ["API outputs", "Webhook events", "Data shares", "Client-scoped views", "Custom exports"] },
    ],
  },
  howDatazagFits: {
    eyebrow: "How Datazag fits",
    title: "Who does what.",
    body: "You own the client, packaging and operational decisions. Datazag supplies the external intelligence and the delivery routes.",
    items: [
      { key: "client-relationship", title: "Client relationship", points: ["Partner owns the relationship", "Datazag supports behind the scenes"] },
      { key: "commercial-packaging", title: "Commercial packaging", points: ["Partner defines offer, pricing and SLA", "Datazag supplies intelligence and delivery options"] },
      { key: "collection", title: "Internet-scale collection", points: ["Partner avoids building this", "Datazag observes and links the infrastructure graph"] },
      { key: "reports-portal", title: "Reports and portal", points: ["Partner brands the experience", "Datazag powers findings, evidence and data exports"] },
      { key: "operational-workflows", title: "Operational workflows", points: ["Partner controls triage, blocking and escalation", "Datazag supplies evidence, context and relationships"] },
    ],
  },
  commercialModel: {
    eyebrow: "Commercial model",
    title: "Built for partner margin, not channel conflict.",
    body: "The model is designed so the MSSP owns the customer relationship, commercial packaging and service margin. Datazag provides the intelligence infrastructure as a predictable wholesale layer behind the offer.",
    items: [
      { key: "owns-pricing", title: "Partner owns pricing", text: "You decide how the service is packaged, bundled, marked up and sold to clients. Datazag does not set your end-customer price." },
      { key: "wholesale-layer", title: "Datazag is the wholesale layer", text: "The intelligence layer is priced by scope: client estate, domains, data volume, delivery route, white-label needs and SLA." },
      { key: "service-margin", title: "Designed for service margin", text: "Partner terms are designed to leave room for meaningful managed-service margin without publishing a fixed discount or margin percentage." },
      { key: "no-conflict", title: "No channel conflict by design", text: "For partner-led accounts, the client relationship stays with the MSSP. Datazag remains infrastructure behind the managed service." },
    ],
  },
  marginPrinciple: {
    eyebrow: "Margin principle",
    title: "Partner price minus Datazag platform cost equals the service margin you control.",
    body: "Partner economics depend on how the service is packaged: enrichment, reporting, remediation, portal intelligence or a premium add-on. Datazag is designed as a predictable input cost so partners can build repeatable recurring revenue around it. Specific discounts and margin targets are handled privately in the partner agreement.",
  },
  marginLevers: {
    items: [
      { key: "attach-clients", title: "Attach to existing clients", text: "Add enrichment, email security reviews, exposure reporting or monitoring to accounts you already serve." },
      { key: "one-layer", title: "Use one intelligence layer", text: "Reuse the same data across reports, portal features and SOC enrichment." },
      { key: "reuse-evidence", title: "Reuse the evidence", text: "The same findings and records feed reports and client reviews, so one investigation serves many outputs." },
      { key: "package-premium", title: "Package premium services", text: "Sell evidence, monitoring, remediation and reporting rather than raw data access." },
    ],
  },
  usageRightsIntro: {
    eyebrow: "Usage rights",
    title: "Built for services, not raw data resale.",
    body: "Partners can package Datazag intelligence into their own managed services; Datazag data itself remains a licensed intelligence layer. Detailed terms are handled in the partner agreement.",
  },
  usageRights: {
    items: [
      { key: "included", title: "Included", text: "Use Datazag intelligence to power partner-led managed services, reports, enrichment workflows and portal features for your own end clients." },
      { key: "not-standalone", title: "Not standalone resale", text: "Raw data, API access, data shares or bulk exports are not for resale, sublicensing, marketplace publication or standalone redistribution by default." },
      { key: "downstream", title: "Downstream partners", text: "Services sold through your own resellers, franchisees or channel partners require written approval, pass-through terms and a separate commercial model." },
    ],
  },
  operatingModel: {
    eyebrow: "Operating model",
    title: "From internet observations to partner revenue.",
    body: "Datazag collects, links and explains the infrastructure signal. MSSPs turn it into services, decisions and recurring customer value.",
    items: [
      { key: "observe", title: "Observe", text: "Datazag measures domains, DNS, certificates, routing and infrastructure changes." },
      { key: "enrich", title: "Enrich", text: "Each observation is linked to its hosting, network, provider, related domains and history." },
      { key: "explain", title: "Explain", text: "Outputs include the evidence behind them, so each finding can be checked." },
      { key: "deliver", title: "Deliver", text: "You receive API responses, webhook events, reports or data shares through the route that fits your service model." },
      { key: "monetise", title: "Monetise", text: "You package it as SOC enrichment, email security reviews, exposure reporting or portal intelligence." },
    ],
  },
  delivery: {
    eyebrow: "Delivery",
    title: "Use the route that fits your service model.",
    body: "The same intelligence layer can support analyst workflows, customer portals, managed reports, automated enrichment and data-driven partner products.",
    items: [
      { key: "api", title: "API", text: "Lookups for portals, case management, customer products and AI-assisted workflows, with evidence in every answer." },
      { key: "webhooks", title: "Webhooks", text: "Push changes to your clients' domains and new findings into your existing ticketing or automation flows." },
      { key: "reports-exports", title: "Reports and exports", text: "Generate white-label evidence packs, account-review material and recurring client-facing reports." },
      { key: "cloud-shares", title: "Cloud data shares", text: "Use Iceberg or Delta datasets for partner analytics, hunting, client-scoped views and large-scale enrichment." },
    ],
  },
  pilotPath: {
    eyebrow: "Pilot path",
    title: "Start with a small cohort, then package the service.",
    body: "A partner pilot should prove the value of the intelligence, operational fit and commercial packaging before scaling across the client base.",
    items: [
      { key: "select-cohort", title: "Select a cohort", text: "Choose a small group of clients, domains or use cases where external infrastructure intelligence should create visible value." },
      { key: "connect-delivery", title: "Connect delivery", text: "Start with reports, API, webhook events or a sample data view depending on how your team wants to evaluate." },
      { key: "validate", title: "Validate the findings", text: "Review the evidence, the triage fit and the reporting value for your client base." },
      { key: "package", title: "Package the service", text: "Decide whether the first commercial motion is enrichment, cross-client exposure, email security reviews or portfolio monitoring." },
    ],
  },
  finalCta: {
    eyebrow: "Next step",
    title: "Build the partner offer around your clients.",
    body: "Start with a client cohort, validate the intelligence, then decide whether the first commercial motion is SOC enrichment, cross-client exposure, email security reviews, reporting or portfolio monitoring.",
    primaryCta: { label: "Start a partner pilot", href: "/contact" },
  },
};

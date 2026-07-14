import type { PageContent } from "@/sanity/seedMarketingCopy";

export const SLUG = "mssp-partners";
export const TITLE = "MSSP Partners";

export const content: PageContent = {
  hero: {
    eyebrow: "MSSP Partners",
    title: "Add infrastructure intelligence to your managed security services.",
    body: "Datazag gives MSSPs the domain, DNS, certificate, infrastructure and early alert layer behind managed detection, brand protection, portfolio monitoring and client reporting services.",
    secondaryBody: "Keep the client relationship and service experience under your brand while Datazag powers the data, alerts, evidence and monitoring underneath.",
    primaryCta: { label: "Start a partner pilot", href: "/contact" },
    secondaryCta: { label: "Explore partner services", href: "#services" },
  },
  partnerValue: {
    eyebrow: "Partner value",
    title: "Reduce costs. Increase recurring revenue.",
    body: "Use Datazag to reduce the cost of operating security services, then package the same intelligence into new client-facing revenue lines.",
    items: [
      { key: "reduce-workload", title: "Reduce analyst workload", text: "Reasoned early alerts and infrastructure context help analysts triage faster and give automation enough evidence to act when confidence is high." },
      { key: "launch-services", title: "Launch new services", text: "Add alert feeds, brand protection, portfolio monitoring, customer reports and SOC enrichment without building the intelligence layer yourself." },
      { key: "deliver-brand", title: "Deliver under your brand", text: "Keep the service experience inside your own portal, reports, alerts, account reviews and commercial model." },
      { key: "integrate-stack", title: "Integrate into your stack", text: "Use alerts, API, webhooks, reports, exports or cloud data shares depending on how your operations and customers already work." },
    ],
  },
  serviceCatalogue: {
    eyebrow: "Partner service catalog",
    title: "Create services your clients already understand.",
    body: "Choose the first commercial motion: early alerts, managed detection, client reporting, remediation support, portal intelligence or a premium add-on to existing services.",
    items: [
      { key: "early-alert", title: "Early alert feed", text: "Detect newly observed impersonation and high-risk infrastructure early enough to support blocks, triage and escalation.", tags: ["Platform matches", "Brand matches", "Certificates", "DNS changes", "Reason codes"] },
      { key: "brand-protection", title: "Brand protection", text: "Monitor client brands, platforms and high-risk keywords for early impersonation infrastructure.", tags: ["New domains", "Certificates", "DNS", "Hosting context", "Evidence packs"] },
      { key: "soc-enrichment", title: "SOC enrichment", text: "Add domain, DNS, ASN, provider and relationship context to cases, detections and investigation workflows.", tags: ["Domain risk", "ASN context", "Provider labels", "Related infrastructure", "Reason codes"] },
      { key: "portfolio-monitoring", title: "Portfolio monitoring", text: "Track risk, posture and infrastructure changes across client domains, subsidiaries, suppliers and brands.", tags: ["DNS posture", "Email posture", "Historical changes", "Platform exposure", "Risk trends"] },
      { key: "client-reporting", title: "Client reporting", text: "Create recurring security reports for account reviews, executive updates and remediation planning.", tags: ["Executive summaries", "Technical evidence", "Trend analysis", "Remediation queues", "White-label exports"] },
      { key: "evidence-packs", title: "Evidence packs", text: "Give analysts and customers clear evidence for blocking, escalation, takedown and remediation decisions.", tags: ["Reason codes", "DNS evidence", "Certificate evidence", "Infrastructure links", "Confidence context"] },
      { key: "portal-intelligence", title: "Customer portal intelligence", text: "Embed Datazag intelligence inside your own portal, dashboards and customer-facing service views.", tags: ["API outputs", "Webhook events", "Data shares", "Client-scoped views", "Custom exports"] },
    ],
  },
  howDatazagFits: {
    eyebrow: "How Datazag fits",
    title: "Your service in front. Our intelligence behind it.",
    body: "You own the client, packaging and operational decisions. Datazag supplies the external intelligence, early alerts and delivery routes.",
    items: [
      { key: "client-relationship", title: "Client relationship", points: ["Partner owns the relationship", "Datazag supports behind the scenes"] },
      { key: "commercial-packaging", title: "Commercial packaging", points: ["Partner defines offer, pricing and SLA", "Datazag supplies intelligence and delivery options"] },
      { key: "collection", title: "Internet-scale collection", points: ["Partner avoids building this", "Datazag observes and enriches the infrastructure graph"] },
      { key: "reports-portal", title: "Reports and portal", points: ["Partner brands the experience", "Datazag powers findings, alerts, evidence and data exports"] },
      { key: "operational-workflows", title: "Operational workflows", points: ["Partner controls triage, blocking and escalation", "Datazag supplies early alerts, signals, reasons and context"] },
    ],
  },
  commercialModel: {
    eyebrow: "Commercial model",
    title: "Built for partner margin, not channel conflict.",
    body: "The model is designed so the MSSP owns the customer relationship, commercial packaging and service margin. Datazag provides the intelligence infrastructure as a predictable wholesale layer behind the offer.",
    items: [
      { key: "owns-pricing", title: "Partner owns pricing", text: "You decide how the service is packaged, bundled, marked up and sold to clients. Datazag does not set your end-customer price." },
      { key: "wholesale-layer", title: "Datazag is the wholesale layer", text: "The intelligence layer is priced by scope: client estate, domains, brands, data volume, delivery route, white-label needs and SLA." },
      { key: "service-margin", title: "Designed for service margin", text: "Partner terms are designed to leave room for meaningful managed-service margin without publishing a fixed discount or margin percentage." },
      { key: "no-conflict", title: "No channel conflict by design", text: "For partner-led accounts, the client relationship stays with the MSSP. Datazag remains infrastructure behind the managed service." },
    ],
  },
  marginPrinciple: {
    eyebrow: "Margin principle",
    title: "Partner price minus Datazag platform cost equals the service margin you control.",
    body: "Partner economics depend on how the service is packaged: managed detection, reporting, remediation, portal intelligence, data enrichment or a premium add-on. Datazag is designed as a predictable input cost so partners can build repeatable recurring revenue around it. Specific discounts and margin targets are handled privately in the partner agreement.",
  },
  marginLevers: {
    items: [
      { key: "attach-clients", title: "Attach to existing clients", text: "Add alerting, brand protection, reporting or enrichment to accounts you already serve." },
      { key: "one-layer", title: "Use one intelligence layer", text: "Reuse the same data across alerts, reports, portal features and SOC enrichment." },
      { key: "reduce-effort", title: "Reduce analyst effort", text: "Reasoned outputs reduce manual investigation time and make automation easier to trust." },
      { key: "package-premium", title: "Package premium services", text: "Sell evidence, monitoring, remediation, alerts and reporting rather than raw data access." },
    ],
  },
  usageRightsIntro: {
    eyebrow: "Usage rights",
    title: "Built for services, not raw data resale.",
    body: "Partners can package Datazag intelligence into their own managed services; Datazag data itself remains a licensed intelligence layer. Detailed terms are handled in the partner agreement.",
  },
  usageRights: {
    items: [
      { key: "included", title: "Included", text: "Use Datazag intelligence to power partner-led managed services, reports, alerts, enrichment workflows and portal features for your own end clients." },
      { key: "not-standalone", title: "Not standalone resale", text: "Raw data, API access, data shares or bulk exports are not for resale, sublicensing, marketplace publication or standalone redistribution by default." },
      { key: "downstream", title: "Downstream partners", text: "Services sold through your own resellers, franchisees or channel partners require written approval, pass-through terms and a separate commercial model." },
    ],
  },
  operatingModel: {
    eyebrow: "Operating model",
    title: "From internet observations to partner revenue.",
    body: "Datazag collects and explains the infrastructure signal. MSSPs convert that signal into alerts, services, decisions and recurring customer value.",
    items: [
      { key: "observe", title: "Observe", text: "Datazag monitors domains, DNS, certificates, routing and infrastructure changes." },
      { key: "enrich", title: "Enrich", text: "Signals are expanded with hosting, ASN, platform, relationship and historical context." },
      { key: "explain", title: "Explain", text: "Outputs include reason codes, evidence and confidence so alerts and decisions are easier to trust." },
      { key: "deliver", title: "Deliver", text: "You receive alerts, API responses, webhook events, reports or data shares through the route that fits your service model." },
      { key: "monetise", title: "Monetise", text: "You package it as managed alerting, reporting, enrichment, portal intelligence or detection workflows." },
    ],
  },
  delivery: {
    eyebrow: "Delivery",
    title: "Use the route that fits your service model.",
    body: "The same intelligence layer can support alerts, analyst workflows, customer portals, managed reports, automated enrichment and data-driven partner products.",
    items: [
      { key: "alerts", title: "Alerts", text: "Reasoned early alerts for impersonation infrastructure, suspicious certificates, risky DNS changes and high-confidence block candidates." },
      { key: "api", title: "API", text: "Real-time enrichment for portals, case management, scoring, customer products and AI-assisted workflows." },
      { key: "webhooks", title: "Webhooks", text: "Push important changes and early signals into your existing alerting, ticketing or automation flows." },
      { key: "reports-exports", title: "Reports and exports", text: "Generate white-label evidence packs, account-review material and recurring client-facing reports." },
      { key: "cloud-shares", title: "Cloud data shares", text: "Use Iceberg or Delta datasets for partner analytics, hunting, client-scoped views and large-scale enrichment." },
    ],
  },
  pilotPath: {
    eyebrow: "Pilot path",
    title: "Start with a small cohort, then package the service.",
    body: "A partner pilot should prove signal quality, operational fit and commercial packaging before scaling across the client base.",
    items: [
      { key: "select-cohort", title: "Select a cohort", text: "Choose a small group of clients, brands, domains or use cases where external infrastructure intelligence should create visible value." },
      { key: "connect-delivery", title: "Connect delivery", text: "Start with alerts, reports, API, webhook events or a sample data view depending on how your team wants to evaluate." },
      { key: "validate", title: "Validate the findings", text: "Review alert quality, evidence, triage fit, false-positive handling and the reporting value for your client base." },
      { key: "package", title: "Package the service", text: "Decide whether the first commercial motion is early alerts, enrichment, reports, brand protection or portfolio monitoring." },
    ],
  },
  finalCta: {
    eyebrow: "Next step",
    title: "Build the partner offer around your clients.",
    body: "Start with a client cohort, validate the intelligence, then decide whether the first commercial motion is early alerts, SOC enrichment, brand protection, reporting or portfolio monitoring.",
    primaryCta: { label: "Start a partner pilot", href: "/contact" },
  },
};

import type { PageContent } from "@/sanity/seedMarketingCopy";

export const SLUG = "esp-partners";
export const TITLE = "ESP Partners";

export const content: PageContent = {
  hero: {
    eyebrow: "ESP Partners",
    title: "Add domain, link and infrastructure intelligence to your email platform.",
    body: "Datazag helps Email Service Providers score signup domains, outbound links, landing pages and infrastructure before fast abuse damages sender reputation.",
    secondaryBody: "Keep the customer experience under your brand while Datazag powers the risk signals, alerts, evidence and enrichment underneath.",
    primaryCta: { label: "Start an ESP partner pilot", href: "/contact" },
    secondaryCta: { label: "Explore ESP services", href: "#services" },
  },
  partnerValue: {
    eyebrow: "Partner value",
    title: "Protect reputation. Create new customer value.",
    body: "Use Datazag to reduce the cost and speed of abuse detection, then package the same intelligence into customer-facing trust, hygiene and protection services.",
    items: [
      { key: "stop-abuse", title: "Stop fast abuse", text: "Score signup domains, campaign links and landing pages before bad actors can burn sender reputation and disappear." },
      { key: "protect-deliverability", title: "Protect deliverability", text: "Give abuse, compliance and deliverability teams external context for the domains, links and infrastructure moving through the platform." },
      { key: "launch-services", title: "Launch new services", text: "Add brand protection, customer hygiene reports, link-risk checks and deliverability intelligence as paid customer-facing offers." },
      { key: "embed-workflow", title: "Embed into your workflow", text: "Use API, webhooks, reports, exports or cloud data shares across onboarding, pre-send checks, abuse review and analytics pipelines." },
    ],
  },
  serviceCatalogue: {
    eyebrow: "Partner service catalogue",
    title: "Create services around trust, abuse and deliverability.",
    body: "Choose the first commercial motion: signup screening, pre-send link checks, early abuse alerts, customer hygiene, deliverability intelligence or brand protection.",
    items: [
      { key: "signup-screening", title: "Signup risk screening", text: "Check customer domains, websites, DNS posture, email setup and infrastructure history before low-cost accounts can abuse the platform.", tags: ["Customer domains", "Website context", "DNS posture", "Hosting signals", "Risk reasons"] },
      { key: "presend-links", title: "Pre-send link checks", text: "Score outbound links, landing pages, redirect chains and suspicious subdomains before or during campaign send.", tags: ["Campaign links", "Landing domains", "Redirect chains", "New domains", "Block candidates"] },
      { key: "early-abuse", title: "Early abuse alerts", text: "Surface risky domain, certificate, DNS and infrastructure changes that may indicate abuse before the campaign has fully developed.", tags: ["Early alerts", "Certificates", "DNS changes", "Infrastructure links", "Reason codes"] },
      { key: "smtp-enrichment", title: "SMTP log enrichment", text: "Join send logs and campaign history with domain, DNS, infrastructure and risk intelligence for deeper abuse and deliverability analytics.", tags: ["Sending domains", "Recipient patterns", "Risk fields", "History", "Warehouse joins"] },
      { key: "data-hygiene", title: "Customer data hygiene", text: "Identify suspicious, weak or low-quality customer data before it creates deliverability, fraud or platform-trust problems.", tags: ["List quality", "Domain quality", "Disposable signals", "DNS posture", "Remediation notes"] },
      { key: "brand-protection", title: "Brand protection add-on", text: "Offer customers monitoring for brand impersonation, suspicious domains and evidence packs under your own product experience.", tags: ["Customer brands", "Impersonation alerts", "Evidence packs", "Abuse contacts", "Reports"] },
      { key: "deliverability-intel", title: "Deliverability intelligence", text: "Give deliverability and customer-success teams better context for risk, reputation, customer behaviour and domain posture.", tags: ["Domain posture", "Infrastructure risk", "Trend analysis", "Customer reports", "Account reviews"] },
    ],
  },
  howDatazagFits: {
    eyebrow: "How Datazag fits",
    title: "Your platform in front. Our intelligence behind it.",
    body: "You own the customer, policy and enforcement decisions. Datazag supplies external domain, link, DNS, certificate and infrastructure intelligence through the delivery route that fits your platform.",
    items: [
      { key: "customer-relationship", title: "Customer relationship", points: ["ESP owns the customer experience", "Datazag supports behind the scenes"] },
      { key: "policy-enforcement", title: "Policy and enforcement", points: ["ESP controls thresholds, review, throttling and blocking", "Datazag supplies risk, reasons and context"] },
      { key: "external-intel", title: "External intelligence", points: ["ESP avoids building internet-scale collection", "Datazag observes domains, DNS, certificates and infrastructure"] },
      { key: "customer-products", title: "Customer products", points: ["ESP brands the dashboard, reports and add-ons", "Datazag powers findings, alerts and evidence"] },
      { key: "analytics-workflows", title: "Analytics workflows", points: ["ESP owns data model, warehouse and operational decisions", "Datazag supplies API, webhook, report and data-share delivery"] },
    ],
  },
  commercialModel: {
    eyebrow: "Commercial model",
    title: "Built for partner margin, not channel conflict.",
    body: "The model is designed so the ESP owns the customer relationship, commercial packaging and product experience. Datazag provides the intelligence infrastructure as a predictable platform layer behind the offer.",
    items: [
      { key: "owns-packaging", title: "Partner owns packaging", text: "You decide whether the intelligence is used for internal controls, premium customer features, managed services or paid add-ons." },
      { key: "platform-layer", title: "Datazag is the platform layer", text: "The underlying intelligence is priced by scope: customer estate, domains, checks, data volume, delivery route, white-label needs and SLA." },
      { key: "service-margin", title: "Designed for service margin", text: "Partner terms are designed to leave room for meaningful margin without publishing a fixed discount or margin percentage." },
      { key: "no-conflict", title: "No channel conflict by design", text: "For partner-led accounts, the customer relationship stays with the ESP. Datazag remains infrastructure behind the product experience." },
    ],
  },
  marginPrinciple: {
    eyebrow: "Margin principle",
    title: "Partner price minus Datazag platform cost equals the service margin you control.",
    body: "Partner economics depend on how the capability is packaged: internal abuse controls, premium link checks, hygiene reports, brand protection, deliverability analytics or customer-facing trust services. Datazag is designed as a predictable input cost so partners can build repeatable recurring revenue around it. Specific discounts and margin targets are handled privately in the partner agreement.",
  },
  marginLevers: {
    items: [
      { key: "protect-sending", title: "Protect core sending", text: "Reduce abuse, support load and reputation damage that can erode the value of the platform." },
      { key: "attach-premium", title: "Attach premium features", text: "Sell link-risk checks, customer hygiene, brand protection or deliverability intelligence to existing customers." },
      { key: "reuse-layer", title: "Reuse one intelligence layer", text: "Apply the same data across signup checks, pre-send scoring, alerts, reports and analytics." },
      { key: "package-trust", title: "Package trust services", text: "Sell evidence, monitoring, hygiene, reporting and remediation rather than raw data access." },
    ],
  },
  usageRightsIntro: {
    eyebrow: "Usage rights",
    title: "Built for platform services, not raw data resale.",
    body: "Partners can package Datazag intelligence into their own platform controls, customer reports and managed services; Datazag data itself remains a licensed intelligence layer. Detailed terms are handled in the partner agreement.",
  },
  usageRights: {
    items: [
      { key: "included", title: "Included", text: "Use Datazag intelligence to power partner-led platform controls, customer reports, alerts, enrichment workflows and portal features for your own customers." },
      { key: "not-standalone", title: "Not standalone resale", text: "Raw data, API access, data shares or bulk exports are not for resale, sublicensing, marketplace publication or standalone redistribution by default." },
      { key: "downstream", title: "Downstream partners", text: "Services sold through your own resellers, franchisees or channel partners require written approval, pass-through terms and a separate commercial model." },
    ],
  },
  operatingModel: {
    eyebrow: "Operating model",
    title: "From signup and campaign activity to better decisions.",
    body: "Datazag collects and explains external infrastructure signals. ESPs convert those signals into controls, analytics, customer services and recurring value.",
    items: [
      { key: "screen", title: "Screen", text: "Check customer domains, websites, DNS and infrastructure during signup, onboarding or tier upgrades." },
      { key: "score", title: "Score", text: "Evaluate campaign links, landing pages, redirect chains and sending domains before or during send." },
      { key: "decide", title: "Decide", text: "Feed risk, reason codes and confidence into allow, warn, throttle, block or review workflows." },
      { key: "analyse", title: "Analyse", text: "Enrich SMTP logs, campaign history and abuse queues with domain and infrastructure intelligence." },
      { key: "monetise", title: "Monetise", text: "Package the same intelligence as hygiene, protection, reporting or deliverability services." },
    ],
  },
  delivery: {
    eyebrow: "Delivery",
    title: "Use the route that fits your platform.",
    body: "The same intelligence layer can support signup checks, pre-send scoring, alerting, customer portals, managed reports, log enrichment and data-driven products.",
    items: [
      { key: "api", title: "API", text: "Real-time scoring and enrichment for signup checks, link scanning, customer portals, policy engines and review queues." },
      { key: "webhooks", title: "Webhooks", text: "Push early alerts and infrastructure changes into abuse, compliance, deliverability or customer-success workflows." },
      { key: "reports-exports", title: "Reports and exports", text: "Generate white-label hygiene reports, brand-protection evidence packs and account-review material for customers." },
      { key: "cloud-shares", title: "Cloud data shares", text: "Use Iceberg or Delta datasets for warehouse analytics, SMTP log enrichment, customer segmentation and large-scale joins." },
      { key: "managed-alerts", title: "Managed alert feed", text: "Receive reasoned alerts for risky domains, suspicious certificates, infrastructure shifts and impersonation candidates." },
    ],
  },
  pilotPath: {
    eyebrow: "Pilot path",
    title: "Start with one workflow, then package the value.",
    body: "A partner pilot should prove signal quality, policy fit, operational value and commercial packaging before rollout across the customer base.",
    items: [
      { key: "select-workflow", title: "Select a workflow", text: "Choose signup risk, pre-send link checks, SMTP log enrichment, customer hygiene or brand protection as the first pilot motion." },
      { key: "connect-data", title: "Connect sample data", text: "Start with a small set of customers, campaigns, links, sending domains or log samples so results are easy to validate." },
      { key: "validate", title: "Validate decisions", text: "Review signal quality, false-positive handling, enforcement fit, analyst usefulness and customer-facing reporting value." },
      { key: "package", title: "Package the rollout", text: "Decide whether the production motion is internal control, premium add-on, customer report, branded service or analytics layer." },
    ],
  },
  finalCta: {
    eyebrow: "Next step",
    title: "Build the ESP partner motion around your platform.",
    body: "Start with one workflow, validate the intelligence, then decide whether the production motion is signup risk, pre-send link checks, abuse alerts, deliverability analytics or a customer-facing protection service.",
    primaryCta: { label: "Start an ESP partner pilot", href: "/contact" },
  },
};

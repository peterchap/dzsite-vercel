import type { PageContent } from "@/sanity/seedMarketingCopy";

export const SLUG = "esp-partners";
export const TITLE = "ESP Partners";

// 2026-09-28 — repositioned to EMAIL INTELLIGENCE (homepage brief, 2026-09-25).
// The page sold scoring and early abuse detection; neither is measured. It now
// sells what the corpus can show: which domains can take mail, who runs it,
// which are parked, what they enforce, and what infrastructure sits behind them.
// No "score", "early", "real-time" or "stop" claims — see the homepage notes in
// components/story/content.ts for why each is held.
export const content: PageContent = {
  hero: {
    eyebrow: "Email intelligence · ESP partners",
    title: "Know what every domain on your platform really is.",
    body: "Can it take mail? Who runs its mail? Is it parked? Does it enforce DMARC? What infrastructure sits behind it? Datazag answers these for the domains your customers sign up with, send from and link to.",
    secondaryBody: "You get the evidence, not an approve-or-reject verdict. Keep the customer experience under your brand while Datazag supplies the email, risk and threat intelligence underneath.",
    primaryCta: { label: "Start an ESP partner pilot", href: "/contact" },
    secondaryCta: { label: "Explore ESP services", href: "#services" },
  },
  partnerValue: {
    eyebrow: "Partner value",
    title: "Protect reputation. Create new customer value.",
    body: "Use Datazag to make onboarding and abuse decisions on evidence, then package the same intelligence into trust, hygiene and protection services for your customers.",
    items: [
      { key: "vet-senders", title: "Vet senders with evidence", text: "Check signup and sending domains against their mail setup, parking status and infrastructure history. Every finding shows the record it came from." },
      { key: "protect-deliverability", title: "Protect deliverability", text: "Give abuse, compliance and deliverability teams external context for the domains, links and infrastructure moving through the platform." },
      { key: "launch-services", title: "Launch new services", text: "Add brand protection, customer hygiene reports, link checks and deliverability intelligence as paid customer-facing offers." },
      { key: "embed-workflow", title: "Embed into your workflow", text: "Use webhooks, reports, exports or cloud data shares across onboarding, pre-send checks, abuse review and analytics pipelines." },
    ],
  },
  // 2026-10-01 — machine clicks (evidence package, 2026-10-01). Datazag gives
  // a prior, not a prediction: MX shows infrastructure, never licensing or
  // policy. Never write that we identify domains that WILL produce machine
  // clicks (claim guard). {{CORP_MAIL_DOMAINS}} resolves from the
  // Observatory's corp_mail_domains; the paragraph drops if it cannot.
  // No mention of the per-domain dataset or a free file until each has a URL.
  machineClicks: {
    eyebrow: "Machine clicks",
    title: "Segment machine interactions from human ones",
    body: [
      "Security products inspect links in email. Some retrieve the destination. When that happens, your platform can record the request as a click.",
      "The damage runs past reporting. Machine clicks make inactive addresses look engaged. Senders keep mailing them, and sending reputation suffers. Genuine engagement signals get diluted.",
      "The automation is worse. Journeys branch on intent nobody expressed. Lead scores rise on clicks nobody made. Sales teams follow up on software.",
    ].join("\n\n"),
    secondaryBody: [
      "Datazag identifies the inbound mail infrastructure for {{CORP_MAIL_DOMAINS}} corporate domains. For each one, we record the mailbox platform and the security gateway, where one is visible. We also record what each vendor documents about URL inspection.",
      "That tells you where automated interaction is plausible. You already know when each interaction happened. Joining the two gives a stronger basis for classifying engagement than timing alone.",
      "The data lands in your own environment. Join it to your recipient list in your warehouse. Your list never leaves your systems.",
    ].join("\n\n"),
    primaryCta: { label: "Read the implementation guide", href: "/resources/machine-clicks" },
    items: [
      { key: "clue-not-proof", title: "Infrastructure is a clue, not proof", text: "A documented capability does not establish what happened to a particular message." },
      { key: "two-layers", title: "Two layers can inspect one message", text: "A gateway in front of a mailbox platform means two products on one delivery path." },
      { key: "server-side-only", title: "Server-side inspection only", text: "Our signal is keyed to the domain's infrastructure. Image proxying by a recipient's mail app depends on their client, not their domain. No DNS observation reaches it." },
    ],
  },
  serviceCatalogue: {
    eyebrow: "Partner service catalog",
    title: "Create services around trust, abuse and deliverability.",
    body: "Choose the first commercial motion: signup checks, pre-send link checks, infrastructure change alerts, customer hygiene, deliverability intelligence or brand protection.",
    items: [
      { key: "signup-screening", title: "Signup checks", text: "Check customer domains, websites, DNS, mail setup and infrastructure history at signup and at tier upgrades.", tags: ["Mail setup", "Mail provider", "Parking status", "DNS posture", "Evidence"] },
      { key: "presend-links", title: "Pre-send link checks", text: "Check outbound links, landing pages, redirect chains and new subdomains before or during send.", tags: ["Campaign links", "Landing domains", "Redirect chains", "New domains", "Evidence"] },
      { key: "change-alerts", title: "Infrastructure change alerts", text: "Get told when the certificates, DNS or hosting behind your senders' domains change, with the evidence attached.", tags: ["Certificates", "DNS changes", "Hosting changes", "Infrastructure links", "Evidence"] },
      { key: "smtp-enrichment", title: "SMTP log enrichment", text: "Join send logs and campaign history with email, infrastructure and risk intelligence for deeper abuse and deliverability analytics.", tags: ["Sending domains", "Recipient patterns", "Risk fields", "History", "Warehouse joins"] },
      { key: "data-hygiene", title: "Customer data hygiene", text: "Find domains that cannot take mail, are parked or are badly configured before they hurt deliverability.", tags: ["Can take mail", "Parked domains", "Null MX", "DNS posture", "Remediation notes"] },
      { key: "brand-protection", title: "Brand protection add-on", text: "Offer customers monitoring for lookalike domains and certificates built against their brand, with evidence packs, under your own product.", tags: ["Customer brands", "Lookalike domains", "Evidence packs", "Abuse contacts", "Reports"] },
      { key: "deliverability-intel", title: "Deliverability intelligence", text: "Give deliverability and customer-success teams better context for risk, reputation, customer behavior and domain posture.", tags: ["Domain posture", "Infrastructure risk", "Trend analysis", "Customer reports", "Account reviews"] },
    ],
  },
  howDatazagFits: {
    eyebrow: "How Datazag fits",
    title: "Your platform in front. Our intelligence behind it.",
    body: "You own the customer, policy and enforcement decisions. Datazag supplies external domain, link, DNS, certificate and infrastructure intelligence through the delivery route that fits your platform.",
    items: [
      { key: "customer-relationship", title: "Customer relationship", points: ["ESP owns the customer experience", "Datazag supports behind the scenes"] },
      { key: "policy-enforcement", title: "Policy and enforcement", points: ["ESP controls thresholds, review, throttling and blocking", "Datazag supplies evidence, reasons and context"] },
      { key: "external-intel", title: "External intelligence", points: ["ESP avoids building internet-scale collection", "Datazag observes domains, DNS, certificates and infrastructure"] },
      { key: "customer-products", title: "Customer products", points: ["ESP brands the dashboard, reports and add-ons", "Datazag powers findings, alerts and evidence"] },
      { key: "analytics-workflows", title: "Analytics workflows", points: ["ESP owns data model, warehouse and operational decisions", "Datazag supplies webhook, report and data-share delivery"] },
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
      { key: "reuse-layer", title: "Reuse one intelligence layer", text: "Apply the same data across signup checks, pre-send checks, alerts, reports and analytics." },
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
      { key: "not-standalone", title: "Not standalone resale", text: "Raw data, data shares or bulk exports are not for resale, sublicensing, marketplace publication or standalone redistribution by default." },
      { key: "downstream", title: "Downstream partners", text: "Services sold through your own resellers, franchisees or channel partners require written approval, pass-through terms and a separate commercial model." },
    ],
  },
  operatingModel: {
    eyebrow: "Operating model",
    title: "From signup and campaign activity to better decisions.",
    body: "Datazag collects and explains external infrastructure signals. ESPs convert those signals into controls, analytics, customer services and recurring value.",
    items: [
      { key: "screen", title: "Screen", text: "Check customer domains, websites, DNS and infrastructure during signup, onboarding or tier upgrades." },
      { key: "check", title: "Check", text: "Look at campaign links, landing pages, redirect chains and sending domains before or during send." },
      { key: "decide", title: "Decide", text: "Feed the evidence and reason codes into allow, warn, throttle, block or review workflows." },
      { key: "analyse", title: "Analyze", text: "Enrich SMTP logs, campaign history and abuse queues with domain and infrastructure intelligence." },
      { key: "monetise", title: "Monetize", text: "Package the same intelligence as hygiene, protection, reporting or deliverability services." },
    ],
  },
  delivery: {
    eyebrow: "Delivery",
    title: "Use the route that fits your platform.",
    body: "The same intelligence layer can support signup checks, pre-send checks, alerting, customer portals, managed reports, log enrichment and data-driven products.",
    items: [
      { key: "webhooks", title: "Webhooks", text: "Push alerts and infrastructure changes into abuse, compliance, deliverability or customer-success workflows." },
      { key: "reports-exports", title: "Reports and exports", text: "Generate white-label hygiene reports, brand-protection evidence packs and account-review material for customers." },
      { key: "cloud-shares", title: "Cloud data shares", text: "Use Iceberg or Delta datasets for warehouse analytics, SMTP log enrichment, customer segmentation and large-scale joins." },
      { key: "managed-alerts", title: "Managed alert feed", text: "Receive alerts for risky domains, new certificates, infrastructure shifts and lookalike domains, each with its evidence." },
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
  // FAQ (2026-10-01): questions an answer engine is asked about this page, answered
  // in short, self-contained sentences that restate what the page establishes. Item
  // title = question, text = answer. See components/seo/FaqSection.tsx.
  faq: {
    eyebrow: "Questions",
    title: "Frequently asked questions",
    items: [
      { key: "what-checks", title: "How do email platforms use Datazag?", text: "To check the domains their customers sign up with, send from and link to: whether a domain can take mail, who runs its mail, whether it is parked, whether it enforces DMARC, and what infrastructure sits behind it. Every finding shows the record it came from." },
      { key: "who-decides", title: "Does Datazag block senders?", text: "No. The platform sets the thresholds and makes every review, throttling or blocking decision. Datazag supplies the evidence and the reasons." },
      { key: "resell", title: "Can we offer it to our own customers?", text: "Yes. Platforms can package it into their own customer reports, hygiene checks, brand protection and alerts, under their own brand. Raw data and bulk exports are not for resale by default." },
      { key: "delivery", title: "How is it delivered?", text: "Through webhooks, reports, exports or cloud data shares, depending on where the check runs: at signup, before send, in abuse review or in analytics." },
    ],
  },
  finalCta: {
    eyebrow: "Next step",
    title: "Build the ESP partner motion around your platform.",
    body: "Start with one workflow, validate the intelligence, then decide whether the production motion is signup checks, pre-send link checks, change alerts, deliverability analytics or a customer-facing protection service.",
    primaryCta: { label: "Start an ESP partner pilot", href: "/contact" },
  },
};

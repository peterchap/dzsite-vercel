import type { Metadata } from "next";

import ProductConceptPage, { type ProductConceptPageProps } from "@/components/sections/blocks/ProductConceptPage";
import { sanityFetch } from "@/sanity/fetch";
import { productConceptPageBySlugQuery } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "MSSP Partners — Datazag",
  description:
    "White-label Datazag intelligence for MSSPs: reduce analyst time with reasoned early alerts and create new partner-branded revenue lines.",
};

const fallbackContent: ProductConceptPageProps = {
  eyebrow: "MSSP Partners",
  title: "Your brand. Our data. Less analyst time. New revenue.",
  intro: "Datazag gives you two things: trusted early alerts with full reasoning so your teams can automate or accelerate decisions, and a data layer for new partner-branded services such as brand protection, portfolio monitoring and client reporting.",
  primaryCta: { label: "Partner with Datazag", href: "/contact" },
  secondaryCta: { label: "See alerts", href: "/alerts" },
  proof: [
    { title: "Reduce analyst time", text: "Early alerts include reason codes, infrastructure evidence and confidence context so your teams can automate blocks or triage faster." },
    { title: "Human or AI analysis", text: "Feed Datazag intelligence into your analysts, SIEM/SOAR workflows, AI agents, scoring systems or partner portals." },
    { title: "New revenue lines", text: "Add brand protection, portfolio monitoring, executive reporting and customer-facing intelligence services." },
    { title: "Your brand, our data", text: "Deliver Datazag-powered intelligence under your service name, portal, reports and customer relationship." },
  ],
  narrative: {
    kicker: "The MSSP opportunity",
    title: "Improve margins on your existing services and create new ones.",
    body: [
      "The first value is operational efficiency. Datazag alerts arrive early, with the reasoning attached: domain context, DNS, certificates, hosting, parking status, ASN risk, corpus novelty, brand or platform match, keyword signals and false-positive controls.",
      "The second value is revenue expansion. You can use the same intelligence layer to launch partner-branded services: brand protection, portfolio risk reporting, customer-facing domain reports, evidence packs, remediation queues and SOC enrichment.",
      "The partner proposition is simple: your brand, our data. Datazag supplies the external domain, DNS, certificate, hosting, platform, brand and infrastructure intelligence. You package that intelligence into services your clients already understand and trust.",
    ],
  },
  flowTitle: "How you use Datazag intelligence.",
  flow: [
    { title: "Ingest", text: "Use API, webhooks, data shares or reports to bring reasoned Datazag intelligence into your systems." },
    { title: "Decide", text: "Automate blocks, feed an AI agent, enrich cases or support human analysts with the evidence behind each alert." },
    { title: "Package", text: "Wrap the data as your branded reports, alerts, evidence packs, portal features or managed services." },
    { title: "Monetise", text: "Create attachable revenue lines across brand protection, portfolio monitoring, remediation and data enrichment." },
  ],
  alertTypeSection: {
    kicker: "Two partner offers",
    title: "Reduce analyst time and create new service revenue.",
    intro: "The strongest MSSP proposition has two parts. Datazag reduces the cost of operating your security services by making alerts earlier and more trustworthy. It also helps you launch higher-margin, partner-branded services using Datazag's intelligence layer.",
    stats: [
      { title: "Automate", text: "reasoned alerts support trusted blocking decisions." },
      { title: "Assist", text: "AI agents and analysts get evidence-rich context." },
      { title: "Monetise", text: "new services increase margin and revenue." },
    ],
    types: [
      {
        title: "Reduce analyst time",
        subtitle: "Trusted early alerts",
        coverage: "Platform impersonation, brand impersonation, keyword infrastructure, DNS changes, certificates, parked domains, hosting context and ASN risk.",
        action: "Use Datazag as a reasoned alert feed for automated blocking, AI-agent workflows, SIEM/SOAR enrichment or human analyst triage.",
        text: "You do not need more unexplained alerts. You need earlier signals with enough evidence to trust the decision. Datazag provides reason codes and context so you can automate when confidence is high and focus analysts where judgement is needed.",
        evidence: ["Reason codes and confidence context attached to each alert", "False-positive controls using DNS baselines, allowlists and de-escalation feedback", "Machine-consumable feed for AI agents, SIEM, SOAR, scoring systems and blocklists", "Human-readable evidence for analyst review, customer explanation and audit trail"],
      },
      {
        title: "Create new revenue lines",
        subtitle: "Partner-branded services",
        coverage: "Customer brands, domains, subsidiaries, suppliers, portfolio risk, domain posture, platform footprint and evidence-pack workflows.",
        action: "Package Datazag intelligence into white-label reports, brand protection, portfolio monitoring, customer portals and managed remediation services.",
        text: "Datazag gives you a data layer you can monetise. You can attach new recurring services to existing client relationships without building internet-scale collection, enrichment and evidence infrastructure yourself.",
        evidence: ["Brand protection and takedown-ready evidence packs", "Portfolio monitoring and recurring client risk reports", "Customer portal data and executive account-review material", "White-label or co-branded delivery under your commercial model"],
      },
      {
        title: "Integrate Datazag data",
        subtitle: "Systems and AI layer",
        coverage: "Domain risk, DNS history, certificate activity, hosting context, ASN risk, platform matches, brand matches and keyword infrastructure signals.",
        action: "Embed Datazag in your internal systems, customer products, AI workflows, data lake, case management or scoring engines.",
        text: "For mature MSSPs, the value is not a dashboard. It is the data. Datazag can feed agentic applications, automated decision systems and human workflows with structured intelligence and explicit reasoning.",
        evidence: ["API, webhook and data-share delivery", "Structured JSON outputs for automated pipelines and AI agents", "Reasoning fields for explainability and customer trust", "Cloud-native data products for partner analytics and enrichment"],
      },
    ],
    note: "Phishing defence remains an important use case, but the partner proposition is broader: reduce analyst time with trusted early alerts, and create higher-margin services using Datazag data. Partner pricing should remain separate from public enterprise pricing and depend on client estate, data volume, integration depth, white-label requirements, reporting cadence and SLA.",
  },
  exampleAlert: {
    kicker: "Example operational feed",
    title: "Reasoned alerts that can support automation.",
    intro: "This fictional example shows how you can use Datazag as an input to a block decision, an AI agent or a human analyst. The point is not only that the signal is early; it is that the reasoning is attached.",
    severity: "PARTNER | DECISION FEED",
    status: "Reasoned Block Candidate",
    domain: "suspicious-domain.test · platform + keyword + infrastructure context",
    fields: [
      { label: "Decision path", value: "Automate block, route to AI agent or send to analyst" },
      { label: "Alert class", value: "Platform, brand or keyword infrastructure" },
      { label: "Reasoning", value: "Brand/platform match, keyword signal, DNS context, hosting risk and corpus novelty" },
      { label: "False-positive controls", value: "Known DNS, cloud allowlists, platform baselines and de-escalation feedback checked" },
      { label: "Machine output", value: "Structured JSON for SIEM, SOAR, agentic workflow, scoring or blocklist" },
      { label: "Human output", value: "Readable evidence for analyst review and customer explanation" },
    ],
    reasons: ["Early internet infrastructure signal observed before campaign maturity", "Reason codes explain why the alert should be trusted", "Structured feed supports automated blocking and AI-agent workflows", "Analysts receive context only when review is required"],
    latency: "Decision-feed example — final thresholds and routing are partner-controlled",
  },
  secondaryExampleAlert: {
    kicker: "Example white-label service",
    title: "What you can sell under your brand.",
    intro: "This fictional example shows Datazag as the intelligence layer behind your branded service. Your client sees your product, reports and portal; Datazag powers the data, evidence and monitoring underneath.",
    severity: "PARTNER | WHITE LABEL",
    status: "Your Brand · Datazag Intelligence",
    domain: "25 clients · 120 brands · partner portal · monthly reports",
    fields: [
      { label: "Partner offer", value: "Brand Risk Intelligence powered by Datazag" },
      { label: "Client experience", value: "Your branded report, portal, account review and remediation workflow" },
      { label: "Data layer", value: "Domains, DNS, certificates, hosting, ASN, platform and impersonation intelligence" },
      { label: "Revenue lines", value: "Brand protection, portfolio reports, SOC enrichment and evidence packs" },
      { label: "Delivery", value: "API, webhook, data share, PDF/report export or portal integration" },
      { label: "Commercial model", value: "Partner agreement with client, brand, data-volume and white-label scaling" },
    ],
    reasons: ["Add a differentiated service without building the data collection layer", "Create attachable recurring revenue across existing clients", "Support both executive reporting and operational SOC enrichment", "Keep your brand and customer relationship at the centre"],
    latency: "White-label package example — final scope depends on client estate, delivery model and SLA",
  },
  packagesTitle: "MSSP partner motions.",
  packages: [
    { title: "Reasoned alert feed", text: "Evidence-rich early alerts for automated blocking, AI-agent workflows or human analyst triage." },
    { title: "Brand protection", text: "Evidence-pack and takedown-ready workflows for clients with high-value brands." },
    { title: "White-label reports", text: "Partner-branded domain, brand, supplier and portfolio reports powered by Datazag intelligence." },
    { title: "SOC enrichment", text: "API, webhook or data-share intelligence for hunting, triage, scoring and correlation." },
    { title: "Customer portal data", text: "Embed Datazag findings inside your own portal, dashboards and account review workflows." },
    { title: "Portfolio monitoring", text: "Recurring visibility across many client domains, subsidiaries, suppliers and brands." },
  ],
  finalTitle: "Reduce analyst time. Add new revenue lines.",
  finalBody: "Datazag gives you trusted early intelligence and the data layer for white-label services. You decide how to automate it, package it, price it and deliver it to your clients.",
};

export default async function MsspPartnersPage() {
  const cmsContent = await sanityFetch<ProductConceptPageProps | null>(productConceptPageBySlugQuery, { slug: "mssp-partners" });
  return <ProductConceptPage {...(cmsContent ?? fallbackContent)} />;
}

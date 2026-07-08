import type { PageContent } from "@/sanity/seedMarketingCopy";

export const SLUG = "how-it-works";
export const TITLE = "How It Works";

export const content: PageContent = {
  hero: {
    eyebrow: "How it works",
    title: "From external signal to usable infrastructure intelligence.",
    body: "Datazag observes public internet infrastructure, connects related signals, evaluates risk, packages evidence and delivers the result as reports, alerts, APIs or datasets.",
    secondaryBody: "The process is designed for teams that need earlier context without rebuilding a domain, DNS, certificate, hosting and provider intelligence layer themselves.",
    primaryCta: { label: "Get a free report", href: "/#free-report" },
    secondaryCta: { label: "View the process", href: "#process" },
  },
  process: {
    eyebrow: "Process",
    title: "Six steps from observation to action.",
    body: "The exact output depends on the product, but the same core intelligence layer supports reports, alerts, APIs, datasets and partner services.",
    items: [
      { key: "observe", title: "Observe external signals", text: "Datazag monitors public internet infrastructure signals such as newly observed domains, DNS, certificates, hosting, ASNs, provider footprints and platform patterns.", tags: ["Domains", "DNS", "Certificates", "Hosting", "ASN"] },
      { key: "connect", title: "Connect the infrastructure", text: "Signals are joined into an infrastructure graph so domains, IPs, providers, certificates, platforms and related assets can be understood together.", tags: ["Relationships", "Shared infrastructure", "Provider context", "History"] },
      { key: "evaluate", title: "Evaluate risk and context", text: "Datazag scores naming, DNS, infrastructure, website and historical evidence to decide whether a finding should be monitored, escalated or de-escalated.", tags: ["Risk", "Reason codes", "Confidence", "Triage"] },
      { key: "package", title: "Package evidence", text: "Findings are delivered with explainable evidence: reason codes, DNS state, provider context, screenshots, abuse contacts, related assets and lifecycle changes where available.", tags: ["Evidence", "Screenshots", "Abuse contacts", "Lifecycle"] },
      { key: "deliver", title: "Deliver into the workflow", text: "The same intelligence layer can become a report, an alert, an API response, a webhook event, a data share or a partner-branded service.", tags: ["Reports", "Alerts", "API", "Data shares"] },
      { key: "feedback", title: "Update and learn from feedback", text: "Incidents and datasets update as infrastructure changes. Customer context and de-escalation decisions help reduce noise and improve future routing.", tags: ["Polling", "Updates", "De-escalation", "Baselines"] },
    ],
  },
  signalMaturity: {
    eyebrow: "Signal maturity",
    title: "A finding can change as infrastructure appears.",
    body: "Suspicious infrastructure is not always complete when first seen. Datazag can watch the lifecycle from naming signal to DNS, website evidence and customer feedback.",
    items: [
      { key: "naming", title: "Naming signal", text: "A suspicious domain, subdomain, brand term, DGA-style pattern or entropy signal may be visible before DNS exists." },
      { key: "dns", title: "DNS signal", text: "When DNS appears, Datazag can score records, providers, mail posture, hosting and infrastructure context." },
      { key: "website", title: "Website signal", text: "When a site appears, the incident can gain screenshot evidence, page analysis, brand-logo checks and policy-page capture where present." },
      { key: "customer", title: "Customer signal", text: "Customer-approved infrastructure, known-good partner sites and de-escalation decisions change how future findings are routed." },
    ],
  },
  deliveryPaths: {
    eyebrow: "Delivery paths",
    title: "The same intelligence layer, different outputs.",
    body: "A buyer does not have to consume the full data layer. Datazag can deliver the right slice for the workflow.",
    items: [
      { key: "report", title: "Report path", text: "For a domain, portfolio, supplier group or acquisition target, Datazag packages findings into a business-readable assessment with DNS, platform, infrastructure and remediation context.", cta: "View reports", href: "/reports" },
      { key: "alert", title: "Alert path", text: "For operational monitoring, Datazag opens and updates alerts as DNS, infrastructure, website evidence and customer decisions appear.", cta: "View alerts", href: "/alerts" },
      { key: "brand", title: "Brand protection path", text: "For owned brands, Datazag detects impersonation, supplies evidence packs and abuse contacts, and lets customers de-escalate legitimate partner sites.", cta: "View brand protection", href: "/brand-protection" },
      { key: "data", title: "Data product path", text: "For analytics and data teams, Datazag publishes infrastructure intelligence as SQL-ready datasets, samples, private offers or cloud data shares.", cta: "View datasets", href: "/infrastructure-intelligence" },
    ],
  },
  principles: {
    eyebrow: "Principles",
    title: "Designed to complement the security stack.",
    body: "Datazag is an external infrastructure layer. It helps existing security, fraud, platform and data workflows make better decisions.",
    items: [
      { key: "outside-in", title: "Outside-in first", text: "Datazag looks at the infrastructure visible from outside the organisation, where many impersonation and abuse signals start forming." },
      { key: "evidence", title: "Evidence over assertion", text: "Findings should show the reason, the observed infrastructure and the supporting context behind a score or alert." },
      { key: "workflow", title: "Workflow-aware delivery", text: "A SOC, MSSP, ESP, data buyer and executive report do not need the same output, even when they use the same intelligence layer." },
      { key: "control", title: "Customer control", text: "Customers and authorised partners control response decisions, takedown requests, de-escalation and permitted use boundaries." },
    ],
  },
  outputs: {
    eyebrow: "Outputs",
    title: "What comes out of the engine.",
    body: "Datazag is not a single feed. The intelligence layer can be packaged in the form a customer, partner or data buyer can actually use.",
    items: [
      { key: "reports", title: "Reports", text: "Readable assessments for domains, portfolios, suppliers and executive reviews." },
      { key: "alerts", title: "Alerts", text: "Operational signals with reason codes, evidence and lifecycle updates." },
      { key: "api", title: "API / webhooks", text: "Lookup, scoring and enrichment for products, portals and security workflows." },
      { key: "cloud", title: "Cloud data products", text: "SQL-ready infrastructure intelligence for warehouses, lakehouses and marketplace routes." },
      { key: "partner", title: "Partner services", text: "Datazag-powered services delivered through MSSPs, ESPs, platforms and other authorised partners." },
    ],
  },
  finalCta: {
    eyebrow: "Next step",
    title: "Start with the output you need.",
    body: "Use a free report for a single-domain assessment, alerts for operational monitoring, the API for enrichment or cloud data products for analysis at scale.",
    primaryCta: { label: "Get a free report", href: "/#free-report" },
    secondaryCta: { label: "Contact Datazag", href: "/contact" },
  },
};

import type { PageContent } from "@/sanity/seedMarketingCopy";

export const SLUG = "about";
export const TITLE = "About";

export const content: PageContent = {
  hero: {
    eyebrow: "About Datazag",
    title: "We make external infrastructure risk visible before it reaches your users.",
    body: "Datazag exists because many attacks are assembled in public before they are obvious: domains are registered, certificates are issued, DNS appears, hosting is selected and platform lures take shape.",
    secondaryBody: "We build Infrastructure Intelligence that connects those signals and turns them into evidence-led reports, alerts, APIs, cloud data products and partner services.",
    primaryCta: { label: "Get a free report", href: "/#free-report" },
    secondaryCta: { label: "View trust model", href: "/trust" },
  },
  whyExist: {
    eyebrow: "Why we exist",
    title: "Security teams can see many internal alerts. They often cannot see the infrastructure forming outside them.",
    body: "That external layer is where many phishing, impersonation, fraud and supplier-risk signals first appear. Datazag was built to make that layer visible, explainable and usable.",
    items: [
      { key: "mission", title: "Mission", text: "Make suspicious external infrastructure visible, explainable and usable before it becomes a finished attack or a portfolio-wide blind spot." },
      { key: "vision", title: "Vision", text: "External infrastructure risk should become a measurable intelligence layer that security, platform, partner and data teams can query and act on." },
      { key: "approach", title: "Approach", text: "Connect domains, DNS, certificates, hosting, ASN, provider, platform and historical signals into evidence-led outputs." },
    ],
  },
  principles: {
    eyebrow: "What we believe",
    title: "External intelligence should be connected, inspectable and useful.",
    body: "Datazag is built around observable internet infrastructure and practical delivery formats, not generic threat-intelligence claims.",
    items: [
      { key: "external-risk", title: "External risk forms before the incident", text: "New domains, certificates, DNS changes, hosting choices and platform lures often appear before users see a finished phishing page or abuse campaign." },
      { key: "usable-context", title: "Infrastructure context should be usable", text: "Signals are only useful when they are connected, explained and delivered into the workflow where a team can act on them." },
      { key: "evidence", title: "Evidence matters more than black boxes", text: "Scores and alerts should include reason codes, supporting context and de-escalation paths so teams can validate what they are seeing." },
      { key: "meet-buyers", title: "Data should meet buyers where they work", text: "Some teams need reports. Others need alerts, APIs, webhooks, data shares, marketplace datasets or partner-delivered services." },
    ],
  },
  intelligenceLayer: {
    eyebrow: "Infrastructure Intelligence",
    title: "Domain intelligence is a subset of the wider infrastructure picture.",
    body: "The intelligence layer connects public internet signals so teams can understand relationships, risk and change rather than reviewing isolated indicators.",
    items: [
      { key: "domains", title: "Domains", text: "Newly observed, suspicious, related and historical domain context. Domain intelligence is one part of the wider infrastructure layer." },
      { key: "dns", title: "DNS", text: "A, AAAA, MX, NS, TXT, email-authentication posture, provider footprints and change history." },
      { key: "certificates", title: "Certificates", text: "Certificate Transparency observations, SAN expansion, issuer context and early discovery signals." },
      { key: "infrastructure", title: "Infrastructure", text: "IP, ASN, prefix, hosting, cloud, CDN, provider and routing context for suspicious assets." },
      { key: "platforms", title: "Platforms", text: "Signals around platform impersonation, login lures, supplier exposure and vendor-specific abuse patterns." },
      { key: "history", title: "History", text: "Snapshots, deltas, first-seen, last-seen and lifecycle changes that show how infrastructure evolves." },
    ],
  },
  deliveryModel: {
    eyebrow: "How it reaches customers",
    title: "The same intelligence layer supports different buying paths.",
    body: "About Datazag should explain the model, not repeat every product page. The common thread is infrastructure evidence delivered in the format the buyer can use.",
    items: [
      { key: "reports", title: "Reports", text: "For teams that need an assessment of one domain, a portfolio, a client estate, a supplier group or an acquisition target." },
      { key: "alerts", title: "Alerts", text: "For operational workflows where suspicious platform, keyword or brand-impersonation infrastructure needs to be routed quickly." },
      { key: "api-webhooks", title: "API and webhooks", text: "For products, portals, SIEM workflows, fraud systems and customer-facing tools that need enrichment or scoring on demand." },
      { key: "cloud-data", title: "Cloud data products", text: "For teams that want SQL-ready infrastructure intelligence inside a warehouse, lakehouse, marketplace or analytical environment." },
      { key: "partner-services", title: "Partner services", text: "For MSSPs, MDRs, ESPs and platforms that want to package Datazag intelligence inside their own customer experience." },
    ],
  },
  whoFor: {
    eyebrow: "Who it is for",
    title: "Built for teams that need external-infrastructure context inside decisions.",
    body: "Datazag is designed for buyers who need intelligence inside investigations, customer services, products, partner offers and analytical environments.",
    items: [
      { key: "security-teams", title: "Security teams", text: "Investigate suspicious external infrastructure, enrich alerts and explain why a domain, IP or provider relationship matters." },
      { key: "mssps-mdrs", title: "MSSPs and MDRs", text: "Add reports, alerting and evidence-led services without building the infrastructure intelligence layer from scratch." },
      { key: "esps-platforms", title: "ESPs and platforms", text: "Improve abuse, trust, link and customer-risk workflows with domain and infrastructure context." },
      { key: "data-buyers", title: "Data buyers", text: "Consume curated datasets through cloud shares, marketplaces, APIs and sample schemas." },
      { key: "portfolio-owners", title: "Portfolio owners", text: "Assess exposure across subsidiaries, suppliers, clients, parked domains and acquisition targets." },
    ],
  },
  boundaries: {
    eyebrow: "Boundaries",
    title: "Clear about what Datazag is and is not.",
    body: "The trust model matters. Datazag provides intelligence, evidence and controlled delivery routes; customers and partners keep control of their response and use rights.",
    primaryCta: { label: "View trust and governance", href: "/trust" },
    items: [
      { key: "not-takedown", title: "Not a takedown service", text: "Datazag provides detection, evidence packs and abuse contacts. Customers or authorized partners manage takedown requests and legal response." },
      { key: "not-raw-resale", title: "Not uncontrolled raw-data resale", text: "Data products and partner rights are governed by product scope, permitted use and contractual boundaries." },
      { key: "not-black-box", title: "Not a black-box score", text: "Risk outputs are designed to include reasons and supporting context so teams can validate, challenge or de-escalate findings." },
    ],
  },
  finalCta: {
    eyebrow: "Next step",
    title: "Start with one domain or one workflow.",
    body: "Use a free report to see the intelligence in context, or contact Datazag to discuss alerts, API access, cloud data products or partner services.",
    primaryCta: { label: "Get a free report", href: "/#free-report" },
    secondaryCta: { label: "Contact Datazag", href: "/contact" },
  },
};

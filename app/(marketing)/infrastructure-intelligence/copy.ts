import type { PageContent } from "@/sanity/seedMarketingCopy";

export const SLUG = "infrastructure-intelligence";
export const TITLE = "Infrastructure Intelligence";

export const content: PageContent = {
  hero: {
    eyebrow: "Infrastructure Intelligence",
    title: "Cloud-native cyber intelligence datasets.",
    body: "Datazag delivers enriched domains, DNS, certificates, infrastructure, risk, relationships and history as cloud data shares, marketplace-ready datasets, APIs and curated views.",
    secondaryBody: "Use the data in your own lakehouse, warehouse, SIEM, analytics platform or product without building the infrastructure graph yourself.",
    primaryCta: { label: "Explore datasets", href: "#datasets" },
    secondaryCta: { label: "Start evaluating", href: "#evaluate" },
  },
  dataProductValue: {
    eyebrow: "Data product value",
    title: "Useful intelligence, already joined and ready to query.",
    body: "The value is not a raw list of domains or IPs. It is the enriched context, relationship mapping, risk reasoning and historical state that make the data usable inside real workflows.",
    items: [
      { key: "warehouse", title: "Bring intelligence to your warehouse", text: "Use Datazag datasets directly in cloud analytics, SIEM enrichment, threat hunting, fraud systems and data science workflows." },
      { key: "skip-engineering", title: "Skip the raw-data engineering", text: "DNS, certificates, hosting, ASN, provider labels, risk scores, reason codes and relationships are already joined into usable views." },
      { key: "query-state", title: "Query current and historical state", text: "Use snapshots, deltas and point-in-time context to understand what changed, when it changed and how infrastructure evolved." },
      { key: "evaluate-product", title: "Evaluate as a product, not a feed", text: "Start with sample schemas, small extracts or curated views before moving into full cloud data shares or marketplace delivery." },
    ],
  },
  datasetFamilies: {
    eyebrow: "Dataset families",
    title: "The field groups technical buyers ask for first.",
    body: "Each dataset family can be delivered as a full table, curated view, sample extract, API-backed enrichment path or product-specific schema.",
    items: [
      { key: "domain-intelligence", title: "Domain Intelligence", text: "Domain posture, risk, provider footprint, DNS state, email controls, history and relationship fields for enrichment and scoring.", tags: ["Domain", "First seen", "DNS posture", "Email posture", "Provider labels", "Risk score", "Reason codes"] },
      { key: "dns-mail", title: "DNS and Mail Posture", text: "Expanded DNS, MX, NS, TXT and email-authentication context for reporting, hygiene, compliance and portfolio analysis.", tags: ["A / AAAA", "MX", "NS", "TXT", "SPF", "DKIM", "DMARC", "BIMI", "MTA-STS"] },
      { key: "certificate", title: "Certificate Intelligence", text: "Certificate Transparency events, SAN expansion, issuer context, platform hints and relationship pivots for early infrastructure discovery.", tags: ["Issuer", "SANs", "Fingerprint", "Not before", "Not after", "New issuance", "Related domains"] },
      { key: "infrastructure-labels", title: "Infrastructure Labels", text: "IP, ASN, prefix, cloud, hosting, CDN, country and provider attribution for logs, flows, customer records and security events.", tags: ["IP", "ASN", "Prefix", "Country", "Cloud", "Hosting", "CDN", "DNS provider", "Registrar"] },
      { key: "relationship-graph", title: "Relationship Graph", text: "Shared infrastructure, related domains, shared certificates, DNS relationships and evidence paths for campaign discovery and investigation.", tags: ["Related domains", "Shared IPs", "Shared certs", "Shared DNS", "Clusters", "Evidence paths"] },
      { key: "risk-history", title: "Risk and History", text: "Risk scores, threat bands, reasons, confidence context, snapshots, deltas and change indicators for model validation and time-aware analysis.", tags: ["Risk score", "Threat band", "Reasons", "Confidence", "Snapshots", "Deltas", "Time travel"] },
    ],
  },
  alreadyEngineered: {
    eyebrow: "Already engineered",
    title: "Less raw collection. More usable intelligence.",
    body: "Datazag packages expansion, labelling, relationship analysis, history and evidence before the data reaches your warehouse or application.",
    items: [
      { key: "dns-records", title: "Raw DNS records", text: "Expanded DNS, mail posture, provider labels and remediation context" },
      { key: "ip-address", title: "Raw IP address", text: "ASN, prefix, country, cloud, hosting and infrastructure risk" },
      { key: "single-domain", title: "Single domain", text: "Related domains, shared certificates, provider footprint and relationship paths" },
      { key: "certificate-event", title: "Certificate event", text: "SAN expansion, platform hints, issuer context and early infrastructure pivots" },
      { key: "point-in-time", title: "Point-in-time label", text: "Snapshots, deltas, first-seen, last-seen and change indicators" },
      { key: "opaque-score", title: "Opaque score", text: "Risk score, threat band, confidence and reason codes" },
    ],
  },
  curatedProducts: {
    eyebrow: "Curated products",
    title: "Start with the table that matches the workflow.",
    body: "Curated products reduce engineering effort by packaging the right fields for common security, fraud, platform, portfolio and analytics use cases.",
    items: [
      { key: "domain-risk", title: "Domain Risk Dataset", text: "A joinable domain-level table for SOC enrichment, fraud scoring, ESP controls, customer hygiene and portfolio monitoring.", status: "Iceberg · Delta · Parquet · API" },
      { key: "dns-posture", title: "DNS Posture Dataset", text: "Expanded DNS and email-authentication findings for remediation reporting, domain hygiene and systemic portfolio-risk analysis.", status: "Iceberg · Delta · Reports" },
      { key: "infra-reputation", title: "Infrastructure Reputation Dataset", text: "IP, ASN, prefix, provider and relationship context for investigating suspicious hosting, related assets and infrastructure reuse.", status: "Iceberg · Delta · Cloud share" },
      { key: "cert-newdomain", title: "Certificate and New Domain Dataset", text: "Certificate and newly observed domain intelligence for early alerting, platform impersonation discovery and watchlist monitoring.", status: "Alerts · Iceberg · Delta" },
      { key: "portfolio-view", title: "Portfolio Intelligence View", text: "Curated views for domains, subsidiaries, suppliers, client estates and acquisition targets, with posture and trend context included.", status: "Reports · Cloud share · Custom view" },
    ],
  },
  readyToJoin: {
    eyebrow: "Ready to JOIN",
    title: "Turn one log value into context, evidence and action.",
    body: "The data is designed for SQL joins, enrichment pipelines, SIEM workflows, notebook analysis and data science features.",
  },
  delivery: {
    eyebrow: "Delivery",
    title: "Use the route that matches your buying and engineering model.",
    body: "Teams can evaluate with samples and curated views, then move into cloud data shares, marketplace delivery, API enrichment or operational reports and alerts.",
    items: [
      { key: "cloud-shares", title: "Cloud data shares", status: "Primary data product", text: "Native cloud-native datasets for analytical teams that want to join Datazag intelligence with their own logs, assets, alerts and customer records.", href: "/contact", cta: "Request data share access", tags: ["Iceberg", "Delta", "Parquet", "Incremental updates", "Snapshots", "Time travel", "Bring your own compute", "SQL-ready joins"] },
      { key: "marketplace", title: "Marketplace delivery", status: "For cloud buyers", text: "Marketplace-ready packaging for teams buying through Snowflake, Databricks, Azure, AWS or Google Cloud procurement routes.", href: "/contact", cta: "Discuss marketplace access" },
      { key: "api", title: "API enrichment", status: "For products and workflows", text: "Real-time lookup and enrichment for portals, fraud systems, SIEM workflows, policy engines and partner platforms.", href: "/pricing", cta: "View API pricing" },
      { key: "reports-alerts", title: "Reports and alerts", status: "For evaluation and operations", text: "Start with reports, then move priority domains, brands, platforms or infrastructure into operational alerting.", href: "/reports", cta: "View reports" },
    ],
  },
  useCases: {
    eyebrow: "Use cases",
    title: "One intelligence layer, several data workflows.",
    body: "The same cloud-native datasets can support security operations, ESP abuse controls, portfolio reporting, diligence and analytical modelling.",
    items: [
      { key: "threat-hunting", title: "Threat hunting and SOC enrichment", text: "Join domains, IPs and alerts with provider labels, relationships, reasons and historical context." },
      { key: "esp-abuse", title: "ESP and platform abuse controls", text: "Score customer domains, links, landing pages and infrastructure using explainable domain and provider intelligence." },
      { key: "portfolio-risk", title: "Portfolio and supplier risk", text: "Analyze posture and exposure across many domains, subsidiaries, suppliers, clients or acquisition targets." },
      { key: "insurance-diligence", title: "Cyber insurance and diligence", text: "Use historical and portfolio-wide evidence for underwriting, renewal, exposure analysis and M&A security review." },
      { key: "data-science", title: "Data science and AI workflows", text: "Use stable features, historical slices and reason fields for modelling, agents, analytics and decision support." },
    ],
  },
  sourceGovernance: {
    eyebrow: "Sources and governance",
    title: "Transparent enough to evaluate. Controlled enough to license.",
    body: "The Trust page covers the full governance model. This data-product page summarizes the points technical and marketplace buyers usually need first.",
    primaryCta: { label: "View trust and governance", href: "/trust" },
    items: [
      { key: "observation-layers", title: "Observation layers", text: "Active DNS, Certificate Transparency, routing, ASN, provider, mail posture, platform and historical observations." },
      { key: "derived-intelligence", title: "Derived intelligence", text: "Published datasets expose derived Datazag fields, public infrastructure facts and product-approved context." },
      { key: "restricted-inputs", title: "Restricted inputs", text: "Internal-only validation signals and raw third-party feed membership are not published as standalone resale fields by default." },
      { key: "schema-discipline", title: "Schema discipline", text: "Field scope, refresh cadence, snapshot policy, historical coverage and permitted use are controlled per product." },
    ],
  },
  evaluate: {
    eyebrow: "Evaluate",
    title: "Try the data before you commit.",
    body: "A technical buyer should be able to inspect the schema, run a few joins and decide whether the data improves the workflow.",
    items: [
      { key: "sample-schema", title: "Sample schema", text: "Inspect the columns, keys, refresh model and example joins before committing to a full data share." },
      { key: "small-extract", title: "Small extract", text: "Test a bounded sample in your warehouse, lakehouse or enrichment workflow." },
      { key: "curated-view", title: "Curated view", text: "Start with a purpose-built table for one use case, such as domain risk, DNS posture or infrastructure labels." },
      { key: "pilot-share", title: "Pilot data share", text: "Run a short evaluation with current and historical slices, then decide scope and commercial packaging." },
    ],
  },
};

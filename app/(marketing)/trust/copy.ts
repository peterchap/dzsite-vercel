import type { PageContent } from "@/sanity/seedMarketingCopy";

export const SLUG = "trust";
export const TITLE = "Trust";

export const content: PageContent = {
  hero: {
    eyebrow: "Trust & Governance",
    title: "Use infrastructure intelligence you can inspect and govern.",
    body: "Datazag products are built around observable internet infrastructure, explainable evidence, controlled product scope and clear licensing boundaries.",
    secondaryBody: "This page explains the trust model behind reports, alerts, APIs, data shares, marketplace datasets and partner-delivered services.",
    primaryCta: { label: "Get a free report", href: "/#free-report" },
    secondaryCta: { label: "View alerts", href: "/alerts" },
  },
  trustPrinciples: {
    eyebrow: "Trust principles",
    title: "Evidence first. Scope explicit. Rights controlled.",
    body: "Buyers need more than a data feed. They need to understand what evidence supports the output, how it can be used and where the boundaries sit.",
    items: [
      {
        key: "observable",
        title: "Observable infrastructure",
        text: "Datazag focuses on public internet signals such as domains, DNS, certificates, hosting, ASN context, routing and provider footprints.",
      },
      {
        key: "evidence",
        title: "Evidence over black boxes",
        text: "Reports, alerts and enrichment outputs include evidence, reason codes and context so teams can inspect why a finding exists.",
      },
      {
        key: "product-scope",
        title: "Product-specific scope",
        text: "A free report, alert, API response and data share do not expose the same fields. Each product has its own scope, use case and delivery controls.",
      },
      {
        key: "licensing",
        title: "Clear licensing boundaries",
        text: "Datazag separates internal intelligence operations from sellable data products, partner services and marketplace-ready outputs.",
      },
    ],
  },
  evidence: {
    eyebrow: "What customers can inspect",
    title: "The evidence behind reports, alerts and data products.",
    body: "The exact fields vary by product, but Datazag output is designed to expose enough context for a buyer to understand and challenge the result.",
    items: [
      {
        key: "observed-facts",
        title: "Observed facts",
        text: "Domain, DNS, certificate, mail, hosting, ASN, prefix, registrar and provider context that supports a report or alert finding.",
        tags: ["Domains", "DNS", "Certificates", "ASN", "Providers"],
      },
      {
        key: "reason-codes",
        title: "Reason codes",
        text: "Readable explanations of why a domain, IP, infrastructure relationship, platform pattern or posture issue was considered relevant.",
        tags: ["Risk reasons", "Posture reasons", "Alert reasons", "Evidence fields"],
      },
      {
        key: "confidence-context",
        title: "Confidence context",
        text: "Signals that help teams decide whether to automate, block, investigate, de-escalate, monitor or route to human review.",
        tags: ["Confidence", "Severity", "Routing", "Review path"],
      },
      {
        key: "known-good",
        title: "Known-good and provider context",
        text: "Cloud, CDN, mailbox, hosting, platform and customer-approved context used to reduce accidental over-classification.",
        tags: ["Cloud", "CDN", "MX", "NS", "Allowlists"],
      },
      {
        key: "history-change",
        title: "History and change",
        text: "Where included, point-in-time records and change history help buyers understand what changed and when it changed.",
        tags: ["Snapshots", "Deltas", "Time travel", "Change detection"],
      },
    ],
  },
  productControls: {
    eyebrow: "Product controls",
    title: "Different products expose different slices of the intelligence layer.",
    body: "A report, alert, API response and cloud data share can draw on the same intelligence foundation, but each has its own field scope and intended use.",
    items: [
      { key: "reports", title: "Reports", text: "Designed for business-readable findings, DNS defence analysis, threat exposure, remediation priorities and portfolio summaries." },
      { key: "alerts", title: "Alerts", text: "Designed for operational delivery with alert class, reason codes, infrastructure context, recommended action and de-escalation paths." },
      { key: "api", title: "API", text: "Designed for real-time scoring and enrichment inside customer products, analyst workflows and partner platforms." },
      { key: "cloud-shares", title: "Cloud data shares", text: "Designed for analytical joins, historical review, data science, threat hunting and marketplace-style consumption." },
      { key: "partner-services", title: "Partner services", text: "Designed so MSSPs, ESPs and service providers can package intelligence into their own services without reselling raw data by default." },
    ],
  },
  licensing: {
    eyebrow: "Licensing and permitted use",
    title: "Built for operational use, not uncontrolled raw data resale.",
    body: "Licensing should be simple to understand: use the intelligence in the contracted workflow, but do not redistribute raw data or extend rights to downstream partners without agreement.",
    items: [
      {
        key: "included",
        title: "Included by default",
        points: [
          "Use Datazag outputs inside the licensed product or workflow.",
          "Use reports, alerts and enrichment to support internal decisions and customer-facing managed services where contracted.",
          "Use permitted fields, schemas and delivery routes defined for the product purchased.",
        ],
      },
      {
        key: "not-included",
        title: "Not included by default",
        points: [
          "Raw data resale, bulk redistribution or standalone sublicensing.",
          "Publishing Datazag data into another marketplace or public dataset.",
          "Allowing downstream resellers, franchisees or channel partners to use or resell Datazag-powered services without written approval.",
        ],
      },
      {
        key: "by-agreement",
        title: "Handled by agreement",
        points: [
          "Partner-branded reporting and portal features.",
          "Portfolio-wide or multi-client use cases.",
          "Marketplace, data-share, white-label and downstream partner rights.",
        ],
      },
    ],
  },
  privacy: {
    eyebrow: "Privacy and customer context",
    title: "External intelligence with clear customer-input boundaries.",
    body: "Most Datazag products focus on externally observable infrastructure. Customer-supplied context is used to make the output more relevant and reduce noise.",
    items: [
      { key: "public-data", title: "Public internet data", text: "Most intelligence products are built from externally observable infrastructure, not from customer inboxes, endpoint telemetry or private network traffic." },
      { key: "report-requests", title: "Report requests", text: "For free reports, the submitted work email is used to derive the domain, process the request and deliver the report." },
      { key: "marketing-consent", title: "Marketing consent", text: "Marketing follow-up should be separate from the processing needed to generate a requested report." },
      { key: "customer-context", title: "Customer context", text: "Customer-supplied brands, domains, watchlists or approved baselines are used to make outputs more relevant and reduce false positives." },
    ],
  },
  falsePositives: {
    eyebrow: "False-positive controls",
    title: "Useful intelligence needs tuning and challenge paths.",
    body: "Security teams need confidence that platform names, brand terms and provider patterns are not being treated as malicious without context.",
    items: [
      { key: "known-good", title: "Known-good infrastructure", text: "Provider attribution, customer-approved infrastructure and common platform footprints help avoid obvious misclassification." },
      { key: "context-before-action", title: "Context before action", text: "A platform or brand term alone should not determine severity. DNS, certificate, hosting, history and relationship signals change routing." },
      { key: "de-escalation", title: "De-escalation path", text: "Operational products can include review and de-escalation workflows so accepted or known-good findings do not remain noisy." },
      { key: "human-evidence", title: "Human-readable evidence", text: "Reason codes and evidence fields give analysts and customers a way to challenge, validate or tune the output." },
    ],
  },
  marketplaceBoundaries: {
    eyebrow: "Marketplace and data-share boundaries",
    title: "Data products are controlled at publish time.",
    body: "Cloud marketplace and data-share buyers need to know what is included, what is excluded and what redistribution rights do not come with the product by default.",
    items: [
      { key: "derived-intelligence", title: "Derived intelligence", text: "Marketplace and data-share products should expose derived Datazag intelligence, public infrastructure facts and product-approved context." },
      { key: "restricted-inputs", title: "Restricted inputs", text: "Internal-only feeds, restricted popularity data and raw third-party threat-feed rows are not published as standalone resale fields by default." },
      { key: "schema-discipline", title: "Schema discipline", text: "Published datasets need explicit field scope, refresh cadence, historical coverage and licensing boundaries." },
      { key: "buyer-clarity", title: "Buyer clarity", text: "Customers should be able to understand what the dataset contains, how it can be used and what redistribution is not permitted." },
    ],
  },
  finalCta: {
    eyebrow: "Next step",
    title: "Use intelligence with evidence and boundaries.",
    body: "Start with a report or alert workflow, then agree the product scope, delivery route and permitted use that fits your team, partner model or data-share requirement.",
    primaryCta: { label: "Get a free report", href: "/#free-report" },
    secondaryCta: { label: "Talk to us", href: "/contact" },
  },
};

import type { PageContent } from "@/sanity/seedMarketingCopy";

export const SLUG = "esp-partners";
export const TITLE = "ESP Partners";

// 2026-10-24 — CAMPAIGN INTELLIGENCE (brief "ESP Page Rewrite", 24 Oct 2026).
// The page moved from deliverability and domain vetting to two buyers: the
// economic buyer (fewer campaign escalations, retained customers, new revenue)
// and the technical buyer (how the data joins, how the methods work, what
// leaves their environment).
//
// EVERY SECTION KEY IS NEW. The CMS doc seeded from the old page still holds
// the old keys (hero, partnerValue, machineClicks, …). New keys mean the page
// renders this file until the doc is reseeded, never a mix of old and new copy.
// After deploy: npx tsx scripts/seedMarketingCopy.ts esp-partners
//
// Claim rules for this page, confirmed by Peter (brief checklist):
// - Datazag supplies gateway identification and the published methodology.
//   The ESP's platform classifies machine clicks. Never say Datazag does.
// - The mailbox provider behind a gateway comes from SPF and other TXT
//   records, "where the evidence allows": not every domain publishes them.
// - Datazag assesses link domains. The ESP flags URLs with no identifiable domain.
// - No lead-time or "predictive" claims. No prices here: the founding offer
//   renders its price from lib/pricing.ts. No onboarding API while it is off the site.
// - Figures are tokens, never typed: {{DOMAINS}} (live site stats),
//   {{CORP_MAIL_DOMAINS}} (Observatory corp_mail_domains). The example report's
//   numbers are illustrative and labeled so on the page.
export const content: PageContent = {
  campaignHero: {
    eyebrow: "For email service providers",
    title: "Help your customers send better campaigns — and understand what happens to their email.",
    // 2026-10-24 review (CTO read): lead with explanation and gateway attribution.
    // List cleaning and link screening are the same data, not the headline.
    body: "Datazag gives ESPs internet-scale infrastructure intelligence. Use it to explain delivery results, flag problem recipient domains and check risky campaign links.",
    // The primary action is the booking link, labeled from pilot.primaryCta.
    secondaryCta: { label: "Read our email infrastructure research", href: "/insights" },
    items: [
      { key: "beyond-mx", title: "See beyond the MX record.", text: "Identify the security gateways and mailbox providers that actually handle your customers' email." },
      { key: "your-brand", title: "Integrate it into your own platform, under your own brand.", text: "Your customers' lists never leave your environment." },
    ],
  },
  // A third hero link, for the technical reader.
  heroEngineers: {
    primaryCta: { label: "For engineers: how the data joins and what leaves your systems", href: "#integration" },
  },
  // The first tile is the headline and gets the accent.
  heroTiles: {
    items: [
      { key: "explainable-delivery", title: "Explainable delivery", text: "Show customers which gateway and mailbox provider handled their email, and what those systems did." },
      { key: "cleaner-lists", title: "Cleaner lists", text: "Find recipient domains that look live but can't take mail: parked, or with no working mail setup." },
      { key: "safer-campaigns", title: "Safer campaigns", text: "Screen campaign link domains against age, hosting and risk signals before they go out." },
    ],
  },
  problem: {
    eyebrow: "The problem",
    title: "Your customers see the numbers. They can't see why.",
    body: [
      "Customers see opens, clicks, bounces and deferrals. They don't see the gateway that scanned their links. They don't see the provider that slowed their batch.",
      "When results drop, they blame the platform. Support tickets rise, and good customers start to look elsewhere.",
    ].join("\n\n"),
    secondaryBody: "Your deliverability team can diagnose this. Datazag helps you explain it to every customer, at scale.",
    items: [
      { key: "not-human", title: "Engagement that isn't human", text: "Apple Mail Privacy Protection already blurred opens. Now security gateways open and click links before people do. Click rates look strong, or suddenly suspicious." },
      { key: "no-reason", title: "Failures without a reason", text: "A bounce code or a deferral says little to a marketer. They need to know which system responded, and why." },
      { key: "platform-blamed", title: "The platform takes the blame", text: "Without context, every drop looks like your problem. Your team spends hours explaining one campaign at a time." },
    ],
  },
  // Item `status` is where the evidence comes from. Which blocks are the ESP's
  // own is structure, kept in the page (EVIDENCE_OWNER).
  evidenceSources: {
    eyebrow: "How it works",
    title: "Three sources of evidence. One clear explanation.",
    body: "No single dataset explains a campaign. Datazag combines what we see across the internet with what your platform already records.",
    secondaryBody: "You already hold two of the three. Datazag adds the context that connects them.",
    items: [
      { key: "infrastructure", title: "Datazag infrastructure intelligence", text: "Security gateway, underlying mailbox provider, DNS history.", status: "Datazag, updated daily" },
      { key: "campaign-events", title: "ESP campaign events", text: "SMTP responses, bounces, deferrals, opens, clicks.", status: "Your platform, already collected" },
      { key: "machine-evidence", title: "Machine-interaction evidence", text: "Automated URL requests, classified with timing and confidence.", status: "Your click logs, classified by your platform using Datazag gateway data and our published methodology" },
      { key: "campaign-reporting", title: "Infrastructure-aware campaign reporting", text: "Which systems were involved, what was observed, and what the customer should investigate.", status: "The combined result, in your dashboard" },
    ],
  },
  evidenceCaveat: {
    title: "Infrastructure is a clue, not proof.",
    body: "A documented inspection capability does not show what happened to a particular message. Your platform combines it with its own timing data to classify engagement.",
  },
  // Item `status` is the campaign stage. The page shows the first item as the
  // main card and the rest as "same data" cards (review, 2026-10-24): list
  // cleaning alone reads as a commodity next to validators ESPs already run.
  lifecycle: {
    eyebrow: "Before, during, after",
    title: "Intelligence at every stage of the campaign.",
    body: "The core is explaining results. The same data also helps before the send.",
    secondaryBody: "One dataset, three moments where your customers notice the difference.",
    items: [
      { key: "explain-results", status: "After the send", title: "Explain the results", text: "Group results by the gateway and mailbox provider that received them. Classify engagement on stronger evidence than timing alone. Tell customers what to investigate." },
      { key: "clean-list", status: "Before the send", title: "Find what validators miss", text: "Syntax checks and MX lookups pass parked domains and broken mail setups. Flag them, and recent infrastructure changes, before the send." },
      { key: "screen-links", status: "During the build", title: "Screen the links", text: "Check campaign link domains against age, hosting and risk signals. Your platform flags any links that don't use an identifiable domain." },
    ],
  },
  signupChecks: {
    eyebrow: "Also available",
    title: "Signup checks",
    body: "Screen new customers' domains for mail setup, parking status and infrastructure history at signup and tier upgrades. You set the rules; Datazag supplies the evidence.",
  },
  // {{CORP_MAIL_DOMAINS}} resolves from the Observatory; without it the page
  // uses the figure-free sentence in the page (never a hole in the copy).
  beyondMx: {
    eyebrow: "Beyond the MX record",
    title: "The MX record tells you where email arrives. Not who handles it.",
    body: [
      "Many businesses route mail through a security gateway first. The MX record points to the gateway, not the mailbox provider behind it.",
      "Datazag maps inbound mail infrastructure for {{CORP_MAIL_DOMAINS}} corporate domains. For each one, we record the mailbox platform and the security gateway, where one is visible.",
      "Where the evidence allows, SPF and other TXT records reveal the mailbox provider behind a gateway. DNS history shows when either changed.",
    ].join("\n\n"),
    primaryCta: { label: "See how mail infrastructure is distributed across the internet", href: "https://observatory.datazag.com/email" },
    // points = [what a basic lookup shows, what Datazag shows]
    items: [
      { key: "gateway", title: "Security gateway", points: ["MX: a gateway hostname", "Security gateway: identified vendor"] },
      { key: "mailbox", title: "Mailbox provider", points: ["—", "Underlying mailbox provider: identified provider"] },
      { key: "history", title: "Changes", points: ["—", "Recent infrastructure changes from DNS history"] },
    ],
  },
  // How attribution works, for the engineer who asks about accuracy and edge
  // cases. No accuracy figure: none is measured. The hidden-link test in the
  // guide is how an ESP measures it on its own traffic.
  attribution: {
    title: "How we identify them",
    body: "Test it on your own traffic. The hidden-link method in our implementation guide gives you ground truth.",
    items: [
      { key: "gateway-from-mx", title: "Gateway", text: "The MX hostnames, matched to the vendor that operates them." },
      { key: "provider-from-txt", title: "Mailbox provider", text: "SPF include: mechanisms and other TXT records that name the platform behind the gateway. Not every domain publishes them." },
      { key: "changes-from-history", title: "Changes", text: "DNS history: when the MX, SPF or provider records last changed." },
    ],
  },
  beyondMxWhy: {
    title: "Why it matters",
    items: [
      { key: "gateways-click", text: "Gateways scan links and can trigger clicks. Knowing the gateway explains the click pattern." },
      { key: "providers-filter", text: "Mailbox providers apply their own filtering. Knowing the provider explains deferrals and placement." },
      { key: "changes-explain", text: "Infrastructure changes often explain a sudden drop. History shows when the change happened." },
    ],
  },
  // ILLUSTRATIVE JOIN (2026-10-24, Peter: show what joining an SMTP log to
  // Datazag looks like). Domains use the reserved .example TLD, so none is a
  // real company. The SQL and column names in the page are examples, not our
  // schema, and the caption says so. The ESP's platform makes the click call:
  // the explanation column says what the join shows, never a Datazag verdict.
  // points = [time, event, SMTP response or note, click delay,
  //           gateway, mailbox provider, recent change]; text = what it explains.
  joinExample: {
    eyebrow: "The join",
    title: "From log line to explanation.",
    body: "Your SMTP log knows what happened. Datazag knows who received it. Join them on the recipient domain, inside your own warehouse.",
    secondaryBody: "Illustrative example. Domains are fictional, and table and column names are examples. Email addresses stay in your logs: the join needs only the domain.",
    items: [
      { key: "acme", title: "acme-freight.example", points: ["09:00:04", "Clicked", "250 OK", "3 s after delivery", "Proofpoint", "Microsoft 365", "—"], text: "A click seconds after delivery, behind a link-scanning gateway. Likely automated." },
      { key: "brightpath", title: "brightpath.example", points: ["09:00:05", "Clicked", "250 OK", "42 min after delivery", "None", "Google Workspace", "—"], text: "No gateway in the path, and a human delay. Likely a person." },
      { key: "harbor", title: "harbor-bank.example", points: ["09:00:05", "Deferred", "421 4.7.0 Try again later", "—", "None", "Microsoft 365", "—"], text: "The mailbox provider slowed the batch. Review the sending rate to Microsoft." },
      { key: "lumen", title: "lumen-legal.example", points: ["09:00:06", "Clicked", "250 OK", "5 s after delivery", "Mimecast", "Microsoft 365", "MX moved to Mimecast 6 days ago"], text: "Click rates jumped this week because a new gateway now scans links. Not a change in the audience." },
      { key: "oldmill", title: "oldmill-bakery.example", points: ["09:00:06", "Bounced", "No mail server found", "—", "—", "None (parked)", "Parked since March"], text: "The domain no longer takes mail. Suppress it before the next send." },
    ],
  },
  // ILLUSTRATIVE. Every number here is made up to show the output shape, and
  // the page labels it so. points = [recipients, bounced, deferred, clicks,
  // likely automated]; text = what to investigate. The summary strip and the
  // recipient total are computed from these rows, so they always agree.
  exampleReport: {
    eyebrow: "Example campaign report",
    title: "What your customers could see after every campaign.",
    body: "Here is a sample report panel for a {{RECIPIENTS}}-recipient newsletter. It sits alongside the metrics your dashboard already shows.",
    secondaryBody: "Illustrative example. Vendor names show the type of identification Datazag supports.",
    // Label only: the button beside it is the booking link.
    primaryCta: { label: "See this on your own data", href: "#pilot" },
    items: [
      { key: "proofpoint-m365", title: "Proofpoint gateway → Microsoft 365", points: ["4820", "12", "30", "1140", "910"], text: "Most clicks match gateway link inspection, within seconds of delivery. Report likely human clicks separately." },
      { key: "mimecast-m365", title: "Mimecast gateway → Microsoft 365", points: ["2310", "6", "15", "410", "260"], text: "Same scanning pattern. Expect similar click inflation on future sends." },
      { key: "google-direct", title: "Google Workspace, no gateway", points: ["6450", "9", "10", "520", "40"], text: "Healthy. Engagement looks mostly human." },
      { key: "m365-direct", title: "Microsoft 365, no gateway", points: ["5120", "22", "250", "380", "35"], text: "Deferrals clustered in one window. Review sending rate to this provider." },
      { key: "registrar-mail", title: "Registrar-hosted mail", points: ["1990", "40", "60", "150", "10"], text: "Mixed filtering across small providers. Watch the deferral trend." },
      { key: "no-mail", title: "No working mail setup", points: ["310", "298", "0", "0", "0"], text: "Domains are parked or no longer resolve. Suppress before the next send." },
    ],
  },
  // {{DOMAINS}} is the live corpus figure (lib/site-stats-live.ts). The mail
  // funnel under this text reads the Observatory with its own as-of date.
  research: {
    eyebrow: "Research evidence",
    title: "Built on a view of the whole internet, not a sample.",
    body: "Datazag resolves DNS for {{DOMAINS}} domains every day and publishes what it finds. One result matters to every ESP: a domain with an MX record is not always a mailbox.",
  },
  researchFeature: {
    eyebrow: "Datazag Insights",
    title: "Who Really Runs Business Email?",
    body: "The State of Email Infrastructure 2026.",
    primaryCta: { label: "Read the report", href: "/insights/who-really-runs-business-email" },
  },
  integration: {
    eyebrow: "Integration",
    title: "Your data stays where it is. Ours comes to you.",
    body: "You don't send us customer lists or campaign data. We deliver intelligence into your environment, and you join it to your own tables.",
    secondaryBody: "No new vendor in your sending path. No personal data shared with a third party.",
    items: [
      { key: "cloud-shares", title: "Cloud data shares", text: "Iceberg or Delta datasets through Snowflake, Databricks or Azure. They refresh daily with no pipeline to maintain." },
      { key: "local-joins", title: "Local joins", text: "Match recipient domains, link domains and click logs against our data inside your own warehouse. Your lists never leave your systems." },
      { key: "sentinel", title: "Microsoft Sentinel feed", text: "Infrastructure changes and alerts over TAXII 2.1, for abuse, compliance and deliverability teams." },
      { key: "reports-exports", title: "Reports and exports", text: "White-label hygiene reports and account-review material for your customers." },
    ],
  },
  // Answers to the technical buyer's first questions (review, 2026-10-24):
  // how the data is served, what runs in the send path, who builds what.
  // There is NO query API in the send path, so no latency figure. Do not add
  // one, or the onboarding API, while it is off the site.
  techSpec: {
    title: "Technical answers",
    items: [
      { key: "delivery", title: "How it's delivered", text: "Tables keyed by domain, shared as Iceberg or Delta through Snowflake, Databricks or Azure. They refresh daily." },
      { key: "send-path", title: "At send time", text: "No call to Datazag. Lookups run in your own warehouse or cache, at your own throughput." },
      { key: "leaves", title: "What leaves your systems", text: "Nothing. You join our data to your lists and click logs locally." },
      { key: "you-build", title: "What you build", text: "The click classifier. Our guide gives the four signals, the fields to log and a test for accuracy." },
    ],
  },
  // Link targets live in the page: the vendor documentation link is gated by
  // lib/machine-clicks.ts and renders only while that page is live.
  technicalLinks: {
    title: "For your technical team",
    items: [
      { key: "guide", title: "Implementation guide: classify machine clicks" },
      { key: "vendor-evidence", title: "Vendor documentation behind the classification" },
      { key: "docs", title: "Documentation" },
    ],
  },
  ownership: {
    title: "Who owns what",
    items: [
      { key: "customer-relationship", title: "Customer relationship", points: ["Owns the customer experience", "Supports behind the scenes"] },
      { key: "policy-classification", title: "Policy and classification", points: ["Sets thresholds, rules and click classification", "Supplies evidence, reasons and context"] },
      { key: "external-intel", title: "External intelligence", points: ["Avoids building internet-scale collection", "Observes domains, DNS, certificates and infrastructure"] },
      { key: "customer-products", title: "Customer products", points: ["Brands the dashboard, reports and add-ons", "Powers findings, alerts and evidence"] },
      { key: "analytics", title: "Analytics", points: ["Owns data model, warehouse and decisions", "Supplies data shares, reports and feeds"] },
    ],
  },
  economics: {
    eyebrow: "Partner economics",
    title: "Lower your costs. Add services your customers will pay for.",
    secondaryBody: "One subscription supports both.",
    primaryCta: { label: "See pricing", href: "/pricing" },
  },
  economicsPlatform: {
    title: "Improve your platform",
    items: [
      { key: "fewer-bounces", text: "Fewer bounces and complaints on shared infrastructure" },
      { key: "fewer-tickets", text: "Fewer \"why did my results drop?\" support tickets" },
      { key: "faster-answers", text: "Faster answers from support and success teams" },
      { key: "retention", text: "Stronger retention when results dip" },
    ],
  },
  economicsServices: {
    title: "Sell premium services, under your brand",
    items: [
      { key: "campaign-reports", text: "Infrastructure-aware campaign reports as a premium tier" },
      { key: "list-hygiene", text: "Pre-send list hygiene as a paid add-on" },
      { key: "link-screening", text: "Campaign link screening for brand-sensitive senders" },
      { key: "insight-packages", text: "Deliverability insight packages for agencies and enterprise accounts" },
    ],
  },
  margin: {
    eyebrow: "Margin principle",
    title: "Your price minus the Datazag platform cost is the service margin you control.",
    body: "Partners receive a discount on list prices and set their own client prices.",
  },
  rights: {
    eyebrow: "Usage rights",
    items: [
      { key: "included", title: "Included", text: "Power your own platform controls, customer reports, alerts, enrichment and portal features." },
      { key: "not-standalone", title: "Not standalone resale", text: "Raw data, data shares and bulk exports are not for resale, sublicensing or redistribution." },
      { key: "downstream", title: "Downstream partners", text: "Services sold through your resellers need written approval and separate terms." },
    ],
  },
  // The offer card itself (price, terms, places, deadline) renders from
  // founding_esp in lib/pricing.ts, the same card the pricing page shows.
  pilot: {
    eyebrow: "Founding offer · For email platforms",
    title: "Start with one campaign.",
    body: "Start with a one-off analysis. Choose one campaign or workflow, with one day to one month of historical data. You run the join in your own environment. You share the result without email addresses or other personal data. We analyze it and show what the combined evidence explains.",
    secondaryBody: "Pilot format: a one-off analysis of historical data. No personal data leaves your environment, and no integration work is needed to start.",
    // Label only: every "claim a place" button on the page goes to the booking link
    // (lib/booking.ts), and reads "Book a 20-minute call" once the offer closes.
    primaryCta: { label: "Claim a founding pilot place", href: "#pilot" },
    secondaryCta: { label: "Read the machine-click implementation guide", href: "/resources/machine-clicks" },
    items: [
      { key: "scope", title: "Choose the scope.", text: "One campaign or workflow, from one day to one month of history." },
      { key: "join", title: "Join in your environment.", text: "Match your campaign events to Datazag data. Share the result with email addresses removed." },
      { key: "review", title: "Review the findings together.", text: "We analyze the result and show what it explains, and what it is worth to your customers." },
    ],
  },
  pilotReport: {
    title: "What you receive: a pilot report with two parts.",
    items: [
      { key: "delivery-analysis", title: "Delivery analysis.", text: "Results grouped by the gateways and mailbox providers that received your email, with what to investigate." },
      { key: "high-risk-domains", title: "High-risk domains.", text: "Recipient and link domains in your data that carry risk signals, flagged for review." },
    ],
  },
  // Item title = question, text = answer. Also published as FAQPage JSON-LD.
  pilotFaq: {
    title: "Questions",
    items: [
      { key: "customer-data", title: "Do you see our customer data?", text: "Only the de-identified joined result you send. No email addresses, and we keep nothing after delivery." },
      { key: "who-classifies", title: "Does Datazag decide which clicks are machine clicks?", text: "No. Your platform classifies them, using our data and published method." },
    ],
  },
};

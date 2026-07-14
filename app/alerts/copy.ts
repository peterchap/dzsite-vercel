import type { PageContent } from "@/sanity/seedMarketingCopy";

export const SLUG = "alerts";
export const TITLE = "Threat Alerts";

export const content: PageContent = {
  hero: {
    eyebrow: "Threat Alerts",
    title: "Catch suspicious infrastructure before it reaches users.",
    body: "Datazag monitors domains, DNS, certificates and infrastructure changes for early signs of platform abuse, brand impersonation and suspicious keyword-led infrastructure.",
    secondaryBody: "Each alert is delivered with reason codes, infrastructure context and a recommended action path so teams can block, investigate, watchlist, escalate or de-escalate with evidence.",
    primaryCta: { label: "Request alert access", href: "/contact" },
    secondaryCta: { label: "Explore alert types", href: "#alert-types" },
  },
  operationalValue: {
    eyebrow: "Operational value",
    title: "Earlier signals. Clearer actions. Less alert noise.",
    body: "Alerts are only useful when the receiving team knows what changed, why it matters and what action is appropriate.",
    items: [
      { key: "see-earlier", title: "See infrastructure earlier", text: "Monitor domains, DNS, certificates and hosting changes before suspicious infrastructure becomes a full incident." },
      { key: "separate-response", title: "Separate the response", text: "Platform abuse, brand impersonation and suspicious keyword infrastructure need different operational actions." },
      { key: "reduce-noise", title: "Reduce noisy matches", text: "Candidate alerts are checked against known-good infrastructure, brand baselines, platform patterns and cloud footprints." },
      { key: "deliver-workflows", title: "Deliver into workflows", text: "Send reasoned alerts to SOC queues, partner portals, Palo Alto, Microsoft Sentinel, Splunk, webhooks, APIs or data shares." },
    ],
  },
  alertClasses: {
    eyebrow: "Alert classes",
    title: "Different infrastructure patterns need different responses.",
    body: "A platform lure, an owned-brand impersonation and a suspicious subdomain on a parked apex domain should not be routed in the same way.",
    items: [
      { key: "platform-impersonation", title: "Platform impersonation", trigger: "Block, enrich detections, watch related infrastructure and de-escalate known-good findings.", text: "Attackers often borrow trust from cloud, identity, email, payment, storage and collaboration platforms. The practical response is usually blocking and detection rather than takedown unless the customer owns the affected brand.", tags: ["Platform terms", "Login lures", "Known-good comparison", "Cloud allowlists", "Related infrastructure"] },
      { key: "brand-impersonation", title: "Brand impersonation", trigger: "Prepare evidence, capture website state, identify abuse contacts and support takedown workflows.", text: "When the alert targets a brand the customer owns or represents, the workflow can move beyond blocking into evidence capture, abuse reporting and remediation tracking.", tags: ["Owned brands", "Aliases", "Suspicious wording", "Website evidence", "Abuse contacts"] },
      { key: "keyword-subdomain", title: "Keyword and subdomain infrastructure", trigger: "Investigate, block or watchlist suspicious lure terms that do not cleanly match a monitored brand.", text: "The apex domain may be parked or generic while the active subdomain carries the lure: login, secure, verify, billing, wallet, update or support.", tags: ["Suspicious subdomains", "Parked apex", "DNS activation", "Novelty", "Hosting context"] },
      { key: "infra-anomalies", title: "Infrastructure anomalies", trigger: "Escalate suspicious domains and IPs discovered around bad actor infrastructure before they appear in conventional lists.", text: "When a candidate is linked to risky infrastructure, Datazag checks related IPs, prefixes, ASNs, DNS relationships and hosted domains to uncover other connected assets that may not yet have been detected elsewhere.", tags: ["Related domains", "Related IPs", "Shared hosting", "Prefix changes", "BGP/MOAS signals"] },
      { key: "customer-watchlists", title: "Customer watchlists", trigger: "Monitor customer-specific brands, suppliers, platforms, domains and high-risk terms with tailored thresholds.", text: "Customer context changes how alerts are interpreted. A term that is harmless for one organization may be important for another.", tags: ["Customer brands", "Suppliers", "Terms", "Domains", "Approved baselines"] },
    ],
  },
  signalPipeline: {
    eyebrow: "Signal pipeline",
    title: "From internet change to operational alert.",
    body: "The alert is the output of collection, matching, filtering, explanation and delivery. Each stage is designed to make the signal more usable.",
    items: [
      { key: "observe", title: "Observe", text: "New domains, subdomains, certificates, DNS and infrastructure changes are captured." },
      { key: "match", title: "Match", text: "Candidates are matched against platforms, brands, keywords, watchlists and suspicious naming patterns." },
      { key: "filter", title: "Filter", text: "Known-good DNS, platform baselines, cloud allowlists and approved customer footprints reduce false positives." },
      { key: "explain", title: "Explain", text: "Reason codes, confidence context, infrastructure evidence and suggested action are attached to the alert." },
      { key: "deliver", title: "Deliver", text: "Alerts are sent to the operational route that fits the team: webhook, API, SIEM, portal, report or data share." },
    ],
  },
  annotatedExample: {
    eyebrow: "Annotated example",
    title: "What a reasoned alert looks like.",
    body: "A useful alert is not just a domain and a severity. It shows the action path, the matched lure, the infrastructure context, the reason codes and how quickly the signal moved through the pipeline.",
    items: [
      { key: "classification", title: "Classification", text: "RED → ISSUE_BLOCK_NOTICE tells the receiving workflow this is a block-notice candidate rather than a general observation." },
      { key: "match", title: "Match", text: "The alert identifies the platform lure and category, here an Exchange/Microsoft 365-themed platform signal." },
      { key: "infra-risk", title: "Infrastructure risk", text: "ASN score, hosting IP, CDN/fronting context and BGP/MOAS signals explain why the infrastructure is higher risk." },
      { key: "reason-codes", title: "Reason codes", text: "Analysts and automations can see the individual signals that caused escalation instead of treating the alert as a black box." },
      { key: "latency", title: "Latency", text: "E2E latency shows how quickly the alert moved through the detection pipeline; DNS resolution phase is reported separately." },
    ],
  },
  evidence: {
    eyebrow: "Evidence",
    title: "Every alert should explain itself.",
    body: "The goal is not to send more alerts. The goal is to give teams enough context to make a decision quickly and consistently.",
    items: [
      { key: "reason-codes", title: "Reason codes", text: "Why the candidate escalated: brand term, platform term, suspicious keyword, DNS activity, certificate event or infrastructure risk." },
      { key: "infra-context", title: "Infrastructure context", text: "Hosting provider, ASN, DNS, certificate, related domains, related IPs, novelty and relationship signals." },
      { key: "known-good", title: "Known-good checks", text: "Comparison against approved customer infrastructure, brand DNS, platform baselines and cloud footprints." },
      { key: "recommended-action", title: "Recommended action", text: "Block, investigate, watchlist, prepare evidence, route for review, de-escalate or monitor for content." },
      { key: "feedback", title: "Feedback path", text: "Customer or analyst feedback can de-escalate accepted findings and improve future routing." },
    ],
  },
  falsePositives: {
    eyebrow: "False-positive controls",
    title: "Filtering happens before the alert reaches the team.",
    body: "Brand and platform terms collide with legitimate infrastructure every day. The alerting layer needs evidence, allowlists and feedback paths to stay operationally useful.",
    items: [
      { key: "approved-baselines", title: "Approved baselines", text: "Customer domains, brand DNS, known cloud footprints and recognized platform infrastructure are used to avoid obvious false positives." },
      { key: "context-severity", title: "Context before severity", text: "A naming match alone is not enough. DNS, certificates, hosting, novelty and relationship signals change routing and severity." },
      { key: "de-escalation", title: "De-escalation feedback", text: "Accepted findings and known-good infrastructure can be de-escalated so teams are not forced to handle the same noise repeatedly." },
    ],
  },
  useCases: {
    eyebrow: "Use cases",
    title: "One alert layer, multiple operational motions.",
    body: "The same infrastructure signal can support internal SOC work, managed services, brand protection, ESP abuse workflows and data-driven security operations.",
    items: [
      { key: "soc-hunting", title: "SOC and threat hunting", text: "Prioritize emerging infrastructure before campaigns create incident volume." },
      { key: "mssp-mdr", title: "MSSP and MDR delivery", text: "Package early alerting, evidence and customer reporting into managed detection services." },
      { key: "brand-protection", title: "Brand protection", text: "Separate blocking workflows from evidence-pack and takedown workflows for owned brands." },
      { key: "esp-abuse", title: "ESP abuse workflows", text: "Score suspicious links, domains and infrastructure flowing through email platforms." },
      { key: "data-driven", title: "Data-driven security teams", text: "Join alerts with lakehouse, SIEM, ticketing and case-management workflows." },
    ],
  },
  delivery: {
    eyebrow: "Delivery",
    title: "Use the route that fits the workflow.",
    body: "Alerts can be consumed as live operational events, enrichment calls, evidence packs or analytical datasets depending on the team using them.",
    items: [
      { key: "webhooks", title: "Webhooks", text: "Push alert events into launch integrations for Palo Alto, Microsoft Sentinel and Splunk, or into custom ticketing, SOAR and portal workflows." },
      { key: "api", title: "API", text: "Score, enrich and retrieve alert context inside products, review queues and case-management tools." },
      { key: "siem", title: "SIEM and SOC tools", text: "Route alerts and reason fields into detection, investigation and response workflows, including Sentinel and Splunk environments." },
      { key: "reports-evidence", title: "Reports and evidence packs", text: "Package findings for executives, customers, takedown workflows and account reviews." },
      { key: "cloud-shares", title: "Cloud data shares", text: "Use Iceberg or Delta datasets for analytics, hunting, enrichment and historical review." },
    ],
  },
  finalCta: {
    eyebrow: "Next step",
    title: "Start with the alert classes that match your workflow.",
    body: "Begin with platform abuse, brand impersonation, keyword infrastructure, infrastructure anomalies or customer-specific watchlists, then route the alerts into the workflow that can act on them.",
    primaryCta: { label: "Request alert access", href: "/contact" },
  },
};

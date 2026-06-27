import type { Metadata } from "next";

import ProductConceptPage, { type ProductConceptPageProps } from "@/components/sections/blocks/ProductConceptPage";
import { sanityFetch } from "@/sanity/fetch";
import { productConceptPageBySlugQuery } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Threat Alerts — Datazag",
  description:
    "Real-time alerts for emerging attack infrastructure, platform impersonation, brand impersonation and suspicious keyword-led infrastructure.",
};

const fallbackContent: ProductConceptPageProps = {
  eyebrow: "Real-time Threat Alerts",
  title: "Catch attack infrastructure before it reaches users.",
  intro: "Datazag monitors the changing internet for early signs of phishing, impersonation and malicious infrastructure. New signals are investigated, filtered against known-good infrastructure, correlated and delivered as actionable alerts into the workflows your team already uses.",
  primaryCta: { label: "Request alert access", href: "/#free-report" },
  secondaryCta: { label: "View report product", href: "/reports" },
  proof: [
    { title: "Platform alerts", text: "High-value cloud, identity, email, storage, payment and collaboration platforms are monitored for abuse." },
    { title: "Brand alerts", text: "Brand impersonation coverage focuses on the world's most targeted brands and customer-specific brands." },
    { title: "Keyword infrastructure", text: "Suspicious subdomains can carry the lure even when the apex domain is parked, generic or otherwise low-value." },
    { title: "False-positive controls", text: "Candidate matches are filtered against known brand DNS, platform baselines, cloud allowlists and infrastructure evidence." },
  ],
  narrative: {
    kicker: "The problem",
    title: "Attack infrastructure is not always a clean platform or brand match.",
    body: [
      "Attackers do not only copy a company's brand. They reuse the platforms people already trust: login providers, cloud services, payment brands, email platforms, storage tools and collaboration suites.",
      "They also use more generic infrastructure patterns: a parked or low-value apex domain with suspicious keywords pushed into subdomains such as login, secure, verify, billing, update or support.",
      "Datazag separates these into different alert classes because the operational response is different: platform alerts are usually for blocking, brand alerts can support takedown, and keyword/subdomain infrastructure alerts are often for investigation, blocking and watchlisting.",
      "The first pass finds suspicious candidates using brand terms, platform terms, keywords, DGA indicators and entropy signals. The second pass checks those candidates against known-good DNS, standard platform infrastructure, brand baselines and cloud allowlists so legitimate infrastructure is not treated like an attack.",
    ],
  },
  flowTitle: "From internet change to actionable alert.",
  flow: [
    { title: "Observe", text: "New domains, subdomains, certs, DNS and infrastructure changes are captured." },
    { title: "Classify", text: "Signals are separated into platform, brand, keyword/subdomain and supporting infrastructure context." },
    { title: "Filter", text: "Candidates are checked against known DNS, platform baselines, cloud allowlists and brand infrastructure." },
    { title: "Act", text: "Clients receive the right action path: block, investigate, watchlist, de-escalate or prepare takedown." },
  ],
  alertTypeSection: {
    kicker: "Alert types",
    title: "Three alert classes need different responses.",
    intro: "Datazag checks high-value platforms, major global brands and suspicious keyword-led infrastructure. Platform hits dominate observed impersonation activity, but a third pattern is also important: the lure appears in the subdomain while the apex is parked, generic or not obviously malicious on its own.",
    stats: [
      { title: "Platform", text: "trusted services and SaaS brands abused as the lure." },
      { title: "Brand", text: "customer-owned or high-value brands targeted directly." },
      { title: "Keyword", text: "suspicious subdomains on parked or low-value apex domains." },
    ],
    types: [
      {
        title: "Platform impersonation alerts",
        subtitle: "Block and reduce exposure",
        coverage: "Cloud, identity, email, collaboration, storage, payment and SaaS platforms.",
        action: "Block, investigate related infrastructure, monitor for brand crossover, or de-escalate if approved.",
        text: "A customer usually does not have standing to request takedown for a fake platform they do not own. The practical action is to block, enrich detection, and watch whether the same infrastructure begins targeting the customer's own brands or users.",
        evidence: ["Matched platform pattern and category", "DGA, entropy and suspicious naming signals", "Comparison against standard platform DNS and known-good infrastructure", "Cloud allowlist checks to reduce legitimate platform and customer infrastructure matches", "Client de-escalate link for known-good or low-risk findings"],
      },
      {
        title: "Brand impersonation alerts",
        subtitle: "Evidence pack and takedown",
        coverage: "Top global brands, customer-owned brands, subsidiaries, domains and known aliases.",
        action: "Prepare takedown evidence when a website appears, including screenshot and abuse contact, or de-escalate if approved.",
        text: "When the alert targets a brand the customer owns or represents, Datazag can update the alert with evidence suitable for takedown or abuse reporting once a live website appears.",
        evidence: ["Brand match and affected domain", "DGA, entropy and suspicious naming signals", "Comparison against known brand DNS, standard infrastructure and approved cloud footprints", "Website screenshot and abuse contact when content appears", "Client de-escalate link for accepted or false-positive findings"],
      },
      {
        title: "Keyword infrastructure alerts",
        subtitle: "Investigate, block and watchlist",
        coverage: "Suspicious subdomains using lure terms such as login, secure, verify, billing, update, wallet or support on parked, generic or low-reputation apex domains.",
        action: "Investigate the subdomain, block if appropriate, monitor related infrastructure, and de-escalate if the customer recognises it.",
        text: "These alerts do not necessarily match a monitored platform or owned brand. The risk sits in the combination of suspicious subdomain language, parked or low-value apex domain, new DNS activity, hosting context and related infrastructure behaviour.",
        evidence: ["Suspicious keyword in subdomain rather than apex domain", "Parked, inactive or low-value apex domain context", "Entropy, DGA, corpus novelty or fast-path infrastructure signals", "DNS, hosting, ASN and certificate context for investigation", "Client de-escalate link for known-good or accepted findings"],
      },
    ],
    note: "All three alert classes support a client de-escalation action. The difference is the recommended response: platform impersonation is primarily a blocking and detection problem; brand impersonation can become an evidence and takedown workflow; keyword/subdomain infrastructure alerts are usually an investigation, blocking and watchlist workflow.",
  },
  exampleAlert: {
    kicker: "Example platform alert",
    title: "What an operational platform alert looks like.",
    intro: "This example is based on a platform-risk alert flowing into a Slack channel. The format is intentionally compact: enough context for a first decision, with reason codes that explain why the alert escalated.",
    severity: "PLATFORM | RED",
    status: "Platform Risk Escalated",
    domain: "www.apple-du.ph",
    fields: [
      { label: "Incident ID", value: "INC-1782484980-55c8ca" },
      { label: "Classification", value: "RED → ISSUE_BLOCK_NOTICE" },
      { label: "Match", value: "Platform — apple" },
      { label: "Customer", value: "Microsoft" },
      { label: "ASN risk score", value: "0.95 · medium" },
      { label: "ASN", value: "AS63949 Linode AS63949" },
      { label: "Detected hosting", value: "45.79.222.138" },
      { label: "Confidence", value: "48/100" },
    ],
    reasons: ["Platform impersonation targeting 'apple'", "Domain not found in known 330M corpus", "infra: ELEVATED_NETWORK_TYPE", "infra: CERTSTREAM_ANOMALY", "infra: ASN:medium", "infra: FAST_PATH_DENSITY_SURGE"],
    latency: "E2E latency: 3.923s",
  },
  secondaryExampleAlert: {
    kicker: "Example brand alert",
    title: "What a brand evidence-pack alert looks like.",
    intro: "This fictional example shows the brand workflow. Unlike a platform alert, the recommended action can move beyond blocking into evidence capture, abuse reporting and takedown support when the customer owns or represents the affected brand.",
    severity: "BRAND | RED",
    status: "Brand Impersonation Escalated",
    domain: "secure-brand-login.test",
    fields: [
      { label: "Classification", value: "RED → EVIDENCE_PACK_READY" },
      { label: "Match", value: "Customer-owned brand" },
      { label: "Website status", value: "Live page detected" },
      { label: "Screenshot", value: "Captured and attached to evidence pack" },
      { label: "Abuse contact", value: "Hosting provider abuse mailbox identified" },
      { label: "Recommended action", value: "Submit takedown notice or de-escalate" },
    ],
    reasons: ["Brand term present with suspicious login/security wording", "Candidate does not match known brand DNS or approved cloud footprint", "Website content observed and screenshot captured", "Hosting provider and abuse contact resolved for evidence pack"],
    latency: "Evidence pack updated when website content appeared",
  },
  tertiaryExampleAlert: {
    kicker: "Example keyword infrastructure alert",
    title: "What a keyword/subdomain alert looks like.",
    intro: "This fictional example shows the third alert class. The apex domain may be parked or generic, but the active subdomain carries suspicious lure language and starts to resolve through infrastructure that deserves investigation.",
    severity: "KEYWORD | AMBER",
    status: "Suspicious Subdomain Infrastructure",
    domain: "verify-account.parking-domain.test",
    fields: [
      { label: "Classification", value: "AMBER → INVESTIGATE_OR_BLOCK" },
      { label: "Keyword signal", value: "verify-account" },
      { label: "Apex status", value: "Parked or inactive apex domain" },
      { label: "Match", value: "No monitored platform or owned brand match" },
      { label: "Detected hosting", value: "New DNS resolution observed" },
      { label: "Recommended action", value: "Investigate, block or watchlist related infrastructure" },
    ],
    reasons: ["Suspicious keyword present in subdomain", "Apex domain appears parked, generic or low-value", "Subdomain activity differs from apex-domain posture", "Infrastructure context requires investigation rather than takedown workflow"],
    latency: "Alert generated when subdomain and infrastructure activity were observed",
  },
  packagesTitle: "Alert use cases.",
  packages: [
    { title: "SOC and threat hunting", text: "Prioritise suspicious infrastructure before campaigns create incident volume." },
    { title: "Brand and platform impersonation", text: "Separate blocking workflows from evidence-pack and takedown workflows." },
    { title: "Keyword infrastructure", text: "Detect suspicious lure terms in subdomains, especially where the apex domain is parked or generic." },
    { title: "False-positive review", text: "Use DNS baselines, approved cloud infrastructure and de-escalation feedback to keep alerts operationally useful." },
    { title: "MSSP and MDR delivery", text: "Package early infrastructure intelligence into managed detection and customer reporting." },
  ],
  finalTitle: "See the infrastructure forming around your organisation.",
  finalBody: "Start with an external platform threat report, then move into real-time alerting for platform abuse, brand impersonation, suspicious keyword infrastructure and the signals that connect them.",
};

export default async function AlertsPage() {
  const cmsContent = await sanityFetch<ProductConceptPageProps | null>(productConceptPageBySlugQuery, { slug: "alerts" });
  return <ProductConceptPage {...(cmsContent ?? fallbackContent)} />;
}

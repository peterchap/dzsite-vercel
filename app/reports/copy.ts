import type { PageContent } from "@/sanity/seedMarketingCopy";

export const SLUG = "reports";
export const TITLE = "Reports";

// Copy only. Structural/transactional fields (tier accent classes, catalogue
// price/cadence, env-gated CTAs, sample hrefs) stay in reports/page.tsx.
export const content: PageContent = {
  hero: {
    eyebrow: "Reports",
    title: "See the threats and defence gaps around your domains — including the ones you don't know you own.",
    body: "Start free on a single domain. The Cross-Estate Domain Risk Report then walks certificate, mail and registration relationships to find the rest of your estate — and shows you the risk that only appears when you look across it.",
    primaryCta: { label: "Get your free report", href: "/#free-report" },
    secondaryCta: { label: "See the paid reports", href: "#catalogue" },
  },
  reportValue: {
    eyebrow: "Report value",
    title: "External threat exposure and DNS defence gaps, in one report.",
    body: "The free report is not just a posture snapshot. It connects the platforms visible around one domain with threat activity targeting those platforms, then identifies the DNS and email weaknesses that affect defence and remediation priorities.",
    secondaryBody: "The free report covers one domain. Most organisations own more than they think — that's the first thing the Cross-Estate report shows you.",
    items: [
      { key: "threats", title: "Threats targeting your platform footprint", text: "Identify external threat activity around the platforms, providers and vendors visible from your domain's public records." },
      { key: "dns-defence", title: "Detailed DNS defence analysis", text: "We check the baseline controls every domain should enforce (SPF, DKIM, DMARC), and show where the advanced and gold-standard layers (MTA-STS, TLS reporting, CAA, DNSSEC, BIMI) are available to you — as a maturity path, not a list of failures." },
      { key: "remediation", title: "Remediation priorities", text: "Translate findings into clear actions, likely owners and practical remediation effort so teams know what to fix first." },
    ],
  },
  crossEstate: {
    eyebrow: "Cross-Estate Domain Risk Report",
    title: "You've seen what one domain looks like. This is what the estate looks like.",
    items: [
      { key: "tier-declared", title: "Declared", text: "The domains you told us about" },
      { key: "tier-strong", title: "Strongly associated", text: "High-confidence: you own these" },
      { key: "tier-possible", title: "Possible", text: "Medium-confidence: review these" },
      { key: "tier-defensive", title: "Defensive", text: "Consider recovering or monitoring" },
      { key: "estate-discovery", title: "Estate discovery", text: "You declare the domains you know. Discovery walks certificate, mail and registration relationships to evidence the ones you don't — sorted into four confidence tiers (declared, strongly associated, possible, defensive) with the connection shown for every domain. No guesses; every finding carries its evidence." },
      { key: "systemic-risk", title: "Systemic risk", text: "Some risk only exists across domains: how much of the estate depends on one provider (weighted by who that provider is — a majority on a hyperscale platform is a different risk from the same share on a commodity registrar), which weaknesses repeat across segments, which acquisitions sit below the group standard, and what expires next. The Cross-Estate report is built to show exactly this layer." },
    ],
  },
  sampleReports: {
    eyebrow: "Sample reports",
    title: "View the anatomy in a few seconds.",
    body: "Rather than explain how reports are produced, the samples show what a recipient actually sees: the summary, findings, evidence and next actions.",
    items: [
      { key: "sample-health", title: "Sample free Domain Health Report", text: "A sample one-domain report showing threat exposure around visible platforms, DNS defence gaps and first remediation priorities.", tags: ["Platform exposure", "Email control maturity", "DNS posture", "What to fix first"] },
      { key: "sample-cross-estate", title: "Sample Cross-Estate Domain Risk Report", text: "A six-page assessment across a whole estate, opened by discovery — the domains you declared, plus the ones we found and can evidence — and closed by a worksheet your IT team can execute.", tags: ["Estate discovery", "Concentration & posture variance", "Exception register", "Remediation worksheet"] },
    ],
  },
  anatomy: {
    eyebrow: "What the report contains",
    title: "Threat context, DNS analysis and remediation priorities.",
    body: "The value is in the contents: what is exposed, what is weak, what is being targeted and what should be fixed first.",
    items: [
      { key: "drr-threat", title: "Platform-led threat exposure", text: "Which visible platforms and providers are being used as lures, and which suspicious domains, certificates or DNS patterns are relevant to them?", tags: ["Platform lures", "Vendor footprint", "Brand terms", "Certificates", "DNS changes", "Evidence"] },
      { key: "drr-dns", title: "DNS and email defence analysis", text: "Which DNS and email records create spoofing, trust, routing or configuration weaknesses that should be fixed?", tags: ["Baseline: SPF · DKIM · DMARC", "Advanced: MTA-STS · TLS reporting", "Gold standard: CAA · DNSSEC · BIMI", "MX providers"] },
      { key: "drr-footprint", title: "Platform and vendor footprint", text: "Which email platforms, cloud services, SaaS providers, CDNs, nameservers and hosting relationships are visible?", tags: ["Email platform", "Cloud", "CDN", "Hosting", "Nameservers", "SaaS signals"] },
      { key: "drr-subdomain", title: "Subdomain and infrastructure view", text: "Which public subdomains, CNAMEs, provider relationships and hosting patterns expose the operating footprint?", tags: ["Subdomains", "A/AAAA", "CNAMEs", "Hosting", "ASN", "Related infrastructure"] },
      { key: "drr-remediation", title: "Remediation effort and cost indicators", text: "Which issues are high priority, who is likely to own them, and what level of effort should be expected?", tags: ["Risk ranking", "Evidence", "Next steps", "Owners", "Effort bands", "Monitoring path"] },
      { key: "drr-appendix", title: "Technical remediation appendix", text: "Current state, target state, paste-ready records, staged rollout.", tags: ["Current state", "Target state", "Paste-ready records", "Staged rollout"] },
      { key: "ce-discovery", title: "Estate discovery", text: "Declared, strongly associated, possible, defensive. Every discovered domain carries its connection evidence: a shared certificate, a mail route, a registration record." },
      { key: "ce-concentration", title: "Concentration & accumulation", text: "The share of your estate on each provider, weighted by provider resilience and exit friction. The biggest number is not always the biggest finding — the report says which is which." },
      { key: "ce-variance", title: "Posture variance & correlated weakness", text: "Which segments sit below the group standard, and what's wrong the same way everywhere. A weakness on one domain is a ticket; on half the estate it's a policy gap, and it gets fixed at policy level." },
      { key: "ce-calendar", title: "Operational calendar & exception register", text: "What expires next, what's already lapsed, and a single prioritised list of what to act on, in order." },
      { key: "ce-worksheet", title: "Remediation worksheet", text: "An appendix your IT team executes: exact records per domain, staged where staging matters (DMARC before SPF hard-fail), grouped by the account that administers each zone so one team's work lands in one change window." },
    ],
  },
  catalogue: {
    eyebrow: "Report catalogue",
    title: "Start with one domain, then understand the estate.",
    body: "The free report gives a useful single-domain analysis. Paid reports expand the scope to the domains an organisation owns and expose recurring weaknesses, inconsistent controls and systemic risk.",
    items: [
      { key: "free-health", title: "Free Domain Health Report", text: "One domain. Platform-led threat exposure, detailed DNS defence analysis and first remediation priorities." },
      { key: "domain-risk", title: "Domain Risk Report", status: "Single domain · paid", text: "The full assessment of one domain — yours, a client's, a vendor's, an acquisition target's. An executive core any board can read: threat exposure, defence posture, and the evidence behind every claim. Plus a technical remediation appendix your engineers execute: every finding with current state, target state, and paste-ready records, staged in the order a change should actually land." },
      { key: "cross-estate", title: "Cross-Estate Domain Risk Report", status: "Multi-domain · paid", text: "The same assessment at estate scope, opened by discovery: the domains you declared, the ones we found and can evidence, and the systemic layer no single-domain report can show — concentration, posture variance, correlated weakness, the operational calendar — closed by a worksheet grouped by the team that administers each zone. Variants for technical teams, and for insurance underwriting and M&A due diligence." },
      { key: "partner-branded", title: "Partner-branded reports", text: "White-label or partner-led reporting for MSSPs, ESPs and service providers delivering reports under their own brand. Any report in this catalogue, delivered under your brand." },
    ],
  },
  sampleFindings: {
    eyebrow: "Sample findings",
    title: "The report explains threat context, defence gaps and what to fix next.",
    body: "A useful report should not simply list records. It should explain the external threat context, the defence weakness, the likely owner and the next action.",
    items: [
      { key: "platform-exposure", title: "Platform threat exposure", text: "Which platforms and vendors are visible, and is suspicious infrastructure appearing around those lures?" },
      { key: "dns-gaps", title: "DNS defence gaps", text: "Which baseline controls (SPF, DKIM, DMARC) need enforcing first, and which advanced and gold-standard layers (MTA-STS, TLS reporting, CAA, DNSSEC, BIMI) are available next on the maturity path?" },
      { key: "mail-alignment", title: "Mail platform alignment", text: "Does the public DNS footprint match the expected email platform and sender configuration?" },
      { key: "systemic", title: "Systemic portfolio risk", text: "For paid reports, are the same weaknesses repeated across many domains, brands, subsidiaries or suppliers?" },
      { key: "remediation-plan", title: "Remediation plan", text: "What should be fixed first, who is likely to own it, and what level of effort or cost should be expected?" },
      { key: "discovery-evidence", title: "Discovery evidence", text: "You declared 9 domains. Discovery evidenced 24 — including one expired acquisition name available for anyone to register." },
      { key: "concentration", title: "Concentration weighting", text: "64% of the estate sits on one commodity registrar with no transfer locks — while the 79% certificate-authority concentration is a config change to leave. The report ranks which concentration is the finding." },
    ],
  },
  upgradePaths: {
    eyebrow: "Where reports lead",
    title: "A report should create the next security action.",
    body: "The free report gives the single-domain baseline. Paid reports add estate-wide coverage, systemic risk analysis and recurring reporting across the domains an organisation owns.",
    items: [
      { key: "alerts", title: "Alerts", text: "Move priority brands, domains or platforms into live alerting for platform abuse, brand impersonation and suspicious infrastructure." },
      { key: "monitoring", title: "Estate monitoring", text: "A report is the map on the day it runs. Under monitoring, discovery re-walks the estate every run — new domains join automatically, candidates queue for your confirmation, and the grade trend shows whether remediation is landing. The live feed covers what happens between runs." },
      { key: "cloud-shares", title: "Cloud data shares", text: "Join report findings with analytical datasets for hunting, enrichment, trend analysis and marketplace delivery." },
      { key: "partner-services", title: "Partner services", text: "Use reports as a customer-facing motion for MSSPs, ESPs, consultancies and managed-service providers." },
    ],
  },
  finalCta: {
    eyebrow: "Next step",
    title: "View the sample, then get your own report.",
    body: "The sample examples show the report anatomy. The free report applies the same structure to one domain using current Datazag intelligence.",
    primaryCta: { label: "Get my free report", href: "/#free-report" },
  },
};

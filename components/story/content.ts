import type { StoryContent } from "./types";
import { DOMAINS_DISPLAY } from "@/lib/site-stats";

export const defaultStoryContent: StoryContent = {
  // WU24: coverage wedge leads; lead-time (48h/~10s) demoted to a proof chip.
  heroEyebrow: "Internet Infrastructure Intelligence",
  heroTitle: "Your threat feeds see attacks. We see them being built.",
  heroIntro:
    "Datazag maps malicious infrastructure at certificate issuance — surfacing whole campaigns before the first domain attacks — and delivers scored, annotated intelligence straight into your SIEM, warehouse and controls.",
  heroStatement:
    "",
  primaryCta: { label: "Get your free report", href: "/#free-report" },
  secondaryCta: { label: "Read the investigation", href: "/intelligence/one-signal-150-domains" },
  heroPills: ["Detect earlier", "Block with evidence", "Act before launch"],
  heroChips: [
    { label: "150 domains from one signal — 0 in public domain feeds", href: "/intelligence/one-signal-150-domains" },
    { label: "~10s from certificate to scored alert" },
    { label: "Up to 48h ahead of blacklists" },
  ],
  insight: {
    kicker: "Why it matters",
    title: "Every attack changes the internet first.",
    body: [
      "Before attackers can target people, they have to build infrastructure.",
      "Domains. Certificates. DNS. Hosting. Networks. Services. Those changes leave evidence before campaigns reach victims.",
    ],
  },
  signals: {
    kicker: "Observable signals",
    title: "The preparation phase is visible if you know where to look.",
  },
  platform: {
    kicker: "Turning intelligence into action",
    title: "Intelligence becomes evidence. Evidence becomes action.",
    body: [
      "Datazag packages relationship intelligence into reports, alerts, APIs and data products so teams can block, investigate, prioritize and explain decisions before campaigns reach users.",
    ],
  },
  graph: {
    kicker: "Early detection",
    title: "Earlier visibility creates better intelligence.",
    body: [
      "Traditional controls usually see the threat when it reaches a user, inbox, browser or endpoint. Datazag looks earlier, at the infrastructure attackers need before campaigns become operational.",
    ],
  },
  // WU28-A step 3: retitled to journey voice (was "Products / Choose how you
  // consume the intelligence").
  delivery: {
    kicker: "Into your stack",
    title: "Explainable signals flow into controls you already operate.",
    body: ["The same intelligence engine delivers scored, annotated records as reports, alerts, APIs and data shares — formats of one thing, not separate products."],
  },
  partners: {
    kicker: "Who it helps",
    title: "Built for teams that protect others.",
    body: ["Security teams, MSSPs, ESPs, data teams and platform providers can use the same intelligence in different ways."],
  },
  applicationsSection: {
    kicker: "Product proof",
    title: "Show the output. Do not just describe it.",
  },
  finalCta: {
    kicker: "Start here",
    title: "Get your free External Platform Threat Report.",
    body: [
      "We analyze your domain, discover visible platforms, review DNS and email posture, surface external threat exposure and send a report you can return to later.",
    ],
  },
  finalButton: { label: "Get your free report", href: "/#free-report" },
  internetSignals: [
    { title: "Domains", text: "New names, lookalikes and campaign assets appear before they are used." },
    { title: "Certificates", text: "Certificate issuance exposes infrastructure preparation in near real time." },
    { title: "DNS", text: "Records, nameservers, MX and hosting relationships reveal intent and reuse." },
    { title: "Networks", text: "Hosting, ASN, routing and threat intelligence add infrastructure context." },
  ],
  timelineSteps: [
    { marker: "01", title: "Infrastructure created", text: "Domains, certificates, DNS and hosting begin to take shape." },
    { marker: "02", title: "Datazag observes", text: "Observable changes become triggers for investigation." },
    { marker: "03", title: "Datazag investigates", text: "Signals are enriched, scored and connected into context." },
    { marker: "04", title: "Campaign launched", text: "Related infrastructure becomes operational." },
    { marker: "05", title: "Traditional detection", text: "Most controls see the threat after it reaches users or systems." },
  ],
  proofPoints: [
    { title: `${DOMAINS_DISPLAY} domains`, text: "Every observation can be correlated against the Datazag domain corpus." },
    { title: "Explainable", text: "Risk output is paired with reason codes and supporting evidence." },
    { title: "Continuous", text: "Internet infrastructure, DNS and network telemetry refresh continuously." },
    { title: "Cloud-native", text: "Reports, alerts, APIs and data products come from the same intelligence layer." },
  ],
  graphEvidence: [
    { title: "Observe", text: "Domains, DNS, certificates, hosting, ASN context and platform footprints." },
    { title: "Correlate", text: "Connect new signals with historical infrastructure, providers and known-good baselines." },
    { title: "Explain", text: "Attach risk scores, reason codes, confidence context and recommended action." },
  ],
  deliveryCards: [
    { title: "Reports", text: "Understand your domain, platforms, posture and external threat exposure." },
    { title: "Alerts", text: "Know when new platform, brand or keyword infrastructure appears." },
    { title: "Infrastructure Intelligence", text: "Use Datazag data inside your own systems, products and marketplaces." },
  ],
  partnerAudiences: [
    { title: "Security teams", text: "Use earlier infrastructure intelligence for triage, blocking and investigation." },
    { title: "MSSPs", text: "Reduce analyst time and create new partner-branded revenue lines." },
    { title: "ESPs", text: "Detect bad actors, check links, enrich logs and create customer-facing services." },
    { title: "Data teams", text: "Join infrastructure intelligence into warehouses, models and internal products." },
  ],
  applications: [
    { title: "Report preview", text: "DNS posture, visible platforms, subdomains, external threats and recommendations." },
    { title: "Alert preview", text: "Classification, matched entity, infrastructure context, confidence and reason codes." },
    { title: "Dataset preview", text: "Domain, DNS, ASN, provider, platform, risk and historical features." },
  ],
};

export function mergeStoryContent(content?: Partial<StoryContent> | null): StoryContent {
  return {
    ...defaultStoryContent,
    ...(content ?? {}),
    primaryCta: { ...defaultStoryContent.primaryCta, ...(content?.primaryCta ?? {}) },
    secondaryCta: { ...defaultStoryContent.secondaryCta, ...(content?.secondaryCta ?? {}) },
    finalButton: { ...defaultStoryContent.finalButton, ...(content?.finalButton ?? {}) },
    insight: { ...defaultStoryContent.insight, ...(content?.insight ?? {}) },
    signals: { ...defaultStoryContent.signals, ...(content?.signals ?? {}) },
    platform: { ...defaultStoryContent.platform, ...(content?.platform ?? {}) },
    graph: { ...defaultStoryContent.graph, ...(content?.graph ?? {}) },
    delivery: { ...defaultStoryContent.delivery, ...(content?.delivery ?? {}) },
    partners: { ...defaultStoryContent.partners, ...(content?.partners ?? {}) },
    applicationsSection: { ...defaultStoryContent.applicationsSection, ...(content?.applicationsSection ?? {}) },
    finalCta: { ...defaultStoryContent.finalCta, ...(content?.finalCta ?? {}) },
    heroPills: content?.heroPills?.length ? content.heroPills : defaultStoryContent.heroPills,
    heroChips: content?.heroChips?.length ? content.heroChips : defaultStoryContent.heroChips,
    internetSignals: content?.internetSignals?.length ? content.internetSignals : defaultStoryContent.internetSignals,
    timelineSteps: content?.timelineSteps?.length ? content.timelineSteps : defaultStoryContent.timelineSteps,
    proofPoints: content?.proofPoints?.length ? content.proofPoints : defaultStoryContent.proofPoints,
    graphEvidence: content?.graphEvidence?.length ? content.graphEvidence : defaultStoryContent.graphEvidence,
    deliveryCards: content?.deliveryCards?.length ? content.deliveryCards : defaultStoryContent.deliveryCards,
    partnerAudiences: content?.partnerAudiences?.length ? content.partnerAudiences : defaultStoryContent.partnerAudiences,
    applications: content?.applications?.length ? content.applications : defaultStoryContent.applications,
  };
}

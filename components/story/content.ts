import type { StoryContent } from "./types";

export const defaultStoryContent: StoryContent = {
  heroEyebrow: "Internet Infrastructure Intelligence",
  heroTitle: "The internet never stands still.",
  heroIntro:
    "Every second, domains are registered, certificates are issued, DNS changes propagate and infrastructure evolves. Most of these changes are routine. Some become tomorrow's attacks.",
  heroStatement:
    "Datazag continuously observes the changing internet and transforms those signals into explainable intelligence.",
  primaryCta: { label: "Get your free report", href: "/#free-report" },
  secondaryCta: { label: "See how it works", href: "#how-it-works" },
  heroPills: ["Observe earlier", "Connect infrastructure", "Deliver intelligence"],
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
    kicker: "The intelligence engine",
    title: "Signals become evidence. Evidence becomes intelligence.",
    body: [
      "Datazag treats every new observation as the start of an investigation. Signals are correlated, enriched, scored and explained before they are delivered as reports, alerts or data products.",
    ],
  },
  graph: {
    kicker: "Why earlier matters",
    title: "Earlier visibility creates more response options.",
    body: [
      "Traditional controls usually see the threat when it reaches a user, inbox, browser or endpoint. Datazag looks earlier, at the infrastructure attackers need before campaigns become operational.",
    ],
  },
  delivery: {
    kicker: "Products",
    title: "Choose how you consume the intelligence.",
    body: ["The same intelligence engine powers reports, alerts and infrastructure data products."],
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
      "We analyse your domain, discover visible platforms, review DNS and email posture, surface external threat exposure and send a report you can return to later.",
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
    { title: "340M+ domains", text: "Every observation can be correlated against the Datazag domain corpus." },
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
    internetSignals: content?.internetSignals?.length ? content.internetSignals : defaultStoryContent.internetSignals,
    timelineSteps: content?.timelineSteps?.length ? content.timelineSteps : defaultStoryContent.timelineSteps,
    proofPoints: content?.proofPoints?.length ? content.proofPoints : defaultStoryContent.proofPoints,
    graphEvidence: content?.graphEvidence?.length ? content.graphEvidence : defaultStoryContent.graphEvidence,
    deliveryCards: content?.deliveryCards?.length ? content.deliveryCards : defaultStoryContent.deliveryCards,
    partnerAudiences: content?.partnerAudiences?.length ? content.partnerAudiences : defaultStoryContent.partnerAudiences,
    applications: content?.applications?.length ? content.applications : defaultStoryContent.applications,
  };
}

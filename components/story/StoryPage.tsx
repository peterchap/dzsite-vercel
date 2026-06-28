import React from "react";

import { Container } from "@/components/ui/Container";

type Card = { title: string; text: string };
type TimelineStep = Card & { marker: string };
type Cta = { label: string; href: string };
type CopySection = { kicker: string; title: string; body?: string[] };

export type StoryContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroIntro: string;
  heroStatement: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  heroPills: string[];
  insight: CopySection;
  signals: CopySection;
  platform: CopySection;
  graph: CopySection;
  delivery: CopySection;
  partners: CopySection;
  applicationsSection: CopySection;
  finalCta: CopySection;
  finalButton: Cta;
  internetSignals: Card[];
  timelineSteps: TimelineStep[];
  proofPoints: Card[];
  graphEvidence: Card[];
  deliveryCards: Card[];
  partnerAudiences: Card[];
  applications: Card[];
};

const defaultContent: StoryContent = {
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

function mergeContent(content?: Partial<StoryContent> | null): StoryContent {
  return {
    ...defaultContent,
    ...(content ?? {}),
    primaryCta: { ...defaultContent.primaryCta, ...(content?.primaryCta ?? {}) },
    secondaryCta: { ...defaultContent.secondaryCta, ...(content?.secondaryCta ?? {}) },
    finalButton: { ...defaultContent.finalButton, ...(content?.finalButton ?? {}) },
    insight: { ...defaultContent.insight, ...(content?.insight ?? {}) },
    signals: { ...defaultContent.signals, ...(content?.signals ?? {}) },
    platform: { ...defaultContent.platform, ...(content?.platform ?? {}) },
    graph: { ...defaultContent.graph, ...(content?.graph ?? {}) },
    delivery: { ...defaultContent.delivery, ...(content?.delivery ?? {}) },
    partners: { ...defaultContent.partners, ...(content?.partners ?? {}) },
    applicationsSection: { ...defaultContent.applicationsSection, ...(content?.applicationsSection ?? {}) },
    finalCta: { ...defaultContent.finalCta, ...(content?.finalCta ?? {}) },
    heroPills: content?.heroPills?.length ? content.heroPills : defaultContent.heroPills,
    internetSignals: content?.internetSignals?.length ? content.internetSignals : defaultContent.internetSignals,
    timelineSteps: content?.timelineSteps?.length ? content.timelineSteps : defaultContent.timelineSteps,
    proofPoints: content?.proofPoints?.length ? content.proofPoints : defaultContent.proofPoints,
    graphEvidence: content?.graphEvidence?.length ? content.graphEvidence : defaultContent.graphEvidence,
    deliveryCards: content?.deliveryCards?.length ? content.deliveryCards : defaultContent.deliveryCards,
    partnerAudiences: content?.partnerAudiences?.length ? content.partnerAudiences : defaultContent.partnerAudiences,
    applications: content?.applications?.length ? content.applications : defaultContent.applications,
  };
}

function Button({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-300/70 focus:ring-offset-2 focus:ring-offset-[#030619] ${
        secondary
          ? "border-white/15 bg-white/5 text-white hover:bg-white/10"
          : "border-cyan-300/50 bg-cyan-300 text-slate-950 hover:bg-cyan-200"
      }`}
    >
      {children}
    </a>
  );
}

function Section({ section, children, id }: { section: CopySection; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="relative border-t border-white/10 py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">{section.kicker}</p>
          <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-5xl">{section.title}</h2>
          <div className="mt-8">{children}</div>
        </div>
      </Container>
    </section>
  );
}

function Paragraphs({ body }: { body?: string[] }) {
  return <>{body?.map((paragraph) => <p key={paragraph} className="mt-5 max-w-3xl text-lg leading-8 text-slate-300 first:mt-0">{paragraph}</p>)}</>;
}

function CardGrid({ items, columns = "md:grid-cols-2 lg:grid-cols-3" }: { items: Card[]; columns?: string }) {
  return (
    <div className={`grid gap-4 ${columns}`}>
      {items.map((item) => (
        <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h3 className="text-lg font-semibold text-white">{item.title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-400">{item.text}</p>
        </article>
      ))}
    </div>
  );
}

function LivingInternetBackdrop() {
  const nodes = [[6, 18, 2.8], [18, 30, 2.1], [31, 19, 2.4], [43, 42, 3.1], [59, 34, 2.2], [72, 18, 2.6], [88, 36, 2.4], [78, 62, 3.2], [52, 67, 2.5], [28, 72, 2.2], [12, 58, 1.8], [64, 78, 1.9], [91, 68, 1.7]];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(55,222,245,0.18),transparent_28%),radial-gradient(circle_at_78%_22%,rgba(86,168,245,0.14),transparent_30%),radial-gradient(circle_at_48%_78%,rgba(93,73,255,0.16),transparent_34%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
      <svg className="absolute inset-0 h-full w-full opacity-85" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M6 18 C18 30 23 17 31 19 S39 40 43 42 S55 34 59 34 S68 20 72 18 S82 34 88 36" fill="none" stroke="#37DEF5" strokeOpacity="0.22" strokeWidth="0.35" />
        <path d="M12 58 C25 74 36 72 52 67 S68 62 78 62 S85 48 88 36" fill="none" stroke="#37DEF5" strokeOpacity="0.2" strokeWidth="0.35" />
        {nodes.map(([cx, cy, r], index) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={index % 4 === 0 ? "#37DEF5" : "#56A8F5"} fillOpacity={index % 4 === 0 ? 0.8 : 0.38} />
        ))}
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#030619] to-transparent" />
    </div>
  );
}

function StoryHero({ content }: { content: StoryContent }) {
  return (
    <section className="relative min-h-[92vh] overflow-hidden py-24 md:flex md:items-center md:py-32">
      <LivingInternetBackdrop />
      <Container>
        <div className="relative max-w-4xl">
          <p className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">{content.heroEyebrow}</p>
          <h1 className="mt-8 text-5xl font-semibold tracking-tight text-white md:text-7xl lg:text-8xl">{content.heroTitle}</h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">{content.heroIntro}</p>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-white">{content.heroStatement}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href={content.primaryCta.href}>{content.primaryCta.label}</Button>
            <Button href={content.secondaryCta.href} secondary>{content.secondaryCta.label}</Button>
          </div>
          <div className="mt-12 grid max-w-3xl gap-3 text-xs text-slate-300 sm:grid-cols-3">
            {content.heroPills.map((pill) => <div key={pill} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">{pill}</div>)}
          </div>
        </div>
      </Container>
    </section>
  );
}

function StorySignals({ content }: { content: StoryContent }) {
  return (
    <section className="relative border-t border-white/10 py-16 md:py-20">
      <Container>
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">{content.signals.kicker}</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">{content.signals.title}</h2>
        </div>
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
          <div className="grid gap-4 md:grid-cols-4">
            {content.internetSignals.map((signal, index) => (
              <article key={signal.title} className="rounded-2xl border border-white/10 bg-[#030619]/55 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/80">0{index + 1}</span>
                  <span className="h-2 w-2 rounded-full bg-cyan-300" />
                </div>
                <h3 className="text-base font-semibold text-white">{signal.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{signal.text}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function StoryTimeline({ content }: { content: StoryContent }) {
  return (
    <Section section={content.graph}>
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <Paragraphs body={content.graph.body} />
        <ol className="relative grid gap-5 md:grid-cols-5 md:gap-4">
          <div className="pointer-events-none absolute left-[10%] right-[10%] top-[2.35rem] hidden h-px bg-gradient-to-r from-cyan-300/10 via-cyan-300/50 to-cyan-300/10 md:block" aria-hidden="true" />
          {content.timelineSteps.map((step, index) => (
            <li key={step.title} className="relative">
              {index < content.timelineSteps.length - 1 ? <div className="absolute -right-3 top-[1.72rem] z-10 hidden h-5 w-5 rotate-45 border-r border-t border-cyan-300/50 md:block" aria-hidden="true" /> : null}
              <article className="relative h-full rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-xs font-semibold text-cyan-200">{step.marker}</div>
                <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-xs leading-5 text-slate-400">{step.text}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

function StoryEngine({ content }: { content: StoryContent }) {
  return (
    <Section id="how-it-works" section={content.platform}>
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <Paragraphs body={content.platform.body} />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {content.proofPoints.map((point) => (
              <div key={point.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-lg font-semibold text-cyan-100">{point.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{point.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/[0.03] p-6">
          <div className="grid gap-4">
            {content.graphEvidence.map((item, index) => (
              <div key={item.title} className="flex gap-4 rounded-2xl border border-white/10 bg-[#07102b] p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-xs font-semibold text-cyan-200">0{index + 1}</div>
                <div>
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function StoryProducts({ content }: { content: StoryContent }) {
  return (
    <Section section={content.delivery}>
      <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
        <Paragraphs body={content.delivery.body} />
        <CardGrid items={content.deliveryCards} columns="md:grid-cols-3" />
      </div>
    </Section>
  );
}

function StoryProof({ content }: { content: StoryContent }) {
  return (
    <Section section={content.applicationsSection}>
      <CardGrid items={content.applications} columns="md:grid-cols-3" />
    </Section>
  );
}

function StoryAudiences({ content }: { content: StoryContent }) {
  return (
    <Section section={content.partners}>
      <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
        <Paragraphs body={content.partners.body} />
        <CardGrid items={content.partnerAudiences} columns="md:grid-cols-2" />
      </div>
    </Section>
  );
}

function StoryReportCta({ content }: { content: StoryContent }) {
  return (
    <section id="free-report" className="relative border-t border-white/10 py-24 md:py-32">
      <Container>
        <div className="grid gap-10 rounded-[2rem] border border-cyan-300/20 bg-cyan-300/[0.04] p-6 md:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">{content.finalCta.kicker}</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">{content.finalCta.title}</h2>
            {content.finalCta.body?.[0] ? <p className="mt-6 text-lg leading-8 text-slate-300">{content.finalCta.body[0]}</p> : null}
            <div className="mt-8"><Button href={content.finalButton.href}>{content.finalButton.label}</Button></div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {["DNS posture", "Visible platforms", "Subdomain discovery", "External threats", "Recommendations", "Returnable report link"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-[#030619]/60 p-4 text-sm font-medium text-slate-100">{item}</div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function StoryObservatory() {
  return (
    <section className="relative border-t border-white/10 py-20 md:py-28">
      <Container>
        <div className="grid gap-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">Coming soon</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">Datazag Observatory</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">Explore aggregated internet infrastructure trends from Datazag's intelligence lake: domains, DNS, certificates, hosting, ASNs, platforms and impersonation patterns.</p>
          </div>
          <div className="rounded-[1.5rem] border border-cyan-300/20 bg-[#07102b] p-6">
            <div className="grid gap-3">
              {["Internet pulse", "Platform trends", "Certificate activity", "ASN movement", "Report builder"].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200"><span>{item}</span><span className="h-2 w-2 rounded-full bg-cyan-300" /></div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function StoryPage({ content }: { content?: Partial<StoryContent> | null }) {
  const c = mergeContent(content);
  return (
    <main className="relative overflow-hidden bg-[#030619] text-white">
      <StoryHero content={c} />
      <Section section={c.insight}><Paragraphs body={c.insight.body} /></Section>
      <StorySignals content={c} />
      <StoryTimeline content={c} />
      <StoryEngine content={c} />
      <StoryProducts content={c} />
      <StoryProof content={c} />
      <StoryAudiences content={c} />
      <StoryReportCta content={c} />
      <StoryObservatory />
    </main>
  );
}

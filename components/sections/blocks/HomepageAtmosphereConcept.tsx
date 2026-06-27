import React from "react";

import { Container } from "@/components/ui/Container";

type Card = {
  title: string;
  text: string;
};

type TimelineStep = Card & {
  marker: string;
};

type Cta = {
  label: string;
  href: string;
};

type CopySection = {
  kicker: string;
  title: string;
  body?: string[];
};

export type HomepageAtmosphereContent = {
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

const defaultContent: HomepageAtmosphereContent = {
  heroEyebrow: "Attack Infrastructure Intelligence Platform",
  heroTitle: "The internet never stands still.",
  heroIntro:
    "Every second, new domains appear, certificates are issued, DNS changes propagate, infrastructure comes online and networks evolve. Most of these changes are routine. Some are the earliest signs of attack campaigns beginning to form.",
  heroStatement:
    "Datazag continuously observes these changes and turns them into actionable intelligence before attacks become operational.",
  primaryCta: { label: "Get your free External Platform Threat Report", href: "/#free-report" },
  secondaryCta: { label: "See how Datazag works", href: "#how-it-works" },
  heroPills: ["Observe earlier", "Connect infrastructure", "Deliver intelligence"],
  insight: {
    kicker: "The insight",
    title: "Every attack changes the internet first.",
    body: [
      "Before attackers can launch phishing, credential theft, malware, fraud or impersonation campaigns, they must create infrastructure.",
      "Domains. Certificates. DNS. Hosting. Networks. Services. These changes leave evidence before the campaign reaches victims.",
    ],
  },
  signals: {
    kicker: "Observable internet signals",
    title: "The preparation phase is visible if you know where to look.",
  },
  platform: {
    kicker: "The platform",
    title: "From signal to intelligence in seconds.",
    body: [
      "Datazag treats every new observation as the start of an investigation. Each signal is correlated across 340M+ internet domains, enriched with internet telemetry and threat intelligence, then connected into a continuously evolving infrastructure graph.",
    ],
  },
  graph: {
    kicker: "The living graph",
    title: "Intelligence that evolves as the internet changes.",
    body: [
      "Attack infrastructure rarely appears all at once. As attackers register more domains, reuse hosting, change DNS, share certificates or activate services, the graph changes with them.",
      "What starts as an early signal can become a confirmed campaign as evidence accumulates.",
    ],
  },
  delivery: {
    kicker: "Delivery",
    title: "Intelligence where decisions are made.",
    body: [
      "Datazag is not another dashboard for analysts to monitor.",
      "The platform produces intelligence once and delivers it wherever your organisation already works.",
    ],
  },
  partners: {
    kicker: "Partner ecosystem",
    title: "Built for teams that protect others.",
    body: [
      "Partner audiences belong on this page, but as a concise proof of distribution and relevance rather than a full partner programme pitch.",
      "Dedicated MSSP, MDR and ESP pages can go deeper into packaging, commercial model and workflows.",
    ],
  },
  applicationsSection: {
    kicker: "Applications",
    title: "One intelligence engine. Many uses.",
  },
  finalCta: {
    kicker: "Your organisation",
    title: "What does the internet already reveal about your organisation?",
    body: [
      "Get a free External Platform Threat Report. We analyse your domain, identify the platforms your organisation relies on, assess your external infrastructure posture and show where emerging impersonation activity may already be forming.",
    ],
  },
  finalButton: { label: "Get your free report", href: "/#free-report" },
  internetSignals: [
    { title: "Domains appear", text: "New names, lookalikes and campaign assets surface before they are used." },
    { title: "Certificates are issued", text: "Public certificate activity exposes infrastructure preparation in near real time." },
    { title: "DNS changes", text: "Records, nameservers, MX and hosting relationships reveal intent and reuse." },
    { title: "Networks evolve", text: "Hosting, ASN, routing and threat intelligence add infrastructure context." },
  ],
  timelineSteps: [
    { marker: "01", title: "Infrastructure appears", text: "Domains, certificates, DNS and hosting begin to take shape." },
    { marker: "02", title: "Signals are observed", text: "The first observable changes become triggers for investigation." },
    { marker: "03", title: "Datazag investigates", text: "Signals are enriched, scored and correlated in seconds." },
    { marker: "04", title: "Campaigns emerge", text: "Related infrastructure clusters into higher-confidence intelligence." },
    { marker: "05", title: "Traditional detection", text: "Most controls see the threat once it reaches users or systems." },
  ],
  proofPoints: [
    { title: "5–10 seconds", text: "New infrastructure investigated within seconds of the first observable signal." },
    { title: "340M+ domains", text: "Every observation can be correlated against the Datazag domain corpus." },
    { title: "Hourly telemetry", text: "Internet network, DNS, infrastructure and threat telemetry refresh continuously." },
    { title: "Campaign clustering", text: "Infrastructure relationships turn isolated signals into campaign intelligence." },
  ],
  graphEvidence: [
    { title: "Shared infrastructure", text: "Domains, hosting, nameservers, certificates and routing relationships are connected." },
    { title: "Confidence builds", text: "Early amber signals can become high-priority campaigns as more evidence appears." },
    { title: "History matters", text: "New observations are interpreted against previous behaviour and infrastructure reuse." },
  ],
  deliveryCards: [
    { title: "Real-time Alerts", text: "Signals delivered into SIEM, SOAR, XDR, webhooks and APIs." },
    { title: "Health Reports", text: "Executive-ready intelligence on exposure, impersonation and infrastructure posture." },
    { title: "Cloud Data Shares", text: "Continuously updated datasets for Snowflake, Databricks, Azure and S3." },
    { title: "AI-ready Data", text: "Infrastructure intelligence for model training, feature engineering and risk scoring." },
    { title: "Partner Intelligence", text: "Embedded signals for MSSPs, MDRs, email platforms and security vendors." },
  ],
  partnerAudiences: [
    { title: "MSSPs and MDRs", text: "Add pre-operational infrastructure intelligence to managed detection, threat hunting and customer reporting." },
    { title: "Email and messaging platforms", text: "Use infrastructure relationships to improve link scoring, sender trust and platform impersonation defence." },
    { title: "Security vendors", text: "Enrich products with campaign context, explainable risk and infrastructure evidence." },
  ],
  applications: [
    { title: "Security operations", text: "Detect emerging attack infrastructure before campaigns become operational." },
    { title: "Threat intelligence and hunting", text: "Uncover related domains, infrastructure reuse and campaign clusters." },
    { title: "Email and messaging platforms", text: "Improve sender trust, link scoring, phishing detection and impersonation defence." },
    { title: "AI and machine learning", text: "Train models using continuously updated infrastructure intelligence and campaign relationships." },
    { title: "Cloud data teams", text: "Analyse attack infrastructure directly inside your existing data platform." },
    { title: "Partners and MSSPs", text: "Embed Datazag intelligence without building your own internet telemetry platform." },
  ],
};

function mergeContent(content?: Partial<HomepageAtmosphereContent> | null): HomepageAtmosphereContent {
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

function SignalField() {
  const nodes = [[6, 18, 2.8], [18, 30, 2.1], [31, 19, 2.4], [43, 42, 3.1], [59, 34, 2.2], [72, 18, 2.6], [88, 36, 2.4], [78, 62, 3.2], [52, 67, 2.5], [28, 72, 2.2], [12, 58, 1.8], [64, 78, 1.9], [91, 68, 1.7]];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(55,222,245,0.18),transparent_28%),radial-gradient(circle_at_78%_22%,rgba(86,168,245,0.14),transparent_30%),radial-gradient(circle_at_48%_78%,rgba(93,73,255,0.16),transparent_34%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
      <svg className="absolute inset-0 h-full w-full atmosphere-drift opacity-85" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="dz-concept-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#37DEF5" stopOpacity="0.08" />
            <stop offset="60%" stopColor="#56A8F5" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path d="M6 18 C18 30 23 17 31 19 S39 40 43 42 S55 34 59 34 S68 20 72 18 S82 34 88 36" fill="none" stroke="url(#dz-concept-line)" strokeWidth="0.35" />
        <path d="M12 58 C25 74 36 72 52 67 S68 62 78 62 S85 48 88 36" fill="none" stroke="url(#dz-concept-line)" strokeWidth="0.35" />
        <path d="M28 72 C42 82 55 78 64 78 S81 68 91 68" fill="none" stroke="url(#dz-concept-line)" strokeWidth="0.25" />
        {nodes.map(([cx, cy, r], index) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} className="atmosphere-pulse" style={{ animationDelay: `${index * 0.42}s` }} fill={index === 3 || index === 7 || index === 11 ? "#37DEF5" : "#56A8F5"} fillOpacity={index === 3 || index === 7 || index === 11 ? 0.8 : 0.38} />
        ))}
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#030619] to-transparent" />
    </div>
  );
}

function ConceptButton({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) {
  return (
    <a href={href} className={`inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-300/70 focus:ring-offset-2 focus:ring-offset-[#030619] ${secondary ? "border-white/15 bg-white/5 text-white hover:bg-white/10" : "border-cyan-300/50 bg-cyan-300 text-slate-950 hover:bg-cyan-200"}`}>
      {children}
    </a>
  );
}

function Section({ section, children }: { section: CopySection; children: React.ReactNode }) {
  return (
    <section className="relative border-t border-white/10 py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">{section.kicker}</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-5xl">{section.title}</h2>
          <div className="mt-8">{children}</div>
        </div>
      </Container>
    </section>
  );
}

function SignalWeatherPanel({ items }: { items: Card[] }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(55,222,245,0.14),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(139,92,246,0.12),transparent_30%)]" />
      <div className="relative grid gap-4 md:grid-cols-4">
        {items.map((signal, index) => (
          <article key={signal.title} className="rounded-2xl border border-white/10 bg-[#030619]/55 p-5 backdrop-blur">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/80">0{index + 1}</span>
              <span className="h-2 w-2 rounded-full bg-cyan-300 atmosphere-pulse" />
            </div>
            <h2 className="text-base font-semibold text-white">{signal.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">{signal.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function FlowTimeline({ items }: { items: TimelineStep[] }) {
  return (
    <ol className="relative grid gap-5 md:grid-cols-5 md:gap-4">
      <div className="pointer-events-none absolute left-[10%] right-[10%] top-[2.35rem] hidden h-px bg-gradient-to-r from-cyan-300/10 via-cyan-300/50 to-cyan-300/10 md:block" aria-hidden="true" />
      {items.map((step, index) => (
        <li key={step.title} className="relative">
          {index < items.length - 1 ? <div className="absolute -right-3 top-[1.72rem] z-10 hidden h-5 w-5 rotate-45 border-r border-t border-cyan-300/50 md:block" aria-hidden="true" /> : null}
          <article className="relative h-full rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-xs font-semibold text-cyan-200 shadow-lg shadow-cyan-950/30">{step.marker}</div>
            <h3 className="text-sm font-semibold text-white">{step.title}</h3>
            <p className="mt-3 text-xs leading-5 text-slate-400">{step.text}</p>
          </article>
        </li>
      ))}
    </ol>
  );
}

function GraphPanel() {
  return (
    <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/[0.03] p-4 shadow-2xl shadow-cyan-950/30 md:p-6">
      <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#07102b] p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_35%,rgba(55,222,245,0.12),transparent_28%),radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.1),transparent_30%)]" />
        <div className="relative flex items-center justify-between text-xs uppercase tracking-[0.22em] text-slate-400"><span>Investigation path</span><span>Confidence</span></div>
        <div className="relative mt-8 space-y-4">
          {["New certificate", "DNS relationship", "Shared hosting", "Threat feed match", "Campaign cluster"].map((item, index) => (
            <div key={item} className="flex items-center gap-4"><div className="h-3 w-3 rounded-full bg-cyan-300" style={{ opacity: 0.35 + index * 0.13 }} /><div className="h-px flex-1 bg-gradient-to-r from-cyan-300/50 to-transparent" /><span className="w-36 text-sm text-slate-300">{item}</span></div>
          ))}
        </div>
        <div className="relative mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="flex items-center justify-between gap-4"><div><p className="text-sm font-semibold text-white">Campaign confidence</p><p className="mt-1 text-xs text-slate-400">Evidence accumulates as infrastructure changes.</p></div><p className="text-2xl font-semibold text-cyan-200">82%</p></div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[82%] rounded-full bg-cyan-300" /></div>
        </div>
      </div>
    </div>
  );
}

function EvidenceConstellation() {
  const points = ["domain", "cert", "dns", "asn", "host", "feed"].map((label, index) => ({ label, x: ["12%", "34%", "54%", "78%", "28%", "62%"][index], y: ["32%", "18%", "38%", "24%", "70%", "72%"][index] }));
  return (
    <div className="relative min-h-[380px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(55,222,245,0.14),transparent_34%)]" />
      <svg className="absolute inset-0 h-full w-full opacity-80" aria-hidden="true"><line x1="12%" y1="32%" x2="34%" y2="18%" stroke="#37DEF5" strokeOpacity="0.2" /><line x1="34%" y1="18%" x2="54%" y2="38%" stroke="#37DEF5" strokeOpacity="0.28" /><line x1="54%" y1="38%" x2="78%" y2="24%" stroke="#37DEF5" strokeOpacity="0.2" /><line x1="54%" y1="38%" x2="62%" y2="72%" stroke="#37DEF5" strokeOpacity="0.3" /><line x1="28%" y1="70%" x2="62%" y2="72%" stroke="#37DEF5" strokeOpacity="0.18" /></svg>
      {points.map((point, index) => <div key={point.label} className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/30 bg-[#030619]/85 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100 shadow-lg shadow-cyan-950/40 backdrop-blur" style={{ left: point.x, top: point.y }}><span className="mr-2 inline-block h-2 w-2 rounded-full bg-cyan-300" style={{ opacity: 0.45 + index * 0.08 }} />{point.label}</div>)}
      <div className="absolute left-1/2 top-1/2 w-52 -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-cyan-300/25 bg-cyan-300/10 p-5 text-center backdrop-blur"><p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">campaign cluster</p><p className="mt-3 text-3xl font-semibold text-white">14</p><p className="mt-2 text-xs leading-5 text-slate-300">related infrastructure observations</p></div>
    </div>
  );
}

function DeliveryPipeline() {
  const destinations = ["SIEM", "SOAR", "API", "Data Share", "Partner Platform", "AI Models"];
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(55,222,245,0.12),transparent_36%)]" />
      <div className="relative grid gap-4 lg:grid-cols-[1fr_1.3fr_1fr] lg:items-center">
        <div className="grid gap-3 text-sm text-slate-300">{["Signals", "Telemetry", "Threat context"].map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-[#030619]/60 p-4">{item}</div>)}</div>
        <div className="relative rounded-[1.5rem] border border-cyan-300/20 bg-cyan-300/10 p-8 text-center"><p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">Datazag</p><p className="mt-4 text-3xl font-semibold text-white">One intelligence engine</p><p className="mt-4 text-sm leading-6 text-slate-300">Observe, correlate, score, cluster and deliver.</p></div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">{destinations.map((destination) => <div key={destination} className="rounded-2xl border border-white/10 bg-[#030619]/60 p-4 text-sm font-medium text-white">{destination}</div>)}</div>
      </div>
    </div>
  );
}

function Paragraphs({ body }: { body?: string[] }) {
  return <>{body?.map((paragraph) => <p key={paragraph} className="mt-5 text-lg leading-8 text-slate-300 first:mt-0">{paragraph}</p>)}</>;
}

function CardGrid({ items, columns = "md:grid-cols-2 lg:grid-cols-3" }: { items: Card[]; columns?: string }) {
  return <div className={`grid gap-4 ${columns}`}>{items.map((item) => <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"><h3 className="text-lg font-semibold text-white">{item.title}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{item.text}</p></article>)}</div>;
}

export default function HomepageAtmosphereConcept({ content }: { content?: Partial<HomepageAtmosphereContent> | null }) {
  const c = mergeContent(content);
  return (
    <main className="relative overflow-hidden bg-[#030619] text-white">
      <style>{`@keyframes atmosphere-drift { 0%, 100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(-1.2%,1%,0) scale(1.025); } } @keyframes atmosphere-pulse { 0%, 100% { opacity: .42; } 45% { opacity: .95; } } .atmosphere-drift { animation: atmosphere-drift 18s ease-in-out infinite; transform-origin: center; } .atmosphere-pulse { animation: atmosphere-pulse 7s ease-in-out infinite; } @media (prefers-reduced-motion: reduce) { .atmosphere-drift, .atmosphere-pulse { animation: none; } }`}</style>

      <section className="relative min-h-[92vh] overflow-hidden py-24 md:flex md:items-center md:py-32">
        <SignalField />
        <Container>
          <div className="relative max-w-4xl">
            <p className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">{c.heroEyebrow}</p>
            <h1 className="mt-8 text-5xl font-semibold tracking-tight text-white md:text-7xl lg:text-8xl">{c.heroTitle}</h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">{c.heroIntro}</p>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-white">{c.heroStatement}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row"><ConceptButton href={c.primaryCta.href}>{c.primaryCta.label}</ConceptButton><ConceptButton href={c.secondaryCta.href} secondary>{c.secondaryCta.label}</ConceptButton></div>
            <div className="mt-12 grid max-w-3xl gap-3 text-xs text-slate-300 sm:grid-cols-3">{c.heroPills.map((pill) => <div key={pill} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">{pill}</div>)}</div>
          </div>
        </Container>
      </section>

      <Section section={c.insight}><div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start"><div><Paragraphs body={c.insight.body} /></div><FlowTimeline items={c.timelineSteps} /></div></Section>

      <section className="relative border-t border-white/10 py-16 md:py-20"><Container><div className="mb-8 max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">{c.signals.kicker}</p><h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">{c.signals.title}</h2></div><SignalWeatherPanel items={c.internetSignals} /></Container></section>

      <Section section={c.platform}><div id="how-it-works" className="grid gap-10 lg:grid-cols-2 lg:items-center"><div><Paragraphs body={c.platform.body} /><div className="mt-8 grid gap-3 sm:grid-cols-2">{c.proofPoints.map((point) => <div key={point.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"><p className="text-lg font-semibold text-cyan-100">{point.title}</p><p className="mt-2 text-sm leading-6 text-slate-400">{point.text}</p></div>)}</div></div><GraphPanel /></div></Section>

      <Section section={c.graph}><div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center"><div><Paragraphs body={c.graph.body} /><div className="mt-8 grid gap-3">{c.graphEvidence.map((item) => <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"><h3 className="text-base font-semibold text-white">{item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p></article>)}</div></div><EvidenceConstellation /></div></Section>

      <Section section={c.delivery}><div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start"><div><Paragraphs body={c.delivery.body} /></div><DeliveryPipeline /></div><div className="mt-8"><CardGrid items={c.deliveryCards} columns="md:grid-cols-2 lg:grid-cols-5" /></div></Section>

      <Section section={c.partners}><div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start"><div><Paragraphs body={c.partners.body} /></div><CardGrid items={c.partnerAudiences} columns="md:grid-cols-3" /></div></Section>

      <Section section={c.applicationsSection}><CardGrid items={c.applications} /></Section>

      <section className="relative border-t border-white/10 py-24 md:py-32"><Container><div className="mx-auto max-w-3xl text-center"><p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">{c.finalCta.kicker}</p><h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">{c.finalCta.title}</h2>{c.finalCta.body?.[0] ? <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">{c.finalCta.body[0]}</p> : null}<div className="mt-10 flex justify-center"><ConceptButton href={c.finalButton.href}>{c.finalButton.label}</ConceptButton></div></div></Container></section>
    </main>
  );
}

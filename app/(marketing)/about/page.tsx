import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "About — Datazag",
  description:
    "Datazag builds infrastructure intelligence for external domain, DNS, certificate, hosting and provider risk, delivered through reports, alerts, APIs, datasets and partner services.",
};

const companyPrinciples = [
  {
    title: "External risk forms before the incident",
    text: "New domains, certificates, DNS changes, hosting choices and platform lures often appear before users see a finished phishing page or abuse campaign.",
  },
  {
    title: "Infrastructure context should be usable",
    text: "Signals are only useful when they are connected, explained and delivered into the workflow where a team can act on them.",
  },
  {
    title: "Evidence matters more than black boxes",
    text: "Scores and alerts should include reason codes, supporting context and de-escalation paths so teams can validate what they are seeing.",
  },
  {
    title: "Data should meet buyers where they work",
    text: "Some teams need reports. Others need alerts, APIs, webhooks, data shares, marketplace datasets or partner-delivered services.",
  },
];

const missionCards = [
  {
    title: "Mission",
    text: "Make suspicious external infrastructure visible, explainable and usable before it becomes a finished attack or a portfolio-wide blind spot.",
  },
  {
    title: "Vision",
    text: "External infrastructure risk should become a measurable intelligence layer that security, platform, partner and data teams can query and act on.",
  },
  {
    title: "Approach",
    text: "Connect domains, DNS, certificates, hosting, ASN, provider, platform and historical signals into evidence-led outputs.",
  },
];

const intelligenceLayer = [
  ["Domains", "Newly observed, suspicious, related and historical domain context. Domain intelligence is one part of the wider infrastructure layer."],
  ["DNS", "A, AAAA, MX, NS, TXT, email-authentication posture, provider footprints and change history."],
  ["Certificates", "Certificate Transparency observations, SAN expansion, issuer context and early discovery signals."],
  ["Infrastructure", "IP, ASN, prefix, hosting, cloud, CDN, provider and routing context for suspicious assets."],
  ["Platforms", "Signals around platform impersonation, login lures, supplier exposure and vendor-specific abuse patterns."],
  ["History", "Snapshots, deltas, first-seen, last-seen and lifecycle changes that show how infrastructure evolves."],
];

const deliveryModel = [
  {
    title: "Reports",
    text: "For teams that need an assessment of one domain, a portfolio, a client estate, a supplier group or an acquisition target.",
  },
  {
    title: "Alerts",
    text: "For operational workflows where suspicious platform, keyword or brand-impersonation infrastructure needs to be routed quickly.",
  },
  {
    title: "API and webhooks",
    text: "For products, portals, SIEM workflows, fraud systems and customer-facing tools that need enrichment or scoring on demand.",
  },
  {
    title: "Cloud data products",
    text: "For teams that want SQL-ready infrastructure intelligence inside a warehouse, lakehouse, marketplace or analytical environment.",
  },
  {
    title: "Partner services",
    text: "For MSSPs, MDRs, ESPs and platforms that want to package Datazag intelligence inside their own customer experience.",
  },
];

const whoFor = [
  ["Security teams", "Investigate suspicious external infrastructure, enrich alerts and explain why a domain, IP or provider relationship matters."],
  ["MSSPs and MDRs", "Add reports, alerting and evidence-led services without building the infrastructure intelligence layer from scratch."],
  ["ESPs and platforms", "Improve abuse, trust, link and customer-risk workflows with domain and infrastructure context."],
  ["Data buyers", "Consume curated datasets through cloud shares, marketplaces, APIs and sample schemas."],
  ["Portfolio owners", "Assess exposure across subsidiaries, suppliers, clients, parked domains and acquisition targets."],
];

const boundaries = [
  ["Not a takedown service", "Datazag provides detection, evidence packs and abuse contacts. Customers or authorised partners manage takedown requests and legal response."],
  ["Not uncontrolled raw-data resale", "Data products and partner rights are governed by product scope, permitted use and contractual boundaries."],
  ["Not a black-box score", "Risk outputs are designed to include reasons and supporting context so teams can validate, challenge or de-escalate findings."],
];

function SectionHeader({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
      {body ? <p className="mt-5 text-base leading-7 text-slate-300 md:text-lg md:leading-8">{body}</p> : null}
    </div>
  );
}

function AboutPanel() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-cyan-950/20">
      <div className="rounded-[1.5rem] border border-cyan-300/25 bg-cyan-300/[0.08] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/80">Company view</p>
        <h3 className="mt-3 text-2xl font-semibold text-white">External infrastructure is a risk layer.</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">Attackers leave traces in domains, certificates, DNS, hosting and provider relationships before a finished attack is visible to most teams.</p>
      </div>
      <div className="mx-auto h-8 w-px bg-cyan-300/30" />
      <div className="rounded-[1.5rem] border border-white/10 bg-[#050b22] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Datazag connects</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {["Domains", "DNS", "Certificates", "Hosting", "ASN", "Providers", "Platforms", "History"].map((item) => (
            <div key={item} className="rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 text-sm font-semibold text-slate-200">{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-[#030619] text-white">
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(55,222,245,0.16),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(139,92,246,0.13),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.82fr] lg:items-center lg:px-8">
          <div>
            <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/[0.1] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">About Datazag</p>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">We make external infrastructure risk visible before it reaches your users.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Datazag exists because many attacks are assembled in public before they are obvious: domains are registered, certificates are issued, DNS appears, hosting is selected and platform lures take shape.
            </p>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              We build Infrastructure Intelligence that connects those signals and turns them into evidence-led reports, alerts, APIs, cloud data products and partner services.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/#free-report" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Get a free report</a>
              <a href="/trust" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">View trust model</a>
            </div>
          </div>
          <AboutPanel />
        </div>
      </section>

      <section className="border-t border-white/10 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why we exist"
            title="Security teams can see many internal alerts. They often cannot see the infrastructure forming outside them."
            body="That external layer is where many phishing, impersonation, fraud and supplier-risk signals first appear. Datazag was built to make that layer visible, explainable and usable."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {missionCards.map((card) => (
              <article key={card.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <h2 className="text-xl font-semibold text-white">{card.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What we believe"
            title="External intelligence should be connected, inspectable and useful."
            body="Datazag is built around observable internet infrastructure and practical delivery formats, not generic threat-intelligence claims."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {companyPrinciples.map((principle) => (
              <article key={principle.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-lg font-semibold text-white">{principle.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{principle.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Infrastructure Intelligence"
            title="Domain intelligence is a subset of the wider infrastructure picture."
            body="The intelligence layer connects public internet signals so teams can understand relationships, risk and change rather than reviewing isolated indicators."
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            {intelligenceLayer.map(([title, text], index) => (
              <div key={title} className={`grid gap-3 p-5 md:grid-cols-[0.28fr_0.72fr] ${index > 0 ? "border-t border-white/10" : ""}`}>
                <h3 className="text-sm font-semibold text-white">{title}</h3>
                <p className="text-sm leading-6 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="How it reaches customers"
            title="The same intelligence layer supports different buying paths."
            body="About Datazag should explain the model, not repeat every product page. The common thread is infrastructure evidence delivered in the format the buyer can use."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {deliveryModel.map((item) => (
              <article key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Who it is for"
            title="Built for teams that need external-infrastructure context inside decisions."
            body="Datazag is designed for buyers who need intelligence inside investigations, customer services, products, partner offers and analytical environments."
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            {whoFor.map(([title, text], index) => (
              <div key={title} className={`grid gap-3 p-5 md:grid-cols-[0.28fr_0.72fr] ${index > 0 ? "border-t border-white/10" : ""}`}>
                <h3 className="text-sm font-semibold text-white">{title}</h3>
                <p className="text-sm leading-6 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Boundaries"
            title="Clear about what Datazag is and is not."
            body="The trust model matters. Datazag provides intelligence, evidence and controlled delivery routes; customers and partners keep control of their response and use rights."
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            {boundaries.map(([title, text], index) => (
              <div key={title} className={`grid gap-3 p-5 md:grid-cols-[0.28fr_0.72fr] ${index > 0 ? "border-t border-white/10" : ""}`}>
                <h3 className="text-sm font-semibold text-white">{title}</h3>
                <p className="text-sm leading-6 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <a href="/trust" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">View trust and governance</a>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Next step</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">Start with one domain or one workflow.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Use a free report to see the intelligence in context, or contact Datazag to discuss alerts, API access, cloud data products or partner services.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="/#free-report" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Get a free report</a>
            <a href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">Contact Datazag</a>
          </div>
        </div>
      </section>
    </main>
  );
}

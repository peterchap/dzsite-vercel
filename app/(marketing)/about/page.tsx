import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "About — Datazag",
  description:
    "Datazag builds predictive domain intelligence, alerting and cloud-native cyber datasets for security teams, platforms, MSSPs, ESPs and data buyers.",
};

const principles = [
  {
    title: "External-first intelligence",
    text: "Datazag focuses on what can be observed from the public internet: domains, DNS, certificates, hosting, routing, provider footprints and infrastructure relationships.",
  },
  {
    title: "Earlier signals",
    text: "The goal is to identify suspicious infrastructure before it becomes a finished phishing site, credential-harvesting page or impersonation campaign.",
  },
  {
    title: "Evidence-led outputs",
    text: "Reports, alerts, API responses and data products are designed to expose reasons, evidence and context rather than opaque scores alone.",
  },
  {
    title: "Cloud-native delivery",
    text: "Datazag is built for the way modern buyers consume intelligence: reports, APIs, webhooks, data shares, marketplace routes and partner services.",
  },
];

const products = [
  ["Reports", "Single-domain and portfolio reports that explain external threat exposure, DNS defence gaps and remediation priorities."],
  ["Alerts", "Operational alert streams for platform abuse, keyword-led suspicious infrastructure and brand impersonation."],
  ["Brand Protection", "Staged brand-impersonation alerts with incident updates, evidence packs, abuse contacts and de-escalation controls."],
  ["Infrastructure Intelligence", "Cloud-native datasets for domains, DNS, certificates, infrastructure, risk, relationships and history."],
  ["API", "Lookup, scoring and enrichment for portals, products, fraud workflows, SIEM processes and customer-facing tools."],
  ["Partner Services", "MSSP, MDR, ESP and platform partner routes for packaging Datazag intelligence inside managed services."],
];

const buyers = [
  {
    title: "Security teams",
    text: "Use Datazag to enrich alerts, find suspicious infrastructure earlier, and explain why an external signal deserves action.",
  },
  {
    title: "MSSPs and MDRs",
    text: "Package reports, alerts and evidence-led workflows into client-facing managed services without building the intelligence layer from scratch.",
  },
  {
    title: "ESPs and platforms",
    text: "Add domain, link, customer and infrastructure intelligence to abuse controls, trust products and premium customer services.",
  },
  {
    title: "Data buyers",
    text: "Consume curated cyber intelligence through cloud data shares, marketplace routes, sample schemas and SQL-ready datasets.",
  },
];

const whatMakesDifferent = [
  ["Predictive orientation", "Focus on the infrastructure forming before abuse is fully visible, not only the domains already listed elsewhere."],
  ["Infrastructure graph", "Connect domains, DNS, certificates, IPs, ASNs, providers, platforms and related assets into usable context."],
  ["Multiple delivery paths", "The same intelligence layer can power reports, alerts, APIs, data shares and partner-branded services."],
  ["Operational evidence", "Reason codes, evidence packs, abuse contacts, de-escalation and lifecycle updates make outputs easier to act on."],
];

const boundaries = [
  ["Not a takedown service", "Datazag provides detection, evidence and abuse contacts. Customers or authorised partners manage takedown requests and legal response."],
  ["Not uncontrolled raw-data resale", "Data products and partner rights are governed by product scope, permitted use and contractual boundaries."],
  ["Not a black-box score", "Risk outputs are designed to include reasons and supporting context so teams can validate or challenge the finding."],
];

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-xs font-semibold text-slate-300">{children}</span>;
}

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
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/80">What Datazag does</p>
        <h3 className="mt-3 text-2xl font-semibold text-white">Predictive domain intelligence for external infrastructure risk.</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">Datazag turns public internet signals into reports, alerts, APIs and datasets that help teams understand suspicious domain and infrastructure activity earlier.</p>
      </div>
      <div className="mx-auto h-8 w-px bg-cyan-300/30" />
      <div className="rounded-[1.5rem] border border-white/10 bg-[#050b22] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Intelligence surfaces</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {["Domains", "DNS", "Certificates", "Hosting", "ASN", "Platforms", "Risk", "History"].map((item) => (
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
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">We map the external infrastructure attackers use before the attack is obvious.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Datazag builds predictive domain intelligence for organisations that need to understand suspicious domains, impersonation infrastructure, provider exposure and internet-facing risk earlier.
            </p>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              The intelligence is delivered as reports, alerts, APIs, cloud-native datasets and partner-ready services for security teams, MSSPs, ESPs, platforms and data buyers.
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
            eyebrow="Operating principles"
            title="External signals, earlier context, evidence-led delivery."
            body="Datazag is built around observable internet infrastructure and practical delivery formats, not generic threat-intelligence claims."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle) => (
              <article key={principle.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <h2 className="text-lg font-semibold text-white">{principle.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">{principle.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Products"
            title="One intelligence layer, several ways to consume it."
            body="Different buyers need different outputs: an assessment, an alert, an enrichment response, a dataset or a partner-ready service."
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            {products.map(([title, text], index) => (
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
            eyebrow="Who uses Datazag"
            title="Built for teams that need usable external-infrastructure context."
            body="Datazag is designed for buyers who need intelligence inside decisions, workflows, customer services or analytical environments."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {buyers.map((buyer) => (
              <article key={buyer.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-xl font-semibold text-white">{buyer.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{buyer.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why it is different"
            title="From raw signals to operational evidence."
            body="The value is not just observing domains. It is connecting the signals, explaining the relationship and delivering the result in a usable form."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {whatMakesDifferent.map(([title, text]) => (
              <article key={title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{text}</p>
              </article>
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

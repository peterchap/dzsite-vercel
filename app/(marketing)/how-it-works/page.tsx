import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "How It Works — Datazag",
  description:
    "How Datazag turns domains, DNS, certificates, hosting, provider context and history into reports, alerts, APIs and cloud-native infrastructure intelligence.",
};

const processSteps = [
  {
    step: "01",
    title: "Observe external signals",
    text: "Datazag monitors public internet infrastructure signals such as newly observed domains, DNS, certificates, hosting, ASNs, provider footprints and platform patterns.",
    tags: ["Domains", "DNS", "Certificates", "Hosting", "ASN"],
  },
  {
    step: "02",
    title: "Connect the infrastructure",
    text: "Signals are joined into an infrastructure graph so domains, IPs, providers, certificates, platforms and related assets can be understood together.",
    tags: ["Relationships", "Shared infrastructure", "Provider context", "History"],
  },
  {
    step: "03",
    title: "Evaluate risk and context",
    text: "Datazag scores naming, DNS, infrastructure, website and historical evidence to decide whether a finding should be monitored, escalated or de-escalated.",
    tags: ["Risk", "Reason codes", "Confidence", "Triage"],
  },
  {
    step: "04",
    title: "Package evidence",
    text: "Findings are delivered with explainable evidence: reason codes, DNS state, provider context, screenshots, abuse contacts, related assets and lifecycle changes where available.",
    tags: ["Evidence", "Screenshots", "Abuse contacts", "Lifecycle"],
  },
  {
    step: "05",
    title: "Deliver into the workflow",
    text: "The same intelligence layer can become a report, an alert, an API response, a webhook event, a data share or a partner-branded service.",
    tags: ["Reports", "Alerts", "API", "Data shares"],
  },
  {
    step: "06",
    title: "Update and learn from feedback",
    text: "Incidents and datasets update as infrastructure changes. Customer context and de-escalation decisions help reduce noise and improve future routing.",
    tags: ["Polling", "Updates", "De-escalation", "Baselines"],
  },
];

const paths = [
  {
    title: "Report path",
    text: "For a domain, portfolio, supplier group or acquisition target, Datazag packages findings into a business-readable assessment with DNS, platform, infrastructure and remediation context.",
    href: "/reports",
    cta: "View reports",
  },
  {
    title: "Alert path",
    text: "For operational monitoring, Datazag opens and updates alerts as DNS, infrastructure, website evidence and customer decisions appear.",
    href: "/alerts",
    cta: "View alerts",
  },
  {
    title: "Brand protection path",
    text: "For owned brands, Datazag detects impersonation, supplies evidence packs and abuse contacts, and lets customers de-escalate legitimate partner sites.",
    href: "/brand-protection",
    cta: "View brand protection",
  },
  {
    title: "Data product path",
    text: "For analytics and data teams, Datazag publishes infrastructure intelligence as SQL-ready datasets, samples, private offers or cloud data shares.",
    href: "/infrastructure-intelligence",
    cta: "View datasets",
  },
];

const signalStages = [
  ["Naming signal", "A suspicious domain, subdomain, brand term, DGA-style pattern or entropy signal may be visible before DNS exists."],
  ["DNS signal", "When DNS appears, Datazag can score records, providers, mail posture, hosting and infrastructure context."],
  ["Website signal", "When a site appears, the incident can gain screenshot evidence, page analysis, brand-logo checks and policy-page capture where present."],
  ["Customer signal", "Customer-approved infrastructure, known-good partner sites and de-escalation decisions change how future findings are routed."],
];

const principles = [
  {
    title: "Outside-in first",
    text: "Datazag looks at the infrastructure visible from outside the organisation, where many impersonation and abuse signals start forming.",
  },
  {
    title: "Evidence over assertion",
    text: "Findings should show the reason, the observed infrastructure and the supporting context behind a score or alert.",
  },
  {
    title: "Workflow-aware delivery",
    text: "A SOC, MSSP, ESP, data buyer and executive report do not need the same output, even when they use the same intelligence layer.",
  },
  {
    title: "Customer control",
    text: "Customers and authorised partners control response decisions, takedown requests, de-escalation and permitted use boundaries.",
  },
];

const outputs = [
  ["Reports", "Readable assessments for domains, portfolios, suppliers and executive reviews."],
  ["Alerts", "Operational signals with reason codes, evidence and lifecycle updates."],
  ["API / webhooks", "Lookup, scoring and enrichment for products, portals and security workflows."],
  ["Cloud data products", "SQL-ready infrastructure intelligence for warehouses, lakehouses and marketplace routes."],
  ["Partner services", "Datazag-powered services delivered through MSSPs, ESPs, platforms and other authorised partners."],
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

function FlowPanel() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-cyan-950/20">
      <div className="rounded-[1.5rem] border border-cyan-300/25 bg-cyan-300/[0.08] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/80">Operating model</p>
        <h3 className="mt-3 text-2xl font-semibold text-white">Observe → connect → explain → deliver.</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">Datazag turns public infrastructure signals into evidence-led outputs that can be used by analysts, platforms, partners and data teams.</p>
      </div>
      <div className="mx-auto h-8 w-px bg-cyan-300/30" />
      <div className="rounded-[1.5rem] border border-white/10 bg-[#050b22] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Inputs and outputs</p>
        <div className="mt-4 grid gap-2">
          {["External signals", "Infrastructure graph", "Risk and reason codes", "Evidence pack", "Workflow delivery"].map((item) => (
            <div key={item} className="rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 text-sm font-semibold text-slate-200">{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <main className="overflow-hidden bg-[#030619] text-white">
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(55,222,245,0.16),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(139,92,246,0.13),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.82fr] lg:items-center lg:px-8">
          <div>
            <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/[0.1] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">How it works</p>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">From external signal to usable infrastructure intelligence.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Datazag observes public internet infrastructure, connects related signals, evaluates risk, packages evidence and delivers the result as reports, alerts, APIs or datasets.
            </p>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              The process is designed for teams that need earlier context without rebuilding a domain, DNS, certificate, hosting and provider intelligence layer themselves.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/#free-report" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Get a free report</a>
              <a href="#process" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">View the process</a>
            </div>
          </div>
          <FlowPanel />
        </div>
      </section>

      <section id="process" className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Process"
            title="Six steps from observation to action."
            body="The exact output depends on the product, but the same core intelligence layer supports reports, alerts, APIs, datasets and partner services."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {processSteps.map((step) => (
              <article key={step.step} className="flex min-h-[22rem] flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/70">{step.step}</span>
                  <span className="h-px flex-1 bg-white/10" />
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{step.text}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  {step.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Signal maturity"
            title="A finding can change as infrastructure appears."
            body="Suspicious infrastructure is not always complete when first seen. Datazag can watch the lifecycle from naming signal to DNS, website evidence and customer feedback."
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            {signalStages.map(([title, text], index) => (
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
            eyebrow="Delivery paths"
            title="The same intelligence layer, different outputs."
            body="A buyer does not have to consume the full data layer. Datazag can deliver the right slice for the workflow."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {paths.map((path) => (
              <article key={path.title} className="flex min-h-[17rem] flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-xl font-semibold text-white">{path.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{path.text}</p>
                <a href={path.href} className="mt-auto pt-5 text-sm font-semibold text-cyan-100 hover:text-white">{path.cta} →</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Principles"
            title="Designed to complement the security stack."
            body="Datazag is an external infrastructure layer. It helps existing security, fraud, platform and data workflows make better decisions."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {principles.map((principle) => (
              <article key={principle.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-xl font-semibold text-white">{principle.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{principle.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Outputs"
            title="What comes out of the engine."
            body="Datazag is not a single feed. The intelligence layer can be packaged in the form a customer, partner or data buyer can actually use."
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            {outputs.map(([title, text], index) => (
              <div key={title} className={`grid gap-3 p-5 md:grid-cols-[0.28fr_0.72fr] ${index > 0 ? "border-t border-white/10" : ""}`}>
                <h3 className="text-sm font-semibold text-white">{title}</h3>
                <p className="text-sm leading-6 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Next step</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">Start with the output you need.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Use a free report for a single-domain assessment, alerts for operational monitoring, the API for enrichment or cloud data products for analysis at scale.
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

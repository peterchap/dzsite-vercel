import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "MSSP Partners — Datazag",
  description:
    "Add infrastructure intelligence and early alerts to managed security services. Datazag helps MSSPs reduce analyst workload and launch partner-branded services.",
};

const outcomes = [
  {
    title: "Reduce analyst workload",
    text: "Reasoned early alerts and infrastructure context help analysts triage faster and give automation enough evidence to act when confidence is high.",
  },
  {
    title: "Launch new services",
    text: "Add alert feeds, brand protection, portfolio monitoring, customer reports and SOC enrichment without building the intelligence layer yourself.",
  },
  {
    title: "Keep your brand",
    text: "Datazag works behind your service, portal, reports, alerts and commercial model. You own the client relationship.",
  },
  {
    title: "Integrate into your stack",
    text: "Use alerts, API, webhooks, reports, exports or cloud data shares depending on how your operations and customers already work.",
  },
];

const serviceCatalogue = [
  {
    title: "Early alert feed",
    sell: "Detect newly observed impersonation and high-risk infrastructure early enough to support blocks, triage and escalation.",
    powers: ["Platform matches", "Brand matches", "Certificates", "DNS changes", "Reason codes"],
  },
  {
    title: "Brand protection",
    sell: "Monitor client brands, platforms and high-risk keywords for early impersonation infrastructure.",
    powers: ["New domains", "Certificates", "DNS", "Hosting context", "Evidence packs"],
  },
  {
    title: "SOC enrichment",
    sell: "Add domain, DNS, ASN, provider and relationship context to cases, detections and investigation workflows.",
    powers: ["Domain risk", "ASN context", "Provider labels", "Related infrastructure", "Reason codes"],
  },
  {
    title: "Portfolio monitoring",
    sell: "Track risk, posture and infrastructure changes across client domains, subsidiaries, suppliers and brands.",
    powers: ["DNS posture", "Email posture", "Historical changes", "Platform exposure", "Risk trends"],
  },
  {
    title: "Client reporting",
    sell: "Create recurring security reports for account reviews, executive updates and remediation planning.",
    powers: ["Executive summaries", "Technical evidence", "Trend analysis", "Remediation queues", "White-label exports"],
  },
  {
    title: "Evidence packs",
    sell: "Give analysts and customers clear evidence for blocking, escalation, takedown and remediation decisions.",
    powers: ["Reason codes", "DNS evidence", "Certificate evidence", "Infrastructure links", "Confidence context"],
  },
  {
    title: "Customer portal intelligence",
    sell: "Embed Datazag intelligence inside your own portal, dashboards and customer-facing service views.",
    powers: ["API outputs", "Webhook events", "Data shares", "Client-scoped views", "Custom exports"],
  },
];

const flow = [
  { verb: "Observe", text: "Datazag monitors domains, DNS, certificates, routing and infrastructure changes." },
  { verb: "Enrich", text: "Signals are expanded with hosting, ASN, platform, relationship and historical context." },
  { verb: "Explain", text: "Outputs include reason codes, evidence and confidence so alerts and decisions are easier to trust." },
  { verb: "Deliver", text: "You receive alerts, API responses, webhook events, reports or data shares through the route that fits your service model." },
  { verb: "Monetise", text: "You package it as your managed alerting, reporting, enrichment, portal or detection workflow." },
];

const roleSplit = [
  ["Client relationship", "Partner owns", "Datazag supports behind the scenes"],
  ["Commercial packaging", "Partner defines offer, pricing and SLA", "Datazag supplies intelligence and delivery options"],
  ["Internet-scale collection", "Partner avoids building this", "Datazag observes and enriches the infrastructure graph"],
  ["Reports and portal", "Partner brands the experience", "Datazag powers findings, alerts, evidence and data exports"],
  ["Operational workflows", "Partner controls triage, blocking and escalation", "Datazag supplies early alerts, signals, reasons and context"],
];

const commercialModel = [
  {
    title: "Partner owns pricing",
    text: "You decide how the service is packaged, bundled, marked up and sold to clients. Datazag does not set your end-customer price.",
  },
  {
    title: "Datazag is the wholesale layer",
    text: "We price the intelligence layer by scope: client estate, domains, brands, data volume, delivery route, white-label needs and SLA.",
  },
  {
    title: "Designed for service margin",
    text: "Partner terms are designed to leave room for meaningful managed-service margin without publishing a fixed discount or margin percentage.",
  },
  {
    title: "No channel conflict by design",
    text: "For partner-led accounts, the client relationship stays with the MSSP. Datazag is infrastructure behind your managed service, not a competing front-end service.",
  },
];

const marginLevers = [
  ["Attach to existing clients", "Add alerting, brand protection, reporting or enrichment to accounts you already serve."],
  ["Use one intelligence layer", "Reuse the same data across alerts, reports, portal features and SOC enrichment."],
  ["Reduce analyst effort", "Reasoned outputs reduce manual investigation time and make automation easier to trust."],
  ["Package premium services", "Sell evidence, monitoring, remediation, alerts and reporting rather than raw data access."],
];

const usageRights = [
  ["Included", "Use Datazag intelligence to power partner-led managed services, reports, alerts, enrichment workflows and portal features for your own end clients."],
  ["Not standalone resale", "Raw data, API access, data shares or bulk exports are not for resale, sublicensing, marketplace publication or standalone redistribution by default."],
  ["Downstream partners", "Services sold through your own resellers, franchisees or channel partners require written approval, pass-through terms and a separate commercial model."],
];

const delivery = [
  {
    title: "Alerts",
    text: "Reasoned early alerts for impersonation infrastructure, suspicious certificates, risky DNS changes and high-confidence block candidates.",
  },
  {
    title: "API",
    text: "Real-time enrichment for portals, case management, scoring, customer products and AI-assisted workflows.",
  },
  {
    title: "Webhooks",
    text: "Push important changes and early signals into your existing alerting, ticketing or automation flows.",
  },
  {
    title: "Reports and exports",
    text: "Generate white-label evidence packs, account-review material and recurring client-facing reports.",
  },
  {
    title: "Cloud data shares",
    text: "Use Iceberg or Delta datasets for partner analytics, hunting, client-scoped views and large-scale enrichment.",
  },
];

const pilotSteps = [
  {
    title: "Select a cohort",
    text: "Choose a small group of clients, brands, domains or use cases where external infrastructure intelligence should create visible value.",
  },
  {
    title: "Connect delivery",
    text: "Start with alerts, reports, API, webhook events or a sample data view depending on how your team wants to evaluate.",
  },
  {
    title: "Validate the findings",
    text: "Review alert quality, evidence, triage fit, false-positive handling and the reporting value for your client base.",
  },
  {
    title: "Package the service",
    text: "Decide whether the first commercial motion is early alerts, enrichment, reports, brand protection or portfolio monitoring.",
  },
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

function PartnerStackPanel() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-cyan-950/20">
      <div className="rounded-[1.5rem] border border-cyan-300/25 bg-cyan-300/[0.08] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/80">Your managed service</p>
        <h3 className="mt-3 text-2xl font-semibold text-white">Partner-branded offer</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">Reports, alerts, portals, remediation workflows and account-review material delivered under your brand.</p>
      </div>
      <div className="mx-auto h-8 w-px bg-cyan-300/30" />
      <div className="rounded-[1.5rem] border border-white/10 bg-[#050b22] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Powered by Datazag</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {["Domains", "DNS", "Certificates", "Infrastructure", "Relationships", "Alerts", "Evidence"].map((item) => (
            <div key={item} className="rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 text-sm font-semibold text-slate-200">{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MsspPartnersPage() {
  return (
    <main className="overflow-hidden bg-[#030619] text-white">
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(55,222,245,0.16),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(139,92,246,0.13),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.82fr] lg:items-center lg:px-8">
          <div>
            <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/[0.1] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">MSSP Partners</p>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">Add infrastructure intelligence to your managed security services.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Datazag gives MSSPs the domain, DNS, certificate, infrastructure and early alert layer behind managed detection, brand protection, portfolio monitoring and client reporting services.
            </p>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              Your brand owns the client relationship. Datazag powers the data, alerts, evidence and monitoring underneath.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Start a partner pilot</a>
              <a href="#services" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">Explore partner services</a>
            </div>
          </div>
          <PartnerStackPanel />
        </div>
      </section>

      <section className="border-t border-white/10 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Partner value"
            title="Reduce costs. Increase recurring revenue."
            body="The page story starts here: use Datazag to reduce the cost of operating security services, then package the same intelligence into new client-facing revenue lines."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {outcomes.map((outcome) => (
              <article key={outcome.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <h2 className="text-lg font-semibold text-white">{outcome.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">{outcome.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Partner service catalogue"
            title="Create services your clients already understand."
            body="Datazag is the intelligence layer. You decide how to package it: early alerts, managed detection, client reporting, remediation support, portal intelligence or a premium add-on to existing services."
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            {serviceCatalogue.map((service, index) => (
              <div key={service.title} className={`grid gap-5 p-5 md:grid-cols-[0.32fr_0.42fr_0.26fr] md:items-start ${index > 0 ? "border-t border-white/10" : ""}`}>
                <div>
                  <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                </div>
                <p className="text-sm leading-6 text-slate-300">{service.sell}</p>
                <div className="flex flex-wrap gap-2">
                  {service.powers.map((item) => <Tag key={item}>{item}</Tag>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="How Datazag fits"
            title="Your service in front. Our intelligence behind it."
            body="The partner model is deliberately simple: you own the client, packaging and operational decisions; Datazag supplies the external intelligence layer, early alerts and delivery routes."
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            <div className="hidden grid-cols-[0.28fr_0.36fr_0.36fr] border-b border-white/10 bg-white/[0.035] px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/70 md:grid">
              <div>Area</div>
              <div>Partner</div>
              <div>Datazag</div>
            </div>
            {roleSplit.map(([area, partner, datazag]) => (
              <div key={area} className="grid gap-3 border-b border-white/10 px-5 py-5 last:border-b-0 md:grid-cols-[0.28fr_0.36fr_0.36fr] md:items-start">
                <div className="text-sm font-semibold text-white">{area}</div>
                <div className="text-sm leading-6 text-slate-400">{partner}</div>
                <div className="text-sm leading-6 text-slate-300">{datazag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Commercial model"
            title="Built for partner margin, not channel conflict."
            body="Datazag's perspective is that the MSSP should own the customer relationship, commercial packaging and service margin. We provide the intelligence infrastructure as a predictable wholesale layer behind your offer."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {commercialModel.map((item) => (
              <article key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{item.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="rounded-[2rem] border border-cyan-300/25 bg-cyan-300/[0.075] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/80">Margin principle</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">Partner price minus Datazag platform cost equals the service margin you control.</h3>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                We do not publish a fixed partner margin because it depends on how the service is packaged: managed detection, reporting, remediation, portal intelligence, data enrichment or a premium add-on. The goal is to make Datazag a predictable input cost so the partner can build repeatable recurring revenue around it. Specific discounts and margin targets are discussed privately as part of the partner agreement.
              </p>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
              {marginLevers.map(([title, text], index) => (
                <div key={title} className={`grid gap-3 p-5 md:grid-cols-[0.35fr_0.65fr] ${index > 0 ? "border-t border-white/10" : ""}`}>
                  <h3 className="text-sm font-semibold text-white">{title}</h3>
                  <p className="text-sm leading-6 text-slate-400">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            <div className="grid gap-5 border-b border-white/10 bg-white/[0.025] p-5 lg:grid-cols-[0.36fr_0.64fr] lg:items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/70">Usage rights</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">Built for services, not raw data resale.</h3>
              </div>
              <p className="text-sm leading-6 text-slate-300">
                The principle is simple: partners can package Datazag intelligence into their own managed services; Datazag data itself remains a licensed intelligence layer. Detailed terms sit in the partner agreement.
              </p>
            </div>
            {usageRights.map(([title, text], index) => (
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
            eyebrow="Operating model"
            title="From internet observations to partner revenue."
            body="Datazag collects and explains the infrastructure signal. MSSPs convert that signal into alerts, services, decisions and recurring customer value."
          />
          <div className="mt-12 rounded-[2rem] border border-white/10 bg-[#07102b]/80 p-5 md:p-7">
            <div className="grid gap-3 lg:grid-cols-5">
              {flow.map((step, index) => (
                <article key={step.verb} className="relative rounded-2xl border border-white/10 bg-[#030619]/70 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] text-xs font-semibold text-cyan-100">{index + 1}</span>
                    {index < flow.length - 1 ? <span className="hidden text-cyan-200/40 lg:block">→</span> : null}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{step.verb}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Delivery"
            title="Use the route that fits your service model."
            body="The same intelligence layer can support alerts, analyst workflows, customer portals, managed reports, automated enrichment and data-driven partner products."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {delivery.map((item) => (
              <article key={item.title} className="flex min-h-[16rem] flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
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
            eyebrow="Pilot path"
            title="Start with a small cohort, then package the service."
            body="A partner pilot should prove signal quality, operational fit and commercial packaging before scaling across the client base."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {pilotSteps.map((step, index) => (
              <article key={step.title} className="rounded-[1.5rem] border border-cyan-300/25 bg-cyan-300/[0.075] p-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-xs font-semibold text-cyan-100">{index + 1}</span>
                <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Next step</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">Build the partner offer around your clients.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Start with a client cohort, validate the intelligence, then decide whether the first commercial motion is early alerts, SOC enrichment, brand protection, reporting or portfolio monitoring.
          </p>
          <div className="mt-10 flex justify-center">
            <a href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Start a partner pilot</a>
          </div>
        </div>
      </section>
    </main>
  );
}

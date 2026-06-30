import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "ESP Partners — Datazag",
  description:
    "Add domain, link and infrastructure intelligence to email platforms. Datazag helps ESPs detect abuse earlier, protect deliverability and launch partner-branded services.",
};

const outcomes = [
  {
    title: "Stop fast abuse",
    text: "Score signup domains, campaign links and landing pages before bad actors can burn sender reputation and disappear.",
  },
  {
    title: "Protect deliverability",
    text: "Give abuse, compliance and deliverability teams external context for the domains, links and infrastructure moving through the platform.",
  },
  {
    title: "Launch new services",
    text: "Add brand protection, customer hygiene reports, link-risk checks and deliverability intelligence as paid customer-facing offers.",
  },
  {
    title: "Embed into your workflow",
    text: "Use API, webhooks, reports, exports or cloud data shares across onboarding, pre-send checks, abuse review and analytics pipelines.",
  },
];

const serviceCatalogue = [
  {
    title: "Signup risk screening",
    sell: "Check customer domains, websites, DNS posture, email setup and infrastructure history before low-cost accounts can abuse the platform.",
    powers: ["Customer domains", "Website context", "DNS posture", "Hosting signals", "Risk reasons"],
  },
  {
    title: "Pre-send link checks",
    sell: "Score outbound links, landing pages, redirect chains and suspicious subdomains before or during campaign send.",
    powers: ["Campaign links", "Landing domains", "Redirect chains", "New domains", "Block candidates"],
  },
  {
    title: "Early abuse alerts",
    sell: "Surface risky domain, certificate, DNS and infrastructure changes that may indicate abuse before the campaign has fully developed.",
    powers: ["Early alerts", "Certificates", "DNS changes", "Infrastructure links", "Reason codes"],
  },
  {
    title: "SMTP log enrichment",
    sell: "Join send logs and campaign history with domain, DNS, infrastructure and risk intelligence for deeper abuse and deliverability analytics.",
    powers: ["Sending domains", "Recipient patterns", "Risk fields", "History", "Warehouse joins"],
  },
  {
    title: "Customer data hygiene",
    sell: "Identify suspicious, weak or low-quality customer data before it creates deliverability, fraud or platform-trust problems.",
    powers: ["List quality", "Domain quality", "Disposable signals", "DNS posture", "Remediation notes"],
  },
  {
    title: "Brand protection add-on",
    sell: "Offer customers monitoring for brand impersonation, suspicious domains and evidence packs under your own product experience.",
    powers: ["Customer brands", "Impersonation alerts", "Evidence packs", "Abuse contacts", "Reports"],
  },
  {
    title: "Deliverability intelligence",
    sell: "Give deliverability and customer-success teams better context for risk, reputation, customer behaviour and domain posture.",
    powers: ["Domain posture", "Infrastructure risk", "Trend analysis", "Customer reports", "Account reviews"],
  },
];

const flow = [
  { verb: "Screen", text: "Check customer domains, websites, DNS and infrastructure during signup, onboarding or tier upgrades." },
  { verb: "Score", text: "Evaluate campaign links, landing pages, redirect chains and sending domains before or during send." },
  { verb: "Decide", text: "Feed risk, reason codes and confidence into allow, warn, throttle, block or review workflows." },
  { verb: "Analyse", text: "Enrich SMTP logs, campaign history and abuse queues with domain and infrastructure intelligence." },
  { verb: "Monetise", text: "Package the same intelligence as hygiene, protection, reporting or deliverability services." },
];

const roleSplit = [
  ["Customer relationship", "ESP owns the customer experience", "Datazag supports behind the scenes"],
  ["Policy and enforcement", "ESP controls thresholds, review, throttling and blocking", "Datazag supplies risk, reasons and context"],
  ["External intelligence", "ESP avoids building internet-scale collection", "Datazag observes domains, DNS, certificates and infrastructure"],
  ["Customer products", "ESP brands the dashboard, reports and add-ons", "Datazag powers findings, alerts and evidence"],
  ["Analytics workflows", "ESP owns data model, warehouse and operational decisions", "Datazag supplies API, webhook, report and data-share delivery"],
];

const commercialModel = [
  {
    title: "Partner owns packaging",
    text: "You decide whether the intelligence is used for internal controls, premium customer features, managed services or paid add-ons.",
  },
  {
    title: "Datazag is the platform layer",
    text: "The underlying intelligence is priced by scope: customer estate, domains, checks, data volume, delivery route, white-label needs and SLA.",
  },
  {
    title: "Designed for service margin",
    text: "Partner terms are designed to leave room for meaningful margin without publishing a fixed discount or margin percentage.",
  },
  {
    title: "No channel conflict by design",
    text: "For partner-led accounts, the customer relationship stays with the ESP. Datazag remains infrastructure behind the product experience.",
  },
];

const marginLevers = [
  ["Protect core sending", "Reduce abuse, support load and reputation damage that can erode the value of the platform."],
  ["Attach premium features", "Sell link-risk checks, customer hygiene, brand protection or deliverability intelligence to existing customers."],
  ["Reuse one intelligence layer", "Apply the same data across signup checks, pre-send scoring, alerts, reports and analytics."],
  ["Package trust services", "Sell evidence, monitoring, hygiene, reporting and remediation rather than raw data access."],
];

const usageRights = [
  ["Included", "Use Datazag intelligence to power partner-led platform controls, customer reports, alerts, enrichment workflows and portal features for your own customers."],
  ["Not standalone resale", "Raw data, API access, data shares or bulk exports are not for resale, sublicensing, marketplace publication or standalone redistribution by default."],
  ["Downstream partners", "Services sold through your own resellers, franchisees or channel partners require written approval, pass-through terms and a separate commercial model."],
];

const delivery = [
  {
    title: "API",
    text: "Real-time scoring and enrichment for signup checks, link scanning, customer portals, policy engines and review queues.",
  },
  {
    title: "Webhooks",
    text: "Push early alerts and infrastructure changes into abuse, compliance, deliverability or customer-success workflows.",
  },
  {
    title: "Reports and exports",
    text: "Generate white-label hygiene reports, brand-protection evidence packs and account-review material for customers.",
  },
  {
    title: "Cloud data shares",
    text: "Use Iceberg or Delta datasets for warehouse analytics, SMTP log enrichment, customer segmentation and large-scale joins.",
  },
  {
    title: "Managed alert feed",
    text: "Receive reasoned alerts for risky domains, suspicious certificates, infrastructure shifts and impersonation candidates.",
  },
];

const pilotSteps = [
  {
    title: "Select a workflow",
    text: "Choose signup risk, pre-send link checks, SMTP log enrichment, customer hygiene or brand protection as the first pilot motion.",
  },
  {
    title: "Connect sample data",
    text: "Start with a small set of customers, campaigns, links, sending domains or log samples so results are easy to validate.",
  },
  {
    title: "Validate decisions",
    text: "Review signal quality, false-positive handling, enforcement fit, analyst usefulness and customer-facing reporting value.",
  },
  {
    title: "Package the rollout",
    text: "Decide whether the production motion is internal control, premium add-on, customer report, branded service or analytics layer.",
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
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/80">Your email platform</p>
        <h3 className="mt-3 text-2xl font-semibold text-white">Controls, products and customer services</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">Signup screening, pre-send checks, abuse review, deliverability analytics and customer-facing reports delivered under your brand.</p>
      </div>
      <div className="mx-auto h-8 w-px bg-cyan-300/30" />
      <div className="rounded-[1.5rem] border border-white/10 bg-[#050b22] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Powered by Datazag</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {["Domains", "Links", "DNS", "Certificates", "Infrastructure", "Alerts", "Evidence", "Risk reasons"].map((item) => (
            <div key={item} className="rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 text-sm font-semibold text-slate-200">{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function EspPartnersPage() {
  return (
    <main className="overflow-hidden bg-[#030619] text-white">
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(55,222,245,0.16),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(139,92,246,0.13),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.82fr] lg:items-center lg:px-8">
          <div>
            <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/[0.1] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">ESP Partners</p>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">Add domain, link and infrastructure intelligence to your email platform.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Datazag helps Email Service Providers score signup domains, outbound links, landing pages and infrastructure before fast abuse damages sender reputation.
            </p>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              Keep the customer experience under your brand while Datazag powers the risk signals, alerts, evidence and enrichment underneath.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Start an ESP partner pilot</a>
              <a href="#services" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">Explore ESP services</a>
            </div>
          </div>
          <PartnerStackPanel />
        </div>
      </section>

      <section className="border-t border-white/10 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Partner value"
            title="Protect reputation. Create new customer value."
            body="Use Datazag to reduce the cost and speed of abuse detection, then package the same intelligence into customer-facing trust, hygiene and protection services."
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
            title="Create services around trust, abuse and deliverability."
            body="Choose the first commercial motion: signup screening, pre-send link checks, early abuse alerts, customer hygiene, deliverability intelligence or brand protection."
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
            title="Your platform in front. Our intelligence behind it."
            body="You own the customer, policy and enforcement decisions. Datazag supplies external domain, link, DNS, certificate and infrastructure intelligence through the delivery route that fits your platform."
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
            body="The model is designed so the ESP owns the customer relationship, commercial packaging and product experience. Datazag provides the intelligence infrastructure as a predictable platform layer behind the offer."
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
                Partner economics depend on how the capability is packaged: internal abuse controls, premium link checks, hygiene reports, brand protection, deliverability analytics or customer-facing trust services. Datazag is designed as a predictable input cost so partners can build repeatable recurring revenue around it. Specific discounts and margin targets are handled privately in the partner agreement.
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
                <h3 className="mt-3 text-2xl font-semibold text-white">Built for platform services, not raw data resale.</h3>
              </div>
              <p className="text-sm leading-6 text-slate-300">
                Partners can package Datazag intelligence into their own platform controls, customer reports and managed services; Datazag data itself remains a licensed intelligence layer. Detailed terms are handled in the partner agreement.
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
            title="From signup and campaign activity to better decisions."
            body="Datazag collects and explains external infrastructure signals. ESPs convert those signals into controls, analytics, customer services and recurring value."
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
            title="Use the route that fits your platform."
            body="The same intelligence layer can support signup checks, pre-send scoring, alerting, customer portals, managed reports, log enrichment and data-driven products."
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
            title="Start with one workflow, then package the value."
            body="A partner pilot should prove signal quality, policy fit, operational value and commercial packaging before rollout across the customer base."
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
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">Build the ESP partner motion around your platform.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Start with one workflow, validate the intelligence, then decide whether the production motion is signup risk, pre-send link checks, abuse alerts, deliverability analytics or a customer-facing protection service.
          </p>
          <div className="mt-10 flex justify-center">
            <a href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Start an ESP partner pilot</a>
          </div>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Brand Protection — Datazag",
  description:
    "Brand protection incidents, updateable evidence packs, lifecycle tracking and response-ready reporting for impersonation infrastructure.",
};

const outcomes = [
  {
    title: "A live incident, not a static alert",
    text: "Each finding can become an updateable incident with status, evidence, lifecycle changes, recommended action and response history.",
  },
  {
    title: "Evidence ready for action",
    text: "Give security, legal, abuse, customer-success and partner teams the material they need for blocking, escalation and takedown support.",
  },
  {
    title: "Clear owner and next step",
    text: "Separate monitor, investigate, block, evidence-pack, takedown-support and de-escalation paths so teams know what to do next.",
  },
  {
    title: "Reports customers can understand",
    text: "Turn incident activity into executive summaries, client updates, portfolio views and remediation records.",
  },
];

const incidentFields = [
  ["Incident ID", "A persistent identifier for the finding, evidence and status history."],
  ["Classification", "Brand, platform, keyword or related-infrastructure incident class."],
  ["Current status", "New, monitoring, investigating, evidence captured, action requested, resolved or de-escalated."],
  ["Customer / brand", "The protected brand, subsidiary, client, product, executive, supplier or platform context."],
  ["Observed asset", "Domain, subdomain, IP, certificate, hosting provider, ASN and related infrastructure where available."],
  ["Reason codes", "The signals that explain why the incident escalated."],
  ["Evidence", "DNS, certificate, hosting, website, screenshot, redirect, abuse-contact and relationship context."],
  ["Recommended action", "Monitor, investigate, block, prepare evidence, contact abuse desk, request takedown support or de-escalate."],
];

const incidentJourney = [
  {
    status: "Detected",
    text: "A suspicious domain, certificate, DNS change, hosting pattern or related infrastructure signal is matched to a protected brand, platform or watchlist.",
  },
  {
    status: "Classified",
    text: "The finding is assigned an incident class and response path: monitor, investigate, block notice, evidence pack, takedown support or de-escalation.",
  },
  {
    status: "Enriched",
    text: "Datazag adds reason codes, infrastructure context, DNS state, certificate data, provider attribution, related assets and confidence context.",
  },
  {
    status: "Evidence captured",
    text: "Where relevant, the incident includes content state, screenshot or website presence, redirect behaviour, abuse contacts and supporting records.",
  },
  {
    status: "Action requested",
    text: "The incident can be routed into customer workflows, partner portals, SIEM, ticketing, abuse reporting or takedown-support workflows.",
  },
  {
    status: "Updated or resolved",
    text: "The incident remains updateable as DNS changes, hosting changes, content appears, related infrastructure is found, or the issue is resolved or de-escalated.",
  },
];

const deliveredObjects = [
  {
    title: "Incident record",
    text: "A structured record with current status, protected entity, observed asset, severity, classification, reason codes and next action.",
    tags: ["Status", "Severity", "Reason codes", "Next action"],
  },
  {
    title: "Evidence pack",
    text: "A response-ready bundle of DNS, certificate, hosting, website, screenshot, abuse-contact and relationship evidence where available.",
    tags: ["DNS", "Certificate", "Screenshot", "Abuse contacts"],
  },
  {
    title: "Lifecycle updates",
    text: "Updates when infrastructure activates, resolves, moves provider, gains content, redirects, links to related assets or is remediated.",
    tags: ["Activated", "Moved", "Content", "Resolved"],
  },
  {
    title: "Customer report",
    text: "A human-readable summary for internal stakeholders, clients, account teams or executives showing what happened and what changed.",
    tags: ["Summary", "Timeline", "Actions", "Outcome"],
  },
];

const incidentStates = [
  ["New", "First detected and awaiting routing or review."],
  ["Monitoring", "Low-confidence or early-stage infrastructure being watched for activation, DNS, hosting or content changes."],
  ["Investigating", "Analyst, customer or partner review is needed before action."],
  ["Block notice", "High-confidence infrastructure is suitable for block-list, SIEM, SOAR or customer-warning workflows."],
  ["Evidence pack", "Evidence is being packaged for abuse reporting, legal review, customer communication or takedown support."],
  ["Action requested", "The customer, partner, abuse desk or provider has been asked to take action."],
  ["Resolved", "The infrastructure is no longer active, has been remediated or has reached the agreed closure condition."],
  ["De-escalated", "The finding is accepted as known-good, irrelevant, duplicate or below action threshold."],
];

const deliveryRoutes = [
  {
    title: "Portal view",
    text: "A live incident list with status, evidence, timeline and customer-specific context.",
  },
  {
    title: "Webhook / API",
    text: "Structured incident events and updates for customer portals, ticketing, SIEM, SOAR and partner platforms.",
  },
  {
    title: "Evidence pack export",
    text: "A shareable bundle for abuse desks, takedown support, customer updates or internal review.",
  },
  {
    title: "Executive report",
    text: "Summary of incidents, status, response activity, open risk and recurring patterns.",
  },
  {
    title: "Partner-branded service",
    text: "MSSPs, ESPs and agencies can package incident monitoring and evidence updates under their own customer experience.",
  },
];

const useCases = [
  {
    title: "Corporate brand protection",
    text: "Track protected brands, products, executives, subsidiaries and customer-facing domains as updateable incidents.",
  },
  {
    title: "MSSP managed service",
    text: "Deliver client-facing incident monitoring, evidence packs, reporting and response coordination as a recurring service.",
  },
  {
    title: "ESP customer protection",
    text: "Offer customers brand and platform impersonation incident tracking as a premium trust and deliverability service.",
  },
  {
    title: "Portfolio and M&A review",
    text: "Monitor brand, domain and supplier exposure across subsidiaries, acquired assets, parked domains and legacy properties.",
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

function IncidentPanel() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-cyan-950/20">
      <div className="rounded-[1.5rem] border border-cyan-300/25 bg-cyan-300/[0.08] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/80">Example incident</p>
        <h3 className="mt-3 text-2xl font-semibold text-white">INC-1782384515-13ec9b</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">Platform risk escalated against a protected watchlist. Evidence pack open. Current status: Block notice.</p>
      </div>
      <div className="mx-auto h-8 w-px bg-cyan-300/30" />
      <div className="rounded-[1.5rem] border border-white/10 bg-[#050b22] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Incident contains</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {["Status", "Timeline", "Reason codes", "Evidence", "Hosting", "Screenshots", "Actions", "Updates"].map((item) => (
            <div key={item} className="rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 text-sm font-semibold text-slate-200">{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BrandProtectionPage() {
  return (
    <main className="overflow-hidden bg-[#030619] text-white">
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(55,222,245,0.16),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(139,92,246,0.13),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.82fr] lg:items-center lg:px-8">
          <div>
            <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/[0.1] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">Brand Protection</p>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">Turn impersonation signals into updateable incidents.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Datazag Brand Protection delivers more than an alert. Each relevant finding can become a live incident with status, evidence, lifecycle updates, response guidance and a reporting trail.
            </p>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              Use incidents to coordinate blocking, investigation, customer updates, evidence packs, abuse reporting, takedown support and de-escalation across internal or partner-led workflows.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Discuss brand protection</a>
              <a href="#incident-journey" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">View incident journey</a>
            </div>
          </div>
          <IncidentPanel />
        </div>
      </section>

      <section className="border-t border-white/10 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What gets delivered"
            title="Incident records, evidence packs and status updates."
            body="Alerts tell you something happened. Brand protection needs to show what it is, who owns it, what evidence exists, what action is recommended and how the incident changes over time."
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

      <section id="incident-journey" className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Incident journey"
            title="From suspicious infrastructure to an updateable case."
            body="The incident view gives teams a shared record that can evolve as the infrastructure changes, evidence appears or action is taken."
          />
          <div className="mt-12 rounded-[2rem] border border-white/10 bg-[#07102b]/80 p-5 md:p-7">
            <div className="grid gap-3 lg:grid-cols-6">
              {incidentJourney.map((step, index) => (
                <article key={step.status} className="relative rounded-2xl border border-white/10 bg-[#030619]/70 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] text-xs font-semibold text-cyan-100">{index + 1}</span>
                    {index < incidentJourney.length - 1 ? <span className="hidden text-cyan-200/40 lg:block">→</span> : null}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{step.status}</h3>
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
            eyebrow="Incident anatomy"
            title="What each incident can contain."
            body="The exact evidence depends on the finding, but the incident structure is designed to be useful to analysts, customers, partners and executives."
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            {incidentFields.map(([field, text], index) => (
              <div key={field} className={`grid gap-3 p-5 md:grid-cols-[0.28fr_0.72fr] ${index > 0 ? "border-t border-white/10" : ""}`}>
                <h3 className="text-sm font-semibold text-white">{field}</h3>
                <p className="text-sm leading-6 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Deliverables"
            title="Four outputs from one incident workflow."
            body="The same underlying detection can produce an operational incident, an evidence pack, lifecycle updates and customer-readable reporting."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {deliveredObjects.map((object) => (
              <article key={object.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-xl font-semibold text-white">{object.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{object.text}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {object.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Incident states"
            title="Status makes the journey understandable."
            body="A customer should be able to tell whether an incident is new, being watched, ready for action, under review, resolved or de-escalated."
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            {incidentStates.map(([state, text], index) => (
              <div key={state} className={`grid gap-3 p-5 md:grid-cols-[0.25fr_0.75fr] ${index > 0 ? "border-t border-white/10" : ""}`}>
                <h3 className="text-sm font-semibold text-white">{state}</h3>
                <p className="text-sm leading-6 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Delivery routes"
            title="Send incidents where the response happens."
            body="Brand protection can be consumed as a portal experience, webhook stream, evidence export, executive report or partner-branded service."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {deliveryRoutes.map((route) => (
              <article key={route.title} className="flex min-h-[15rem] flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-xl font-semibold text-white">{route.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{route.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Use cases"
            title="Designed for teams that need response, not just discovery."
            body="The incident model makes brand protection useful for internal teams, MSSPs, ESPs, agencies and portfolio owners."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {useCases.map((useCase) => (
              <article key={useCase.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-xl font-semibold text-white">{useCase.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{useCase.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Next step</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">Define the incident workflow around your brand estate.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Start with the brands, domains, platforms and suppliers you want monitored, then define which incident states, evidence packs and delivery routes fit your response model.
          </p>
          <div className="mt-10 flex justify-center">
            <a href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Discuss brand protection</a>
          </div>
        </div>
      </section>
    </main>
  );
}

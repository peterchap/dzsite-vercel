import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Brand Protection — Datazag",
  description:
    "Brand impersonation detection with updateable incidents, evidence packs, abuse contacts, de-escalation and customer-managed response workflows.",
};

const outcomes = [
  {
    title: "A live incident, not a static alert",
    text: "Each brand impersonation finding can become an updateable incident with status, evidence, lifecycle changes, recommended action and response history.",
  },
  {
    title: "Evidence ready for your team",
    text: "Datazag provides the evidence pack and abuse contacts so the organisation, partner or authorised provider can manage the response itself.",
  },
  {
    title: "Clear owner and next step",
    text: "Separate monitor, investigate, block, evidence-pack, abuse-contact and de-escalation paths so teams know what to do next.",
  },
  {
    title: "Reports customers can understand",
    text: "Turn incident activity into executive summaries, client updates, portfolio views and remediation records.",
  },
];

const incidentFields = [
  ["Incident ID", "A persistent identifier for the finding, evidence and status history."],
  ["Classification", "Brand impersonation, platform impersonation, keyword or related-infrastructure incident class."],
  ["Current status", "New, monitoring, investigating, evidence captured, action requested, resolved or de-escalated."],
  ["Customer / brand", "The protected brand, subsidiary, client, product, executive, supplier or platform context."],
  ["Observed asset", "Domain, subdomain, IP, certificate, hosting provider, ASN and related infrastructure where available."],
  ["Reason codes", "The signals that explain why the incident escalated."],
  ["Evidence", "DNS, certificate, hosting, website, screenshot, redirect, abuse-contact and relationship context."],
  ["Recommended action", "Monitor, investigate, block, prepare evidence, use supplied abuse contacts, or de-escalate if legitimate."],
];

const incidentJourney = [
  {
    status: "Detected",
    text: "A suspicious domain, certificate, DNS change, hosting pattern or related infrastructure signal is matched to a protected brand, platform or watchlist.",
  },
  {
    status: "Classified",
    text: "The finding is assigned an incident class and response path: monitor, investigate, block notice, evidence pack, abuse-contact workflow or de-escalation.",
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
    status: "Customer action",
    text: "Datazag is not the takedown service. The customer or authorised partner uses the evidence pack and abuse contacts to manage provider, registrar, legal or internal response.",
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
    title: "De-escalation control",
    text: "A clear route to mark legitimate partner sites, authorised campaigns, duplicates or known-good infrastructure so future noise is reduced.",
    tags: ["Legitimate", "Partner site", "Known-good", "Suppress"],
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
  ["Evidence pack", "Evidence and abuse contacts are being packaged so the organisation can manage its own provider, registrar or legal response."],
  ["Action requested", "The customer, authorised partner, abuse desk, registrar or provider has been asked to take action by the organisation managing the case."],
  ["Resolved", "The infrastructure is no longer active, has been remediated or has reached the agreed closure condition."],
  ["De-escalated", "The finding is accepted as a legitimate partner site, known-good campaign, irrelevant match, duplicate or below action threshold."],
];

const deEscalationReasons = [
  ["Legitimate partner site", "A supplier, agency, reseller, franchisee or fulfilment partner is authorised to use the brand or campaign domain."],
  ["Approved campaign", "The domain is part of an approved marketing, support, onboarding, payment or customer-success workflow."],
  ["Known-good infrastructure", "The asset belongs to the organisation, a trusted provider or a previously approved platform footprint."],
  ["Duplicate or irrelevant", "The finding duplicates an existing incident or matches a term that is not relevant to the protected brand."],
];

const deliveryRoutes = [
  {
    title: "Portal view",
    text: "A live incident list with status, evidence, timeline, de-escalation controls and customer-specific context.",
  },
  {
    title: "Webhook / API",
    text: "Structured incident events and updates for customer portals, ticketing, SIEM, SOAR and partner platforms.",
  },
  {
    title: "Evidence pack export",
    text: "A shareable bundle of evidence and abuse contacts for the organisation to use in provider, registrar, legal or internal response.",
  },
  {
    title: "Executive report",
    text: "Summary of incidents, status, response activity, open risk, de-escalated findings and recurring patterns.",
  },
  {
    title: "Partner-branded service",
    text: "MSSPs, ESPs and agencies can package incident monitoring, evidence updates and de-escalation workflows under their own customer experience.",
  },
];

const useCases = [
  {
    title: "Corporate brand protection",
    text: "Track protected brands, products, executives, subsidiaries and customer-facing domains as updateable incidents.",
  },
  {
    title: "MSSP managed service",
    text: "Deliver client-facing incident monitoring, evidence packs, abuse-contact support, reporting and response coordination as a recurring service.",
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
        <p className="mt-3 text-sm leading-6 text-slate-300">Brand impersonation detected. Evidence pack open. Abuse contacts supplied. Current status: Block notice.</p>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl border border-cyan-300/20 bg-[#030619]/60 px-4 py-3 text-sm font-semibold text-cyan-50">Prepare evidence pack</div>
          <div className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white">De-escalate legitimate site</div>
        </div>
      </div>
      <div className="mx-auto h-8 w-px bg-cyan-300/30" />
      <div className="rounded-[1.5rem] border border-white/10 bg-[#050b22] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Incident contains</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {["Status", "Timeline", "Reason codes", "Evidence", "Abuse contacts", "Screenshots", "Actions", "De-escalation"].map((item) => (
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
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">Detect brand impersonation and manage the incident journey.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Datazag Brand Protection detects brand impersonation and turns relevant findings into live incidents with status, evidence, lifecycle updates, response guidance and a reporting trail.
            </p>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              Datazag is not a takedown service. We provide the evidence pack, abuse contacts and incident updates so your organisation or authorised partner can manage blocking, abuse reporting, legal review, takedown requests and de-escalation.
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
            title="Incident records, evidence packs, abuse contacts and status updates."
            body="Alerts tell you something happened. Brand protection needs to show what it is, who owns it, what evidence exists, what action is recommended, how to de-escalate legitimate sites and how the incident changes over time."
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

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Service boundary"
            title="Detection and evidence, not outsourced takedown."
            body="Datazag identifies brand impersonation, maintains the incident record and supplies the evidence pack and abuse contacts. The organisation or its authorised partner remains in control of provider contact, legal decisions, takedown requests and customer communications."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
              <h3 className="text-xl font-semibold text-white">Datazag provides</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">Detection, incident record, reason codes, evidence pack, abuse contacts, lifecycle updates and reporting trail.</p>
            </article>
            <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
              <h3 className="text-xl font-semibold text-white">Customer manages</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">Blocking decisions, abuse desk contact, registrar/provider requests, legal review, takedown requests and customer communication.</p>
            </article>
            <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
              <h3 className="text-xl font-semibold text-white">Partners can package</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">MSSPs, ESPs and agencies can use Datazag evidence inside their own managed response or customer-facing service model.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="incident-journey" className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Incident journey"
            title="From suspicious infrastructure to an updateable case."
            body="The incident view gives teams a shared record that can evolve as the infrastructure changes, evidence appears, action is taken or a legitimate finding is de-escalated."
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
            eyebrow="De-escalation"
            title="Not every brand match is malicious."
            body="The de-escalate button is important. It lets the customer mark legitimate partner sites, approved campaigns and known-good infrastructure so future findings become cleaner."
          />
          <div className="mt-12 rounded-[2rem] border border-cyan-300/25 bg-cyan-300/[0.075] p-6 md:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/80">Incident control</p>
                <h3 className="mt-3 text-3xl font-semibold text-white md:text-4xl">De-escalate legitimate site</h3>
                <p className="mt-4 text-sm leading-6 text-slate-300 md:text-base">When a finding is an authorised partner, campaign or supplier site, the customer can de-escalate it instead of treating it as malicious. The reason is retained in the incident history.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {deEscalationReasons.map(([title, text]) => (
                  <div key={title} className="rounded-xl border border-cyan-300/20 bg-[#030619]/70 p-4">
                    <h4 className="text-sm font-semibold text-cyan-50">{title}</h4>
                    <p className="mt-2 text-xs leading-5 text-slate-400">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Deliverables"
            title="Five outputs from one incident workflow."
            body="The same underlying detection can produce an operational incident, an evidence pack, lifecycle updates, a de-escalation trail and customer-readable reporting."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
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
            body="A customer should be able to tell whether an incident is new, being watched, ready for action, under review, resolved or de-escalated as legitimate."
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
            Start with the brands, domains, platforms and suppliers you want monitored, then define which incident states, evidence packs, de-escalation rules and delivery routes fit your response model.
          </p>
          <div className="mt-10 flex justify-center">
            <a href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Discuss brand protection</a>
          </div>
        </div>
      </section>
    </main>
  );
}

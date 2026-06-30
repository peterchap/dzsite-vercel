import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Brand Protection — Datazag",
  description:
    "Brand impersonation detection with staged alerts, updateable incidents, evidence packs, abuse contacts, de-escalation and customer-managed response workflows.",
};

const outcomes = [
  {
    title: "Alert before DNS exists",
    text: "Datazag can raise an early brand-protection incident from DGA-style patterns, entropy and suspicious naming signals even before DNS records appear.",
  },
  {
    title: "Update as infrastructure appears",
    text: "If there are no DNS records, the incident stays under polling. When records appear, DNS and infrastructure are scored and the incident is updated.",
  },
  {
    title: "Evidence when a site appears",
    text: "Datazag keeps checking for a website, then adds screenshot, computer-vision logo checks and any detected T&Cs or privacy-policy evidence.",
  },
  {
    title: "De-escalate at any point",
    text: "Customers can mark legitimate partner sites, approved campaigns, known-good infrastructure or irrelevant findings without waiting for the incident to mature.",
  },
];

const alertStages = [
  {
    step: "1",
    title: "Pre-DNS alert",
    trigger: "Suspicious brand match, DGA-style pattern or high-entropy naming signal before DNS records exist.",
    delivered: "An early incident is opened with the observed domain, matched brand or watchlist, naming signals, classification and polling status.",
    status: "New / monitoring",
  },
  {
    step: "2",
    title: "DNS and infrastructure update",
    trigger: "DNS records appear after polling, or DNS changes expose hosting, mail, nameserver, IP, ASN or provider context.",
    delivered: "The incident is rescored using DNS and infrastructure context to rule the finding in or out, update severity and attach reason codes.",
    status: "Monitoring / investigating / block notice",
  },
  {
    step: "3",
    title: "Website and evidence-pack update",
    trigger: "A website appears, redirects activate or page content becomes available for capture and review.",
    delivered: "The incident is updated with screenshot evidence, computer-vision page analysis, brand-logo checks and T&Cs or privacy-policy capture where present.",
    status: "Evidence pack",
  },
  {
    step: "4",
    title: "Customer de-escalation",
    trigger: "The customer recognises the finding as legitimate, authorised, duplicate, irrelevant or known-good.",
    delivered: "The incident can be de-escalated at any point. The reason is retained so partner sites and approved campaigns reduce future noise.",
    status: "De-escalated",
  },
];

const incidentFields = [
  ["Incident ID", "A persistent identifier for the finding, evidence and status history."],
  ["Classification", "Brand impersonation, platform impersonation, keyword or related-infrastructure incident class."],
  ["Current status", "New, monitoring, investigating, evidence captured, action requested, resolved or de-escalated."],
  ["Customer / brand", "The protected brand, subsidiary, client, product, executive, supplier or platform context."],
  ["Observed asset", "Domain, subdomain, IP, certificate, hosting provider, ASN and related infrastructure where available."],
  ["Reason codes", "The signals that explain why the incident escalated, including naming, DNS, infrastructure, website and visual evidence."],
  ["Evidence", "DNS, certificate, hosting, website, screenshot, brand-logo check, redirect, abuse-contact and relationship context."],
  ["Recommended action", "Monitor, investigate, block, prepare evidence, use supplied abuse contacts, or de-escalate if legitimate."],
];

const deliveredObjects = [
  {
    title: "Incident record",
    text: "A structured record with current status, protected entity, observed asset, severity, classification, reason codes and next action.",
    tags: ["Status", "Severity", "Reason codes", "Next action"],
  },
  {
    title: "Evidence pack",
    text: "A response-ready bundle of DNS, certificate, hosting, website, screenshot, logo-check, abuse-contact and relationship evidence where available.",
    tags: ["DNS", "Certificate", "Screenshot", "Abuse contacts"],
  },
  {
    title: "Lifecycle updates",
    text: "Updates when DNS records appear, infrastructure activates, content appears, provider context changes or related assets are found.",
    tags: ["DNS", "Infrastructure", "Content", "Resolved"],
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
  ["New", "First detected before or after DNS exists and awaiting routing or review."],
  ["Polling", "No DNS records or no website yet. Datazag keeps checking for DNS, hosting, website and content changes."],
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

const serviceBoundary = [
  {
    title: "Datazag provides",
    text: "Detection, staged alerts, polling, incident updates, reason codes, evidence pack, abuse contacts, lifecycle updates and reporting trail.",
  },
  {
    title: "Customer manages",
    text: "Blocking decisions, abuse desk contact, registrar/provider requests, legal review, takedown requests and customer communication.",
  },
  {
    title: "Partners can package",
    text: "MSSPs, ESPs and agencies can use Datazag evidence inside their own managed response or customer-facing service model.",
  },
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
        <p className="mt-3 text-sm leading-6 text-slate-300">Brand impersonation detected before DNS. Polling active. Evidence pack will update when DNS and website evidence appears.</p>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl border border-cyan-300/20 bg-[#030619]/60 px-4 py-3 text-sm font-semibold text-cyan-50">Polling DNS + website</div>
          <div className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white">De-escalate any time</div>
        </div>
      </div>
      <div className="mx-auto h-8 w-px bg-cyan-300/30" />
      <div className="rounded-[1.5rem] border border-white/10 bg-[#050b22] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Incident contains</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {["Status", "Timeline", "DGA / entropy", "DNS score", "Infra score", "Screenshot", "Abuse contacts", "De-escalation"].map((item) => (
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
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">Detect brand impersonation and update the incident as evidence appears.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Datazag Brand Protection detects brand impersonation in stages: before DNS exists, when DNS and infrastructure appear, when a website becomes visible, and when the customer confirms or de-escalates the finding.
            </p>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              Datazag is not a takedown service. We provide staged alerts, the evidence pack, abuse contacts and incident updates so your organisation or authorised partner can manage blocking, abuse reporting, legal review, takedown requests and de-escalation.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Discuss brand protection</a>
              <a href="#alert-lifecycle" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">View alert lifecycle</a>
            </div>
          </div>
          <IncidentPanel />
        </div>
      </section>

      <section className="border-t border-white/10 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What gets delivered"
            title="Staged alerts, incident updates, evidence packs and de-escalation."
            body="Brand protection is not just one alert. Datazag opens and updates an incident as the infrastructure matures, evidence appears and the customer confirms whether the finding is malicious, legitimate or irrelevant."
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

      <section id="alert-lifecycle" className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Four alert stages"
            title="The incident updates as the attacker infrastructure matures."
            body="A domain may be suspicious before it resolves, then gain DNS, hosting and finally a website. Datazag keeps polling and updates the incident at each stage."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-4">
            {alertStages.map((stage) => (
              <article key={stage.step} className="flex min-h-[26rem] flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] text-sm font-semibold text-cyan-100">{stage.step}</span>
                  <h3 className="text-xl font-semibold text-white">{stage.title}</h3>
                </div>
                <div className="mt-5 border-t border-white/10 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/70">Trigger</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{stage.trigger}</p>
                </div>
                <div className="mt-5 border-t border-white/10 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/70">Delivered</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{stage.delivered}</p>
                </div>
                <p className="mt-auto border-t border-white/10 pt-4 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100/70">Status: {stage.status}</p>
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
            {serviceBoundary.map((item) => (
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
            eyebrow="Incident anatomy"
            title="What each incident can contain."
            body="The exact evidence depends on the maturity of the finding. A pre-DNS incident may contain naming evidence only; a mature incident may contain DNS, infrastructure, website, logo and policy-page evidence."
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
            title="The customer can de-escalate at any point."
            body="The de-escalate button is important. It lets the customer mark legitimate partner sites, approved campaigns and known-good infrastructure before or after DNS, website and evidence updates appear."
          />
          <div className="mt-12 rounded-[2rem] border border-cyan-300/25 bg-cyan-300/[0.075] p-6 md:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/80">Incident control</p>
                <h3 className="mt-3 text-3xl font-semibold text-white md:text-4xl">De-escalate legitimate site</h3>
                <p className="mt-4 text-sm leading-6 text-slate-300 md:text-base">When a finding is an authorised partner, campaign or supplier site, the customer can de-escalate it instead of treating it as malicious. The reason is retained in the incident history and can reduce future noise.</p>
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
            body="A customer should be able to tell whether an incident is pre-DNS, being polled, ready for action, under review, resolved or de-escalated as legitimate."
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

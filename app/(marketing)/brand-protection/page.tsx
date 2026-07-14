import type { Metadata } from "next";
import type React from "react";

import { copyCta, copyText, getCopyItem, getCopySection, type MarketingPageCopy, type MarketingCopySection } from "@/lib/marketing-copy";
import { sanityFetch } from "@/sanity/fetch";
import { marketingPageCopyBySlugQuery } from "@/sanity/marketingCopy";

export const metadata: Metadata = {
  title: "Brand Protection — Datazag",
  description:
    "Brand impersonation detection with staged alerts, updateable incidents, evidence packs, abuse contacts, de-escalation and customer-managed response workflows.",
};

const alertStages = [
  {
    key: "pre-dns",
    step: "1",
    title: "Pre-DNS alert",
    trigger: "Suspicious brand match, DGA-style pattern or high-entropy naming signal before DNS records exist.",
    delivered: "An early alert opens an incident with the observed domain, matched brand or watchlist, naming signals, classification and polling status.",
    status: "New / polling",
  },
  {
    key: "dns-infrastructure",
    step: "2",
    title: "DNS and infrastructure alert update",
    trigger: "DNS records appear after polling, or DNS changes expose hosting, mail, nameserver, IP, ASN or provider context.",
    delivered: "The incident is rescored using DNS and infrastructure context to rule the finding in or out, update severity and attach reason codes.",
    status: "Monitoring / investigating / block notice",
  },
  {
    key: "website-evidence",
    step: "3",
    title: "Website and evidence-pack alert update",
    trigger: "A website appears, redirects activate or page content becomes available for capture and review.",
    delivered: "The alert is updated with screenshot evidence, computer-vision page analysis, brand-logo checks and T&Cs or privacy-policy capture where present.",
    status: "Evidence pack",
  },
  {
    key: "customer-de-escalation",
    step: "4",
    title: "Customer de-escalation update",
    trigger: "The customer recognizes the finding as legitimate, authorized, duplicate, irrelevant or known-good.",
    delivered: "The incident can be de-escalated at any point. The reason is retained so partner sites and approved campaigns reduce future noise.",
    status: "De-escalated",
  },
];

const incidentFields = [
  { key: "incident-id", title: "Incident ID", text: "A persistent identifier for the finding, evidence and status history." },
  { key: "classification", title: "Classification", text: "Brand impersonation, platform impersonation, keyword or related-infrastructure incident class." },
  { key: "current-status", title: "Current status", text: "New, polling, monitoring, investigating, evidence pack, action requested, resolved or de-escalated." },
  { key: "customer-brand", title: "Customer / brand", text: "The protected brand, subsidiary, client, product, executive, supplier or platform context." },
  { key: "observed-asset", title: "Observed asset", text: "Domain, subdomain, IP, certificate, hosting provider, ASN and related infrastructure where available." },
  { key: "reason-codes", title: "Reason codes", text: "The signals that explain why the incident escalated, including naming, DNS, infrastructure, website and visual evidence." },
  { key: "evidence", title: "Evidence", text: "DNS, certificate, hosting, website, screenshot, brand-logo check, redirect, abuse-contact and relationship context." },
  { key: "recommended-action", title: "Recommended action", text: "Monitor, investigate, block, prepare evidence, use supplied abuse contacts, or de-escalate if legitimate." },
];

const deliveredObjects = [
  {
    key: "incident-record",
    title: "Incident record",
    text: "A structured alert record with current status, protected entity, observed asset, severity, classification, reason codes and next action.",
    tags: ["Status", "Severity", "Reason codes", "Next action"],
  },
  {
    key: "evidence-pack",
    title: "Evidence pack",
    text: "A response-ready bundle of DNS, certificate, hosting, website, screenshot, logo-check, abuse-contact and relationship evidence where available.",
    tags: ["DNS", "Certificate", "Screenshot", "Abuse contacts"],
  },
  {
    key: "lifecycle-updates",
    title: "Lifecycle updates",
    text: "Alert updates when DNS records appear, infrastructure activates, content appears, provider context changes or related assets are found.",
    tags: ["DNS", "Infrastructure", "Content", "Resolved"],
  },
  {
    key: "de-escalation-control",
    title: "De-escalation control",
    text: "A clear route to mark legitimate partner sites, authorized campaigns, duplicates or known-good infrastructure so future noise is reduced.",
    tags: ["Legitimate", "Partner site", "Known-good", "Suppress"],
  },
];

const incidentStates = [
  { key: "new", title: "New", text: "First detected before or after DNS exists and awaiting routing or review." },
  { key: "polling", title: "Polling", text: "No DNS records or no website yet. Datazag keeps checking for DNS, hosting, website and content changes." },
  { key: "monitoring", title: "Monitoring", text: "Low-confidence or early-stage infrastructure being watched for activation, DNS, hosting or content changes." },
  { key: "investigating", title: "Investigating", text: "Analyst, customer or partner review is needed before action." },
  { key: "block-notice", title: "Block notice", text: "High-confidence infrastructure is suitable for block-list, SIEM, SOAR or customer-warning workflows." },
  { key: "evidence-pack", title: "Evidence pack", text: "Evidence and abuse contacts are being packaged so the organization can manage its own provider, registrar or legal response." },
  { key: "action-requested", title: "Action requested", text: "The customer, authorized partner, abuse desk, registrar or provider has been asked to take action by the organization managing the case." },
  { key: "resolved", title: "Resolved", text: "The infrastructure is no longer active, has been remediated or has reached the agreed closure condition." },
  { key: "de-escalated", title: "De-escalated", text: "The finding is accepted as a legitimate partner site, known-good campaign, irrelevant match, duplicate or below action threshold." },
];

const deEscalationReasons = [
  { key: "legitimate-partner", title: "Legitimate partner site", text: "A supplier, agency, reseller, franchisee or fulfillment partner is authorized to use the brand or campaign domain." },
  { key: "approved-campaign", title: "Approved campaign", text: "The domain is part of an approved marketing, support, onboarding, payment or customer-success workflow." },
  { key: "known-good", title: "Known-good infrastructure", text: "The asset belongs to the organization, a trusted provider or a previously approved platform footprint." },
  { key: "duplicate-irrelevant", title: "Duplicate or irrelevant", text: "The finding duplicates an existing incident or matches a term that is not relevant to the protected brand." },
];

const serviceBoundary = [
  {
    key: "datazag-provides",
    title: "Datazag provides",
    text: "Detection, staged alerts, polling, incident updates, reason codes, evidence pack, abuse contacts and lifecycle updates.",
  },
  {
    key: "customer-manages",
    title: "Customer manages",
    text: "Blocking decisions, abuse desk contact, registrar/provider requests, legal review, takedown requests and customer communication.",
  },
  {
    key: "partners-package",
    title: "Partners can package",
    text: "MSSPs, ESPs and agencies can use Datazag alerts and evidence inside their own managed response or customer-facing service model.",
  },
];

const deliveryRoutes = [
  {
    key: "portal-alerts",
    title: "Portal alerts",
    text: "A live incident list with status, evidence, timeline, de-escalation controls and customer-specific context.",
  },
  {
    key: "webhook-api-alerts",
    title: "Webhook / API alerts",
    text: "Structured alert events and incident updates for customer portals, ticketing, SIEM, SOAR and partner platforms.",
  },
  {
    key: "evidence-pack-export",
    title: "Evidence pack export",
    text: "A shareable bundle of evidence and abuse contacts for the organization to use in provider, registrar, legal or internal response.",
  },
  {
    key: "partner-branded-alert-service",
    title: "Partner-branded alert service",
    text: "MSSPs, ESPs and agencies can package staged alerts, evidence updates and de-escalation workflows under their own customer experience.",
  },
];

const useCases = [
  {
    key: "corporate-brand-protection",
    title: "Corporate brand protection",
    text: "Track protected brands, products, executives, subsidiaries and customer-facing domains as updateable alert incidents.",
  },
  {
    key: "mssp-managed-service",
    title: "MSSP managed service",
    text: "Deliver client-facing staged alerts, evidence packs, abuse-contact support and response coordination as a recurring service.",
  },
  {
    key: "esp-customer-protection",
    title: "ESP customer protection",
    text: "Offer customers brand and platform impersonation alerting as a premium trust and deliverability service.",
  },
  {
    key: "portfolio-ma-review",
    title: "Portfolio and M&A review",
    text: "Monitor brand, domain and supplier exposure across subsidiaries, acquired assets, parked domains and legacy properties.",
  },
];

type CopyCard = { key: string; title: string; text: string; tags?: string[] };

function resolveCards<T extends CopyCard>(fallbacks: T[], section?: MarketingCopySection): T[] {
  return fallbacks.map((fallback) => {
    const item = getCopyItem(section, fallback.key);
    return {
      ...fallback,
      title: copyText(item?.title, fallback.title),
      text: copyText(item?.text, fallback.text),
      tags: item?.tags && item.tags.length > 0 ? item.tags : fallback.tags,
    };
  });
}

function resolveAlertStages(section?: MarketingCopySection) {
  return alertStages.map((fallback) => {
    const item = getCopyItem(section, fallback.key);
    return {
      ...fallback,
      title: copyText(item?.title, fallback.title),
      trigger: copyText(item?.trigger, fallback.trigger),
      delivered: copyText(item?.delivered, fallback.delivered),
      status: copyText(item?.status, fallback.status),
    };
  });
}

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
        <p className="mt-3 text-sm leading-6 text-slate-300">Brand impersonation detected before DNS. Polling active. The alert will update when DNS and website evidence appears.</p>
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

export default async function BrandProtectionPage() {
  const pageCopy = await sanityFetch<MarketingPageCopy>(marketingPageCopyBySlugQuery, { slug: "brand-protection" }, 300);

  const hero = getCopySection(pageCopy, "hero");
  const alertLifecycle = getCopySection(pageCopy, "alertLifecycle");
  const serviceBoundarySection = getCopySection(pageCopy, "serviceBoundary");
  const incidentAnatomy = getCopySection(pageCopy, "incidentAnatomy");
  const deEscalation = getCopySection(pageCopy, "deEscalation");
  const alertDeliverables = getCopySection(pageCopy, "alertDeliverables");
  const incidentStatesSection = getCopySection(pageCopy, "incidentStates");
  const deliveryRoutesSection = getCopySection(pageCopy, "deliveryRoutes");
  const useCasesSection = getCopySection(pageCopy, "useCases");
  const finalCta = getCopySection(pageCopy, "finalCta");

  const primaryCta = copyCta(hero?.primaryCta, { label: "Discuss brand protection", href: "/contact" });
  const secondaryCta = copyCta(hero?.secondaryCta, { label: "View alert lifecycle", href: "#alert-lifecycle" });
  const finalPrimaryCta = copyCta(finalCta?.primaryCta, { label: "Discuss brand protection", href: "/contact" });

  const resolvedAlertStages = resolveAlertStages(alertLifecycle);
  const resolvedServiceBoundary = resolveCards(serviceBoundary, serviceBoundarySection);
  const resolvedIncidentFields = resolveCards(incidentFields, incidentAnatomy);
  const resolvedDeEscalationReasons = resolveCards(deEscalationReasons, deEscalation);
  const resolvedDeliveredObjects = resolveCards(deliveredObjects, alertDeliverables);
  const resolvedIncidentStates = resolveCards(incidentStates, incidentStatesSection);
  const resolvedDeliveryRoutes = resolveCards(deliveryRoutes, deliveryRoutesSection);
  const resolvedUseCases = resolveCards(useCases, useCasesSection);

  return (
    <main className="overflow-hidden bg-[#030619] text-white">
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(55,222,245,0.16),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(139,92,246,0.13),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.82fr] lg:items-center lg:px-8">
          <div>
            <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/[0.1] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">{copyText(hero?.eyebrow, "Brand Protection")}</p>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">{copyText(hero?.title, "Detect brand impersonation and update the alert as evidence appears.")}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              {copyText(hero?.body, "Datazag Brand Protection detects brand impersonation in stages: before DNS exists, when DNS and infrastructure appear, when a website becomes visible, and when the customer confirms or de-escalates the finding.")}
            </p>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              {copyText(hero?.secondaryBody, "Datazag is not a takedown service. We provide staged alerts, the evidence pack, abuse contacts and incident updates so your organization or authorized partner can manage blocking, abuse reporting, legal review, takedown requests and de-escalation.")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={primaryCta.href} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">{primaryCta.label}</a>
              <a href={secondaryCta.href} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">{secondaryCta.label}</a>
            </div>
          </div>
          <IncidentPanel />
        </div>
      </section>

      <section id="alert-lifecycle" className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={copyText(alertLifecycle?.eyebrow, "What gets delivered")}
            title={copyText(alertLifecycle?.title, "Four alert updates from one brand-protection incident.")}
            body={copyText(alertLifecycle?.body, "Brand protection is not a separate report. Datazag opens and updates an alert incident as the infrastructure matures, evidence appears and the customer confirms whether the finding is malicious, legitimate or irrelevant.")}
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-4">
            {resolvedAlertStages.map((stage) => (
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
            eyebrow={copyText(serviceBoundarySection?.eyebrow, "Service boundary")}
            title={copyText(serviceBoundarySection?.title, "Detection and evidence, not outsourced takedown.")}
            body={copyText(serviceBoundarySection?.body, "Datazag identifies brand impersonation, maintains the incident record and supplies the evidence pack and abuse contacts. The organization or its authorized partner remains in control of provider contact, legal decisions, takedown requests and customer communications.")}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {resolvedServiceBoundary.map((item) => (
              <article key={item.key} className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
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
            eyebrow={copyText(incidentAnatomy?.eyebrow, "Incident anatomy")}
            title={copyText(incidentAnatomy?.title, "What each alert incident can contain.")}
            body={copyText(incidentAnatomy?.body, "The exact evidence depends on the maturity of the finding. A pre-DNS incident may contain naming evidence only; a mature incident may contain DNS, infrastructure, website, logo and policy-page evidence.")}
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            {resolvedIncidentFields.map((field, index) => (
              <div key={field.key} className={`grid gap-3 p-5 md:grid-cols-[0.28fr_0.72fr] ${index > 0 ? "border-t border-white/10" : ""}`}>
                <h3 className="text-sm font-semibold text-white">{field.title}</h3>
                <p className="text-sm leading-6 text-slate-400">{field.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={copyText(deEscalation?.eyebrow, "De-escalation")}
            title={copyText(deEscalation?.title, "The customer can de-escalate at any point.")}
            body={copyText(deEscalation?.body, "The de-escalate button is important. It lets the customer mark legitimate partner sites, approved campaigns and known-good infrastructure before or after DNS, website and evidence updates appear.")}
          />
          <div className="mt-12 rounded-[2rem] border border-cyan-300/25 bg-cyan-300/[0.075] p-6 md:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/80">Incident control</p>
                <h3 className="mt-3 text-3xl font-semibold text-white md:text-4xl">De-escalate legitimate site</h3>
                <p className="mt-4 text-sm leading-6 text-slate-300 md:text-base">When a finding is an authorized partner, campaign or supplier site, the customer can de-escalate it instead of treating it as malicious. The reason is retained in the incident history and can reduce future noise.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {resolvedDeEscalationReasons.map((item) => (
                  <div key={item.key} className="rounded-xl border border-cyan-300/20 bg-[#030619]/70 p-4">
                    <h4 className="text-sm font-semibold text-cyan-50">{item.title}</h4>
                    <p className="mt-2 text-xs leading-5 text-slate-400">{item.text}</p>
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
            eyebrow={copyText(alertDeliverables?.eyebrow, "Alert deliverables")}
            title={copyText(alertDeliverables?.title, "Four outputs from one alert workflow.")}
            body={copyText(alertDeliverables?.body, "The same underlying detection can produce an operational incident, an evidence pack, lifecycle updates and a de-escalation trail.")}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {resolvedDeliveredObjects.map((object) => (
              <article key={object.key} className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-xl font-semibold text-white">{object.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{object.text}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {object.tags?.map((tag) => <Tag key={tag}>{tag}</Tag>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={copyText(incidentStatesSection?.eyebrow, "Incident states")}
            title={copyText(incidentStatesSection?.title, "Status makes the alert journey understandable.")}
            body={copyText(incidentStatesSection?.body, "A customer should be able to tell whether an incident is pre-DNS, being polled, ready for action, under review, resolved or de-escalated as legitimate.")}
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            {resolvedIncidentStates.map((state, index) => (
              <div key={state.key} className={`grid gap-3 p-5 md:grid-cols-[0.25fr_0.75fr] ${index > 0 ? "border-t border-white/10" : ""}`}>
                <h3 className="text-sm font-semibold text-white">{state.title}</h3>
                <p className="text-sm leading-6 text-slate-400">{state.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={copyText(deliveryRoutesSection?.eyebrow, "Delivery routes")}
            title={copyText(deliveryRoutesSection?.title, "Send alerts where the response happens.")}
            body={copyText(deliveryRoutesSection?.body, "Brand protection can be consumed as portal alerts, webhook/API events, evidence-pack exports or partner-branded alert services.")}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {resolvedDeliveryRoutes.map((route) => (
              <article key={route.key} className="flex min-h-[15rem] flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
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
            eyebrow={copyText(useCasesSection?.eyebrow, "Use cases")}
            title={copyText(useCasesSection?.title, "Designed for teams that need response, not just discovery.")}
            body={copyText(useCasesSection?.body, "The incident model makes brand protection alerts useful for internal teams, MSSPs, ESPs, agencies and portfolio owners.")}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {resolvedUseCases.map((useCase) => (
              <article key={useCase.key} className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-xl font-semibold text-white">{useCase.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{useCase.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">{copyText(finalCta?.eyebrow, "Next step")}</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">{copyText(finalCta?.title, "Define the alert workflow around your brand estate.")}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            {copyText(finalCta?.body, "Start with the brands, domains, platforms and suppliers you want monitored, then define which alert states, evidence packs, de-escalation rules and delivery routes fit your response model.")}
          </p>
          <div className="mt-10 flex justify-center">
            <a href={finalPrimaryCta.href} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">{finalPrimaryCta.label}</a>
          </div>
        </div>
      </section>
    </main>
  );
}

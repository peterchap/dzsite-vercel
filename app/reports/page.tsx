import type { Metadata } from "next";
import type React from "react";

import {
  copyCta,
  copyText,
  getCopyItem,
  getCopySection,
  resolveCopyCards,
  pickItems,
  type MarketingPageCopy,
} from "@/lib/marketing-copy";
import { sanityFetch } from "@/sanity/fetch";
import { marketingPageCopyBySlugQuery } from "@/sanity/marketingCopy";
import { CurrencyText } from "@/components/ui/CurrencyText";
import { SLUG, content } from "./copy";

export const metadata: Metadata = {
  title: "Reports — Datazag",
  description:
    "Start free with the Domain Health Report on one domain. The Domain Risk Report gives the full single-domain assessment; the Cross-Estate Domain Risk Report finds the estate you actually own and the systemic risk across it.",
};

// CTA routing per the amended WU19/WU20 buying model: the Domain Risk Report
// is a direct card buy (WU16; renders "Contact us" until that flow ships) and
// the Cross-Estate report is NEVER a bare buy — its CTA is the WU20 scope flow.
// The flip is env-gated: set NEXT_PUBLIC_SCOPE_LIVE=true when WU20 deploys and
// the copy/link switch to "Scope my estate" → portal /scope with no code change;
// default (off) keeps the "Talk to us about your estate" contact fallback.
// NOTE: these CTAs carry go-live logic and are intentionally NOT CMS-editable.
const contactHref = "/contact";
const scopeLive = process.env.NEXT_PUBLIC_SCOPE_LIVE === "true";
const scopePortalUrl = process.env.NEXT_PUBLIC_SCOPE_URL || "https://portal.datazag.com/scope?src=reports";
const scopeEstateCta = scopeLive
    ? { label: "Scope my estate", href: scopePortalUrl }
    : { label: "Talk to us about your estate", href: contactHref };
// Domain Risk Report checkout (WU16) is env-gated the same way: when
// NEXT_PUBLIC_REPORTS_CHECKOUT_LIVE=true the CTA flips from "Contact us" to a
// direct buy on the portal; default keeps the WU17 contact fallback.
const checkoutLive = process.env.NEXT_PUBLIC_REPORTS_CHECKOUT_LIVE === "true";
const drrBuyUrl = process.env.NEXT_PUBLIC_DRR_BUY_URL || "https://portal.datazag.com/reports/buy?src=reports";
const domainRiskCta = checkoutLive
    ? { label: "Buy the Domain Risk Report", href: drrBuyUrl }
    : { label: "Contact us", href: contactHref };
const crossEstateSampleHref = "/samples/cross-estate-domain-risk-report.html";

// Structural / transactional metadata that stays in code (copy lives in copy.ts).
const tierAccent: Record<string, string> = {
  "tier-declared": "border-l-slate-400",
  "tier-strong": "border-l-emerald-400",
  "tier-possible": "border-l-amber-400",
  "tier-defensive": "border-l-cyan-400",
};

const sampleHref: Record<string, string> = {
  "sample-health": "/reports/sample#domain-health",
  "sample-cross-estate": crossEstateSampleHref,
};

const catalogueMeta: Record<string, { price?: string; cadence?: string; cta: { label: string; href: string }; secondaryCta?: { label: string; href: string } }> = {
  "free-health": { price: "Free", cta: { label: "Get your free report", href: "/#free-report" } },
  "domain-risk": { price: "From {{PRICE:49500}}", cadence: "per report", cta: domainRiskCta, secondaryCta: { label: "See pricing", href: "/pricing#reports" } },
  "cross-estate": { price: "Banded", cadence: "by domain count", cta: scopeEstateCta, secondaryCta: { label: "See the sample", href: crossEstateSampleHref } },
  "partner-branded": { price: "By agreement", cta: { label: "Talk to us", href: contactHref } },
};

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

function ReportStackPanel() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-cyan-950/20">
      <div className="rounded-[1.5rem] border border-cyan-300/25 bg-cyan-300/[0.08] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/80">Free single-domain report</p>
        <h3 className="mt-3 text-2xl font-semibold text-white">Threat exposure and DNS defense analysis</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">A practical report showing external threat context, DNS defense weaknesses and remediation priorities for one domain.</p>
      </div>
      <div className="mx-auto h-8 w-px bg-cyan-300/30" />
      <div className="rounded-[1.5rem] border border-white/10 bg-[#050b22] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">What it contains</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {["Threat exposure", "DNS records", "Email posture", "Platforms", "Vendors", "Certificates", "Infrastructure", "Remediation"].map((item) => (
            <div key={item} className="rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 text-sm font-semibold text-slate-200">{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnatomyColumn({ eyebrow, title, blocks }: { eyebrow: string; title: string; blocks: { title: string; sell: string; powers?: string[] }[] }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
      <div className="border-b border-white/10 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/70">{eyebrow}</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">{title}</h3>
      </div>
      {blocks.map((block, index) => (
        <div key={block.title} className={`p-5 ${index > 0 ? "border-t border-white/10" : ""}`}>
          <h4 className="text-lg font-semibold text-white">{block.title}</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">{block.sell}</p>
          {block.powers ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {block.powers.map((item) => <Tag key={item}>{item}</Tag>)}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default async function ReportsPage() {
  const pageCopy = await sanityFetch<MarketingPageCopy>(marketingPageCopyBySlugQuery, { slug: SLUG }, 300);

  const hero = getCopySection(pageCopy, "hero");
  const reportValue = getCopySection(pageCopy, "reportValue");
  const crossEstate = getCopySection(pageCopy, "crossEstate");
  const sampleReportsSection = getCopySection(pageCopy, "sampleReports");
  const anatomy = getCopySection(pageCopy, "anatomy");
  const catalogue = getCopySection(pageCopy, "catalogue");
  const sampleFindingsSection = getCopySection(pageCopy, "sampleFindings");
  const upgradePathsSection = getCopySection(pageCopy, "upgradePaths");
  const finalCta = getCopySection(pageCopy, "finalCta");

  const heroPrimaryCta = copyCta(hero?.primaryCta, content.hero.primaryCta!);
  const heroSecondaryCta = copyCta(hero?.secondaryCta, content.hero.secondaryCta!);
  const finalPrimaryCta = copyCta(finalCta?.primaryCta, content.finalCta.primaryCta!);

  const resolvedFreeReportValue = resolveCopyCards(content.reportValue.items!, reportValue);
  const resolvedCrossEstateValue = resolveCopyCards(content.crossEstate.items!.filter((i) => !i.key.startsWith("tier-")), crossEstate);
  const resolvedSampleFindings = resolveCopyCards(content.sampleFindings.items!, sampleFindingsSection);
  const resolvedUpgradePaths = resolveCopyCards(content.upgradePaths.items!, upgradePathsSection);

  const resolvedDiscoveryTiers = pickItems(content.crossEstate.items!.filter((i) => i.key.startsWith("tier-")), crossEstate).map((f) => {
    const item = getCopyItem(crossEstate, f.key);
    return { key: f.key, name: copyText(item?.title, f.title!), tag: copyText(item?.text, f.text!), accent: tierAccent[f.key] };
  });

  const resolvedSampleReports = pickItems(content.sampleReports.items!, sampleReportsSection).map((f) => {
    const item = getCopyItem(sampleReportsSection, f.key);
    return {
      key: f.key,
      href: sampleHref[f.key],
      title: copyText(item?.title, f.title!),
      text: copyText(item?.text, f.text!),
      sections: item?.tags && item.tags.length > 0 ? item.tags : f.tags!,
    };
  });

  const resolveAnatomyBlocks = (items: typeof content.anatomy.items) =>
    (items ?? []).map((f) => {
      const item = getCopyItem(anatomy, f.key);
      return {
        title: copyText(item?.title, f.title!),
        sell: copyText(item?.text, f.text!),
        powers: item?.tags && item.tags.length > 0 ? item.tags : f.tags,
      };
    });
  const domainReportAnatomy = resolveAnatomyBlocks(pickItems(content.anatomy.items!.filter((i) => i.key.startsWith("drr-")), anatomy));
  const crossEstateAnatomy = resolveAnatomyBlocks(pickItems(content.anatomy.items!.filter((i) => i.key.startsWith("ce-")), anatomy));

  const resolvedReportTypes = pickItems(content.catalogue.items!, catalogue).map((f) => {
    const item = getCopyItem(catalogue, f.key);
    const meta = catalogueMeta[f.key];
    return {
      key: f.key,
      title: copyText(item?.title, f.title!),
      note: f.status ? copyText(item?.status, f.status) : undefined,
      text: copyText(item?.text, f.text!),
      ...meta,
    };
  });

  return (
    <main className="overflow-hidden bg-[#030619] text-white">
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(55,222,245,0.16),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(139,92,246,0.13),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.82fr] lg:items-center lg:px-8">
          <div>
            <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/[0.1] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">{copyText(hero?.eyebrow, content.hero.eyebrow!)}</p>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">{copyText(hero?.title, content.hero.title!)}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              {copyText(hero?.body, content.hero.body!)}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={heroPrimaryCta.href} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">{heroPrimaryCta.label}</a>
              <a href={heroSecondaryCta.href} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">{heroSecondaryCta.label}</a>
            </div>
          </div>
          <ReportStackPanel />
        </div>
      </section>

      <section className="border-t border-white/10 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={copyText(reportValue?.eyebrow, content.reportValue.eyebrow!)}
            title={copyText(reportValue?.title, content.reportValue.title!)}
            body={copyText(reportValue?.body, content.reportValue.body!)}
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {resolvedFreeReportValue.map((outcome) => (
              <article key={outcome.key} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <h2 className="text-lg font-semibold text-white">{outcome.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">{outcome.text}</p>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center text-base leading-7 text-slate-300 md:text-lg md:leading-8">
            {copyText(reportValue?.secondaryBody, content.reportValue.secondaryBody!)}
          </p>
        </div>
      </section>

      <section id="cross-estate" className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={copyText(crossEstate?.eyebrow, content.crossEstate.eyebrow!)}
            title={copyText(crossEstate?.title, content.crossEstate.title!)}
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {resolvedDiscoveryTiers.map((tier) => (
              <div key={tier.key} className={`rounded-xl border border-white/10 border-l-[3px] bg-white/[0.035] px-4 py-3 ${tier.accent}`}>
                <p className="text-sm font-semibold text-white">{tier.name}</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">{tier.tag}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {resolvedCrossEstateValue.map((outcome) => (
              <article key={outcome.key} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <h2 className="text-lg font-semibold text-white">{outcome.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">{outcome.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={scopeEstateCta.href} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">{scopeEstateCta.label}</a>
            <a href={crossEstateSampleHref} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">See the sample</a>
          </div>
        </div>
      </section>

      <section id="sample-reports" className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={copyText(sampleReportsSection?.eyebrow, content.sampleReports.eyebrow!)}
            title={copyText(sampleReportsSection?.title, content.sampleReports.title!)}
            body={copyText(sampleReportsSection?.body, content.sampleReports.body!)}
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {resolvedSampleReports.map((report) => (
              <a key={report.key} href={report.href} className="group rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 transition hover:border-cyan-300/40 hover:bg-white/[0.055]">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/70">Sample report</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{report.title}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-400">{report.text}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {report.sections.map((section) => <Tag key={section}>{section}</Tag>)}
                </div>
                <p className="mt-6 text-sm font-semibold text-cyan-100 group-hover:text-cyan-50">Open sample →</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={copyText(anatomy?.eyebrow, content.anatomy.eyebrow!)}
            title={copyText(anatomy?.title, content.anatomy.title!)}
            body={copyText(anatomy?.body, content.anatomy.body!)}
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-2 lg:items-start">
            <AnatomyColumn eyebrow="Single domain" title="Domain Risk Report" blocks={domainReportAnatomy} />
            <AnatomyColumn eyebrow="Multi-domain" title="Cross-Estate Domain Risk Report" blocks={crossEstateAnatomy} />
          </div>
        </div>
      </section>

      <section id="catalogue" className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={copyText(catalogue?.eyebrow, content.catalogue.eyebrow!)}
            title={copyText(catalogue?.title, content.catalogue.title!)}
            body={copyText(catalogue?.body, content.catalogue.body!)}
          />
          {/* Fixed rows (note / title / text / price / CTAs) so every column
              lines up horizontally regardless of how much copy each card has. */}
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {resolvedReportTypes.map((item) => (
              <article key={item.key} className="flex h-full flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <p className="min-h-[1.25rem] text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/70">{item.note ?? " "}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{item.text}</p>
                <div className="mt-auto pt-6">
                  <div className="flex min-h-[2.5rem] items-end gap-1.5">
                    <span className="text-2xl font-semibold tracking-tight text-white"><CurrencyText value={item.price} /></span>
                    {item.cadence ? <span className="pb-0.5 text-xs text-slate-400">{item.cadence}</span> : null}
                  </div>
                  <a href={item.cta.href} className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-cyan-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">{item.cta.label}</a>
                  {item.secondaryCta ? (
                    <a href={item.secondaryCta.href} className="mt-2 inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-4 text-sm font-semibold text-white transition hover:bg-white/[0.08]">{item.secondaryCta.label}</a>
                  ) : (
                    <div aria-hidden="true" className="mt-2 min-h-11" />
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={copyText(sampleFindingsSection?.eyebrow, content.sampleFindings.eyebrow!)}
            title={copyText(sampleFindingsSection?.title, content.sampleFindings.title!)}
            body={copyText(sampleFindingsSection?.body, content.sampleFindings.body!)}
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            {resolvedSampleFindings.map((row, index) => (
              <div key={row.key} className={`grid gap-3 p-5 md:grid-cols-[0.28fr_0.72fr] ${index > 0 ? "border-t border-white/10" : ""}`}>
                <h3 className="text-sm font-semibold text-white">{row.title}</h3>
                <p className="text-sm leading-6 text-slate-400">{row.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={copyText(upgradePathsSection?.eyebrow, content.upgradePaths.eyebrow!)}
            title={copyText(upgradePathsSection?.title, content.upgradePaths.title!)}
            body={copyText(upgradePathsSection?.body, content.upgradePaths.body!)}
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            {resolvedUpgradePaths.map((row, index) => (
              <div key={row.key} className={`grid gap-3 p-5 md:grid-cols-[0.28fr_0.72fr] ${index > 0 ? "border-t border-white/10" : ""}`}>
                <h3 className="text-sm font-semibold text-white">{row.title}</h3>
                <p className="text-sm leading-6 text-slate-400">{row.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">{copyText(finalCta?.eyebrow, content.finalCta.eyebrow!)}</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">{copyText(finalCta?.title, content.finalCta.title!)}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            {copyText(finalCta?.body, content.finalCta.body!)}
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={finalPrimaryCta.href} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">{finalPrimaryCta.label}</a>
            <a href={scopeEstateCta.href} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">{scopeEstateCta.label}</a>
          </div>
          <p className="mt-6 text-sm">
            <a href={crossEstateSampleHref} className="font-semibold text-cyan-100 hover:text-cyan-50">See a sample Cross-Estate report →</a>
          </p>
        </div>
      </section>
    </main>
  );
}

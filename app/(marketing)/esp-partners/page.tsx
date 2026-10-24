import type { Metadata } from "next";
import type React from "react";

import {
  copyCta,
  copyText,
  getCopyItem,
  getCopySection,
  pickItems,
  type MarketingCopySection,
  type MarketingPageCopy,
} from "@/lib/marketing-copy";
import { sanityFetch } from "@/sanity/fetch";
import { marketingPageCopyBySlugQuery } from "@/sanity/marketingCopy";
import { loadCorporateMailFigures, loadIntelligenceFigures, resolveCorporateMailTokens } from "@/lib/observatory-figures";
import { getSiteStats } from "@/lib/site-stats-live";
import { MACHINE_CLICKS_EVIDENCE_URL, MACHINE_CLICKS_GUIDE_PATH } from "@/lib/machine-clicks";
import { BOOK_CALL_LABEL, withSrc } from "@/lib/booking";
import { foundingOffer } from "@/lib/pricing";
import { BookCallLink } from "@/components/partners/PartnerClosing";
import { FoundingCard } from "@/components/pricing/FoundingCard";
import { FaqJsonLd } from "@/components/seo/FaqSection";
import type { CopyItem } from "@/sanity/seedMarketingCopy";
import { SLUG, content } from "./copy";

// 2026-10-24 — Campaign Intelligence (brief "ESP Page Rewrite"). Notes on the
// copy, its claim rules and the CMS reseed are at the top of ./copy.ts.

export const metadata: Metadata = {
  title: "Campaign intelligence for ESPs — Datazag",
  description:
    "Help your customers send better campaigns. Flag problem recipient domains, screen campaign links and explain delivery results, under your own brand.",
};

const SRC = "esp";

const secondaryButton =
  "inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-center text-sm font-semibold text-white transition hover:bg-white/[0.08]";
const textLink = "font-semibold text-cyan-200 underline-offset-4 hover:underline";

// Which evidence blocks are the ESP's own data. Structure, not copy.
const EVIDENCE_OWNER: Record<string, "datazag" | "esp" | "output"> = {
  infrastructure: "datazag",
  "campaign-events": "esp",
  "machine-evidence": "esp",
  "campaign-reporting": "output",
};

type Card = { key: string; title: string; text: string; status: string; points: string[] };

/** A section's items with CMS overrides on every field this page uses. */
function cards(section: MarketingCopySection | undefined, fallbacks: CopyItem[]): Card[] {
  return pickItems(fallbacks, section).map((f) => {
    const item = getCopyItem(section, f.key);
    return {
      key: f.key,
      title: copyText(item?.title, f.title ?? ""),
      text: copyText(item?.text, f.text ?? ""),
      status: copyText(item?.status, f.status ?? ""),
      points: item?.points && item.points.length > 0 ? item.points : (f.points ?? []),
    };
  });
}

const paragraphs = (text: string) => text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

const count = (value: string | undefined) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
};
const fmt = (n: number | null) => (n === null ? "—" : n.toLocaleString("en-US"));

function SectionHeader({ eyebrow, title, body, align = "center" }: { eyebrow?: string; title: string; body?: string; align?: "center" | "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">{eyebrow}</p> : null}
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
      {body ? <p className="mt-5 text-base leading-7 text-slate-300 md:text-lg md:leading-8">{body}</p> : null}
    </div>
  );
}

function Section({ id, children, tint = false }: { id?: string; children: React.ReactNode; tint?: boolean }) {
  return (
    <section id={id} className={`border-t border-white/10 py-20 md:py-28 ${tint ? "bg-[#050b22]/60" : ""}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

function Dot() {
  return <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />;
}

function OwnerBadge({ owner }: { owner: "datazag" | "esp" | "output" }) {
  if (owner === "esp") {
    return <span className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-100">Already yours</span>;
  }
  if (owner === "datazag") {
    return <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">From Datazag</span>;
  }
  return <span className="rounded-full border border-violet-300/30 bg-violet-300/10 px-3 py-1 text-xs font-semibold text-violet-100">The result</span>;
}

export default async function EspPartnersPage() {
  const [pageCopy, corporateMail, intelligence, siteStats] = await Promise.all([
    sanityFetch<MarketingPageCopy>(marketingPageCopyBySlugQuery, { slug: SLUG }, 300),
    loadCorporateMailFigures(),
    loadIntelligenceFigures(),
    getSiteStats(),
  ]);

  const sec = (key: keyof typeof content & string) => getCopySection(pageCopy, key);
  const text = (key: keyof typeof content & string, field: "eyebrow" | "title" | "body" | "secondaryBody") =>
    copyText(sec(key)?.[field], content[key][field] ?? "");
  const list = (key: keyof typeof content & string) => cards(sec(key), content[key].items ?? []);
  const cta = (key: keyof typeof content & string, field: "primaryCta" | "secondaryCta") =>
    copyCta(sec(key)?.[field], content[key][field]!);

  // The founding offer shows until its deadline or while places are left (lib/pricing.ts).
  // Without it, every "claim a place" button falls back to the plain booking label.
  const founding = foundingOffer("founding_esp");
  const claimLabel = founding ? copyText(sec("pilot")?.primaryCta?.label, content.pilot.primaryCta!.label) : BOOK_CALL_LABEL;

  const heroPoints = list("campaignHero");
  const heroTiles = list("heroTiles");
  const problemCards = list("problem");
  const evidence = list("evidenceSources");
  const evidenceInputs = evidence.filter((c) => EVIDENCE_OWNER[c.key] !== "output");
  const evidenceOutput = evidence.find((c) => EVIDENCE_OWNER[c.key] === "output");
  const stages = list("lifecycle");
  const mxRows = list("beyondMx");
  const mxWhy = list("beyondMxWhy");
  const reportRows = list("exampleReport").map((row) => {
    const [recipients, bounced, deferred, clicks, automated] = row.points.map(count);
    return { ...row, recipients, bounced, deferred, clicks, automated };
  });
  const integrationCards = list("integration");
  const ownershipRows = list("ownership");
  const platformGains = list("economicsPlatform");
  const premiumServices = list("economicsServices");
  const rights = list("rights");
  const pilotSteps = list("pilot");
  const pilotReport = list("pilotReport");
  const pilotFaq = list("pilotFaq").filter((q) => q.title && q.text);

  // The summary strip is computed from the rows, so the panel always adds up.
  const sum = (pick: (r: (typeof reportRows)[number]) => number | null) => reportRows.reduce((total, r) => total + (pick(r) ?? 0), 0);
  const totalRecipients = sum((r) => r.recipients);
  const totalClicks = sum((r) => r.clicks);
  const totalAutomated = sum((r) => r.automated);

  // Beyond the MX record: the corporate-domain count comes from the Observatory. Without
  // it, that sentence takes a figure-free form rather than a hole.
  const mxParagraphs = paragraphs(text("beyondMx", "body"))
    .map((p) => (corporateMail ? p : p.replace("for {{CORP_MAIL_DOMAINS}} corporate domains", "for corporate domains worldwide")))
    .map((p) => resolveCorporateMailTokens(p, corporateMail))
    .filter((p): p is string => Boolean(p));
  const mxProof = cta("beyondMx", "primaryCta");

  const researchBody = text("research", "body").replace("{{DOMAINS}}", siteStats.DOMAINS_DISPLAY);
  const funnel = intelligence?.mailFunnel ?? null;
  const funnelLabels = [
    "Domains that publish a mail (MX) record",
    "Domains that can actually receive mail",
    "Domains that can receive mail and are not parked",
  ];
  const feature = sec("researchFeature");
  const featureCta = cta("researchFeature", "primaryCta");

  const technicalLinks = cards(sec("technicalLinks"), content.technicalLinks.items ?? [])
    .map((link) => ({
      ...link,
      href: link.key === "guide" ? withSrc(MACHINE_CLICKS_GUIDE_PATH, SRC) : link.key === "docs" ? withSrc("/docs", SRC) : MACHINE_CLICKS_EVIDENCE_URL,
    }))
    // The vendor documentation renders only while its Observatory page is live (lib/machine-clicks.ts).
    .filter((link): link is typeof link & { href: string } => Boolean(link.href));

  const heroSecondary = cta("campaignHero", "secondaryCta");
  const heroEngineers = cta("heroEngineers", "primaryCta");
  const attribution = list("attribution");
  const techSpec = list("techSpec");
  const [mainStage, ...sameDataStages] = stages;
  const pricingCta = cta("economics", "primaryCta");
  const pilotSecondary = cta("pilot", "secondaryCta");

  return (
    <main className="overflow-hidden bg-[#030619] text-white">
      {/* 1. Hero */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(55,222,245,0.16),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(139,92,246,0.13),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.72fr] lg:items-center lg:px-8">
          <div>
            <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/[0.1] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">{text("campaignHero", "eyebrow")}</p>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">{text("campaignHero", "title")}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{text("campaignHero", "body")}</p>
            <ul className="mt-6 grid max-w-3xl gap-3 text-base leading-7 text-slate-300">
              {heroPoints.map((point) => (
                <li key={point.key} className="flex gap-3">
                  <Dot />
                  <span><span className="font-semibold text-white">{point.title}</span> {point.text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <BookCallLink src={SRC} location="hero" label={claimLabel} />
              <a href={withSrc(heroSecondary.href, SRC)} className={secondaryButton}>{heroSecondary.label}</a>
            </div>
            <p className="mt-5 text-sm"><a href={heroEngineers.href} className={textLink}>{heroEngineers.label} →</a></p>
          </div>
          <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-cyan-950/20">
            {heroTiles.map((tile, index) => (
              <article key={tile.key} className={`rounded-[1.5rem] border p-5 ${index === 0 ? "border-cyan-300/25 bg-cyan-300/[0.08]" : "border-white/10 bg-[#050b22]"}`}>
                <h3 className="text-xl font-semibold text-white">{tile.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{tile.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 2. The problem */}
      <Section>
        <SectionHeader eyebrow={text("problem", "eyebrow")} title={text("problem", "title")} />
        <div className="mx-auto mt-6 max-w-3xl space-y-4 text-center text-base leading-7 text-slate-300 md:text-lg md:leading-8">
          {paragraphs(text("problem", "body")).map((p) => <p key={p}>{p}</p>)}
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {problemCards.map((card) => (
            <article key={card.key} className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
              <h3 className="text-lg font-semibold text-white">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{card.text}</p>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-3xl text-center text-lg font-semibold leading-8 text-cyan-100">{text("problem", "secondaryBody")}</p>
      </Section>

      {/* 3. Three sources of evidence, one explanation */}
      <Section id="how-it-works" tint>
        <SectionHeader eyebrow={text("evidenceSources", "eyebrow")} title={text("evidenceSources", "title")} body={text("evidenceSources", "body")} />
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {evidenceInputs.map((block) => {
            const owner = EVIDENCE_OWNER[block.key] ?? "datazag";
            return (
              <article key={block.key} className={`flex flex-col rounded-[1.5rem] border p-6 ${owner === "esp" ? "border-emerald-300/20 bg-emerald-300/[0.04]" : "border-cyan-300/25 bg-cyan-300/[0.06]"}`}>
                <div><OwnerBadge owner={owner} /></div>
                <h3 className="mt-4 text-xl font-semibold text-white">{block.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{block.text}</p>
                <p className="mt-auto pt-5 text-xs leading-5 text-slate-400"><span className="font-semibold uppercase tracking-[0.16em] text-slate-500">Source · </span>{block.status}</p>
              </article>
            );
          })}
        </div>
        {evidenceOutput ? (
          <>
            {/* Three lines joining into the output card. */}
            <div aria-hidden className="relative mx-auto hidden h-12 max-w-5xl lg:block">
              <div className="absolute left-[16.66%] right-[16.66%] top-1/2 h-px bg-cyan-300/30" />
              <div className="absolute left-[16.66%] top-0 h-1/2 w-px bg-cyan-300/30" />
              <div className="absolute left-1/2 top-0 h-full w-px bg-cyan-300/50" />
              <div className="absolute right-[16.66%] top-0 h-1/2 w-px bg-cyan-300/30" />
            </div>
            <div aria-hidden className="mx-auto h-8 w-px bg-cyan-300/40 lg:hidden" />
            <article className="mx-auto max-w-3xl rounded-[2rem] border border-violet-300/30 bg-gradient-to-br from-cyan-300/[0.12] to-violet-400/[0.12] p-6 text-center shadow-2xl shadow-cyan-950/30 md:p-8">
              <OwnerBadge owner="output" />
              <h3 className="mt-4 text-2xl font-semibold text-white md:text-3xl">{evidenceOutput.title}</h3>
              <p className="mt-3 text-base leading-7 text-slate-200">{evidenceOutput.text}</p>
              <p className="mt-4 text-sm text-slate-400">{evidenceOutput.status}</p>
            </article>
          </>
        ) : null}
        <p className="mx-auto mt-10 max-w-3xl text-center text-lg font-semibold leading-8 text-cyan-100">{text("evidenceSources", "secondaryBody")}</p>
        <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.035] p-5">
          <h3 className="text-sm font-semibold text-white">{text("evidenceCaveat", "title")}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">{text("evidenceCaveat", "body")}</p>
        </div>
      </Section>

      {/* 4. Before, during, after */}
      <Section>
        <SectionHeader eyebrow={text("lifecycle", "eyebrow")} title={text("lifecycle", "title")} body={text("lifecycle", "body")} />
        {/* The first stage is the core use; the others are the same data, used earlier. */}
        {mainStage ? (
          <article className="mt-12 grid gap-4 rounded-[2rem] border border-cyan-300/25 bg-cyan-300/[0.075] p-6 md:grid-cols-[0.35fr_0.65fr] md:items-center md:p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/80">{mainStage.status}</p>
              <h3 className="mt-3 text-2xl font-semibold text-white md:text-3xl">{mainStage.title}</h3>
            </div>
            <p className="text-base leading-7 text-slate-200">{mainStage.text}</p>
          </article>
        ) : null}
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {sameDataStages.map((stage) => (
            <article key={stage.key} className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{stage.status}</p>
              <h3 className="mt-3 text-lg font-semibold text-white">{stage.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{stage.text}</p>
            </article>
          ))}
        </div>
        <div className="mt-5 flex flex-col gap-2 rounded-[1.5rem] border border-dashed border-white/15 bg-transparent p-5 md:flex-row md:items-baseline md:gap-6">
          <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{text("signupChecks", "eyebrow")}</p>
          <p className="text-sm leading-6 text-slate-400">
            <span className="font-semibold text-white">{text("signupChecks", "title")}.</span> {text("signupChecks", "body")}
          </p>
        </div>
        <p className="mx-auto mt-10 max-w-3xl text-center text-lg font-semibold leading-8 text-cyan-100">{text("lifecycle", "secondaryBody")}</p>
      </Section>

      {/* 5. Beyond the MX record */}
      <Section tint>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeader align="left" eyebrow={text("beyondMx", "eyebrow")} title={text("beyondMx", "title")} />
            <div className="mt-6 space-y-4 text-base leading-7 text-slate-300">
              {mxParagraphs.map((p) => <p key={p}>{p}</p>)}
            </div>
            {corporateMail ? (
              <p className="mt-4 text-sm text-slate-500">
                Corporate domains{corporateMail.asOf ? ` as of ${corporateMail.asOf}` : ""}.{" "}
                <a href={corporateMail.href} className={textLink}>Source →</a>
              </p>
            ) : null}
            <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-[#030619] p-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100/70">{text("attribution", "title")}</h3>
              <dl className="mt-4 grid gap-3">
                {attribution.map((item) => (
                  <div key={item.key} className="grid gap-1 sm:grid-cols-[0.3fr_0.7fr] sm:gap-4">
                    <dt className="text-sm font-semibold text-white">{item.title}</dt>
                    <dd className="text-sm leading-6 text-slate-400">{item.text}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                {text("attribution", "body")}{" "}
                <a href={withSrc(MACHINE_CLICKS_GUIDE_PATH, SRC)} className={textLink}>Read the guide →</a>
              </p>
            </div>
          </div>
          <div>
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#030619]">
              <div className="grid grid-cols-2 border-b border-white/10 text-xs font-semibold uppercase tracking-[0.18em]">
                <div className="px-5 py-4 text-slate-500">What a basic lookup shows</div>
                <div className="border-l border-cyan-300/20 bg-cyan-300/[0.07] px-5 py-4 text-cyan-100">What Datazag shows</div>
              </div>
              {mxRows.map((row) => (
                <div key={row.key} className="grid grid-cols-2 border-b border-white/10 text-sm leading-6 last:border-b-0">
                  <div className="px-5 py-4 text-slate-500">{row.points[0]}</div>
                  <div className="border-l border-cyan-300/20 bg-cyan-300/[0.04] px-5 py-4 font-semibold text-white">{row.points[1]}</div>
                </div>
              ))}
            </div>
            <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100/70">{text("beyondMxWhy", "title")}</h3>
            <ul className="mt-4 grid gap-3">
              {mxWhy.map((point) => (
                <li key={point.key} className="flex gap-3 text-sm leading-6 text-slate-300"><Dot /><span>{point.text}</span></li>
              ))}
            </ul>
            <p className="mt-6 text-sm"><a href={mxProof.href} className={textLink}>{mxProof.label} →</a></p>
          </div>
        </div>
      </Section>

      {/* 6. Example campaign report — illustrative figures, labeled on the panel */}
      <Section id="example-report">
        <SectionHeader
          eyebrow={text("exampleReport", "eyebrow")}
          title={text("exampleReport", "title")}
          body={text("exampleReport", "body").replace("{{RECIPIENTS}}", fmt(totalRecipients))}
        />
        <figure className="mt-12">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22] shadow-2xl shadow-cyan-950/30">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[0.03] px-5 py-4">
              <div className="flex items-center gap-3">
                <span aria-hidden className="flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-white/15" /><span className="h-2.5 w-2.5 rounded-full bg-white/15" /><span className="h-2.5 w-2.5 rounded-full bg-white/15" /></span>
                <p className="text-sm font-semibold text-white">Campaign report · Newsletter · {fmt(totalRecipients)} recipients</p>
              </div>
              <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-100">Illustrative</span>
            </div>
            <dl className="grid grid-cols-3 border-b border-white/10">
              {[
                { label: "Reported clicks", value: totalClicks, tone: "text-white" },
                { label: "Likely automated", value: totalAutomated, tone: "text-amber-100" },
                { label: "Likely human", value: totalClicks - totalAutomated, tone: "text-emerald-100" },
              ].map((stat, i) => (
                <div key={stat.label} className={`flex flex-col px-3 py-5 sm:px-5 ${i > 0 ? "border-l border-white/10" : ""}`}>
                  <dt className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-slate-500 sm:text-xs sm:tracking-[0.16em]">{stat.label}</dt>
                  <dd className={`order-first text-2xl font-semibold tabular-nums tracking-tight md:text-3xl ${stat.tone}`}>{fmt(stat.value)}</dd>
                </div>
              ))}
            </dl>
            <div role="table" aria-label="Results by recipient infrastructure (illustrative)">
              <div role="row" className="hidden grid-cols-[1.35fr_repeat(5,0.55fr)_2fr] gap-4 border-b border-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 lg:grid">
                <div role="columnheader">Recipient infrastructure</div>
                <div role="columnheader" className="text-right">Recipients</div>
                <div role="columnheader" className="text-right">Bounced</div>
                <div role="columnheader" className="text-right">Deferred</div>
                <div role="columnheader" className="text-right">Clicks</div>
                <div role="columnheader" className="text-right">Likely automated</div>
                <div role="columnheader" className="text-cyan-100">What to investigate</div>
              </div>
              {reportRows.map((row) => {
                const share = row.clicks && row.automated !== null ? Math.min(1, row.automated / row.clicks) : 0;
                const numbers = [
                  { label: "Recipients", value: row.recipients },
                  { label: "Bounced", value: row.bounced },
                  { label: "Deferred", value: row.deferred },
                  { label: "Clicks", value: row.clicks },
                ];
                return (
                  <div key={row.key} role="row" className="grid gap-4 border-b border-white/10 px-5 py-5 last:border-b-0 lg:grid-cols-[1.35fr_repeat(5,0.55fr)_2fr] lg:items-center">
                    <div role="rowheader" className="text-sm font-semibold text-white">{row.title}</div>
                    <div className="grid grid-cols-3 gap-x-3 gap-y-3 sm:grid-cols-5 lg:contents">
                      {numbers.map((n) => (
                        <div key={n.label} role="cell" className="text-left lg:text-right">
                          <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-slate-500 lg:hidden">{n.label}</span>
                          <span className="text-sm tabular-nums text-slate-300">{fmt(n.value)}</span>
                        </div>
                      ))}
                      <div role="cell" className="text-left lg:text-right">
                        <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-slate-500 lg:hidden">Automated</span>
                        <span className="text-sm font-semibold tabular-nums text-amber-100">{fmt(row.automated)}</span>
                        <span aria-hidden className="mt-1.5 block h-1 overflow-hidden rounded-full bg-white/10">
                          <span className="block h-full rounded-full bg-amber-300/70" style={{ width: `${Math.round(share * 100)}%` }} />
                        </span>
                      </div>
                    </div>
                    <div role="cell" className="rounded-xl border border-cyan-300/25 bg-cyan-300/[0.08] px-4 py-3 text-sm leading-6 text-cyan-50">{row.text}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <figcaption className="mt-4 text-sm leading-6 text-slate-500">{text("exampleReport", "secondaryBody")}</figcaption>
        </figure>
        <div className="mt-10 flex flex-col items-center gap-4 rounded-[1.5rem] border border-cyan-300/25 bg-cyan-300/[0.075] p-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-xl font-semibold text-white">{cta("exampleReport", "primaryCta").label}</p>
          <BookCallLink src={SRC} location="example-report" label={claimLabel} />
        </div>
      </Section>

      {/* 7. Research evidence — live figures with their as-of date */}
      <Section tint>
        <SectionHeader eyebrow={text("research", "eyebrow")} title={text("research", "title")} body={researchBody} />
        {funnel ? (
          <div className="mt-12">
            <dl className="grid gap-4 sm:grid-cols-3">
              {funnel.map((figure, i) => (
                <div key={figure.id} className="flex flex-col rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.055] p-5">
                  <dt className="mt-2 text-sm leading-6 text-slate-300">{funnelLabels[i]}</dt>
                  <dd className={`order-first font-semibold tabular-nums tracking-tight text-white ${i === 2 ? "text-4xl" : "text-3xl"}`}>{figure.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-sm leading-6 text-slate-400">
              {intelligence?.asOf ? <>Figures as of {intelligence.asOf}. </> : null}
              <a href={funnel[2].href} aria-label="Method and caveats: domains that can receive mail" className={textLink}>Method and caveats →</a>
            </p>
          </div>
        ) : null}
        <article className="mt-10 flex flex-col gap-5 rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/70">{copyText(feature?.eyebrow, content.researchFeature.eyebrow!)}</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{copyText(feature?.title, content.researchFeature.title!)}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">{copyText(feature?.body, content.researchFeature.body!)}</p>
          </div>
          <a href={withSrc(featureCta.href, SRC)} className={`${secondaryButton} shrink-0`}>{featureCta.label} →</a>
        </article>
      </Section>

      {/* 8. Integration */}
      <Section id="integration">
        <SectionHeader eyebrow={text("integration", "eyebrow")} title={text("integration", "title")} body={text("integration", "body")} />
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {integrationCards.map((card) => (
            <article key={card.key} className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
              <h3 className="text-lg font-semibold text-white">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{card.text}</p>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-3xl text-center text-lg font-semibold leading-8 text-cyan-100">{text("integration", "secondaryBody")}</p>
        <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#050b22]">
          <h3 className="border-b border-white/10 bg-white/[0.035] px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/70">{text("techSpec", "title")}</h3>
          <dl>
            {techSpec.map((item) => (
              <div key={item.key} className="grid gap-1 border-b border-white/10 px-5 py-4 last:border-b-0 md:grid-cols-[0.28fr_0.72fr] md:gap-4">
                <dt className="text-sm font-semibold text-white">{item.title}</dt>
                <dd className="text-sm leading-6 text-slate-300">{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>
        {technicalLinks.length > 0 ? (
          <div className="mt-8 flex flex-col gap-3 rounded-[1.5rem] border border-white/10 bg-[#050b22] p-5 md:flex-row md:items-center md:gap-6">
            <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{text("technicalLinks", "title")}</p>
            <ul className="flex flex-col gap-2 text-sm md:flex-row md:flex-wrap md:gap-x-6">
              {technicalLinks.map((link) => (
                <li key={link.key}><a href={link.href} className={textLink}>{link.title} →</a></li>
              ))}
            </ul>
          </div>
        ) : null}
        <h3 className="mt-16 text-center text-2xl font-semibold text-white">{text("ownership", "title")}</h3>
        <div className="mt-6 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
          <div className="hidden grid-cols-[0.28fr_0.36fr_0.36fr] border-b border-white/10 bg-white/[0.035] px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/70 md:grid">
            <div>Area</div>
            <div>ESP</div>
            <div>Datazag</div>
          </div>
          {ownershipRows.map((row) => (
            <div key={row.key} className="grid gap-3 border-b border-white/10 px-5 py-5 last:border-b-0 md:grid-cols-[0.28fr_0.36fr_0.36fr] md:items-start">
              <div className="text-sm font-semibold text-white">{row.title}</div>
              <div className="text-sm leading-6 text-slate-400"><span className="font-semibold text-slate-500 md:hidden">ESP: </span>{row.points[0]}</div>
              <div className="text-sm leading-6 text-slate-300"><span className="font-semibold text-slate-500 md:hidden">Datazag: </span>{row.points[1]}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* 9. Partner economics — no prices here; the pricing page has them */}
      <Section tint>
        <SectionHeader eyebrow={text("economics", "eyebrow")} title={text("economics", "title")} />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {[
            { key: "platform", heading: text("economicsPlatform", "title"), items: platformGains, accent: false },
            { key: "services", heading: text("economicsServices", "title"), items: premiumServices, accent: true },
          ].map((column) => (
            <div key={column.key} className={`rounded-[2rem] border p-6 md:p-8 ${column.accent ? "border-cyan-300/25 bg-cyan-300/[0.075]" : "border-white/10 bg-white/[0.035]"}`}>
              <h3 className="text-xl font-semibold text-white">{column.heading}</h3>
              <ul className="mt-5 grid gap-3">
                {column.items.map((item) => (
                  <li key={item.key} className="flex gap-3 text-sm leading-6 text-slate-300"><Dot /><span>{item.text}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-lg font-semibold text-cyan-100">
          {text("economics", "secondaryBody")}{" "}
          <a href={withSrc(pricingCta.href, SRC)} className={textLink}>{pricingCta.label} →</a>
        </p>
        <div className="mt-12 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="rounded-[2rem] border border-cyan-300/25 bg-cyan-300/[0.075] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/80">{text("margin", "eyebrow")}</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{text("margin", "title")}</h3>
            <p className="mt-4 text-sm leading-6 text-slate-300">{text("margin", "body")}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/70">{text("rights", "eyebrow")}</p>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {rights.map((right) => (
                <article key={right.key} className="rounded-[1.5rem] border border-white/10 bg-[#050b22] p-5">
                  <h3 className="text-sm font-semibold text-white">{right.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{right.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 10. Founding offer: Campaign Intelligence Pilot. Price, terms and places render
          from founding_esp in lib/pricing.ts, the same card the pricing page shows. */}
      <Section id="pilot">
        <FaqJsonLd entries={pilotFaq.map((q) => ({ question: q.title, answer: q.text }))} />
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <SectionHeader
              align="left"
              eyebrow={founding ? text("pilot", "eyebrow") : "For email platforms"}
              title={text("pilot", "title")}
              body={text("pilot", "body")}
            />
            <ol className="mt-8 grid gap-4">
              {pilotSteps.map((step, index) => (
                <li key={step.key} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-xs font-semibold text-cyan-100">{index + 1}</span>
                  <span className="pt-1 text-sm leading-6 text-slate-300"><span className="font-semibold text-white">{step.title}</span> {step.text}</span>
                </li>
              ))}
            </ol>
            <h3 className="mt-10 text-xl font-semibold text-white">{text("pilotReport", "title")}</h3>
            <ul className="mt-4 grid gap-3">
              {pilotReport.map((part) => (
                <li key={part.key} className="flex gap-3 text-sm leading-6 text-slate-300"><Dot /><span><span className="font-semibold text-white">{part.title}</span> {part.text}</span></li>
              ))}
            </ul>
            <p className="mt-8 rounded-2xl border border-dashed border-white/15 p-5 text-sm leading-6 text-slate-400">{text("pilot", "secondaryBody")}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <BookCallLink src={SRC} location="pilot" label={claimLabel} />
              <a href={withSrc(pilotSecondary.href, SRC)} className={secondaryButton}>{pilotSecondary.label}</a>
            </div>
          </div>
          <div className="grid gap-5">
            {founding ? <FoundingCard offer={founding} src={SRC} page={SRC} cta={claimLabel} /> : null}
            {pilotFaq.length > 0 ? (
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6">
                <h3 className="text-xl font-semibold text-white">{text("pilotFaq", "title")}</h3>
                <dl className="mt-5 grid gap-5">
                  {pilotFaq.map((q) => (
                    <div key={q.key}>
                      <dt className="text-sm font-semibold text-white">{q.title}</dt>
                      <dd className="mt-2 text-sm leading-6 text-slate-400">{q.text}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}
          </div>
        </div>
      </Section>
    </main>
  );
}

// Re-rendered at least hourly, so the founding offer hides after its deadline and the
// live figures move without a deploy.
export const revalidate = 3600;

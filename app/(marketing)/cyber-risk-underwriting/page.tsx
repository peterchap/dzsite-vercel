import type { Metadata } from "next";
import type React from "react";

import {
  copyCta,
  copyText,
  getCopySection,
  resolveCopyCards,
  type MarketingPageCopy,
} from "@/lib/marketing-copy";
import { sanityFetch } from "@/sanity/fetch";
import { marketingPageCopyBySlugQuery } from "@/sanity/marketingCopy";
import { PageShell } from "@/components/layout/PageShell";
import { SLUG, content } from "./copy";

// The page had no title and no meta description — it rendered as a bare
// "Cyber Risk Underwriting" (standing criterion 4).
export const metadata: Metadata = {
  title: "Cyber Risk Underwriting — Datazag",
  description:
    "Infrastructure evidence for cyber underwriting: discover the estate an applicant did not declare, check the controls they claim, and monitor posture across the policy term. Pre-bind assessment, in-period monitoring and portfolio accumulation.",
};

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-xs font-semibold text-slate-300">
      {children}
    </span>
  );
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

/**
 * The evidence visual. Deliberately a RENDERED STRUCTURE, not a screenshot:
 * it shows the real shape of a Cross-Estate finding — confidence tier, the
 * relationship that evidenced it, and the reason a control fired — using the
 * vocabulary the reports actually emit. Inventing a customer's estate as a
 * fake screenshot would be the same defect this brief exists to remove.
 */
function EvidencePanel() {
  const discovered = [
    { tier: "Declared", note: "Given on the submission", tone: "text-slate-300" },
    { tier: "Strongly associated", note: "Shared certificate SAN + mail exchanger", tone: "text-cyan-200" },
    { tier: "Possible", note: "Registration relationship, review", tone: "text-amber-200" },
    { tier: "Defensive", note: "Registered, unused, worth monitoring", tone: "text-slate-400" },
  ];

  const findings = [
    { control: "DMARC", state: "p=none", reason: "Published but not enforcing — impersonation is reported, not blocked" },
    { control: "SPF", state: "pass", reason: "Enforcing, within the lookup limit" },
    { control: "MTA-STS", state: "absent", reason: "Available at this provider, not deployed" },
  ];

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#07102b]/85 p-4 shadow-2xl shadow-black/25 md:p-5">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:44px_44px] opacity-35" />
      <div className="relative rounded-[1.5rem] border border-white/10 bg-[#030619]/75">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/70">Submission assessment</p>
          <p className="text-xs text-slate-400">Structure of a finding</p>
        </div>

        <div className="grid gap-4 p-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Estate discovery</p>
            <div className="mt-3 grid gap-2">
              {discovered.map((row) => (
                <div key={row.tier} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-xl border border-white/10 bg-[#030619]/50 px-3 py-2">
                  <span className={`text-sm font-semibold ${row.tone}`}>{row.tier}</span>
                  <span className="text-xs text-slate-400">{row.note}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-500">
              Every tier above &ldquo;Declared&rdquo; shows the relationship that evidenced it.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Control findings</p>
            <div className="mt-3 grid gap-2">
              {findings.map((f) => (
                <div key={f.control} className="rounded-xl border border-white/10 bg-[#030619]/50 px-3 py-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold text-white">{f.control}</span>
                    <span className="font-mono text-xs text-cyan-200">{f.state}</span>
                  </div>
                  <p className="mt-1 text-xs leading-5 text-slate-400">{f.reason}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.06] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/80">Why this matters to a price</p>
            <p className="mt-2 text-sm leading-6 text-slate-200">
              A reported-only DMARC policy on an estate larger than the one declared is a
              business-email-compromise exposure the submission did not describe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function CyberRiskUnderwritingPage() {
  const pageCopy = await sanityFetch<MarketingPageCopy>(marketingPageCopyBySlugQuery, { slug: SLUG }, 300);

  const hero = getCopySection(pageCopy, "hero");
  const decisions = getCopySection(pageCopy, "decisions");
  const signals = getCopySection(pageCopy, "signals");
  const portfolio = getCopySection(pageCopy, "portfolio");
  const evidence = getCopySection(pageCopy, "evidence");
  const delivery = getCopySection(pageCopy, "delivery");
  const cta = getCopySection(pageCopy, "cta");

  const heroPrimary = copyCta(hero?.primaryCta, content.hero.primaryCta!);
  const heroSecondary = copyCta(hero?.secondaryCta, content.hero.secondaryCta!);
  const ctaPrimary = copyCta(cta?.primaryCta, content.cta.primaryCta!);
  const ctaSecondary = copyCta(cta?.secondaryCta, content.cta.secondaryCta!);
  const evidencePrimary = copyCta(evidence?.primaryCta, content.evidence.primaryCta!);

  const decisionCards = resolveCopyCards(content.decisions.items!, decisions);
  const signalCards = resolveCopyCards(content.signals.items!, signals);
  const portfolioCards = resolveCopyCards(content.portfolio.items!, portfolio);
  const evidenceCards = resolveCopyCards(content.evidence.items!, evidence);
  const deliveryCards = resolveCopyCards(content.delivery.items!, delivery);

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(55,222,245,0.16),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(139,92,246,0.13),transparent_34%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/[0.1] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">
                {copyText(hero?.eyebrow, content.hero.eyebrow!)}
              </p>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-6xl">
                {copyText(hero?.title, content.hero.title!)}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                {copyText(hero?.body, content.hero.body!)}
              </p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
                {copyText(hero?.secondaryBody, content.hero.secondaryBody!)}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={heroPrimary.href} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
                  {heroPrimary.label}
                </a>
                <a href={heroSecondary.href} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">
                  {heroSecondary.label}
                </a>
              </div>
            </div>
            <EvidencePanel />
          </div>
        </div>
      </section>

      {/* Underwriting decisions */}
      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={copyText(decisions?.eyebrow, content.decisions.eyebrow!)}
            title={copyText(decisions?.title, content.decisions.title!)}
            body={copyText(decisions?.body, content.decisions.body!)}
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {decisionCards.map((card) => (
              <article key={card.key} className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
                <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{card.text}</p>
                {card.tags?.length ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {card.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Signals */}
      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={copyText(signals?.eyebrow, content.signals.eyebrow!)}
            title={copyText(signals?.title, content.signals.title!)}
            body={copyText(signals?.body, content.signals.body!)}
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {signalCards.map((card) => (
              <article key={card.key} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={copyText(portfolio?.eyebrow, content.portfolio.eyebrow!)}
            title={copyText(portfolio?.title, content.portfolio.title!)}
            body={copyText(portfolio?.body, content.portfolio.body!)}
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {portfolioCards.map((card) => (
              <article key={card.key} className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
                <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Evidence */}
      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">
                {copyText(evidence?.eyebrow, content.evidence.eyebrow!)}
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">
                {copyText(evidence?.title, content.evidence.title!)}
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-300">
                {copyText(evidence?.body, content.evidence.body!)}
              </p>
              <p className="mt-4 text-base leading-7 text-slate-400">
                {copyText(evidence?.secondaryBody, content.evidence.secondaryBody!)}
              </p>
              <a href={evidencePrimary.href} className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl border border-cyan-300/50 bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
                {evidencePrimary.label}
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {evidenceCards.map((card) => (
                <div key={card.key} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                  <h3 className="text-base font-semibold text-white">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Delivery */}
      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={copyText(delivery?.eyebrow, content.delivery.eyebrow!)}
            title={copyText(delivery?.title, content.delivery.title!)}
            body={copyText(delivery?.body, content.delivery.body!)}
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3 xl:grid-cols-5">
            {deliveryCards.map((card) => (
              <div key={card.key} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-base font-semibold text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA — the page previously had none at all. */}
      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">
            {copyText(cta?.eyebrow, content.cta.eyebrow!)}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">
            {copyText(cta?.title, content.cta.title!)}
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-300">
            {copyText(cta?.body, content.cta.body!)}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={ctaPrimary.href} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
              {ctaPrimary.label}
            </a>
            <a href={ctaSecondary.href} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">
              {ctaSecondary.label}
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

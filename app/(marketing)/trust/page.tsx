import type { Metadata } from "next";
import type React from "react";

import {
  copyCta,
  copyText,
  getCopySection,
  resolveCopyCards,
  resolveCopyList,
  type MarketingPageCopy,
} from "@/lib/marketing-copy";
import { sanityFetch } from "@/sanity/fetch";
import { marketingPageCopyBySlugQuery } from "@/sanity/marketingCopy";
import { SLUG, content } from "./copy";

export const metadata: Metadata = {
  title: "Trust & Governance — Datazag",
  description:
    "How Datazag handles observable infrastructure data, evidence, licensing, privacy, false-positive controls and permitted use across reports, alerts, APIs and data shares.",
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

function TrustStackPanel() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-cyan-950/20">
      <div className="rounded-[1.5rem] border border-cyan-300/25 bg-cyan-300/[0.08] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/80">Buyer assurance</p>
        <h3 className="mt-3 text-2xl font-semibold text-white">Evidence, scope and licence clarity</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">Trust comes from knowing what is included, what is excluded, how output can be used and where human review or contractual approval is needed.</p>
      </div>
      <div className="mx-auto h-8 w-px bg-cyan-300/30" />
      <div className="rounded-[1.5rem] border border-white/10 bg-[#050b22] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Trust dimensions</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {["Evidence", "Reason codes", "Licensing", "Privacy", "False positives", "Data shares", "Partner use", "Governance"].map((item) => (
            <div key={item} className="rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 text-sm font-semibold text-slate-200">{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function TrustPage() {
  const pageCopy = await sanityFetch<MarketingPageCopy>(marketingPageCopyBySlugQuery, { slug: SLUG }, 300);

  const hero = getCopySection(pageCopy, "hero");
  const trustPrinciples = getCopySection(pageCopy, "trustPrinciples");
  const evidence = getCopySection(pageCopy, "evidence");
  const productControlsSection = getCopySection(pageCopy, "productControls");
  const licensingSection = getCopySection(pageCopy, "licensing");
  const privacySection = getCopySection(pageCopy, "privacy");
  const falsePositives = getCopySection(pageCopy, "falsePositives");
  const marketplaceBoundariesSection = getCopySection(pageCopy, "marketplaceBoundaries");
  const finalCta = getCopySection(pageCopy, "finalCta");

  const heroPrimaryCta = copyCta(hero?.primaryCta, content.hero.primaryCta!);
  const heroSecondaryCta = copyCta(hero?.secondaryCta, content.hero.secondaryCta!);
  const finalPrimaryCta = copyCta(finalCta?.primaryCta, content.finalCta.primaryCta!);
  const finalSecondaryCta = copyCta(finalCta?.secondaryCta, content.finalCta.secondaryCta!);

  const resolvedPrinciples = resolveCopyCards(content.trustPrinciples.items!, trustPrinciples);
  const resolvedEvidenceLayers = resolveCopyCards(content.evidence.items!, evidence);
  const resolvedProductControls = resolveCopyCards(content.productControls.items!, productControlsSection);
  const resolvedLicensing = resolveCopyList(content.licensing.items!, licensingSection);
  const resolvedPrivacy = resolveCopyCards(content.privacy.items!, privacySection);
  const resolvedFalsePositiveControls = resolveCopyCards(content.falsePositives.items!, falsePositives);
  const resolvedMarketplaceBoundaries = resolveCopyCards(content.marketplaceBoundaries.items!, marketplaceBoundariesSection);

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
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              {copyText(hero?.secondaryBody, content.hero.secondaryBody!)}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={heroPrimaryCta.href} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">{heroPrimaryCta.label}</a>
              <a href={heroSecondaryCta.href} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">{heroSecondaryCta.label}</a>
            </div>
          </div>
          <TrustStackPanel />
        </div>
      </section>

      <section className="border-t border-white/10 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={copyText(trustPrinciples?.eyebrow, content.trustPrinciples.eyebrow!)}
            title={copyText(trustPrinciples?.title, content.trustPrinciples.title!)}
            body={copyText(trustPrinciples?.body, content.trustPrinciples.body!)}
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {resolvedPrinciples.map((principle) => (
              <article key={principle.key} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <h2 className="text-lg font-semibold text-white">{principle.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">{principle.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={copyText(evidence?.eyebrow, content.evidence.eyebrow!)}
            title={copyText(evidence?.title, content.evidence.title!)}
            body={copyText(evidence?.body, content.evidence.body!)}
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            {resolvedEvidenceLayers.map((layer, index) => (
              <div key={layer.key} className={`grid gap-5 p-5 md:grid-cols-[0.28fr_0.44fr_0.28fr] md:items-start ${index > 0 ? "border-t border-white/10" : ""}`}>
                <h3 className="text-xl font-semibold text-white">{layer.title}</h3>
                <p className="text-sm leading-6 text-slate-300">{layer.text}</p>
                <div className="flex flex-wrap gap-2">
                  {layer.tags?.map((tag) => <Tag key={tag}>{tag}</Tag>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={copyText(productControlsSection?.eyebrow, content.productControls.eyebrow!)}
            title={copyText(productControlsSection?.title, content.productControls.title!)}
            body={copyText(productControlsSection?.body, content.productControls.body!)}
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            {resolvedProductControls.map((row, index) => (
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
            eyebrow={copyText(licensingSection?.eyebrow, content.licensing.eyebrow!)}
            title={copyText(licensingSection?.title, content.licensing.title!)}
            body={copyText(licensingSection?.body, content.licensing.body!)}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {resolvedLicensing.map((item) => (
              <article key={item.key} className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-400">
                  {item.points.map((point) => <li key={point}>• {point}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={copyText(privacySection?.eyebrow, content.privacy.eyebrow!)}
            title={copyText(privacySection?.title, content.privacy.title!)}
            body={copyText(privacySection?.body, content.privacy.body!)}
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            {resolvedPrivacy.map((row, index) => (
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
            eyebrow={copyText(falsePositives?.eyebrow, content.falsePositives.eyebrow!)}
            title={copyText(falsePositives?.title, content.falsePositives.title!)}
            body={copyText(falsePositives?.body, content.falsePositives.body!)}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {resolvedFalsePositiveControls.map((row) => (
              <article key={row.key} className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-xl font-semibold text-white">{row.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{row.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={copyText(marketplaceBoundariesSection?.eyebrow, content.marketplaceBoundaries.eyebrow!)}
            title={copyText(marketplaceBoundariesSection?.title, content.marketplaceBoundaries.title!)}
            body={copyText(marketplaceBoundariesSection?.body, content.marketplaceBoundaries.body!)}
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            {resolvedMarketplaceBoundaries.map((row, index) => (
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
            <a href={finalSecondaryCta.href} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">{finalSecondaryCta.label}</a>
          </div>
        </div>
      </section>
    </main>
  );
}

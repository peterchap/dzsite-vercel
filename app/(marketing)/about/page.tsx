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
import { SLUG, content } from "./copy";

export const metadata: Metadata = {
  title: "About — Datazag",
  description:
    "Datazag builds infrastructure intelligence for external domain, DNS, certificate, hosting and provider risk, delivered through reports, alerts, APIs, datasets and partner services.",
};

function SectionHeader({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
      {body ? <p className="mt-5 text-base leading-7 text-slate-300 md:text-lg md:leading-8">{body}</p> : null}
    </div>
  );
}

function AboutPanel() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-cyan-950/20">
      <div className="rounded-[1.5rem] border border-cyan-300/25 bg-cyan-300/[0.08] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/80">Company view</p>
        <h3 className="mt-3 text-2xl font-semibold text-white">External infrastructure is a risk layer.</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">Attackers leave traces in domains, certificates, DNS, hosting and provider relationships before a finished attack is visible to most teams.</p>
      </div>
      <div className="mx-auto h-8 w-px bg-cyan-300/30" />
      <div className="rounded-[1.5rem] border border-white/10 bg-[#050b22] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Datazag connects</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {["Domains", "DNS", "Certificates", "Hosting", "ASN", "Providers", "Platforms", "History"].map((item) => (
            <div key={item} className="rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 text-sm font-semibold text-slate-200">{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function AboutPage() {
  const pageCopy = await sanityFetch<MarketingPageCopy>(marketingPageCopyBySlugQuery, { slug: SLUG }, 300);

  const hero = getCopySection(pageCopy, "hero");
  const whyExist = getCopySection(pageCopy, "whyExist");
  const principles = getCopySection(pageCopy, "principles");
  const intelligenceLayerSection = getCopySection(pageCopy, "intelligenceLayer");
  const deliveryModelSection = getCopySection(pageCopy, "deliveryModel");
  const whoForSection = getCopySection(pageCopy, "whoFor");
  const boundariesSection = getCopySection(pageCopy, "boundaries");
  const finalCta = getCopySection(pageCopy, "finalCta");

  const heroPrimaryCta = copyCta(hero?.primaryCta, content.hero.primaryCta!);
  const heroSecondaryCta = copyCta(hero?.secondaryCta, content.hero.secondaryCta!);
  const boundariesCta = copyCta(boundariesSection?.primaryCta, content.boundaries.primaryCta!);
  const finalPrimaryCta = copyCta(finalCta?.primaryCta, content.finalCta.primaryCta!);
  const finalSecondaryCta = copyCta(finalCta?.secondaryCta, content.finalCta.secondaryCta!);

  const resolvedMissionCards = resolveCopyCards(content.whyExist.items!, whyExist);
  const resolvedPrinciples = resolveCopyCards(content.principles.items!, principles);
  const resolvedIntelligenceLayer = resolveCopyCards(content.intelligenceLayer.items!, intelligenceLayerSection);
  const resolvedDeliveryModel = resolveCopyCards(content.deliveryModel.items!, deliveryModelSection);
  const resolvedWhoFor = resolveCopyCards(content.whoFor.items!, whoForSection);
  const resolvedBoundaries = resolveCopyCards(content.boundaries.items!, boundariesSection);

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
          <AboutPanel />
        </div>
      </section>

      <section className="border-t border-white/10 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={copyText(whyExist?.eyebrow, content.whyExist.eyebrow!)}
            title={copyText(whyExist?.title, content.whyExist.title!)}
            body={copyText(whyExist?.body, content.whyExist.body!)}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {resolvedMissionCards.map((card) => (
              <article key={card.key} className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <h2 className="text-xl font-semibold text-white">{card.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={copyText(principles?.eyebrow, content.principles.eyebrow!)}
            title={copyText(principles?.title, content.principles.title!)}
            body={copyText(principles?.body, content.principles.body!)}
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {resolvedPrinciples.map((principle) => (
              <article key={principle.key} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-lg font-semibold text-white">{principle.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{principle.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={copyText(intelligenceLayerSection?.eyebrow, content.intelligenceLayer.eyebrow!)}
            title={copyText(intelligenceLayerSection?.title, content.intelligenceLayer.title!)}
            body={copyText(intelligenceLayerSection?.body, content.intelligenceLayer.body!)}
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            {resolvedIntelligenceLayer.map((row, index) => (
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
            eyebrow={copyText(deliveryModelSection?.eyebrow, content.deliveryModel.eyebrow!)}
            title={copyText(deliveryModelSection?.title, content.deliveryModel.title!)}
            body={copyText(deliveryModelSection?.body, content.deliveryModel.body!)}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {resolvedDeliveryModel.map((item) => (
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
            eyebrow={copyText(whoForSection?.eyebrow, content.whoFor.eyebrow!)}
            title={copyText(whoForSection?.title, content.whoFor.title!)}
            body={copyText(whoForSection?.body, content.whoFor.body!)}
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            {resolvedWhoFor.map((row, index) => (
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
            eyebrow={copyText(boundariesSection?.eyebrow, content.boundaries.eyebrow!)}
            title={copyText(boundariesSection?.title, content.boundaries.title!)}
            body={copyText(boundariesSection?.body, content.boundaries.body!)}
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            {resolvedBoundaries.map((row, index) => (
              <div key={row.key} className={`grid gap-3 p-5 md:grid-cols-[0.28fr_0.72fr] ${index > 0 ? "border-t border-white/10" : ""}`}>
                <h3 className="text-sm font-semibold text-white">{row.title}</h3>
                <p className="text-sm leading-6 text-slate-400">{row.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <a href={boundariesCta.href} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">{boundariesCta.label}</a>
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

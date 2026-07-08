import type { Metadata } from "next";
import type React from "react";

import {
  copyCta,
  copyText,
  getCopyItem,
  getCopySection,
  resolveCopyCards,
  resolveCopyList,
  pickItems,
  type MarketingPageCopy,
} from "@/lib/marketing-copy";
import { sanityFetch } from "@/sanity/fetch";
import { marketingPageCopyBySlugQuery } from "@/sanity/marketingCopy";
import { SLUG, content } from "./copy";

export const metadata: Metadata = {
  title: "ESP Partners — Datazag",
  description:
    "Add domain, link and infrastructure intelligence to email platforms. Datazag helps ESPs detect abuse earlier, protect deliverability and launch partner-branded services.",
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

export default async function EspPartnersPage() {
  const pageCopy = await sanityFetch<MarketingPageCopy>(marketingPageCopyBySlugQuery, { slug: SLUG }, 300);

  const hero = getCopySection(pageCopy, "hero");
  const partnerValue = getCopySection(pageCopy, "partnerValue");
  const serviceCatalogueSection = getCopySection(pageCopy, "serviceCatalogue");
  const howDatazagFits = getCopySection(pageCopy, "howDatazagFits");
  const commercialModelSection = getCopySection(pageCopy, "commercialModel");
  const marginPrinciple = getCopySection(pageCopy, "marginPrinciple");
  const marginLeversSection = getCopySection(pageCopy, "marginLevers");
  const usageRightsIntro = getCopySection(pageCopy, "usageRightsIntro");
  const usageRightsSection = getCopySection(pageCopy, "usageRights");
  const operatingModel = getCopySection(pageCopy, "operatingModel");
  const deliverySection = getCopySection(pageCopy, "delivery");
  const pilotPath = getCopySection(pageCopy, "pilotPath");
  const finalCta = getCopySection(pageCopy, "finalCta");

  const heroPrimaryCta = copyCta(hero?.primaryCta, content.hero.primaryCta!);
  const heroSecondaryCta = copyCta(hero?.secondaryCta, content.hero.secondaryCta!);
  const finalPrimaryCta = copyCta(finalCta?.primaryCta, content.finalCta.primaryCta!);

  const resolvedOutcomes = resolveCopyCards(content.partnerValue.items!, partnerValue);
  const resolvedCommercialModel = resolveCopyCards(content.commercialModel.items!, commercialModelSection);
  const resolvedMarginLevers = resolveCopyCards(content.marginLevers.items!, marginLeversSection);
  const resolvedUsageRights = resolveCopyCards(content.usageRights.items!, usageRightsSection);
  const resolvedDelivery = resolveCopyCards(content.delivery.items!, deliverySection);
  const resolvedPilotSteps = resolveCopyCards(content.pilotPath.items!, pilotPath);
  const resolvedRoleSplit = resolveCopyList(content.howDatazagFits.items!, howDatazagFits);

  const resolvedServiceCatalogue = pickItems(content.serviceCatalogue.items!, serviceCatalogueSection).map((f) => {
    const item = getCopyItem(serviceCatalogueSection, f.key);
    return {
      ...f,
      title: copyText(item?.title, f.title!),
      sell: copyText(item?.text, f.text!),
      powers: item?.tags && item.tags.length > 0 ? item.tags : f.tags!,
    };
  });

  const resolvedFlow = pickItems(content.operatingModel.items!, operatingModel).map((f) => {
    const item = getCopyItem(operatingModel, f.key);
    return { ...f, verb: copyText(item?.title, f.title!), text: copyText(item?.text, f.text!) };
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
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              {copyText(hero?.secondaryBody, content.hero.secondaryBody!)}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={heroPrimaryCta.href} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">{heroPrimaryCta.label}</a>
              <a href={heroSecondaryCta.href} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">{heroSecondaryCta.label}</a>
            </div>
          </div>
          <PartnerStackPanel />
        </div>
      </section>

      <section className="border-t border-white/10 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={copyText(partnerValue?.eyebrow, content.partnerValue.eyebrow!)}
            title={copyText(partnerValue?.title, content.partnerValue.title!)}
            body={copyText(partnerValue?.body, content.partnerValue.body!)}
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {resolvedOutcomes.map((outcome) => (
              <article key={outcome.key} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
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
            eyebrow={copyText(serviceCatalogueSection?.eyebrow, content.serviceCatalogue.eyebrow!)}
            title={copyText(serviceCatalogueSection?.title, content.serviceCatalogue.title!)}
            body={copyText(serviceCatalogueSection?.body, content.serviceCatalogue.body!)}
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            {resolvedServiceCatalogue.map((service, index) => (
              <div key={service.key} className={`grid gap-5 p-5 md:grid-cols-[0.32fr_0.42fr_0.26fr] md:items-start ${index > 0 ? "border-t border-white/10" : ""}`}>
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
            eyebrow={copyText(howDatazagFits?.eyebrow, content.howDatazagFits.eyebrow!)}
            title={copyText(howDatazagFits?.title, content.howDatazagFits.title!)}
            body={copyText(howDatazagFits?.body, content.howDatazagFits.body!)}
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            <div className="hidden grid-cols-[0.28fr_0.36fr_0.36fr] border-b border-white/10 bg-white/[0.035] px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/70 md:grid">
              <div>Area</div>
              <div>Partner</div>
              <div>Datazag</div>
            </div>
            {resolvedRoleSplit.map((row) => (
              <div key={row.key} className="grid gap-3 border-b border-white/10 px-5 py-5 last:border-b-0 md:grid-cols-[0.28fr_0.36fr_0.36fr] md:items-start">
                <div className="text-sm font-semibold text-white">{row.title}</div>
                <div className="text-sm leading-6 text-slate-400">{row.points[0]}</div>
                <div className="text-sm leading-6 text-slate-300">{row.points[1]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={copyText(commercialModelSection?.eyebrow, content.commercialModel.eyebrow!)}
            title={copyText(commercialModelSection?.title, content.commercialModel.title!)}
            body={copyText(commercialModelSection?.body, content.commercialModel.body!)}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {resolvedCommercialModel.map((item) => (
              <article key={item.key} className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{item.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="rounded-[2rem] border border-cyan-300/25 bg-cyan-300/[0.075] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/80">{copyText(marginPrinciple?.eyebrow, content.marginPrinciple.eyebrow!)}</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">{copyText(marginPrinciple?.title, content.marginPrinciple.title!)}</h3>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                {copyText(marginPrinciple?.body, content.marginPrinciple.body!)}
              </p>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
              {resolvedMarginLevers.map((item, index) => (
                <div key={item.key} className={`grid gap-3 p-5 md:grid-cols-[0.35fr_0.65fr] ${index > 0 ? "border-t border-white/10" : ""}`}>
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  <p className="text-sm leading-6 text-slate-400">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            <div className="grid gap-5 border-b border-white/10 bg-white/[0.025] p-5 lg:grid-cols-[0.36fr_0.64fr] lg:items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/70">{copyText(usageRightsIntro?.eyebrow, content.usageRightsIntro.eyebrow!)}</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{copyText(usageRightsIntro?.title, content.usageRightsIntro.title!)}</h3>
              </div>
              <p className="text-sm leading-6 text-slate-300">
                {copyText(usageRightsIntro?.body, content.usageRightsIntro.body!)}
              </p>
            </div>
            {resolvedUsageRights.map((item, index) => (
              <div key={item.key} className={`grid gap-3 p-5 md:grid-cols-[0.28fr_0.72fr] ${index > 0 ? "border-t border-white/10" : ""}`}>
                <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                <p className="text-sm leading-6 text-slate-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={copyText(operatingModel?.eyebrow, content.operatingModel.eyebrow!)}
            title={copyText(operatingModel?.title, content.operatingModel.title!)}
            body={copyText(operatingModel?.body, content.operatingModel.body!)}
          />
          <div className="mt-12 rounded-[2rem] border border-white/10 bg-[#07102b]/80 p-5 md:p-7">
            <div className="grid gap-3 lg:grid-cols-5">
              {resolvedFlow.map((step, index) => (
                <article key={step.key} className="relative rounded-2xl border border-white/10 bg-[#030619]/70 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] text-xs font-semibold text-cyan-100">{index + 1}</span>
                    {index < resolvedFlow.length - 1 ? <span className="hidden text-cyan-200/40 lg:block">→</span> : null}
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
            eyebrow={copyText(deliverySection?.eyebrow, content.delivery.eyebrow!)}
            title={copyText(deliverySection?.title, content.delivery.title!)}
            body={copyText(deliverySection?.body, content.delivery.body!)}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {resolvedDelivery.map((item) => (
              <article key={item.key} className="flex min-h-[16rem] flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
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
            eyebrow={copyText(pilotPath?.eyebrow, content.pilotPath.eyebrow!)}
            title={copyText(pilotPath?.title, content.pilotPath.title!)}
            body={copyText(pilotPath?.body, content.pilotPath.body!)}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {resolvedPilotSteps.map((step, index) => (
              <article key={step.key} className="rounded-[1.5rem] border border-cyan-300/25 bg-cyan-300/[0.075] p-5">
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
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">{copyText(finalCta?.eyebrow, content.finalCta.eyebrow!)}</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">{copyText(finalCta?.title, content.finalCta.title!)}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            {copyText(finalCta?.body, content.finalCta.body!)}
          </p>
          <div className="mt-10 flex justify-center">
            <a href={finalPrimaryCta.href} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">{finalPrimaryCta.label}</a>
          </div>
        </div>
      </section>
    </main>
  );
}

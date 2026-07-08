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
import { SLUG, content } from "./copy";

export const metadata: Metadata = {
  title: "Infrastructure Intelligence — Datazag",
  description:
    "Cloud-native cyber intelligence datasets for domains, DNS, certificates, infrastructure, risk, history and relationship analysis.",
};

function FieldName({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-[12px] leading-6 text-slate-300">{children}</span>;
}

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 font-mono text-[11px] text-slate-300">{children}</span>;
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

function DataStackPanel() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-cyan-950/20">
      <div className="rounded-[1.5rem] border border-cyan-300/25 bg-cyan-300/[0.08] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/80">Cloud-native data product</p>
        <h3 className="mt-3 text-2xl font-semibold text-white">Infrastructure intelligence, ready to join.</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">Curated datasets for teams that want enriched domain, DNS, certificate, provider, relationship and risk intelligence in their own environment.</p>
      </div>
      <div className="mx-auto h-8 w-px bg-cyan-300/30" />
      <div className="rounded-[1.5rem] border border-white/10 bg-[#050b22] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Delivery formats</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {["Iceberg", "Delta", "Parquet", "Cloud shares", "Marketplace", "API", "Snapshots", "Deltas"].map((item) => (
            <div key={item} className="rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 text-sm font-semibold text-slate-200">{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CodeBlock() {
  return (
    <pre className="overflow-x-auto rounded-[1.5rem] border border-white/10 bg-[#020512] p-5 text-sm leading-6 text-slate-300"><code>{`SELECT
  logs.domain,
  dz.risk_score,
  dz.threat_band,
  dz.hosting_provider,
  dz.primary_asn,
  dz.related_domain_count,
  dz.reason_codes
FROM security_logs logs
LEFT JOIN datazag.domain_risk dz
  ON logs.domain = dz.domain
WHERE dz.risk_score >= 80;`}</code></pre>
  );
}

export default async function InfrastructureIntelligencePage() {
  const pageCopy = await sanityFetch<MarketingPageCopy>(marketingPageCopyBySlugQuery, { slug: SLUG }, 300);

  const hero = getCopySection(pageCopy, "hero");
  const dataProductValue = getCopySection(pageCopy, "dataProductValue");
  const datasetFamiliesSection = getCopySection(pageCopy, "datasetFamilies");
  const alreadyEngineered = getCopySection(pageCopy, "alreadyEngineered");
  const curatedProducts = getCopySection(pageCopy, "curatedProducts");
  const readyToJoin = getCopySection(pageCopy, "readyToJoin");
  const deliverySection = getCopySection(pageCopy, "delivery");
  const useCasesSection = getCopySection(pageCopy, "useCases");
  const sourceGovernance = getCopySection(pageCopy, "sourceGovernance");
  const evaluate = getCopySection(pageCopy, "evaluate");

  const heroPrimaryCta = copyCta(hero?.primaryCta, content.hero.primaryCta!);
  const heroSecondaryCta = copyCta(hero?.secondaryCta, content.hero.secondaryCta!);
  const governanceCta = copyCta(sourceGovernance?.primaryCta, content.sourceGovernance.primaryCta!);

  const resolvedOutcomes = resolveCopyCards(content.dataProductValue.items!, dataProductValue);
  const resolvedUseCases = resolveCopyCards(content.useCases.items!, useCasesSection);
  const resolvedEvaluationPaths = resolveCopyCards(content.evaluate.items!, evaluate);
  const resolvedSourceAndGovernance = resolveCopyCards(content.sourceGovernance.items!, sourceGovernance);

  const resolvedDatasetFamilies = pickItems(content.datasetFamilies.items!, datasetFamiliesSection).map((f) => {
    const item = getCopyItem(datasetFamiliesSection, f.key);
    return {
      ...f,
      title: copyText(item?.title, f.title!),
      sell: copyText(item?.text, f.text!),
      fields: item?.tags && item.tags.length > 0 ? item.tags : f.tags!,
    };
  });

  const resolvedDataProducts = pickItems(content.curatedProducts.items!, curatedProducts).map((f) => {
    const item = getCopyItem(curatedProducts, f.key);
    return {
      ...f,
      title: copyText(item?.title, f.title!),
      text: copyText(item?.text, f.text!),
      available: copyText(item?.status, f.status!),
    };
  });

  const resolvedWorkDone = pickItems(content.alreadyEngineered.items!, alreadyEngineered).map((f) => {
    const item = getCopyItem(alreadyEngineered, f.key);
    return {
      ...f,
      input: copyText(item?.title, f.title!),
      output: copyText(item?.text, f.text!),
    };
  });

  const resolvedDeliveryRoutes = pickItems(content.delivery.items!, deliverySection).map((f) => {
    const item = getCopyItem(deliverySection, f.key);
    return {
      key: f.key,
      highlight: f.key === "cloud-shares",
      title: copyText(item?.title, f.title!),
      badge: copyText(item?.status, f.status!),
      text: copyText(item?.text, f.text!),
      cta: copyText(item?.cta, f.cta!),
      href: copyText(item?.href, f.href!),
      benefits: item?.tags && item.tags.length > 0 ? item.tags : f.tags,
    };
  });

  const primaryDelivery = resolvedDeliveryRoutes.find((route) => route.highlight) ?? resolvedDeliveryRoutes[0];
  const secondaryDelivery = resolvedDeliveryRoutes.filter((route) => route.key !== primaryDelivery.key);

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
          <DataStackPanel />
        </div>
      </section>

      <section className="border-t border-white/10 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={copyText(dataProductValue?.eyebrow, content.dataProductValue.eyebrow!)}
            title={copyText(dataProductValue?.title, content.dataProductValue.title!)}
            body={copyText(dataProductValue?.body, content.dataProductValue.body!)}
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

      <section id="datasets" className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={copyText(datasetFamiliesSection?.eyebrow, content.datasetFamilies.eyebrow!)}
            title={copyText(datasetFamiliesSection?.title, content.datasetFamilies.title!)}
            body={copyText(datasetFamiliesSection?.body, content.datasetFamilies.body!)}
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            {resolvedDatasetFamilies.map((family, index) => (
              <div key={family.key} className={`grid gap-5 p-5 md:grid-cols-[0.28fr_0.42fr_0.3fr] md:items-start ${index > 0 ? "border-t border-white/10" : ""}`}>
                <h3 className="text-xl font-semibold text-white">{family.title}</h3>
                <p className="text-sm leading-6 text-slate-300">{family.sell}</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                  {family.fields.map((field) => <FieldName key={field}>{field}</FieldName>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={copyText(alreadyEngineered?.eyebrow, content.alreadyEngineered.eyebrow!)}
            title={copyText(alreadyEngineered?.title, content.alreadyEngineered.title!)}
            body={copyText(alreadyEngineered?.body, content.alreadyEngineered.body!)}
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            <div className="hidden grid-cols-[0.45fr_auto_0.55fr] border-b border-white/10 bg-white/[0.035] px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/70 md:grid">
              <div>Traditional input</div>
              <div />
              <div>Datazag output</div>
            </div>
            {resolvedWorkDone.map((row) => (
              <div key={row.key} className="grid gap-3 border-b border-white/10 px-5 py-5 last:border-b-0 md:grid-cols-[0.45fr_auto_0.55fr] md:items-center">
                <div className="text-sm text-slate-400">{row.input}</div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] text-sm text-cyan-100">→</div>
                <div className="text-sm font-semibold leading-6 text-white">{row.output}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={copyText(curatedProducts?.eyebrow, content.curatedProducts.eyebrow!)}
            title={copyText(curatedProducts?.title, content.curatedProducts.title!)}
            body={copyText(curatedProducts?.body, content.curatedProducts.body!)}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {resolvedDataProducts.map((product) => (
              <article key={product.key} className="flex min-h-[16rem] flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-xl font-semibold text-white">{product.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{product.text}</p>
                <p className="mt-auto border-t border-white/10 pt-4 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100/70">{product.available}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={copyText(readyToJoin?.eyebrow, content.readyToJoin.eyebrow!)}
            title={copyText(readyToJoin?.title, content.readyToJoin.title!)}
            body={copyText(readyToJoin?.body, content.readyToJoin.body!)}
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <CodeBlock />
            <div className="rounded-[1.5rem] border border-white/10 bg-[#050b22] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/70">Example output</p>
              <div className="mt-5 grid gap-3">
                {[["risk_score", "94"], ["threat_band", "critical"], ["hosting_provider", "Bulletproof Hosting Ltd"], ["primary_asn", "AS64500"], ["related_domain_count", "15"], ["reason_codes", "new_domain, shared_infra, risky_asn"]].map(([key, value]) => (
                  <div key={key} className="grid grid-cols-[0.45fr_0.55fr] gap-4 border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
                    <code className="text-xs text-cyan-100">{key}</code>
                    <p className="text-sm font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="delivery" className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={copyText(deliverySection?.eyebrow, content.delivery.eyebrow!)}
            title={copyText(deliverySection?.title, content.delivery.title!)}
            body={copyText(deliverySection?.body, content.delivery.body!)}
          />
          <div className="mt-12 rounded-[2rem] border border-cyan-300/25 bg-cyan-300/[0.075] p-6 md:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/80">{primaryDelivery.badge}</p>
                <h3 className="mt-3 text-3xl font-semibold text-white md:text-4xl">{primaryDelivery.title}</h3>
                <p className="mt-4 text-base leading-7 text-slate-300">{primaryDelivery.text}</p>
                <a href={primaryDelivery.href} className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-cyan-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">{primaryDelivery.cta}</a>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {(primaryDelivery.benefits ?? []).map((benefit) => (
                  <div key={benefit} className="rounded-xl border border-cyan-300/20 bg-[#030619]/70 px-4 py-3 text-sm font-semibold text-cyan-50">{benefit}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {secondaryDelivery.map((route) => (
              <article key={route.key} className="flex min-h-[15rem] flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/70">{route.badge}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{route.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{route.text}</p>
                <a href={route.href} className="mt-auto pt-5 text-sm font-semibold text-cyan-100 hover:text-white">{route.cta} →</a>
              </article>
            ))}
          </div>
          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/70">Supported formats and destinations</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Iceberg", "Delta", "Parquet", "Snowflake", "Databricks", "Azure", "AWS", "Google Cloud", "JSON API"].map((format) => <Pill key={format}>{format}</Pill>)}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={copyText(useCasesSection?.eyebrow, content.useCases.eyebrow!)}
            title={copyText(useCasesSection?.title, content.useCases.title!)}
            body={copyText(useCasesSection?.body, content.useCases.body!)}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {resolvedUseCases.map((useCase) => (
              <article key={useCase.key} className="flex min-h-[14rem] flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-xl font-semibold text-white">{useCase.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{useCase.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={copyText(sourceGovernance?.eyebrow, content.sourceGovernance.eyebrow!)}
            title={copyText(sourceGovernance?.title, content.sourceGovernance.title!)}
            body={copyText(sourceGovernance?.body, content.sourceGovernance.body!)}
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            {resolvedSourceAndGovernance.map((row, index) => (
              <div key={row.key} className={`grid gap-3 p-5 md:grid-cols-[0.28fr_0.72fr] ${index > 0 ? "border-t border-white/10" : ""}`}>
                <h3 className="text-sm font-semibold text-white">{row.title}</h3>
                <p className="text-sm leading-6 text-slate-400">{row.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <a href={governanceCta.href} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">{governanceCta.label}</a>
          </div>
        </div>
      </section>

      <section id="evaluate" className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={copyText(evaluate?.eyebrow, content.evaluate.eyebrow!)}
            title={copyText(evaluate?.title, content.evaluate.title!)}
            body={copyText(evaluate?.body, content.evaluate.body!)}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {resolvedEvaluationPaths.map((path) => (
              <article key={path.key} className="flex min-h-[15rem] flex-col rounded-[1.5rem] border border-cyan-300/25 bg-cyan-300/[0.075] p-5">
                <h3 className="text-xl font-semibold text-white">{path.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{path.text}</p>
                <a href="/contact" className="mt-auto inline-flex min-h-11 items-center justify-center rounded-xl bg-cyan-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Start here</a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

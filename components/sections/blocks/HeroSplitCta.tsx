"use client";
import React from "react";
import type { SectionHeroSplitCta } from "@/sanity/types";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Button } from "@/components/ui/button";
import { DataDictionaryModal } from "@/components/ui/DataDictionaryModal";
import { Sparkles, ShieldCheck, FileText } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

function hasSanityAsset(image: SectionHeroSplitCta["image"]) {
  return typeof image === "object" && image !== null && "asset" in image && Boolean(image.asset);
}

export function HeroSplitCta(props: SectionHeroSplitCta) {
  const { eyebrow, headline, subheadline, badge, primaryCta, secondaryCta, dataDictionary } = props;
  const hasPrimary = !!(primaryCta && primaryCta.label && primaryCta.href)
  const hasSecondary = !!(secondaryCta && secondaryCta.label && secondaryCta.href)
  const hasHeroImage = hasSanityAsset(props.image);
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      {/* Background */}
      <Container>
        <div className="relative py-20">
          {/* Eyebrow pill */}
          {eyebrow ? (
            <div className="flex justify-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/80 px-4 py-1.5 text-xs font-medium text-slate-300 shadow-sm backdrop-blur">
                <Sparkles className="h-4 w-4 text-blue-600" />
                {eyebrow}
              </p>
            </div>
          ) : null}
          {/* Headline */}
          <h1 className="mx-auto mt-6 max-w-4xl text-center text-5xl font-semibold tracking-tight text-white">
            <span className="relative inline-block">
              {headline}
              {/* subtle underline accent */}
              <span className="pointer-events-none absolute -bottom-2 left-1/2 h-2 w-[92%] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600/20 via-blue-500/20 to-cyan-400/20" />
            </span>
          </h1>
          {/* Subheadline */}
          {subheadline ? (
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-slate-300">
              {subheadline}
            </p>
          ) : null}
          {/* Optional Image */}
          {hasHeroImage && props.image ? (
            <div className="mt-8 max-w-4xl mx-auto px-4">
              <Image
                src={urlFor(props.image).url()}
                alt="Hero Image"
                width={1000}
                height={500}
                className="w-full h-auto rounded-xl shadow-xl border border-white/10"
                priority
              />
            </div>
          ) : null}
          {/* Badge / trust line */}
          {badge ? (
            <div className="mx-auto mt-6 flex max-w-2xl justify-center">
              <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950 px-4 py-2 text-sm font-medium text-slate-300 shadow-sm">
                <ShieldCheck className="h-4 w-4 text-blue-600" />
                {badge}
              </div>
            </div>
          ) : null}
          {/* CTAs */}
          {/* CTAs */}
          {(hasPrimary || hasSecondary || dataDictionary?.enabled) ? (
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {hasPrimary ? (
                <ButtonLink href={primaryCta!.href} variant={primaryCta!.variant ?? "primary"} size="lg">
                  {primaryCta!.label}
                </ButtonLink>
              ) : null}
              {hasSecondary ? (
                <ButtonLink href={secondaryCta!.href} variant={secondaryCta!.variant ?? "secondary"} size="lg">
                  {secondaryCta!.label}
                </ButtonLink>
              ) : null}
              {dataDictionary?.enabled ? (
                <DataDictionaryModal
                  title={dataDictionary.title}
                  description={dataDictionary.description}
                  csvUrl={dataDictionary.csvFile?.asset?.url}
                  trigger={
                    <Button variant="secondary" size="lg">
                      <FileText className="mr-2 h-4 w-4" />
                      {dataDictionary.buttonText || "View Data Dictionary"}
                    </Button>
                  }
                />
              ) : null}
            </div>
          ) : null}
          {/* Optional “micro proof” row (safe, non-claimy) */}
          <div className="mt-10 flex flex-wrap justify-center gap-2 text-xs text-slate-400">
            <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 backdrop-blur">
              Explainable risk factors
            </span>
            <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 backdrop-blur">
              Designed to reduce noise
            </span>
            <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 backdrop-blur">
              API, feeds & webhooks
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}

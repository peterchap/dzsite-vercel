import React from "react";
import { SectionFinalCta } from "@/sanity/types";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowRight, ShieldCheck } from "lucide-react";
export function FinalCta({ headline, subheadline, primaryCta, secondaryCta, isDark, ...rest }: any) {
  const title = headline ?? rest?.title
  const subtitle = subheadline ?? rest?.subtitle
  return (
    <section className={`relative overflow-hidden py-12 ${'bg-slate-950'}`}>
      {/* background */}
      <div className={`absolute inset-0 ${'bg-slate-950'}`} />
      <Container>
        <div className="relative py-20">
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-slate-950/80 p-10 text-center shadow-sm backdrop-blur">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950 px-4 py-1.5 text-xs font-medium text-slate-300 shadow-sm">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              Built for security and trust teams
            </div>
            <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-semibold tracking-tight text-white">
              {title}
            </h2>
            {subtitle ? (
              <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">{subtitle}</p>
            ) : null}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href={primaryCta.href} variant={primaryCta.variant ?? "primary"} size="lg">
                {primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              {secondaryCta ? (
                <ButtonLink href={secondaryCta.href} variant={secondaryCta.variant ?? "secondary"} size="lg">
                  {secondaryCta.label}
                </ButtonLink>
              ) : null}
            </div>
            <p className="mx-auto mt-6 max-w-3xl text-xs text-slate-400">
              Transparent pricing, explainable signals, and flexible delivery via API, feeds, or webhooks.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

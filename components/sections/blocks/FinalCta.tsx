import React from "react";
import { SectionFinalCta } from "@/sanity/types";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function FinalCta({ headline, subheadline, primaryCta, secondaryCta, isDark, ...rest }: any) {
  const title = headline ?? rest?.title
  const subtitle = subheadline ?? rest?.subtitle
  return (
    <section className={`relative overflow-hidden py-24 ${isDark ? 'bg-slate-50' : 'bg-white'}`}>
      {/* background */}
      <div className={`absolute inset-0 ${isDark ? 'bg-slate-50' : 'bg-white'}`} />
      <div className="absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-200/30 blur-3xl" />

      <Container>
        <div className="relative py-20">
          <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white/80 p-10 text-center shadow-sm backdrop-blur">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-700 shadow-sm">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              Built for security and trust teams
            </div>

            <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-semibold tracking-tight text-slate-900">
              {title}
            </h2>

            {subtitle ? (
              <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">{subtitle}</p>
            ) : null}

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href={primaryCta.href} variant={primaryCta.variant ?? "primary"}>
                {primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>

              {secondaryCta ? (
                <ButtonLink href={secondaryCta.href} variant={secondaryCta.variant ?? "secondary"}>
                  {secondaryCta.label}
                </ButtonLink>
              ) : null}
            </div>

            <p className="mx-auto mt-6 max-w-3xl text-xs text-slate-500">
              Transparent pricing, explainable signals, and flexible delivery via API, feeds, or webhooks.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}


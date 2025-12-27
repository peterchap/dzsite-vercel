import React from "react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";

interface CtaBannerProps {
    isDark?: boolean;
    headline?: string;
    subheadline?: string;
    primaryCta?: {
        label?: string;
        href?: string;
        variant?: string;
    };
    secondaryCta?: {
        label?: string;
        href?: string;
        variant?: string;
    };
    supportingText?: string;
}

export default function CtaBanner({
    isDark,
    headline,
    subheadline,
    primaryCta,
    secondaryCta,
    supportingText,
}: CtaBannerProps) {
    return (
        <section className={`py-24 ${isDark ? "bg-slate-50" : "bg-white"}`}>
            <Container>
                <div className="overflow-hidden rounded-[2.5rem] bg-slate-900 px-8 py-16 text-center shadow-2xl md:px-16 md:py-20 relative">
                    {/* Decorative background gradients */}
                    <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-[100px]" />
                    <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-blue-600/20 blur-[100px]" />

                    <div className="relative z-10 mx-auto max-w-3xl">
                        {headline && (
                            <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
                                {headline}
                            </h2>
                        )}
                        {subheadline && (
                            <p className="mb-10 text-lg text-slate-400 md:text-xl">
                                {subheadline}
                            </p>
                        )}

                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            {primaryCta && (
                                <ButtonLink href={primaryCta.href || "#"} variant={primaryCta.variant as any || "primary"} className="h-14 px-8 text-lg">
                                    {primaryCta.label}
                                </ButtonLink>
                            )}
                            {secondaryCta && (
                                <ButtonLink href={secondaryCta.href || "#"} variant={secondaryCta.variant as any || "secondary"} className="h-14 px-8 text-lg border-white/20 text-white hover:bg-white/10">
                                    {secondaryCta.label}
                                </ButtonLink>
                            )}
                        </div>

                        {supportingText && (
                            <p className="mt-8 text-sm text-slate-500">
                                {supportingText}
                            </p>
                        )}
                    </div>
                </div>
            </Container>
        </section>
    );
}

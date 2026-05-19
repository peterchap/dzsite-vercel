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
        <section className={`py-12 ${"bg-slate-950"}`}>
            <Container>
                <div className="overflow-hidden rounded-[2.5rem] bg-slate-950 px-8 py-16 text-center shadow-2xl md:px-16 md:py-20 relative">
                    {/* Decorative background gradients */}
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
                            {primaryCta && (() => {
                                const v = (primaryCta.variant || "primary").toLowerCase();
                                const safeVariant: "primary" | "secondary" | "ghost" =
                                    v === "outline" ? "secondary" : (v === "primary" || v === "secondary" || v === "ghost" ? (v as any) : "primary");
                                return (
                                    <ButtonLink href={primaryCta.href || "#"} variant={safeVariant} size="lg">
                                        {primaryCta.label}
                                    </ButtonLink>
                                );
                            })()}
                            {secondaryCta && (() => {
                                const v = (secondaryCta.variant || "secondary").toLowerCase();
                                const safeVariant: "primary" | "secondary" | "ghost" =
                                    v === "outline" ? "secondary" : (v === "primary" || v === "secondary" || v === "ghost" ? (v as any) : "secondary");
                                return (
                                    <ButtonLink
                                        href={secondaryCta.href || "#"}
                                        variant={safeVariant}
                                        size="lg"
                                        className="border-white/20 text-white hover:bg-slate-950/10"
                                    >
                                        {secondaryCta.label}
                                    </ButtonLink>
                                );
                            })()}
                        </div>
                        {supportingText && (
                            <p className="mt-8 text-sm text-slate-400">
                                {supportingText}
                            </p>
                        )}
                    </div>
                </div>
            </Container>
        </section>
    );
}

import React from "react";
import { Container } from "@/components/ui/Container";
import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";

interface PricingOverviewProps {
    isDark?: boolean;
    title?: string;
    tiers?: {
        name?: string;
        price?: string;
        subtitle?: string;
        features?: string[];
        cta?: {
            label?: string;
            href?: string;
            variant?: string;
        };
    }[];
}

export default function PricingOverview({ isDark, title, tiers }: PricingOverviewProps) {
    return (
        <section className={`py-24 ${isDark ? "bg-slate-50" : "bg-white"}`}>
            <Container>
                {title && (
                    <h2 className="mb-16 text-center text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                        {title}
                    </h2>
                )}
                <div className="flex flex-wrap justify-center gap-8">
                    {tiers?.map((tier, i) => {
                        const isMainHighlighted = tiers.length === 3 && i === 1;
                        const isEnterpriseHighlighted = tiers.length === 4 && i === 3;
                        const isHighlighted = isMainHighlighted || isEnterpriseHighlighted;

                        return (
                            <div
                                key={i}
                                className={`flex flex-col w-full md:w-[calc(50%-2rem)] lg:w-[calc(25%-2rem)] max-w-sm p-8 rounded-3xl border transition-all duration-300 ${isHighlighted
                                    ? "border-blue-500 bg-white shadow-xl lg:scale-105 z-10"
                                    : "border-slate-200 bg-white shadow-sm hover:border-blue-200"
                                    }`}
                            >
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-center text-slate-900">{tier.name}</h3>
                                    <h3 className="mt-3 text-xl font-bold text-center text-slate-700">{tier.price}</h3>

                                    {tier.subtitle && <p className="mt-2 text-center text-sm text-slate-500">{tier.subtitle}</p>}
                                </div>
                                <ul className="mb-10 space-y-4 flex-1">
                                    {tier.features?.map((f, j) => (
                                        <li key={j} className="flex items-start gap-3 text-sm text-slate-600">
                                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                {tier.cta && (
                                    <ButtonLink
                                        href={tier.cta.href || "#"}
                                        variant={(tier.cta.variant as any) || (i === 1 ? "primary" : "secondary")}
                                        className="w-full justify-center"
                                    >
                                        {tier.cta.label || "Get Started"}
                                    </ButtonLink>
                                )}
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}

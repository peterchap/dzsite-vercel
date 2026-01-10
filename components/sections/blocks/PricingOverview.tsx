import React from "react";
import { Container } from "@/components/ui/Container";
import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { useCurrency } from "@/components/providers/CurrencyProvider";

interface PricingOverviewProps {
    isDark?: boolean;
    title?: string;
    subtitle?: string;
    description?: string;
    footer?: string;
    tiers?: {
        name?: string;
        priceInCents?: number;
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

export default function PricingOverview({ isDark, title, subtitle, description, footer, tiers }: PricingOverviewProps) {
    const { formatPrice } = useCurrency();

    return (
        <section className={`py-12 ${isDark ? "bg-slate-50" : "bg-white"}`}>
            <Container>
                <div className="mb-16 text-center">
                    {title && (
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                            {title}
                        </h2>
                    )}
                    {subtitle && <p className="mt-4 text-lg font-medium text-blue-600">{subtitle}</p>}
                </div>

                {description && (
                    <p className="mb-12 text-center mx-auto max-w-2xl text-lg text-slate-600">
                        {description}
                    </p>
                )}

                <div className="flex flex-wrap justify-center gap-8">
                    {tiers?.map((tier, i) => {
                        const isMainHighlighted = tiers.length === 3 && i === 1;
                        const isEnterpriseHighlighted = tiers.length === 4 && i === 3;
                        const isHighlighted = isMainHighlighted || isEnterpriseHighlighted;

                        const displayPrice = tier.priceInCents
                            ? formatPrice(tier.priceInCents)
                            : tier.price;

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
                                    <div className="mt-4 flex flex-col items-center">
                                        <span className="text-sm text-center font-bold text-slate-700">{displayPrice}</span>
                                        {tier.priceInCents ? <span className="mt-1 text-sm text-slate-700">per month</span> : null}
                                    </div>

                                    {tier.subtitle && <p className="mt-4 text-center text-sm text-slate-500">{tier.subtitle}</p>}
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
                                        size="lg"
                                        className="w-full justify-center"
                                    >
                                        {tier.cta.label || "Get Started"}
                                    </ButtonLink>
                                )}
                            </div>
                        );
                    })}
                </div>
                {footer && (
                    <div className="mt-16 pt-8 border-t border-slate-100 text-center mx-auto max-w-2xl">
                        <p className="text-base text-slate-500 leading-relaxed italic">
                            {footer}
                        </p>
                    </div>
                )}
            </Container>
        </section>
    );
}

"use client";
import React from "react";
import { Container } from "@/components/ui/Container";
import { Check, X, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
interface PricingTier {
    name: string;
    subtitle?: string;
    priceLabel?: string;
    cta?: {
        label: string;
        href: string;
        variant?: "primary" | "secondary" | "ghost";
    };
}
interface FeatureRow {
    label?: string;
    cells: string[];
}
interface FeatureSection {
    title: string;
    rows: FeatureRow[];
}
interface PricingTableProps {
    isDark?: boolean;
    title?: string;
    subtitle?: string;
    tiers: PricingTier[];
    sections: FeatureSection[];
}
export default function PricingTable({ isDark, title, subtitle, tiers, sections }: PricingTableProps) {
    const tierCount = tiers?.length || 0;
    return (
        <section className={`py-12 ${"bg-slate-950"}`}>
            <Container>
                <div className="mb-16 text-center max-w-3xl mx-auto">
                    {title && (
                        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                            {title}
                        </h2>
                    )}
                    {subtitle && <p className="mt-4 text-lg text-slate-300 leading-relaxed">{subtitle}</p>}
                </div>
                <div className="relative overflow-x-auto rounded-2xl border border-white/10 bg-slate-950 shadow-sm ring-1 ring-slate-200">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="border-b border-white/10 divide-x divide-white/10">
                                <th className="sticky left-0 z-10 bg-white/5/80 backdrop-blur p-6 align-bottom w-1/4 min-w-[200px]">
                                    <div className="flex items-center gap-2 text-blue-600 font-bold text-sm tracking-wider uppercase">
                                        <ShieldCheck className="h-4 w-4" />
                                        <span>Plan Features</span>
                                    </div>
                                </th>
                                {tiers?.map((tier, i) => (
                                    <th key={i} className="p-8 text-center align-top bg-slate-950 min-w-[250px]">
                                        <div className="flex flex-col items-center">
                                            <span className="text-xl font-bold text-white leading-tight">
                                                {tier.name}
                                            </span>
                                            {tier.subtitle && (
                                                <span className="mt-2 text-sm text-slate-400 font-normal leading-snug">
                                                    {tier.subtitle}
                                                </span>
                                            )}
                                            {tier.priceLabel && (
                                                <div className="mt-4 py-1.5 px-3 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest ring-1 ring-blue-100">
                                                    {tier.priceLabel}
                                                </div>
                                            )}
                                            {tier.cta && tier.cta.label && (
                                                <div className="mt-6 w-full">
                                                    <ButtonLink
                                                        href={tier.cta.href || "#"}
                                                        variant={(tier.cta.variant as any) || (i === 1 ? "primary" : "secondary")}
                                                        size="sm"
                                                        className="w-full justify-center shadow-sm"
                                                    >
                                                        {tier.cta.label}
                                                    </ButtonLink>
                                                </div>
                                            )}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {sections?.map((section, idx) => (
                                <React.Fragment key={idx}>
                                    {/* Category Header Row */}
                                    <tr className="bg-white/5/40">
                                        <td
                                            colSpan={tierCount + 1}
                                            className="p-4 px-6 text-xs font-bold text-white uppercase tracking-widest border-y border-white/10 mt-4 first:mt-0"
                                        >
                                            {section.title}
                                        </td>
                                    </tr>
                                    {section.rows?.map((row, rIdx) => (
                                        <tr
                                            key={rIdx}
                                            className="divide-x divide-white/10 hover:bg-white/5/30 transition-colors"
                                        >
                                            <td className="sticky left-0 bg-slate-950/95 backdrop-blur z-10 p-4 px-6 text-sm text-slate-300 font-medium">
                                                {row.label}
                                            </td>
                                            {row.cells?.map((cell, cIdx) => (
                                                <td key={cIdx} className="p-4 text-center text-sm text-slate-300 leading-relaxed">
                                                    {cell === "✅" ? (
                                                        <div className="flex justify-center">
                                                            <Check className="h-5 w-5 text-green-500 drop-shadow-sm" />
                                                        </div>
                                                    ) : cell === "❌" ? (
                                                        <div className="flex justify-center">
                                                            <X className="h-5 w-5 text-slate-300" />
                                                        </div>
                                                    ) : (
                                                        <span className="font-medium text-slate-300">{cell}</span>
                                                    )}
                                                </td>
                                            ))}
                                            {/* Pad cells if there are fewer than tier count */}
                                            {Array.from({ length: Math.max(0, tierCount - (row.cells?.length || 0)) }).map((_, i) => (
                                                <td key={`pad-${i}`} className="p-4" />
                                            ))}
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-12 flex items-center justify-center gap-6 text-sm text-slate-400">
                    <div className="flex items-center gap-1.5">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Standard Feature</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="block h-1.5 w-1.5 rounded-full bg-slate-300" />
                        <span>Feature not included</span>
                    </div>
                </div>
            </Container>
        </section>
    );
}

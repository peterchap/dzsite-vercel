"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { ShieldAlert, ScanSearch, Info, CheckCircle2 } from "lucide-react";

interface DetectionCardProps {
    _key: string;
    title: string;
    whatWeDetect?: string[];
    whyItMatters?: string;
    detectionMethods?: string[];
}

interface DetectionGridProps {
    title?: string;
    subtitle?: string;
    columns?: number;
    cards?: DetectionCardProps[];
    anchor?: string;
    isDark?: boolean;
}

export default function DetectionGrid({
    title,
    subtitle,
    columns = 2,
    cards,
    anchor,
    isDark = false,
}: DetectionGridProps) {
    if (!cards || cards.length === 0) return null;

    return (
        <section
            id={anchor}
            className={`py-24 ${isDark ? "bg-slate-50" : "bg-white"}`}
        >
            <Container>
                <div className="mb-16 max-w-3xl mx-auto text-center">
                    {title && (
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                            {title}
                        </h2>
                    )}
                    {subtitle && (
                        <p className="mt-4 text-lg leading-relaxed text-slate-600">
                            {subtitle}
                        </p>
                    )}
                </div>

                <div
                    className="grid gap-8"
                    style={{
                        gridTemplateColumns: `repeat(auto-fit, minmax(350px, 1fr))`,
                    }}
                >
                    {cards.map((card) => (
                        <div
                            key={card._key}
                            className="flex flex-col rounded-2xl p-8 border border-slate-200 bg-white hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50/50 transition-all duration-300"
                        >
                            {/* Header */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                            </div>

                            {/* Grid Content */}
                            <div className="flex-1 grid gap-8 sm:grid-cols-2">
                                {/* Left Column: What we detect & Why it matters */}
                                <div className="flex flex-col gap-8">
                                    {/* What we detect */}
                                    {card.whatWeDetect && card.whatWeDetect.length > 0 && (
                                        <div>
                                            <h4 className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2 text-slate-500">
                                                <ShieldAlert className="w-4 h-4" /> What we detect
                                            </h4>
                                            <ul className="space-y-2">
                                                {card.whatWeDetect.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm">
                                                        <div className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500" />
                                                        <span className="text-slate-700">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Why it matters */}
                                    {card.whyItMatters && (
                                        <div>
                                            <h4 className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2 text-slate-500">
                                                <Info className="w-4 h-4" /> Why it matters
                                            </h4>
                                            <p className="text-sm leading-relaxed text-slate-600">
                                                {card.whyItMatters}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Right Column: Detection Methods */}
                                <div>
                                    {card.detectionMethods && card.detectionMethods.length > 0 && (
                                        <div className="h-full rounded-xl p-6 bg-slate-900 border border-slate-800 shadow-sm">
                                            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2 text-blue-400">
                                                <ScanSearch className="w-4 h-4" /> Detection Methods
                                            </h4>
                                            <ul className="space-y-3">
                                                {card.detectionMethods.map((method, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm">
                                                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-500" />
                                                        <span className="font-medium text-slate-200">
                                                            {method}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

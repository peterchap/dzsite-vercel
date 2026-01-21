"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Check, Shield, Users, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PricingDetails {
    title?: string;
    price?: string;
    originalPrice?: string;
    savings?: string;
    details?: string[];
}

interface SegmentItem {
    _key: string;
    title: string;
    badge?: string;
    idealFor?: string[];
    deployFeatures?: string[];
    pricing?: PricingDetails;
    cta?: {
        text: string;
        url: string;
    };
}

interface WhoShouldApplyProps {
    title: string;
    subtitle?: string;
    layout?: "tabs" | "cards";
    items?: SegmentItem[];
    anchor?: string;
    isDark?: boolean;
}

export default function WhoShouldApply({
    title,
    subtitle,
    layout = "tabs",
    items,
    anchor,
    isDark = false,
}: WhoShouldApplyProps) {
    const [activeTab, setActiveTab] = useState(0);

    if (!items || items.length === 0) return null;

    return (
        <section
            id={anchor}
            className={`py-24 ${isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}`}
        >
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className={`mt-4 text-lg leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                            {subtitle}
                        </p>
                    )}
                </div>

                {layout === "tabs" ? (
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                        {/* Tabs Navigation */}
                        <div className="flex flex-col gap-2 lg:w-1/3">
                            {items.map((item, index) => (
                                <button
                                    key={item._key}
                                    onClick={() => setActiveTab(index)}
                                    className={`text-left p-6 rounded-xl transition-all duration-200 border-2 group relative overflow-hidden ${activeTab === index
                                            ? isDark
                                                ? "border-blue-500 bg-blue-500/10"
                                                : "border-blue-600 bg-blue-50"
                                            : isDark
                                                ? "border-slate-800 hover:border-slate-700 bg-slate-900"
                                                : "border-slate-100 hover:border-slate-200 bg-white"
                                        }`}
                                >
                                    <div className="relative z-10 flex items-center justify-between">
                                        <div>
                                            <h3 className={`font-bold text-lg ${activeTab === index
                                                    ? isDark ? "text-blue-400" : "text-blue-700"
                                                    : isDark ? "text-slate-300" : "text-slate-700"
                                                }`}>
                                                {item.title}
                                            </h3>
                                            {item.badge && (
                                                <span className={`inline-block mt-2 text-xs font-semibold px-2 py-0.5 rounded-full ${activeTab === index
                                                        ? "bg-blue-100 text-blue-700"
                                                        : "bg-slate-100 text-slate-600"
                                                    }`}>
                                                    {item.badge}
                                                </span>
                                            )}
                                        </div>
                                        {activeTab === index && (
                                            <ArrowRight className={`w-5 h-5 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="lg:w-2/3">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className={`rounded-2xl p-8 border ${isDark
                                            ? "bg-slate-800/50 border-slate-700"
                                            : "bg-white border-slate-200 shadow-xl shadow-slate-200/50"
                                        }`}
                                >
                                    <ContentCard item={items[activeTab]} isDark={isDark} />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {items.map((item) => (
                            <div
                                key={item._key}
                                className={`flex flex-col rounded-2xl p-6 border transition-all hover:shadow-lg ${isDark
                                        ? "bg-slate-800/50 border-slate-700 hover:border-slate-600"
                                        : "bg-white border-slate-200 shadow-sm hover:border-blue-200 hover:shadow-blue-100/50"
                                    }`}
                            >
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                    {item.badge && (
                                        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                                            {item.badge}
                                        </span>
                                    )}
                                </div>
                                <ContentCard item={item} isDark={isDark} isCardView />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </section>
    );
}

function ContentCard({ item, isDark, isCardView = false }: { item: SegmentItem; isDark: boolean; isCardView?: boolean }) {
    return (
        <div className={`space-y-8 ${isCardView ? "flex-1 flex flex-col" : ""}`}>
            {/* Ideal For */}
            <div>
                <h4 className={`text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${isDark ? "text-slate-400" : "text-slate-500"
                    }`}>
                    <Users className="w-4 h-4" /> Ideal For
                </h4>
                <ul className="space-y-3">
                    {item.idealFor?.map((text, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                            <div className={`mt-0.5 rounded-full p-0.5 ${isDark ? "bg-slate-700 text-slate-300" : "bg-slate-100 text-slate-600"
                                }`}>
                                <Check className="w-3 h-3" />
                            </div>
                            <span className={isDark ? "text-slate-300" : "text-slate-700"}>{text}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={`w-full h-px ${isDark ? "bg-slate-700" : "bg-slate-100"}`} />

            {/* What You'll Deploy */}
            <div className={isCardView ? "flex-1" : ""}>
                <h4 className={`text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${isDark ? "text-slate-400" : "text-slate-500"
                    }`}>
                    <Shield className="w-4 h-4" /> What You'll Deploy
                </h4>
                <ul className="space-y-3">
                    {item.deployFeatures?.map((text, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                            <div className={`mt-0.5 rounded-full p-0.5 ${isDark ? "bg-blue-900/30 text-blue-400" : "bg-blue-50 text-blue-600"
                                }`}>
                                <Check className="w-3 h-3" />
                            </div>
                            <span className={isDark ? "text-slate-300" : "text-slate-700"}>{text}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Pricing Box */}
            {item.pricing && (
                <div className={`rounded-xl p-6 ${isDark
                        ? "bg-slate-900 border border-slate-700"
                        : "bg-slate-50 border border-slate-200"
                    } ${isCardView ? "mt-auto" : ""}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div>
                            <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${isDark ? "text-slate-500" : "text-slate-500"
                                }`}>
                                {item.pricing.title}
                            </p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold">{item.pricing.price}</span>
                                {item.pricing.originalPrice && (
                                    <span className={`text-sm line-through ${isDark ? "text-slate-500" : "text-slate-400"
                                        }`}>
                                        {item.pricing.originalPrice}
                                    </span>
                                )}
                            </div>
                        </div>
                        {item.pricing.savings && (
                            <div className={`text-sm font-semibold px-3 py-1 rounded-full self-start ${isDark ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-700"
                                }`}>
                                {item.pricing.savings}
                            </div>
                        )}
                    </div>

                    {item.cta && (
                        <ButtonLink
                            href={item.cta.url}
                            variant="primary"
                            className="w-full justify-center"
                        >
                            {item.cta.text}
                        </ButtonLink>
                    )}
                </div>
            )}
        </div>
    );
}

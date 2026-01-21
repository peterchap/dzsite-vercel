import React from "react";
import { Container } from "@/components/ui/Container";
import { Check } from "lucide-react";
import { PortableText } from "next-sanity";

interface ComparisonColumn {
    _key: string;
    heading: string;
    isHighlight?: boolean;
    features?: string[];
}

interface ComparisonTableProps {
    title: string;
    description?: any;
    columns?: ComparisonColumn[];
    footer?: string;
    anchor?: string;
    isDark?: boolean;
}

export default function ComparisonTable({
    title,
    description,
    columns,
    footer,
    anchor,
    isDark = false,
}: ComparisonTableProps) {
    if (!columns || columns.length === 0) return null;

    return (
        <section
            id={anchor}
            className={`py-24 ${isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}`}
        >
            <Container>
                {/* Header */}
                <div className="mb-16 max-w-3xl mx-auto text-center space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                        {title}
                    </h2>
                    {description && (
                        <div className={`text-lg leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                            <PortableText value={description} />
                        </div>
                    )}
                </div>

                {/* Grid */}
                <div className={`grid gap-8 md:grid-cols-${columns.length <= 4 ? columns.length : 3} max-w-6xl mx-auto`}>
                    {columns.map((col) => (
                        <div
                            key={col._key}
                            className={`flex flex-col p-8 rounded-2xl border transition-all duration-300 ${col.isHighlight
                                    ? isDark
                                        ? "bg-blue-900/20 border-blue-500 shadow-xl shadow-blue-900/20 relative overflow-hidden"
                                        : "bg-blue-50 border-blue-200 shadow-xl shadow-blue-100 relative overflow-hidden"
                                    : isDark
                                        ? "bg-slate-800/50 border-slate-700"
                                        : "bg-white border-slate-200 shadow-sm"
                                }`}
                        >
                            {col.isHighlight && (
                                <div className={`absolute top-0 inset-x-0 h-1.5 ${isDark ? "bg-blue-500" : "bg-blue-600"}`} />
                            )}

                            <h3 className={`text-xl font-bold mb-6 ${col.isHighlight
                                    ? isDark ? "text-blue-400" : "text-blue-700"
                                    : "inherit"
                                }`}>
                                {col.heading}
                            </h3>

                            <ul className="space-y-4 flex-1">
                                {col.features?.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <div className={`mt-0.5 rounded-full p-0.5 shrink-0 ${col.isHighlight
                                                ? isDark ? "bg-blue-500 text-white" : "bg-blue-600 text-white"
                                                : isDark ? "bg-slate-700 text-slate-400" : "bg-slate-100 text-slate-500"
                                            }`}>
                                            <Check className="w-3 h-3" />
                                        </div>
                                        <span className={`text-sm ${isDark ? "text-slate-300" : "text-slate-600"
                                            }`}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                {footer && (
                    <div className={`mt-12 text-center text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                        {footer}
                    </div>
                )}
            </Container>
        </section>
    );
}

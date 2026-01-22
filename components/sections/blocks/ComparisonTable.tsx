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
            className={`py-24 ${isDark ? "bg-slate-50" : "bg-white"}`}
        >
            <Container>
                {/* Header */}
                <div className="mb-16 max-w-3xl mx-auto text-center space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                        {title}
                    </h2>
                    {description && (
                        <div className="text-lg leading-relaxed text-slate-600">
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
                                ? "bg-white border-blue-500 shadow-xl relative overflow-hidden z-10 scale-105"
                                : "bg-white border-slate-200 shadow-sm hover:border-blue-200"
                                }`}
                        >
                            {col.isHighlight && (
                                <div className="absolute top-0 inset-x-0 h-1.5 bg-blue-500" />
                            )}

                            <h3 className={`text-xl font-bold mb-6 ${col.isHighlight ? "text-blue-600" : "text-slate-900"}`}>
                                {col.heading}
                            </h3>

                            <ul className="space-y-4 flex-1">
                                {col.features?.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <div className={`mt-0.5 rounded-full p-0.5 shrink-0 ${col.isHighlight
                                            ? "bg-blue-100 text-blue-600"
                                            : "bg-slate-100 text-slate-500"
                                            }`}>
                                            <Check className="w-3 h-3" />
                                        </div>
                                        <span className="text-sm text-slate-600">
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
                    <div className="mt-12 text-center text-sm text-slate-500">
                        {footer}
                    </div>
                )}
            </Container>
        </section>
    );
}

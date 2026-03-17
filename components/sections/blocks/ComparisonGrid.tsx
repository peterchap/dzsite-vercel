import React from "react";
import { Container } from "@/components/ui/Container";
import { PortableText } from "next-sanity";
import { Check, X } from "lucide-react";

interface ComparisonRow {
    _key: string;
    col1: string;
    col2: string;
}

interface ComparisonGridProps {
    anchor?: string;
    kicker?: string;
    title: string;
    alignment?: "left" | "center" | "right";
    subtitle?: string;
    description?: any;
    tableTitle?: string;
    column1Title?: string;
    column2Title?: string;
    rows?: ComparisonRow[];
    secondarySubtitle?: string;
    secondaryDescription?: any;
    footer?: string;
    isDark?: boolean;
}

export default function ComparisonGrid({
    anchor,
    kicker,
    title,
    subtitle,
    description,
    alignment = "left",
    tableTitle,
    column1Title = "The Old Way",
    column2Title = "The Datazag Way",
    rows = [],
    secondarySubtitle,
    secondaryDescription,
    footer,
    isDark = false,
}: ComparisonGridProps) {
    if (!rows || rows.length === 0) {
        // Optional: return null if you want to hide empty sections in production
        // return null; 
    }

    const alignClass = {
        left: "text-left",
        center: "text-center mx-auto",
        right: "text-right ml-auto",
    }[alignment] || "text-left";

    const headerAlignClass = {
        left: "text-left",
        center: "text-center mx-auto",
        right: "text-right ml-auto",
    }[alignment] || "text-left";

    const components = {
        block: {
            normal: ({ children }: any) => <p className="mb-4">{children}</p>,
            center: ({ children }: any) => <p className="mb-4 text-center">{children}</p>,
            right: ({ children }: any) => <p className="mb-4 text-right">{children}</p>,
            justify: ({ children }: any) => <p className="mb-4 text-justify">{children}</p>,
        }
    };

    return (
        <section
            id={anchor}
            className={`py-24 ${isDark ? "bg-slate-50" : "bg-white"}`}
        >
            <Container>
                {/* -- Primary Header -- */}
                <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
                    {kicker && (
                        <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-3">
                            {kicker}
                        </p>
                    )}
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-xl font-medium text-blue-600">
                            {subtitle}
                        </p>
                    )}
                    {description && (
                        <div className={`text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed ${alignClass}`}>
                            <PortableText value={description} components={components} />
                        </div>
                    )}
                </div>

                {/* -- Side-by-Side Grid -- */}
                <div className="max-w-5xl mx-auto mb-20">
                    {tableTitle && (
                        <h3 className="text-2xl font-bold text-center text-slate-900 mb-8">
                            {tableTitle}
                        </h3>
                    )}

                    <div className="grid md:grid-cols-2 gap-6 md:gap-0 bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">
                        {/* Left Column (Old Way) */}
                        <div className="bg-slate-50 p-8 md:p-10 border-b md:border-b-0 md:border-r border-slate-200">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 bg-red-100 rounded-lg text-red-600">
                                    <X className="w-5 h-5" />
                                </div>
                                <h4 className="text-xl font-bold text-slate-900">{column1Title}</h4>
                            </div>
                            <ul className="space-y-6">
                                {rows.map((row) => (
                                    <li key={row._key} className="flex gap-4 text-slate-600">
                                        <span className="w-1.5 h-1.5 mt-2.5 rounded-full bg-slate-300 shrink-0" />
                                        <span>{row.col1}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right Column (Datazag Way) */}
                        <div className="bg-white p-8 md:p-10 relative overflow-hidden">
                            {/* Decorative background accent */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none" />

                            <div className="flex items-center gap-3 mb-8 relative">
                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                    <Check className="w-5 h-5" />
                                </div>
                                <h4 className="text-xl font-bold text-slate-900">{column2Title}</h4>
                            </div>
                            <ul className="space-y-6 relative">
                                {rows.map((row) => (
                                    <li key={row._key} className="flex gap-4 text-slate-800 font-medium">
                                        <div className="mt-1 text-blue-500 shrink-0">
                                            <Check className="w-4 h-4" />
                                        </div>
                                        <span>{row.col2}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* -- Secondary Content (Why This Matters) -- */}
                {(secondarySubtitle || secondaryDescription) && (
                    <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
                        {secondarySubtitle && (
                            <h3 className="text-2xl font-bold text-slate-900">
                                {secondarySubtitle}
                            </h3>
                        )}
                        {secondaryDescription && (
                            <div className="text-lg text-slate-600 leading-relaxed">
                                <PortableText value={secondaryDescription} components={components} />
                            </div>
                        )}
                    </div>
                )}

                {/* -- Footer -- */}
                {footer && (
                    <div className="text-center border-t border-slate-200 pt-10 max-w-4xl mx-auto">
                        <p className="text-xl text-slate-900 font-medium italic">
                            "{footer}"
                        </p>
                    </div>
                )}
            </Container>
        </section>
    );
}

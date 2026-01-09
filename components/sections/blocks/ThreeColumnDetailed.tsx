import React from "react";
import { Container } from "@/components/ui/Container";

interface Feature {
    text?: string;
    iconEmoji?: string;
}

interface ColumnProps {
    top?: {
        title?: string;
        subtitle?: string;
    };
    middle?: {
        heading?: string;
        features?: Feature[];
    };
    bottom?: {
        heading?: string;
        outcomes?: string[];
        footer?: string;
    };
}

interface ThreeColumnDetailedProps {
    isDark?: boolean;
    title?: string;
    subtitle?: string;
    columns?: ColumnProps[];
}

export default function ThreeColumnDetailed({ isDark, title, subtitle, columns }: ThreeColumnDetailedProps) {
    if (!columns || columns.length === 0) return null;

    return (
        <section className={`py-12 ${isDark ? "bg-slate-50" : "bg-white"}`}>
            <Container>
                {(title || subtitle) && (
                    <div className="mx-auto max-w-3xl text-center mb-16">
                        {title && (
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p className="mt-4 text-lg leading-8 text-slate-600">
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:grid-rows-[auto_1fr_auto]">
                    {columns.map((col, i) => (
                        <div
                            key={i}
                            className="flex flex-col md:grid md:grid-rows-subgrid md:row-span-3 rounded-3xl border border-slate-200 bg-white h-full shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
                        >
                            {/* 1) Title and Sub-title */}
                            <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col justify-center">
                                {col.top?.title && (
                                    <h3 className="text-2xl font-bold tracking-tight mb-2 leading-tight text-slate-900">
                                        {col.top.title}
                                    </h3>
                                )}
                                {col.top?.subtitle && (
                                    <p className="text-sm font-medium text-slate-500 leading-relaxed">
                                        {col.top.subtitle}
                                    </p>
                                )}
                            </div>

                            {/* 2) Heading and bullet points with icon */}
                            <div className="p-8 flex flex-col">
                                {col.middle?.heading && (
                                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 mb-6">
                                        {col.middle.heading}
                                    </h4>
                                )}
                                <ul className="space-y-5">
                                    {col.middle?.features?.map((feat, fi) => (
                                        <li key={fi} className="flex items-start gap-4 group">
                                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-sm shadow-sm group-hover:scale-110 transition-transform">
                                                {feat.iconEmoji ?? "•"}
                                            </div>
                                            <span className="text-sm text-slate-600 leading-normal font-medium">
                                                {feat.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* 3) Outcome box in different shade with Heading, bullet points and a centered footer */}
                            <div className="p-8 border-t bg-blue-50/30 border-blue-100/50 flex flex-col">
                                {col.bottom?.heading && (
                                    <h4 className="text-sm font-bold text-slate-800 mb-5">
                                        {col.bottom.heading}
                                    </h4>
                                )}
                                <ul className="space-y-3.5 mb-8 flex-1">
                                    {col.bottom?.outcomes?.map((out, oi) => (
                                        <li key={oi} className="flex items-start gap-3">
                                            <div className="mt-1.5 h-1 w-1 rounded-full bg-blue-500 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                            <span className="text-xs text-slate-600 leading-snug">
                                                {out}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {col.bottom?.footer && (
                                    <div className="pt-6 border-t border-slate-200/60 text-center">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                            {col.bottom.footer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

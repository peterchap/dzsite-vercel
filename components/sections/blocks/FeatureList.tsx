import React from "react";
import { Container } from "@/components/ui/Container";
import { CheckCircle2 } from "lucide-react";

interface FeatureListProps {
    isDark?: boolean;
    title?: string;
    subtitle?: string;
    footer?: string;
    groups?: {
        title?: string;
        description?: string;
        features?: string[];
    }[];
}

export default function FeatureList({ isDark, title, subtitle, footer, groups }: FeatureListProps) {
    return (
        <section className={`py-12 ${isDark ? "bg-slate-50" : "bg-white"}`}>
            <Container>
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    {title && (
                        <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                            {title}
                        </h2>
                    )}
                    {subtitle && (
                        <p className="text-lg text-slate-600 leading-relaxed">
                            {subtitle}
                        </p>
                    )}
                </div>
                <div className="flex flex-wrap justify-center gap-12">
                    {groups?.map((group, i) => (
                        <div key={i} className="flex-1 min-w-[300px] max-w-[500px] space-y-6 p-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
                            <div className="text-center">
                                <h3 className={`text-xl font-bold text-slate-900 ${group.description ? "mb-2" : "border-b border-slate-100 pb-4"}`}>
                                    {group.title}
                                </h3>
                                {group.description && (
                                    <p className="text-sm text-slate-500 border-b border-slate-100 pb-4 leading-relaxed">
                                        {group.description}
                                    </p>
                                )}
                            </div>
                            <ul className="grid gap-3 sm:grid-cols-1 text-left">
                                {group.features?.map((feature, j) => (
                                    <li key={j} className="flex items-start gap-3 text-slate-600">
                                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-blue-500" />
                                        <span className="text-sm leading-tight">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                {footer && (
                    <div className="mx-auto mt-16 pt-8 border-t border-slate-100 text-center max-w-3xl">
                        <p className="text-base text-slate-500 leading-relaxed italic">
                            {footer}
                        </p>
                    </div>
                )}
            </Container>
        </section>
    );
}

import React from "react";
import { Container } from "@/components/ui/Container";
import { CheckCircle2 } from "lucide-react";

interface FeatureListProps {
    isDark?: boolean;
    title?: string;
    subtitle?: string;
    groups?: {
        title?: string;
        features?: string[];
    }[];
}

export default function FeatureList({ isDark, title, subtitle, groups }: FeatureListProps) {
    return (
        <section className={`py-24 ${isDark ? "bg-slate-50" : "bg-white"}`}>
            <Container>
                <div className="mb-16 max-w-3xl">
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
                <div className="grid gap-12 md:grid-cols-2">
                    {groups?.map((group, i) => (
                        <div key={i} className="space-y-6 p-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
                            <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
                                {group.title}
                            </h3>
                            <ul className="grid gap-3 sm:grid-cols-1">
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
            </Container>
        </section>
    );
}

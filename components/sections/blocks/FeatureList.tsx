import React from "react";
import { PortableText } from "next-sanity";
import { Container } from "@/components/ui/Container";
import { CheckCircle2 } from "lucide-react";
interface FeatureListProps {
    isDark?: boolean;
    title?: string;
    subtitle?: string;
    description?: any[]; // PortableTextBlock[]
    footer?: string;
    groups?: {
        title?: string;
        description?: string;
        features?: string[];
    }[];
}
export default function FeatureList({ isDark, title, subtitle, description, footer, groups }: FeatureListProps) {
    return (
        <section className={`py-12 ${"bg-slate-950"}`}>
            <Container>
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    {title && (
                        <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                            {title}
                        </h2>
                    )}
                    {subtitle && (
                        <p className="text-lg text-slate-300 leading-relaxed mb-6">
                            {subtitle}
                        </p>
                    )}
                    {description && (
                        <div className="text-lg text-slate-300 leading-relaxed [&_p]:mb-4">
                            <PortableText value={description} />
                        </div>
                    )}
                </div>
                <div className="flex flex-wrap justify-center gap-12">
                    {groups?.map((group, i) => (
                        <div key={i} className="flex-1 min-w-[300px] max-w-[500px] space-y-6 p-8 rounded-2xl border border-white/10 bg-slate-950 shadow-sm">
                            <div className="text-center">
                                <h3 className={`text-xl font-bold text-white ${group.description ? "mb-2" : "border-b border-white/10 pb-4"}`}>
                                    {group.title}
                                </h3>
                                {group.description && (
                                    <p className="text-sm text-slate-400 border-b border-white/10 pb-4 leading-relaxed">
                                        {group.description}
                                    </p>
                                )}
                            </div>
                            <ul className="grid gap-3 sm:grid-cols-1 text-left">
                                {group.features?.map((feature, j) => (
                                    <li key={j} className="flex items-start gap-3 text-slate-300">
                                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-blue-500" />
                                        <span className="text-sm leading-tight">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                {footer && (
                    <div className="mx-auto mt-16 pt-8 border-t border-white/10 text-center max-w-3xl">
                        <p className="text-base text-slate-400 leading-relaxed italic">
                            {footer}
                        </p>
                    </div>
                )}
            </Container>
        </section>
    );
}

import React from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
export function FeatureGrid({ title, subtitle, features, isDark, columns = 3 }: any) {
    const gridCols = columns === 4
        ? "lg:grid-cols-4"
        : columns === 2
            ? "lg:grid-cols-2"
            : "lg:grid-cols-3";
    return (
        <section className={cn("py-12", 'bg-slate-950')}>
            <Container>
                {(title || subtitle) && (
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{title}</h2>
                        {subtitle && <p className="mt-4 text-lg text-slate-400">{subtitle}</p>}
                    </div>
                )}
                <div className={cn("mt-16 grid gap-8 sm:grid-cols-2", gridCols)}>
                    {features?.map((f: any, i: number) => (
                        <div key={i} className="flex flex-col rounded-3xl border border-white/10 bg-slate-950 p-8 shadow-sm transition-all hover:shadow-xl hover:shadow-blue-500/5">
                            {/* Icon placeholder/support if we have dynamic icon names later */}
                            <h3 className="text-xl font-bold text-white tracking-tight">{f.title}</h3>
                            {f.text && <p className="mt-3 text-slate-400 leading-relaxed font-medium">{f.text}</p>}
                            {f.cta?.href && (
                                <div className="mt-auto pt-6">
                                    <a
                                        href={f.cta.href}
                                        className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
                                    >
                                        {f.cta.label}
                                        <ArrowRight className="h-4 w-4" />
                                    </a>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

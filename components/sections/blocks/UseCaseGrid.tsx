import React from "react";
import * as Icons from "lucide-react";
import { Container } from "@/components/ui/Container";

interface UseCaseGridProps {
    isDark?: boolean;
    title?: string;
    subtitle?: string;
    useCases?: {
        icon?: string;
        title?: string;
        challenge?: string;
        solution?: string;
        result?: string;
    }[];
}

export default function UseCaseGrid({ isDark, title, subtitle, useCases }: UseCaseGridProps) {
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

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {useCases?.map((uc, i) => {
                        const IconComponent = (Icons as any)[uc.icon || "Shield"];
                        return (
                            <div
                                key={i}
                                className="flex flex-col p-8 rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md h-full"
                            >
                                <div className="mb-6 flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                        {IconComponent && <IconComponent className="h-5 w-5" />}
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900">
                                        {uc.title}
                                    </h3>
                                </div>

                                <div className="space-y-4 flex-1">
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Challenge</span>
                                        <p className="mt-1 text-sm text-slate-600">{uc.challenge}</p>
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Solution</span>
                                        <p className="mt-1 text-sm text-slate-600">{uc.solution}</p>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-slate-100 italic text-sm text-blue-600 font-medium">
                                    "{uc.result}"
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}

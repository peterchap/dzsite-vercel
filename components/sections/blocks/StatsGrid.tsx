import React from "react";
import * as Icons from "lucide-react";
import { Container } from "@/components/ui/Container";

interface StatsGridProps {
    isDark?: boolean;
    title?: string;
    items?: {
        icon?: string;
        stat?: string;
        label?: string;
        description?: string;
    }[];
}

export default function StatsGrid({ isDark, title, items }: StatsGridProps) {
    return (
        <section className={`py-24 ${isDark ? "bg-slate-50" : "bg-white"}`}>
            <Container>
                {title && (
                    <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                        {title}
                    </h2>
                )}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {items?.map((item, i) => {
                        const IconComponent = (Icons as any)[item.icon || "Activity"];
                        return (
                            <div
                                key={i}
                                className="flex flex-col items-center text-center p-6 rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                            >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    {IconComponent && <IconComponent className="h-6 w-6" />}
                                </div>
                                <div className="mb-1 text-4xl font-extrabold text-blue-600">
                                    {item.stat}
                                </div>
                                <div className="mb-3 text-lg font-semibold text-slate-900">
                                    {item.label}
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}

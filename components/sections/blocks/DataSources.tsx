import React from "react";
import * as Icons from "lucide-react";
import { Container } from "@/components/ui/Container";

interface DataSourcesProps {
    isDark?: boolean;
    title?: string;
    subtitle?: string;
    sources?: {
        icon?: string;
        title?: string;
        description?: string;
    }[];
}

export default function DataSources({ isDark, title, subtitle, sources }: DataSourcesProps) {
    return (
        <section className={`py-12 ${isDark ? "bg-slate-50" : "bg-white"}`}>
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
                    {sources?.map((source, i) => {
                        const iconInput = (source.icon || "Database").trim();
                        // Case-insensitive lookup
                        const iconKey = Object.keys(Icons).find(
                            (key) => key.toLowerCase() === iconInput.toLowerCase()
                        );
                        // Fallback to "HelpCircle" if not found, or use the found key
                        const IconComponent = iconKey
                            ? (Icons as any)[iconKey]
                            : Icons.HelpCircle;

                        return (
                            <div
                                key={i}
                                className="flex flex-col p-8 rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                            >
                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    {IconComponent ? <IconComponent className="h-6 w-6" /> : null}
                                </div>
                                {!iconKey && (
                                    <p className="mb-2 text-xs text-red-500">
                                        Icon "{iconInput}" not found
                                    </p>
                                )}
                                <h3 className="mb-3 text-xl font-bold text-slate-900">
                                    {source.title}
                                </h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    {source.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}

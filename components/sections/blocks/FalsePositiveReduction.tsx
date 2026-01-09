import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { urlFor } from "@/sanity/lib/image";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface FalsePositiveReductionProps {
    isDark?: boolean;
    headline?: string;
    subheadline?: string;
    metric?: {
        value?: string;
        label?: string;
    };
    problemSnippet?: {
        title?: string;
        content?: string;
    };
    solutionSnippet?: {
        title?: string;
        content?: string;
    };
    image?: any;
}

export default function FalsePositiveReduction({
    isDark,
    headline,
    subheadline,
    metric,
    problemSnippet,
    solutionSnippet,
    image,
}: FalsePositiveReductionProps) {
    return (
        <section className={`py-12 ${isDark ? "bg-slate-50" : "bg-white"}`}>
            <Container>
                <div className="grid gap-0 lg:grid-cols-2 lg:items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl leading-tight">
                                {headline}
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                {subheadline}
                            </p>
                        </div>

                        {metric && (
                            <div className="inline-flex flex-col rounded-2xl border border-blue-100 bg-blue-50/50 p-6 shadow-sm">
                                <span className="text-4xl font-extrabold text-blue-600">{metric.value}</span>
                                <span className="text-sm font-medium text-blue-800 uppercase tracking-wider">{metric.label}</span>
                            </div>
                        )}

                        <div className="grid gap-6 sm:grid-cols-2">
                            {/* Problem */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
                                    <AlertCircle className="h-5 w-5" />
                                </div>
                                <h3 className="mb-2 font-bold text-slate-900">{problemSnippet?.title}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">{problemSnippet?.content}</p>
                            </div>

                            {/* Solution */}
                            <div className="rounded-2xl border border-blue-100 bg-blue-50/30 p-6 shadow-sm">
                                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
                                    <CheckCircle2 className="h-5 w-5" />
                                </div>
                                <h3 className="mb-2 font-bold text-slate-900">{solutionSnippet?.title}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">{solutionSnippet?.content}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Content/Graphic */}
                    <div className="relative flex items-center justify-center lg:justify-start lg:translate-x-[25px] lg:translate-y-10">
                        <div className="w-full max-w-[85%]">
                            {image && (
                                <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl transition hover:shadow-blue-500/10">
                                    <Image
                                        src={urlFor(image).url()}
                                        alt={headline || "False Positive Reduction"}
                                        width={800}
                                        height={600}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            )}
                            {/* Decorative background element */}
                            <div className="absolute -right-4 -bottom-4 -z-10 h-full w-full rounded-[2rem] bg-blue-600/5 blur-3xl" />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}

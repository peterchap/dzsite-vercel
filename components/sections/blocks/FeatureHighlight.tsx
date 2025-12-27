import React from "react";
import { Container } from "@/components/ui/Container";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { CheckCircle2 } from "lucide-react";

interface FeatureHighlightProps {
    isDark?: boolean;
    title?: string;
    content?: string;
    approaches?: {
        label?: string;
        text?: string;
    }[];
    visual?: any;
}

export default function FeatureHighlight({ isDark, title, content, approaches, visual }: FeatureHighlightProps) {
    return (
        <section className={`py-24 ${isDark ? "bg-slate-50" : "bg-white"}`}>
            <Container>
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <div className="space-y-8">
                        <div>
                            {title && (
                                <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                                    {title}
                                </h2>
                            )}
                            {content && (
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    {content}
                                </p>
                            )}
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-slate-900">Our Approach:</h3>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {approaches?.map((approach, i) => (
                                    <div key={i} className="flex gap-3">
                                        <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-500" />
                                        <div>
                                            <span className="block font-bold text-slate-900">{approach.label}:</span>
                                            <span className="text-sm text-slate-600">{approach.text}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="relative aspect-square w-full scale-95 lg:scale-100">
                        {visual && (
                            <div className="relative h-full w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
                                <Image
                                    src={urlFor(visual).url()}
                                    alt={title || "Feature Visual"}
                                    fill
                                    className="object-contain p-4"
                                />
                            </div>
                        )}
                        {/* Background decorative element */}
                        <div className="absolute -inset-4 -z-10 bg-blue-600/5 blur-3xl rounded-full" />
                    </div>
                </div>
            </Container>
        </section>
    );
}

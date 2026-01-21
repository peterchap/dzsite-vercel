import React from "react";
import { Container } from "@/components/ui/Container";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PortableText } from "next-sanity";

interface FeatureHighlightProps {
    isDark?: boolean;
    title?: string;
    content?: any;
    approaches?: {
        label?: string;
        text?: string;
    }[];
    visual?: any;
    cta?: any;
    layoutRatio?: "50-50" | "60-40" | "40-60";
}

const RATIO_CLASSES = {
    "50-50": "lg:grid-cols-2",
    "60-40": "lg:grid-cols-[1.5fr_1fr]",
    "40-60": "lg:grid-cols-[1fr_1.5fr]",
};

export default function FeatureHighlight({ isDark, title, content, approaches, visual, cta, layoutRatio = "50-50" }: FeatureHighlightProps) {
    const gridClass = RATIO_CLASSES[layoutRatio] || RATIO_CLASSES["50-50"];

    return (
        <section className={`py-12 ${isDark ? "bg-slate-50" : "bg-white"}`}>
            <Container>
                <div className={`grid gap-12 ${gridClass} lg:items-center`}>
                    <div className="space-y-8">
                        <div>
                            {title && (
                                <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                                    {title}
                                </h2>
                            )}
                            {content && (
                                <div className="text-lg text-slate-600 leading-relaxed space-y-4">
                                    {Array.isArray(content) ? (
                                        <PortableText value={content} />
                                    ) : (
                                        <p>{content}</p>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="space-y-6">
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

                            {cta && cta.label && (
                                <div className="pt-2">
                                    <ButtonLink
                                        href={cta.href || "#"}
                                        variant={cta.variant || "primary"}
                                        size="lg"
                                    >
                                        {cta.label}
                                    </ButtonLink>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="relative w-full scale-95 lg:scale-100">
                        {visual && (
                            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-2xl">
                                <Image
                                    src={urlFor(visual).url()}
                                    alt={title || "Feature Visual"}
                                    width={1200}
                                    height={800}
                                    className="w-full h-auto rounded-2xl object-contain"
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

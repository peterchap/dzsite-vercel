import React from "react";
import { Container } from "@/components/ui/Container";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
interface CenteredImageProps {
    kicker?: string;
    title: string;
    subtitle?: string;
    mainImage: any;
    footer?: string;
    isDark?: boolean;
}
export default function CenteredImage({
    kicker,
    title,
    subtitle,
    mainImage,
    footer,
    isDark,
}: CenteredImageProps) {
    return (
        <section className={`py-12 ${"bg-slate-950"}`}>
            <Container>
                <div className="mx-auto max-w-4xl text-center">
                    {kicker && (
                        <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
                            {kicker}
                        </p>
                    )}
                    <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
                            {subtitle}
                        </p>
                    )}
                    {mainImage && (
                        <div className="mt-12 relative rounded-2xl border border-white/10 bg-slate-950 p-2 shadow-xl overflow-hidden">
                            <Image
                                src={urlFor(mainImage).url()}
                                alt={title}
                                width={1200}
                                height={800}
                                className="rounded-xl w-full h-auto object-contain"
                                priority
                            />
                        </div>
                    )}
                    {footer && (
                        <p className="mt-8 text-slate-400 max-w-2xl mx-auto">
                            {footer}
                        </p>
                    )}
                </div>
            </Container>
        </section>
    );
}

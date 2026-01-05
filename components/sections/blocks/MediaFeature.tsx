import React from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";

interface MediaFeatureProps {
    isDark?: boolean;
    imagePosition?: "left" | "right" | "bottom";
    imageStyle?: "card" | "plain";
    imageFit?: "cover" | "contain";
    title?: string;
    subtitle?: string;
    image?: any;
    cta?: {
        label?: string;
        href?: string;
        variant?: "primary" | "secondary" | "outline" | "ghost";
    };
}

export function MediaFeature({
    isDark,
    imagePosition = "right",
    imageStyle = "card",
    imageFit = "cover",
    title,
    subtitle,
    image,
    cta
}: MediaFeatureProps) {
    const isBottom = imagePosition === "bottom";
    const isPlain = imageStyle === "plain";

    // Determine the object-fit class. 
    // If it's plain, we usually want contain, but we'll respect the user's fit setting if provided.
    const fitClass = imageFit === "contain" ? "object-contain" : "object-cover";

    return (
        <section className={cn("py-24", isDark ? 'bg-slate-50' : 'bg-white')}>
            <Container>
                <div className={cn(
                    "grid gap-12 lg:items-center",
                    isBottom ? "grid-cols-1" : "lg:grid-cols-2",
                    imagePosition === "left" ? "lg:direction-rtl" : ""
                )}>
                    <div className={cn(
                        "space-y-6",
                        isBottom ? "text-center max-w-3xl mx-auto" : (imagePosition === "left" ? "lg:order-2 lg:text-left" : "lg:order-1")
                    )}>
                        {title && (
                            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p className="text-lg text-slate-500 leading-relaxed font-medium">
                                {subtitle}
                            </p>
                        )}
                        {cta?.href && cta?.label && (
                            <div className={cn("pt-4", isBottom ? "flex justify-center" : "")}>
                                <ButtonLink
                                    href={cta.href}
                                    variant={cta.variant || "primary"}
                                    size="lg"
                                >
                                    {cta.label}
                                </ButtonLink>
                            </div>
                        )}
                    </div>

                    <div className={cn(
                        "relative w-full overflow-hidden",
                        !isPlain && "rounded-[2.5rem] border border-slate-200 bg-white shadow-2xl",
                        isBottom ? "aspect-video max-w-5xl mx-auto" : "aspect-[4/3]",
                        imagePosition === "left" ? "lg:order-1" : "lg:order-2",
                        isPlain && "bg-transparent"
                    )}>
                        {image && (
                            <Image
                                src={urlFor(image).width(1600).url()}
                                alt={title || "Feature image"}
                                fill
                                className={cn(fitClass)}
                                sizes={isBottom ? "100vw" : "(max-width: 1024px) 100vw, 50vw"}
                            />
                        )}
                    </div>
                </div>
            </Container>
        </section>
    );
}

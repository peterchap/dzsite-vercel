import React from "react";
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
        <section className={cn("py-12", 'bg-slate-950')}>
            <div className="mx-auto w-full max-w-7xl px-6">
                <div className={cn(
                    "grid gap-12 lg:items-start",
                    isBottom ? "grid-cols-1" : "lg:grid-cols-12"
                )}>
                    <div className={cn(
                        "space-y-6",
                        isBottom
                            ? "text-center max-w-3xl mx-auto"
                            : cn(
                                  "text-left lg:col-span-5",
                                  imagePosition === "left" ? "lg:order-2" : "lg:order-1"
                              )
                    )}>
                        {title && (
                            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p className="text-lg text-slate-400 leading-relaxed font-medium">
                                {subtitle}
                            </p>
                        )}
                        {cta?.href && cta?.label && (
                            <div className={cn("pt-4", isBottom ? "flex justify-center" : "")}>
                                {(() => {
                                    const safeVariant: "primary" | "secondary" | "ghost" =
                                        cta.variant === "outline" ? "secondary" : (cta.variant ?? "primary");
                                    return (
                                        <ButtonLink
                                            href={cta.href}
                                            variant={safeVariant}
                                            size="lg"
                                        >
                                            {cta.label}
                                        </ButtonLink>
                                    );
                                })()}
                            </div>
                        )}
                    </div>
                    <div className={cn(
                        "relative w-full overflow-hidden",
                        !isPlain && "rounded-[2.5rem] border border-white/10 bg-slate-950 shadow-2xl",
                        isBottom ? "aspect-video max-w-5xl mx-auto" : "aspect-[4/3] lg:col-span-7",
                        imagePosition === "left" ? "lg:order-1" : "lg:order-2",
                        isPlain && "bg-transparent"
                    )}>
                        {image?.asset && (
                            <Image
                                src={urlFor(image).width(1600).url()}
                                alt={title || "Feature image"}
                                fill
                                className={cn(fitClass)}
                                sizes={isBottom ? "100vw" : "(max-width: 1024px) 100vw, 58vw"}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

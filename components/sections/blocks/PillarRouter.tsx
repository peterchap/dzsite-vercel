import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { ArrowRight, Shield, Database, Users, LucideIcon } from "lucide-react";
import Image from "next/image";

const ICON_MAP: Record<string, LucideIcon> = {
    Shield,
    Database,
    Users,
};

export function PillarRouter({ title, subtitle, pillars }: any) {
    return (
        <section className="py-12 bg-white overflow-hidden">
            <Container>
                {(title || subtitle) && (
                    <div className="max-w-3xl mb-20 text-center mx-auto">
                        {title && (
                            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                                {title}
                            </h2>
                        )}
                        {subtitle && <p className="mt-6 text-xl text-slate-500 leading-relaxed">{subtitle}</p>}
                    </div>
                )}

                <div className="grid gap-8 lg:grid-cols-3">
                    {pillars?.map((pillar: any, i: number) => {
                        const Icon = ICON_MAP[pillar.icon] || Shield;

                        return (
                            <a
                                key={i}
                                href={pillar.cta?.href || "#"}
                                className="group relative flex flex-col items-start p-10 rounded-[2.5rem] border border-slate-100 bg-white shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 overflow-hidden"
                            >
                                {/* Decorative Gradient Background on Hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 bg-gradient-to-br from-blue-600 to-cyan-400" />

                                {/* Icon & Label */}
                                <div className="mb-8 p-4 rounded-2xl bg-blue-50 text-blue-600 transition-transform duration-500 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
                                    <Icon className="h-8 w-8" />
                                </div>

                                <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">
                                    {pillar.title}
                                </h3>

                                <p className="text-slate-500 leading-relaxed font-medium mb-8">
                                    {pillar.description}
                                </p>

                                <div className="mt-auto flex items-center gap-2 text-sm font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                                    <span>Explore {pillar.title}</span>
                                    <ArrowRight className="h-4 w-4" />
                                </div>

                                {/* Optional Image / Decorative Element */}
                                {pillar.image && (
                                    <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-20 grayscale group-hover:grayscale-0 transition-all duration-500 translate-x-8 translate-y-8">
                                        <Image
                                            src={urlFor(pillar.image).width(200).url()}
                                            alt=""
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                )}
                            </a>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}

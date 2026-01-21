import React from "react";
import { Container } from "@/components/ui/Container";
import * as LucideIcons from "lucide-react";
import { Check } from "lucide-react";

interface CircularItem {
    title: string;
    icon?: string;
    features?: string[];
}

interface CircularFeaturesProps {
    isDark?: boolean;
    kicker?: string;
    title?: string;
    subtitle?: string;
    hub?: {
        title: string;
        icon?: string;
    };
    items?: CircularItem[];
}

const IconMapper = ({ iconName, className }: { iconName?: string; className?: string }) => {
    if (!iconName) return null;
    const IconComponent = (LucideIcons as any)[iconName];
    if (!IconComponent) return <LucideIcons.HelpCircle className={className} />;
    return <IconComponent className={className} />;
};

export default function CircularFeatures({
    isDark,
    kicker,
    title,
    subtitle,
    hub,
    items = [],
}: CircularFeaturesProps) {
    // We expect exactly 6 items for the circular layout on desktop
    const displayItems = items.slice(0, 6);

    return (
        <section className={`py-24 overflow-hidden ${isDark ? "bg-slate-50" : "bg-white"}`}>
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
                    {kicker && <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">{kicker}</p>}
                    {title && <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{title}</h2>}
                    {subtitle && <p className="text-lg text-slate-600 leading-relaxed">{subtitle}</p>}
                </div>

                {/* Mobile/Tablet View (Grid) */}
                <div className="grid gap-6 md:grid-cols-2 lg:hidden">
                    {displayItems.map((item, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                    <IconMapper iconName={item.icon} className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-slate-900 text-lg">{item.title}</h3>
                            </div>
                            <ul className="space-y-2">
                                {item.features?.map((f, fi) => (
                                    <li key={fi} className="flex items-start gap-2 text-sm text-slate-600">
                                        <Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Desktop Circular View */}
                <div className="hidden lg:block relative h-[600px] w-full max-w-[900px] mx-auto">
                    {/* Central Hub */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                        <div className="w-40 h-40 rounded-full bg-blue-600 shadow-2xl shadow-blue-500/30 flex flex-col items-center justify-center text-white p-6 text-center border-4 border-white">
                            <IconMapper iconName={hub?.icon || "Search"} className="w-10 h-10 mb-2" />
                            <span className="font-bold text-sm leading-tight uppercase tracking-wider">{hub?.title || "Monitoring Hub"}</span>
                        </div>
                        {/* Orbiting rings decor */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-blue-100 rounded-full -z-10" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-blue-50 rounded-full -z-10" />
                    </div>

                    {/* Surrounding Items */}
                    {displayItems.map((item, i) => {
                        const positions = [
                            "top-0 left-1/2 -translate-x-1/2", // Top
                            "top-[15%] right-0",              // Top Right
                            "bottom-[15%] right-0",           // Bottom Right
                            "bottom-0 left-1/2 -translate-x-1/2", // Bottom
                            "bottom-[15%] left-0",            // Bottom Left
                            "top-[15%] left-0",               // Top Left
                        ];

                        return (
                            <div
                                key={i}
                                className={`absolute h-auto w-64 z-10 transition-transform duration-500 hover:scale-105 ${positions[i]}`}
                            >
                                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl hover:border-blue-200 transition-all">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                                            <IconMapper iconName={item.icon} className="w-4 h-4" />
                                        </div>
                                        <h3 className="font-bold text-slate-900 text-sm leading-tight">{item.title}</h3>
                                    </div>
                                    <ul className="space-y-1">
                                        {item.features?.map((f, fi) => (
                                            <li key={fi} className="flex items-start gap-2 text-[12px] text-slate-600 leading-snug">
                                                <Check className="w-3 h-3 text-blue-500 mt-0.5 shrink-0" />
                                                <span>{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}

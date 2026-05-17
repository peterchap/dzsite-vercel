"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Terminal, Code, Webhook, Database, Blocks, Zap, Cable } from "lucide-react";

type Integration = {
    title: string;
    method: string;
    description: string;
    codeSnippet: string;
    iconType: string;
};

type IntegrationShowcaseProps = {
    _type: "section.integrationShowcase";
    anchor?: string;
    headline: string;
    subheadline?: string;
    integrations?: Integration[];
    docsCta?: {
        label: string;
        href: string;
    };
};

const IconMap: Record<string, React.ElementType> = {
    webhook: Webhook,
    api: Cable,
    database: Database,
    sdk: Blocks,
    terminal: Terminal,
    code: Code,
    zap: Zap,
};

export default function IntegrationShowcase({
    anchor,
    headline,
    subheadline,
    integrations = [],
    docsCta,
}: IntegrationShowcaseProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    if (!integrations || integrations.length === 0) {
        return null;
    }

    const activeIntegration = integrations[activeIndex];

    return (
        <section id={anchor} className="relative py-24 bg-[#050505] overflow-hidden border-t border-white/5">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                        {headline}
                    </h2>
                    {subheadline && (
                        <p className="text-lg text-neutral-400 leading-relaxed">
                            {subheadline}
                        </p>
                    )}
                </div>

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                    
                    {/* Left Side: Navigation */}
                    <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-8">
                        <div className="space-y-4">
                            {integrations.map((integration, idx) => {
                                const isActive = activeIndex === idx;
                                const Icon = IconMap[integration.iconType?.toLowerCase()] || Code;
                                
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveIndex(idx)}
                                        className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 group
                                            ${isActive 
                                                ? 'bg-blue-600/10 border-blue-500/50 shadow-[0_0_20px_rgba(37,99,235,0.15)]' 
                                                : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                                            }
                                        `}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`p-3 rounded-xl transition-colors ${isActive ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'bg-black/50 text-neutral-400'}`}>
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h3 className={`text-xl font-bold transition-colors ${isActive ? 'text-white' : 'text-neutral-300'}`}>
                                                        {integration.title}
                                                    </h3>
                                                    {integration.method && (
                                                        <span className={`text-xs font-mono px-2 py-1 rounded transition-colors ${isActive ? 'bg-blue-500/20 text-blue-300' : 'bg-white/5 text-neutral-500'}`}>
                                                            {integration.method}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-neutral-400 mt-2 line-clamp-2">
                                                    {integration.description}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                        
                        {/* Footer Docs CTA */}
                        {docsCta?.href && (
                            <div className="pt-8 mt-auto border-t border-white/10">
                                <Link 
                                    href={docsCta.href}
                                    className="inline-flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors group"
                                >
                                    {docsCta.label || "View our full API Documentation"}
                                    <ArrowRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Right Side: Terminal Window */}
                    <div className="lg:col-span-7 sticky top-24">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ 
                                    opacity: 1, 
                                    scale: 1,
                                    boxShadow: ["0px 0px 0px rgba(37,99,235,0)", "0px 0px 40px rgba(37,99,235,0.3)", "0px 0px 0px rgba(37,99,235,0)"]
                                }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ 
                                    duration: 0.4,
                                    boxShadow: { duration: 0.8, ease: "easeOut" }
                                }}
                                className="rounded-2xl border border-white/10 bg-[#050505] overflow-hidden"
                            >
                                {/* Terminal Header */}
                                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#0a0a0a]">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Terminal className="w-3.5 h-3.5 text-neutral-500" />
                                        <span className="text-xs font-mono text-neutral-500">
                                            {activeIntegration?.title?.toLowerCase().replace(/\s+/g, '_')}.sh
                                        </span>
                                    </div>
                                    <div className="w-12" /> {/* Spacer for centering */}
                                </div>

                                {/* Terminal Body */}
                                <div className="p-6 md:p-8 overflow-x-auto">
                                    <pre className="text-sm font-mono text-neutral-300 leading-relaxed whitespace-pre-wrap">
                                        <code>{activeIntegration?.codeSnippet}</code>
                                    </pre>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
}

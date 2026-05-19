"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Activity, Database, Shield, Hexagon } from "lucide-react";

type DataLayer = {
    title: string;
    outcome: string;
    signals: string[];
};

type InfrastructureAuditStackProps = {
    _type: "section.infrastructureAuditStack";
    anchor?: string;
    headline: string;
    subheadline?: string;
    primaryCta?: {
        label: string;
        href: string;
        variant?: string;
    };
    layers: DataLayer[];
};

const layerThemes = [
    { border: "border-blue-500/50", glow: "shadow-neon-blue", icon: <Database className="w-5 h-5 text-blue-400" /> },
    { border: "border-cyan-500/50", glow: "shadow-neon-cyan", icon: <Activity className="w-5 h-5 text-cyan-400" /> },
    { border: "border-purple-500/50", glow: "shadow-neon-purple", icon: <Shield className="w-5 h-5 text-purple-400" /> },
];

export default function InfrastructureAuditStack({
    anchor,
    headline,
    subheadline,
    primaryCta,
    layers = [],
}: InfrastructureAuditStackProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section id={anchor} className="relative py-24 bg-slate-950 overflow-hidden border-t border-white/5">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Context & Typography */}
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/5 border border-white/10 text-sm font-mono text-cyan-400">
                            <Hexagon className="w-4 h-4" />
                            <span>Intelligence Core</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                            {headline}
                        </h2>

                        {subheadline && (
                            <p className="text-lg text-neutral-400 leading-relaxed max-w-xl">
                                {subheadline}
                            </p>
                        )}

                        {/* Interactive List */}
                        <div className="space-y-4 pt-4">
                            {layers.map((layer, idx) => {
                                const isActive = activeIndex === idx;
                                const theme = layerThemes[idx % layerThemes.length];

                                return (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveIndex(idx)}
                                        className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between group
                                            ${isActive 
                                                ? `bg-slate-950/10 ${theme.border} ${theme.glow}` 
                                                : 'bg-slate-950/5 border-white/10 hover:bg-slate-950/10 hover:border-white/20'
                                            }
                                        `}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2 rounded-lg bg-black/50 border border-white/10 transition-colors ${isActive ? theme.border : ''}`}>
                                                {theme.icon}
                                            </div>
                                            <div>
                                                <h3 className={`font-semibold transition-colors ${isActive ? 'text-white' : 'text-neutral-300'}`}>
                                                    {layer.title}
                                                </h3>
                                                <p className="text-sm text-neutral-500 font-mono mt-1">
                                                    Outcome: {layer.outcome}
                                                </p>
                                            </div>
                                        </div>
                                        <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'text-white translate-x-1' : 'text-neutral-600 group-hover:text-neutral-400'}`} />
                                    </button>
                                );
                            })}
                        </div>

                        {primaryCta?.href && (
                            <div className="pt-6">
                                <Link
                                    href={primaryCta.href}
                                    className="inline-flex items-center gap-2 bg-slate-950 text-black px-6 py-3 rounded-lg font-medium hover:bg-neutral-200 transition-colors"
                                >
                                    {primaryCta.label}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Right Column: 3D Stack Visualization */}
                    <div className="relative h-[600px] perspective-[1200px] flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            {layers.map((layer, idx) => {
                                if (idx !== activeIndex) return null;
                                const theme = layerThemes[idx % layerThemes.length];

                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, rotateX: 20, rotateY: -20, y: 50, scale: 0.9 }}
                                        animate={{ opacity: 1, rotateX: 10, rotateY: -10, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, rotateX: 0, rotateY: 0, y: -50, scale: 0.9 }}
                                        transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                                        className={`absolute w-full max-w-md p-8 rounded-2xl bg-[#111] border ${theme.border} ${theme.glow} backdrop-blur-xl`}
                                        style={{ transformStyle: 'preserve-3d' }}
                                    >
                                        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
                                            {theme.icon}
                                            <h3 className="text-2xl font-bold text-white font-mono tracking-tight">
                                                {layer.title}
                                            </h3>
                                        </div>

                                        <div className="space-y-6">
                                            <div>
                                                <div className="text-xs text-neutral-500 uppercase tracking-wider mb-3">Extracted Signals</div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {layer.signals?.map((signal, sIdx) => (
                                                        <div key={sIdx} className="flex items-center gap-2 bg-black/50 rounded-lg p-3 border border-white/5">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                                            <span className="text-sm font-mono text-neutral-300 truncate">{signal}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="p-4 rounded-lg bg-slate-950/5 border border-white/10">
                                                <div className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Intelligence Outcome</div>
                                                <div className="text-white font-medium">{layer.outcome}</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}

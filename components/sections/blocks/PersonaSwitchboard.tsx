"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Code, Cpu, Activity, Shield, Key } from "lucide-react";

type Persona = {
    title: string;
    slug: string;
    headline: string;
    description: string;
    dataPoints: string[];
    samplePayload: string;
    accentColor: "blue" | "purple" | "orange";
};

type PersonaSwitchboardProps = {
    _type: "section.personaSwitchboard";
    anchor?: string;
    headline: string;
    subheadline?: string;
    personas?: Persona[];
};

const getAccentStyles = (color: string) => {
    switch (color) {
        case "purple":
            return {
                border: "border-purple-500/50",
                glow: "shadow-neon-purple",
                text: "text-purple-400",
                bg: "bg-purple-500/10",
                icon: <Shield className="w-5 h-5 text-purple-400" />,
            };
        case "orange":
            return {
                border: "border-orange-500/50",
                glow: "shadow-neon-orange",
                text: "text-orange-400",
                bg: "bg-orange-500/10",
                icon: <Key className="w-5 h-5 text-orange-400" />,
            };
        case "blue":
        default:
            return {
                border: "border-blue-500/50",
                glow: "shadow-neon-blue",
                text: "text-blue-400",
                bg: "bg-blue-500/10",
                icon: <Activity className="w-5 h-5 text-blue-400" />,
            };
    }
};

export default function PersonaSwitchboard({
    anchor,
    headline,
    subheadline,
    personas = [],
}: PersonaSwitchboardProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    if (!personas || personas.length === 0) {
        return null; // Return null if no personas are selected
    }

    const activePersona = personas[activeIndex];
    const activeStyles = getAccentStyles(activePersona?.accentColor);

    return (
        <section id={anchor} className="relative py-24 bg-slate-950 overflow-hidden border-t border-white/5">
            {/* Background blur matching the active persona */}

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

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* Left side: Persona Cards */}
                    <div className="lg:col-span-5 space-y-4">
                        {personas.map((persona, idx) => {
                            const isActive = activeIndex === idx;
                            const styles = getAccentStyles(persona.accentColor);

                            return (
                                <button
                                    key={idx}
                                    onMouseEnter={() => setActiveIndex(idx)}
                                    onClick={() => setActiveIndex(idx)}
                                    className={`w-full text-left p-6 rounded-xl border transition-all duration-300 group relative overflow-hidden backdrop-blur-xl
                                        ${isActive 
                                            ? `bg-black/60 ${styles.border} ${styles.glow}` 
                                            : 'bg-slate-950/5 border-white/10 hover:bg-slate-950/10'
                                        }
                                    `}
                                >
                                    <div className="relative z-10 flex items-start gap-4">
                                        <div className={`p-2.5 rounded-lg bg-black/50 border border-white/10 transition-colors ${isActive ? styles.border : ''}`}>
                                            {styles.icon}
                                        </div>
                                        <div>
                                            <h3 className={`text-xl font-bold transition-colors ${isActive ? 'text-white' : 'text-neutral-300'}`}>
                                                {persona.title}
                                            </h3>
                                            <p className="text-sm text-neutral-400 mt-2 line-clamp-2">
                                                {persona.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Active state inner glow */}
                                    {isActive && (
                                        <div className={`absolute inset-0 opacity-10 pointer-events-none ${styles.bg}`} />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Right side: Data Preview Terminal */}
                    <div className="lg:col-span-7 sticky top-24">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className={`rounded-2xl border bg-[#0d0d0d] overflow-hidden backdrop-blur-xl ${activeStyles.border} ${activeStyles.glow}`}
                            >
                                {/* Terminal Header */}
                                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/40">
                                    <div className="flex items-center gap-2">
                                        <Terminal className="w-4 h-4 text-neutral-500" />
                                        <span className="text-xs font-mono text-neutral-400">
                                            datazag_feed_{activePersona?.slug}.json
                                        </span>
                                    </div>
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                                    </div>
                                </div>

                                {/* Terminal Body */}
                                <div className="p-6 md:p-8 space-y-8">
                                    {/* Outcome & Data Points */}
                                    <div className="space-y-4">
                                        <h4 className={`text-2xl font-bold ${activeStyles.text}`}>
                                            {activePersona?.headline}
                                        </h4>
                                        <ul className="grid sm:grid-cols-2 gap-3">
                                            {activePersona?.dataPoints?.map((point, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                                                    <Cpu className={`w-4 h-4 ${activeStyles.text}`} />
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Code Block */}
                                    <div className="relative group">
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-white/10 to-transparent rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500" />
                                        <div className="relative rounded-lg bg-black/60 border border-white/10 p-4 overflow-x-auto">
                                            <div className="flex items-center gap-2 mb-3 px-2">
                                                <Code className="w-4 h-4 text-neutral-500" />
                                                <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Live Stream Preview</span>
                                            </div>
                                            <pre className="text-sm font-mono text-neutral-300 leading-relaxed">
                                                <code>{activePersona?.samplePayload}</code>
                                            </pre>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
}

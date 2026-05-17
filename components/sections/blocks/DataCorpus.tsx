"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Activity, Database, Zap, Code, Shield, Hexagon, Network, Globe } from "lucide-react";

type DataFeature = {
    title: string;
    description: string;
    icon: string;
};

type DataCorpusProps = {
    _type: "section.dataCorpus";
    anchor?: string;
    mainHeadline: string;
    subheadline?: string;
    totalDomains: string;
    ingestionLatency: string;
    dataFeatures?: DataFeature[];
    ctaLabel: string;
    ctaHref: string;
};

// Map string icon names to Lucide components
const IconMap: Record<string, React.ElementType> = {
    activity: Activity,
    database: Database,
    zap: Zap,
    code: Code,
    shield: Shield,
    hexagon: Hexagon,
    network: Network,
    globe: Globe,
};

const SAMPLE_PAYLOAD = `{
  "action": "ingest_stream",
  "status": "active",
  "metrics": {
    "latency_ms": 8.4,
    "events_per_sec": 4200,
    "confidence_score": 0.99
  },
  "payload_ready": true
}`;

export default function DataCorpus({
    anchor,
    mainHeadline,
    subheadline,
    totalDomains,
    ingestionLatency,
    dataFeatures = [],
    ctaLabel,
    ctaHref,
}: DataCorpusProps) {
    const [isHoveringCta, setIsHoveringCta] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    // Fixed coordinates for the SVG network (percentages)
    const nodes = [
        { id: 1, cx: 15, cy: 30, r: 3 },
        { id: 2, cx: 35, cy: 15, r: 4 },
        { id: 3, cx: 65, cy: 25, r: 3 },
        { id: 4, cx: 85, cy: 45, r: 5 },
        { id: 5, cx: 70, cy: 75, r: 4 },
        { id: 6, cx: 40, cy: 85, r: 3 },
        { id: 7, cx: 10, cy: 65, r: 4 },
        { id: 8, cx: 50, cy: 50, r: 6 }, // Center node
    ];

    const edges = [
        [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 1],
        [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7]
    ];

    return (
        <section id={anchor} className="relative py-24 lg:py-32 bg-[#0a0a0a] overflow-hidden border-t border-white/5">
            {/* Ambient Backgrounds */}
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),rgba(255,255,255,0))] pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-cyan-900/10 blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left Column: Visuals & Metrics */}
                    <div className="relative h-[500px] rounded-3xl border border-white/10 bg-black/40 overflow-hidden flex flex-col items-center justify-center backdrop-blur-sm">
                        
                        {/* Animated SVG Network Graph */}
                        {mounted && (
                            <svg className="absolute inset-0 w-full h-full opacity-60 pointer-events-none">
                                <defs>
                                    <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                                        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.8" />
                                    </linearGradient>
                                </defs>
                                
                                {/* Edges */}
                                {edges.map(([sourceId, targetId], i) => {
                                    const source = nodes.find(n => n.id === sourceId)!;
                                    const target = nodes.find(n => n.id === targetId)!;
                                    return (
                                        <motion.line
                                            key={`edge-${i}`}
                                            x1={`${source.cx}%`}
                                            y1={`${source.cy}%`}
                                            x2={`${target.cx}%`}
                                            y2={`${target.cy}%`}
                                            stroke="url(#edge-gradient)"
                                            strokeWidth="1.5"
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={{ 
                                                pathLength: [0, 1, 1],
                                                opacity: [0.1, 0.6, 0.1]
                                            }}
                                            transition={{
                                                duration: 3 + Math.random() * 2,
                                                repeat: Infinity,
                                                ease: "linear",
                                                delay: Math.random() * 2
                                            }}
                                        />
                                    );
                                })}

                                {/* Nodes */}
                                {nodes.map((node, i) => (
                                    <motion.circle
                                        key={`node-${i}`}
                                        cx={`${node.cx}%`}
                                        cy={`${node.cy}%`}
                                        r={node.r}
                                        className="fill-cyan-400"
                                        animate={{
                                            scale: [1, 1.5, 1],
                                            opacity: [0.4, 1, 0.4],
                                            filter: ["blur(0px)", "blur(4px)", "blur(0px)"]
                                        }}
                                        transition={{
                                            duration: 2 + Math.random() * 2,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: Math.random() * 2
                                        }}
                                    />
                                ))}
                            </svg>
                        )}

                        {/* Floating Metrics Overlay */}
                        <div className="relative z-10 flex flex-col gap-6 items-center w-full max-w-sm px-6">
                            
                            <motion.div 
                                className="w-full bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center shadow-neon-blue transition-all"
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="text-cyan-400 font-mono text-sm uppercase tracking-widest mb-2">Live Corpus Size</div>
                                <div className="text-5xl font-bold text-white tracking-tighter" style={{ fontFamily: 'var(--font-outfit)' }}>
                                    {totalDomains || "330M+"}
                                </div>
                            </motion.div>

                            <motion.div 
                                className="w-full bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center shadow-neon-cyan transition-all"
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="text-blue-400 font-mono text-sm uppercase tracking-widest mb-2">Ingestion Latency</div>
                                <div className="text-5xl font-bold text-white tracking-tighter flex items-center justify-center gap-2" style={{ fontFamily: 'var(--font-outfit)' }}>
                                    <Activity className="w-8 h-8 text-cyan-400 animate-pulse" />
                                    {ingestionLatency || "<10s"}
                                </div>
                            </motion.div>

                        </div>
                    </div>

                    {/* Right Column: Content & Features */}
                    <div className="space-y-10">
                        <div className="space-y-6">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                                {mainHeadline || "The Technical Centerpiece"}
                            </h2>
                            {subheadline && (
                                <p className="text-lg text-neutral-400 leading-relaxed">
                                    {subheadline}
                                </p>
                            )}
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {dataFeatures?.map((feature, idx) => {
                                const Icon = IconMap[feature.icon?.toLowerCase()] || Database;
                                return (
                                    <div key={idx} className="space-y-3">
                                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                            <Icon className="w-6 h-6 text-cyan-400" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-neutral-400 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Interactive CTA */}
                        <div className="pt-4 relative" onMouseLeave={() => setIsHoveringCta(false)}>
                            <div className="inline-block relative">
                                <Link
                                    href={ctaHref || "#"}
                                    onMouseEnter={() => setIsHoveringCta(true)}
                                    className="inline-flex items-center gap-2 bg-cyan-500 text-black px-8 py-4 rounded-lg font-bold hover:bg-cyan-400 transition-all duration-300 shadow-neon-cyan hover:shadow-[0_0_30px_rgba(34,211,238,0.8)]"
                                >
                                    {ctaLabel || "Request Data Sample"}
                                    <ArrowRight className="w-5 h-5" />
                                </Link>

                                {/* Hover JSON Reveal Popover */}
                                <AnimatePresence>
                                    {isHoveringCta && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute bottom-full left-0 mb-4 w-[320px] pointer-events-none z-50"
                                        >
                                            <div className="bg-[#0d0d0d] border border-cyan-500/30 rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl">
                                                <div className="bg-black/50 border-b border-white/10 px-3 py-2 flex items-center gap-2">
                                                    <Code className="w-3.5 h-3.5 text-cyan-500" />
                                                    <span className="text-xs font-mono text-neutral-400">response.json</span>
                                                </div>
                                                <div className="p-4">
                                                    <pre className="text-xs font-mono text-cyan-300 whitespace-pre-wrap leading-relaxed">
                                                        {SAMPLE_PAYLOAD}
                                                    </pre>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

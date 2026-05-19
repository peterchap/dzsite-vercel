"use client";

import React from 'react';
import { Network, Activity, Radio, ShieldCheck, ArrowRight } from "lucide-react";

type CapabilityBand = {
  label: string;
  iconType: string;
  cta?: {
    label?: string;
    href?: string;
  };
};

type PredictiveLayerSectionProps = {
  _type?: string;
  _key?: string;
  anchor?: string;
  headline?: string;
  subheadline?: string;
  topProducts?: string[];
  capabilityBands?: CapabilityBand[];
  substrateFoundations?: string[];
};

const getIcon = (type: string) => {
  switch (type) {
    case 'Activity': return Activity;
    case 'Radio': return Radio;
    case 'ShieldCheck': return ShieldCheck;
    case 'Network':
    default: return Network;
  }
};

export default function PredictiveLayerSection(props: PredictiveLayerSectionProps) {
  const {
    anchor = "predictive-layer",
    headline = "Datazag is the predictive layer alongside your stack.",
    subheadline = "Datazag works with ASM, DRP, brand protection and threat intelligence \u2014 not against them. Where you've invested in any of these, Datazag is the layer that makes them work better. Where you haven't, it's the zero-input place to start.",
    topProducts = ['Assess', 'Monitor', 'Build'],
    capabilityBands = [
        { label: 'Signal correlation and graphing', iconType: 'Network', cta: { label: 'Learn More', href: '/how-it-works' } },
        { label: 'Predictive risk scoring', iconType: 'Activity', cta: { label: 'Learn More', href: '/how-it-works' } },
        { label: 'Real-time telemetry', iconType: 'Radio', cta: { label: 'Learn More', href: '/how-it-works' } },
        { label: 'Routing hygiene verification', iconType: 'ShieldCheck', cta: { label: 'Learn More', href: '/how-it-works' } }
    ],
    substrateFoundations = ['330M-domain corpus', 'CertStream', 'BGP (RouteViews & RIPE RIS)']
  } = props;

  return (
    <section id={anchor} className="relative py-24 bg-slate-950 overflow-hidden border-t border-white/5 font-sans">

        {/* Header */}
        <div className="container mx-auto px-6 lg:px-12 relative z-10 mb-20 text-center max-w-4xl space-y-6">
            {headline && (
                <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white">
                    {headline}
                </h2>
            )}
            {subheadline && (
                <p className="text-lg text-neutral-400 leading-relaxed">
                    {subheadline}
                </p>
            )}
        </div>

        {/* The Architectural Diagram Stack */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="max-w-5xl mx-auto flex flex-col items-center">

                {/* Layer 1: Top Products */}
                <div className="w-full flex justify-center gap-4 sm:gap-8 mb-6">
                    {topProducts.map((product, idx) => (
                        <div 
                            key={idx}
                            className="bg-slate-950/5 border border-white/10 px-6 sm:px-10 py-3 sm:py-4 rounded-xl shadow-lg backdrop-blur-sm relative group"
                        >
                            <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
                            <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-white uppercase">
                                {product}
                            </span>
                            {/* Vertical connector line pointing down */}
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-px h-6 bg-slate-950/20" />
                        </div>
                    ))}
                </div>

                {/* Layer 2: The Capability Bands (The Graph) */}
                <div className="w-full bg-[#111] border border-white/10 rounded-2xl p-6 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    {/* Ambient Glow */}

                    <div className="flex flex-col gap-4 relative z-10">
                        {capabilityBands.map((band, idx) => {
                            const IconComp = getIcon(band.iconType);
                            // We construct this as a block-level link if a CTA is provided
                            const hasLink = !!band.cta?.href;
                            const innerContent = (
                                <>
                                    <div className="flex items-center gap-4">
                                        <div className="p-2.5 rounded-lg bg-black/50 border border-white/10 text-blue-400 group-hover:text-blue-300 transition-colors">
                                            <IconComp className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </div>
                                        <span className="text-base sm:text-xl font-bold text-neutral-200 tracking-tight group-hover:text-white transition-colors">
                                            {band.label}
                                        </span>
                                    </div>
                                    {hasLink && (
                                        <div className="hidden sm:flex items-center gap-2 text-xs font-mono font-bold text-neutral-500 group-hover:text-blue-400 transition-colors uppercase tracking-wider">
                                            {band.cta?.label || "Learn More"} <ArrowRight className="w-4 h-4" />
                                        </div>
                                    )}
                                </>
                            );

                            const classNames = "group flex items-center justify-between p-4 sm:p-5 rounded-xl border border-white/5 bg-slate-950/[0.02] hover:bg-slate-950/[0.06] hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden shadow-sm";

                            return hasLink ? (
                                <a key={idx} href={band.cta?.href} className={classNames}>
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    {innerContent}
                                </a>
                            ) : (
                                <div key={idx} className={classNames}>
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    {innerContent}
                                </div>
                            );
                        })}
                    </div>

                    {/* Decorative node connecting to Substrate */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#111] border border-white/10 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500/50" />
                    </div>
                </div>

                {/* Layer 3: The Substrate Foundations */}
                <div className="w-full max-w-4xl mx-auto mt-4 sm:mt-6 bg-black border border-white/5 rounded-xl p-4 sm:p-6 shadow-inner text-center">
                    <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-6 gap-y-2">
                        {substrateFoundations.map((foundation, idx) => (
                            <React.Fragment key={idx}>
                                <span className="font-mono text-xs sm:text-sm font-medium text-neutral-500 tracking-wide uppercase">
                                    {foundation}
                                </span>
                                {idx < substrateFoundations.length - 1 && (
                                    <span className="text-neutral-700 font-bold">\u00b7</span>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

            </div>
        </div>

    </section>
  );
}

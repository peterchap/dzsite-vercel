"use client";

import React from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { DOMAINS_DISPLAY } from "@/lib/site-stats";


type PredictiveLayerSectionProps = {
  _type?: string;
  _key?: string;
  anchor?: string;
  headline?: string;
  subheadline?: string;
  architectureDiagram?: any;
  substrateFoundations?: string[];
};


export default function PredictiveLayerSection(props: PredictiveLayerSectionProps) {
  const {
    anchor = "predictive-layer",
    headline = "Datazag is the predictive layer alongside your stack.",
    subheadline = "Datazag works with ASM, DRP, brand protection and threat intelligence \u2014 not against them. Where you've invested in any of these, Datazag is the layer that makes them work better. Where you haven't, it's the zero-input place to start.",
    architectureDiagram,
    substrateFoundations = [`${DOMAINS_DISPLAY} domain corpus`, 'CertStream', 'BGP (RouteViews & RIPE RIS)']
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

                {/* Architectural Diagram Image */}
                {architectureDiagram && (
                    <div className="w-full relative overflow-hidden">
                        <Image
                            src={urlFor(architectureDiagram).url()}
                            alt={architectureDiagram.alt || "Architectural Diagram"}
                            width={1200}
                            height={600}
                            className="w-full h-auto object-contain"
                            priority
                        />
                    </div>
                )}

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

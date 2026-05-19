"use client";

import React from 'react';
import { Shield, Briefcase, Server, Mail, ArrowRight } from "lucide-react";

type Segment = {
  segmentName: string;
  leadProduct: string;
  fitDescription: string;
  partnerUrl: string;
  iconType: string;
};

type PartnershipSegmentsSectionProps = {
  _type?: string;
  _key?: string;
  anchor?: string;
  headline?: string;
  description?: string;
  cta?: {
    label?: string;
    href?: string;
    variant?: string;
  };
  segments?: Segment[];
};

const getIcon = (type: string) => {
  switch (type) {
    case 'Briefcase': return Briefcase;
    case 'Server': return Server;
    case 'Mail': return Mail;
    case 'Shield':
    default: return Shield;
  }
};

export default function PartnershipSegmentsSection(props: PartnershipSegmentsSectionProps) {
  const {
    anchor = "partnerships",
    headline = "One domain is self-serve. Many domains is a partnership.",
    description = "Datazag is built for the buyers responsible for many organisations at once. The partnership shape is consistent: your brand, your product, your customer relationship \u2014 Datazag intelligence inside.",
    cta = { label: "Talk to us about partner access", href: "/contact" },
    segments = [
        {
            segmentName: "MSSPs & MSPs",
            leadProduct: "360 Health Reports + Alerts",
            fitDescription: "Run across your client base, white-label, intelligence inside your SOC",
            partnerUrl: "/partners/mssp",
            iconType: "Shield"
        },
        {
            segmentName: "Cyber insurers / M&A",
            leadProduct: "External Platform Threat Report",
            fitDescription: "Underwriting and diligence signal, monitored across the book",
            partnerUrl: "/partners/insurers",
            iconType: "Briefcase"
        },
        {
            segmentName: "IT service providers",
            leadProduct: "Platform alerts + remediation records",
            fitDescription: "You configure their platforms; you're accountable when they're spoofed",
            partnerUrl: "/partners/it-providers",
            iconType: "Server"
        },
        {
            segmentName: "ESPs & marketing agencies",
            leadProduct: "Corpus feeds + brand/platform alerts",
            fitDescription: "Front-line protection + new product line to resell",
            partnerUrl: "/partners/agencies",
            iconType: "Mail"
        }
    ]
  } = props;

  return (
    <section id={anchor} className="relative py-24 bg-slate-950 overflow-hidden border-t border-white/5 font-sans">
        <div className="container mx-auto px-6 lg:px-12 relative z-10 mb-16 text-center max-w-4xl">
            {headline && (
                <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white mb-6">
                    {headline}
                </h2>
            )}
            {description && (
                <p className="text-lg text-neutral-400 leading-relaxed">
                    {description}
                </p>
            )}
        </div>

        <div className="w-full relative z-10">
            {/* Grid Header (Desktop Only) */}
            <div className="hidden lg:block border-b border-white/10 bg-slate-950/[0.02]">
                <div className="container mx-auto px-6 lg:px-12 py-4 grid grid-cols-[80px_200px_250px_1fr] gap-6 text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
                    <div></div> {/* Empty for icon */}
                    <div>Segment Name</div>
                    <div>Lead Product</div>
                    <div>The Fit</div>
                </div>
            </div>

            {/* Grid Rows */}
            <div className="border-b border-white/10">
                {segments.map((segment, idx) => {
                    const IconComponent = getIcon(segment.iconType);
                    return (
                        <a 
                            key={idx} 
                            href={segment.partnerUrl} 
                            className="group block border-t border-white/5 hover:bg-slate-950/5 transition-all duration-300"
                        >
                            <div className="container mx-auto px-6 lg:px-12 py-6 md:py-8">
                                <div className="grid grid-cols-1 md:grid-cols-[60px_180px_1fr] lg:grid-cols-[80px_200px_250px_1fr] gap-2 md:gap-6 items-start md:items-center">

                                    {/* Mobile: Icon + Name */}
                                    <div className="flex md:hidden items-center gap-3 mb-2">
                                        <div className="p-2 rounded-lg bg-slate-950/5 border border-white/10 group-hover:bg-slate-950/10 transition-colors">
                                            <IconComponent className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white tracking-tight">{segment.segmentName}</h3>
                                    </div>

                                    {/* Tablet/Desktop: Icon cell */}
                                    <div className="hidden md:flex items-center justify-start">
                                        <div className="p-2.5 rounded-xl bg-slate-950/5 border border-white/10 group-hover:bg-slate-950/10 group-hover:border-white/20 transition-all duration-300 shadow-xl">
                                            <IconComponent className="w-6 h-6 text-neutral-400 group-hover:text-white transition-colors" />
                                        </div>
                                    </div>

                                    {/* Tablet/Desktop: Segment Name cell */}
                                    <div className="hidden md:block">
                                        <h3 className="text-xl font-bold text-white tracking-tight">{segment.segmentName}</h3>
                                    </div>

                                    {/* Col 3: Lead Product (Desktop Only) */}
                                    <div className="hidden lg:block text-blue-300 font-medium text-sm">
                                        {segment.leadProduct}
                                    </div>

                                    {/* Col 4 / Merged Col: The Fit */}
                                    <div className="text-sm text-neutral-400 leading-relaxed md:pr-12">
                                        <span className="lg:hidden text-blue-300 font-medium block md:inline md:mr-2">
                                            {segment.leadProduct} <span className="hidden md:inline text-neutral-600">\u2014</span>
                                        </span>
                                        {segment.fitDescription}
                                    </div>

                                </div>
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>

        {/* CTA Section */}
        {cta?.label && cta?.href && (
            <div className="container mx-auto px-6 lg:px-12 mt-16 flex justify-center relative z-10">
                <a 
                    href={cta.href} 
                    className="inline-flex items-center gap-3 bg-slate-950 hover:bg-neutral-200 text-black font-bold px-8 py-4 rounded-xl shadow-xl shadow-white/5 transition-all duration-300"
                >
                    {cta.label} <ArrowRight className="w-5 h-5" />
                </a>
            </div>
        )}

    </section>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Activity, Shield } from "lucide-react";
import { PortableText } from '@portabletext/react';
import { DOMAINS_DISPLAY } from "@/lib/site-stats";

type DataLayer = {
  title: string;
  outcome: string;
  signals: string[];
};

type Why360SectionProps = {
  _type?: string;
  _key?: string;
  eyebrow?: string;
  sectionHeadline?: string;
  sectionBrief?: string;
  externalTitle?: string;
  externalBody?: string;
  trustSurfaceTitle?: string;
  trustSurfaceBody?: string;
  threatSurfaceTitle?: string;
  threatSurfaceBody?: string;
  conversionHeadline?: string;
  conversionBody?: any;
  layers?: DataLayer[];
};

const layerThemes = [
    { border: "border-blue-500/50", glow: "shadow-neon-blue", icon: <Database className="w-5 h-5 text-blue-400" /> },
    { border: "border-cyan-500/50", glow: "shadow-neon-cyan", icon: <Activity className="w-5 h-5 text-cyan-400" /> },
    { border: "border-purple-500/50", glow: "shadow-neon-purple", icon: <Shield className="w-5 h-5 text-purple-400" /> },
];

export default function Why360Section(props: Why360SectionProps) {
  const {
    eyebrow = "THE STRATEGY",
    sectionHeadline = "Why 360? The threat outside, the surface inside.",
    sectionBrief = "Impersonation only works when two things line up: infrastructure an attacker has built, and an attack surface that lets it land. The 360 Health Report covers both halves.",
    externalTitle = "The external half \u2014 your platforms, and what\u2019s targeting them.",
    externalBody = `First we map the platforms and vendors you depend on, read straight from your DNS and subdomains. Then we match that map against our ${DOMAINS_DISPLAY} domain corpus and live infrastructure feeds to surface the spoofs, lookalikes and suspicious certificates built to impersonate those exact platforms \u2014 and your brand.`,
    trustSurfaceTitle = "The Trust Surface \u2014 your verified perimeter.",
    trustSurfaceBody = "The core platforms you know and manage. We monitor the state of your DNS, your email authentication (SPF, DKIM, DMARC), and your mail configurations to identify every gap that makes impersonation easy instead of hard.",
    threatSurfaceTitle = "The Threat Surface \u2014 your active exposure.",
    threatSurfaceBody = "The unmanaged zones \u2014 forgotten vendor integrations, abandoned staging environments, and shadow IT infrastructure. We map exactly how far the existing threats could get if they hit these exposed surfaces.",
    conversionHeadline = "Upgrade to the Full 360 View",
    conversionBody = "The free report shows you the threat. It doesn\u2019t show you your exposure to it \u2014 and that\u2019s the half that tells you what to do. Add your internal attack surface and the External Platform Threat Report becomes the full 360 Health Report: your DNS and email-authentication posture analysed against the threats found, every weak point identified, and \u2014 for IT and MSSP customers \u2014 paste-ready DNS records to close the gaps, with provider-specific instructions.",
    layers = [
        {
            title: "DNS Registry Analysis",
            outcome: "Identified unmanaged subdomains exposing legacy mail records.",
            signals: ["MX Records", "TXT/SPF", "CNAME Chaining"]
        },
        {
            title: "Email Auth Verification",
            outcome: "Detected hard fail DMARC gap allowing direct domain spoofing.",
            signals: ["SPF Alignment", "DKIM Signatures", "DMARC Policy"]
        },
        {
            title: "Nameserver Profiling",
            outcome: "Found vulnerable NS delegation pointing to abandoned infrastructure.",
            signals: ["NS Delegation", "Glue Records", "Zone File Auth"]
        }
    ]
  } = props;

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
      if (!layers || layers.length === 0) return;
      const interval = setInterval(() => {
          setActiveIndex((current) => (current + 1) % layers.length);
        }, 6000);
      return () => clearInterval(interval);
  }, [layers]);


  return (
    <section className="bg-slate-950 text-white py-24 px-6 lg:px-12 xl:px-16 border-t border-white/5 overflow-hidden font-sans">
      <div className="mx-auto w-full max-w-[1600px] space-y-16">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center space-y-4">
          {eyebrow && (
            <div className="inline-block text-xs font-mono tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded">
              {eyebrow}
            </div>
          )}
          {sectionHeadline && (
            <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
              {sectionHeadline}
            </h2>
          )}
          {sectionBrief && (
            <p className="text-slate-300 text-base leading-relaxed">
              {sectionBrief}
            </p>
          )}
        </div>

        {/* The 3-Part Layout - Mobile (Cards) */}
        <div className="grid grid-cols-1 gap-8 lg:hidden">
          {/* External Card */}
          <div className="relative overflow-hidden bg-slate-950/40 border border-white/5 p-8 rounded-xl space-y-4 group hover:border-blue-500/30 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all" />
            <div className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider relative z-10">
              [ THE PHASE 1 DATA FEED ]
            </div>
            {externalTitle && (
              <h3 className="text-xl font-bold text-white tracking-tight relative z-10">
                {externalTitle}
              </h3>
            )}
            {externalBody && (
              <p className="text-slate-400 text-sm leading-relaxed relative z-10">
                {externalBody}
              </p>
            )}
          </div>

          {/* Trust Surface Card */}
          <div className="relative overflow-hidden bg-slate-950/40 border border-white/5 p-8 rounded-xl space-y-4 group hover:border-cyan-500/30 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-all" />
            <div className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider relative z-10">
              [ THE TRUST SURFACE ]
            </div>
            {trustSurfaceTitle && (
              <h3 className="text-xl font-bold text-white tracking-tight relative z-10">
                {trustSurfaceTitle}
              </h3>
            )}
            {trustSurfaceBody && (
              <p className="text-slate-400 text-sm leading-relaxed relative z-10">
                {trustSurfaceBody}
              </p>
            )}
          </div>

          {/* Threat Surface Card */}
          <div className="relative overflow-hidden bg-slate-950/40 border border-white/5 p-8 rounded-xl space-y-4 group hover:border-purple-500/30 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-all" />
            <div className="font-mono text-xs text-purple-400 font-bold uppercase tracking-wider relative z-10">
              [ THE THREAT SURFACE ]
            </div>
            {threatSurfaceTitle && (
              <h3 className="text-xl font-bold text-white tracking-tight relative z-10">
                {threatSurfaceTitle}
              </h3>
            )}
            {threatSurfaceBody && (
              <p className="text-slate-400 text-sm leading-relaxed relative z-10">
                {threatSurfaceBody}
              </p>
            )}
          </div>
        </div>

        {/* The 3-Part Layout - Desktop (360 Circle) */}
        <div className="hidden lg:flex flex-col mx-auto w-[800px] h-[800px] my-8 relative">

          {/* Top Half (180 degrees) - External */}
          <div className="w-[800px] h-[400px] relative overflow-hidden bg-slate-900/50 border-2 border-white/5 border-b border-b-white/10 rounded-t-full flex flex-col items-center justify-start pt-14 group hover:border-blue-500/30 hover:bg-slate-900/80 transition-all duration-500 hover:shadow-[0_-20px_50px_rgba(59,130,246,0.1)] mb-1 z-10">

            <div className="w-[500px] text-center relative z-10 space-y-4">
              <div className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider">
                [ THE PHASE 1 DATA FEED ]
              </div>
              {externalTitle && (
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {externalTitle}
                </h3>
              )}
              {externalBody && (
                <p className="text-slate-400 text-sm leading-relaxed">
                  {externalBody}
                </p>
              )}
            </div>
          </div>

          {/* Bottom Half Row */}
          <div className="flex justify-between w-[800px] h-[400px] z-10">
            {/* Bottom-Left Wedge (90 degrees) - Trust Surface */}
            <div className="w-[399px] h-[400px] relative overflow-hidden bg-slate-900/50 border-2 border-white/5 border-t-0 rounded-bl-full flex flex-col justify-start items-end p-16 pt-10 pr-10 group hover:border-cyan-500/30 hover:bg-slate-900/80 transition-all duration-500 hover:shadow-[-20px_20px_50px_rgba(34,211,238,0.1)]">

              <div className="w-[280px] text-right relative z-10 space-y-3">
                <div className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider">
                  [ THE TRUST SURFACE ]
                </div>
                {trustSurfaceTitle && (
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {trustSurfaceTitle}
                  </h3>
                )}
                {trustSurfaceBody && (
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {trustSurfaceBody}
                  </p>
                )}
              </div>
            </div>

            {/* Bottom-Right Wedge (90 degrees) - Threat Surface */}
            <div className="w-[399px] h-[400px] relative overflow-hidden bg-slate-900/50 border-2 border-white/5 border-t-0 rounded-br-full flex flex-col justify-start items-start p-16 pt-10 pl-10 group hover:border-purple-500/30 hover:bg-slate-900/80 transition-all duration-500 hover:shadow-[20px_20px_50px_rgba(168,85,247,0.1)]">

              <div className="w-[280px] text-left relative z-10 space-y-3">
                <div className="font-mono text-xs text-purple-400 font-bold uppercase tracking-wider">
                  [ THE THREAT SURFACE ]
                </div>
                {threatSurfaceTitle && (
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {threatSurfaceTitle}
                  </h3>
                )}
                {threatSurfaceBody && (
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {threatSurfaceBody}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Center Connector Dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-[6px] border-slate-950 bg-white/5 flex items-center justify-center z-20 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            <div className="w-full h-full bg-slate-400 rounded-full flex overflow-hidden">
               {/* Tiny 3-part split for the center dot */}
               <div className="absolute top-0 left-0 w-full h-1/2 bg-blue-500" />
               <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-cyan-500" />
               <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-purple-500" />
            </div>
          </div>

        </div>

        {/* The Conversion Engine Block */}
        <div className="relative mt-10 overflow-hidden bg-gradient-to-r from-slate-950 to-blue-950/30 border-2 border-purple-500/20 p-8 md:p-12 rounded-2xl shadow-xl shadow-purple-950/10">

          <div className="w-full space-y-6 relative z-10">
            {conversionHeadline && (
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {conversionHeadline}
              </h3>
            )}

            {conversionBody && (
              <div className="space-y-4 prose prose-invert max-w-none prose-p:text-slate-300 prose-p:text-base prose-p:leading-relaxed prose-strong:text-white prose-a:text-blue-400 hover:prose-a:text-blue-300">
                {typeof conversionBody === 'string' ? (
                  <p className="text-slate-300 text-base leading-relaxed">{conversionBody}</p>
                ) : (
                  <PortableText value={conversionBody} />
                )}
              </div>
            )}

            <div className="pt-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <button className="w-full sm:w-auto bg-purple-600 hover:bg-purple-500 text-white font-medium px-6 py-3.5 rounded-lg text-base shadow-lg shadow-purple-900/20 transition-all whitespace-nowrap">
                Complete Your 360 Profile
              </button>
              <span className="text-xs font-mono text-slate-400">
                From there, Brand & Platform Alerts keep your stack continuously current.
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

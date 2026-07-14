"use client";

import React from 'react';
import { motion } from 'framer-motion';

type MechanismItem = {
  stepNumber?: string;
  mechanismName?: string;
  systemTag?: string;
  description?: string;
};

type HowItWorksSectionProps = {
  _type?: string;
  _key?: string;
  eyebrow?: string;
  systemTitle?: string;
  systemDescription?: string;
  mechanisms?: MechanismItem[];
};

export default function HowItWorksSection(props: HowItWorksSectionProps) {
  const {
    eyebrow = "THE SYSTEM",
    systemTitle = "How vendor impersonation detection works in practice.",
    systemDescription = "Four mechanisms operating at the internet's foundational layers, transforming raw global telemetry into instant defensive actions.",
    mechanisms = [
      {
        stepNumber: '01',
        mechanismName: 'Platform Fingerprinting',
        systemTag: 'MAPPING',
        description: 'One work email gives us your domain. We analyze its DNS and subdomains to map the platforms and vendors you depend on. No input from you, no manual asset lists required.'
      },
      {
        stepNumber: '02',
        mechanismName: 'Corpus Matching',
        systemTag: 'ANALYSIS',
        description: 'Every candidate domain is checked against two signals: the known DNS footprint of the platform or brand it appears to spoof (records, infrastructure, hosting patterns), and its own internet context \u2014 where it\u2019s hosted and the risk profile of the surrounding infrastructure. Together those signals separate genuine spoofs from coincidental lookalikes.'
      },
      {
        stepNumber: '03',
        mechanismName: 'Build-Time Detection',
        systemTag: 'EARLIEST_SIGNAL',
        description: 'Impersonation infrastructure is flagged as it\u2019s provisioned \u2014 registered, certificated, resolving \u2014 before the phishing or fraud campaign that uses it ever launches. We catch them while they are staging.'
      },
      {
        stepNumber: '04',
        mechanismName: 'Pre-Arrival Blocking',
        systemTag: 'AUTOMATION',
        description: 'Detected infrastructure feeds directly into your existing blocking stack \u2014 email security, DNS resolvers, web gateways \u2014 so the threat never reaches your inboxes, browsers, or APIs.'
      }
    ]
  } = props;

  return (
    <section className="bg-slate-950 text-white py-24 px-6 lg:px-12 xl:px-16 border-t border-white/5 overflow-hidden">
      <div className="mx-auto w-full max-w-[1600px] flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

        {/* Sticky Left Column: The Concept Title & Visual Indicator */}
        <div className="w-full lg:w-[35%] space-y-6 lg:sticky lg:top-32">
          {eyebrow && (
            <div className="inline-block text-xs font-mono tracking-widest text-purple-400 bg-purple-500/10 px-3 py-1 rounded">
              {eyebrow}
            </div>
          )}
          {systemTitle && (
            <h2 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">
              {systemTitle}
            </h2>
          )}
          {systemDescription && (
            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
              {systemDescription}
            </p>
          )}

          {/* Neon Signal Line Visual Accent (Nodding to the Hero Image Timeline) */}
          <div className="hidden lg:block w-full h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-transparent opacity-50 mt-8" />
        </div>

        {/* Right Column: The Explanatory Content Stream */}
        <div className="w-full lg:w-[65%] relative pl-6 lg:pl-10 space-y-16 border-l border-white/10">

          {mechanisms.map((mech, index) => (
            <motion.div 
              key={mech.stepNumber || index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative space-y-4 group"
            >
              {/* Timeline Junction Node */}
              <div className="absolute -left-[33px] lg:-left-[49px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)] transition-all duration-300 group-hover:border-purple-400 group-hover:shadow-[0_0_12px_rgba(168,85,247,0.8)]" />

              {/* Data Headers */}
              <div className="flex flex-wrap items-center gap-3">
                {mech.stepNumber && (
                  <span className="font-mono text-xs text-slate-400 tracking-tight">
                    [{mech.stepNumber}]
                  </span>
                )}
                {mech.mechanismName && (
                  <h3 className="text-xl font-bold text-white tracking-tight transition-colors duration-300 group-hover:text-blue-400">
                    {mech.mechanismName}
                  </h3>
                )}
                {mech.systemTag && (
                  <span className="font-mono text-[10px] tracking-wider text-slate-400 bg-slate-950/5 border border-white/10 px-2 py-0.5 rounded">
                    {mech.systemTag}
                  </span>
                )}
              </div>

              {/* Mechanism Description Body */}
              {mech.description && (
                <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
                  {mech.description}
                </p>
              )}
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}

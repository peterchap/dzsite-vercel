"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code, ArrowRight } from "lucide-react";
import { DOMAINS_DISPLAY } from "@/lib/site-stats";

type DeliveryMode = {
  phase: string;
  productName: string;
  cadence: string;
  deliveredAs: string;
  leadBuyer: string;
  outputAnswers: string;
  roleInDefensiveAI?: string;
  ctaLabel: string;
  ctaUrl: string;
  themeColor: "blue" | "purple" | "cyan";
};

type DeliveryModesSectionProps = {
  _type?: string;
  _key?: string;
  anchor?: string;
  headline?: string;
  description?: string;
  modes?: DeliveryMode[];
};

const getAccentStyles = (color: string) => {
    switch (color) {
        case "purple":
            return {
                border: "border-purple-500/50",
                glow: "shadow-neon-purple",
                text: "text-purple-400",
                bg: "bg-purple-500/10",
                button: "bg-purple-600 hover:bg-purple-500",
            };
        case "cyan":
            return {
                border: "border-cyan-500/50",
                glow: "shadow-neon-cyan",
                text: "text-cyan-400",
                bg: "bg-cyan-500/10",
                button: "bg-cyan-600 hover:bg-cyan-500",
            };
        case "blue":
        default:
            return {
                border: "border-blue-500/50",
                glow: "shadow-neon-blue",
                text: "text-blue-400",
                bg: "bg-blue-500/10",
                button: "bg-blue-600 hover:bg-blue-500",
            };
    }
};

export default function DeliveryModesSection(props: DeliveryModesSectionProps) {
  const {
    anchor = "delivery-modes",
    headline = "One engine. Three ways to put it to work.",
    description = `Every Datazag product runs on the same Graph \u2014 the ${DOMAINS_DISPLAY} domain corpus, live CertStream, BGP and DNS pipelines. Pick the way you want to consume it.`,
    modes = [
        {
            phase: "ASSESS",
            productName: "360 Health Report",
            cadence: "Point-in-time",
            deliveredAs: "Shareable report",
            leadBuyer: "Organization or MSSP for their client",
            outputAnswers: "\"Where am I exposed today?\"",
            roleInDefensiveAI: "Baseline mapping",
            ctaLabel: "See sample report",
            ctaUrl: "#",
            themeColor: "blue" as const
        },
        {
            phase: "MONITOR",
            productName: "Platform & Brand alerts",
            cadence: "Continuous, real-time",
            deliveredAs: "Feed into your security stack",
            leadBuyer: "SOC / IT operations",
            outputAnswers: "\"What's targeting me right now?\"",
            roleInDefensiveAI: "Active threat detection",
            ctaLabel: "See alert format",
            ctaUrl: "#",
            themeColor: "cyan" as const
        },
        {
            phase: "BUILD",
            productName: "Datasets on cloud marketplaces",
            cadence: "Continuous data refresh",
            deliveredAs: "Marketplace share, webhooks, API, white-label",
            leadBuyer: "Email security teams, data teams",
            outputAnswers: "\"How do I build with this data?\"",
            roleInDefensiveAI: "Model training & automation",
            ctaLabel: "See marketplace listings",
            ctaUrl: "#",
            themeColor: "purple" as const
        }
    ]
  } = props;

  return (
    <section id={anchor} className="relative py-24 bg-slate-950 overflow-hidden border-t border-white/5 font-sans text-white">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">

            {/* Header */}
            <div className="max-w-3xl mb-16 space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                    {headline}
                </h2>
                {description && (
                    <p className="text-lg text-neutral-400 leading-relaxed max-w-2xl">
                        {description}
                    </p>
                )}
            </div>

            <div className="grid lg:grid-cols-12 gap-12 items-start">

                {/* Left Side: Table/List of Modes */}
                <div className="lg:col-span-7 space-y-6">
                    {modes.map((mode, idx) => {
                        const styles = getAccentStyles(mode.themeColor);
                        return (
                            <div key={idx} className="relative overflow-hidden rounded-2xl bg-slate-950/5 border border-white/10 p-8 backdrop-blur-sm group hover:bg-slate-950/10 transition-colors">

                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                                    <div>
                                        <div className={`font-mono text-xs font-bold uppercase tracking-wider mb-2 ${styles.text}`}>
                                            [ {mode.phase} ]
                                        </div>
                                        <h3 className="text-2xl font-bold tracking-tight text-white">
                                            {mode.productName}
                                        </h3>
                                    </div>
                                    <div className="bg-black/50 border border-white/5 px-4 py-2 rounded-lg inline-flex items-center text-sm font-mono text-neutral-300">
                                        {mode.outputAnswers}
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 pt-6 border-t border-white/10">
                                    <div>
                                        <div className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Cadence</div>
                                        <div className="text-sm font-medium text-neutral-200">{mode.cadence}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Delivered As</div>
                                        <div className="text-sm font-medium text-neutral-200">{mode.deliveredAs}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Lead Buyer</div>
                                        <div className="text-sm font-medium text-neutral-200">{mode.leadBuyer}</div>
                                    </div>
                                    {mode.roleInDefensiveAI && (
                                        <div>
                                            <div className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Role in Defensive AI</div>
                                            <div className="text-sm font-medium text-neutral-200">{mode.roleInDefensiveAI}</div>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <a href={mode.ctaUrl} className={`inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide transition-colors ${styles.text} hover:text-white`}>
                                        {mode.ctaLabel} <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Right Side: Code Illustrations */}
                <div className="lg:col-span-5 space-y-6 sticky top-24">

                    {/* JSON Feed Illustration */}
                    <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] overflow-hidden shadow-2xl">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/40">
                            <div className="flex items-center gap-2">
                                <Code className="w-4 h-4 text-neutral-500" />
                                <span className="text-xs font-mono text-neutral-400">
                                    datazag_feed_monitor.json
                                </span>
                            </div>
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                            </div>
                        </div>
                        <div className="p-6 overflow-x-auto">
                            <pre className="text-xs font-mono text-cyan-400 leading-relaxed">
{`{
  "event_type": "domain_impersonation",
  "severity": "CRITICAL",
  "timestamp": "2026-05-18T12:04:00Z",
  "target_brand": "YourOrganization",
  "threat_vector": {
    "domain": "login-yourorganization-secure.com",
    "registrar": "Eranet International",
    "dns_status": "Resolving",
    "mx_records": ["mail.attacker-infra.net"]
  },
  "action_required": "Initiate takedown workflow"
}`}
                            </pre>
                        </div>
                    </div>

                    {/* Webhooks Illustration */}
                    <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] overflow-hidden shadow-2xl relative">
                        <div className="absolute inset-0 bg-purple-500/5 pointer-events-none" />
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/40 relative z-10">
                            <div className="flex items-center gap-2">
                                <Terminal className="w-4 h-4 text-neutral-500" />
                                <span className="text-xs font-mono text-neutral-400">
                                    real_time_webhooks.sh
                                </span>
                            </div>
                        </div>
                        <div className="p-6 overflow-x-auto relative z-10">
                            <pre className="text-xs font-mono text-purple-300 leading-relaxed">
{`# Connect your SOC directly to the pipeline
curl -X POST https://api.datazag.com/v1/webhooks \\
  -H "Authorization: Bearer dz_live_..." \\
  -d '{
    "endpoint": "https://siem.yourdomain.com/ingest",
    "events": [
      "certificate_issued",
      "mx_record_changed"
    ],
    "filter": {
      "target_brands": ["YourOrganization"]
    }
  }'`}
                            </pre>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </section>
  );
}

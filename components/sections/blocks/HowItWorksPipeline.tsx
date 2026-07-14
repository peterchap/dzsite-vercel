import React from 'react';
import { DOMAINS_DISPLAY } from "@/lib/site-stats";

interface PipelineStage {
  stageNumber: string;
  stageTitle: string;
  bodyText: string;
}

interface PipelineGridProps {
  headline?: string;
  subhead?: string;
  stages?: PipelineStage[];
}

export default function HowItWorksPipeline({ headline, subhead, stages }: PipelineGridProps) {
  // Production-grade fallback defaults if Sanity fields are unpopulated
  const defaultStages = stages || [
    {
      stageNumber: '[01]',
      stageTitle: 'Ingestion at Scale',
      bodyText: 'We continuously process active certificate transparency logs (CertStream), BGP routing tables, and global DNS updates, capturing infrastructure modifications live.'
    },
    {
      stageNumber: '[02]',
      stageTitle: 'Graph Enrichment',
      bodyText: `Incoming domains are mapped against our ${DOMAINS_DISPLAY} domain historical corpus. We isolate infrastructure footprints, configurations, and network risk indices.`
    },
    {
      stageNumber: '[03]',
      stageTitle: 'Edge Delivery',
      bodyText: 'Correlated telemetry streams directly into your operational stack. Zero dashboards required—high-fidelity data blocks are pushed straight to your APIs and SIEM tools.'
    }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-24 bg-[#0A0F1C] border-t border-white/5 font-sans text-left">
      <div className="space-y-16">
        
        {/* Text Top Block */}
        <div className="max-w-3xl space-y-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
            {headline || 'From Raw Telemetry to Defensive Action'}
          </h2>
          <p className="text-slate-400 text-sm lg:text-base leading-relaxed">
            {subhead || 'How our data pipeline ingests, correlates, and pushes threat infrastructure updates globally.'}
          </p>
        </div>

        {/* 3-Column Pipeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {defaultStages.map((stage, index) => (
            <div 
              key={index} 
              className="bg-slate-900/20 border border-white/5 p-6 rounded-xl space-y-4 hover:border-blue-500/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-blue-400 tracking-wider">
                  {stage.stageNumber}
                </span>
                <div className="h-1 w-12 bg-gradient-to-r from-blue-500/30 to-transparent rounded" />
              </div>
              
              <h3 className="text-lg font-bold text-white tracking-tight">
                {stage.stageTitle}
              </h3>
              
              <p className="text-slate-300 text-xs lg:text-sm leading-relaxed">
                {stage.bodyText}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

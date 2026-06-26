import { sanityFetch } from "@/sanity/fetch";
import { howItWorksPageDataQuery } from "@/sanity/queries";
import { PageShell } from "@/components/layout/PageShell";
import React from "react";
import { ChevronRight, ShieldCheck, Activity } from "lucide-react";
import HowItWorksPipeline from "@/components/sections/blocks/HowItWorksPipeline";
import { SectionRenderer } from "@/components/sections/SectionRenderer";

export const metadata = {
  title: 'How It Works | Datazag',
  description: 'Learn how Datazag transforms raw internet registry noise into instant defensive blocklines.',
}

export default async function HowItWorksPage() {
  const data = await sanityFetch<any>(howItWorksPageDataQuery, {});

  if (!data?.hero) {
    return (
      <PageShell>
        <div className="text-white p-20 text-center">
          How It Works Content Not Found. Please configure the howItWorksHero document in Sanity Studio.
        </div>
      </PageShell>
    );
  }

  const { hero, pageSections } = data;
  const pipeline = hero?.pipelineGrid;

  return (
    <PageShell>
      <section className="relative w-full min-h-screen py-24 flex flex-col items-center">
        {/* Header Block */}
        <div className="text-center max-w-4xl mb-24 px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 text-white">
            {hero.pageH1 || "The Datazag Engine"}
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {hero.pageSubhead}
          </p>
        </div>

        {/* Schematic Grid */}
        <div className="w-full max-w-[90rem] px-4 flex flex-col xl:flex-row items-stretch justify-center gap-8 relative">
          
          {/* Left Panel - Product Stack */}
          <div className="flex-1 bg-[#131326]/50 border border-white/10 rounded-2xl p-8 lg:p-10 backdrop-blur-xl flex flex-col shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-400 opacity-50"></div>
            <h2 className="text-sm tracking-[0.2em] text-gray-400 font-bold mb-8 uppercase flex items-center gap-3">
              <Activity className="w-5 h-5 text-blue-400" />
              {hero.leftPanelHeader || "THE DATAZAG PRODUCT MATRIX"}
            </h2>
            <div className="flex flex-col gap-6 flex-1">
              {hero.productLayers?.map((layer: any, idx: number) => (
                <div key={idx} className="bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors rounded-xl p-6 group">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end border-b border-white/10 pb-4 mb-4 gap-2">
                    <span className="text-xs uppercase tracking-widest text-blue-400 font-bold">{layer.phase}</span>
                    <span className="text-lg font-medium text-white">{layer.focus}</span>
                  </div>
                  <ul className="space-y-3">
                    {layer.bullets?.map((b: string, i: number) => (
                      <li key={i} className="text-sm text-gray-400 flex items-start">
                        <ChevronRight className="w-4 h-4 mr-2 text-blue-500/70 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Center Animated Connector (Desktop only) */}
          <div className="hidden xl:flex flex-col justify-center items-center w-40 shrink-0 relative">
            <div className="text-[10px] uppercase tracking-widest text-cyan-400 absolute top-1/2 -translate-y-12 whitespace-nowrap font-bold">
              Real-Time Signals Feed
            </div>
            {/* The Track */}
            <div className="w-full h-[2px] bg-white/10 relative overflow-hidden flex items-center">
               {/* The Pulse */}
               <div className="absolute left-0 h-[2px] w-1/2 bg-cyan-400 shadow-[0_0_15px_#22d3ee] animate-feed-stream rounded-full"></div>
            </div>
            {/* Arrow Head */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[6px] border-y-transparent border-l-[8px] border-l-cyan-400/50"></div>
          </div>
          
          {/* Mobile connector */}
          <div className="xl:hidden flex justify-center py-8">
             <div className="flex flex-col items-center gap-2">
               <span className="text-[10px] uppercase tracking-widest text-cyan-400 font-bold">Real-Time Signals Feed</span>
               <div className="h-12 w-[2px] bg-white/10 relative overflow-hidden">
                 <div className="absolute top-0 w-full h-1/2 bg-cyan-400 shadow-[0_0_15px_#22d3ee] animate-feed-stream-vertical rounded-full"></div>
               </div>
               <div className="w-0 h-0 border-x-[6px] border-x-transparent border-t-[8px] border-t-cyan-400/50"></div>
             </div>
          </div>

          {/* Right Panel - Security Stack */}
          <div className="flex-1 bg-[#131326]/50 border border-white/10 rounded-2xl p-8 lg:p-10 backdrop-blur-xl flex flex-col shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-400 opacity-50"></div>
            <h2 className="text-sm tracking-[0.2em] text-gray-400 font-bold mb-8 uppercase flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              {hero.rightPanelHeader || "YOUR SECURITY STACK"}
            </h2>
            <div className="flex flex-col gap-6 flex-1">
              {hero.securityLayers?.map((layer: any, idx: number) => (
                <div key={idx} className="bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors rounded-xl p-6">
                  <h3 className="text-lg font-medium text-white mb-4 border-b border-white/10 pb-4">{layer.title}</h3>
                  <ul className="space-y-3">
                    {layer.bullets?.map((b: string, i: number) => (
                      <li key={i} className="text-sm text-gray-400 flex items-start">
                        <span className="w-4 h-4 mr-3 mt-0.5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                        </span>
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Far-Right Outcome Connector & Block */}
          <div className="hidden 2xl:flex flex-col justify-center items-center w-24 shrink-0 relative">
             <div className="w-full h-[2px] bg-white/10 relative overflow-hidden flex items-center">
               <div className="absolute left-0 h-[2px] w-1/2 bg-green-500 shadow-[0_0_15px_#22c55e] animate-feed-stream rounded-full" style={{ animationDelay: '0.5s' }}></div>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[6px] border-y-transparent border-l-[8px] border-l-green-500/50"></div>
          </div>
          
          <div className="2xl:hidden flex justify-center py-8">
             <div className="h-12 w-[2px] bg-white/10 relative overflow-hidden">
               <div className="absolute top-0 w-full h-1/2 bg-green-500 shadow-[0_0_15px_#22c55e] animate-feed-stream-vertical rounded-full" style={{ animationDelay: '0.5s' }}></div>
             </div>
          </div>

          <div className="flex-1 2xl:max-w-[300px] bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-8 backdrop-blur-xl flex flex-col justify-center text-center shadow-[0_0_30px_rgba(16,185,129,0.1)] relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
             <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent"></div>
             <div className="text-emerald-400 mb-6 relative">
                <div className="w-16 h-16 mx-auto bg-emerald-500/10 rounded-full flex items-center justify-center ring-1 ring-emerald-500/30 group-hover:ring-emerald-500/50 group-hover:scale-110 transition-all duration-500">
                  <ShieldCheck className="w-8 h-8" />
                </div>
             </div>
             <p className="text-sm font-bold text-emerald-300 uppercase tracking-widest leading-loose relative">
               {hero.outcomeLabel}
             </p>
          </div>

        </div>

        {/* Footer Footnote */}
        <div className="mt-24 text-xs text-gray-500 font-mono tracking-widest text-center px-4 max-w-3xl">
           {hero.schematicFootnote}
        </div>

        {/* Custom Animations */}
        <style>{`
          @keyframes feedStream {
            0% { left: -100%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { left: 100%; opacity: 0; }
          }
          @keyframes feedStreamVertical {
            0% { top: -100%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
          .animate-feed-stream {
            animation: feedStream 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
          .animate-feed-stream-vertical {
            animation: feedStreamVertical 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
        `}</style>
      </section>

      {/* Pipeline Component Directly Beneath Hero */}
      <HowItWorksPipeline 
        headline={pipeline?.sectionHeadline} 
        subhead={pipeline?.sectionSubhead} 
        stages={pipeline?.pipelineStages} 
      />

      {/* Dynamic Sections Array (e.g., VendorThesis, HowItWorks, Why360) */}
      {pageSections && pageSections.length > 0 && (
        <SectionRenderer sections={pageSections} />
      )}
    </PageShell>
  );
}

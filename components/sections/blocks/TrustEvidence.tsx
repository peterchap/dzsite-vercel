import React from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { ShieldCheck, Lock, Cloud, KeyRound, FileText, Gauge, Timer, Zap, Globe } from "lucide-react";

const readinessIconMap: Record<string, React.ComponentType<any>> = {
  lock: Lock,
  cloud: Cloud,
  key: KeyRound,
  shield: ShieldCheck,
  audit: FileText,
};

const metricIconMap: Record<string, React.ComponentType<any>> = {
  none: () => null,
  clock: Timer,
  gauge: Gauge,
  bolt: Zap,
  globe: Globe,
};

type Metric = { value: string; label: string; icon?: string };
type Signal = { text: string; icon?: string };

export function TrustEvidence({
  anchor,
  isDark,
  authorityStatement,
  metrics = [],
  readinessSignals = [],
  socialProof,
}: {
  anchor?: string;
  isDark?: boolean;
  authorityStatement?: string;
  metrics?: Metric[];
  readinessSignals?: Signal[];
  socialProof?: string;
}) {
  const SectionIcon = ({ name, className }: { name?: string; className?: string }) => {
    if (!name) return null as any;
    const Icon = (readinessIconMap[name] || metricIconMap[name] || (() => null)) as any;
    return Icon ? <Icon className={className} /> : null;
  };

  return (
    <section id={anchor} className={cn("py-24 border-y border-slate-100", isDark ? "bg-slate-50" : "bg-white")}> 
      <Container>
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white/80 shadow-2xl px-8 py-12 md:px-16 md:py-16 text-center">
            {authorityStatement ? (
              <p className="mx-auto max-w-4xl text-xl md:text-2xl font-medium leading-relaxed text-slate-800">
                {authorityStatement}
              </p>
            ) : null}

            {metrics?.length ? (
              <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
                {metrics.slice(0, 4).map((m, i) => {
                  const MIcon = (m.icon ? metricIconMap[m.icon] : undefined) || metricIconMap["none"];
                  return (
                    <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                      {m.icon && m.icon !== "none" ? (
                        <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 ring-1 ring-blue-100">
                          <MIcon className="h-4 w-4 text-blue-600" />
                        </div>
                      ) : null}
                      <div className="text-sm font-bold tracking-tight text-slate-700">{m.value}</div>
                      <div className="mt-1 text-sm text-slate-500">{m.label}</div>
                    </div>
                  );
                })}
              </div>
            ) : null}

            {readinessSignals?.length ? (
              <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 auto-rows-fr justify-items-stretch items-stretch">
                {readinessSignals.slice(0, 6).map((s, i) => {
                  const SIcon = s.icon ? readinessIconMap[s.icon] : undefined;
                  return (
                    <div key={i} className="flex h-full w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">
                      {SIcon ? <SIcon className="h-4 w-4 text-blue-600" /> : <ShieldCheck className="h-4 w-4 text-blue-600" />}
                      {s.text}
                    </div>
                  );
                })}
              </div>
            ) : null}

            {socialProof ? (
              <p className="mx-auto mt-12 max-w-3xl text-sm text-slate-500">{socialProof}</p>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}

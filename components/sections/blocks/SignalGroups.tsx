import React from "react";
import { Shield, Globe, Network, KeyRound, History } from "lucide-react";

type Group = { title: string; description: string };

type Props = {
  title: string;
  intro?: string;
  groups: Group[];
  footerLine?: string;
  opsNote?: string;
};

const iconFor = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes("lifecycle")) return <Globe className="h-5 w-5 text-blue-600" />;
  if (t.includes("certificate")) return <KeyRound className="h-5 w-5 text-blue-600" />;
  if (t.includes("dns")) return <Network className="h-5 w-5 text-blue-600" />;
  if (t.includes("infrastructure")) return <Shield className="h-5 w-5 text-blue-600" />;
  if (t.includes("historical")) return <History className="h-5 w-5 text-blue-600" />;
  return <Shield className="h-5 w-5 text-blue-600" />;
};

export default function SignalGroups({
  title,
  intro,
  groups,
  footerLine,
  opsNote,
  isDark
}: Props & { isDark?: boolean }) {
  return (
    <section className={`relative overflow-hidden py-12 ${isDark ? 'bg-slate-50' : 'bg-white'}`}>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Centered header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">{title}</h2>
          {intro ? <p className="mt-4 text-lg text-slate-600">{intro}</p> : null}
        </div>

        {/* Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {groups?.map((g, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* accent bar */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400" />

              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-2xl bg-blue-50 p-3 ring-1 ring-blue-100">
                  {iconFor(g.title)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{g.title}</h3>
                  <p className="mt-2 text-slate-600">{g.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer / ops callout */}
        {(footerLine || opsNote) && (
          <div className="mx-auto mt-12 max-w-4xl rounded-3xl border border-slate-200 bg-white/80 p-6 text-center shadow-sm backdrop-blur">
            {footerLine ? <p className="text-slate-700">{footerLine}</p> : null}
            {opsNote ? <p className="mt-2 text-sm text-slate-500">{opsNote}</p> : null}
          </div>
        )}
      </div>
    </section>
  );
}


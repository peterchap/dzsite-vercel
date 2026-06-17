"use client";

import React, { useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";

type Persona = { key?: string; label?: string; description?: string; sampleSummary?: string };
type Language = { name?: string; available?: boolean };
type Cta = { label?: string; href?: string; variant?: string };

type Props = {
  anchor?: string;
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  personas?: Persona[];
  languages?: Language[];
  formatNote?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
};

export default function HealthReportSelector({
  eyebrow,
  headline,
  subheadline,
  personas = [],
  languages = [],
  formatNote,
  primaryCta,
  secondaryCta,
}: Props) {
  const [active, setActive] = useState(0);
  const current = personas[active] ?? {};

  return (
    <section className="bg-slate-950 py-20 border-t border-white/5">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow && (
            <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3">{eyebrow}</p>
          )}
          {headline && (
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{headline}</h2>
          )}
          {subheadline && <p className="mt-4 text-lg text-slate-300">{subheadline}</p>}
        </div>

        {/* Persona tabs */}
        {personas.length > 0 && (
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {personas.map((p, i) => (
              <button
                key={p.key ?? i}
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={`rounded-full px-4 py-2 text-sm font-medium transition border ${
                  i === active
                    ? "bg-gradient-to-r from-blue-600 to-cyan-400 text-white border-transparent"
                    : "border-white/10 bg-slate-950 text-slate-300 hover:bg-white/5"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        )}

        {/* Selected persona detail + placeholder sample */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
            <h3 className="text-lg font-bold text-white">{current.label}</h3>
            {current.description && (
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{current.description}</p>
            )}
            {languages.length > 0 && (
              <div className="mt-6">
                <label className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">Language</label>
                <select className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-200">
                  {languages.map((l, i) => (
                    <option key={i} value={l.name} disabled={!l.available}>
                      {l.name}{l.available ? "" : " — coming soon"}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {formatNote && <p className="mt-4 text-xs text-slate-400 leading-relaxed">{formatNote}</p>}
          </div>

          {/* Placeholder sample preview */}
          <div className="rounded-2xl border border-dashed border-white/15 bg-slate-950 p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">Sample preview</span>
              <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-slate-400">Illustrative</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              {current.sampleSummary || "A sample report for this persona will appear here."}
            </p>
            <p className="mt-4 text-[11px] italic text-slate-500">
              Placeholder — a persona-specific sample report will be embedded here.
            </p>
          </div>
        </div>

        {(primaryCta?.label || secondaryCta?.label) && (
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {primaryCta?.label && primaryCta?.href && (
              <ButtonLink href={primaryCta.href} variant={(primaryCta.variant as any) ?? "primary"} size="lg">
                {primaryCta.label}
              </ButtonLink>
            )}
            {secondaryCta?.label && secondaryCta?.href && (
              <ButtonLink href={secondaryCta.href} variant={(secondaryCta.variant as any) ?? "secondary"} size="lg">
                {secondaryCta.label}
              </ButtonLink>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";

import { track } from "@/lib/analytics";

export type SampleDownload = { label: string; href: string; format: string };
export type Sample = {
  key: string;
  tab: string;
  title: string;
  text: string;
  image: { src: string; alt: string };
  downloads: SampleDownload[];
};

/** Section 4: one tab per output, each a real render with its download. */
export function SampleTabs({ samples }: { samples: Sample[] }) {
  const [active, setActive] = useState(samples[0]?.key);
  const current = samples.find((s) => s.key === active) ?? samples[0];
  if (!current) return null;

  return (
    <div>
      <div role="tablist" aria-label="Sample outputs" className="flex flex-wrap gap-2">
        {samples.map((s) => (
          <button
            key={s.key}
            role="tab"
            id={`sample-tab-${s.key}`}
            aria-selected={s.key === current.key}
            aria-controls={`sample-panel-${s.key}`}
            onClick={() => setActive(s.key)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              s.key === current.key
                ? "border-cyan-300/50 bg-cyan-300 text-slate-950"
                : "border-white/15 bg-white/5 text-white hover:bg-white/10"
            }`}
          >
            {s.tab}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`sample-panel-${current.key}`}
        aria-labelledby={`sample-tab-${current.key}`}
        className="mt-6 grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 md:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"
      >
        <div>
          <h3 className="text-2xl font-semibold text-white">{current.title}</h3>
          <p className="mt-4 text-base leading-7 text-slate-300">{current.text}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {current.downloads.map((d) => (
              <a
                key={d.href}
                href={d.href}
                download={d.format === "html" ? undefined : true}
                target={d.format === "html" ? "_blank" : undefined}
                rel={d.format === "html" ? "noopener" : undefined}
                onClick={() => track("sample_download", { sample: current.key, format: d.format })}
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {d.label}
              </a>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-400">Samples use fictional organizations.</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- static sample renders */}
        <img
          src={current.image.src}
          alt={current.image.alt}
          loading="lazy"
          className="w-full rounded-2xl border border-white/10 bg-white"
        />
      </div>
    </div>
  );
}

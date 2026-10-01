/**
 * Building blocks shared by the research posts under /intelligence. Dark theme,
 * matching the case study. Kept deliberately small: a post is prose, tables and
 * a few bars, and its figures come from the post's own data.ts.
 */
import type { ReactNode } from "react";

export function Label({ num, children }: { num: string; children: ReactNode }) {
  return (
    <div className="mb-6 flex items-baseline gap-4">
      <span className="font-mono text-sm font-semibold text-amber-300">{num}</span>
      <h2 className="text-2xl font-semibold tracking-tight text-white md:text-4xl">{children}</h2>
    </div>
  );
}

export function Section({ children }: { children: ReactNode }) {
  return (
    <section className="relative border-b border-white/10 py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function P({ children, lede }: { children: ReactNode; lede?: boolean }) {
  return <p className={`mb-5 max-w-3xl ${lede ? "text-lg leading-8 text-slate-200" : "text-base leading-7 text-slate-300"}`}>{children}</p>;
}

export function Note({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="my-8 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.035] p-6">
      <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{title}</p>
      <div className="text-base leading-7 text-slate-300">{children}</div>
    </div>
  );
}

export function Table({ caption, head, rows }: { caption: string; head: string[]; rows: ReactNode[][] }) {
  return (
    <figure className="my-8 overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead className="bg-white/[0.04] font-mono text-[11px] uppercase tracking-[0.12em] text-slate-400">
          <tr>{head.map((h, i) => <th key={`${i}-${h}`} className="px-4 py-3">{h}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-white/10 text-slate-200">
          {rows.map((r, i) => (
            <tr key={i}>{r.map((c, j) => <td key={j} className="px-4 py-3 tabular-nums">{c}</td>)}</tr>
          ))}
        </tbody>
      </table>
      <figcaption className="border-t border-white/10 px-4 py-3 text-xs leading-5 text-slate-400">{caption}</figcaption>
    </figure>
  );
}

/** `display` overrides the printed value (for shares too small for one decimal place). */
export function Bar({ label, pct, tone, display }: { label: string; pct: number; tone: "amber" | "cyan"; display?: string }) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 sm:grid-cols-[200px_1fr_70px]">
      <span className="text-sm font-medium text-slate-200">{label}</span>
      <span className="col-span-2 block h-5 bg-white/[0.07] sm:col-span-1">
        <span className={`block h-full ${tone === "amber" ? "bg-amber-300/80" : "bg-cyan-300/80"}`} style={{ width: `${pct}%` }} />
      </span>
      <span className="row-start-1 text-right font-mono text-sm tabular-nums text-slate-300 sm:col-start-3 sm:row-start-auto">{display ?? `${pct.toFixed(1)}%`}</span>
    </div>
  );
}

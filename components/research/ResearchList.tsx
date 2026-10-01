import Link from "next/link";

import { researchDate, researchHref, type ResearchPiece } from "@/lib/research";

/** Cards for research pieces, newest first. Renders nothing for an empty list. */
export function ResearchList({ pieces }: { pieces: ResearchPiece[] }) {
  if (pieces.length === 0) return null;
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {pieces.map((p) => (
        <Link
          key={p.slug}
          href={researchHref(p)}
          className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition hover:border-cyan-300/40 hover:bg-white/[0.06]"
        >
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-slate-400">
            <span className="text-amber-300">{p.kind}</span> · <time dateTime={p.publishedOn}>{researchDate(p.publishedOn)}</time>
          </p>
          <h3 className="mt-4 text-xl font-semibold leading-snug text-white group-hover:text-cyan-100">{p.title}</h3>
          <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">{p.summary}</p>
          <span className="mt-5 text-sm font-semibold text-cyan-200">Read →</span>
        </Link>
      ))}
    </div>
  );
}

type ContinueExploringProps = {
  title: string;
  description: string;
  href: string;
  label?: string;
};

export function ContinueExploring({ title, description, href, label = "Continue exploring" }: ContinueExploringProps) {
  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-cyan-300/25 hover:bg-cyan-300/[0.045]">
      <a href={href} className="group flex items-center justify-between gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/70">{label}</p>
          <h3 className="mt-2 text-lg font-semibold text-white">{title}</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-400">{description}</p>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] text-lg text-cyan-100 transition group-hover:translate-x-1 group-hover:border-cyan-300/30 group-hover:bg-cyan-300/[0.1]">
          →
        </span>
      </a>
    </div>
  );
}

import { PortableText } from "next-sanity";
type Item = { title: string; description?: any; subheadline?: string };
export default function SecondaryUseCases({
  title,
  subheadline,
  items,
  isDark,
}: { title: string; subheadline?: string; items: Item[]; isDark?: boolean }) {
  return (
    <section className={`py-12 ${'bg-slate-950'}`}>
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl font-semibold text-center tracking-tight">{title}</h2>
        {subheadline ? <p className="mt-2 text-slate-400 text-center">{subheadline}</p> : null}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {items?.map((i, idx) => (
            <div key={idx} className="rounded-2xl border border-white/10 bg-slate-950 p-6 shadow-sm">
              <h3 className="text-center font-semibold">{i.title}</h3>
              {i.subheadline ? <p className="mt-1 text-sm text-slate-400">{i.subheadline}</p> : null}
              {i.description && (
                <div className="mt-2 text-slate-300">
                  {Array.isArray(i.description) ? (
                    <PortableText value={i.description} />
                  ) : (
                    <p>{i.description}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

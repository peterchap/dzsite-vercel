import { PortableText } from "next-sanity";

type Item = { title: string; description?: any; subheadline?: string };

export default function SecondaryUseCases({
  title,
  subheadline,
  items,
  isDark,
}: { title: string; subheadline?: string; items: Item[]; isDark?: boolean }) {
  return (
    <section className={`py-12 ${isDark ? 'bg-slate-50' : 'bg-white'}`}>
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl font-semibold text-center tracking-tight">{title}</h2>
        {subheadline ? <p className="mt-2 text-slate-500 text-center">{subheadline}</p> : null}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {items?.map((i, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-center font-semibold">{i.title}</h3>
              {i.subheadline ? <p className="mt-1 text-sm text-slate-500">{i.subheadline}</p> : null}
              {i.description && (
                <div className="mt-2 text-slate-600">
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

import React from "react";
type Props = {
  title: string;
  body: string;
  example?: { title?: string; bullets?: string[] };
};
export default function PrimaryUseCase({ title, body, example, isDark }: Props & { isDark?: boolean }) {
  return (
    <section className={`py-12 ${'bg-slate-950'}`}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-center">{title}</h2>
            <p className="mt-4 whitespace-pre-line text-lg text-slate-300 text-center">{body}</p>
          </div>
          {example?.bullets?.length ? (
            <div className="rounded-2xl border border-white/10 bg-slate-950 p-6 shadow-sm">
              {example.title ? <h3 className="text-lg font-semibold">{example.title}</h3> : null}
              <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">
                {example.bullets.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

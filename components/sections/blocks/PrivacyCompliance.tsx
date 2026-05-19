import React from "react";
type Cta = { label: string; href: string; variant?: string };
type Props = {
  title: string;
  body: string;
  enterpriseNote?: string;
  cta?: Cta;
};
export default function PrivacyCompliance({ title, body, enterpriseNote, cta, isDark }: Props & { isDark?: boolean }) {
  return (
    <section className={`py-12 ${'bg-slate-950'}`}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-2xl border border-white/10 bg-slate-950 p-8 shadow-sm">
          <h2 className="text-center text-2xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-4 whitespace-pre-line text-center text-slate-300">{body}</p>
          {enterpriseNote ? <p className="mt-3 text-center text-sm text-slate-400">{enterpriseNote}</p> : null}
          {cta?.href ? (
            <a className="mt-6 mx-auto inline-flex rounded-xl border border-white/10 px-4 py-2 font-medium" href={cta.href}>
              {cta.label}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}

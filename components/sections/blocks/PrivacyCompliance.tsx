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
    <section className={`py-12 ${isDark ? 'bg-slate-50' : 'bg-white'}`}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-center text-2xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-4 whitespace-pre-line text-center text-slate-600">{body}</p>
          {enterpriseNote ? <p className="mt-3 text-center text-sm text-slate-500">{enterpriseNote}</p> : null}
          {cta?.href ? (
            <a className="mt-6 mx-auto inline-flex rounded-xl border border-slate-200 px-4 py-2 font-medium" href={cta.href}>
              {cta.label}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}

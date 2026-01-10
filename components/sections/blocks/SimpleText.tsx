import React from "react";

export default function SimpleText({
  kicker,
  title,
  subtitle,
  body,
  isDark
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  body: string;
  isDark?: boolean
}) {
  return (
    <section className={`py-12 ${isDark ? 'bg-slate-50' : 'bg-white'}`}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          {kicker ? <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-3">{kicker}</p> : null}
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
          {subtitle ? <p className="mt-4 text-xl text-slate-600">{subtitle}</p> : null}
          <p className="mt-6 whitespace-pre-line text-lg text-slate-600 leading-8">{body}</p>
        </div>
      </div>
    </section>
  );
}


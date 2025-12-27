import React from "react";

export default function SimpleText({
  kicker,
  title,
  body,
  isDark
}: {
  kicker?: string;
  title: string;
  body: string;
  isDark?: boolean
}) {
  return (
    <section className={`py-24 ${isDark ? 'bg-slate-50' : 'bg-white'}`}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          {kicker ? <p className="text-sm font-medium text-slate-500">{kicker}</p> : null}
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{title}</h2>
          <p className="mt-5 whitespace-pre-line text-lg text-slate-600">{body}</p>
        </div>
      </div>
    </section>
  );
}


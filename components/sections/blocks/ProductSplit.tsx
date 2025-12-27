import React from "react";
import { Code2, Building2, PlugZap } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";

type Cta = { label: string; href: string; variant?: "primary" | "secondary" | "ghost" };

type Col = {
  heading: string;
  body: string;
  cta?: Cta;
};

type Props = {
  title: string;
  left: Col;
  right: Col & { integrationLine?: string };
};

export default function ProductSplit({ title, left, right, isDark }: Props & { isDark?: boolean }) {
  return (
    <section className={`py-24 ${isDark ? 'bg-slate-50' : 'bg-white'}`}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl text-center mx-auto">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 text-center">{title}</h2>
          <p className="mt-3 text-slate-600 text-center">
            Choose self-serve speed for integration, or enterprise delivery for operational scale and workflows.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Developers / SMB */}
          <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400" />

            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-2xl bg-blue-50 p-3 ring-1 ring-blue-100">
                <Code2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">For Developers & SMBs</p>
                <h3 className="mt-1 text-xl font-semibold text-slate-900">{left.heading}</h3>
              </div>
            </div>

            <p className="mt-4 whitespace-pre-line text-slate-600">{left.body}</p>

            <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-500">
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Fast integration</span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Transparent pricing</span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1">API-first</span>
            </div>

            {left.cta?.href ? (
              <div className="mt-7">
                <ButtonLink href={left.cta.href} variant={(left.cta.variant as any) ?? "secondary"}>
                  {left.cta.label}
                </ButtonLink>
              </div>
            ) : null}
          </div>

          {/* Enterprise */}
          <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400" />

            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-2xl bg-blue-50 p-3 ring-1 ring-blue-100">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">For Mid-Market & Enterprise</p>
                <h3 className="mt-1 text-xl font-semibold text-slate-900">{right.heading}</h3>
              </div>
            </div>

            <p className="mt-4 whitespace-pre-line text-slate-600">{right.body}</p>

            {right.integrationLine ? (
              <div className="mt-4 flex items-start gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <PlugZap className="mt-0.5 h-4 w-4 text-blue-600" />
                <p className="text-sm text-slate-600">{right.integrationLine}</p>
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-500">
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Feeds & webhooks</span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Volume tiers</span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1">SLAs</span>
            </div>

            {right.cta?.href ? (
              <div className="mt-7">
                <ButtonLink href={right.cta.href} variant={(right.cta.variant as any) ?? "primary"}>
                  {right.cta.label}
                </ButtonLink>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

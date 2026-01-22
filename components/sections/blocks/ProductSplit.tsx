import React from "react";
import { Code2, Building2, PlugZap } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";

import { PortableText } from "next-sanity";

type Cta = { label: string; href: string; variant?: "primary" | "secondary" | "ghost" };

type Col = {
  heading: string;
  body: string;
  cta?: Cta;
};

type Props = {
  title: string;
  subtitle?: string;
  description?: any[];
  left: Col;
  right: Col & { integrationLine?: string };
  center?: Col & { integrationLine?: string };
};

export default function ProductSplit({ title, subtitle, description, left, right, center, isDark }: Props & { isDark?: boolean }) {
  const components = {
    block: {
      normal: ({ children }: any) => <p className="mb-4 text-center">{children}</p>,
      center: ({ children }: any) => <p className="mb-4 text-center">{children}</p>,
      left: ({ children }: any) => <p className="mb-4 text-left">{children}</p>,
      right: ({ children }: any) => <p className="mb-4 text-right">{children}</p>,
      justify: ({ children }: any) => <p className="mb-4 text-justify">{children}</p>,
    }
  };

  return (
    <section className={`py-12 ${isDark ? 'bg-slate-50' : 'bg-white'}`}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl text-center mx-auto">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 text-center">{title}</h2>
          {subtitle && (
            <p className="mt-3 text-lg text-slate-600 text-center">
              {subtitle}
            </p>
          )}
          {description && (
            <div className="mt-6 text-lg text-slate-600">
              <PortableText value={description} components={components} />
            </div>
          )}
        </div>

        <div className={`mt-10 grid gap-6 ${center ? 'lg:grid-cols-3 md:grid-rows-[auto_1fr_auto_auto]' : 'lg:grid-cols-2 md:grid-rows-[auto_1fr_auto_auto]'}`}>
          {/* Left Column */}
          <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md md:grid md:grid-rows-subgrid md:row-span-4">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400" />

            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-2xl bg-blue-50 p-3 ring-1 ring-blue-100">
                <Code2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="mt-1 text-xl font-semibold text-slate-900">{left.heading}</h3>
              </div>
            </div>

            <div className="flex flex-col">
              <p className="mt-4 whitespace-pre-line text-slate-600">{left.body}</p>
            </div>

            {/* Placeholder for integration line to maintain grid alignment */}
            <div className="invisible h-0 md:h-auto" aria-hidden="true" />

            <div className="mt-auto flex flex-col pt-7">
              {left.cta?.href && (
                <ButtonLink href={left.cta.href} variant={(left.cta.variant as any) ?? "secondary"} size="lg">
                  {left.cta.label}
                </ButtonLink>
              )}
            </div>
          </div>

          {center ? (
            <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md md:grid md:grid-rows-subgrid md:row-span-4">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400" />

              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-2xl bg-blue-50 p-3 ring-1 ring-blue-100">
                  <PlugZap className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="mt-1 text-xl font-semibold text-slate-900">{center.heading}</h3>
                </div>
              </div>

              <div className="flex flex-col">
                <p className="mt-4 whitespace-pre-line text-slate-600">{center.body}</p>
              </div>

              <div className="flex flex-col">
                {center.integrationLine ? (
                  <div className="mt-4 flex items-start gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <PlugZap className="mt-0.5 h-4 w-4 text-blue-600" />
                    <p className="text-sm text-slate-600">{center.integrationLine}</p>
                  </div>
                ) : (
                  <div className="invisible h-0 md:h-auto" aria-hidden="true" />
                )}
              </div>

              <div className="mt-auto flex flex-col pt-7">
                {center.cta?.href && (
                  <ButtonLink href={center.cta.href} variant={(center.cta.variant as any) ?? "secondary"} size="lg">
                    {center.cta.label}
                  </ButtonLink>
                )}
              </div>
            </div>
          ) : null}

          {/* Right Column */}
          <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md md:grid md:grid-rows-subgrid md:row-span-4">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400" />

            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-2xl bg-blue-50 p-3 ring-1 ring-blue-100">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="mt-1 text-xl font-semibold text-slate-900">{right.heading}</h3>
              </div>
            </div>

            <div className="flex flex-col">
              <p className="mt-4 whitespace-pre-line text-slate-600">{right.body}</p>
            </div>

            <div className="flex flex-col">
              {right.integrationLine ? (
                <div className="mt-4 flex items-start gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <PlugZap className="mt-0.5 h-4 w-4 text-blue-600" />
                  <p className="text-sm text-slate-600">{right.integrationLine}</p>
                </div>
              ) : (
                <div className="invisible h-0 md:h-auto" aria-hidden="true" />
              )}
            </div>

            <div className="mt-auto flex flex-col pt-7">
              {right.cta?.href && (
                <ButtonLink href={right.cta.href} variant={(right.cta.variant as any) ?? "primary"} size="lg">
                  {right.cta.label}
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

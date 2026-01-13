import React from "react";
import { BadgeCheck, Clock, Filter, Workflow, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";

type BenefitCard = { title: string; description?: string; bullets?: string[] };
type Props = {
  kicker?: string;
  title: string;
  subtitle?: string;
  cards: BenefitCard[];
  columns?: number;
  footer?: string;
};

const ICONS: Record<string, React.ReactNode> = {
  "Reduce triage workload": <Workflow className="h-5 w-5 text-blue-600" />,
  "Improve accuracy": <Filter className="h-5 w-5 text-blue-600" />,
  "Detect earlier": <Clock className="h-5 w-5 text-blue-600" />,
  "Integrate into existing workflows": <BadgeCheck className="h-5 w-5 text-blue-600" />,
};

export default function BenefitCards({
  kicker,
  title,
  subtitle,
  cards,
  columns = 2,
  footer,
  isDark,
}: Props & { isDark?: boolean }) {
  const gridColsClass = columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2";

  return (
    <section className={`relative overflow-hidden py-12 ${isDark ? "bg-slate-50" : "bg-white"}`}>
      <Container className="relative">
        <div className="max-w-3xl text-center mx-auto">
          {kicker && <p className="text-sm font-medium text-slate-500 text-center">{kicker}</p>}
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 text-center">{title}</h2>
          {subtitle && <p className="mt-3 text-lg text-slate-600 text-center">{subtitle}</p>}
        </div>

        <div className={`mt-10 grid gap-x-6 gap-y-12 ${gridColsClass}`}>
          {cards?.map((c, idx) => (
            <div
              key={idx}
              className="group relative grid grid-cols-[auto_1fr] gap-x-4 md:grid-rows-subgrid md:row-span-3"
            >
              {/* Card Background & Border - positioned absolutely to cover the subgrid rows */}
              <div className="absolute -inset-4 -z-10 rounded-3xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur transition group-hover:-translate-y-0.5 group-hover:shadow-md" />
              <div className="absolute -inset-x-4 -top-4 h-1 rounded-t-3xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400" />

              {/* Row 1: Icon & Title */}
              <div className="md:row-span-1 flex items-center mb-1">
                <div className="rounded-2xl bg-blue-50 p-3 ring-1 ring-blue-100 shrink-0">
                  {ICONS[c.title] ?? <BadgeCheck className="h-5 w-5 text-blue-600" />}
                </div>
              </div>
              <div className="md:row-span-1 flex items-center">
                <h3 className="text-lg font-semibold text-slate-900">{c.title}</h3>
              </div>

              {/* Row 2: Description (or spacer) */}
              <div className="md:row-span-1" aria-hidden="true" />
              <div className="md:row-span-1">
                {c.description ? (
                  <p className="text-slate-600 leading-relaxed">{c.description}</p>
                ) : (
                  <div className="h-0" />
                )}
              </div>

              {/* Row 3: Bullets (or spacer) */}
              <div className="md:row-span-1" aria-hidden="true" />
              <div className="md:row-span-1">
                {c.bullets && c.bullets.length > 0 ? (
                  <ul className="mt-2 space-y-2">
                    {c.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 text-sm text-slate-600">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-blue-500" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="h-0" />
                )}
              </div>
            </div>
          ))}
        </div>

        {footer && (
          <div className="mt-10 max-w-3xl mx-auto text-center">
            <p className="text-lg text-slate-600">{footer}</p>
          </div>
        )}

        {/* optional credibility chips */}
        <div className="mt-12 flex flex-wrap justify-center gap-2 text-xs text-slate-500">
          <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 backdrop-blur">
            Prioritise what matters
          </span>
          <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 backdrop-blur">
            Reduce noise and false positives
          </span>
          <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 backdrop-blur">
            Designed for SOC workflows
          </span>
        </div>
      </Container>
    </section>
  );
}


import React from "react";
import { BadgeCheck, Clock, Filter, Workflow } from "lucide-react";
import { Container } from "@/components/ui/Container";

type BenefitCard = { title: string; description: string };
type Props = {
  kicker?: string;
  title: string;
  subtitle?: string;
  cards: BenefitCard[];
};

const ICONS: Record<string, React.ReactNode> = {
  "Reduce triage workload": <Workflow className="h-5 w-5 text-blue-600" />,
  "Improve accuracy": <Filter className="h-5 w-5 text-blue-600" />,
  "Detect earlier": <Clock className="h-5 w-5 text-blue-600" />,
  "Integrate into existing workflows": <BadgeCheck className="h-5 w-5 text-blue-600" />,
};

export default function BenefitCards({ kicker, title, subtitle, cards, isDark }: Props & { isDark?: boolean }) {
  return (
    <section className={`relative overflow-hidden py-12 ${isDark ? 'bg-slate-50' : 'bg-white'}`}>
      <Container className="relative">
        <div className="max-w-3xl text-center mx-auto">
          {kicker && (
            <p className="text-sm font-medium text-slate-500 text-center">
              {kicker}
            </p>
          )}
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 text-center">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-lg text-slate-600 text-center">
              {subtitle}
            </p>
          )}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {cards?.map((c, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* accent bar */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400" />

              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-2xl bg-blue-50 p-3 ring-1 ring-blue-100">
                  {ICONS[c.title] ?? <BadgeCheck className="h-5 w-5 text-blue-600" />}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{c.title}</h3>
                  <p className="mt-2 text-slate-600">{c.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* optional credibility chips */}
        <div className="mt-8 flex flex-wrap gap-2 text-xs text-slate-500">
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


import React from "react";
import { Container } from "@/components/ui/Container";
import { CheckCircle2, CircleX } from "lucide-react";

type LeftColumn = {
  kicker?: string;
  title: string;
  features?: string[];
  featureSets?: {
    heading?: string;
    features?: string[];
  }[];
};
type RightColumn = {
  kicker?: string;
  title: string;
  subtitle?: string;
  features?: string[];
  featureSets?: {
    heading?: string;
    features?: string[];
  }[];
};

interface TwoColumnFeatureProps {
  isDark?: boolean;
  left: LeftColumn;
  right: RightColumn;
}

export default function TwoColumnFeature({ isDark, left, right }: TwoColumnFeatureProps) {
  return (
    <section className={`py-12 ${isDark ? "bg-slate-50" : "bg-white"}`}>
      <Container>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left Column */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="text-center mb-6">
              {left.kicker ? (
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600">{left.kicker}</p>
              ) : null}
              <h3 className="mt-2 text-xl font-semibold text-slate-900">{left.title}</h3>
            </div>

            {left.featureSets && left.featureSets.length > 0 ? (
              <div className="space-y-8">
                {left.featureSets.map((set, i) => (
                  <div key={i} className="text-left">
                    {set.heading ? (
                      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-3">
                        {set.heading}
                      </h4>
                    ) : null}
                    <ul className="space-y-3">
                      {set.features?.map((f, j) => (
                        <li key={j} className="flex items-start gap-3 text-slate-700">
                          <CircleX className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                          <span className="leading-tight">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="mx-auto mt-6 max-w-md space-y-3">
                {left.features?.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <CircleX className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                    <span className="leading-tight">{f}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right Column */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="text-center mb-6">
              {right.kicker ? (
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600">{right.kicker}</p>
              ) : null}
              <h3 className="mt-2 text-xl font-semibold text-slate-900">{right.title}</h3>
              {right.subtitle ? (
                <p className="mt-4 mx-auto max-w-md text-slate-600">{right.subtitle}</p>
              ) : null}
            </div>

            {right.featureSets && right.featureSets.length > 0 ? (
              <div className="space-y-8">
                {right.featureSets.map((set, i) => (
                  <div key={i} className="text-left">
                    {set.heading ? (
                      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-l-2 border-green-500 pl-3">
                        {set.heading}
                      </h4>
                    ) : null}
                    <ul className="space-y-3">
                      {set.features?.map((f, j) => (
                        <li key={j} className="flex items-start gap-3 text-slate-700">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                          <span className="leading-tight">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="mx-auto mt-6 max-w-md space-y-3">
                {right.features?.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                    <span className="leading-tight">{f}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

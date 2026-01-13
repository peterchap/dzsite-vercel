import React from "react";
import { Container } from "@/components/ui/Container";
import * as LucideIcons from "lucide-react";
import { ArrowRight, Check } from "lucide-react";

interface Step {
  title: string;
  subtitle?: string;
  icon?: string;
  features?: string[];
}

interface AttackChainDiagramProps {
  isDark?: boolean;
  kicker?: string;
  title?: string;
  subtitle?: string;
  steps?: Step[];
  highlightTitle?: string;
  highlightBody?: string;
}

const IconMapper = ({ iconName, className }: { iconName?: string; className?: string }) => {
  if (!iconName) return null;
  const IconComponent = (LucideIcons as any)[iconName];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
};

const DEFAULT_STEPS: Step[] = [
  { title: "Domain registration", subtitle: "New domain created", icon: "Globe", features: [] },
  { title: "DNS setup", subtitle: "Records & hosting configured", icon: "Network", features: [] },
  { title: "SSL issuance", subtitle: "Certificate issued", icon: "KeyRound", features: [] },
  { title: "Campaign live", subtitle: "Phishing pages & emails", icon: "MailWarning", features: [] },
];

export default function AttackChainDiagram({
  isDark,
  kicker = "The gap",
  title = "Phishing attacks don’t appear — they are built",
  subtitle = "Phishing and impersonation campaigns are assembled step by step using newly registered domains, SSL certificates, DNS, and infrastructure. Most security tools detect them once emails are sent or websites go live. Datazag identifies them before they go live.",
  steps,
  highlightTitle = "Where Datazag fits: early attack-chain visibility",
  highlightBody = "We detect suspicious infrastructure during registration, DNS setup, and SSL issuance — reducing triage workload and false positives by prioritising the domains that matter.",
}: AttackChainDiagramProps) {
  const displaySteps = steps && steps.length > 0 ? steps : DEFAULT_STEPS;

  return (
    <section className={`py-12 ${isDark ? "bg-slate-50" : "bg-white"}`}>
      <Container>
        <div>
          <div className="mx-auto max-w-3xl text-center">
            {kicker && <p className="text-sm font-medium text-slate-500">{kicker}</p>}
            {title && (
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 text-center">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-lg text-slate-600">
                {subtitle}
              </p>
            )}
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-sm backdrop-blur overflow-x-auto">
            <div
              className="grid gap-4 min-w-[800px] md:min-w-0 md:items-stretch"
              style={{
                gridTemplateColumns: displaySteps.length > 0
                  ? displaySteps.map((_, i) => i === displaySteps.length - 1 ? '1fr' : '1fr 2rem').join(' ')
                  : '1fr'
              }}
            >
              {displaySteps.map((s, i) => (
                <React.Fragment key={i}>
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm h-full min-w-0">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-start gap-3">
                        <div className="rounded-2xl bg-blue-50 p-3 ring-1 ring-blue-100 shrink-0">
                          <IconMapper iconName={s.icon} className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 leading-tight">{s.title}</div>
                          {s.subtitle && <div className="mt-1 text-xs text-slate-600">{s.subtitle}</div>}
                        </div>
                      </div>

                      {s.features && s.features.length > 0 && (
                        <ul className="space-y-2 mt-2 pt-4 border-t border-slate-50">
                          {s.features.map((f, j) => (
                            <li key={j} className="flex items-start gap-2 text-xs text-slate-600">
                              <Check className="h-3 w-3 mt-0.5 shrink-0 text-blue-500" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {i < displaySteps.length - 1 ? (
                    <div className="hidden md:flex items-center justify-center h-full">
                      <ArrowRight className="h-5 w-5 text-slate-300" />
                    </div>
                  ) : null}
                </React.Fragment>
              ))}
            </div>

            {(highlightTitle || highlightBody) && (
              <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50/60 p-5">
                {highlightTitle && (
                  <div className="text-sm font-semibold text-center text-slate-900">
                    {highlightTitle}
                  </div>
                )}
                {highlightBody && (
                  <p className="mt-2 text-sm text-slate-600 text-center">
                    {highlightBody}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

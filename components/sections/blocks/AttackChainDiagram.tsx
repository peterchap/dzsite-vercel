import React from "react";
import { Container } from "@/components/ui/Container";
import { Globe, Network, KeyRound, MailWarning, ArrowRight } from "lucide-react";

type Step = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
};

const steps: Step[] = [
  { title: "Domain registration", subtitle: "New domain created", icon: <Globe className="h-5 w-5 text-blue-600" /> },
  { title: "DNS setup", subtitle: "Records & hosting configured", icon: <Network className="h-5 w-5 text-blue-600" /> },
  { title: "SSL issuance", subtitle: "Certificate issued", icon: <KeyRound className="h-5 w-5 text-blue-600" /> },
  { title: "Campaign live", subtitle: "Phishing pages & emails", icon: <MailWarning className="h-5 w-5 text-blue-600" /> },
];

export default function AttackChainDiagram({ isDark }: { isDark?: boolean }) {
  return (
    <section className={`py-12 ${isDark ? 'bg-slate-50' : 'bg-white'}`}>
      <Container>
        <div>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium text-slate-500">The gap</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 text-center">
              Phishing attacks don’t appear — they are built
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Phishing and impersonation campaigns are assembled step by step using newly registered domains, SSL certificates, DNS, and infrastructure. Most security tools detect them once emails are sent or websites go live. Datazag identifies them before they go live.
            </p>
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-sm backdrop-blur">
            <div className="grid gap-4 md:grid-cols-[1fr_2rem_1fr_2rem_1fr_2rem_1fr] md:items-stretch">
              {steps.map((s, i) => (
                <React.Fragment key={s.title}>
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm h-full min-w-0">
                    <div className="flex items-start gap-3">
                      <div className="rounded-2xl bg-blue-50 p-3 ring-1 ring-blue-100">{s.icon}</div>
                      <div>
                        <div className="font-semibold text-slate-900">{s.title}</div>
                        <div className="mt-1 text-sm text-slate-600">{s.subtitle}</div>
                      </div>
                    </div>
                  </div>

                  {i < steps.length - 1 ? (
                    <div className="hidden md:flex items-center justify-center h-full">
                      <ArrowRight className="h-5 w-5 text-slate-300" />
                    </div>
                  ) : null}
                </React.Fragment>
              ))}
            </div>

            {/* Datazag “early visibility” overlay */}
            <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50/60 p-5">
              <div className="text-sm font-semibold text-center text-slate-900">
                Where Datazag fits: early attack-chain visibility
              </div>
              <p className="mt-2 text-sm text-slate-600 text-center">
                We detect suspicious infrastructure during registration, DNS setup, and SSL issuance — reducing triage
                workload and false positives by prioritising the domains that matter.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

import { DeliveryMethods } from "@/components/diagrams/DeliveryMethods/DeliveryMethods";
import { DomainHealthReportCta } from "@/components/diagrams/DomainHealthReport/DomainHealthReportCta";
import { EarlyWarningTimeline } from "@/components/diagrams/EarlyWarningTimeline/EarlyWarningTimeline";
import { IntelligenceEngine } from "@/components/diagrams/IntelligenceEngine/IntelligenceEngine";
import { OperationalProof } from "@/components/diagrams/OperationalProof/OperationalProof";
import { Container } from "@/components/ui/Container";
import type { Card, CopySection, Cta, TimelineStep } from "./types";
import { StoryButton, StoryCardGrid, StoryParagraphs, StorySection } from "./primitives";
import { LivingInternetBackdrop } from "./diagrams/LivingInternetBackdrop";

type HeroProps = {
  eyebrow: string;
  title: string;
  intro: string;
  statement: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  pills: string[];
};

type SignalsProps = CopySection & { items: Card[] };
type TimelineProps = CopySection & { steps: TimelineStep[] };
type EngineProps = CopySection & { proofPoints: Card[]; evidence: Card[] };
type ProductsProps = CopySection & { products: Card[] };
type ProofProps = CopySection & { items: Card[] };
type AudiencesProps = CopySection & { audiences: Card[] };
type ReportCtaProps = CopySection & { button: Cta; checklist: string[] };
type ObservatoryProps = { kicker: string; title: string; body: string; items: string[] };

export function StoryHero({ data }: { data: HeroProps }) {
  return (
    <section className="relative min-h-[92vh] overflow-hidden py-24 md:flex md:items-center md:py-32">
      <LivingInternetBackdrop />
      <Container>
        <div className="relative max-w-4xl">
          <p className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">{data.eyebrow}</p>
          <h1 className="mt-8 text-5xl font-semibold tracking-tight text-white md:text-7xl lg:text-8xl">{data.title}</h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">{data.intro}</p>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-white">{data.statement}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <StoryButton href={data.primaryCta.href}>{data.primaryCta.label}</StoryButton>
            <StoryButton href={data.secondaryCta.href} secondary>{data.secondaryCta.label}</StoryButton>
          </div>
          <div className="mt-12 grid max-w-3xl gap-3 text-xs text-slate-300 sm:grid-cols-3">
            {data.pills.map((pill) => <div key={pill} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">{pill}</div>)}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function StoryInsight({ data }: { data: CopySection }) {
  return (
    <StorySection section={data}>
      <StoryParagraphs body={data.body} />
    </StorySection>
  );
}

export function StorySignals({ data }: { data: SignalsProps }) {
  return (
    <section className="relative border-t border-white/10 py-16 md:py-20">
      <Container>
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">{data.kicker}</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">{data.title}</h2>
        </div>
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
          <div className="grid gap-4 md:grid-cols-4">
            {data.items.map((signal, index) => (
              <article key={signal.title} className="rounded-2xl border border-white/10 bg-[#030619]/55 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/80">0{index + 1}</span>
                  <span className="h-2 w-2 rounded-full bg-cyan-300" />
                </div>
                <h3 className="text-base font-semibold text-white">{signal.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{signal.text}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function StoryTimeline({ data }: { data: TimelineProps }) {
  return (
    <StorySection section={data}>
      <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:items-center xl:gap-16">
        <div className="max-w-md">
          <StoryParagraphs body={data.body} />
        </div>
        <div className="min-w-0 lg:-mr-4 xl:-mr-8">
          <EarlyWarningTimeline />
        </div>
      </div>
    </StorySection>
  );
}

export function StoryEngine({ data }: { data: EngineProps }) {
  return (
    <StorySection id="how-it-works" section={data}>
      <div className="grid gap-14 lg:grid-cols-[minmax(260px,0.58fr)_minmax(0,1.42fr)] lg:items-center xl:gap-20">
        <div className="max-w-md">
          <StoryParagraphs body={data.body} />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {data.proofPoints.map((point) => (
              <div key={point.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-lg font-semibold text-cyan-100">{point.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{point.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="min-w-0 lg:-mr-6 xl:-mr-10">
          <IntelligenceEngine />
        </div>
      </div>
    </StorySection>
  );
}

export function StoryProducts({ data }: { data: ProductsProps }) {
  return (
    <StorySection section={data}>
      <DeliveryMethods />
    </StorySection>
  );
}

export function StoryProof({ data }: { data: ProofProps }) {
  return (
    <StorySection section={data}>
      <OperationalProof />
    </StorySection>
  );
}

export function StoryAudiences({ data }: { data: AudiencesProps }) {
  return (
    <StorySection section={data}>
      <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
        <StoryParagraphs body={data.body} />
        <StoryCardGrid items={data.audiences} columns="md:grid-cols-2" />
      </div>
    </StorySection>
  );
}

export function StoryReportCta({ data }: { data: ReportCtaProps }) {
  return <DomainHealthReportCta buttonHref={data.button.href} />;
}

export function StoryObservatory({ data }: { data: ObservatoryProps }) {
  return (
    <section className="relative border-t border-white/10 py-20 md:py-28">
      <Container>
        <div className="grid gap-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">{data.kicker}</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">{data.title}</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">{data.body}</p>
          </div>
          <div className="rounded-[1.5rem] border border-cyan-300/20 bg-[#07102b] p-6">
            <div className="grid gap-3">
              {data.items.map((item) => (
                <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200"><span>{item}</span><span className="h-2 w-2 rounded-full bg-cyan-300" /></div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

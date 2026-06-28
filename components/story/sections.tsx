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
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <StoryParagraphs body={data.body} />
        <ol className="relative grid gap-5 md:grid-cols-5 md:gap-4">
          <div className="pointer-events-none absolute left-[10%] right-[10%] top-[2.35rem] hidden h-px bg-gradient-to-r from-cyan-300/10 via-cyan-300/50 to-cyan-300/10 md:block" aria-hidden="true" />
          {data.steps.map((step, index) => (
            <li key={step.title} className="relative">
              {index < data.steps.length - 1 ? <div className="absolute -right-3 top-[1.72rem] z-10 hidden h-5 w-5 rotate-45 border-r border-t border-cyan-300/50 md:block" aria-hidden="true" /> : null}
              <article className="relative h-full rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-xs font-semibold text-cyan-200">{step.marker}</div>
                <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-xs leading-5 text-slate-400">{step.text}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </StorySection>
  );
}

export function StoryEngine({ data }: { data: EngineProps }) {
  return (
    <StorySection id="how-it-works" section={data}>
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <StoryParagraphs body={data.body} />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {data.proofPoints.map((point) => (
              <div key={point.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-lg font-semibold text-cyan-100">{point.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{point.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/[0.03] p-6">
          <div className="grid gap-4">
            {data.evidence.map((item, index) => (
              <div key={item.title} className="flex gap-4 rounded-2xl border border-white/10 bg-[#07102b] p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-xs font-semibold text-cyan-200">0{index + 1}</div>
                <div>
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StorySection>
  );
}

export function StoryProducts({ data }: { data: ProductsProps }) {
  return (
    <StorySection section={data}>
      <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
        <StoryParagraphs body={data.body} />
        <StoryCardGrid items={data.products} columns="md:grid-cols-3" />
      </div>
    </StorySection>
  );
}

export function StoryProof({ data }: { data: ProofProps }) {
  return (
    <StorySection section={data}>
      <StoryCardGrid items={data.items} columns="md:grid-cols-3" />
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
  return (
    <section id="free-report" className="relative border-t border-white/10 py-24 md:py-32">
      <Container>
        <div className="grid gap-10 rounded-[2rem] border border-cyan-300/20 bg-cyan-300/[0.04] p-6 md:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">{data.kicker}</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">{data.title}</h2>
            {data.body?.[0] ? <p className="mt-6 text-lg leading-8 text-slate-300">{data.body[0]}</p> : null}
            <div className="mt-8"><StoryButton href={data.button.href}>{data.button.label}</StoryButton></div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {data.checklist.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-[#030619]/60 p-4 text-sm font-medium text-slate-100">{item}</div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
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

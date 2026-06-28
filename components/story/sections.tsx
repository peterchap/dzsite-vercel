import { Container } from "@/components/ui/Container";
import type { StoryContent } from "./types";
import { StoryButton, StoryCardGrid, StoryParagraphs, StorySection } from "./primitives";
import { LivingInternetBackdrop } from "./diagrams/LivingInternetBackdrop";

export function StoryHero({ content }: { content: StoryContent }) {
  return (
    <section className="relative min-h-[92vh] overflow-hidden py-24 md:flex md:items-center md:py-32">
      <LivingInternetBackdrop />
      <Container>
        <div className="relative max-w-4xl">
          <p className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">{content.heroEyebrow}</p>
          <h1 className="mt-8 text-5xl font-semibold tracking-tight text-white md:text-7xl lg:text-8xl">{content.heroTitle}</h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">{content.heroIntro}</p>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-white">{content.heroStatement}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <StoryButton href={content.primaryCta.href}>{content.primaryCta.label}</StoryButton>
            <StoryButton href={content.secondaryCta.href} secondary>{content.secondaryCta.label}</StoryButton>
          </div>
          <div className="mt-12 grid max-w-3xl gap-3 text-xs text-slate-300 sm:grid-cols-3">
            {content.heroPills.map((pill) => <div key={pill} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">{pill}</div>)}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function StoryInsight({ content }: { content: StoryContent }) {
  return (
    <StorySection section={content.insight}>
      <StoryParagraphs body={content.insight.body} />
    </StorySection>
  );
}

export function StorySignals({ content }: { content: StoryContent }) {
  return (
    <section className="relative border-t border-white/10 py-16 md:py-20">
      <Container>
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">{content.signals.kicker}</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">{content.signals.title}</h2>
        </div>
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
          <div className="grid gap-4 md:grid-cols-4">
            {content.internetSignals.map((signal, index) => (
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

export function StoryTimeline({ content }: { content: StoryContent }) {
  return (
    <StorySection section={content.graph}>
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <StoryParagraphs body={content.graph.body} />
        <ol className="relative grid gap-5 md:grid-cols-5 md:gap-4">
          <div className="pointer-events-none absolute left-[10%] right-[10%] top-[2.35rem] hidden h-px bg-gradient-to-r from-cyan-300/10 via-cyan-300/50 to-cyan-300/10 md:block" aria-hidden="true" />
          {content.timelineSteps.map((step, index) => (
            <li key={step.title} className="relative">
              {index < content.timelineSteps.length - 1 ? <div className="absolute -right-3 top-[1.72rem] z-10 hidden h-5 w-5 rotate-45 border-r border-t border-cyan-300/50 md:block" aria-hidden="true" /> : null}
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

export function StoryEngine({ content }: { content: StoryContent }) {
  return (
    <StorySection id="how-it-works" section={content.platform}>
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <StoryParagraphs body={content.platform.body} />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {content.proofPoints.map((point) => (
              <div key={point.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-lg font-semibold text-cyan-100">{point.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{point.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/[0.03] p-6">
          <div className="grid gap-4">
            {content.graphEvidence.map((item, index) => (
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

export function StoryProducts({ content }: { content: StoryContent }) {
  return (
    <StorySection section={content.delivery}>
      <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
        <StoryParagraphs body={content.delivery.body} />
        <StoryCardGrid items={content.deliveryCards} columns="md:grid-cols-3" />
      </div>
    </StorySection>
  );
}

export function StoryProof({ content }: { content: StoryContent }) {
  return (
    <StorySection section={content.applicationsSection}>
      <StoryCardGrid items={content.applications} columns="md:grid-cols-3" />
    </StorySection>
  );
}

export function StoryAudiences({ content }: { content: StoryContent }) {
  return (
    <StorySection section={content.partners}>
      <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
        <StoryParagraphs body={content.partners.body} />
        <StoryCardGrid items={content.partnerAudiences} columns="md:grid-cols-2" />
      </div>
    </StorySection>
  );
}

export function StoryReportCta({ content }: { content: StoryContent }) {
  return (
    <section id="free-report" className="relative border-t border-white/10 py-24 md:py-32">
      <Container>
        <div className="grid gap-10 rounded-[2rem] border border-cyan-300/20 bg-cyan-300/[0.04] p-6 md:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">{content.finalCta.kicker}</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">{content.finalCta.title}</h2>
            {content.finalCta.body?.[0] ? <p className="mt-6 text-lg leading-8 text-slate-300">{content.finalCta.body[0]}</p> : null}
            <div className="mt-8"><StoryButton href={content.finalButton.href}>{content.finalButton.label}</StoryButton></div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {["DNS posture", "Visible platforms", "Subdomain discovery", "External threats", "Recommendations", "Returnable report link"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-[#030619]/60 p-4 text-sm font-medium text-slate-100">{item}</div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function StoryObservatory() {
  return (
    <section className="relative border-t border-white/10 py-20 md:py-28">
      <Container>
        <div className="grid gap-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">Coming soon</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">Datazag Observatory</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">Explore aggregated internet infrastructure trends from Datazag's intelligence lake: domains, DNS, certificates, hosting, ASNs, platforms and impersonation patterns.</p>
          </div>
          <div className="rounded-[1.5rem] border border-cyan-300/20 bg-[#07102b] p-6">
            <div className="grid gap-3">
              {["Internet pulse", "Platform trends", "Certificate activity", "ASN movement", "Report builder"].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200"><span>{item}</span><span className="h-2 w-2 rounded-full bg-cyan-300" /></div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

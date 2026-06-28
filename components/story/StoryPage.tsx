import type { StoryContent } from "./types";
import { mergeStoryContent } from "./content";
import {
  StoryAudiences,
  StoryEngine,
  StoryHero,
  StoryInsight,
  StoryObservatory,
  StoryProducts,
  StoryProof,
  StoryReportCta,
  StorySignals,
  StoryTimeline,
} from "./sections";

export type { StoryContent } from "./types";

export default function StoryPage({ content }: { content?: Partial<StoryContent> | null }) {
  const c = mergeStoryContent(content);

  return (
    <main className="relative overflow-hidden bg-[#030619] text-white">
      <StoryHero
        data={{
          eyebrow: c.heroEyebrow,
          title: c.heroTitle,
          intro: c.heroIntro,
          statement: c.heroStatement,
          primaryCta: c.primaryCta,
          secondaryCta: c.secondaryCta,
          pills: c.heroPills,
        }}
      />
      <StoryInsight />
      <StorySignals data={{ ...c.signals, items: c.internetSignals }} />
      <StoryTimeline data={{ ...c.graph, steps: c.timelineSteps }} />
      <StoryEngine data={{ ...c.platform, proofPoints: c.proofPoints, evidence: c.graphEvidence }} />
      <StoryProducts data={{ ...c.delivery, products: c.deliveryCards }} />
      <StoryProof />
      <StoryAudiences data={{ ...c.partners, audiences: c.partnerAudiences }} />
      <StoryReportCta
        data={{
          ...c.finalCta,
          button: c.finalButton,
          checklist: ["DNS posture", "Visible platforms", "Subdomain discovery", "External threats", "Recommendations", "Returnable report link"],
        }}
      />
      <StoryObservatory />
    </main>
  );
}

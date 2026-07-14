import type { StoryContent } from "./types";
import { mergeStoryContent } from "./content";
import { CaseStudyTeaser } from "./CaseStudyTeaser";
import { DetectionQualitySection } from "./DetectionQualitySection";
import {
  StoryAudiences,
  StoryEngine,
  StoryHero,
  StoryInsight,
  StoryObservatory,
  StoryProducts,
  StoryProof,
  StoryRelationshipIntelligence,
  StoryReportCta,
  StorySignals,
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
          chips: c.heroChips,
        }}
      />
      {/*
        WU23 §5 / WU25 §4: the case-study teaser is the primary proof slot,
        directly under the hero. It supersedes the generic Detection Advantage
        timeline (StoryTimeline + EarlyWarningTimeline), which is removed here —
        one real timeline, not one illustrative + one real.

        WU22 (single-case lead-time timeline) is PAUSED, not cancelled: its data
        contract becomes the schema for the future continuous detection log under
        /intelligence/. The StoryTimeline/EarlyWarningTimeline components remain in
        the repo for that revival; they are simply no longer mounted here.
      */}
      <CaseStudyTeaser />
      {/*
        WU27-A: teaser proves coverage → this section proves rigour →
        Relationship Intelligence explains the model. Fills the slot vacated by
        the old illustrative Detection Advantage timeline.
      */}
      <DetectionQualitySection />
      <StoryInsight data={c.insight} />
      <StoryRelationshipIntelligence />
      <StoryEngine data={{ ...c.platform, proofPoints: c.proofPoints, evidence: c.graphEvidence }} />
      <StoryProducts data={{ ...c.delivery, products: c.deliveryCards }} />
      <StoryProof />
      <StorySignals data={{ ...c.signals, items: c.internetSignals }} />
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

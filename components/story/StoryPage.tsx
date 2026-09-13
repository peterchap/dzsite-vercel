import type { StoryContent } from "./types";
import { mergeStoryContent } from "./content";
import { CaseStudyTeaser } from "./CaseStudyTeaser";
import { SegmentRouter } from "./SegmentRouter";
import {
  StoryHero,
  StoryObservatory,
  StoryProducts,
  StoryRelationshipIntelligence,
  StoryReportCta,
} from "./sections";

export type { StoryContent } from "./types";

/*
 * WU28-A: the homepage makes ONE argument — the four-step enterprise journey —
 * and every segment/product is an exit from that story, not a competing story.
 *
 *   1. We see attacker infrastructure forming.        (hero + case-study teaser)
 *   2. We identify what's relevant to YOUR org.       (RelevanceSection)
 *   3. Explainable signals flow into your controls.   (delivery section)
 *   4. Benchmark us before you buy.                   (BenchmarkSection — HELD)
 *
 * DEMOTED off the homepage (WU28-A §4 — components remain in the repo; their
 * content lives on /how-it-works, segment and product pages):
 *   StoryInsight/CampaignAdvantageSection, StoryEngine, StorySignals,
 *   StoryAudiences (replaced by SegmentRouter — the only per-segment presence).
 *
 * HELD pending gates (WU28-B §4 / WU28-C §4 — see BenchmarkSection.tsx):
 *   <BenchmarkSection /> mounts between StoryProducts and the Observatory once
 *   the WU27-C dress rehearsal clears and/or the marketplace listing URL exists.
 *
 * WU-C9 (13 Sep 2026) — the page ran nine blocks; concept count was the
 * problem, so three MOVED rather than being cut. Each is mounted where its
 * content belongs, not deleted:
 *   RelevanceSection ("your slice of the graph")  -> /how-it-works
 *   DetectionQualitySection (four checks)         -> /alerts
 *   StoryProof (the live ticker)                  -> removed; the Observatory
 *     owns the denominator under the settled content split, and the Observatory
 *     block below already links out to it (WU-C10).
 *
 * ⚠️ StoryProof was previously "KEPT by judgement" here — WU24 called it
 * corroborating evidence for step 1 and WU26 wired it to the canonical stats.
 * That judgement is deliberately REVERSED, not overlooked: those four counters
 * are what the Observatory exists to own, they were one of the six conflicting
 * corpus sources, and moving them converts a homepage block into Observatory
 * traffic. The component and its render-guards remain in the repo.
 */
export default function StoryPage({ content }: { content?: Partial<StoryContent> | null }) {
  const c = mergeStoryContent(content);

  return (
    <main className="relative overflow-hidden bg-[#030619] text-white">
      {/* Step 1 — we see attacker infrastructure forming. */}
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
      <CaseStudyTeaser />

      {/* Step 2 — how step 1 works. This IS the proposition, not a detail. */}
      <StoryRelationshipIntelligence />

      {/* Step 3 — explainable signals flow into controls you already operate. */}
      <StoryProducts data={{ ...c.delivery, products: c.deliveryCards }} />

      {/* Step 4 — <BenchmarkSection /> mounts HERE once its gates clear. */}

      {/* The Observatory — and the live metrics that moved there. */}
      <StoryObservatory />

      {/* Segment router — the only per-segment presence on the homepage. */}
      <SegmentRouter />

      {/* Self-serve / mid-market CTA. */}
      <StoryReportCta
        data={{
          ...c.finalCta,
          button: c.finalButton,
          checklist: ["DNS posture", "Visible platforms", "Subdomain discovery", "External threats", "Recommendations", "Returnable report link"],
        }}
      />
    </main>
  );
}

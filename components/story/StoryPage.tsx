import type { StoryContent } from "./types";
import { mergeStoryContent, resolveStoryTokens } from "./content";
import { getSiteStats } from "@/lib/site-stats-live";
import { CaseStudyTeaser } from "./CaseStudyTeaser";
import { CoverageStrip } from "./CoverageStrip";
import { IntelligenceSection } from "./IntelligenceSection";
import { SegmentRouter } from "./SegmentRouter";
import {
  StoryHero,
  StoryObservatory,
  StoryProducts,
  StoryReportCta,
} from "./sections";

export type { StoryContent } from "./types";

/*
 * 2026-09-25 — INTELLIGENCE REPOSITIONING. The page now argues "we provide
 * intelligence", not "we detect threats first":
 *
 *   Hero            see more of the internet, know what it means
 *   CoverageStrip   SEE — coverage figures (R2 feed)
 *   Intelligence    MEANS — interpretation figures (Observatory store)
 *   CaseStudyTeaser proof by example
 *   SegmentRouter   Email / Insurers / MSSPs / Enterprise
 *   then delivery, the Observatory, and the report CTA.
 *
 * HELD off this page until measured: threat-detection / impersonation-alert
 * claims (FP rate not re-measured), calibrated risk scores (SCORE-1), and any
 * named finding still under coordinated disclosure.
 *
 * StoryRelationshipIntelligence (the signal → campaign pivot diagram) is
 * UNMOUNTED to hold the block count at eight; it is threat-campaign framed,
 * and the case study below links to the same pivot run for real. The
 * component stays in the repo.
 *
 * The WU28-A journey notes below are kept as history.
 *
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
 * COVERAGE CAME BACK (13 Sep 2026), deliberately and in a smaller form. The
 * ticker carried two different things: standing COVERAGE figures (how much of
 * the internet we observe) and HOURLY ACTIVITY (what happened in the last hour).
 * Removing both lost a buyer's qualifying question along with the demo. Only the
 * activity half belonged to the Observatory. <CoverageStrip /> brings the
 * coverage half back as one compact row — four figures, each with its own
 * definition and measured-at, from the single R2 source.
 *
 * ⚠️ StoryProof was previously "KEPT by judgement" here — WU24 called it
 * corroborating evidence for step 1 and WU26 wired it to the canonical stats.
 * That judgement is deliberately REVERSED, not overlooked: those four counters
 * are what the Observatory exists to own, they were one of the six conflicting
 * corpus sources, and moving them converts a homepage block into Observatory
 * traffic. The component and its render-guards remain in the repo.
 */
export default async function StoryPage({ content }: { content?: Partial<StoryContent> | null }) {
  // Figures in the copy are {{TOKENS}}, resolved against the live stats (hourly).
  const c = resolveStoryTokens(mergeStoryContent(content), await getSiteStats());

  return (
    <main className="relative overflow-hidden bg-[#030619] text-white">
      {/* See more of the internet. Know what it means. */}
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

      {/* See — coverage, from the R2 feed, each figure with its definition. */}
      <CoverageStrip />

      {/* Know what it means — interpretation, from the Observatory store. */}
      <IntelligenceSection />

      {/* Proof by example — the published investigation. */}
      <CaseStudyTeaser />

      {/* Segment signposts — the only per-segment presence on the homepage. */}
      <SegmentRouter />

      {/* How it reaches you. */}
      <StoryProducts data={{ ...c.delivery, products: c.deliveryCards }} />

      {/* <BenchmarkSection /> mounts HERE once its gates clear. */}

      {/* The Observatory. asn_half_of_domains is already on the page in
          IntelligenceSection, so the panel does not repeat it. */}
      <StoryObservatory exclude={["asn_half_of_domains"]} />

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

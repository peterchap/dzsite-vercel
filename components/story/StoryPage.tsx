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
      <StoryHero content={c} />
      <StoryInsight content={c} />
      <StorySignals content={c} />
      <StoryTimeline content={c} />
      <StoryEngine content={c} />
      <StoryProducts content={c} />
      <StoryProof content={c} />
      <StoryAudiences content={c} />
      <StoryReportCta content={c} />
      <StoryObservatory />
    </main>
  );
}

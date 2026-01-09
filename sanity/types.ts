import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export type Cta = { label: string; href: string; variant?: "primary" | "secondary" | "ghost" };

export type SectionHeroSplitCta = {
    _type: "section.heroSplitCta";
    eyebrow?: string;
    headline: string;
    subheadline?: string;
    badge?: string;
    primaryCta: Cta;
    secondaryCta?: Cta;
    dataDictionary?: {
        enabled: boolean;
        buttonText?: string;
        title?: string;
        description?: string;
        csvFile?: {
            asset?: {
                url?: string;
            };
        };
    };
};

export type SectionFeatureGrid = {
    _type: "section.featureGrid";
    title?: string;
    subtitle?: string;
    features: Array<{ icon?: string; title: string; text?: string }>;
};

export type SectionTwoProductSplit = {
    _type: "section.twoProductSplit";
    title?: string;
    subtitle?: string;
    left: { label?: string; headline: string; text?: string; bullets: string[]; cta?: Cta };
    right: { label?: string; headline: string; text?: string; bullets: string[]; cta?: Cta };
};

export type SectionTwoColumnFeature = {
  _type: "section.twoColumnFeature";
  left: { kicker?: string; title: string; features?: string[] };
  right: { kicker?: string; title: string; subtitle?: string };
};

export type SectionJsonExample = {
    _type: "section.jsonExample";
    title: string;
    intro?: string;
    json: string;
    callouts?: Array<{ label: string; text?: string }>;
};

export type SectionHowItWorksSteps = {
    _type: "section.howItWorksSteps";
    title?: string;
    subtitle?: string;
    steps: Array<{ title: string; text?: string }>;
};

export type SectionUseCaseCards = {
    _type: "section.useCaseCards";
    title?: string;
    subtitle?: string;
    cards: Array<{ audience: string; headline: string; text?: string; bullets: string[]; cta?: Cta }>;
};

export type SectionFaqList = {
    _type: "section.faqList";
    title?: string;
    items: Array<{ question: string; answer: string }>;
};

export type SectionFinalCta = {
    _type: "section.finalCta";
    headline: string;
    subheadline?: string;
    primaryCta: Cta;
    secondaryCta?: Cta;
};

export type PageSection =
    | SectionFeatureGrid
    | SectionTwoProductSplit
    | SectionTwoColumnFeature
    | SectionJsonExample
    | SectionHowItWorksSteps
    | SectionUseCaseCards
    | SectionFaqList
    | SectionFinalCta;

export type PageDoc = {
    _id: string;
    title: string;
    slug: string;
    seo?: {
        metaTitle?: string;
        metaDescription?: string;
        ogTitle?: string;
        ogDescription?: string;
        ogImage?: any;
    };
    hero?: SectionHeroSplitCta;
    sections?: PageSection[];
};

export type PositionType =
    | 'top'
    | 'top-right'
    | 'right'
    | 'bottom-right'
    | 'bottom'
    | 'bottom-left'
    | 'left'
    | 'top-left';

export interface CoveragePoint {
    label: string;
    value: string;
    position: PositionType;
}

export interface GlobalCoverageData {
    title?: string;
    subtitle?: string;
    worldImage: SanityImageSource;
    coveragePoints?: CoveragePoint[];
    footerLine?: string;
    opsNote?: string;
}
// Shared source of truth for bespoke marketing-page copy.
//
// Each migrated page defines a `PageContent` object in its co-located copy.ts.
// The page component reads it as fallbacks; the seed script converts it into a
// marketingPageCopy Sanity document with buildMarketingCopyDoc(). Because both
// consume the SAME object, seeding a page can never change what it renders.

export type CtaFallback = { label: string; href: string };

export type CopyItem = {
  key: string;
  title?: string;
  text?: string;
  trigger?: string;
  delivered?: string;
  status?: string;
  href?: string;
  cta?: string;
  tags?: string[];
  points?: string[];
};

export type CopySection = {
  eyebrow?: string;
  title?: string;
  body?: string;
  secondaryBody?: string;
  primaryCta?: CtaFallback;
  secondaryCta?: CtaFallback;
  items?: CopyItem[];
};

// Keyed by sectionKey (the string the page passes to getCopySection).
export type PageContent = Record<string, CopySection>;

function cta(value: CtaFallback | undefined) {
  return value ? { _type: "marketingCopyCta", label: value.label, href: value.href } : undefined;
}

function item(it: CopyItem) {
  return {
    _type: "marketingCopyItem",
    _key: it.key,
    itemKey: it.key,
    title: it.title,
    text: it.text,
    trigger: it.trigger,
    delivered: it.delivered,
    status: it.status,
    href: it.href,
    cta: it.cta,
    tags: it.tags,
    points: it.points,
  };
}

/**
 * Build a marketingPageCopy document from a page's PageContent. Deterministic
 * _id (marketingPageCopy.<slug>) makes seeding idempotent and reversible.
 */
export function buildMarketingCopyDoc(opts: { slug: string; title: string; notes?: string; content: PageContent }) {
  const { slug, title, notes, content } = opts;
  return {
    _id: `marketingPageCopy.${slug}`,
    _type: "marketingPageCopy",
    title,
    slug: { _type: "slug", current: slug },
    notes,
    sections: Object.entries(content).map(([sectionKey, s]) => ({
      _type: "marketingCopySection",
      _key: sectionKey,
      sectionKey,
      eyebrow: s.eyebrow,
      title: s.title,
      body: s.body,
      secondaryBody: s.secondaryBody,
      primaryCta: cta(s.primaryCta),
      secondaryCta: cta(s.secondaryCta),
      items: s.items?.map(item),
    })),
  };
}

export type MarketingCopyCta = {
  label?: string | null;
  href?: string | null;
};

export type MarketingCopyItem = {
  itemKey?: string | null;
  title?: string | null;
  text?: string | null;
  trigger?: string | null;
  delivered?: string | null;
  status?: string | null;
  href?: string | null;
  cta?: string | null;
  tags?: string[] | null;
  points?: string[] | null;
};

export type MarketingCopySection = {
  sectionKey?: string | null;
  eyebrow?: string | null;
  title?: string | null;
  body?: string | null;
  secondaryBody?: string | null;
  primaryCta?: MarketingCopyCta | null;
  secondaryCta?: MarketingCopyCta | null;
  items?: MarketingCopyItem[] | null;
};

export type MarketingPageCopy = {
  sections?: MarketingCopySection[] | null;
} | null;

export function getCopySection(copy: MarketingPageCopy, sectionKey: string): MarketingCopySection | undefined {
  return copy?.sections?.find((section) => section.sectionKey === sectionKey) ?? undefined;
}

export function copyText(value: string | null | undefined, fallback: string): string {
  return value && value.trim().length > 0 ? value : fallback;
}

export function copyCta(value: MarketingCopyCta | null | undefined, fallback: { label: string; href: string }) {
  return {
    label: copyText(value?.label, fallback.label),
    href: copyText(value?.href, fallback.href),
  };
}

export function getCopyItem(section: MarketingCopySection | undefined, itemKey: string): MarketingCopyItem | undefined {
  return section?.items?.find((item) => item.itemKey === itemKey) ?? undefined;
}

export function copyItemsByKey(section: MarketingCopySection | undefined): Record<string, MarketingCopyItem> {
  return Object.fromEntries((section?.items ?? []).filter((item) => item.itemKey).map((item) => [item.itemKey as string, item]));
}

/**
 * Decide which items to render for a section. When the CMS section has items, the
 * CMS list is authoritative for PRESENCE and ORDER: only fallback cards whose key is
 * still present in the doc are rendered, in the doc's order — so deleting or
 * reordering items in Studio takes effect. When the section has no items (or no doc),
 * the full code fallback list is used. Note: adding a brand-new item in Studio that
 * has no matching code fallback is intentionally ignored, since a card usually needs
 * code (layout, structural fields) to render.
 */
export function pickItems<T extends { key: string }>(fallbacks: T[], section?: MarketingCopySection): T[] {
  const cms = section?.items?.filter((item) => item.itemKey);
  if (!cms || cms.length === 0) return fallbacks;
  const order = new Map(cms.map((item, index) => [item.itemKey as string, index]));
  return fallbacks
    .filter((fallback) => order.has(fallback.key))
    .sort((a, b) => (order.get(a.key) as number) - (order.get(b.key) as number));
}

/**
 * Overlay editable CMS copy onto an array of hardcoded fallback cards, matched by `key`.
 * The rendered set follows the CMS item list (see pickItems), and each field falls back
 * to the code value when the CMS leaves it blank.
 * Shared by bespoke marketing pages migrated to the marketingPageCopy content-doc pattern.
 */
export function resolveCopyCards<T extends { key: string; title?: string; text?: string; tags?: string[] }>(
  fallbacks: T[],
  section?: MarketingCopySection,
): Array<T & { title: string; text: string }> {
  return pickItems(fallbacks, section).map((fallback) => {
    const item = getCopyItem(section, fallback.key);
    return {
      ...fallback,
      title: copyText(item?.title, fallback.title ?? ""),
      text: copyText(item?.text, fallback.text ?? ""),
      tags: item?.tags && item.tags.length > 0 ? item.tags : fallback.tags,
    };
  });
}

/**
 * Like resolveCopyCards but for cards whose body is a bullet list (`points`)
 * rather than a single `text` string. Overrides title and points per item key.
 */
export function resolveCopyList<T extends { key: string; title?: string; points?: string[] }>(
  fallbacks: T[],
  section?: MarketingCopySection,
): Array<T & { title: string; points: string[] }> {
  return pickItems(fallbacks, section).map((fallback) => {
    const item = getCopyItem(section, fallback.key);
    return {
      ...fallback,
      title: copyText(item?.title, fallback.title ?? ""),
      points: item?.points && item.points.length > 0 ? item.points : (fallback.points ?? []),
    };
  });
}

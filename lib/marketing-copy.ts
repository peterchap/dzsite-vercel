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

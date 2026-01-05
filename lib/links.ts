export function normalizeHref(input?: string | null): string | undefined {
  if (!input) return undefined;
  let href = String(input).trim();
  if (!href) return undefined;

  // Allow in-page hash anchors as-is
  if (href.startsWith("#")) {
    return href;
  }

  // If it's already absolute (http, https, mailto, tel), keep as-is
  const lower = href.toLowerCase();
  if (lower.startsWith("http://") || lower.startsWith("https://") || lower.startsWith("mailto:") || lower.startsWith("tel:")) {
    return href;
  }

  // If it looks like an internal path but missing leading slash, add it
  if (!href.startsWith("/")) {
    // Heuristic: treat strings with spaces as invalid
    if (href.includes(" ")) return undefined;
    // If it contains a dot and no protocol, assume external and prefix https://
    if (href.includes(".")) {
      return `https://${href}`;
    }
    return "/" + href;
  }

  return href;
}

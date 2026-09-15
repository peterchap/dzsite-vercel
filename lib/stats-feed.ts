/**
 * Server-side reader for the public stats feed (activity.json, status.json).
 *
 * A missing base URL, a non-OK response or a parse failure all return null —
 * never a fallback object with figures in it. A live surface has no honest
 * placeholder, so callers render nothing for a null.
 */
export async function fetchStatsFeed<T>(file: string): Promise<T | null> {
  const base = process.env.NEXT_PUBLIC_WEBSITE_STATS_URL;
  if (!base) return null;

  try {
    const response = await fetch(`${base.replace(/\/$/, "")}/${file}`, {
      next: { revalidate: 900 },
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

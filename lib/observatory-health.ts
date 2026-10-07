/**
 * Is the Observatory serving fresh data? (homepage brief, pre-launch check 1)
 *
 * Production Observatory loads failed on 3–4 Oct 2026. The homepage links to the
 * Observatory from the hero and gives it a section, so both hide when the latest
 * publish is older than MAX_AGE_DAYS, or when latest.json cannot be read. Sending a
 * first-time visitor to a dataset that stopped updating is worse than not linking.
 *
 * HOME_OBSERVATORY=off hides both regardless (a manual kill switch).
 */
const ARTIFACT_BASE = process.env.OBSERVATORY_ARTIFACT_BASE ?? "https://cdn.getdatazag.com/observatory";
const MAX_AGE_DAYS = 3;

export type ObservatoryHealth = { show: boolean; version: string | null };

export async function getObservatoryHealth(now: Date = new Date()): Promise<ObservatoryHealth> {
  if (process.env.HOME_OBSERVATORY === "off") return { show: false, version: null };
  try {
    const res = await fetch(`${ARTIFACT_BASE}/latest.json`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { version } = (await res.json()) as { version?: unknown };
    if (typeof version !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(version)) throw new Error("no version");
    return { show: isFresh(version, now), version };
  } catch (err) {
    console.warn("observatory-health: could not read latest.json — hiding the homepage Observatory links:", err);
    return { show: false, version: null };
  }
}

export function isFresh(version: string, now: Date): boolean {
  const published = Date.parse(`${version}T00:00:00Z`);
  if (!Number.isFinite(published)) return false;
  return now.getTime() - published <= MAX_AGE_DAYS * 86_400_000;
}

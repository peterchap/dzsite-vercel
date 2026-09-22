import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "./env";

/**
 * SERVER-SIDE WRITES to Sanity.
 *
 * WHY THIS EXISTS. sanity/client.ts is built from SANITY_API_TOKEN, which is
 * the READ-ONLY token every page read uses. The subscription routes create and
 * patch documents, so Sanity refused them with
 *
 *   403 transaction failed: Insufficient permissions; permission "create" required
 *
 * before any mail was attempted: a subscriber could never be stored, and a
 * stored one could never be confirmed. The route reported "Failed to
 * subscribe", which was true but said nothing about why.
 *
 * The fix is a SECOND client with a write-scoped token, not write permission
 * added to the read token. That token is attached to every page render, and
 * widening it to satisfy one form would put write access to the production
 * dataset behind every read path on the site.
 *
 * SAME RULE AS lib/email.ts: a route that cannot do its job should fail where
 * someone can see it. This throws on a missing token rather than handing back
 * a client that will 403 on the first mutation, somewhere further down.
 *
 * SERVER ONLY. Never import this from a client component — the token would be
 * bundled into the browser.
 */
let cached: ReturnType<typeof createClient> | null = null;

export function getSanityWriteClient(): ReturnType<typeof createClient> {
  const token = process.env.SANITY_WRITE_TOKEN?.trim();

  if (!token) {
    throw new Error(
      "SANITY_WRITE_TOKEN is not set. Refusing to fall back to SANITY_API_TOKEN, " +
        "which is read-only: the write would fail with a 403 at the first mutation.",
    );
  }

  if (cached) return cached;

  cached = createClient({
    projectId,
    dataset,
    apiVersion,
    // Never the CDN for a read that a write in the same request depends on:
    // the confirm route looks a subscriber up by a token minted moments ago.
    useCdn: false,
    // Queries here must not see Studio drafts. The one hand-made subscriber in
    // the dataset has a draft counterpart whose fields are all null.
    perspective: "published",
    token,
  });

  return cached;
}

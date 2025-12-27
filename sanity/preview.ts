import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

// Preview client fetches draft content using a token and preview perspective
export const sanityPreviewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  // Sanity preview drafts perspective surfaces draft documents over published
  perspective: "previewDrafts" as any,
});

export async function sanityPreviewFetch<T>(query: string, params?: Record<string, any>) {
  // No caching in preview mode
  if (params === undefined) {
    return sanityPreviewClient.fetch<T>(query)
  }
  return sanityPreviewClient.fetch<T>(query, params as any)
}

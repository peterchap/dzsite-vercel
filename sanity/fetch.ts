import { sanityClient } from "./client";
export { sanityClient };

export async function sanityFetch<T>(query: string, params?: Record<string, any>, revalidateSeconds = 60) {
    // Next.js caching (App Router). You can tune per page.
    // Guard: if query references $slug, ensure a slug param is provided
    if (/\$slug\b/.test(query)) {
        const slugVal = params?.slug;
        if (slugVal == null || (typeof slugVal === "string" && slugVal.trim() === "")) {
            throw new Error("GROQ query references $slug but 'params.slug' was not provided");
        }
    }

    // Normalize catch-all route params: Next.js can give arrays for [..slug]
    const normalizedParams = params ? { ...params } : params;
    if (normalizedParams && Array.isArray(normalizedParams.slug)) {
        normalizedParams.slug = normalizedParams.slug.join("/");
    }

    return sanityClient.fetch<T>(query, normalizedParams || {}, {
        next: { revalidate: revalidateSeconds },
    } as any);
}

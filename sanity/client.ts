import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, useCdn } from "./env";

export const sanityClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: "published",
    token: process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN,
});

import React from "react";

import { client } from "./client";

export async function sanityFetch<T>({
  query,
  params = {},
}: {
  query: string;
  params?: Record<string, unknown>;
}) {
  return client.fetch<T>(query, params);
}

export function SanityLive() {
  return null as React.ReactElement | null;
}

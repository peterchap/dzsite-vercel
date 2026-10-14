"use client";

import { useSyncExternalStore } from "react";

import { ATTRIBUTION_KEYS, currentAttribution, type Attribution } from "@/lib/attribution";

const noSubscribe = () => () => {};

/** Hidden src and utm_* fields for a plain form post, filled in the browser
 *  (lib/attribution.ts). /api/enquiry adds them to the inquiry. */
export function AttributionFields() {
  // A string snapshot, so React compares by value; empty on the server.
  const json = useSyncExternalStore(noSubscribe, () => JSON.stringify(currentAttribution()), () => "{}");
  const values = JSON.parse(json) as Attribution;
  return (
    <>
      {ATTRIBUTION_KEYS.map((key) => <input key={key} type="hidden" name={key} value={values[key] ?? ""} />)}
    </>
  );
}

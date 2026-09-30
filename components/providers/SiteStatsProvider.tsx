"use client";

import { createContext, useContext } from "react";

import { SNAPSHOT_STATS } from "@/lib/site-stats";
import type { SiteStats } from "@/lib/site-stats-core";

/**
 * The live site statistics, for client components.
 *
 * app/layout.tsx awaits getSiteStats() (lib/site-stats-live.ts) on the server
 * and passes the bundle in, so the server-rendered HTML and the hydrated
 * client agree on every figure. Outside the provider — Studio, or a test —
 * the default is the committed snapshot, never an empty value.
 */
const SiteStatsContext = createContext<SiteStats>(SNAPSHOT_STATS);

export function SiteStatsProvider({ stats, children }: { stats: SiteStats; children: React.ReactNode }) {
  return <SiteStatsContext.Provider value={stats}>{children}</SiteStatsContext.Provider>;
}

export function useSiteStats(): SiteStats {
  return useContext(SiteStatsContext);
}

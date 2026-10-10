"use client";

import type React from "react";

import { track, type TrackParams } from "@/lib/analytics";

/**
 * A plain anchor that sends one analytics event on click. Server components pass
 * the event name and params; the link works the same with analytics blocked.
 */
export function TrackedLink({
  href,
  event,
  params,
  className,
  children,
  download,
}: {
  href: string;
  event: string;
  params?: TrackParams;
  className?: string;
  children: React.ReactNode;
  download?: boolean;
}) {
  return (
    <a href={href} className={className} download={download || undefined} onClick={() => track(event, params)}>
      {children}
    </a>
  );
}

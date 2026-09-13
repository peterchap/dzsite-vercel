import type { NextConfig } from "next";

import { LEGACY_REDIRECTS } from "./lib/legacy-redirects";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  // Retired surfaces from the previous site (WU-C5). The map lives in
  // lib/legacy-redirects.ts so app/sitemap.ts drops the same paths.
  //
  // Explicit 301, not `permanent: true` — that emits 308, which preserves the
  // request method. These are GET-only marketing URLs being retired for search
  // engines, and 301 is the status every crawler and link-audit tool
  // understands without qualification.
  async redirects() {
    return LEGACY_REDIRECTS.map(({ source, destination }) => ({
      source,
      destination,
      statusCode: 301,
    }));
  },
};

export default nextConfig;

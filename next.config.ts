import type { NextConfig } from "next";

import { LEGACY_REDIRECTS } from "./lib/legacy-redirects";

const nextConfig: NextConfig = {
  // @datazag/site-chrome ships TypeScript source (shared header, footer, nav).
  transpilePackages: ["@datazag/site-chrome"],
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
  // Hidden pre-publication review pages (app/(marketing)/review/) and their files in
  // public/review/: never indexed or cached by search engines. Deliberately not in
  // robots.ts, where a Disallow line would publish the paths. Since 2026-10-15 the
  // only /review/ paths are redirects to the published report; the header stays for
  // the next pre-publication review.
  async headers() {
    return [
      {
        source: "/review/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, noimageindex" }],
      },
    ];
  },
  async redirects() {
    return LEGACY_REDIRECTS.map(({ source, destination }) => ({
      source,
      destination,
      statusCode: 301,
    }));
  },
};

export default nextConfig;

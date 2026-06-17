import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/phishing-alerts',
        destination: '/alerts',
        permanent: true,
      },
      {
        source: '/insurer-partners',
        destination: '/cyber-risk-underwriting',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  output: 'standalone',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dev-grove-games.pantheonsite.io',
      },
      {
        protocol: 'https',
        hostname: 'img.gamedistributor.com',
      },
      {
        protocol: 'https',
        hostname: 'img.gamedistribution.com',
      },
      {
        protocol: 'https',
        hostname: 'www.gamedistribution.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
  },
};

export default nextConfig;

// Trigger restart 5

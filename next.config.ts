import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['portfolio.adendan.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'portfolio.adendan.com',
      },
      {
        protocol: 'http',
        hostname: 'portfolio.adendan.com',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
  },
  reactStrictMode: true,
};

export default nextConfig;

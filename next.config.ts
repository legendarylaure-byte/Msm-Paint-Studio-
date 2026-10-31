import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.vercel.app",
        pathname: "**",
      },
      {
        protocol: "https", 
        hostname: "**.cdn.openui.design",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
        pathname: "/gallery/**/*.jpg",
      },
      {
        protocol: "https",
        hostname: "**",
        pathname: "/gallery/**/*.jpeg",
      },
      {
        protocol: "https",
        hostname: "**",
        pathname: "/gallery/**/*.avif",
      },
      {
        protocol: "https",
        hostname: "**",
        pathname: "/gallery/**/*.png",
      },
      {
        protocol: "https",
        hostname: "**",
        pathname: "/images/**/*.jpg",
      },
      {
        protocol: "https",
        hostname: "**",
        pathname: "/images/**/*.jpeg",
      },
      {
        protocol: "https",
        hostname: "**",
        pathname: "/images/**/*.avif",
      },
      {
        protocol: "https",
        hostname: "**",
        pathname: "/images/**/*.png",
      },
    ],
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ];
  },
};

export default nextConfig;

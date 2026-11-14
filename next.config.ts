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
    const isDev = process.env.NODE_ENV === 'development';
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
          {
            key: 'Content-Security-Policy',
            value: isDev
              ? "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self'; font-src 'self'; frame-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self';"
              : "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self'; font-src 'self'; frame-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self';"
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), accelerometer=(), ambient-light-sensor=()'
          },
        ],
      },
    ];
  },
};

export default nextConfig;
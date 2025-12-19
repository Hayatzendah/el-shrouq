import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Note: output: 'export' is not enabled because:
  // 1. Dynamic routes with 'use client' require generateStaticParams
  // 2. generateStaticParams conflicts with 'use client' directive
  // 3. dynamicParams: true cannot be used with static export
  // 
  // Solution: The app works as a Client-side App (SPA)
  // - All pages are Client Components that fetch from Firebase
  // - No Node.js needed on server after build
  // - Can be deployed to Vercel, Netlify, or any static host that supports Next.js
  // 
  // For true static export, you would need to:
  // - Pre-generate all product pages at build time
  // - Or use a different routing strategy
  // output: 'export', // Commented out - see note above
  images: {
    unoptimized: false, // Keep image optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  reactStrictMode: true,
  compress: true,
};

export default nextConfig;

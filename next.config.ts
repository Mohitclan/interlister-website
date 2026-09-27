import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  // The site shares interlister.panscience.ai with the app, and both are Next.js
  // apps serving /_next/*. Building with ASSET_PREFIX=/_site moves this site's
  // assets under /_site/_next/*, which nginx routes here (stripping /_site).
  // Unset for local dev.
  assetPrefix: process.env.ASSET_PREFIX || undefined,
};

export default nextConfig;

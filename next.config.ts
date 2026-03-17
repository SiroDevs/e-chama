import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true, // Enable source maps in production
  // If you're using Next.js 15+, you can also enable server source maps
  experimental: {
    serverSourceMaps: true, // Helps with server-side error traces [citation:1]
  },
};

export default nextConfig;
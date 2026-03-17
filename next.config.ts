import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  // Your existing Next.js configuration
};
export default withSentryConfig(nextConfig, {
  org: "futuristicken",
  project: "echama",
  silent: !process.env.CI,
});
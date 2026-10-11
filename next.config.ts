import type { NextConfig } from "next";

// Hosted on Vercel. Every page is still pre-rendered as static HTML; the
// one server route is app/api/booking, which logs enquiries to Notion.
const nextConfig: NextConfig = {
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;

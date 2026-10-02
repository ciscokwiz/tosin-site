import type { NextConfig } from "next";

// Static export: `npm run build` writes a plain website to /out that can be
// hosted anywhere (Vercel, Netlify, cPanel, GitHub Pages) with no server.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;

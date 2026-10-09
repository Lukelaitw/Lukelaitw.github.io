import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export for GitHub Pages; there is no server at runtime.
  output: "export",
  // The default image loader needs a server, so thumbnails are pre-sized instead.
  images: { unoptimized: true },
};

export default nextConfig;

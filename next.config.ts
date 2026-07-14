import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep PixiJS out of the server bundle — it expects browser APIs at import time.
  serverExternalPackages: ["pixi.js"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;

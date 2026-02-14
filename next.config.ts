import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-4228fb79f14d4efabbbd4b23a3c3d29b.r2.dev",
      },
    ],
  },
};

export default nextConfig;

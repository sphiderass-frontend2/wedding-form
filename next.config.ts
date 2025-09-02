import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.storage.googleapis.com", // covers bucket-name.storage.googleapis.com
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;



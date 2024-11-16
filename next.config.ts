import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/sites/:path*',
        destination: '/sites/:path*/page',
      },
    ]
  }
};

export default nextConfig;

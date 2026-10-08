import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // World War Hex was renamed Hex Hordes; keep old links working
    return [{ source: '/world-war-hex', destination: '/hex-hordes', permanent: true }];
  },
};

export default nextConfig;

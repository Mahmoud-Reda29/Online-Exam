import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/signin",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/signin",
        destination: "/auth/signin/page.tsx", // Map /signin to auth/signin
      },
      {
        source: "/signup",
        destination: "/auth/signup/", // Map /signup to auth/signup
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    env: {
      BASE_URL: process.env.BASE_URL,
    },
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
};

export default nextConfig;

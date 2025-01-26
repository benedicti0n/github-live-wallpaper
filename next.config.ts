import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cors-anywhere.herokuapp.com', 'avatars.githubusercontent.com', 'i.pinImage.com'],
  },
};

export default nextConfig;

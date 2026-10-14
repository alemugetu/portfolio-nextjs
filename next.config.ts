import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    // Add remote domains here if you load images (e.g. a CMS or GitHub avatars)
    // from outside the /public folder.
    remotePatterns: [
      // { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
};

export default nextConfig;

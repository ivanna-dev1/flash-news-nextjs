import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    // There is another package-lock.json in the parent folder.
    root: fileURLToPath(new URL(".", import.meta.url)),
  },
  images: {
    // Vercel Hobby allows 5000 image optimizations a month; Guardian previews are already small.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.guim.co.uk",
      },
      {
        // Older articles (before ~2015).
        protocol: "https",
        hostname: "static.guim.co.uk",
      },
    ],
  },
};
export default nextConfig;

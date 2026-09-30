import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    // There is one more package-lock.json in the parent folder (D:\Kod).
    // Without this line Next.js may take that folder as the project root.
    root: fileURLToPath(new URL(".", import.meta.url)),
  },
  images: {
    // Only Guardian pictures. "**" would let our image server load
    // pictures from any site on the internet.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.guim.co.uk",
      },
    ],
  },
};
export default nextConfig;

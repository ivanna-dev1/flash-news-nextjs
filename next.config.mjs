import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    // There is one more package-lock.json in the parent folder (D:\Kod).
    // Without this line Next.js may take that folder as the project root.
    root: fileURLToPath(new URL(".", import.meta.url)),
  },
  images: {
    // The browser loads pictures straight from Guardian, without our image
    // server. Vercel Hobby makes only 5000 new pictures a month, and a news
    // site gets new pictures every day - after the limit they stop showing.
    // Guardian previews are small (500 px), so there is little to gain.
    unoptimized: true,
    // Used only if "unoptimized" is turned off again.
    // Only Guardian pictures. "**" would let our image server load
    // pictures from any site on the internet.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.guim.co.uk",
      },
      {
        // Old Guardian articles (before ~2015) keep pictures here.
        protocol: "https",
        hostname: "static.guim.co.uk",
      },
    ],
  },
};
export default nextConfig;

import { fileURLToPath } from "node:url";
import { HTML_LIMITED_BOT_UA_RE } from "next/dist/shared/lib/router/utils/html-bots.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bots that get metadata in <head> instead of streamed into <body>.
  // Viber and Telegram link previews are missing from the default list.
  htmlLimitedBots: new RegExp(`${HTML_LIMITED_BOT_UA_RE.source}|Viber|TelegramBot`, "i"),
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

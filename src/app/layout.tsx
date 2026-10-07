import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryBar from "@/components/CategoryBar";
import Providers from "./providers";
import Sidebar from "@/components/Sidebar";
import ScrollButtons from "@/components/ScrollButtons";
import type { ReactNode } from "react";
import type { Metadata } from "next";

interface RootLayoutProps {
  children: ReactNode;
  // @auth slot: the sign-in / sign-up dialog over the current page.
  auth: ReactNode;
}

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000",
  ),
  title: { template: "%s | FlashNews", default: "FlashNews" },
  description: "FlashNews - news from around the world, powered by The Guardian.",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children, auth }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full  gap-4 antialiased`}
    >
      <body className="min-h-full max-w-[1000px] mx-auto flex flex-col bg-white">
        <Providers>
          <Header />
          <CategoryBar />
          {/* items-start: the sidebar measures main, so main must not stretch to it.
              relative: Pagination centers itself on this row. */}
          <div className="relative flex-1 flex flex-col gap-2 md:flex-row md:items-start w-full px-3 sm:px-5 py-3">
            {/* min-w-0: wide article content must not push the sidebar out. */}
            <main className="flex-2 min-w-0">{children}</main>
            <Sidebar />
          </div>
          <Footer />
          <ScrollButtons />
          {auth}
        </Providers>
      </body>
    </html>
  );
}

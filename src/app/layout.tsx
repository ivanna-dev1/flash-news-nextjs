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
}

// "%s" is replaced by the title of each page: "World news | FlashNews".
export const metadata: Metadata = {
  // The site address: short links in the page head (like canonical
  // "/news/...") are made full with it. Vercel sets
  // VERCEL_PROJECT_PRODUCTION_URL itself (without "https://");
  // on our computer it is localhost.
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

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full  gap-4 antialiased`}
    >
      <body className="min-h-full max-w-[1000px] mx-auto flex flex-col bg-white">
        <Providers>
          <Header />
          <CategoryBar />
          {/* gap-2: the same space as between the cards in the grids.
              md:items-start: each column is as tall as its own content.
              Without it main would stretch to the sidebar height, and the
              sidebar (it counts its cards from the main height) would
              measure itself. px-3 on a phone: more room for the content.
              flex-1: this block takes all free height of the body, so on a
              short page (404) the footer still stays at the bottom.
              relative: the frame for the pagination, which stands in the
              centre of this whole row, not only of main (see Pagination). */}
          <div className="relative flex-1 flex flex-col gap-2 md:flex-row md:items-start w-full px-3 sm:px-5 py-3">
            {/* min-w-0: without it a wide article (photo, table, long link) makes
                main grow and pushes the sidebar out of the page.
                No min height: main is as tall as its content. With
                min-h-screen every page was longer than the window, and the
                scroll buttons were shown even on a short 404 page. */}
            <main className="flex-2 min-w-0">{children}</main>
            <Sidebar />
          </div>
          <Footer />
          <ScrollButtons />
        </Providers>
      </body>
    </html>
  );
}

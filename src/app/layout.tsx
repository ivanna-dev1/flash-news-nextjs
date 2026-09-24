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
          <div className="flex flex-col gap-3 md:flex-row   w-full px-5 py-3">
            {/* min-w-0: without it a wide article (photo, table, long link) makes
                main grow and pushes the sidebar out of the page. */}
            <main className="flex-2 min-w-0 min-h-screen">{children}</main>
            <Sidebar />
          </div>
          <Footer />
          <ScrollButtons />
        </Providers>
      </body>
    </html>
  );
}

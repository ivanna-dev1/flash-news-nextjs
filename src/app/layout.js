"use client";
import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { news } from "../../arrayFakeNews.js";
import WeatherCard from "@/components/WeatherCard";
import SmallNewsCard from "@/components/SmallNewsCard";
import CategoryBar from "@/components/CategoryBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full  gap-4 antialiased`}
    >
      <body className="min-h-full max-w-[1000px] mx-auto flex flex-col bg-white">
        <Header />
        <CategoryBar />
        <div className="flex flex-col gap-3 md:flex-row   w-full px-5 py-3">
          <main className="flex-2 min-h-screen">{children}</main>
          <aside
            className={`hidden md:grid gap-2 items-start content-start ${isHomePage ? "grid-cols-2 flex-1" : "grid-cols-1 w-44 mt-22  "}`}
          >
            <WeatherCard image="/weatherIMG.webp" />
            {isHomePage
              ? news
                  .slice(0, 28)
                  .map((article) => (
                    <SmallNewsCard article={article} key={article.id} />
                  ))
              : news
                  .slice(0, 5)
                  .map((article) => (
                    <SmallNewsCard article={article} key={article.id} />
                  ))}
          </aside>
        </div>
        <Footer />
      </body>
    </html>
  );
}

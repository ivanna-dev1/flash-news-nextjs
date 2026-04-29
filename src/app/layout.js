import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryBar from "@/components/CategoryBar";
import Providers from "./providers.js";
import Sidebar from "@/components/Sidebar.jsx";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
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
            <main className="flex-2 min-h-screen">{children}</main>
            <Sidebar />
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HeaderWrapper from "./components/HeaderWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "ProjecTrack - Project Management Dashboard",
  description: "A premium project management dashboard for modern teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased font-sans bg-[#EDF0F5] min-h-screen flex flex-col">
        <HeaderWrapper />
        <div className="flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}

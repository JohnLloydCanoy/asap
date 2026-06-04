import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ASAP - A Social Automation Platform",
  description: "ASAP - Analytical Social Automation Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      {/* Apply geistSans.className here so all regular prose gets it */}
      <body className={`${geistSans.className} min-h-full flex flex-col text-gray-900 bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}
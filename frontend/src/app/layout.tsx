import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import SwRegister from "@/components/system/sw-register";
import ThemeToggle from "@/components/system/theme-toggle";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DhanRaksha - Planning & Goals Tracker",
  description: "Personal finance planning and goal tracking (offline-first)",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#4f46e5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script id="theme-init" strategy="beforeInteractive">{`
          try {
            const stored = localStorage.getItem('theme');
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            const shouldDark = stored ? stored === 'dark' : prefersDark;
            document.documentElement.classList.toggle('dark', shouldDark);
          } catch {}
        `}</Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <SpeedInsights />
        <Analytics />
        <SwRegister />
        <ThemeToggle />
      </body>
    </html>
  );
}

import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";
import { LocalAdsProvider } from "@/context/use-context";
import { ToastProvider } from "@/context/toast_context";

export const metadata: Metadata = {
  title: "Dashboard App",
  description: "Professional multi-tenant dashboard application",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <ToastProvider>
          <LocalAdsProvider>
            <Suspense fallback={null}>{children}</Suspense>
          </LocalAdsProvider>
        </ToastProvider>
        <Analytics />
      </body>
    </html>
  );
}

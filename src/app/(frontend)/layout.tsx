import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/components/Providers";
import { Toaster } from "sonner";
import React from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const twitterSite = process.env.NEXT_PUBLIC_SERVER_URL || ''; 
export const metadata: Metadata = {
  title: {
    template: "%s | Donner Foundation",
    default: "Donner Foundation",
  },
  description: "Donner Foundation website - For Updates, Donations",
  metadataBase: new URL(twitterSite!),
  robots: {
    follow: true,
    index: true
  },
  twitter: {
    title: 'Donner Foundation',
    card: 'summary_large_image',
    images: ['/opengraph-image.png'],
    description: 'Donner Foundation',
  },
  openGraph: {
    title: 'Donner Foundation',
    description: "Donner Foundation is a NGO focused on helping the needy",
    url: twitterSite,
    siteName: 'Donner Foundation',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Donner Foundation Website by <theHoracle />'
      }
    ],
  }
};

export const revalidate = 86400; // One day
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth`}
      >
        <Providers>
        <main className="">
        {children}
          </main> 
        <Toaster />
        </Providers>
      </body>
    </html>
  );
}

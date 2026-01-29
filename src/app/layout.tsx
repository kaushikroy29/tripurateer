import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://tripurateer.in";
const siteName = "Tripura Teer";
const siteDescription = "Get the latest Tripura Teer results, common numbers, and dream numbers. Fast and accurate updates for Day Teer and Night Teer lottery results.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FF9933" },
    { media: "(prefers-color-scheme: dark)", color: "#000080" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Tripura Teer Result Today | Live FR & SR Results",
    template: "%s | Tripura Teer",
  },
  description: siteDescription,
  keywords: [
    "Tripura Teer",
    "Tripura Teer Result",
    "Tripura Teer Result Today",
    "Teer Result",
    "Day Teer Result",
    "Night Teer Result",
    "Teer Common Number",
    "Teer Dream Number",
    "Tripura Lottery",
    "Teer FR Result",
    "Teer SR Result",
    "Agartala Teer",
    "Northeast India Teer",
  ],
  authors: [{ name: "Tripura Teer", url: siteUrl }],
  creator: "Tripura Teer",
  publisher: "Tripura Teer",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: siteName,
    title: "Tripura Teer Result Today | Live FR & SR Results",
    description: siteDescription,
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Tripura Teer Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tripura Teer Result Today | Live FR & SR Results",
    description: siteDescription,
    images: ["/logo.png"],
    creator: "@tripurateer",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-IN": siteUrl,
    },
  },
  category: "Lottery Results",
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}


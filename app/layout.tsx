import type { Metadata, Viewport } from "next";
import Script from "next/script";

import Providers from "./providers";
import "./globals.css";

import { cn } from "@/lib/utils";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#163C80",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nationpathindia.com"),

  title: {
    default:
      "Nation Path India | Independent News, Astro Intelligence & Knowledge Platform",
    template: "%s | Nation Path India",
  },

  description:
    "Nation Path India is an independent digital news and knowledge platform delivering trusted journalism, national affairs, defence, technology, economy, and Vedic astro intelligence from India.",

  keywords: [
    // Core Brand & News Keywords
    "Nation Path India",
    "India news analysis",
     "World news analysis",
    "independent digital journalism",
    "national affairs and defence news",
    "technology and economy updates",
    "verified daily news India",
    "breaking news India",
    "editorial news analysis",

    // Astro Intelligence Keywords
    "Vedic astrology insights",
    "daily horoscope and planetary transits",
    "astro intelligence and predictions",
    "astrology analysis India",
    "horoscope and career astro analysis",

    // High-Authority Knowledge Keywords
    "in-depth editorial news",
    "explained news India",
    "fact verified journalism",
    "knowledge platform India",
  ],

  applicationName: "Nation Path India",

  authors: [
    {
      name: "Nation Path India Editorial Desk",
      url: "https://nationpathindia.com/about",
    },
  ],

  creator: "Nation Path India",

  publisher: "Nation Path India",

  alternates: {
    canonical: "https://nationpathindia.com",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://nationpathindia.com",
    siteName: "Nation Path India",

    title:
      "Nation Path India | Independent News, Astro Intelligence & Knowledge Platform",

    description:
      "Independent journalism, national affairs, Vedic astrology intelligence and knowledge experiences from India.",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nation Path India",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Nation Path India | Independent News, Astro Intelligence & Knowledge Platform",

    description:
      "Independent journalism, national affairs, Vedic astrology intelligence and knowledge experiences from India.",

    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaEnabled = Boolean(process.env.NEXT_PUBLIC_GA_ID);

  return (
    <html lang="en-IN" className={cn("font-sans")}>
      <head>
        {/* AdSense Publisher Verification Meta Tag */}
        <meta
          name="google-adsense-account"
          content="ca-pub-3337012180933768"
        />

        <meta
          name="facebook-domain-verification"
          content="d06hwjzyxi36yd1x6ulvtat176a412"
        />

        {/* AdSense Script - strategy afterInteractive fix for fast AdSense Crawler detection */}
        <Script
          id="google-adsense"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3337012180933768"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>

      <body
        className="
          min-h-screen
          bg-[#FAF7F1]
          text-[#111]
          antialiased
        "
      >
        <Providers>{children}</Providers>

        {gaEnabled && <GoogleAnalytics />}
      </body>
    </html>
  );
}
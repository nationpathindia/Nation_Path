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
      "Nation Path India | News, Astro Intelligence & Knowledge Platform",
    template: "%s | Nation Path India",
  },

  description:
    "Nation Path India is an independent digital platform delivering trusted journalism, national affairs, defence, technology, economy, sports, astrology intelligence and knowledge experiences from India.",

  keywords: [
    "Nation Path India",
    "India news",
    "breaking news India",
    "latest news India",
    "national affairs India",
    "politics news India",
    "defence news India",
    "world news",
    "business news India",
    "technology news India",
    "science news India",
    "sports news India",
    "astrology India",
    "horoscope",
    "AI astrology",
    "editorial analysis",
  ],

  applicationName: "Nation Path India",

  authors: [
    {
      name: "Nation Path India",
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
      "Nation Path India | News, Astro Intelligence & Knowledge Platform",

    description:
      "Independent journalism, national affairs, astrology intelligence and knowledge experiences from India.",

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
      "Nation Path India | News, Astro Intelligence & Knowledge Platform",

    description:
      "Independent journalism, national affairs, astrology intelligence and knowledge experiences from India.",

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
        <meta
          name="google-adsense-account"
          content="ca-pub-3337012180933768"
        />

        <Script
          id="google-adsense"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3337012180933768"
          crossOrigin="anonymous"
          strategy="lazyOnload"
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
        <Providers>
          {children}
        </Providers>

  
        {gaEnabled && <GoogleAnalytics />}
      </body>
    </html>
  );
}


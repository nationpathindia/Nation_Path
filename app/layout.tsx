import type { Metadata, Viewport } from "next";

import Providers from "./providers";
import "./globals.css";

import { cn } from "@/lib/utils";

import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";




export const viewport: Viewport = {

  width: "device-width",

  initialScale: 1,

  themeColor: "#163C80",

};






export const metadata: Metadata = {


  metadataBase: new URL(
    "https://nationpathindia.com"
  ),



  title: {

    default:
      "Nation Path India – Breaking News, Analysis & Updates",

    template:
      "%s | Nation Path India",

  },



  description:

    "Nation Path India delivers latest breaking news, politics, defence, technology, world affairs, economy, sports and editorial analysis from India and around the globe.",




  keywords:[

    "Nation Path India",

    "breaking news India",

    "latest news India",

    "politics news",

    "defence news",

    "world news",

    "technology news",

    "editorial analysis",

  ],





  applicationName:

    "Nation Path India",




  authors:[

    {

      name:
        "Nation Path India",

    },

  ],




  creator:

    "Nation Path India",




  publisher:

    "Nation Path India",





  alternates:{


    canonical:

      "https://nationpathindia.com",


  },






  robots:{


    index:true,

    follow:true,


    googleBot:{


      index:true,

      follow:true,


      "max-image-preview":

        "large",


      "max-snippet":

        -1,


      "max-video-preview":

        -1,


    },


  },







  icons:{


    icon:

      "/favicon.ico",



    apple:

      "/apple-touch-icon.png",


  },







  openGraph:{


    type:

      "website",


    locale:

      "en_IN",


    url:

      "https://nationpathindia.com",



    siteName:

      "Nation Path India",




    title:

      "Nation Path India – Breaking News, Analysis & Updates",





    description:

      "Latest breaking news, politics, defence, technology, world affairs and editorial coverage from Nation Path India.",




    images:[

      {

        url:

          "/og-image.png",


        width:

          1200,


        height:

          630,


        alt:

          "Nation Path India",

      },

    ],



  },







  twitter:{


    card:

      "summary_large_image",



    title:

      "Nation Path India – Breaking News & Analysis",



    description:

      "Latest news, politics, defence, technology and editorial insights from Nation Path India.",



    images:[

      "/og-image.png"

    ],



  },



};







export default function RootLayout({

  children,

}: {

  children: React.ReactNode;

}) {


  return (


    <html

      lang="en-IN"

      className={cn("font-sans")}

    >



      <body

        className="
        min-h-screen
        bg-[#FAF7F1]
        text-[#111]
        antialiased
        "

      >
    <GoogleAnalytics />


        <Providers>

          {children}

        </Providers>



      </body>



    </html>


  );


}
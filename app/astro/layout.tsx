//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO
//
// PUBLIC ASTRO EXPERIENCE LAYOUT
//
// VEDIC LUXURY THEME SHELL
//
// Uses AstroShell
//
//////////////////////////////////////////////////////////////

import type { Metadata, Viewport } from "next";

import AstroShell from "@/components/astro-new/layout/AstroShell";





//////////////////////////////////////////////////////////////
// ASTRO MOBILE THEME
//////////////////////////////////////////////////////////////

export const viewport: Viewport = {


  width:

    "device-width",


  initialScale:

    1,


  themeColor:

    "#D4AF37",


};







//////////////////////////////////////////////////////////////
// ASTRO SEO METADATA
//////////////////////////////////////////////////////////////

export const metadata: Metadata = {


  title:{


    default:

      "NationPath Astro Intelligence | Vedic Horoscope, Panchang & Astrology",


    template:

      "%s | NationPath Astro",


  },





  description:

    "Explore daily horoscope, Vedic Panchang, zodiac insights, Kundali tools and Astro Intelligence with NationPath Astro.",






  keywords:[


    "NationPath Astro",

    "vedic astrology",

    "daily horoscope",

    "panchang",

    "kundali",

    "zodiac horoscope",

    "nakshatra",

    "vedic astrology india",


  ],





  applicationName:

    "NationPath Astro",






  creator:

    "NationPath India",





  publisher:

    "NationPath India",





  alternates:{


    canonical:

      "https://nationpathindia.com/horoscope",


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






  openGraph:{


    type:

      "website",



    locale:

      "en_IN",



    siteName:

      "NationPath Astro",




    title:

      "NationPath Astro Intelligence | Vedic Horoscope & Panchang",




    description:

      "Ancient Vedic wisdom combined with modern Astro Intelligence.",




    url:

      "https://nationpathindia.com/horoscope",




    images:[


      {

        url:

          "/astro-og-image.png",


        width:

          1200,


        height:

          630,


        alt:

          "NationPath Astro Intelligence",


      },


    ],



  },







  twitter:{


    card:

      "summary_large_image",



    title:

      "NationPath Astro Intelligence | Horoscope & Panchang",




    description:

      "Daily horoscope, Panchang and Vedic Astro Intelligence.",




    images:[

      "/astro-og-image.png"

    ],



  },


};







//////////////////////////////////////////////////////////////
// LAYOUT
//////////////////////////////////////////////////////////////

export default function AstroLayout({

  children,

}:{

  children:React.ReactNode;

}){


return (


  <AstroShell>


    {children}


  </AstroShell>


);


}
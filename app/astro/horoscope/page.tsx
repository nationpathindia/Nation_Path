//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO
//
// HOROSCOPE HOME PAGE -ENGINE LAYER HIDDEN
//
//////////////////////////////////////////////////////////////

import type { Metadata } from "next";

import HoroscopeHomeExperience from "@/components/astro-new/horoscope-home/HoroscopeHomeExperience";



//////////////////////////////////////////////////////////////
// SEO METADATA
//////////////////////////////////////////////////////////////

export const metadata: Metadata = {

  metadataBase: new URL(
    "https://nationpathindia.com"
  ),


  title:
    "Daily Vedic Horoscope | Panchang & Astro Intelligence | NationPath Astro",


  description:
    "Explore daily Vedic horoscope, Panchang intelligence, Muhurta timings, zodiac insights and premium astrology experience with NationPath Astro by NationPath India.",


  keywords: [

    "NationPath Astro",

    "NationPath India",

    "daily horoscope",

    "vedic horoscope",

    "rashifal",

    "panchang",

    "muhurta",

    "zodiac signs",

    "vedic astrology",

    "astrology intelligence",

  ],


  alternates: {

    canonical:
      "https://nationpathindia.com/astro/horoscope",

  },


  openGraph: {

    title:
      "NationPath Astro | Daily Vedic Horoscope & Panchang Intelligence",


    description:
      "A premium Vedic astrology experience by NationPath India combining daily horoscope, Panchang wisdom and cosmic intelligence.",


    url:
      "https://nationpathindia.com/astro/horoscope",


    siteName:
      "NationPath India",


    type:
      "website",

  },


  twitter: {

    card:
      "summary_large_image",


    title:
      "NationPath Astro | Daily Vedic Horoscope",


    description:
      "Discover daily horoscope, Panchang insights and Vedic astrology intelligence with NationPath India.",

  },


};





//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////

interface AstroResponse {

  success?: boolean;

  data?: unknown;

}





//////////////////////////////////////////////////////////////
// BASE URL
//////////////////////////////////////////////////////////////

function getBaseUrl(){

  return (

    process.env.NEXT_PUBLIC_BASE_URL ||

    "http://localhost:3000"

  );

}





//////////////////////////////////////////////////////////////
// PANCHANG FETCH
//////////////////////////////////////////////////////////////

async function getPanchang(){


  try {


    const response = await fetch(

      `${getBaseUrl()}/api/astro/panchang`,

      {

        cache:"no-store"

      }

    );



    if(!response.ok){


      console.error(

        "PANCHANG API ERROR",

        response.status

      );


      return null;

    }



    const result: AstroResponse =

      await response.json();



    return result?.data || null;



  }

  catch(error){


    console.error(

      "PANCHANG FETCH FAILED",

      error

    );


    return null;


  }


}





//////////////////////////////////////////////////////////////
// MUHURTA FETCH
//////////////////////////////////////////////////////////////

async function getMuhurta(){


  try {


    const response = await fetch(

      `${getBaseUrl()}/api/astro/muhurta`,

      {

        cache:"no-store"

      }

    );



    if(!response.ok){


      console.error(

        "MUHURTA API ERROR",

        response.status

      );


      return null;

    }





    const result: AstroResponse =

      await response.json();





    return result?.data || null;



  }

  catch(error){


    console.error(

      "MUHURTA FETCH FAILED",

      error

    );


    return null;


  }


}





//////////////////////////////////////////////////////////////
// ZODIAC CMS FETCH
//////////////////////////////////////////////////////////////

async function getZodiacList(){


  try {


    const response = await fetch(

      `${getBaseUrl()}/api/astro/horoscope/cms`,

      {

        method:"POST",


        headers:{

          "Content-Type":

            "application/json"

        },


        body:JSON.stringify({

          zodiac:"aries"

        }),


        cache:"no-store"


      }

    );





    if(!response.ok){


      console.error(

        "CMS ZODIAC API ERROR",

        response.status

      );


      return [];

    }





    const result = await response.json();





    return result?.zodiacList || [];




  }

  catch(error){


    console.error(

      "ZODIAC FETCH FAILED",

      error

    );


    return [];


  }


}







//////////////////////////////////////////////////////////////
// PAGE
//////////////////////////////////////////////////////////////

export default async function HoroscopePage(){



  const [

    panchang,

    muhurta,

    zodiacList


  ] = await Promise.all([



    getPanchang(),


    getMuhurta(),


    getZodiacList()



  ]);





  return (

    <HoroscopeHomeExperience


      panchang={panchang}


      muhurta={muhurta}


      zodiacList={zodiacList}


    />

  );


}
//////////////////////////////////////////////////////////////
// NATIONPATH HOROSCOPE CONTENT MERGER
//
// Astro Engine Response + CMS Editorial Content
//
// Responsibility:
// Merge CMS editorial intelligence only.
//
// Does NOT:
// - modify calculations
// - modify planets
// - modify prediction engine
// - modify horoscope logic
//
// Flow:
//
// Horoscope Engine
//        +
// CMS Editorial Layer
//        ↓
// Final Horoscope Experience Response
//
//////////////////////////////////////////////////////////////


import type {
  HoroscopeFrontendResponse,
} from "@/lib/services/horoscopeResponseMapper";


import type {
  AstrologyContentResult,
} from "@/lib/services/astrologyContentService";





//////////////////////////////////////////////////////////////
// RESPONSE TYPE
//////////////////////////////////////////////////////////////

export interface HoroscopeWithEditorialResponse
  extends HoroscopeFrontendResponse {


  editorial?: {


    headline?: string;


    prediction?: string;


    quote?: string;



    luckyNumber?: string;


    luckyColor?: string;


    luckyTime?: string;



    energy?: number;


    image?: string;



    experience?:
      AstrologyContentResult["experience"];




    seo?: {


      title?: string;


      description?: string;


    };


  };


}










//////////////////////////////////////////////////////////////
// MERGE FUNCTION
//////////////////////////////////////////////////////////////


export function mergeHoroscopeContent(


  horoscope:
    HoroscopeFrontendResponse,


  content:
    AstrologyContentResult | null



):HoroscopeWithEditorialResponse {





//////////////////////////////////////////////////////////////
// NO CMS DATA
//////////////////////////////////////////////////////////////

if(!content){


  return {


    ...horoscope,


  };


}









//////////////////////////////////////////////////////////////
// BUILD EDITORIAL RESPONSE
//////////////////////////////////////////////////////////////

const editorial = {


  headline:

    content.headline,



  prediction:

    content.prediction,



  quote:

    content.quote,





  //////////////////////////////////////////////////////////
  // LEGACY LUCKY DATA
  //////////////////////////////////////////////////////////


  luckyNumber:

    content.luckyNumber,



  luckyColor:

    content.luckyColor,



  luckyTime:

    content.luckyTime,



  energy:

    content.energy,



  image:

    content.image,






  //////////////////////////////////////////////////////////
  // PREMIUM EXPERIENCE CMS
  //////////////////////////////////////////////////////////


  experience:

    content.experience,





  //////////////////////////////////////////////////////////
  // SEO
  //////////////////////////////////////////////////////////


  seo:

    (

      content.seoTitle ||

      content.seoDescription

    )

    ?


    {


      title:

        content.seoTitle,



      description:

        content.seoDescription,


    }


    :

    undefined,



};










//////////////////////////////////////////////////////////////
// FINAL RESPONSE
//////////////////////////////////////////////////////////////

return {


  ...horoscope,


  editorial,



};



}
//////////////////////////////////////////////////////////////
// NATIONPATH ASTROLOGY CONTENT SERVICE
//
// CMS Editorial Content Fetch Layer
//
// Responsibility:
// Fetch published astrology editorial content.
//
// Does NOT:
// - calculate horoscope
// - modify astro engine
// - generate predictions
// - handle AI enhancement
//
// Flow:
//
// AstrologyContent CMS
//          ↓
// Service Layer
//          ↓
// Horoscope API
//          ↓
// Premium Experience
//
//////////////////////////////////////////////////////////////


import AstrologyContent from "@/app/models/AstrologyContent";


import {
  connectMongoDB,
} from "@/lib/mongodb";





//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////

export interface AstrologyContentResult {


  headline?: string;


  prediction?: string;


  quote?: string;



  ////////////////////////////////////////////////////////////
  // LEGACY LUCKY DATA
  ////////////////////////////////////////////////////////////

  luckyNumber?: string;

  luckyColor?: string;

  luckyTime?: string;


  energy?: number;


  image?: string;



  ////////////////////////////////////////////////////////////
  // PREMIUM EXPERIENCE CONTENT
  ////////////////////////////////////////////////////////////

  experience?: {


    hero?: {


      title?: string;


      subtitle?: string;


      description?: string;


      image?: string;


    };



    insights?: Array<{

      category?: string;


      title?: string;


      content?: string;


    }>;



    planetaryInfluence?: {


      title?: string;


      planets?: Array<{

        planet?: string;


        influence?: string;


        description?: string;


      }>;


    };



    luckyFactors?: {


      numbers?: string[];


      colors?: string[];


      days?: string[];


      times?: string[];


      directions?: string[];


    };



    remedy?: {


      title?: string;


      description?: string;


      steps?: string[];


    };


  };





  ////////////////////////////////////////////////////////////
  // SEO
  ////////////////////////////////////////////////////////////

  seoTitle?: string;


  seoDescription?: string;


}








//////////////////////////////////////////////////////////////
// DATABASE DOCUMENT TYPE
//////////////////////////////////////////////////////////////

interface AstrologyContentDocument {


  headline?: string;


  prediction?: string;


  quote?: string;



  luckyNumber?: string;


  luckyColor?: string;


  luckyTime?: string;



  energy?: number;


  image?: string;




  experience?: AstrologyContentResult["experience"];




  seoTitle?: string;


  seoDescription?: string;


}








//////////////////////////////////////////////////////////////
// QUERY TYPE
//////////////////////////////////////////////////////////////

interface AstrologyContentFilter {


  zodiac:string;


  date:string;


  status:
    "published"
    |
    "draft";


}









//////////////////////////////////////////////////////////////
// GET ASTROLOGY CONTENT
//////////////////////////////////////////////////////////////

export async function getAstrologyContent(


  zodiacSign:string,


  date:string


):Promise<AstrologyContentResult|null>{



  try{



    //////////////////////////////////////////////////////////
    // DATABASE CONNECTION
    //////////////////////////////////////////////////////////


    await connectMongoDB();







    //////////////////////////////////////////////////////////
    // NORMALIZATION
    //////////////////////////////////////////////////////////


    const normalizedZodiac =

      zodiacSign

        .trim()

        .toLowerCase();




    const normalizedDate =

      date.trim();








    if(

      !normalizedZodiac ||

      !normalizedDate

    ){

      return null;

    }









    //////////////////////////////////////////////////////////
    // CMS FILTER
    //////////////////////////////////////////////////////////


    const filter:

      AstrologyContentFilter =

    {


      zodiac:

        normalizedZodiac,



      date:

        normalizedDate,



      status:

        "published",


    };









    //////////////////////////////////////////////////////////
    // FETCH CMS DOCUMENT
    //////////////////////////////////////////////////////////


    const content =

      await (

        (AstrologyContent as any)

          .findOne(filter)

          .lean()

      ) as AstrologyContentDocument | null;







    //////////////////////////////////////////////////////////
    // CMS DATA NOT AVAILABLE
    //////////////////////////////////////////////////////////


    if(!content){


      return null;


    }









    //////////////////////////////////////////////////////////
    // RESPONSE CONTRACT
    //////////////////////////////////////////////////////////


    return {


      headline:

        content.headline,



      prediction:

        content.prediction,



      quote:

        content.quote,





      ////////////////////////////////////////////////////////
      // LEGACY COMPATIBILITY
      ////////////////////////////////////////////////////////

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







      ////////////////////////////////////////////////////////
      // PREMIUM EXPERIENCE
      ////////////////////////////////////////////////////////

      experience:

        content.experience,








      ////////////////////////////////////////////////////////
      // SEO
      ////////////////////////////////////////////////////////

      seoTitle:

        content.seoTitle,



      seoDescription:

        content.seoDescription,



    };





  }


  catch(error){



    console.error(

      "[ASTROLOGY_CONTENT_SERVICE_ERROR]",

      error

    );



    return null;



  }



}
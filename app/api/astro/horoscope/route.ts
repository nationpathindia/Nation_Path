//////////////////////////////////////////////////////////////
// NATIONPATH HOROSCOPE API
//
// Deterministic Engine
// + Prediction Intelligence
// + NationPath AI Editorial Layer
// + Experience Intelligence
// + Frontend Mapper
// + CMS Editorial Layer
//
// Pipeline:
//
// Horoscope Input
//        ↓
// Astro Engine
//        ↓
// Prediction Intelligence
//        ↓
// NationPath AI Enhancement
//        ↓
// Experience Intelligence
//        ↓
// Frontend Mapper
//        ↓
// CMS Merge
//        ↓
// Premium UI
//
// Locked:
// - Calculation untouched
// - Swiss Ephemeris untouched
// - Prediction rules untouched
// - AI only language enhancement
//////////////////////////////////////////////////////////////

import { z } from "zod";


import {
  generateHoroscope,
} from "@/lib/services/horoscopeService";


import {
  enhanceHoroscopeWithAI,
} from "@/lib/services/horoscopeAIService";


import {
  mapHoroscopeResponse,
} from "@/lib/services/horoscopeResponseMapper";


import {
  getAstrologyContent,
} from "@/lib/services/astrologyContentService";


import {
  mergeHoroscopeContent,
} from "@/lib/services/horoscopeContentMerger";


import {
  predictHoroscope,
} from "@/lib/astro/horoscope/prediction";


import type {
  HoroscopePlanet,
} from "@/lib/astro/horoscope/types";


import {
  buildExperienceSections,
} from "@/lib/astro/horoscope/prediction/experience/experienceSections";


import {
  createFormattedExperience,
} from "@/lib/astro/horoscope/prediction/experience/formatter";


import {
  astroSuccess,
  astroError,
} from "@/lib/astro/api/response";


import {
  ASTRO_API_ERRORS,
} from "@/lib/astro/api/errors";



console.log(
  "🔥 ASTRO HOROSCOPE ROUTE LOADED"
);



export const runtime =
"nodejs";


export const dynamic =
"force-dynamic";





//////////////////////////////////////////////////////////////
// REQUEST VALIDATION
//////////////////////////////////////////////////////////////

const RequestSchema = z.object({


  zodiacSign:

    z.string()
      .trim()
      .toLowerCase()
      .min(1),



  horoscopeDate:

    z.coerce.date()
      .refine(

        date =>
          !isNaN(
            date.getTime()
          ),

        {
          message:
          "Invalid horoscopeDate",
        }

      ),



  language:

    z.enum([

      "english",
      "hindi",
      "marathi",
      "tamil",
      "telugu",
      "nepali",

    ])

    .optional()

    .default(
      "english"
    ),


});






//////////////////////////////////////////////////////////////
// POST HOROSCOPE
//////////////////////////////////////////////////////////////

export async function POST(
 req:Request
){


const startedAt =
Date.now();



try{


const body =
await req.json();



const validated =
RequestSchema.parse(
 body
);



console.log(
 "HOROSCOPE REQUEST",
 {
  zodiacSign:
    validated.zodiacSign,

  date:
    validated.horoscopeDate,

  language:
    validated.language,
 }
);






//////////////////////////////////////////////////////////////
// ASTRO ENGINE
//////////////////////////////////////////////////////////////

const horoscope =

await generateHoroscope({

  zodiacSign:
    validated.zodiacSign,


  horoscopeDate:
    validated.horoscopeDate,


  language:
    validated.language,

});

console.log(
  "🔥 ZODIAC PLANET CHECK",
  {
    zodiac:
      validated.zodiacSign,

    planets:
      horoscope.planets,
  }
);








//////////////////////////////////////////////////////////////
// PREDICTION INTELLIGENCE
//////////////////////////////////////////////////////////////
const prediction =

predictHoroscope(

  horoscope.planets as unknown as Record<
    string,
    HoroscopePlanet
  >,


  validated.language,


  validated.zodiacSign

);



console.log(
 "PREDICTION COMPLETE",
 {
  headline:
    prediction.headline,

  summary:
    prediction.naturalSummary,
 }
);






//////////////////////////////////////////////////////////////
// NATIONPATH AI EDITORIAL ENHANCEMENT
//////////////////////////////////////////////////////////////

const aiEnhancedHoroscope =

await enhanceHoroscopeWithAI({

  ...horoscope,

  prediction,

});




console.log(
 "AI ENHANCEMENT COMPLETE"
);
//////////////////////////////////////////////////////////////
// EXPERIENCE INTELLIGENCE
//////////////////////////////////////////////////////////////

let experience = null;


try {


  const sections =

    buildExperienceSections(

      aiEnhancedHoroscope.prediction

    );



  experience =

    createFormattedExperience(

      sections

    );


}


catch(error){


  console.warn(

    "[HOROSCOPE_EXPERIENCE_FAILED]",

    error instanceof Error

    ? error.message

    : error

  );


}







//////////////////////////////////////////////////////////////
// FRONTEND RESPONSE MAPPER
//////////////////////////////////////////////////////////////

const frontendResponse =

mapHoroscopeResponse(

  aiEnhancedHoroscope,

  validated.zodiacSign

);







//////////////////////////////////////////////////////////////
// RESPONSE ENRICHMENT
//////////////////////////////////////////////////////////////

const enrichedResponse = {


  ...frontendResponse,



  prediction:{


    ...frontendResponse.prediction,


    ...aiEnhancedHoroscope.prediction,


  },



  experience,


};








//////////////////////////////////////////////////////////////
// CMS EDITORIAL CONTENT
//////////////////////////////////////////////////////////////

const cmsDate =

validated.horoscopeDate

.toISOString()

.split("T")[0];




console.log(

  "===== HOROSCOPE CMS SECTION ====="

);




const astrologyContent =

await getAstrologyContent(

  validated.zodiacSign,

  cmsDate

);




console.log(

  "CMS FETCH",

  {

    found:

      !!astrologyContent,


    headline:

      astrologyContent?.headline,


    experience:

      !!astrologyContent?.experience,


  }

);






const finalResponse =

mergeHoroscopeContent(

  enrichedResponse,

  astrologyContent

);






console.log(

  "FINAL RESPONSE CHECK",

  {

    zodiac:

      validated.zodiacSign,


    aiHeadline:

      finalResponse.prediction?.headline,


    editorialHeadline:

      finalResponse.editorial?.headline,


    hasExperience:

      !!finalResponse.experience,


  }

);








//////////////////////////////////////////////////////////////
// SUCCESS RESPONSE
//////////////////////////////////////////////////////////////

return astroSuccess(

  finalResponse,


  {


    zodiacSign:

      validated.zodiacSign,



    requestedDate:

      validated.horoscopeDate

      .toISOString(),



    language:

      validated.language,



    engine:

      "nationpath-astro-intelligence",



    ai:

      "nationpath-ai-core-v1",



    version:

      "3.0",



    responseTime:

      Date.now()

      -

      startedAt,


  }

);



}
//////////////////////////////////////////////////////////////
// ERROR HANDLING
//////////////////////////////////////////////////////////////

catch(error){


  console.error(

    "[HOROSCOPE_API_ERROR]",

    error

  );





  if(
    error instanceof z.ZodError
  ){


    return astroError(

      "VALIDATION_ERROR",

      "Invalid horoscope request",

      400,

      error.flatten()

    );


  }





  return astroError(

    ASTRO_API_ERRORS.INTERNAL_ERROR.code,


    ASTRO_API_ERRORS.INTERNAL_ERROR.message,


    500,


    error instanceof Error

    ?

    error.message

    :

    "Internal Horoscope Error"


  );


}



}









//////////////////////////////////////////////////////////////
// GET HEALTH CHECK
//
// Browser testing support
//////////////////////////////////////////////////////////////

export async function GET(){


  return astroSuccess(


    {


      status:

        "HOROSCOPE API ONLINE",



      pipeline:


        [


          "Astro Engine",


          "Prediction Intelligence",


          "NationPath AI Enhancement",


          "Experience Intelligence",


          "Frontend Mapper",


          "CMS Editorial Layer",


        ],



      rules:


        {


          calculation:

            "immutable",



          ai:

            "editorial-only",



          provider:

            "NationPath Internal AI",


        },



    },


    {


      engine:

        "nationpath-astro-intelligence",



      ai:

        "nationpath-ai-core-v1",



      version:

        "3.0",


    }


  );


}







//////////////////////////////////////////////////////////////
// END OF NATIONPATH HOROSCOPE API
//
// Flow:
//
// Request
//    ↓
// Astro Engine
//    ↓
// Prediction Intelligence
//    ↓
// NationPath AI Core
//    ↓
// Experience Intelligence
//    ↓
// CMS Editorial
//    ↓
// Premium Horoscope
//
// Calculation Immutable
// AI Editorial Only
//
// NO OPENAI
// NO EXTERNAL PROVIDER
//////////////////////////////////////////////////////////////
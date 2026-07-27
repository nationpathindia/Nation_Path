//////////////////////////////////////////////////////////////
// NATIONPATH HOROSCOPE API
//
// Deterministic Engine
// + Prediction Intelligence
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
//////////////////////////////////////////////////////////////

import { z } from "zod";


import {
  generateHoroscope,
} from "@/lib/services/horoscopeService";


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

export const runtime = "nodejs";

export const dynamic = "force-dynamic";





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
    .default("english"),

});






//////////////////////////////////////////////////////////////
// POST
//////////////////////////////////////////////////////////////

export async function POST(
  req: Request
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
  "REQUEST INPUT",
  {
    zodiacSign: validated.zodiacSign,
    horoscopeDate: validated.horoscopeDate,
    language: validated.language,
  }
);


//////////////////////////////////////////////////////////////
// ENGINE
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
  "HOROSCOPE ENGINE OUTPUT",
  {
    zodiacSign: validated.zodiacSign,
    planets: horoscope.planets
  }
);




//////////////////////////////////////////////////////////////
// PREDICTION INTELLIGENCE
//
// Zodiac context added
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
  "PREDICTION OUTPUT",
  {
    zodiacSign: validated.zodiacSign,

    headline:
      prediction.headline,

    overview:
      prediction.overview,

    naturalSummary:
      prediction.naturalSummary,

    dominant:
      prediction.predictionRanking?.slice(0,3)
  }
);





//////////////////////////////////////////////////////////////
// EXPERIENCE INTELLIGENCE
//////////////////////////////////////////////////////////////

let experience = null;



try{


const sections =

buildExperienceSections(

  prediction

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
// FRONTEND CONTRACT
//////////////////////////////////////////////////////////////

const frontendResponse =

mapHoroscopeResponse(

  horoscope,

  validated.zodiacSign

);







//////////////////////////////////////////////////////////////
// ENRICH RESPONSE
//////////////////////////////////////////////////////////////

const enrichedResponse = {


  ...frontendResponse,


  prediction:{


    ...frontendResponse.prediction,


    ...prediction,


  },


  experience,


};


//////////////////////////////////////////////////////////////
// CMS EDITORIAL LAYER
//////////////////////////////////////////////////////////////
const cmsDate =

validated.horoscopeDate
.toISOString()
.split("T")[0];

console.log(
  "===== HOROSCOPE ROUTE CMS SECTION HIT ====="
);

const astrologyContent =

await getAstrologyContent(

  validated.zodiacSign,

  cmsDate

);


console.log(
  "CMS FETCH CHECK",
  {
    found:
      !!astrologyContent,

    headline:
      astrologyContent?.headline,

    hasExperience:
      !!astrologyContent?.experience
  }
);

const finalResponse =

mergeHoroscopeContent(

  enrichedResponse,

  astrologyContent

);

console.log(
  "FINAL CMS CHECK",
  {
    editorial:
      finalResponse.editorial,

    cmsHeadline:
      finalResponse.editorial?.headline,

    cmsPrediction:
      finalResponse.editorial?.prediction,

    cmsExperience:
      !!finalResponse.editorial?.experience
  }
);


console.log(
  "FINAL API RESPONSE CHECK",
  {
    zodiacSign:
      validated.zodiacSign,

    engineHeadline:
      finalResponse.prediction?.headline,

    engineSummary:
      finalResponse.prediction?.naturalSummary,


    editorialHeadline:
      finalResponse.editorial?.headline,

    editorialPrediction:
      finalResponse.editorial?.prediction,

    editorialExperience:
      finalResponse.editorial?.experience,

  }
);


//////////////////////////////////////////////////////////////
// RESPONSE
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



    version:

      "2.0",



    responseTime:

      Date.now()
      -
      startedAt,


  }

);



}



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

? error.message

: "Internal Horoscope Error"

);



}


}
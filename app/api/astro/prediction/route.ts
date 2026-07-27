//////////////////////////////////////////////////////////////
// NATIONPATH PREDICTION API
//
// Horoscope Prediction Intelligence Exposure Layer
//
// Pipeline:
//
// Horoscope Snapshot
//        ↓
// Prediction Engine
//        ↓
// Language Intelligence
//        ↓
// Experience Intelligence
//        ↓
// API Response
//
// Calculation untouched.
// Prediction engine untouched.
//////////////////////////////////////////////////////////////

import { z } from "zod";


import {
  generateHoroscope,
} from "@/lib/services/horoscopeService";


import {
  predictHoroscope,
} from "@/lib/astro/horoscope/prediction";


import type {
  HoroscopeLanguage,
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




export const runtime = "nodejs";

export const dynamic = "force-dynamic";





//////////////////////////////////////////////////////////////
// REQUEST VALIDATION
//////////////////////////////////////////////////////////////

const RequestSchema = z.object({


  horoscopeDate:

    z.string()

    .transform(

      value => new Date(value)

    )

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

      "en",
      "hi",
      "ta",
      "te",
      "sa",

    ])

    .optional(),


});






//////////////////////////////////////////////////////////////
// LANGUAGE RESOLVER
//////////////////////////////////////////////////////////////

function resolveLanguage(

 value:string | undefined

):HoroscopeLanguage {


 return (

   value as HoroscopeLanguage

 )

 ??

 "english";


}






//////////////////////////////////////////////////////////////
// REQUEST ID
//////////////////////////////////////////////////////////////

function createRequestId(){

 return (

  "astro_"

  +

  Date.now()

  +

  "_"

  +

  Math.random()

  .toString(36)

  .slice(2)

 );

}







//////////////////////////////////////////////////////////////
// POST
//////////////////////////////////////////////////////////////

export async function POST(

 req:Request

){


 const startedAt =

 Date.now();


 const requestId =

 createRequestId();



 try {


 //////////////////////////////////////////////////////////
 // VALIDATION
 //////////////////////////////////////////////////////////


 const body =

 await req.json();



 const validatedData =

 RequestSchema.parse(

  body

 );



 const language =

 resolveLanguage(

  validatedData.language

 );





 //////////////////////////////////////////////////////////
 // HOROSCOPE GENERATION
 //////////////////////////////////////////////////////////


 const horoscope =

 await generateHoroscope({

  horoscopeDate:

  validatedData.horoscopeDate,


  language,


 });







 //////////////////////////////////////////////////////////
 // PREDICTION ENGINE
 //////////////////////////////////////////////////////////


 const prediction =

 predictHoroscope(

  horoscope.planets as unknown as Record<
    string,
    HoroscopePlanet
  >,


  language

 );







 //////////////////////////////////////////////////////////
 // EXPERIENCE INTELLIGENCE
 //////////////////////////////////////////////////////////


 let experience = null;


 try {


   const sections =

   buildExperienceSections(

    prediction

   );



   experience =

   createFormattedExperience(

    sections

   );


 }

 catch(experienceError){


   console.warn(

    "[EXPERIENCE_LAYER_FAILED]",

    experienceError

   );


 }







 //////////////////////////////////////////////////////////
 // RESPONSE
 //////////////////////////////////////////////////////////


 const response =

 astroSuccess(


 {

  ...prediction,


  experience,



  meta:{


   apiVersion:

   "v2",



   engine:

   "nationpath-horoscope-intelligence",



   requestId,



   generatedAt:

   new Date()

   .toISOString(),



   processingTime:

   Date.now()

   -

   startedAt,



   modules:[


    "calculation",


    "prediction",


    "language",


    "experience",


   ],



   futureReady:{


    weekly:

    true,


    monthly:

    true,


    premiumReports:

    true,


    aiPersonalization:

    true,


   },


  },


 },


 {


 requestedDate:

 validatedData.horoscopeDate

 .toISOString(),


 language,


 }


 );





 response.headers.set(

 "Cache-Control",

 "no-store"

 );


 return response;



 }



 catch(error){



 console.error(

 "[PREDICTION_API_ERROR]",

 {

  requestId,

  error

 }

 );





 if(error instanceof z.ZodError){


 return astroError(

 "VALIDATION_ERROR",

 "Validation Error",

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

 "Prediction generation failed"


 );




 }

}
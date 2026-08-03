//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE SERVICE
//
// Production Horoscope Service Layer v2.2
//
// Flow:
//
// Request
//    ↓
// Astro Engine
//    ↓
// Horoscope Result
//    ↓
// NationPath AI Enhancement
//    ↓
// Premium Horoscope
//
// Rules:
//
// Astro Engine = Source of Truth
// AI = Editorial Layer Only
//
// NO calculation modification
// NO planetary modification
// NO prediction generation
//////////////////////////////////////////////////////////////


import {
  calculateHoroscope,
} from "@/lib/astro/horoscope/engine";


import type {
  HoroscopeRequest,
  HoroscopeResult,
  HoroscopeLanguage,
} from "@/lib/astro/horoscope/types";



import {
  enhanceHoroscopeWithAI,
} from "@/lib/services/horoscopeAIService";





//////////////////////////////////////////////////////////////
// INPUT TYPE
//////////////////////////////////////////////////////////////


export interface HoroscopeServiceInput {


  horoscopeDate:
    Date | string;



  language?:
    HoroscopeLanguage;



  zodiacSign?:
    string;


}





//////////////////////////////////////////////////////////////
// DATE NORMALIZER
//////////////////////////////////////////////////////////////


function normalizeDate(
  value: Date | string
): Date {


  if(
    value instanceof Date
  ){

    return value;

  }



  return new Date(
    value
  );


}








//////////////////////////////////////////////////////////////
// LANGUAGE RESOLVER
//////////////////////////////////////////////////////////////


function resolveLanguage(

 language?: HoroscopeLanguage

): HoroscopeLanguage {


  return (

    language

    ??

    ("english" as HoroscopeLanguage)

  );


}








//////////////////////////////////////////////////////////////
// ENGINE EXECUTION
//////////////////////////////////////////////////////////////


async function runAstroEngine(

 request: HoroscopeRequest

): Promise<HoroscopeResult> {


  return calculateHoroscope(

    request

  );


}









//////////////////////////////////////////////////////////////
// AI ENHANCEMENT SAFE WRAPPER
//////////////////////////////////////////////////////////////


async function runAIEnhancement(

 horoscope: HoroscopeResult

): Promise<HoroscopeResult> {


  try{


    return await enhanceHoroscopeWithAI(

      horoscope

    );


  }

  catch(error){



    console.error(

      "[HOROSCOPE_AI_SERVICE_ERROR]",

      error

    );



    return horoscope;


  }


}









//////////////////////////////////////////////////////////////
// MAIN HOROSCOPE GENERATOR
//////////////////////////////////////////////////////////////


export async function generateHoroscope(

 input: HoroscopeServiceInput

): Promise<HoroscopeResult> {



  const date =

    normalizeDate(

      input.horoscopeDate

    );





  if(

    Number.isNaN(

      date.getTime()

    )

  ){

    throw new Error(

      "Invalid horoscope date"

    );


  }







  const language =

    resolveLanguage(

      input.language

    );







  const request:

  HoroscopeRequest =

  {


    date,


    language,



    zodiacSign:

      input.zodiacSign,


  };








  ////////////////////////////////////////////////////////////
  // STEP 1
  // DETERMINISTIC ASTRO ENGINE
  ////////////////////////////////////////////////////////////


  const horoscope =

    await runAstroEngine(

      request

    );

console.log(
  "🔥 RAW ASTRO OUTPUT",
  {
    zodiac: request.zodiacSign,
    planets: horoscope.planets,
  }
);







  ////////////////////////////////////////////////////////////
  // STEP 2
  // NATIONPATH AI PREMIUM EDITORIAL LAYER
  ////////////////////////////////////////////////////////////


  const enhanced =

    await runAIEnhancement(

      horoscope

    );









  return enhanced;



}









//////////////////////////////////////////////////////////////
// BACKWARD COMPATIBILITY
//////////////////////////////////////////////////////////////


export async function createHoroscope(

 input: HoroscopeServiceInput

): Promise<HoroscopeResult> {


  return generateHoroscope(

    input

  );


}









//////////////////////////////////////////////////////////////
// DEFAULT EXPORT
//////////////////////////////////////////////////////////////


export default {


  generateHoroscope,


  createHoroscope,


};
//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO HOROSCOPE CMS API
//
// CMS FIRST HOROSCOPE DELIVERY
//
// Supports:
//
// Daily Horoscope
// Weekly Horoscope
// Monthly Horoscope
// Yearly Horoscope
//
// Flow:
//
// UI
//   ↓
// /api/astro/horoscope/cms
//   ↓
// Horoscope CMS Mongo
//   ↓
// Missing?
//   ↓
// Daily Automation Fallback
//   ↓
// MongoDB CMS
//   ↓
// Premium Experience UI
//
//
// LOCKED:
//
// ✅ CMS FIRST
// ✅ No Swiss Ephemeris
// ✅ No Calculation
// ✅ No Prediction modification
// ✅ No AI generation here
//
//////////////////////////////////////////////////////////////


import { z } from "zod";


import {

  astroSuccess,

  astroError,

} from "@/lib/astro/api/response";



import {

  getHoroscopeByPeriod,

} from "@/lib/services/horoscopeContentService";



import {

  ensureDailyHoroscopeGenerated,

} from "@/lib/automation/horoscope";









//////////////////////////////////////////////////////////////
// RUNTIME
//////////////////////////////////////////////////////////////

export const runtime = "nodejs";

export const dynamic = "force-dynamic";









//////////////////////////////////////////////////////////////
// REQUEST CONTRACT
//////////////////////////////////////////////////////////////

const RequestSchema = z.object({



  zodiacSign:

    z.string()

    .trim()

    .toLowerCase()

    .min(1),





  horoscopeDate:

    z.coerce.date()

    .optional(),





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





  period:

    z.enum([


      "daily",

      "weekly",

      "monthly",

      "yearly",


    ])

    .optional()

    .default("daily"),



});









//////////////////////////////////////////////////////////////
// DATE FORMATTER
//////////////////////////////////////////////////////////////

function formatDate(

  date?:Date

){


  if(!date){

    return new Date()

      .toISOString()

      .split("T")[0];

  }



  return date

    .toISOString()

    .split("T")[0];


}









//////////////////////////////////////////////////////////////
// POST
//////////////////////////////////////////////////////////////

export async function POST(

  req:Request

){



const startedAt = Date.now();





try {





//////////////////////////////////////////////////////////////
//
// REQUEST PARSE
//
//////////////////////////////////////////////////////////////

const body = await req.json();





const validated =

  RequestSchema.parse(body);







console.log(

  "NATIONPATH HOROSCOPE CMS REQUEST",

  {

    zodiac:

      validated.zodiacSign,


    period:

      validated.period,


    language:

      validated.language,


  }

);









//////////////////////////////////////////////////////////////
//
// FETCH CMS CONTENT
//
//////////////////////////////////////////////////////////////

let content =

await getHoroscopeByPeriod(


  validated.zodiacSign,


  validated.period,


  validated.horoscopeDate,


  validated.language



);








//////////////////////////////////////////////////////////////
//
// AUTOMATION FALLBACK
//
// ONLY DAILY
//
// CMS missing
//      ↓
// ensure service
//      ↓
// lock
//      ↓
// generate
//
//////////////////////////////////////////////////////////////

let automation = null;





if(

  !content

  &&

  validated.period === "daily"

){



console.log(

  "🌌 Daily horoscope missing. Triggering fallback.",

  {

    zodiac:

      validated.zodiacSign,

  }

);






automation =

await ensureDailyHoroscopeGenerated(



  validated.zodiacSign,



  {

    language:

      validated.language,

  }



);









//
// If generation completed
// fetch fresh CMS again
//

if(

  automation.generated

){



content =

await getHoroscopeByPeriod(


  validated.zodiacSign,


  validated.period,


  validated.horoscopeDate,


  validated.language



);


}



}









//////////////////////////////////////////////////////////////
//
// RESPONSE
//
//////////////////////////////////////////////////////////////

const response = {





//////////////////////////////////////////////////////////////
// REQUEST META
//////////////////////////////////////////////////////////////

zodiacSign:

validated.zodiacSign,





date:

formatDate(

validated.horoscopeDate

),





language:

content?.meta?.language

||

validated.language,






period:

content?.meta?.period

||

validated.period,









//////////////////////////////////////////////////////////////
// COMPLETE CMS
//////////////////////////////////////////////////////////////

cms:

content

||

null,








//////////////////////////////////////////////////////////////
// AUTOMATION STATUS
//////////////////////////////////////////////////////////////

automation:

automation

||

null,









//////////////////////////////////////////////////////////////
// EDITORIAL
//////////////////////////////////////////////////////////////

editorial:

content?.editorial

||

null,









//////////////////////////////////////////////////////////////
// PREMIUM EXPERIENCE
//////////////////////////////////////////////////////////////

experience:


content

?


{


hero:

content.hero,




identity:

content.identity,




traits:

content.traits,




insights:

content.insights,




planetaryInfluence:

content.insights?.planetaryInfluence,




luckyFactors:

content.lucky,




remedy:

content.remedy,




opportunities:

content.vedic?.favorable,




cautions:

content.vedic?.avoid,




premium:

content.premium,



}



:


null,









//////////////////////////////////////////////////////////////
// HOROSCOPE SECTIONS
//////////////////////////////////////////////////////////////

identity:

content?.identity

||

null,





traits:

content?.traits

||

null,





life:

content?.life

||

null,





insights:

content?.insights

||

null,





planets:

content?.planets

||

[],





lucky:

content?.lucky

||

null,





remedy:

content?.remedy

||

null,





vedic:

content?.vedic

||

null,





compatibility:

content?.compatibility

||

null,





premium:

content?.premium

||

null,





seo:

content?.seo

||

null,









//////////////////////////////////////////////////////////////
// ZODIAC EXPLORER
//////////////////////////////////////////////////////////////

zodiacList:

content?.zodiacList

||

[],









//////////////////////////////////////////////////////////////
// ENGINE SEPARATION
//////////////////////////////////////////////////////////////

prediction:

null,









//////////////////////////////////////////////////////////////
// SYSTEM META
//////////////////////////////////////////////////////////////

meta:{


source:

"nationpath-astro-horoscope-cms",




architecture:

"cms-first-with-automation-fallback",




version:

"4.0",




generatedAt:

new Date()

.toISOString(),




responseTime:

Date.now()

-

startedAt,



}



};









console.log(

"NATIONPATH HOROSCOPE CMS RESPONSE",

{


zodiac:

response.zodiacSign,


period:

response.period,


found:

!!content,


automation:

response.automation,


hasExperience:

!!response.experience,



}

);









return astroSuccess(

response,

{


source:

"cms",


version:

"4.0",


}

);








}

catch(error){





console.error(

"[HOROSCOPE_CMS_API_ERROR]",

error

);







if(error instanceof z.ZodError){



return astroError(

"VALIDATION_ERROR",

"Invalid horoscope CMS request",

400,

error.flatten()

);



}









return astroError(

"CMS_HOROSCOPE_FAILED",

"Unable to load horoscope CMS content",

500,

error instanceof Error

?

error.message

:

"Unknown CMS error"

);






}



}
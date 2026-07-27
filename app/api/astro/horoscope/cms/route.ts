//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE CMS API
//
// CMS FIRST HOROSCOPE DELIVERY
//
// Flow:
//
// UI
//   ↓
// useHoroscope()
//   ↓
// /api/astro/horoscope/cms
//   ↓
// Horoscope CMS Mongo
//   ↓
// Editorial Layer
//   ↓
// Experience Layer
//   ↓
// Premium UI
//
// LOCKED:
//
// ✅ No calculations
// ✅ No Swiss Ephemeris
// ✅ No Engine dependency
// ✅ No Prediction modification
//
// Purpose:
// Pure CMS content delivery
//////////////////////////////////////////////////////////////

import { z } from "zod";


import {
  astroSuccess,
  astroError,
} from "@/lib/astro/api/response";


import {
  getHoroscopeContent,
} from "@/lib/services/horoscopeContentService";





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
    ])
    .optional()
    .default("daily"),


});









//////////////////////////////////////////////////////////////
// POST
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
RequestSchema.parse(body);






console.log(
"NATIONPATH HOROSCOPE CMS REQUEST",
{

zodiacSign:
validated.zodiacSign,


period:
validated.period,


language:
validated.language,

}
);








//////////////////////////////////////////////////////////////
// CMS FETCH
//////////////////////////////////////////////////////////////

const content =

await getHoroscopeContent(

validated.zodiacSign

);









//////////////////////////////////////////////////////////////
// CMS NOT FOUND
//////////////////////////////////////////////////////////////

if(!content){


console.warn(

"[HOROSCOPE_CMS_EMPTY]",

validated.zodiacSign

);


}









//////////////////////////////////////////////////////////////
// RESPONSE CONTRACT
//////////////////////////////////////////////////////////////

const response = {


zodiacSign:

validated.zodiacSign,



date:

validated.horoscopeDate

?

validated.horoscopeDate
.toISOString()
.split("T")[0]

:

new Date()
.toISOString()
.split("T")[0],




language:

validated.language,



period:

validated.period,







//////////////////////////////////////////////////////////////
// COMPLETE CMS PAYLOAD
//////////////////////////////////////////////////////////////

cms:


content
??

null,







//////////////////////////////////////////////////////////////
// EDITORIAL SHORTCUT
//
// Direct UI access
//////////////////////////////////////////////////////////////

editorial:


content?.editorial

??

null,








//////////////////////////////////////////////////////////////
// EXPERIENCE SHORTCUT
//
// Premium components
//////////////////////////////////////////////////////////////

experience:


content?.hero
||
content?.insights
||
content?.remedy

?

{


hero:

content.hero,



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


}

:

null,










//////////////////////////////////////////////////////////////
// IDENTITY
//////////////////////////////////////////////////////////////

identity:

content?.identity

??

null,









//////////////////////////////////////////////////////////////
// LIFE AREAS
//////////////////////////////////////////////////////////////

life:

content?.life

??

null,








//////////////////////////////////////////////////////////////
// PLANETS
//////////////////////////////////////////////////////////////

planets:

content?.planets

??

[],








//////////////////////////////////////////////////////////////
// LUCK
//////////////////////////////////////////////////////////////

lucky:

content?.lucky

??

null,









//////////////////////////////////////////////////////////////
// REMEDY
//////////////////////////////////////////////////////////////

remedy:

content?.remedy

??

null,









//////////////////////////////////////////////////////////////
// PREMIUM
//////////////////////////////////////////////////////////////

premium:

content?.premium

??

null,









//////////////////////////////////////////////////////////////
// SEO
//////////////////////////////////////////////////////////////

seo:

content?.seo

??

null,








//////////////////////////////////////////////////////////////
// ENGINE PLACEHOLDER
//
// Engine remains separate
//////////////////////////////////////////////////////////////

prediction:

null,








meta:{


source:

"nationpath-astro-horoscope-cms",



version:

"2.0",



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

"NATIONPATH CMS HOROSCOPE RESPONSE",

{

zodiac:

response.zodiacSign,


found:

!!content,


hasEditorial:

!!response.editorial,


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

"2.0",


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
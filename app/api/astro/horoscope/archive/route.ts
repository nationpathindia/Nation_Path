//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ARCHIVE API
//
// CMS FIRST ARCHIVE DELIVERY
//
// Flow:
//
// Archive Page
//      ↓
// API
//      ↓
// Horoscope Content Service
//      ↓
// MongoDB Horoscope CMS
//
// LOCKED:
//
// ✅ CMS ONLY
// ✅ No Engine
// ✅ No Calculation
// ✅ No AI
//////////////////////////////////////////////////////////////


import {
  astroSuccess,
  astroError,
} from "@/lib/astro/api/response";


import {
  getHoroscopeArchiveDates,
} from "@/lib/services/horoscopeContentService";



export const runtime = "nodejs";

export const dynamic = "force-dynamic";





//////////////////////////////////////////////////////////////
// GET ARCHIVE DATES
//
// Supports:
//
// /api/astro/horoscope/archive?zodiac=aries
//
//////////////////////////////////////////////////////////////


export async function GET(
  req:Request
){


try{


const { searchParams } = new URL(req.url);



const zodiac =

searchParams.get("zodiac");



const period =

searchParams.get("period")

||

"daily";



const language =

searchParams.get("language")

||

"english";





if(!zodiac){


return astroError(

"ZODIAC_REQUIRED",

"Zodiac sign is required",

400

);


}






const archives =

await getHoroscopeArchiveDates(

zodiac,

period as any,

language as any

);







return astroSuccess(

{


zodiac,

period,

language,


archives,


count:

archives.length,


},


{


source:

"horoscope-archive",


version:

"1.0",


}


);





}

catch(error){



console.error(

"[HOROSCOPE_ARCHIVE_API_ERROR]",

error

);




return astroError(

"HOROSCOPE_ARCHIVE_FAILED",

"Unable to load horoscope archive",

500,

error instanceof Error

?

error.message

:

"Unknown error"

);


}



}
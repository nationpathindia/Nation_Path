import { NextRequest } from "next/server";
import { unstable_cache } from "next/cache";

import {
  getPanchang,
} from "@/lib/astro/calculations/panchang";

import {
  calculateAllMuhurtas,
} from "@/lib/astro/calculations/muhurta";

import type {
  RiseSetRequest,
} from "@/lib/astro/calculations/riseSet";

import {
  astroSuccess,
  astroError,
} from "@/lib/astro/api/response";

import {
  ASTRO_API_ERRORS,
} from "@/lib/astro/api/errors";

import {
  validateDate,
} from "@/lib/astro/api/validation";





//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO
//
// HOMEPAGE ASTRO INTELLIGENCE API
//
// PURPOSE:
//
// Single homepage request:
//
// Panchang Intelligence
// +
// Muhurta Intelligence
//
// OPTIMIZATION:
//
// Server cached calculation layer
//
// LOCKED:
//
// Calculation engines untouched
// Swiss Ephemeris untouched
//
//////////////////////////////////////////////////////////////





const DEFAULT_LOCATION = {

  city:"New Delhi",

  country:"India",

  latitude:28.6139,

  longitude:77.2090,

  altitude:0,

};






//////////////////////////////////////////////////////////////
//
// INDIA DATE
//
//////////////////////////////////////////////////////////////


function getIndiaDate(){


return new Intl.DateTimeFormat(

"en-CA",

{

timeZone:"Asia/Kolkata",

year:"numeric",

month:"2-digit",

day:"2-digit",

}

).format(

new Date()

);


}








//////////////////////////////////////////////////////////////
//
// LOCATION RESOLVER
//
//////////////////////////////////////////////////////////////


function resolveLocation(

request:NextRequest

){


const {

searchParams

}

=

new URL(request.url);





const latitude =

searchParams.get("latitude");



const longitude =

searchParams.get("longitude");





if(

latitude && longitude

){


return {


city:"Custom",

country:"",

latitude:Number(latitude),

longitude:Number(longitude),

altitude:Number(

searchParams.get("altitude") || 0

),


};


}





const ipLatitude =

request.headers.get(

"x-vercel-ip-latitude"

);



const ipLongitude =

request.headers.get(

"x-vercel-ip-longitude"

);



const ipCity =

request.headers.get(

"x-vercel-ip-city"

);



const ipCountry =

request.headers.get(

"x-vercel-ip-country"

);





if(

ipLatitude && ipLongitude

){


return {


city:

ipCity || "Unknown",


country:

ipCountry || "India",


latitude:

Number(ipLatitude),


longitude:

Number(ipLongitude),


altitude:0,


};


}





return DEFAULT_LOCATION;


}









//////////////////////////////////////////////////////////////
//
// CACHED ASTRO CALCULATION LAYER
//
// Only aggregation layer cached
//
// Engines remain untouched
//
//////////////////////////////////////////////////////////////


const getCachedHomeAstro =

unstable_cache(


async (

date:Date,

latitude:number,

longitude:number,

altitude:number

)=>{

console.log(
"🔥 CALCULATING HOME ASTRO",
{
 date,
 latitude,
 longitude
}
);



const panchang =

getPanchang(


date,


{

latitude,

longitude,

timezone:"Asia/Kolkata",

}


);







const riseSetRequest: RiseSetRequest = {


date,


latitude,


longitude,


altitude,


};






const muhurta =

calculateAllMuhurtas(

riseSetRequest

);





return {


panchang,


muhurta,


};


},



[

"nationpath-home-astro"

],



{

revalidate:3600

}


);










//////////////////////////////////////////////////////////////
//
// GET
//
//////////////////////////////////////////////////////////////


export async function GET(

request:NextRequest

){


try{



const {

searchParams

}

=

new URL(request.url);






const dateParam =

searchParams.get("date");






const requestedDate =

dateParam ||

getIndiaDate();






const date =

validateDate(

requestedDate

);





if(!date){


return astroError(


ASTRO_API_ERRORS.INVALID_DATE.code,


ASTRO_API_ERRORS.INVALID_DATE.message,


400


);


}







const location =

resolveLocation(

request

);









const {

panchang,

muhurta

}

=

await getCachedHomeAstro(


date,


location.latitude,


location.longitude,


location.altitude


);









return astroSuccess(



{


panchang,


muhurta:{


location,


data:muhurta


}


},





{


requestedDate,


timezone:"Asia/Kolkata",


engine:

"NationPath Astro Homepage Intelligence",



source:

location.city === "Custom"

?

"query"

:

"ip-or-default"



}



);



}

catch(error){



console.error(

"Homepage Astro API Error:",


error instanceof Error

?

error.message

:

error


);





return astroError(


ASTRO_API_ERRORS.INTERNAL_ERROR.code,


ASTRO_API_ERRORS.INTERNAL_ERROR.message,


500


);


}



}
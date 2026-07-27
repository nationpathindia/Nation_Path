import { NextRequest } from "next/server";

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
// NATIONPATH ASTRO
//
// MUHURTA API
//
// DATE:
// Asia/Kolkata timezone
//
// LOCKED:
// Calculation logic untouched
//
//////////////////////////////////////////////////////////////




/*
=========================================================
DEFAULT LOCATION FALLBACK
=========================================================
*/

const DEFAULT_LOCATION = {

  city:"New Delhi",

  country:"India",

  latitude:28.6139,

  longitude:77.2090,

  altitude:0,

};





/*
=========================================================
INDIA DATE RESOLVER
=========================================================
*/

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





/*
=========================================================
LOCATION RESOLVER
Priority:

1. Query Params
2. Vercel Headers
3. Default India Location

=========================================================
*/


function resolveLocation(
  request: NextRequest
){


const {
 searchParams,
} =
new URL(request.url);





const queryLatitude =
searchParams.get("latitude");


const queryLongitude =
searchParams.get("longitude");





if(
 queryLatitude &&
 queryLongitude
){

return {


city:"Custom",

country:"",


latitude:
 Number(queryLatitude),


longitude:
 Number(queryLongitude),


altitude:
 Number(
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
 ipLatitude &&
 ipLongitude
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






export async function GET(
 request: NextRequest
){


try{



const {
 searchParams
}
=
new URL(request.url);





const dateParam =
searchParams.get("date");





//////////////////////////////////////////////////////////
// INDIA DATE INPUT
//////////////////////////////////////////////////////////

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






const riseSetRequest: RiseSetRequest = {


date,


latitude:
 location.latitude,


longitude:
 location.longitude,


altitude:
 location.altitude,


};






//////////////////////////////////////////////////////////
// MUHURTA CALCULATION
//
// NO ENGINE CHANGE
//////////////////////////////////////////////////////////

const data =
calculateAllMuhurtas(
 riseSetRequest
);







return astroSuccess(

{

location,

muhurta:data,

},

{


requestedDate,

timezone:
 "Asia/Kolkata",


source:
 location.city === "Custom"
  ? "query"
  : "ip-or-default",


}

);





}
catch(error){



console.error(

"Muhurta API Error:",

error instanceof Error
 ? error.message
 : error

);





return astroError(

 ASTRO_API_ERRORS.INTERNAL_ERROR.code,

 ASTRO_API_ERRORS.INTERNAL_ERROR.message,

 500,

 error instanceof Error
  ? error.message
  : undefined

);


}


}
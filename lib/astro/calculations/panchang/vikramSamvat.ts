//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO
//
// VIKRAM SAMVAT ENGINE
//
// Hindu Lunisolar Era Layer
//
// Production Calendar Layer
//
// Supports:
// - Vikram Samvat
// - India
// - Nepal
// - Amanta
// - Purnimanta
// - Adhik Maas
//
// IMPORTANT:
// No Tithi Calculation
// No Hindu Date Calculation
// Consumes hinduDate.ts output
//
// PURE CALENDAR FORMATTER
//
//////////////////////////////////////////////////////////////



import {
  type LunarSystem,
} from "./hindu/lunarMonthResolver";


import {
  type HinduDateResult,
} from "./hindu/hinduDate";









//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////


export interface VikramSamvatOptions {


  region?:
  | "India"
  | "Nepal";



  monthSystem?:
  LunarSystem;



  adhikMaas?:
  boolean;



  monthDisplayName?:
  string;



}









export interface VikramSamvatResult {


  year:number;


  month:string;


  baseMonth:string;


  monthIndex:number;



  hinduDate:HinduDateResult;



  paksha:string;


  tithi:string;


  tithiIndex:number;



  adhikMaas:{


    active:boolean;


    name:string|null;


  };



  calendarSystem:{


    name:string;


    type:string;


    scope:string;


    region:string;


  };



  monthSystem:{


    type:string;


    calculation:string;


  };



  era:{


    name:string;


    offset:number;


  };


}









//////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////


const VIKRAM_OFFSET = 57;


const DEFAULT_MONTH_SYSTEM:
LunarSystem =
"Amanta";









//////////////////////////////////////////////////////////////
// YEAR CALCULATION
//////////////////////////////////////////////////////////////


function calculateVikramYear(

date:Date

){


const year =

date.getUTCFullYear();



const month =

date.getUTCMonth();



return (

month < 3

?

year + 56

:

year + 57

);


}









//////////////////////////////////////////////////////////////
// REGION
//////////////////////////////////////////////////////////////


function resolveRegion(

region?:
"India"
|
"Nepal"

){


return region ?? "India";


}









//////////////////////////////////////////////////////////////
// MAIN ENGINE
//////////////////////////////////////////////////////////////


export function getVikramSamvat(


date:Date,


month:string,


paksha:string,


tithi:string,


tithiIndex:number,


monthIndex:number,


hinduDate:HinduDateResult,


options?:VikramSamvatOptions


):VikramSamvatResult {



const config = {


region:

resolveRegion(

options?.region

),



monthSystem:

options?.monthSystem

??

DEFAULT_MONTH_SYSTEM,



adhikMaas:

options?.adhikMaas

??

false,



monthDisplayName:

options?.monthDisplayName

??

month



};









return {


year:

calculateVikramYear(

date

),



month:

config.monthDisplayName,



baseMonth:

month,



monthIndex,





//
// SAME SOURCE
// No duplicate calculation
//

hinduDate,





paksha,



tithi,



tithiIndex,







adhikMaas:{


active:

config.adhikMaas,



name:

config.adhikMaas

?

"Adhik Maas"

:

null


},







calendarSystem:{


name:

"Vikram Samvat",



type:

"Lunisolar",



scope:

"Regional",



region:

config.region


},







monthSystem:{


type:

"Lunar",



calculation:

"Solar-Lunar"


},







era:{


name:

"Vikram Era",



offset:

VIKRAM_OFFSET


}



};


}









//////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////


export function getVikramEra(){


return {


name:

"Vikram Samvat",


offset:

VIKRAM_OFFSET


};


}







export function getSupportedRegions(){


return [


"India",


"Nepal"


];


}







export function getVikramMonthSystem(){


return [


"Amanta",


"Purnimanta"


];


}







export function getFutureEraSupport(){


return {


available:[


"Vikram Samvat",


"Shaka Samvat"


],


current:

"Vikram Samvat"


};


}
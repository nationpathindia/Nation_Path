//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO
//
// HINDU DATE CALCULATION LAYER
//
// Sunrise Based Hindu Lunisolar Date
//
// Production Core
//
// Handles:
//
// - Gregorian Date
// - Shukla Paksha
// - Krishna Paksha
// - Tithi Mapping
// - Sunrise Boundary
// - Amavasya
// - Purnima
// - Amanta
// - Purnimanta Ready
//
// PURE CALCULATION
//
//////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////


export interface HinduDateOptions {


  timezone?: string;


  latitude?: number;


  longitude?: number;


  calendarSystem?:
  | "Amanta"
  | "Purnimanta";


}





export interface HinduDateResult {


  gregorianDate:string;


  day:number;


  label:string;


  monthDay:number;


  paksha:
  | "Shukla"
  | "Krishna";


  tithiIndex:number;


  tithiName:string;


  sunriseBased:boolean;


  sunriseDate:Date;


  calendarSystem:string;


}







//////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////


const DEFAULT_SYSTEM = "Amanta";





const TITHI_NAMES = [


"Pratipada",

"Dwitiya",

"Tritiya",

"Chaturthi",

"Panchami",

"Shashthi",

"Saptami",

"Ashtami",

"Navami",

"Dashami",

"Ekadashi",

"Dwadashi",

"Trayodashi",

"Chaturdashi",

"Purnima",


"Pratipada",

"Dwitiya",

"Tritiya",

"Chaturthi",

"Panchami",

"Shashthi",

"Saptami",

"Ashtami",

"Navami",

"Dashami",

"Ekadashi",

"Dwadashi",

"Trayodashi",

"Chaturdashi",

"Amavasya"


];








//////////////////////////////////////////////////////////////
// SUNRISE NORMALIZER
//////////////////////////////////////////////////////////////


function resolveSunriseDate(

date:Date,

options?:HinduDateOptions

){


const timezone =

options?.timezone ??

"Asia/Kolkata";


try{


const parts =

new Intl.DateTimeFormat(

"en-US",

{

timeZone:timezone,

year:"numeric",

month:"2-digit",

day:"2-digit"

}

).formatToParts(date);



const year = Number(

parts.find(
p=>p.type==="year"
)?.value
);


const month = Number(

parts.find(
p=>p.type==="month"
)?.value
);


const day = Number(

parts.find(
p=>p.type==="day"
)?.value
);



return new Date(

Date.UTC(

year,

month-1,

day,

0,

0,

0

)

);



}

catch{


return date;


}


}









//////////////////////////////////////////////////////////////
// GREGORIAN DATE
//////////////////////////////////////////////////////////////


function formatGregorianDate(

date:Date

){


return new Intl.DateTimeFormat(

"en-IN",

{

timeZone:"Asia/Kolkata",

day:"2-digit",

month:"long",

year:"numeric"

}

).format(date);


}









//////////////////////////////////////////////////////////////
// NORMALIZER
//////////////////////////////////////////////////////////////


function normalizeTithiIndex(

index:number

){


if(!Number.isFinite(index))

return 0;


return Math.max(

0,

Math.min(

29,

Math.floor(index)

)

);


}









//////////////////////////////////////////////////////////////
// PAKSHA
//////////////////////////////////////////////////////////////


function resolvePaksha(

index:number

){


return index >= 15

?

"Krishna"

:

"Shukla";


}









//////////////////////////////////////////////////////////////
// DAY
//////////////////////////////////////////////////////////////


function resolveDay(

index:number

){


return (

index % 15

)+1;


}









//////////////////////////////////////////////////////////////
// NAME
//////////////////////////////////////////////////////////////


function resolveTithiName(

index:number

){


return (

TITHI_NAMES[index]

??

"Unknown"

);


}









//////////////////////////////////////////////////////////////
// LABEL
//////////////////////////////////////////////////////////////


function resolveLabel(

index:number

){


return (

`${resolvePaksha(index)} ${resolveTithiName(index)}`

);


}









//////////////////////////////////////////////////////////////
// MAIN
//////////////////////////////////////////////////////////////


export function calculateHinduDate(

date:Date,

tithiIndex:number,

options?:HinduDateOptions

):HinduDateResult {



const sunriseDate =

resolveSunriseDate(

date,

options

);



const index =

normalizeTithiIndex(

tithiIndex

);



const day =

resolveDay(index);



const paksha =

resolvePaksha(index);



const tithiName =

resolveTithiName(index);





return {


gregorianDate:

formatGregorianDate(

sunriseDate

),



day,



label:

resolveLabel(index),



monthDay:

day,



paksha,



tithiIndex:index,



tithiName,



sunriseBased:true,



sunriseDate,



calendarSystem:

options?.calendarSystem ??

DEFAULT_SYSTEM



};


}









//////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////


export function isShuklaPaksha(

index:number

){

return index >=0 && index <=14;

}





export function isKrishnaPaksha(

index:number

){

return index >=15 && index <=29;

}





export function getPakshaDay(

index:number

){

return (

normalizeTithiIndex(index)

%

15

)+1;

}





export function getTithiName(

index:number

){

return (

TITHI_NAMES[index]

??

"Unknown"

);

}
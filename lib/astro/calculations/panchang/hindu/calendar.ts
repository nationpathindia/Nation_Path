//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO
//
// HINDU CALENDAR MASTER ENGINE
//
// Hindu Lunisolar Calendar Layer
//
// Production Core
//
// Handles:
//
// - Vikram Samvat
// - Amanta
// - Purnimanta Ready
// - India
// - Nepal
// - Lunar Month
// - Adhik Maas
// - Sankranti
// - Sunrise Based Date
// - Gregorian Date
//
// NO UI
// NO API
// PURE CALCULATION
//
//////////////////////////////////////////////////////////////



import {

 calculateHinduDate,

} from "./hinduDate";



import {

 resolveLunarMonth,

 type LunarSystem,

} from "./lunarMonthResolver";



import {

 calculateSankranti,

} from "./sankranti";









//////////////////////////////////////////////////////////////
// OPTIONS
//////////////////////////////////////////////////////////////


export interface HinduCalendarOptions {


 system?:
 LunarSystem;



 region?:
 | "India"
 | "Nepal";



 timezone?:string;



 latitude?:number;



 longitude?:number;



 previousSunLongitude?:number;



 nextSunLongitude?:number;


}









//////////////////////////////////////////////////////////////
// RESULT
//////////////////////////////////////////////////////////////


export interface HinduCalendarResult {


 date:Date;


 region:string;



 hinduDate:{


  gregorianDate:string;


  day:number;


  monthDay:number;

  label:string;


   paksha:
 "Shukla"
 |
 "Krishna";


  tithiIndex:number;


  tithiName:string;


  sunriseBased:boolean;


  sunriseDate:Date;


  calendarSystem:string;


 };



 month:{


  index:number;


  name:string;


  number:number;


  system:LunarSystem;


  adhikMaas:boolean;


 };



 sankranti:{


  rashi:string;


  entered:boolean;


 };



 adhikMaas:{


  active:boolean;


  name:string|null;


  reason:string;


 };



 calendarSystem:{


  name:string;


  type:string;


  region:string;


 };


}









//////////////////////////////////////////////////////////////
// DEFAULT
//////////////////////////////////////////////////////////////


const DEFAULT_OPTIONS:HinduCalendarOptions = {


 system:"Amanta",


 region:"India",


 timezone:"Asia/Kolkata",


 latitude:20.5937,


 longitude:78.9629,


};









//////////////////////////////////////////////////////////////
// MAIN ENGINE
//////////////////////////////////////////////////////////////


export function calculateHinduCalendar(


 date:Date,


 sunLongitude:number,


 moonLongitude:number,


 tithiIndex:number,


 options?:HinduCalendarOptions


):HinduCalendarResult {



const config = {


 ...DEFAULT_OPTIONS,


 ...options,


};









//
// Hindu Date
//


const hinduDate =

calculateHinduDate(


 date,


 tithiIndex,


 {


 timezone:

 config.timezone,


 latitude:

 config.latitude,


 longitude:

 config.longitude,


 calendarSystem:

 config.system,


 }


);









//
// Lunar Month
//


const lunarMonth =

resolveLunarMonth(


 date,


 config.system


);









//
// Sankranti
//


const sankranti =

calculateSankranti(


 sunLongitude,


 config.previousSunLongitude


);









//
// Adhik Maas
//


const adhikMaas = {


 active:

 lunarMonth.adhikMaas,



 name:

 lunarMonth.adhikMaas

 ?

 "Adhik Maas"

 :

 null,



 reason:

 lunarMonth.adhikMaas

 ?

 "No Sankranti between Amavasya boundaries"

 :

 "Normal Lunar Month"


};









//////////////////////////////////////////////////////////////
// FINAL RESULT
//////////////////////////////////////////////////////////////


return {



 date,



 region:

 config.region,








hinduDate:{



 gregorianDate:

 hinduDate.gregorianDate,



 day:

 hinduDate.day,


  monthDay:

 hinduDate.day,


 label:

 hinduDate.label,



 paksha:

 hinduDate.paksha,



 tithiIndex:

 hinduDate.tithiIndex,



 tithiName:

 hinduDate.tithiName,



 sunriseBased:

 hinduDate.sunriseBased,



 sunriseDate:

 hinduDate.sunriseDate,



 calendarSystem:

 hinduDate.calendarSystem,


},









month:{



 index:

 lunarMonth.index,



 name:

 lunarMonth.name,



 number:

 lunarMonth.number,



 system:

 lunarMonth.system,



 adhikMaas:

 adhikMaas.active,


},









sankranti:{



 rashi:

 sankranti.rashiName,



 entered:

 sankranti.entered,


},









adhikMaas:{



 active:

 adhikMaas.active,



 name:

 adhikMaas.name,



 reason:

 adhikMaas.reason,


},









calendarSystem:{



 name:

 "Vikram Samvat",



 type:

 "Lunisolar",



 region:

 config.region,


},



};



}









//////////////////////////////////////////////////////////////
// CALENDAR INFO
//////////////////////////////////////////////////////////////


export function getCalendarSystem(


region:
"India"
|
"Nepal"

=

"India"


){


return {


 name:

 "Vikram Samvat",



 type:

 "Lunisolar",



 region,



 monthSystem:[


 "Amanta",


 "Purnimanta"


 ],


};


}









//////////////////////////////////////////////////////////////
// REGION PRESETS
//////////////////////////////////////////////////////////////


export function getIndiaCalendar(){


return {


 system:"Amanta",


 region:"India",


 timezone:"Asia/Kolkata",


 latitude:20.5937,


 longitude:78.9629,


};


}








export function getNepalCalendar(){


return {


 system:"Amanta",


 region:"Nepal",


 timezone:"Asia/Kathmandu",


 latitude:28.3949,


 longitude:84.1240,


};


}
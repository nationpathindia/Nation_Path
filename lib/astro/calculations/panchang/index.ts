//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO
//
// PANCHANG MASTER ENGINE
//
// Sunrise Based Hindu Panchang Intelligence Layer
//
// Production Calculation Core
//
// Includes:
//
// - Vara
// - Paksha
// - Tithi
// - Nakshatra
// - Yoga
// - Karana
// - Moon Phase
// - Hindu Calendar
// - Vikram Samvat
//
// Calculation Flow:
//
// Date
//  ↓
// Sunrise
//  ↓
// Planet Positions
//  ↓
// Tithi/Paksha
//  ↓
// Hindu Calendar
//  ↓
// Vikram Samvat
//
// NO UI
// NO API
// PURE CALCULATION
//
//////////////////////////////////////////////////////////////



import {
  normalizeDegrees,
} from "../astronomy";


import {
  getSunLongitude,
} from "../sun";


import {
  getMoonLongitude,
} from "../moon";


import {
  getSunRashi,
  getMoonRashi,
} from "../rashi";


import {
  getMoonPhase,
} from "../moonPhase";

import {
  calculateSunrise,
} from "../sunrise";


import {
  calculateSunset,
} from "../sunset";

import {
  getTithi,
} from "./tithi";


import {
  getNakshatra,
} from "./nakshatra";


import {
  getYoga,
} from "./yoga";


import {
  getKarana,
} from "./karana";


import {
  getTithiTiming,
} from "./tithiTiming";


import {
  getNakshatraTiming,
} from "./nakshatraTiming";


import {
  getYogaTiming,
} from "./yogaTiming";


import {
  getKaranaTiming,
} from "./karanaTiming";


import {
  getPaksha,
} from "./paksha";

import {
  getVikramSamvat as calculateVikramSamvat,
} from "./vikramSamvat";


import {
  calculateHinduCalendar,
} from "./hindu/calendar";


import {
  type LunarMonthSystem,
} from "./hindu/lunarMonth";


import {
  VARAS,
} from "./constants";






//////////////////////////////////////////////////////////////
// CONFIG
//////////////////////////////////////////////////////////////


export interface PanchangOptions {


  region?:
  | "India"
  | "Nepal";



  timezone?:string;



  latitude?:number;



  longitude?:number;



  altitude?:number;



  monthSystem?:
  LunarMonthSystem;



}



const DEFAULT_CONFIG:PanchangOptions = {


  region:"India",


  timezone:"Asia/Kolkata",


  // India center fallback

  latitude:20.5937,


  longitude:78.9629,


  altitude:0,


  monthSystem:"Amanta"

};







//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////


export interface VaraInfo {


 index:number;


 name:string;


}




export interface PanchangLocation {


 region:string;


 timezone:string;


 latitude:number;


 longitude:number;


}







export interface Panchang {


 timestamp:Date;


 location:PanchangLocation;


 sunrise:Date;


   sunset:Date;

 vara:VaraInfo;


 paksha:ReturnType<typeof getPaksha>;


 moonPhase:ReturnType<typeof getMoonPhase>;


 tithi:ReturnType<typeof getTithi>;


 tithiTiming:ReturnType<typeof getTithiTiming>;


 nakshatra:ReturnType<typeof getNakshatra>;


 nakshatraTiming:ReturnType<typeof getNakshatraTiming>;


 yoga:ReturnType<typeof getYoga>;


 yogaTiming:ReturnType<typeof getYogaTiming>;


 karana:ReturnType<typeof getKarana>;


 karanaTiming:ReturnType<typeof getKaranaTiming>;


 sunRashi:ReturnType<typeof getSunRashi>;


 moonRashi:ReturnType<typeof getMoonRashi>;


 sunLongitude:number;


 moonLongitude:number;


 hinduCalendar:ReturnType<typeof calculateHinduCalendar>;


vikramSamvat:ReturnType<typeof calculateVikramSamvat>;


 meta:{
  engine:string;
  version:string;
  calculation:string;
 };


}









//////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////


export * from "./constants";

export * from "./tithi";

export * from "./yoga";

export * from "./karana";


export {

 getPaksha,

 isKrishnaPaksha,

 isShuklaPaksha,

 type PakshaInfo,

} from "./paksha";


export * from "./tithiTiming";

export * from "./nakshatraTiming";

export * from "./yogaTiming";

export * from "./karanaTiming";

export * from "./vikramSamvat";

export * from "./hindu/calendar";

export * from "../moonMotion";

export * from "../rashi";

export * from "../moonPhase";








//////////////////////////////////////////////////////////////
// VARA
//////////////////////////////////////////////////////////////


export function getVara(
 date:Date
):VaraInfo {


 const index =
 date.getDay();


 return {


 index,


 name:
 VARAS[index] ?? "Unknown"


 };


}









//////////////////////////////////////////////////////////////
// LOCATION
//////////////////////////////////////////////////////////////


function resolveLocation(
config:PanchangOptions
):PanchangLocation {


return {


region:
config.region ?? "India",


timezone:
config.timezone ?? "Asia/Kolkata",


latitude:
config.latitude ?? DEFAULT_CONFIG.latitude!,


longitude:
config.longitude ?? DEFAULT_CONFIG.longitude!


};


}









//////////////////////////////////////////////////////////////
// SUNRISE RESOLVER
//////////////////////////////////////////////////////////////

function resolveSunrise(
date:Date,
location:PanchangLocation
):Date {


const result =

calculateSunrise({


date,


latitude:
location.latitude,


longitude:
location.longitude,


altitude:0


});


return result.date;


}



//////////////////////////////////////////////////////////////
// SUNSET RESOLVER
//////////////////////////////////////////////////////////////

function resolveSunset(
date:Date,
location:PanchangLocation
):Date {


const result =

calculateSunset({

date,

latitude:
location.latitude,

longitude:
location.longitude,

});


return result.date;


}



//////////////////////////////////////////////////////////////
// PLANET POSITIONS
//////////////////////////////////////////////////////////////


function calculatePositions(
date:Date
){


return {


sunLongitude:

normalizeDegrees(
getSunLongitude(date)
),



moonLongitude:

normalizeDegrees(
getMoonLongitude(date)
)


};


}









//////////////////////////////////////////////////////////////
// BASIC PANCHANG
//////////////////////////////////////////////////////////////


function calculateBasic(
date:Date
){


return {


paksha:
getPaksha(date),



tithi:
getTithi(date),



moonPhase:
getMoonPhase(date),



tithiTiming:
getTithiTiming(date),



nakshatra:
getNakshatra(date),



nakshatraTiming:
getNakshatraTiming(date),



yoga:
getYoga(date),



yogaTiming:
getYogaTiming(date),



karana:
getKarana(date),



karanaTiming:
getKaranaTiming(date),



sunRashi:
getSunRashi(date),



moonRashi:
getMoonRashi(date)



};


}









//////////////////////////////////////////////////////////////
// MAIN ENGINE
//////////////////////////////////////////////////////////////


export function getPanchang(

date:Date,

options?:PanchangOptions

):Panchang {



const config = {


...DEFAULT_CONFIG,


...options


};




const location =
resolveLocation(config);




// IMPORTANT:
// Panchang day starts after sunrise

const sunrise =
resolveSunrise(
date,
location
);

const sunset =
resolveSunset(
date,
location
);


const calculationDate =
sunrise;




const planets =
calculatePositions(
calculationDate
);




const basic =
calculateBasic(
calculationDate
);







const hinduCalendar =

calculateHinduCalendar(


calculationDate,


planets.sunLongitude,


planets.moonLongitude,


basic.tithi.index,


{


system:
config.monthSystem,


region:
config.region,


timezone:
config.timezone,


latitude:
location.latitude,


longitude:
location.longitude



}



);



const vikramSamvat =

calculateVikramSamvat(


calculationDate,


hinduCalendar.month.name,


basic.paksha.name,


basic.tithi.name,


basic.tithi.index,


hinduCalendar.month.index,


hinduCalendar.hinduDate,


{


region:
config.region,


monthSystem:
config.monthSystem,


adhikMaas:
hinduCalendar.adhikMaas.active


}



);





return {


timestamp:date,


location,


sunrise,

sunset,

vara:
getVara(calculationDate),



paksha:
basic.paksha,



moonPhase:
basic.moonPhase,



tithi:
basic.tithi,



tithiTiming:
basic.tithiTiming,



nakshatra:
basic.nakshatra,



nakshatraTiming:
basic.nakshatraTiming,



yoga:
basic.yoga,



yogaTiming:
basic.yogaTiming,



karana:
basic.karana,



karanaTiming:
basic.karanaTiming,



sunRashi:
basic.sunRashi,



moonRashi:
basic.moonRashi,



sunLongitude:
planets.sunLongitude,



moonLongitude:
planets.moonLongitude,



hinduCalendar,



vikramSamvat,



meta:{


engine:
"NationPath Astro Panchang Engine",


version:
"2.0",


calculation:
"Swiss Ephemeris Sunrise Based Solar Lunar Calculation"


}



};


}
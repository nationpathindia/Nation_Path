//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO
//
// HINDU CALENDAR
//
// LUNAR MONTH RESOLVER ENGINE
//
// Production Hindu Lunisolar Month Layer
//
// Handles:
//
// - Amanta Month
// - Purnimanta Month
// - Amavasya Boundary
// - Sankranti Detection
// - Adhik Maas Detection
//
// PURE CALCULATION
//
//////////////////////////////////////////////////////////////


import {
  findPreviousAmavasya,
  findNextAmavasya,
} from "./amavasyaFinder";


import {
  normalizeDegrees,
} from "../../astronomy";






//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////


export type LunarSystem =
  | "Amanta"
  | "Purnimanta";




export interface ResolvedLunarMonth {

  name:string;

  index:number;

  number:number;

  system:LunarSystem;

  adhikMaas:boolean;

  amavasyaDate:Date;

  solarRashi:number;

  solarLongitude:number;

}






//////////////////////////////////////////////////////////////
// MONTHS
//////////////////////////////////////////////////////////////


const MONTHS = [

  "Chaitra",

  "Vaishakha",

  "Jyeshtha",

  "Ashadha",

  "Shravana",

  "Bhadrapada",

  "Ashwin",

  "Kartika",

  "Margashirsha",

  "Pausha",

  "Magha",

  "Phalguna"

];








//////////////////////////////////////////////////////////////
// SOLAR RASHI
//////////////////////////////////////////////////////////////


function getSolarRashi(
  longitude:number
){

  return Math.floor(

    normalizeDegrees(longitude)

    /

    30

  );

}







//////////////////////////////////////////////////////////////
// MONTH FROM SOLAR INGRESS
//
// Mesha ingress after Chaitra Amavasya
// Vrishabha after Vaishakha
// Mithuna after Jyeshtha
// Karka after Ashadha
// Simha after Shravana
//
// Lunar month is decided by
// Sankranti occurring between
// Amavasya boundaries
//
//////////////////////////////////////////////////////////////


function resolveMonthFromIngress(
  solarRashi:number
){

  switch(solarRashi){


    case 0:
      return 0;


    case 1:
      return 1;


    case 2:
      return 2;


    case 3:
      return 3;


    case 4:
      return 4;


    case 5:
      return 5;


    case 6:
      return 6;


    case 7:
      return 7;


    case 8:
      return 8;


    case 9:
      return 9;


    case 10:
      return 10;


    case 11:
      return 11;


    default:

      return 0;

  }

}









//////////////////////////////////////////////////////////////
// SANKRANTI DETECTION
//
// Checks whether Sun crossed
// a zodiac boundary between
// two Amavasya points
//
//////////////////////////////////////////////////////////////


function getCrossedRashi(

  previousSun:number,

  nextSun:number

){

  const previous =

    normalizeDegrees(previousSun);



  const next =

    normalizeDegrees(nextSun);



  const previousRashi =

    getSolarRashi(previous);



  const nextRashi =

    getSolarRashi(next);





  if(
    previousRashi !== nextRashi
  ){

    return nextRashi;

  }




  return null;

}









//////////////////////////////////////////////////////////////
// ADHIK MAAS DETECTOR
//
// Rule:
//
// No Sankranti between
// two Amavasya boundaries
//
// => Adhik Maas
//
//////////////////////////////////////////////////////////////


function detectAdhikMaas(

  previousAmavasya:any,

  nextAmavasya:any

){


  const previousSun =

    normalizeDegrees(
      previousAmavasya.sunLongitude
    );



  const nextSun =

    normalizeDegrees(
      nextAmavasya.sunLongitude
    );



  const crossed =

    getCrossedRashi(
      previousSun,
      nextSun
    );



  const active =

    crossed === null;



  return {


    active,


    name:

      active

      ?

      "Adhik Maas"

      :

      null,


    reason:

      active

      ?

      "No Sankranti between Amavasya boundaries"

      :

      "Sankranti occurred between Amavasya boundaries"


  };

}









//////////////////////////////////////////////////////////////
// MAIN RESOLVER
//////////////////////////////////////////////////////////////


export function resolveLunarMonth(

  date:Date,

  system:LunarSystem="Amanta"

):ResolvedLunarMonth {



  const previousAmavasya =

    findPreviousAmavasya(
      date
    );



  const nextAmavasya =

    findNextAmavasya(
      date
    );


console.log("LUNAR MONTH DEBUG", {

  date,

  previousAmavasya: {
    date: previousAmavasya.date,
    sunLongitude: previousAmavasya.sunLongitude,
    moonLongitude: previousAmavasya.moonLongitude,
  },

  nextAmavasya: {
    date: nextAmavasya.date,
    sunLongitude: nextAmavasya.sunLongitude,
    moonLongitude: nextAmavasya.moonLongitude,
  }

});



  const previousSun =

    normalizeDegrees(

      previousAmavasya.sunLongitude

    );



  const nextSun =

    normalizeDegrees(

      nextAmavasya.sunLongitude

    );







  //
  // Determine Sankranti
  //
  const ingressRashi =

    getCrossedRashi(

      previousSun,

      nextSun

    );







  let solarRashi:number;



  //
  // Normal month
  //
  // Month is based on
  // solar ingress occurring
  // during lunar cycle
  //
  if(
    ingressRashi !== null
  ){

    solarRashi =

      ingressRashi;

  }

  else{


    //
    // Adhik month fallback
    //
    solarRashi =

      getSolarRashi(
        previousSun
      );


  }








  let monthIndex =

    resolveMonthFromIngress(
      solarRashi
    );








  //
  // Purnimanta adjustment
  //
  if(

    system === "Purnimanta"

  ){

    monthIndex =

      (

        monthIndex + 1

      )

      %

      12;

  }








  const adhik =

    detectAdhikMaas(

      previousAmavasya,

      nextAmavasya

    );








  return {


    name:

      MONTHS[monthIndex]

      ??

      "Chaitra",



    index:

      monthIndex,



    number:

      monthIndex + 1,



    system,



    adhikMaas:

      adhik.active,



    amavasyaDate:

      previousAmavasya.date,



    solarRashi,



    solarLongitude:

      nextSun


  };

}









//////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////


export function getLunarMonthName(

  index:number

){

  return (

    MONTHS[index]

    ??

    "Chaitra"

  );

}







export function getLunarMonthIndex(

  name:string

){

  return MONTHS.indexOf(

    name

  );

}







export function getSupportedLunarSystems(){

  return [

    "Amanta",

    "Purnimanta"

  ];

}
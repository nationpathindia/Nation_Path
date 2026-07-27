//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// HINDU CALENDAR
//
// AMAVASYA CALCULATION LAYER
//
// Responsible for:
// - New Moon detection
// - Sun-Moon conjunction
// - Lunar month boundary check
// - Adhik Maas support ready
//
// PURE CALCULATION
//////////////////////////////////////////////////////////////


import {
  normalizeDegrees,
} from "../../astronomy";




//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////


export interface AmavasyaResult {


  isAmavasya:boolean;


  /**
   * Sun-Moon angular separation
   * 0 - 360 degree
   */
  distance:number;



  /**
   * Lunar phase angle
   */
  lunarPhase:number;



  /**
   * Exact conjunction state
   */
  conjunction:boolean;



  /**
   * Future boundary support
   */
  previousBoundary?:Date;


  nextBoundary?:Date;


}






//////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////


/**
 * Traditional Amavasya:
 *
 * Sun + Moon same longitude
 *
 * Due to calculation precision:
 * allow small tolerance
 */
const AMAVASYA_TOLERANCE = 12;








//////////////////////////////////////////////////////////////
// INTERNAL
//////////////////////////////////////////////////////////////


function getMoonSunDistance(

sunLongitude:number,

moonLongitude:number

){


return normalizeDegrees(

moonLongitude -
sunLongitude

);


}








//////////////////////////////////////////////////////////////
// AMAVASYA CHECK
//////////////////////////////////////////////////////////////


export function isAmavasya(


sunLongitude:number,


moonLongitude:number


):boolean {


const distance =

getMoonSunDistance(

sunLongitude,

moonLongitude

);



return (

distance <= AMAVASYA_TOLERANCE ||

distance >=

360 - AMAVASYA_TOLERANCE

);


}








//////////////////////////////////////////////////////////////
// MAIN CALCULATOR
//////////////////////////////////////////////////////////////


export function calculateAmavasya(


sunLongitude:number,


moonLongitude:number


):AmavasyaResult {


const distance =

getMoonSunDistance(

sunLongitude,

moonLongitude

);



const active =

isAmavasya(

sunLongitude,

moonLongitude

);




return {


isAmavasya:


active,



distance,



lunarPhase:


distance,



conjunction:


distance <= AMAVASYA_TOLERANCE

||
distance >=

360 - AMAVASYA_TOLERANCE



};


}









//////////////////////////////////////////////////////////////
// LUNAR MONTH BOUNDARY
//////////////////////////////////////////////////////////////


export function getLunarMonthBoundary(


sunLongitude:number,


moonLongitude:number


){



const result =

calculateAmavasya(

sunLongitude,

moonLongitude

);



return {


newMoon:

result.isAmavasya,



conjunction:

result.conjunction,



phase:

result.lunarPhase,



distance:

result.distance



};


}








//////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////


export function getAmavasyaDistance(


sunLongitude:number,


moonLongitude:number


){


return getMoonSunDistance(

sunLongitude,

moonLongitude

);


}




export function isNewMoon(

sunLongitude:number,


moonLongitude:number

){


return isAmavasya(

sunLongitude,

moonLongitude

);

}
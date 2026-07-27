//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// HINDU CALENDAR
//
// AMAVASYA FINDER ENGINE
//
// Production Lunar Boundary Engine
//
// Responsible for:
//
// - Previous Amavasya detection
// - Next Amavasya detection
// - Lunar month boundary search
// - High precision Sun-Moon separation
//
// Uses:
//
// - Sun Longitude
// - Moon Longitude
// - Synodic month cycle
//
// PURE CALCULATION
//////////////////////////////////////////////////////////////


import {
  normalizeDegrees,
} from "../../astronomy";


import {
  getSunLongitude,
} from "../../sun";


import {
  getMoonLongitude,
} from "../../moon";








//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////


export interface AmavasyaPoint {


  date:Date;


  sunLongitude:number;


  moonLongitude:number;


  difference:number;


}








//////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////


/**
 * Average synodic month
 */
const SYNODIC_MONTH_DAYS = 29.530588;



/**
 * Search window
 *
 * More than one lunar cycle
 * to safely detect boundary
 */
const SEARCH_DAYS = 35;









//////////////////////////////////////////////////////////////
// ANGULAR DIFFERENCE
//////////////////////////////////////////////////////////////


function getMoonSunDifference(

date:Date

){


const sun =

normalizeDegrees(

getSunLongitude(date)

);



const moon =

normalizeDegrees(

getMoonLongitude(date)

);



return normalizeDegrees(

moon - sun

);


}









//////////////////////////////////////////////////////////////
// DISTANCE NORMALIZER
//////////////////////////////////////////////////////////////


function getClosestDistance(

value:number

){


return Math.min(

value,

360 - value

);


}









//////////////////////////////////////////////////////////////
// PRECISE AMAVASYA SEARCH
//////////////////////////////////////////////////////////////


function searchAmavasya(


start:Date,


direction:
1
|
-1


):AmavasyaPoint {



let bestDate =

new Date(start);



let smallest =

360;



const current =

new Date(start);







//////////////////////////////////////////////////////////
// DAY SEARCH
//////////////////////////////////////////////////////////


for(
let i = 0;
i <= SEARCH_DAYS;
i++
){



const difference =

getClosestDistance(

getMoonSunDifference(

current

)

);





if(
difference < smallest
){


smallest = difference;


bestDate =

new Date(current);


}





current.setUTCDate(

current.getUTCDate()

+

direction

);


}









//////////////////////////////////////////////////////////
// HIGH PRECISION MINUTE REFINEMENT
//////////////////////////////////////////////////////////


let refined =

new Date(bestDate);



let refinedDistance =

smallest;





for(
let minute = -1440;
minute <= 1440;
minute += 10
){



const test =

new Date(bestDate);



test.setUTCMinutes(

test.getUTCMinutes()

+

minute

);





const distance =

getClosestDistance(

getMoonSunDifference(

test

)

);






if(
distance < refinedDistance
){


refinedDistance =

distance;


refined =

test;


}


}









//////////////////////////////////////////////////////////
// FINAL POINT
//////////////////////////////////////////////////////////


return {


date:

refined,



sunLongitude:

normalizeDegrees(

getSunLongitude(refined)

),



moonLongitude:

normalizeDegrees(

getMoonLongitude(refined)

),



difference:

refinedDistance



};


}









//////////////////////////////////////////////////////////////
// PREVIOUS AMAVASYA
//////////////////////////////////////////////////////////////


export function findPreviousAmavasya(

date:Date

):AmavasyaPoint {


return searchAmavasya(

date,

-1

);


}









//////////////////////////////////////////////////////////////
// NEXT AMAVASYA
//////////////////////////////////////////////////////////////


export function findNextAmavasya(

date:Date

):AmavasyaPoint {


return searchAmavasya(

date,

1

);


}









//////////////////////////////////////////////////////////////
// DISTANCE CHECK
//////////////////////////////////////////////////////////////


export function getAmavasyaDistance(

date:Date

){


return getClosestDistance(

getMoonSunDifference(

date

)

);


}









//////////////////////////////////////////////////////////////
// SYNODIC MONTH INFO
//////////////////////////////////////////////////////////////


export function getSynodicMonthLength(){


return SYNODIC_MONTH_DAYS;


}
//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// HINDU CALENDAR
//
// SANKRANTI CALCULATION LAYER
//
// Responsible for:
// - Solar month transition
// - Sun Rashi entry detection
// - Lunar calendar support
//
// NO UI
// NO API
// PURE CALCULATION
//////////////////////////////////////////////////////////////



import {
  normalizeDegrees,
} from "../../astronomy";



//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////


export interface SankrantiResult {


  rashiIndex:number;


  rashiName:string;


  longitude:number;


  entered:boolean;



}






//////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////


const RASHI_NAMES = [

"Mesha",

"Vrishabha",

"Mithuna",

"Karka",

"Simha",

"Kanya",

"Tula",

"Vrishchika",

"Dhanu",

"Makara",

"Kumbha",

"Meena"

];






//////////////////////////////////////////////////////////////
// RASHI INDEX
//////////////////////////////////////////////////////////////


function getRashiIndex(

longitude:number

){


const normalized =
normalizeDegrees(
longitude
);



return Math.floor(
normalized / 30
);



}







//////////////////////////////////////////////////////////////
// RASHI NAME
//////////////////////////////////////////////////////////////


function getRashiName(

index:number

){


return (

RASHI_NAMES[index]

||
"Unknown"

);


}







//////////////////////////////////////////////////////////////
// MAIN CALCULATOR
//////////////////////////////////////////////////////////////


export function calculateSankranti(



sunLongitude:number,



previousSunLongitude?:number



):SankrantiResult {



const longitude =
normalizeDegrees(
sunLongitude
);



const rashiIndex =
getRashiIndex(
longitude
);




let entered =
false;




if(
typeof previousSunLongitude === "number"
){


const previousIndex =
getRashiIndex(
previousSunLongitude
);



entered =
previousIndex !== rashiIndex;



}





return {



rashiIndex,



rashiName:
getRashiName(
rashiIndex
),



longitude,



entered



};



}







//////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////


export function getSolarMonthName(

longitude:number

){


const index =
getRashiIndex(
longitude
);


return getRashiName(index);


}
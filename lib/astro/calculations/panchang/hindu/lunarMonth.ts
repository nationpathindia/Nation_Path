//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// HINDU LUNAR MONTH ENGINE
//
// Vikram Samvat Support
//
// Supports:
// - Amanta
// - Purnimanta
// - India
// - Nepal
//
// Based on:
// - Solar longitude
// - Lunar longitude
// - New moon boundary ready
//
// PURE CALCULATION
//////////////////////////////////////////////////////////////


import {
  normalizeDegrees,
} from "../../astronomy";





//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////


export type LunarMonthSystem =
  | "Amanta"
  | "Purnimanta";





export interface LunarMonthInfo {


  name:string;


  index:number;


  system:LunarMonthSystem;


  adhikMaas:boolean;


  solarRashi:number;


  lunarRashi:number;


  monthNumber:number;



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
// INTERNAL HELPERS
//////////////////////////////////////////////////////////////


function getRashi(
 longitude:number
){


return Math.floor(

normalizeDegrees(
longitude
)
/30

);


}





//////////////////////////////////////////////////////////////
// LUNAR MONTH INDEX
//
// Amanta:
//
// Month starts after Amavasya.
//
// Solar sign difference gives
// approximate lunar month.
//
// Future:
// connect exact Amavasya finder.
//////////////////////////////////////////////////////////////


function calculateMonthIndex(


sunLongitude:number,


moonLongitude:number


){


const sunRashi =

getRashi(
sunLongitude
);



const moonRashi =

getRashi(
moonLongitude
);




let difference =

moonRashi -
sunRashi;




if(difference < 0){

difference += 12;

}





/*
Fallback protection

Moon-Sun relation can cross
boundary during transition.

*/

if(
difference === 0
){

return (

sunRashi + 1

)
%
12;


}



return (

sunRashi +
difference

)
%
12;



}








//////////////////////////////////////////////////////////////
// ADHIK MAAS HOOK
//
// Actual rule:
//
// No Sankranti between
// two Amavasya
//
// Future integration:
// sankranti.ts
//////////////////////////////////////////////////////////////


function detectAdhikMaas(

previousSolar:number,

currentSolar:number

){


const movement =

Math.abs(

currentSolar -
previousSolar

);



return movement < 30;

}









//////////////////////////////////////////////////////////////
// MAIN CALCULATION
//////////////////////////////////////////////////////////////


export function getLunarMonth(



sunLongitude:number,



moonLongitude:number,



system:LunarMonthSystem="Amanta"



):LunarMonthInfo {



const solarRashi =

getRashi(
sunLongitude
);




const lunarRashi =

getRashi(
moonLongitude
);





let monthIndex =


calculateMonthIndex(

sunLongitude,

moonLongitude

);






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






const adhikMaas =

detectAdhikMaas(

sunLongitude,

moonLongitude

);








return {


name:

MONTHS[monthIndex]
||
"Chaitra",




index:

monthIndex,




monthNumber:

monthIndex + 1,




system,




adhikMaas,




solarRashi,




lunarRashi



};



}









//////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////


export function getMonthName(
index:number
){


return (

MONTHS[index]

??

"Chaitra"

);


}







export function getMonthIndex(
name:string
){


return MONTHS.indexOf(
name
);


}

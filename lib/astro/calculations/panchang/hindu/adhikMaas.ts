//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// HINDU CALENDAR
//
// ADHIK MAAS CALCULATION LAYER
//
// Responsible for:
// - Extra lunar month detection
// - Solar transition validation
// - Vikram Samvat support
// - Amanta / Purnimanta ready
//
// NO UI
// NO API
// PURE CALCULATION
//////////////////////////////////////////////////////////////



import {
  calculateSankranti,
} from "./sankranti";




//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////


export interface AdhikMaasOptions {


  previousAmavasyaLongitude?:number;


  nextAmavasyaLongitude?:number;


  currentSunLongitude:number;


  nextSunLongitude?:number;


  previousSunLongitude?:number;


}




export interface AdhikMaasResult {


  active:boolean;


  name:string|null;


  reason:string;


  lunarMonthType:
    "Normal"
    |
    "Adhik Maas";


  confidence:
    "high"
    |
    "medium"
    |
    "low";


}






//////////////////////////////////////////////////////////////
// NORMALIZE
//////////////////////////////////////////////////////////////


function normalizeDifference(
value:number
){

const diff =
Math.abs(value);


return diff > 180
?
360 - diff
:
diff;

}








//////////////////////////////////////////////////////////////
// SANKRANTI CHECK
//////////////////////////////////////////////////////////////


function hasSolarTransition(


current:number,


previous?:number,


next?:number


){



const currentTransition =
calculateSankranti(
current,
previous
);



if(
currentTransition.entered
){

return true;

}




if(
typeof next === "number"
){


const nextTransition =
calculateSankranti(
next,
current
);



if(
nextTransition.entered
){

return true;

}


}




return false;


}








//////////////////////////////////////////////////////////////
// ADHIK MAAS CORE
//
// Traditional rule:
//
// Two Amavasya boundaries
// without solar ingress
//
// => Adhik Maas
//////////////////////////////////////////////////////////////



export function calculateAdhikMaas(



currentSunLongitude:number,


nextSunLongitude?:number,


previousSunLongitude?:number



):AdhikMaasResult {



const noSolarTransition =

!hasSolarTransition(

currentSunLongitude,

previousSunLongitude,

nextSunLongitude

);






const solarMovement =


typeof nextSunLongitude === "number"

&&

typeof previousSunLongitude === "number"


?

normalizeDifference(

nextSunLongitude -
previousSunLongitude

)

:

0;






/*
--------------------------------------

Fallback validation

If solar movement is abnormal
we avoid false Adhik Maas.

--------------------------------------
*/


const validLunarGap =

solarMovement < 35;







const active =

noSolarTransition

&&

validLunarGap;








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

"No Sankranti between two lunar months"

:

"Normal lunar month with solar transition",






lunarMonthType:


active

?

"Adhik Maas"

:

"Normal",






confidence:


typeof nextSunLongitude === "number"

?

"high"

:

"medium"



};



}








//////////////////////////////////////////////////////////////
// BOOLEAN HELPER
//////////////////////////////////////////////////////////////


export function isAdhikMaas(

result:AdhikMaasResult

){

return result.active;

}







//////////////////////////////////////////////////////////////
// DISPLAY HELPER
//////////////////////////////////////////////////////////////


export function getAdhikMaasLabel(

result:AdhikMaasResult

){


return result.active

?

"Adhik Maas"

:

"Normal Maas";


}
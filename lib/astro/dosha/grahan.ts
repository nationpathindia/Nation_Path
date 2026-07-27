//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO GRAHAN DOSHA ENGINE
// Sun/Moon Eclipse Combination Analysis
//////////////////////////////////////////////////////////////

import type {

  HoroscopePlanet,

} from "../horoscope/types";


import type {

  DoshaResult,

} from "./types";





//////////////////////////////////////////////////////////////
// PLANET DISTANCE CHECK
//////////////////////////////////////////////////////////////

function isCloseDegree(

 first:number,

 second:number,

 limit:number = 12

):boolean {


 const diff =

 Math.abs(

  first -

  second

 );



 const adjusted =

 Math.min(

  diff,

  360 - diff

 );



 return adjusted <= limit;

}







//////////////////////////////////////////////////////////////
// GRAHAN CHECK
//////////////////////////////////////////////////////////////

function checkGrahan(

 planets:HoroscopePlanet[]

){


 const sun =

 planets.find(

  planet =>

  String(planet.planet)

  ===

  "Sun"

 );



 const moon =

 planets.find(

  planet =>

  String(planet.planet)

  ===

  "Moon"

 );



 const rahu =

 planets.find(

  planet =>

  String(planet.planet)

  ===

  "Rahu"

 );



 const ketu =

 planets.find(

  planet =>

  String(planet.planet)

  ===

  "Ketu"

 );





 const involved:string[]=[];





 if(

  sun &&

  rahu &&

  isCloseDegree(

   sun.longitude,

   rahu.longitude

  )

 ){

   involved.push(

    "Sun",

    "Rahu"

   );

 }



 if(

  sun &&

  ketu &&

  isCloseDegree(

   sun.longitude,

   ketu.longitude

  )

 ){

   involved.push(

    "Sun",

    "Ketu"

   );

 }





 if(

  moon &&

  rahu &&

  isCloseDegree(

   moon.longitude,

   rahu.longitude

  )

 ){

   involved.push(

    "Moon",

    "Rahu"

   );

 }





 if(

  moon &&

  ketu &&

  isCloseDegree(

   moon.longitude,

   ketu.longitude

  )

 ){

   involved.push(

    "Moon",

    "Ketu"

   );

 }





 return {


   active:

   involved.length > 0,



   involved:

   [

    ...new Set(involved)

   ],


 };

}








//////////////////////////////////////////////////////////////
// GRAHAN DOSHA CALCULATOR
//////////////////////////////////////////////////////////////

export function calculateGrahanDosha(

 planets:Record<string,HoroscopePlanet>

):DoshaResult {



 const result =

 checkGrahan(

  Object.values(planets)

 );





 return {


   id:

   "grahan_001",



   name:

   "Grahan Dosha",



   category:

   "Grahan",



   active:

   result.active,



   severity:

   result.active

   ? "Medium"

   : "Low",



   strength:

   result.active

   ? 70

   : 0,



   status:

   result.active

   ? "Moderate"

   : "Inactive",



   planets:

   result.involved,





   description:

   result.active

   ?

   "Sun or Moon influenced by Rahu/Ketu indicates eclipse-related planetary impact."

   :

   "Grahan Dosha not detected.",





   keywords:[


    "Sun",

    "Moon",

    "Rahu",

    "Ketu",

    "Eclipse"


   ],





   cancellation:{


    exists:false,


    reasons:[]


   },





   effects:{


    career:[

     "Unexpected changes",

     "Transformation periods"

    ],



    health:[

     "Mind-body balance focus"

    ],



    spirituality:[

     "Karmic awareness"

    ],


   },





   source:{


    chart:"D1",


    rule:

    "Sun/Moon conjunction with Rahu or Ketu"



   }



 };


}
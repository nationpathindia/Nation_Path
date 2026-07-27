//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO PITRA DOSHA ENGINE
// Sun + Rahu/Ketu + 9th House Karma Analysis
//////////////////////////////////////////////////////////////

import type {

  HoroscopePlanet,

} from "../horoscope/types";


import type {

  DoshaResult,

} from "./types";





//////////////////////////////////////////////////////////////
// CHECK PITRA DOSHA
//////////////////////////////////////////////////////////////

function checkPitraDosha(

 planets:HoroscopePlanet[]

){


 const involved:string[]=[];





 const sun =

 planets.find(

  planet =>

  String(planet.planet)

  ===

  "Sun"

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







 // Sun with Rahu

 if(

  sun &&

  rahu &&

  sun.rashi.name === rahu.rashi.name

 ){

   involved.push(

    "Sun",

    "Rahu"

   );

 }





 // Sun with Ketu

 if(

  sun &&

  ketu &&

  sun.rashi.name === ketu.rashi.name

 ){

   involved.push(

    "Sun",

    "Ketu"

   );

 }





 // Ninth house influence

 const ninthHousePlanets =

 planets.filter(

  planet =>

  planet.house?.number === 9

 );





 if(

  ninthHousePlanets.length > 0

 ){

   ninthHousePlanets.forEach(

    planet =>

    involved.push(

     String(

      planet.planet

     )

    )

   );

 }





 return {


   active:

    involved.length >= 2,



   involved:

    [

     ...new Set(involved)

    ],


 };

}









//////////////////////////////////////////////////////////////
// PITRA DOSHA CALCULATOR
//////////////////////////////////////////////////////////////

export function calculatePitraDosha(

 planets:Record<string,HoroscopePlanet>

):DoshaResult {



 const result =

 checkPitraDosha(

  Object.values(planets)

 );





 return {


   id:

   "pitra_001",



   name:

   "Pitra Dosha",



   category:

   "Pitra",



   active:

   result.active,



   severity:

   result.active

   ? "Medium"

   : "Low",



   strength:

   result.active

   ? 65

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

   "Sun and karmic indicators show ancestral influence requiring deeper chart analysis."

   :

   "Pitra Dosha not detected.",





   keywords:[


    "Sun",

    "Ancestors",

    "Karma",

    "Family"


   ],





   effects:{


    family:[

     "Family responsibilities",

     "Ancestral patterns"

    ],



    career:[

     "Delayed recognition"

    ],



    spirituality:[

     "Karmic learning"

    ],


   },





   cancellation:{


    exists:false,


    reasons:[]


   },





   source:{


    chart:"D1",


    rule:

    "Sun-Rahu/Ketu connection and ancestral house influence"



   }



 };


}
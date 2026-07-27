//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO KAAL SARP DOSHA ENGINE
// Future Proof Rahu-Ketu Axis Analysis
//////////////////////////////////////////////////////////////

import type {

  HoroscopePlanet,

} from "../horoscope/types";


import type {

  DoshaResult,

} from "./types";





//////////////////////////////////////////////////////////////
// CHECK PLANET BETWEEN RAHU KETU AXIS
//////////////////////////////////////////////////////////////

function isBetweenAxis(

 longitude:number,

 rahu:number,

 ketu:number

):boolean {


 if(

  rahu < ketu

 ){

   return (

    longitude > rahu &&

    longitude < ketu

   );

 }



 return (

   longitude > rahu ||

   longitude < ketu

 );

}








//////////////////////////////////////////////////////////////
// KAAL SARP CHECK
//////////////////////////////////////////////////////////////

function checkKaalSarp(

 planets:HoroscopePlanet[]

){


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





 if(

  !rahu ||

  !ketu

 ){

  return {


   active:false,


   involved:[],


  };

 }





 const normalPlanets =

 planets.filter(

  planet =>

  ![

   "Rahu",

   "Ketu"

  ].includes(

   String(planet.planet)

  )

 );





 const allBetween =

 normalPlanets.every(

  planet =>

  isBetweenAxis(

   planet.longitude,

   rahu.longitude,

   ketu.longitude

  )

 );





 return {


   active:

    allBetween,



   involved:

    allBetween

    ?

    normalPlanets.map(

     planet =>

     String(

      planet.planet

     )

    )

    :

    [],


 };

}








//////////////////////////////////////////////////////////////
// KAAL SARP CALCULATOR
//////////////////////////////////////////////////////////////

export function calculateKaalSarpDosha(

 planets:Record<string,HoroscopePlanet>

):DoshaResult {



 const result =

 checkKaalSarp(

  Object.values(planets)

 );





 return {


   id:

   "kaal_sarp_001",



   name:

   "Kaal Sarp Dosha",



   category:

   "Kaal Sarp",



   active:

   result.active,



   severity:

   result.active

   ? "Medium"

   : "Low",



   strength:

   result.active

   ? 75

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

   "All major planets placed between Rahu and Ketu axis. Detailed strength and cancellation analysis required."

   :

   "Kaal Sarp Dosha not detected.",



   keywords:[


    "Rahu",

    "Ketu",

    "Transformation",

    "Life Challenges"


   ],





   cancellation:{


    exists:false,


    reasons:[]


   },





   effects:{


    career:[

     "Sudden changes",

     "Transformation phases"

    ],



    spirituality:[

     "Inner growth",

     "Karmic lessons"

    ],


   },





   source:{


    chart:"D1",


    rule:

    "All seven planets between Rahu and Ketu axis"



   }


 };


}
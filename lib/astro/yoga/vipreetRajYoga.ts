//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO VIPREET RAJ YOGA ENGINE
//////////////////////////////////////////////////////////////

import type {

  HoroscopePlanet,

} from "../horoscope/types";


import type {

  YogaResult,

} from "./types";





//////////////////////////////////////////////////////////////
// DUSTHANA HOUSES
//////////////////////////////////////////////////////////////

const DUSTHANA_HOUSES = [

  6,

  8,

  12,

];





//////////////////////////////////////////////////////////////
// CHECK VIPREET RAJ YOGA
//////////////////////////////////////////////////////////////

function checkVipreetRajYoga(

 planets:HoroscopePlanet[]

){


 const involved:string[]=[];




 planets.forEach(planet=>{


   const house =

   planet.house?.number;





   if(

    house &&

    DUSTHANA_HOUSES.includes(house)

   ){



     involved.push(

       String(planet.planet)

     );



   }



 });






 return {


   active:

    involved.length >= 2,



   involved:

    [...new Set(involved)],


 };

}








//////////////////////////////////////////////////////////////
// VIPREET RAJ YOGA CALCULATOR
//////////////////////////////////////////////////////////////

export function calculateVipreetRajYoga(

 planets:Record<string,HoroscopePlanet>

):YogaResult {



 const result =

 checkVipreetRajYoga(

  Object.values(planets)

 );





 return {


   id:

   "vipreet_raj_yoga_001",



   name:

   "Vipreet Raj Yoga",



   category:

   "Vipreet Raj Yoga",



   active:

   result.active,



   strength:

   result.active

   ? 75

   : 0,



   status:

   result.active

   ? "Strong"

   : "Inactive",



   planets:

   result.involved,



   description:

   result.active

   ?

   "Dusthana house connections can create success through challenges, obstacles and unexpected opportunities."

   :

   "No Vipreet Raj Yoga combination detected.",



   keywords:[


    "Obstacles",

    "Transformation",

    "Unexpected Success",

    "Resilience"


   ],



   effects:{


    career:[

     "Growth after challenges"

    ],



    finance:[

     "Unexpected gains"

    ],



    spirituality:[

     "Inner transformation"

    ],


   },



   source:{


    chart:"D1",


    rule:

    "6th, 8th and 12th house lord connection"



   }



 };


}
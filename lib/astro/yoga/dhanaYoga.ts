//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO DHANA YOGA ENGINE
//////////////////////////////////////////////////////////////

import type {

  HoroscopePlanet,

} from "../horoscope/types";


import type {

  YogaResult,

} from "./types";





//////////////////////////////////////////////////////////////
// RASHI LORD MAP
//////////////////////////////////////////////////////////////

const RASHI_LORDS:Record<string,string> = {


  Mesha:"Mars",

  Vrishabha:"Venus",

  Mithuna:"Mercury",

  Karka:"Moon",

  Simha:"Sun",

  Kanya:"Mercury",

  Tula:"Venus",

  Vrischika:"Mars",

  Dhanu:"Jupiter",

  Makara:"Saturn",

  Kumbha:"Saturn",

  Meena:"Jupiter",

};





//////////////////////////////////////////////////////////////
// WEALTH HOUSES
//////////////////////////////////////////////////////////////

const DHANA_HOUSES = [

  2,
  5,
  9,
  11

];





//////////////////////////////////////////////////////////////
// DHANA CHECK
//////////////////////////////////////////////////////////////

function checkDhanaCombination(

 planets:HoroscopePlanet[]

){


 const involved:string[]=[];



 planets.forEach(planet=>{


   const house =

   planet.house?.number;



   if(

    house &&

    DHANA_HOUSES.includes(house)

   ){


     const lord =

     RASHI_LORDS[

       planet.rashi.name

     ];



     if(lord){


       involved.push(

        lord

       );


     }


   }


 });



 return [

   ...new Set(involved)

 ];

}





//////////////////////////////////////////////////////////////
// DHANA YOGA CALCULATOR
//////////////////////////////////////////////////////////////

export function calculateDhanaYoga(

 planets:Record<string,HoroscopePlanet>

):YogaResult {



 const involved =

 checkDhanaCombination(

   Object.values(planets)

 );




 const active =

 involved.length >= 2;





 return {


   id:

   "dhana_yoga_001",



   name:

   "Dhana Yoga",



   category:

   "Dhana Yoga",



   active,



   strength:

   active

   ? 75

   : 0,



   status:

   active

   ? "Strong"

   : "Inactive",



   planets:

   involved,



   description:

   active

   ?

   "Combination of wealth houses indicates financial growth and resource potential."

   :

   "Strong wealth combination not detected.",



   keywords:[


    "Wealth",

    "Finance",

    "Resources",

    "Material Growth"


   ],



   effects:{


    finance:[

      "Income potential",

      "Asset building"

    ],


   },



   source:{


    chart:"D1",


    rule:

    "Connection of 2nd, 5th, 9th and 11th houses"



   }


 };


}
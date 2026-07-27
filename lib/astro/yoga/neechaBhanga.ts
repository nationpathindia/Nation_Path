//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO NEECHA BHANGA RAJA YOGA ENGINE
//////////////////////////////////////////////////////////////

import type {

  HoroscopePlanet,

} from "../horoscope/types";


import type {

  YogaResult,

} from "./types";





//////////////////////////////////////////////////////////////
// DEBILITATION SIGNS
//////////////////////////////////////////////////////////////

const DEBILITATION:Record<string,string> = {


  Sun:"Tula",

  Moon:"Vrischika",

  Mars:"Karka",

  Mercury:"Meena",

  Jupiter:"Makara",

  Venus:"Kanya",

  Saturn:"Mesha",


};





//////////////////////////////////////////////////////////////
// EXALTATION SIGNS
//////////////////////////////////////////////////////////////

const EXALTATION:Record<string,string> = {


  Sun:"Mesha",

  Moon:"Vrishabha",

  Mars:"Makara",

  Mercury:"Kanya",

  Jupiter:"Karka",

  Venus:"Meena",

  Saturn:"Tula",


};






//////////////////////////////////////////////////////////////
// CHECK NEECHA BHANGA
//////////////////////////////////////////////////////////////

function checkNeechaBhanga(

 planets:HoroscopePlanet[]

){


 const involved:string[]=[];



 planets.forEach(planet=>{


   const name =

   String(planet.planet);



   const rashi =

   planet.rashi.name;





   const debilitatedSign =

   DEBILITATION[name];





   if(

    debilitatedSign === rashi

   ){



     const exaltationSign =

     EXALTATION[name];





     if(exaltationSign){



       involved.push(

        name

       );



     }



   }



 });





 return {


   active:

    involved.length > 0,



   involved,


 };

}







//////////////////////////////////////////////////////////////
// NEECHA BHANGA CALCULATOR
//////////////////////////////////////////////////////////////

export function calculateNeechaBhanga(

 planets:Record<string,HoroscopePlanet>

):YogaResult {



 const result =

 checkNeechaBhanga(

  Object.values(planets)

 );





 return {


   id:

   "neecha_bhanga_001",



   name:

   "Neecha Bhanga Raja Yoga",



   category:

   "Neecha Bhanga Yoga",



   active:

   result.active,



   strength:

   result.active

   ? 70

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

   "Debilitation cancellation creates recovery, transformation and rise after challenges."

   :

   "No Neecha Bhanga combination detected.",



   keywords:[


    "Recovery",

    "Transformation",

    "Rise after struggle"


   ],



   effects:{


    career:[

     "Growth after obstacles"

    ],



    finance:[

     "Improvement after difficulties"

    ],


   },



   source:{


    chart:"D1",


    rule:

    "Debilitated planet cancellation condition"



   }


 };


}
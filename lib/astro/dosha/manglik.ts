//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO MANGLIK DOSHA ENGINE
// Future Proof Mars Dosha Analysis
//////////////////////////////////////////////////////////////

import type {

  HoroscopePlanet,

} from "../horoscope/types";


import type {

  DoshaResult,

} from "./types";





//////////////////////////////////////////////////////////////
// MANGAL DOSHA HOUSES
//////////////////////////////////////////////////////////////

const MANGLIK_HOUSES = [

  1,

  2,

  4,

  7,

  8,

  12,

];





//////////////////////////////////////////////////////////////
// CHECK MARS POSITION
//////////////////////////////////////////////////////////////

function checkMarsDosha(

 mars:HoroscopePlanet

){


 const house =

 mars.house?.number;





 if(

  !house

 ){

  return {


    active:false,


    house:undefined,


  };

 }





 return {


   active:

    MANGLIK_HOUSES.includes(

      house

    ),



   house,


 };

}






//////////////////////////////////////////////////////////////
// CANCELLATION CHECK
//////////////////////////////////////////////////////////////

function checkCancellation(

 planets:HoroscopePlanet[]

){


 const reasons:string[]=[];



 const mars =

 planets.find(

  planet =>

  String(planet.planet)

  ===

  "Mars"

 );





 if(

  mars?.strength.score

  &&

  mars.strength.score >= 80

 ){


   reasons.push(

    "Strong Mars reduces negative impact"

   );


 }





 return {


   exists:

    reasons.length > 0,



   reasons,


 };

}








//////////////////////////////////////////////////////////////
// MANGLIK DOSHA CALCULATOR
//////////////////////////////////////////////////////////////

export function calculateManglikDosha(

 planets:Record<string,HoroscopePlanet>

):DoshaResult {



 const planetList =

 Object.values(planets);





 const mars =

 planetList.find(

  planet =>

  String(planet.planet)

  ===

  "Mars"

 );






 if(

  !mars

 ){

  return {


   id:

   "manglik_001",



   name:

   "Manglik Dosha",



   category:

   "Manglik",



   active:false,



   severity:

   "Low",



   strength:0,



   status:

   "Inactive",



   planets:[],



   description:

   "Mars position not available.",



   keywords:[

    "Mars"

   ],



   source:{


    chart:"D1",


    rule:

    "Mars house placement analysis"



   }


  };

 }






 const result =

 checkMarsDosha(

  mars

 );





 const cancellation =

 checkCancellation(

  planetList

 );






 const active =

 result.active;






 return {


   id:

   "manglik_001",



   name:

   "Manglik Dosha",



   category:

   "Manglik",



   active,



   severity:

   active

   ? "Medium"

   : "Low",



   strength:

   active

   ? 70

   : 0,



   status:

   active

   ? "Moderate"

   : "Inactive",



   planets:

   active

   ?

   [

    "Mars"

   ]

   :

   [],





   planetDetails:[


    {

     planet:"Mars",

     house:result.house,

     effect:

     "Mars influence on relationship houses"


    }


   ],





   description:

   active

   ?

   "Mars placement creates Manglik influence requiring relationship compatibility analysis."

   :

   "Manglik Dosha not detected.",





   keywords:[


    "Mars",

    "Marriage",

    "Relationship"


   ],





   cancellation,





   effects:{


    marriage:[

     "Compatibility analysis recommended"

    ],


    family:[

     "Relationship harmony evaluation"

    ],


   },





   source:{


    chart:"D1",


    rule:

    "Mars placed in 1st, 2nd, 4th, 7th, 8th or 12th house"



   }



 };

}
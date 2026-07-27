//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO GAJAKESARI YOGA ENGINE
//////////////////////////////////////////////////////////////

import type {

  HoroscopePlanet,

} from "../horoscope/types";


import type {

  YogaResult,

} from "./types";





//////////////////////////////////////////////////////////////
// KENDRA HOUSES
//////////////////////////////////////////////////////////////

const KENDRA_HOUSES = [

  1,

  4,

  7,

  10,

];





//////////////////////////////////////////////////////////////
// PLANET FINDER
//////////////////////////////////////////////////////////////

function findPlanet(

 planets:HoroscopePlanet[],

 name:string

){


 return planets.find(

  planet =>

  String(planet.planet) === name

 );


}







//////////////////////////////////////////////////////////////
// CHECK GAJAKESARI CONDITION
//////////////////////////////////////////////////////////////

function checkGajakesari(

 planets:HoroscopePlanet[]

){


 const moon =

 findPlanet(

  planets,

  "Moon"

 );



 const jupiter =

 findPlanet(

  planets,

  "Jupiter"

 );





 if(

  !moon ||

  !jupiter

 ){

  return {

    active:false,

    involved:[]

  };

 }





 const moonHouse =

 moon.house?.number;



 const jupiterHouse =

 jupiter.house?.number;





 if(

  !moonHouse ||

  !jupiterHouse

 ){

  return {

    active:false,

    involved:[]

  };

 }





 const distance =

 Math.abs(

  moonHouse -

  jupiterHouse

 );





 const active =


 KENDRA_HOUSES.includes(

   distance === 0

   ? 1

   : distance

 );





 return {


   active,



   involved:

   active

   ?

   [

    "Moon",

    "Jupiter"

   ]

   :

   [],


 };

}








//////////////////////////////////////////////////////////////
// GAJAKESARI YOGA CALCULATOR
//////////////////////////////////////////////////////////////

export function calculateGajakesariYoga(

 planets:Record<string,HoroscopePlanet>

):YogaResult {



 const result =

 checkGajakesari(

  Object.values(planets)

 );






 return {


   id:

   "gajakesari_yoga_001",



   name:

   "Gajakesari Yoga",



   category:

   "Gajakesari Yoga",



   active:

   result.active,



   strength:

   result.active

   ? 85

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

   "Moon and Jupiter relationship creates wisdom, knowledge, reputation and prosperity potential."

   :

   "Gajakesari Yoga combination not detected.",



   keywords:[


    "Wisdom",

    "Knowledge",

    "Recognition",

    "Prosperity"


   ],



   effects:{


    career:[

     "Leadership ability",

     "Professional respect"

    ],



    finance:[

     "Growth opportunities"

    ],



   },



   source:{


    chart:"D1",


    rule:

    "Moon and Jupiter in Kendra relationship"



   }



 };


}
//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO RAJ YOGA ENGINE
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
// KENDRA HOUSES
//////////////////////////////////////////////////////////////

const KENDRA_HOUSES = [

  1,
  4,
  7,
  10

];





//////////////////////////////////////////////////////////////
// TRIKONA HOUSES
//////////////////////////////////////////////////////////////

const TRIKONA_HOUSES = [

  1,
  5,
  9

];





//////////////////////////////////////////////////////////////
// FIND PLANET HOUSE
//////////////////////////////////////////////////////////////

function getPlanetHouse(

 planet:HoroscopePlanet

):number | undefined {


 return planet.house?.number;

}






//////////////////////////////////////////////////////////////
// PLANET NAME NORMALIZER
//////////////////////////////////////////////////////////////

function normalizePlanetName(

 value:unknown

):string {


 return String(value);

}







//////////////////////////////////////////////////////////////
// CHECK CONNECTION
//////////////////////////////////////////////////////////////

function hasKendraTrikonaConnection(

 planets:HoroscopePlanet[]

):{

 active:boolean;

 involved:string[];

} {


 const kendraPlanets =

 planets.filter(

 planet =>

 KENDRA_HOUSES.includes(

   getPlanetHouse(planet) ?? 0

 )

 );





 const trikonaPlanets =

 planets.filter(

 planet =>

 TRIKONA_HOUSES.includes(

   getPlanetHouse(planet) ?? 0

 )

 );





 const involved:string[]=[];




 kendraPlanets.forEach(k=>{



   const kLord =

   RASHI_LORDS[

     k.rashi.name

   ];





   trikonaPlanets.forEach(t=>{



     const tLord =

     RASHI_LORDS[

       t.rashi.name

     ];




     const kName =

       normalizePlanetName(

         k.intelligence.name

       );



     const tName =

       normalizePlanetName(

         t.intelligence.name

       );





     if(

       kLord === tName ||

       tLord === kName

     ){



       involved.push(

        kName

       );



       involved.push(

        tName

       );



     }



   });



 });






 return {


   active:

    involved.length > 0,



   involved:

    [...new Set(involved)],


 };

}







//////////////////////////////////////////////////////////////
// RAJ YOGA CALCULATOR
//////////////////////////////////////////////////////////////

export function calculateRajYoga(

 planets:Record<string,HoroscopePlanet>

):YogaResult {



 const result =

 hasKendraTrikonaConnection(

   Object.values(planets)

 );





 return {


   id:

   "raj_yoga_001",



   name:

   "Raj Yoga",



   category:

   "Raj Yoga",



   active:

   result.active,



   strength:

   result.active

   ? 80

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

   "Combination of Kendra and Trikona influences creating leadership and success potential."

   :

   "No strong Raj Yoga combination found.",



   keywords:[

    "Leadership",

    "Authority",

    "Recognition"

   ],



   source:{


     chart:"D1",


     rule:

     "Kendra lord and Trikona lord association"


   }



 };


}
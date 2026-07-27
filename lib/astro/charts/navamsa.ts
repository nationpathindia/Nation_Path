//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO NAVAMSA D9 ENGINE
//////////////////////////////////////////////////////////////

import {

  calculatePlanetStrength,

} from "../horoscope/strength";


import {

  getPlanetName,

} from "../horoscope/planetMapper";


import type {

  NavamsaChart,

  D9Planet,

} from "./types";





//////////////////////////////////////////////////////////////
// RASHI ORDER
//////////////////////////////////////////////////////////////

const RASHIS = [

 "Mesha",

 "Vrishabha",

 "Mithuna",

 "Karka",

 "Simha",

 "Kanya",

 "Tula",

 "Vrishchika",

 "Dhanu",

 "Makara",

 "Kumbha",

 "Meena"

];







//////////////////////////////////////////////////////////////
// NAVAMSA SIGN CALCULATION
//////////////////////////////////////////////////////////////

function calculateNavamsaSign(

 longitude:number

):string {



 const rashiIndex =

 Math.floor(

   longitude / 30

 );





 const degreeInSign =

 longitude % 30;





 const navamsaPart =

 Math.floor(

   degreeInSign / (30 / 9)

 );





 let startSign:number;





 // Movable

 if(

  [0,3,6,9].includes(rashiIndex)

 ){

   startSign = rashiIndex;

 }



 // Fixed

 else if(

  [1,4,7,10].includes(rashiIndex)

 ){

   startSign =

   (rashiIndex + 8) % 12;

 }



 // Dual

 else {

   startSign =

   (rashiIndex + 4) % 12;

 }







 return RASHIS[

   (startSign + navamsaPart) % 12

 ];



}








//////////////////////////////////////////////////////////////
// D9 ANALYSIS
//////////////////////////////////////////////////////////////
function analyzeD9Planet(

 planet:any,

 navamsaRashi:string

){



 const strength =

 calculatePlanetStrength(
  planet,
  navamsaRashi as any
);




 return {


   dignity:

    strength.dignity,



   strength:

    strength.score,



   keywords:[


     strength.dignity,


     "Navamsa placement"


   ],



 };


}








//////////////////////////////////////////////////////////////
// BUILD NAVAMSA
//////////////////////////////////////////////////////////////

export function calculateNavamsa(

 planets:any[]

):NavamsaChart {



 const d9Planets:D9Planet[] =



 planets.map(planet=>{



   const planetName =


     typeof planet.planet === "number"

     ?


     getPlanetName(

       planet.planet

     )


     :

     planet.planet;





   const navamsaRashi =


     calculateNavamsaSign(

       planet.longitude

     );







   return {


     planet:


       planetName,





     d1:{


       rashi:

        planet.rashi.name,



       longitude:

        planet.longitude,


     },





     d9:{


       rashi:

        navamsaRashi,


     },





     analysis:


       analyzeD9Planet(

         planetName,

         navamsaRashi

       ),



   };



 });








 return {


   type:"D9",


   planets:d9Planets,


 };



}
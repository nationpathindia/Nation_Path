//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO DOSHA AGGREGATOR ENGINE
//////////////////////////////////////////////////////////////

import type {

  HoroscopePlanet,

} from "../horoscope/types";


import type {

  DoshaAnalysis,

  DoshaResult,

} from "./types";



import {

  calculateManglikDosha,

} from "./manglik";


import {

  calculateKaalSarpDosha,

} from "./kaalSarp";


import {

  calculateGrahanDosha,

} from "./grahan";


import {

  calculatePitraDosha,

} from "./pitra";







//////////////////////////////////////////////////////////////
// MAIN DOSHA ANALYSIS
//////////////////////////////////////////////////////////////

export function analyzeDoshas(

 planets:Record<string,HoroscopePlanet>

):DoshaAnalysis {



 const doshas:DoshaResult[] = [



   calculateManglikDosha(

     planets

   ),



   calculateKaalSarpDosha(

     planets

   ),



   calculateGrahanDosha(

     planets

   ),



   calculatePitraDosha(

     planets

   ),



 ];







 const activeDoshas =

 doshas.filter(

  dosha =>

  dosha.active

 );







 const inactiveDoshas =

 doshas.filter(

  dosha =>

  !dosha.active

 );







 const strongestDosha =

 activeDoshas.sort(

  (a,b)=>

  b.strength -

  a.strength

 )[0];







 let overallStatus:

 DoshaAnalysis["overallStatus"];



 if(

  activeDoshas.length === 0

 ){

   overallStatus =

   "Clear";

 }

 else if(

  activeDoshas.length === 1

 ){

   overallStatus =

   "Minor";

 }

 else if(

  activeDoshas.length <= 3

 ){

   overallStatus =

   "Moderate";

 }

 else {

   overallStatus =

   "Significant";

 }







 return {


   total:

   doshas.length,



   activeCount:

   activeDoshas.length,



   inactiveCount:

   inactiveDoshas.length,



   doshas,



   activeDoshas,



   inactiveDoshas,



   strongestDosha,



   overallStatus,



   summary:

   activeDoshas.length > 0

   ?

   `${activeDoshas.length} dosha combinations detected requiring analysis.`

   :

   "No major dosha combinations detected.",



 };


}
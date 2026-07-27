//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO YOGA AGGREGATOR ENGINE
//////////////////////////////////////////////////////////////

import type {

  HoroscopePlanet,

} from "../horoscope/types";


import type {

  YogaAnalysis,

  YogaResult,

} from "./types";



import {

  calculateRajYoga,

} from "./rajYoga";


import {

  calculateDhanaYoga,

} from "./dhanaYoga";


import {

  calculateGajakesariYoga,

} from "./gajakesariYoga";


import {

  calculateNeechaBhanga,

} from "./neechaBhanga";


import {

  calculateVipreetRajYoga,

} from "./vipreetRajYoga";







//////////////////////////////////////////////////////////////
// MAIN YOGA ANALYSIS
//////////////////////////////////////////////////////////////

export function analyzeYogas(

 planets:Record<string,HoroscopePlanet>

):YogaAnalysis {



 const yogas:YogaResult[] = [


   calculateRajYoga(

     planets

   ),



   calculateDhanaYoga(

     planets

   ),



   calculateGajakesariYoga(

     planets

   ),



   calculateNeechaBhanga(

     planets

   ),



   calculateVipreetRajYoga(

     planets

   ),


 ];






 const activeYogas =

 yogas.filter(

   yoga =>

   yoga.active

 );






 const strongestYoga =

 activeYogas.sort(

   (a,b)=>

   b.strength -

   a.strength

 )[0];






 return {


   total:

    yogas.length,



   activeYogas,



   inactiveYogas:

    yogas.filter(

      yoga =>

      !yoga.active

    ),



   strongestYoga,



   summary:

    activeYogas.length > 0

    ?

    `${activeYogas.length} powerful yoga combinations found.`

    :

    "No major yoga combinations detected.",


 };


}
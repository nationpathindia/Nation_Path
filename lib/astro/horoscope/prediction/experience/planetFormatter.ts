//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// HOROSCOPE EXPERIENCE INTELLIGENCE
//
// Planet Formatter
//
// Converts:
// Planet Prediction Data
//
// Into:
// Premium User Experience Data
//
// No calculations.
// No prediction rules.
//////////////////////////////////////////////////////////////


import type {

  PlanetPrediction,

} from "../types";


import {

  humanizeKeywords,

  getPrimaryTheme,

} from "./keywordHumanizer";





//////////////////////////////////////////////////////////////
// EXPERIENCE PLANET TYPE
//////////////////////////////////////////////////////////////

export interface ExperiencePlanet {


  planet:

    string;



  title:

    string;



  theme:

    string;



  strength:

    number;



  insight:

    string;



  highlights:

    string[];



  caution:

    string[];


}







//////////////////////////////////////////////////////////////
// STRENGTH TONE
//////////////////////////////////////////////////////////////

function getStrengthTone(

 score:number

):

"strong"

|

"balanced"

|

"attention"

{


 if(score >= 75){

  return "strong";

 }



 if(score >= 45){

  return "balanced";

 }



 return "attention";


}








//////////////////////////////////////////////////////////////
// INSIGHT GENERATOR
//////////////////////////////////////////////////////////////

function generatePlanetInsight(

 planet:string,

 theme:string,

 strength:number

):string {


 const tone =

 getStrengthTone(

  strength

 );




 if(tone === "strong"){


  return (

    `${theme} becomes an important active theme during this cycle, creating opportunities for growth, confidence and meaningful progress.`

  );


 }





 if(tone === "attention"){


  return (

    `${theme} requires patience, awareness and balanced decisions to create better outcomes.`

  );


 }




 return (

   `${theme} supports steady improvement through consistency, practical action and conscious effort.`

 );


}








//////////////////////////////////////////////////////////////
// SINGLE PLANET FORMATTER
//////////////////////////////////////////////////////////////

export function formatPlanetExperience(

 prediction:PlanetPrediction

):ExperiencePlanet {


 const themes =

 humanizeKeywords(

   prediction.keywords

 );



 const theme =

 getPrimaryTheme(

   prediction.keywords

 );




 return {


  planet:

    prediction.planet,



  title:

    `${prediction.planet} Influence`,



  theme,



  strength:

    prediction.strengthScore,



  insight:

    generatePlanetInsight(

      prediction.planet,

      theme,

      prediction.strengthScore

    ),



  highlights:

    themes.slice(

      0,

      5

    ),



  caution:

    prediction.caution

      ?? []



 };


}








//////////////////////////////////////////////////////////////
// MULTIPLE PLANET FORMATTER
//////////////////////////////////////////////////////////////

export function formatPlanetExperiences(

 predictions:PlanetPrediction[]

):ExperiencePlanet[] {


 return predictions

  .map(

    prediction =>

    formatPlanetExperience(

      prediction

    )

  )

  .sort(

    (a,b) =>

      b.strength -

      a.strength

  )

  .slice(

    0,

    9

  );


}
//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// LANGUAGE INTELLIGENCE RESOLVER
//
// Connects:
// Planet Intelligence
// +
// Literature Library
//
// No calculations.
// No prediction rules.
//////////////////////////////////////////////////////////////

import type {

  LanguageLifeArea,

  LanguageTone,

  PlanetLanguageContext,

  PlanetLanguageOutput,

} from "./types";



import {

  generateSunLanguage,

} from "./planets/sun";


import {

  generateMoonLanguage,

} from "./planets/moon";


import {

  generateMarsLanguage,

} from "./planets/mars";


import {

  generateMercuryLanguage,

} from "./planets/mercury";


import {

  generateJupiterLanguage,

} from "./planets/jupiter";


import {

  generateVenusLanguage,

} from "./planets/venus";


import {

  generateSaturnLanguage,

} from "./planets/saturn";


import {

  generateRahuLanguage,

} from "./planets/rahu";


import {

  generateKetuLanguage,

} from "./planets/ketu";




//////////////////////////////////////////////////////////////
// TONE RESOLVER
//////////////////////////////////////////////////////////////

function resolveTone(

  score:number = 50

):LanguageTone {


  if(score >= 70){

    return "positive";

  }



  if(score <= 40){

    return "caution";

  }



  return "neutral";

}




//////////////////////////////////////////////////////////////
// PLANET NORMALIZER
//////////////////////////////////////////////////////////////

function normalizePlanet(

  planet:string

):string {


  return planet

    .trim()

    .toLowerCase()

    .replace(/\s+/g,"");


}


//////////////////////////////////////////////////////////////
// PLANET LANGUAGE MAP
//////////////////////////////////////////////////////////////
const LANGUAGE_RESOLVERS: Record<
  string,
  (
    area: LanguageLifeArea,
    tone: LanguageTone
  ) => PlanetLanguageOutput
> = {


  sun:
    generateSunLanguage,


  moon:
    generateMoonLanguage,


  mars:
    generateMarsLanguage,


  mercury:
    generateMercuryLanguage,


  jupiter:
    generateJupiterLanguage,


  venus:
    generateVenusLanguage,


  saturn:
    generateSaturnLanguage,


  rahu:
    generateRahuLanguage,


  ketu:
    generateKetuLanguage,


};

//////////////////////////////////////////////////////////////
// MAIN LANGUAGE RESOLVER
//////////////////////////////////////////////////////////////

export function resolvePlanetLanguage(

  context:PlanetLanguageContext

):PlanetLanguageOutput {


  const planet =

    normalizePlanet(

      context.planet

    );



  const resolver =

    LANGUAGE_RESOLVERS[

      planet as keyof typeof LANGUAGE_RESOLVERS

    ];




  const tone =

    context.tone

    ??

    resolveTone(

      context.strengthScore

    );



if(!resolver){

  return {

    statement:

      `${context.planet} influences this phase through awareness, growth and personal development. This period encourages thoughtful decisions and balanced progress.`,


    explanation:

      `${context.planet} reflects important life patterns where self-awareness, learning and consistent effort can support meaningful improvement.`,


    advice:

      "Continue developing your strengths with patience, awareness and practical decision making.",

  };

}


  return resolver(

    context.area ?? "overall",

    tone

  );


}





//////////////////////////////////////////////////////////////
// AUTO CONTEXT BUILDER
//////////////////////////////////////////////////////////////

export function createLanguageContext(

  planet:string,

  score:number,

  area:LanguageLifeArea = "overall"

):PlanetLanguageContext {


  return {


    planet,


    strengthScore:

      score,


    area,


    tone:

      resolveTone(

        score

      ),


  };


}




//////////////////////////////////////////////////////////////
// EXPORT HELPERS
//////////////////////////////////////////////////////////////

export {

  resolveTone,

};
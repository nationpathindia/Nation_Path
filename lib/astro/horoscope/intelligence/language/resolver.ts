//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// LANGUAGE INTELLIGENCE RESOLVER v4
//
// Connects:
// Planet Intelligence
// +
// Zodiac Expression Context
// +
// Literature Library
//
// No calculations.
// No prediction rules.
// No planetary logic changes.
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
// ZODIAC EXPRESSION INTELLIGENCE
//
// Narrative context only.
// Does NOT modify astrology calculations.
//////////////////////////////////////////////////////////////

const ZODIAC_CONTEXT:

Record<

  string,

  {

    theme:string;

    expression:string;

  }

> = {


  aries: {

    theme:
      "initiative, confidence and forward movement",

    expression:
      "through bold decisions and personal action",

  },


  taurus: {

    theme:
      "stability, resources and practical growth",

    expression:
      "through patience, consistency and grounded choices",

  },


  gemini: {

    theme:
      "learning, communication and new ideas",

    expression:
      "through curiosity, connections and flexible thinking",

  },


  cancer: {

    theme:
      "emotional awareness, security and nurturing growth",

    expression:
      "through intuition and meaningful relationships",

  },


  leo: {

    theme:
      "creativity, confidence and personal expression",

    expression:
      "through leadership and authentic visibility",

  },


  virgo: {

    theme:
      "improvement, discipline and thoughtful planning",

    expression:
      "through analysis and practical refinement",

  },


  libra: {

    theme:
      "balance, harmony and meaningful partnerships",

    expression:
      "through cooperation and thoughtful choices",

  },


  scorpio: {

    theme:
      "transformation, depth and strategic growth",

    expression:
      "through focus, resilience and inner strength",

  },


  sagittarius: {

    theme:
      "expansion, wisdom and exploration",

    expression:
      "through learning and broader perspectives",

  },


  capricorn: {

    theme:
      "achievement, responsibility and long-term progress",

    expression:
      "through discipline and consistent effort",

  },


  aquarius: {

    theme:
      "innovation, vision and collective growth",

    expression:
      "through new ideas and unconventional thinking",

  },


  pisces: {

    theme:
      "intuition, compassion and imagination",

    expression:
      "through creativity and emotional awareness",

  },


};








//////////////////////////////////////////////////////////////
// ZODIAC CONTEXT ENHANCER
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// ZODIAC CONTEXT ENHANCER
//
// Zodiac gives only opening narrative context.
// Planet literature remains independent.
//////////////////////////////////////////////////////////////

function applyZodiacContext(

  output: PlanetLanguageOutput,

  context: PlanetLanguageContext

): PlanetLanguageOutput {


  if(!context.zodiac){

    return output;

  }



  const zodiacKey =

    context.zodiac

      .toLowerCase()

      .trim();



  const zodiac =

    ZODIAC_CONTEXT[zodiacKey];



  if(!zodiac){

    return output;

  }



  const planetName =

    capitalize(

      context.planet

    );




  return {


    statement:

      `${capitalize(context.zodiac)} energy of ${zodiac.theme} combines with ${planetName}'s influence. ${output.statement}`,




    explanation:

      output.explanation,




    advice:

      output.advice,



  };


}


//////////////////////////////////////////////////////////////
// TEXT HELPER
//////////////////////////////////////////////////////////////

function capitalize(

  value:string

){

  return value.charAt(0).toUpperCase()

    +

    value.slice(1);

}







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

    LANGUAGE_RESOLVERS[planet];



  const tone =

    context.tone

    ??

    resolveTone(

      context.strengthScore

    );





  let output:PlanetLanguageOutput;



  if(!resolver){


    output = {


      statement:

        `${context.planet} influences this phase through awareness, growth and personal development. This period encourages thoughtful decisions and balanced progress.`,



      explanation:

        `${context.planet} reflects important life patterns where self-awareness, learning and consistent effort can support meaningful improvement.`,



      advice:

        "Continue developing your strengths with patience, awareness and practical decision making.",


    };


  }


  else {


    output = resolver(

      context.area ?? "overall",

      tone

    );


  }




  return applyZodiacContext(

    output,

    context

  );


}








//////////////////////////////////////////////////////////////
// AUTO CONTEXT BUILDER
//////////////////////////////////////////////////////////////

export function createLanguageContext(

  planet:string,

  score:number,

  area:LanguageLifeArea = "overall",

  zodiac?:string

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



    zodiac,


  };


}




export {

  resolveTone,

};
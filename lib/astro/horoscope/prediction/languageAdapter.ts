//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// PREDICTION LANGUAGE ADAPTER
//
// Connects:
// Prediction Engine
//        |
// Language Intelligence Layer
//
// No calculations.
// No planetary logic changes.
//////////////////////////////////////////////////////////////


import type {

  HoroscopePlanet,

} from "../types";



import type {

  PredictionCategory,

  PredictionMessage,

} from "./types";



import {

  resolvePlanetLanguage,

  composeLanguage,

  createLanguageContext,

} from "../intelligence/language";


import {

  getPredictionPlanetId,

} from "./helpers";


import type {

  PlanetLanguageOutput,

} from "../intelligence/language";




//////////////////////////////////////////////////////////////
// LIFE AREA NORMALIZER
//////////////////////////////////////////////////////////////

function normalizeArea(

  area:PredictionCategory

):any {


  const supported = [

    "overall",

    "personality",

    "career",

    "finance",

    "relationship",

    "health",

    "mind",

    "spirituality",

    "education",

    "communication",

    "travel",

    "research",

    "ambition",

  ];



  return supported.includes(area)

    ? area

    : "overall";

}




//////////////////////////////////////////////////////////////
// PLANET LANGUAGE GENERATOR
//////////////////////////////////////////////////////////////

export function generatePlanetPredictionLanguage(

  planet:HoroscopePlanet,

  area:PredictionCategory = "overall"

):PlanetLanguageOutput {



 const context =

    createLanguageContext(

      getPredictionPlanetId(

        planet

      ),


      planet.strength.score,


      normalizeArea(

        area

      )

    );



  return resolvePlanetLanguage(

    context

  );


}





//////////////////////////////////////////////////////////////
// PREDICTION MESSAGE ENHANCER
//////////////////////////////////////////////////////////////

export function enhancePredictionMessage(

  planet:HoroscopePlanet,

  message:PredictionMessage

):PredictionMessage {


  const language =

    generatePlanetPredictionLanguage(

      planet,

      message.category

    );




  return {


    ...message,



    prediction:

      language.statement,



    explanation:

      language.explanation,



    guidance:

      language.advice,



  };


}





//////////////////////////////////////////////////////////////
// MULTI PLANET COMPOSER
//////////////////////////////////////////////////////////////

export function composePremiumPrediction(

  planets:HoroscopePlanet[],

  area:PredictionCategory = "overall"

){


  const outputs =


    planets.map(

      planet =>


        generatePlanetPredictionLanguage(

          planet,

          area

        )


    );





  return composeLanguage(

    outputs,

    normalizeArea(

      area

    )

  );


}





//////////////////////////////////////////////////////////////
// SAFE FALLBACK WRAPPER
//////////////////////////////////////////////////////////////

export function safeLanguageEnhancement(

  planet:HoroscopePlanet,

  message:PredictionMessage

):PredictionMessage {


  try {


    return enhancePredictionMessage(

      planet,

      message

    );


  }

  catch {


    return message;


  }


}
//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// PREDICTION LANGUAGE ADAPTER v3
//
// Connects:
//
// Prediction Engine
//        |
//        |
// Language Intelligence Layer
//
// Zodiac Context Enabled
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

  LanguageLifeArea,

} from "../intelligence/language";






//////////////////////////////////////////////////////////////
// SUPPORTED LANGUAGE AREAS
//////////////////////////////////////////////////////////////

const LANGUAGE_AREAS: LanguageLifeArea[] = [

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






//////////////////////////////////////////////////////////////
// LIFE AREA NORMALIZER
//////////////////////////////////////////////////////////////

function normalizeArea(

  area: PredictionCategory

): LanguageLifeArea {


  return LANGUAGE_AREAS.includes(

    area as LanguageLifeArea

  )

    ?

    area as LanguageLifeArea

    :

    "overall";


}






//////////////////////////////////////////////////////////////
// PLANET LANGUAGE GENERATOR
//////////////////////////////////////////////////////////////

export function generatePlanetPredictionLanguage(


  planet: HoroscopePlanet,


  area: PredictionCategory = "overall",


  zodiac?: string


): PlanetLanguageOutput {



  const planetName =


    getPredictionPlanetId(

      planet

    );






  const context =


    createLanguageContext(


      planetName,


      planet.strength.score,


      normalizeArea(

        area

      ),


      zodiac


    );






  return resolvePlanetLanguage(

    context

  );


}








//////////////////////////////////////////////////////////////
// PREDICTION MESSAGE ENHANCER
//////////////////////////////////////////////////////////////

export function enhancePredictionMessage(


  planet: HoroscopePlanet,


  message: PredictionMessage,


  zodiac?: string


): PredictionMessage {



  try {



    const language =



      generatePlanetPredictionLanguage(



        planet,



        message.category,



        zodiac



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


  catch {



    return message;


  }


}








//////////////////////////////////////////////////////////////
// MULTI PLANET PREMIUM COMPOSER
//////////////////////////////////////////////////////////////

export function composePremiumPrediction(


  planets: HoroscopePlanet[],


  area: PredictionCategory = "overall",


  zodiac?: string


){



  const languageArea =


    normalizeArea(

      area

    );






  const outputs =



    planets.map(



      planet =>



        generatePlanetPredictionLanguage(



          planet,



          area,



          zodiac



        )



    );







  return composeLanguage(


    outputs,


    languageArea


  );


}









//////////////////////////////////////////////////////////////
// PLANET SUMMARY BUILDER
//
// Future premium sections use this
//////////////////////////////////////////////////////////////

export function buildPlanetLanguageSummary(


  planet: HoroscopePlanet,


  zodiac?: string


){



  return {


    planet:


      getPredictionPlanetId(

        planet

      ),



    strength:


      planet.strength.score,



    zodiac,



    overall:


      generatePlanetPredictionLanguage(


        planet,


        "overall",


        zodiac


      ),



    career:


      generatePlanetPredictionLanguage(


        planet,


        "career",


        zodiac


      ),



    relationship:


      generatePlanetPredictionLanguage(


        planet,


        "relationship",


        zodiac


      ),



    finance:


      generatePlanetPredictionLanguage(


        planet,


        "finance",


        zodiac


      ),



  };


}









//////////////////////////////////////////////////////////////
// SAFE LANGUAGE ENHANCEMENT WRAPPER
//////////////////////////////////////////////////////////////

export function safeLanguageEnhancement(


  planet: HoroscopePlanet,


  message: PredictionMessage,


  zodiac?: string


): PredictionMessage {



  try {


    return enhancePredictionMessage(


      planet,


      message,


      zodiac


    );


  }


  catch {


    return message;


  }


}
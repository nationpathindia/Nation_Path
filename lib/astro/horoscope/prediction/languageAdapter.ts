//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// PREDICTION LANGUAGE ADAPTER v4
//
// Connects:
//
// Prediction Engine
//        |
//        |
// Language Intelligence Layer
//
// Supports:
// - Zodiac narrative context
// - Real supplied astro context
// - Planet literature routing
// - Life-area routing
// - Tone routing
//
// LOCKED RULES:
// - No calculations.
// - No planetary logic changes.
// - No artificial zodiac scoring.
// - No astronomy.
// - Astro context is pass-through only.
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
  PlanetLanguageContext,
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
//
// Existing callers remain compatible.
//
// Optional astroContext is passed directly to the
// language intelligence layer.
//
// No calculation happens here.
//////////////////////////////////////////////////////////////

export function generatePlanetPredictionLanguage(

  planet: HoroscopePlanet,

  area: PredictionCategory = "overall",

  zodiac?: string,

  astroContext?:
    PlanetLanguageContext["astroContext"]

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

      zodiac,

      astroContext

    );


  return resolvePlanetLanguage(

    context

  );

}



//////////////////////////////////////////////////////////////
// PREDICTION MESSAGE ENHANCER
//
// Keeps the prediction message structure intact.
//
// Only literary fields are replaced.
//
// Existing prediction intelligence values remain untouched.
//////////////////////////////////////////////////////////////

export function enhancePredictionMessage(

  planet: HoroscopePlanet,

  message: PredictionMessage,

  zodiac?: string,

  astroContext?:
    PlanetLanguageContext["astroContext"]

): PredictionMessage {

  try {

    const language =

      generatePlanetPredictionLanguage(

        planet,

        message.category,

        zodiac,

        astroContext

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
//
// Composes literature from multiple planets.
//
// Astro context remains optional and pass-through.
//////////////////////////////////////////////////////////////

export function composePremiumPrediction(

  planets: HoroscopePlanet[],

  area: PredictionCategory = "overall",

  zodiac?: string,

  astroContexts?:
    Record<
      string,
      PlanetLanguageContext["astroContext"]
    >

) {

  const languageArea =

    normalizeArea(

      area

    );


  const outputs =

    planets.map(

      planet => {

        const planetName =

          getPredictionPlanetId(

            planet

          );


        const astroContext =

          astroContexts?.[

            planetName

          ];


        return generatePlanetPredictionLanguage(

          planet,

          area,

          zodiac,

          astroContext

        );

      }

    );


  return composeLanguage(

    outputs,

    languageArea

  );

}



//////////////////////////////////////////////////////////////
// PLANET SUMMARY BUILDER
//
// Future premium sections use this.
//
// All generated language uses the same optional
// real astro context.
//////////////////////////////////////////////////////////////

export function buildPlanetLanguageSummary(

  planet: HoroscopePlanet,

  zodiac?: string,

  astroContext?:
    PlanetLanguageContext["astroContext"]

) {

  const planetName =

    getPredictionPlanetId(

      planet

    );


  return {

    planet:

      planetName,


    strength:

      planet.strength.score,


    zodiac,


    overall:

      generatePlanetPredictionLanguage(

        planet,

        "overall",

        zodiac,

        astroContext

      ),


    career:

      generatePlanetPredictionLanguage(

        planet,

        "career",

        zodiac,

        astroContext

      ),


    relationship:

      generatePlanetPredictionLanguage(

        planet,

        "relationship",

        zodiac,

        astroContext

      ),


    finance:

      generatePlanetPredictionLanguage(

        planet,

        "finance",

        zodiac,

        astroContext

      ),

  };

}



//////////////////////////////////////////////////////////////
// SAFE LANGUAGE ENHANCEMENT WRAPPER
//////////////////////////////////////////////////////////////

export function safeLanguageEnhancement(

  planet: HoroscopePlanet,

  message: PredictionMessage,

  zodiac?: string,

  astroContext?:
    PlanetLanguageContext["astroContext"]

): PredictionMessage {

  try {

    return enhancePredictionMessage(

      planet,

      message,

      zodiac,

      astroContext

    );

  }

  catch {

    return message;

  }

}



//////////////////////////////////////////////////////////////
// END OF PREDICTION LANGUAGE ADAPTER
//////////////////////////////////////////////////////////////
//
//
// LOCKED:
//
// Prediction intelligence:
// - remains responsible for scores
// - remains responsible for prediction meaning
//
// Language intelligence:
// - selects literature
// - selects tone
// - selects life-area expression
// - consumes supplied astro context
// - consumes zodiac as narrative context
//
// No calculations are introduced here.
//
//////////////////////////////////////////////////////////////


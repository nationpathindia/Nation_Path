//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// Prediction Context Intelligence Layer v3
//
// Shared Prediction State
//
// Responsibilities:
// - Preserve real astro snapshot
// - Preserve prediction outputs
// - Route context between intelligence layers
// - Support future astro context
//
// NO calculations.
// NO ephemeris.
// NO planetary mathematics.
// NO artificial zodiac scoring.
//////////////////////////////////////////////////////////////

import type {
  HoroscopePlanet,
  HoroscopeLanguage,
} from "../types";

import type {
  PlanetPrediction,
  LifePrediction,
  PredictionInsight,
} from "./types";



//////////////////////////////////////////////////////////////
// CONTEXT VERSION
//////////////////////////////////////////////////////////////

export const PREDICTION_CONTEXT_VERSION =
  "v3-intelligence";



//////////////////////////////////////////////////////////////
// PREDICTION PHASE
//////////////////////////////////////////////////////////////

export type PredictionPhase =
  | "initialized"
  | "analysis"
  | "ranking"
  | "language"
  | "quality"
  | "completed";



//////////////////////////////////////////////////////////////
// PREDICTION CONTEXT
//////////////////////////////////////////////////////////////

export interface PredictionContext {

  ////////////////////////////////////////////////////////////
  // META
  ////////////////////////////////////////////////////////////

  version:
    string;

  phase:
    PredictionPhase;


  ////////////////////////////////////////////////////////////
  // REQUEST LANGUAGE
  ////////////////////////////////////////////////////////////

  language:
    HoroscopeLanguage;


  ////////////////////////////////////////////////////////////
  // ZODIAC CONTEXT
  //
  // Context only.
  // Never used as an artificial score modifier.
  ////////////////////////////////////////////////////////////

  zodiacSign?:
    string;


  ////////////////////////////////////////////////////////////
  // PLANET DATA
  //
  // This remains the source snapshot received from the
  // external astrology/calculation layer.
  ////////////////////////////////////////////////////////////

  planets:
    HoroscopePlanet[];


  ////////////////////////////////////////////////////////////
  // DOMINANT PLANETS
  //
  // Selected by the prediction engine.
  ////////////////////////////////////////////////////////////

  dominantPlanets:
    HoroscopePlanet[];


  ////////////////////////////////////////////////////////////
  // PLANET SUMMARY INTELLIGENCE
  ////////////////////////////////////////////////////////////

  activePlanetCount:
    number;


  dominantPlanetNames:
    string[];


  ////////////////////////////////////////////////////////////
  // GENERATED PREDICTIONS
  ////////////////////////////////////////////////////////////

  planetaryPredictions:
    PlanetPrediction[];


  lifePredictions:
    LifePrediction[];


  ////////////////////////////////////////////////////////////
  // INSIGHT LAYERS
  ////////////////////////////////////////////////////////////

  opportunities:
    PredictionInsight[];


  cautions:
    PredictionInsight[];


  guidance:
    string[];


  ////////////////////////////////////////////////////////////
  // FUTURE REAL ASTRO CONTEXT
  //
  // These are intentionally context containers.
  // They must only be populated when the actual
  // calculation/astro layer provides the data.
  //
  // No calculation belongs here.
  ////////////////////////////////////////////////////////////

  transitData?:
    unknown;


  dashaData?:
    unknown;


  yogaData?:
    unknown;


  nakshatraData?:
    unknown;


  houseData?:
    unknown;


  aspectData?:
    unknown;


  retrogradeData?:
    unknown;


}



//////////////////////////////////////////////////////////////
// CONTEXT BUILDER INPUT
//////////////////////////////////////////////////////////////

export type PredictionContextInput =
  Omit<
    PredictionContext,
    | "version"
    | "activePlanetCount"
    | "dominantPlanetNames"
  >;



//////////////////////////////////////////////////////////////
// SAFE PLANET NAME
//////////////////////////////////////////////////////////////

function getContextPlanetName(
  planet: HoroscopePlanet
): string {

  const name =
    planet?.strength?.planet;

  if (
    typeof name === "string" &&
    name.trim().length > 0
  ) {

    return name.trim();

  }

  return "Unknown";

}



//////////////////////////////////////////////////////////////
// CONTEXT BUILDER
//////////////////////////////////////////////////////////////

export function createPredictionContext(

  input:
    PredictionContextInput

): PredictionContext {

  const planets =
    Array.isArray(input.planets)
      ? input.planets.filter(Boolean)
      : [];


  const dominantPlanets =
    Array.isArray(input.dominantPlanets)
      ? input.dominantPlanets.filter(Boolean)
      : [];


  return {

    ...input,

    version:
      PREDICTION_CONTEXT_VERSION,


    planets,


    dominantPlanets,


    activePlanetCount:
      planets.length,


    dominantPlanetNames:

      dominantPlanets
        .map(
          getContextPlanetName
        )
        .filter(
          name =>
            name !== "Unknown"
        ),

  };

}



//////////////////////////////////////////////////////////////
// CONTEXT VALIDATOR
//////////////////////////////////////////////////////////////

export function validatePredictionContext(

  context:
    PredictionContext

): boolean {

  if (!context) {

    return false;

  }


  if (
    !context.language
  ) {

    return false;

  }


  if (
    !Array.isArray(
      context.planets
    )
  ) {

    return false;

  }


  if (
    !Array.isArray(
      context.dominantPlanets
    )
  ) {

    return false;

  }


  if (
    !Array.isArray(
      context.planetaryPredictions
    )
  ) {

    return false;

  }


  if (
    !Array.isArray(
      context.lifePredictions
    )
  ) {

    return false;

  }


  if (
    !Array.isArray(
      context.opportunities
    )
  ) {

    return false;

  }


  if (
    !Array.isArray(
      context.cautions
    )
  ) {

    return false;

  }


  if (
    !Array.isArray(
      context.guidance
    )
  ) {

    return false;

  }


  return true;

}



//////////////////////////////////////////////////////////////
// CONTEXT UPDATE HELPER
//////////////////////////////////////////////////////////////

export function updatePredictionPhase(

  context:
    PredictionContext,

  phase:
    PredictionPhase

): PredictionContext {

  return {

    ...context,

    phase,

  };

}



//////////////////////////////////////////////////////////////
// CONTEXT ZODIAC UPDATE
//
// Context setter only.
// No scoring.
// No prediction modification.
//////////////////////////////////////////////////////////////

export function updatePredictionZodiac(

  context:
    PredictionContext,

  zodiacSign?:
    string

): PredictionContext {

  return {

    ...context,

    zodiacSign:

      zodiacSign?.trim() || undefined,

  };

}



//////////////////////////////////////////////////////////////
// CONTEXT PLANET UPDATE
//
// Useful when a later intelligence layer receives an
// enriched real astro snapshot.
//
// No calculation is performed here.
//////////////////////////////////////////////////////////////

export function updatePredictionPlanets(

  context:
    PredictionContext,

  planets:
    HoroscopePlanet[]

): PredictionContext {

  const safePlanets =
    Array.isArray(planets)
      ? planets.filter(Boolean)
      : [];


  return {

    ...context,

    planets:
      safePlanets,


    activePlanetCount:
      safePlanets.length,

  };

}



//////////////////////////////////////////////////////////////
// CONTEXT DOMINANT PLANET UPDATE
//////////////////////////////////////////////////////////////

export function updateDominantPlanets(

  context:
    PredictionContext,

  dominantPlanets:
    HoroscopePlanet[]

): PredictionContext {

  const safeDominantPlanets =
    Array.isArray(
      dominantPlanets
    )
      ? dominantPlanets.filter(Boolean)
      : [];


  return {

    ...context,

    dominantPlanets:
      safeDominantPlanets,


    dominantPlanetNames:

      safeDominantPlanets
        .map(
          getContextPlanetName
        )
        .filter(
          name =>
            name !== "Unknown"
        ),

  };

}



//////////////////////////////////////////////////////////////
// CONTEXT COMPLETION CHECK
//////////////////////////////////////////////////////////////

export function isPredictionContextReady(

  context:
    PredictionContext

): boolean {

  if (
    !validatePredictionContext(
      context
    )
  ) {

    return false;

  }


  return (

    context.planets.length > 0

    &&

    context.planetaryPredictions.length > 0

  );

}
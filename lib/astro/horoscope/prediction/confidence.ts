//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// Prediction Confidence Intelligence Layer v2
//
// Production Intelligence
//
// IMPORTANT:
//
// Confidence measures the reliability / completeness of the
// available prediction evidence.
//
// Confidence is NOT:
// - positivity score
// - planetary strength score
// - prediction outcome
// - favorable/unfavorable result
//
// No calculations.
// No ephemeris.
// No planetary mathematics.
// No artificial zodiac scoring.
//////////////////////////////////////////////////////////////

import type {
  HoroscopePlanet,
} from "../types";

import type {
  PredictionContext,
} from "./context";



//////////////////////////////////////////////////////////////
// CONFIDENCE WEIGHTS
//
// Total = 100
//
// These weights measure evidence quality, not whether the
// horoscope is positive or negative.
//////////////////////////////////////////////////////////////

const CONFIDENCE_WEIGHTS = {

  strengthEvidence:
    25,

  dignityEvidence:
    15,

  astroDataCoverage:
    25,

  predictionConsistency:
    20,

  outputCoverage:
    15,

};



//////////////////////////////////////////////////////////////
// SCORE UTILITIES
//////////////////////////////////////////////////////////////

function clamp(
  value: number
): number {

  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(
    0,
    Math.min(
      100,
      Math.round(value)
    )
  );

}



function safeArrayLength(
  value: unknown
): number {

  return Array.isArray(value)
    ? value.length
    : 0;

}



//////////////////////////////////////////////////////////////
// VALID PLANET CHECK
//////////////////////////////////////////////////////////////

function isValidPlanet(
  planet: HoroscopePlanet
): boolean {

  return Boolean(
    planet &&
    planet.strength &&
    typeof planet.strength.score === "number" &&
    Number.isFinite(
      planet.strength.score
    )
  );

}



//////////////////////////////////////////////////////////////
// PLANET STRENGTH EVIDENCE
//
// This does NOT reward high strength.
//
// A score of 90 is not automatically more "certain" than 40.
//
// We only check whether the strength signal exists, is valid,
// and is within a meaningful range.
//////////////////////////////////////////////////////////////

function calculateStrengthEvidence(
  planets: HoroscopePlanet[]
): number {

  if (
    !Array.isArray(planets) ||
    planets.length === 0
  ) {

    return 0;

  }


  const validPlanets =
    planets.filter(
      isValidPlanet
    );


  if (
    validPlanets.length === 0
  ) {

    return 0;

  }


  const coverage =
    (
      validPlanets.length /
      planets.length
    ) * 100;


  return clamp(
    coverage
  );

}



//////////////////////////////////////////////////////////////
// DIGNITY EVIDENCE
//
// Dignity quality is about whether the astro calculation
// layer actually supplied a usable dignity signal.
//
// Exalted / own / friendly / enemy / debilitated are NOT
// treated as confidence bonuses.
//
// They describe planetary condition, not certainty.
//////////////////////////////////////////////////////////////

function calculateDignityEvidence(
  planets: HoroscopePlanet[]
): number {

  if (
    !Array.isArray(planets) ||
    planets.length === 0
  ) {

    return 0;

  }


  const validDignities = [

    "exalted",
    "own",
    "friendly",
    "neutral",
    "enemy",
    "debilitated",

  ];


  let available = 0;


  for (
    const planet of planets
  ) {

    const dignity =
      planet?.strength?.dignity;


    if (
      typeof dignity === "string" &&
      validDignities.includes(
        dignity.toLowerCase()
      )
    ) {

      available += 1;

    }

  }


  return clamp(

    (
      available /
      planets.length
    ) * 100

  );

}



//////////////////////////////////////////////////////////////
// ASTRO DATA COVERAGE
//
// Measures whether the planet snapshot contains meaningful
// astro-engine information.
//
// Current required evidence:
//
// - planet identity
// - strength
// - dignity
//
// Future evidence can be added here when the actual
// calculation layer exposes:
//
// - house
// - aspect
// - retrograde
// - nakshatra
// - transit
// - dasha
// - yoga
//
// We intentionally DO NOT invent those values here.
//////////////////////////////////////////////////////////////

function calculateAstroDataCoverage(
  planets: HoroscopePlanet[]
): number {

  if (
    !Array.isArray(planets) ||
    planets.length === 0
  ) {

    return 0;

  }


  let totalSignals = 0;

  let availableSignals = 0;


  for (
    const planet of planets
  ) {

    //////////////////////////////////////////////////////////
    // Planet identity
    //////////////////////////////////////////////////////////

    totalSignals += 1;

    if (
      typeof planet?.strength?.planet === "string" &&
      planet.strength.planet.trim()
    ) {

      availableSignals += 1;

    }


    //////////////////////////////////////////////////////////
    // Strength
    //////////////////////////////////////////////////////////

    totalSignals += 1;

    if (
      typeof planet?.strength?.score === "number" &&
      Number.isFinite(
        planet.strength.score
      )
    ) {

      availableSignals += 1;

    }


    //////////////////////////////////////////////////////////
    // Dignity
    //////////////////////////////////////////////////////////

    totalSignals += 1;

    if (
      typeof planet?.strength?.dignity === "string" &&
      planet.strength.dignity.trim()
    ) {

      availableSignals += 1;

    }


    //////////////////////////////////////////////////////////
    // Optional intelligence layer
    //
    // Only count it when it actually exists.
    //////////////////////////////////////////////////////////

    if (
      planet?.intelligence
    ) {

      totalSignals += 1;

      availableSignals += 1;

    }

  }


  if (
    totalSignals === 0
  ) {

    return 0;

  }


  return clamp(

    (
      availableSignals /
      totalSignals
    ) * 100

  );

}



//////////////////////////////////////////////////////////////
// PREDICTION CONSISTENCY
//
// Measures whether the engine has produced coherent output.
//
// Presence of both opportunity and caution is NOT inherently
// better. We check structural consistency instead.
//////////////////////////////////////////////////////////////

function calculatePredictionConsistency(
  context: PredictionContext
): number {

  let score = 0;


  ////////////////////////////////////////////////////////////
  // Planetary predictions
  ////////////////////////////////////////////////////////////

  const planetaryCount =
    safeArrayLength(
      context.planetaryPredictions
    );


  if (
    planetaryCount > 0
  ) {

    score += 30;

  }


  ////////////////////////////////////////////////////////////
  // Life predictions
  ////////////////////////////////////////////////////////////

  const lifeCount =
    safeArrayLength(
      context.lifePredictions
    );


  if (
    lifeCount > 0
  ) {

    score += 25;

  }


  ////////////////////////////////////////////////////////////
  // Opportunities
  ////////////////////////////////////////////////////////////

  if (
    Array.isArray(
      context.opportunities
    )
  ) {

    score += 10;

  }


  ////////////////////////////////////////////////////////////
  // Cautions
  ////////////////////////////////////////////////////////////

  if (
    Array.isArray(
      context.cautions
    )
  ) {

    score += 10;

  }


  ////////////////////////////////////////////////////////////
  // Guidance
  ////////////////////////////////////////////////////////////

  if (
    Array.isArray(
      context.guidance
    ) &&
    context.guidance.length > 0
  ) {

    score += 15;

  }


  ////////////////////////////////////////////////////////////
  // Dominant planets
  ////////////////////////////////////////////////////////////

  if (
    Array.isArray(
      context.dominantPlanets
    ) &&
    context.dominantPlanets.length > 0
  ) {

    score += 10;

  }


  return clamp(
    score
  );

}



//////////////////////////////////////////////////////////////
// OUTPUT COVERAGE
//
// Measures whether the generated prediction structure has
// enough usable content.
//
// This is output completeness, not prediction correctness.
//////////////////////////////////////////////////////////////

function calculateOutputCoverage(
  context: PredictionContext
): number {

  const checks = [

    context.planets.length > 0,

    context.dominantPlanets.length > 0,

    context.planetaryPredictions.length > 0,

    context.lifePredictions.length > 0,

    context.opportunities.length >= 0,

    context.cautions.length >= 0,

    context.guidance.length > 0,

  ];


  const passed =
    checks.filter(
      Boolean
    ).length;


  return clamp(

    (
      passed /
      checks.length
    ) * 100

  );

}



//////////////////////////////////////////////////////////////
// CONTEXT QUALITY FLOOR
//
// Prevents a large amount of generated text from producing
// an artificially high confidence score when the underlying
// astro snapshot is incomplete.
//////////////////////////////////////////////////////////////

function calculateContextFloor(
  context: PredictionContext
): number {

  if (
    !context ||
    !Array.isArray(
      context.planets
    )
  ) {

    return 0;

  }


  if (
    context.planets.length === 0
  ) {

    return 0;

  }


  const validPlanets =
    context.planets.filter(
      isValidPlanet
    );


  if (
    validPlanets.length === 0
  ) {

    return 20;

  }


  if (
    validPlanets.length <
    context.planets.length
  ) {

    return 70;

  }


  return 100;

}



//////////////////////////////////////////////////////////////
// CONFIDENCE BREAKDOWN
//
// Internal helper.
// Useful later for diagnostics, premium reports and
// engine observability.
//////////////////////////////////////////////////////////////

export interface PredictionConfidenceBreakdown {

  strengthEvidence:
    number;

  dignityEvidence:
    number;

  astroDataCoverage:
    number;

  predictionConsistency:
    number;

  outputCoverage:
    number;

  contextFloor:
    number;

  finalScore:
    number;

}



//////////////////////////////////////////////////////////////
// CALCULATE CONFIDENCE BREAKDOWN
//////////////////////////////////////////////////////////////

export function calculatePredictionConfidenceBreakdown(

  context:
    PredictionContext

): PredictionConfidenceBreakdown {

  if (
    !context
  ) {

    return {

      strengthEvidence: 0,

      dignityEvidence: 0,

      astroDataCoverage: 0,

      predictionConsistency: 0,

      outputCoverage: 0,

      contextFloor: 0,

      finalScore: 0,

    };

  }


  const planets =
    Array.isArray(
      context.planets
    )
      ? context.planets
      : [];


  const strengthEvidence =
    calculateStrengthEvidence(
      planets
    );


  const dignityEvidence =
    calculateDignityEvidence(
      planets
    );


  const astroDataCoverage =
    calculateAstroDataCoverage(
      planets
    );


  const predictionConsistency =
    calculatePredictionConsistency(
      context
    );


  const outputCoverage =
    calculateOutputCoverage(
      context
    );


  const contextFloor =
    calculateContextFloor(
      context
    );


  ////////////////////////////////////////////////////////////
  // WEIGHTED EVIDENCE SCORE
  ////////////////////////////////////////////////////////////

  const weightedScore =

    (
      strengthEvidence *
      CONFIDENCE_WEIGHTS.strengthEvidence
      / 100
    )

    +

    (
      dignityEvidence *
      CONFIDENCE_WEIGHTS.dignityEvidence
      / 100
    )

    +

    (
      astroDataCoverage *
      CONFIDENCE_WEIGHTS.astroDataCoverage
      / 100
    )

    +

    (
      predictionConsistency *
      CONFIDENCE_WEIGHTS.predictionConsistency
      / 100
    )

    +

    (
      outputCoverage *
      CONFIDENCE_WEIGHTS.outputCoverage
      / 100
    );


  ////////////////////////////////////////////////////////////
  // APPLY DATA QUALITY FLOOR
  //
  // Generated narrative cannot compensate for missing
  // underlying astro data.
  ////////////////////////////////////////////////////////////

  const finalScore =
    Math.min(
      weightedScore,
      contextFloor
    );


  return {

    strengthEvidence,

    dignityEvidence,

    astroDataCoverage,

    predictionConsistency,

    outputCoverage,

    contextFloor,

    finalScore:
      clamp(
        finalScore
      ),

  };

}



//////////////////////////////////////////////////////////////
// MAIN CONFIDENCE ENGINE
//////////////////////////////////////////////////////////////

export function calculatePredictionConfidence(

  context:
    PredictionContext

): number {

  const breakdown =
    calculatePredictionConfidenceBreakdown(
      context
    );


  return breakdown.finalScore;

}



//////////////////////////////////////////////////////////////
// CONFIDENCE LEVEL
//
// Useful for UI / API / premium reports.
//////////////////////////////////////////////////////////////

export type PredictionConfidenceLevel =
  | "low"
  | "moderate"
  | "high";



export function getPredictionConfidenceLevel(

  confidence:
    number

): PredictionConfidenceLevel {

  const score =
    clamp(
      confidence
    );


  if (
    score < 50
  ) {

    return "low";

  }


  if (
    score < 75
  ) {

    return "moderate";

  }


  return "high";

}



//////////////////////////////////////////////////////////////
// EXPORT WEIGHTS
//
// Kept available for diagnostics/testing.
//////////////////////////////////////////////////////////////

export {
  CONFIDENCE_WEIGHTS,
};
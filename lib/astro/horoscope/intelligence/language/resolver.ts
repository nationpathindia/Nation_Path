//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// LANGUAGE INTELLIGENCE RESOLVER v5
//
// Connects:
//
// Real Planet Intelligence
//        +
// Real Astro Context
//        +
// Zodiac Expression Context
//        +
// Planet Literature Library
//
// Responsibilities:
// - Resolve planetary literature
// - Use supplied astro context
// - Route life-area and tone
// - Preserve deterministic output
//
// No calculations.
// No prediction rules.
// No astronomy.
// No artificial zodiac scoring.
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
  score: number = 50
): LanguageTone {

  if (score >= 70) {
    return "positive";
  }

  if (score <= 40) {
    return "caution";
  }

  return "neutral";
}


//////////////////////////////////////////////////////////////
// PLANET NORMALIZER
//////////////////////////////////////////////////////////////

function normalizePlanet(
  planet: string
): string {

  return planet
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "");

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
// ZODIAC EXPRESSION CONTEXT
//
// Narrative context only.
//
// This does NOT alter planetary strength
// and does NOT calculate astrology.
//////////////////////////////////////////////////////////////

const ZODIAC_CONTEXT:
  Record<
    string,
    {
      theme: string;
      expression: string;
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
// TEXT HELPERS
//////////////////////////////////////////////////////////////

function capitalize(
  value: string
): string {

  if (!value) {
    return value;
  }

  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  );

}


function cleanText(
  value: string
): string {

  return value
    .replace(/\s+/g, " ")
    .trim();

}


//////////////////////////////////////////////////////////////
// ASTRO CONTEXT DESCRIPTION
//
// IMPORTANT:
//
// This function DOES NOT calculate anything.
//
// It only describes information that was already
// supplied by the real astrology calculation layer.
//
// It intentionally remains conservative so the
// language layer never invents missing astrology data.
//////////////////////////////////////////////////////////////

function buildAstroContextDescription(
  context: PlanetLanguageContext
): string {

  const astro =
    context.astroContext;

  if (!astro) {
    return "";
  }

  const parts: string[] = [];


  ////////////////////////////////////////////////////////////
  // RASHI
  ////////////////////////////////////////////////////////////

  if (astro.rashi) {

    const rashi =
      astro.rashi.name ??
      astro.rashi.sign;

    if (
      typeof rashi === "string" &&
      rashi.trim()
    ) {

      parts.push(
        `placed in ${rashi.trim()}`
      );

    }

  }


  ////////////////////////////////////////////////////////////
  // HOUSE
  ////////////////////////////////////////////////////////////

  if (
    astro.house &&
    typeof astro.house.number === "number"
  ) {

    parts.push(
      `in the ${astro.house.number}th house`
    );

  }


  ////////////////////////////////////////////////////////////
  // RETROGRADE
  ////////////////////////////////////////////////////////////

  if (
    astro.retrograde === true
  ) {

    parts.push(
      "with retrograde motion"
    );

  }


  ////////////////////////////////////////////////////////////
  // NAKSHATRA
  ////////////////////////////////////////////////////////////

  if (astro.nakshatra) {

    if (
      typeof astro.nakshatra.name === "string" &&
      astro.nakshatra.name.trim()
    ) {

      parts.push(
        `within ${astro.nakshatra.name.trim()} nakshatra`
      );

    }

  }


  if (!parts.length) {
    return "";
  }

  return parts.join(", ");

}


//////////////////////////////////////////////////////////////
// ASTRO CONTEXT ENHANCER
//
// The literature generator remains responsible for the
// planetary meaning.
//
// This layer adds only REAL supplied context.
//
// Missing context is never guessed.
//////////////////////////////////////////////////////////////

function applyAstroContext(
  output: PlanetLanguageOutput,
  context: PlanetLanguageContext
): PlanetLanguageOutput {

  const description =
    buildAstroContextDescription(
      context
    );

  if (!description) {
    return output;
  }

  const planetName =
    capitalize(
      context.planet
    );

  return {

    ...output,

    statement:
      cleanText(
        `${planetName} is ${description}. ${output.statement}`
      ),

  };

}


//////////////////////////////////////////////////////////////
// ZODIAC CONTEXT ENHANCER
//
// Zodiac is narrative context only.
//
// It does NOT modify:
// - strength
// - dignity
// - score
// - planetary calculations
//////////////////////////////////////////////////////////////

function applyZodiacContext(
  output: PlanetLanguageOutput,
  context: PlanetLanguageContext
): PlanetLanguageOutput {

  if (!context.zodiac) {
    return output;
  }

  const zodiacKey =
    context.zodiac
      .toLowerCase()
      .trim();

  const zodiac =
    ZODIAC_CONTEXT[
      zodiacKey
    ];

  if (!zodiac) {
    return output;
  }

  const planetName =
    capitalize(
      context.planet
    );

  return {

    ...output,

    statement:
      cleanText(
        `${capitalize(context.zodiac)} energy of ${zodiac.theme} meets ${planetName}'s influence. ${output.statement}`
      ),

  };

}


//////////////////////////////////////////////////////////////
// SAFE FALLBACK
//////////////////////////////////////////////////////////////

function buildFallbackOutput(
  context: PlanetLanguageContext
): PlanetLanguageOutput {

  const planet =
    capitalize(
      context.planet
    );

  return {

    statement:
      `${planet} influences this phase through awareness, growth and personal development.`,

    explanation:
      `${planet} reflects an area where greater awareness and consistent effort can support meaningful development.`,

    advice:
      "Work with the circumstances patiently and make decisions with awareness rather than reacting impulsively.",

    strengthScore:
      context.strengthScore,

  };

}


//////////////////////////////////////////////////////////////
// MAIN LANGUAGE RESOLVER
//////////////////////////////////////////////////////////////

export function resolvePlanetLanguage(
  context: PlanetLanguageContext
): PlanetLanguageOutput {

  const planet =
    normalizePlanet(
      context.planet
    );

  const resolver =
    LANGUAGE_RESOLVERS[
      planet
    ];

  const tone =
    context.tone ??
    resolveTone(
      context.strengthScore
    );

  let output:
    PlanetLanguageOutput;


  ////////////////////////////////////////////////////////////
  // PLANET LITERATURE
  ////////////////////////////////////////////////////////////

  if (!resolver) {

    output =
      buildFallbackOutput(
        context
      );

  } else {

    output =
      resolver(
        context.area ?? "overall",
        tone
      );

  }


  ////////////////////////////////////////////////////////////
  // REAL ASTRO CONTEXT
  ////////////////////////////////////////////////////////////

  const astroEnhanced =
    applyAstroContext(
      output,
      context
    );


  ////////////////////////////////////////////////////////////
  // ZODIAC EXPRESSION
  ////////////////////////////////////////////////////////////

  const finalOutput =
    applyZodiacContext(
      astroEnhanced,
      context
    );


  ////////////////////////////////////////////////////////////
  // FINAL OUTPUT
  ////////////////////////////////////////////////////////////

  return {

    ...finalOutput,

    strengthScore:
      context.strengthScore,

  };

}


//////////////////////////////////////////////////////////////
// AUTO CONTEXT BUILDER
//
// Existing callers remain supported.
//
// Optional astroContext is passed through unchanged.
//
// No calculations are performed.
//////////////////////////////////////////////////////////////

export function createLanguageContext(
  planet: string,
  score: number,
  area: LanguageLifeArea = "overall",
  zodiac?: string,
  astroContext?: PlanetLanguageContext["astroContext"]
): PlanetLanguageContext {

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

    astroContext,

  };

}


//////////////////////////////////////////////////////////////
// PUBLIC TONE EXPORT
//////////////////////////////////////////////////////////////

export {
  resolveTone,
};


//////////////////////////////////////////////////////////////
// END OF RESOLVER
//////////////////////////////////////////////////////////////


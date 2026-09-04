//////////////////////////////////////////////////////////////
//
// NATIONPATH AI AUTOMATION
//
// ASTRO HOROSCOPE GENERATOR
//
// ENHANCED + LOCKED VERSION
//
// Responsibility:
//
// Daily / Weekly / Monthly / Yearly Horoscope Automation
//
// FLOW:
//
// Automation Request
//        ↓
// Horoscope Service
//        ↓
// Astro Engine
//        ↓
// Prediction Engine
//        ↓
// Remedy Intelligence Resolver
//        ↓
// CMS Mapper
//        ↓
// MongoDB Horoscope CMS
//
// RULES:
//
// NO calculation
// NO planetary modification
// NO prediction modification
// NO AI generation here
// NO MongoDB access here
// NO CMS access here
//
// Astro Engine remains source of truth.
// Prediction Engine remains prediction source.
// Remedy CMS knowledge is passed upstream.
// Resolver automatically selects relevant remedy.
//
//////////////////////////////////////////////////////////////

import {
  generateHoroscope,
} from "@/lib/services/horoscopeService";

import {
  mapHoroscopeToCms,
} from "./mapper";

import type {
  HoroscopeLanguage,
  HoroscopeResult,
} from "@/lib/astro/horoscope/types";

import type {
  RemedyKnowledge,
  RemedyIntelligenceResult,
} from "@/lib/astro/horoscope/remedy/types";

import {
  resolvePrimaryCmsRemedy,
} from "@/lib/astro/horoscope/remedy/resolver";


//////////////////////////////////////////////////////////////
// PERIOD
//////////////////////////////////////////////////////////////

export type HoroscopeAutomationPeriod =
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly";


//////////////////////////////////////////////////////////////
// INPUT
//////////////////////////////////////////////////////////////

export interface HoroscopeAutomationInput {

  ////////////////////////////////////////////////////////////
  // ZODIAC
  ////////////////////////////////////////////////////////////

  zodiac: string;


  ////////////////////////////////////////////////////////////
  // ZODIAC MASTER SNAPSHOT
  //
  // Static Zodiac CMS intelligence.
  //
  // Passed to CMS mapper only.
  //
  // NOT used for prediction.
  // NOT used for remedy generation.
  ////////////////////////////////////////////////////////////

  zodiacMaster?: any;


  ////////////////////////////////////////////////////////////
  // REMEDY KNOWLEDGE
  //
  // Published Remedy CMS knowledge must be loaded
  // upstream and passed into automation.
  //
  // Generator does NOT access MongoDB directly.
  //
  // Resolver automatically selects relevant remedy.
  ////////////////////////////////////////////////////////////

  remedyKnowledge?: RemedyKnowledge[];


  ////////////////////////////////////////////////////////////
  // DATE
  ////////////////////////////////////////////////////////////

  date: Date | string;


  ////////////////////////////////////////////////////////////
  // LANGUAGE
  ////////////////////////////////////////////////////////////

  language?: HoroscopeLanguage;


  ////////////////////////////////////////////////////////////
  // PERIOD
  ////////////////////////////////////////////////////////////

  period?: HoroscopeAutomationPeriod;
}


//////////////////////////////////////////////////////////////
// OUTPUT
//////////////////////////////////////////////////////////////

export interface HoroscopeAutomationResult {

  zodiac: string;

  period: HoroscopeAutomationPeriod;

  cms: any;

  generatedAt: Date;
}


//////////////////////////////////////////////////////////////
// DATE NORMALIZER
//////////////////////////////////////////////////////////////

function normalizeDate(
  value: Date | string
): Date {

  if (value instanceof Date) {
    return value;
  }

  return new Date(value);
}


//////////////////////////////////////////////////////////////
// REMEDY PLANET RESOLVER
//
// Prediction Engine remains source of planetary influence.
//
// Priority:
//
// 1. Highest influence score
// 2. Highest strength score
//
// No astrology calculation happens here.
//
//////////////////////////////////////////////////////////////

function getPrimaryRemedyPlanet(
  horoscope: HoroscopeResult
) {

  const predictions =
    horoscope.prediction?.planetaryPredictions || [];


  if (
    !Array.isArray(predictions) ||
    !predictions.length
  ) {

    return null;
  }


  const sorted = [
    ...predictions,
  ].sort(
    (
      a,
      b
    ) => {

      ////////////////////////////////////////////////////////
      // INFLUENCE SCORE
      ////////////////////////////////////////////////////////

      const aInfluence =
        a.influenceScore ?? 0;

      const bInfluence =
        b.influenceScore ?? 0;


      if (
        bInfluence !== aInfluence
      ) {

        return (
          bInfluence -
          aInfluence
        );
      }


      ////////////////////////////////////////////////////////
      // STRENGTH SCORE
      ////////////////////////////////////////////////////////

      const aStrength =
        a.strengthScore ?? 0;

      const bStrength =
        b.strengthScore ?? 0;


      return (
        bStrength -
        aStrength
      );
    }
  );


  return (
    sorted[0] ??
    null
  );
}


//////////////////////////////////////////////////////////////
// REMEDY INTELLIGENCE
//
// Automatic flow:
//
// Prediction Engine
//       ↓
// Primary Planetary Influence
//       ↓
// Remedy Resolver
//       ↓
// Published Remedy Knowledge
//       ↓
// Resolved Remedy
//
// IMPORTANT:
//
// - No remedy generation
// - No hardcoded remedy
// - No hardcoded mantra
// - No MongoDB access
//
// Remedy-specific content always comes from
// RemedyKnowledge.
//
//////////////////////////////////////////////////////////////

function resolveRemedyIntelligence(
  horoscope: HoroscopeResult,
  zodiac: string,
  remedyKnowledge: RemedyKnowledge[]
): RemedyIntelligenceResult {

  ////////////////////////////////////////////////////////////
  // NO REMEDY KNOWLEDGE
  ////////////////////////////////////////////////////////////

  if (
    !Array.isArray(remedyKnowledge) ||
    !remedyKnowledge.length
  ) {

    return {
      available: false,
    };
  }


  ////////////////////////////////////////////////////////////
  // GET PRIMARY PLANET
  //
  // Source:
  //
  // Prediction Engine
  ////////////////////////////////////////////////////////////

  const primaryPlanet =
    getPrimaryRemedyPlanet(
      horoscope
    );


  ////////////////////////////////////////////////////////////
  // NO PLANETARY PREDICTION
  ////////////////////////////////////////////////////////////

  if (
    !primaryPlanet?.planet
  ) {

    return {
      available: false,
    };
  }


  ////////////////////////////////////////////////////////////
  // AUTOMATIC CMS REMEDY RESOLUTION
  ////////////////////////////////////////////////////////////

  const remedy =
    resolvePrimaryCmsRemedy({

      remedies:
        remedyKnowledge,

      planet:
        primaryPlanet.planet,

      zodiacSign:
        zodiac,

      strengthScore:
        primaryPlanet.strengthScore,

      dignity:
        primaryPlanet.dignity,

      limit:
        1,
    });


  ////////////////////////////////////////////////////////////
  // NO MATCH
  ////////////////////////////////////////////////////////////

  if (!remedy) {

    return {

      available: false,

      context: {

        zodiacSign:
          zodiac,

        planet:
          primaryPlanet.planet,

        strengthScore:
          primaryPlanet.strengthScore,

        dignity:
          primaryPlanet.dignity,
      },
    };
  }


  ////////////////////////////////////////////////////////////
  // FINAL REMEDY INTELLIGENCE
  ////////////////////////////////////////////////////////////

  return {

    available: true,

    remedy,

    context: {

      zodiacSign:
        zodiac,

      planet:
        primaryPlanet.planet,

      strengthScore:
        primaryPlanet.strengthScore,

      dignity:
        primaryPlanet.dignity,
    },
  };
}


//////////////////////////////////////////////////////////////
// ATTACH REMEDY INTELLIGENCE
//
// HoroscopeResult contract already supports:
//
// horoscope.remedyIntelligence
//
// Prediction is NOT modified.
// Planetary data is NOT modified.
//
//////////////////////////////////////////////////////////////

function attachRemedyIntelligence(
  horoscope: HoroscopeResult,
  zodiac: string,
  remedyKnowledge?: RemedyKnowledge[]
): HoroscopeResult {

  ////////////////////////////////////////////////////////////
  // NO KNOWLEDGE PROVIDED
  ////////////////////////////////////////////////////////////

  if (
    !remedyKnowledge ||
    !remedyKnowledge.length
  ) {

    return {

      ...horoscope,

      remedyIntelligence: {
        available: false,
      },
    };
  }


  ////////////////////////////////////////////////////////////
  // AUTOMATIC REMEDY RESOLUTION
  ////////////////////////////////////////////////////////////

  const remedyIntelligence =
    resolveRemedyIntelligence(
      horoscope,
      zodiac,
      remedyKnowledge
    );


  ////////////////////////////////////////////////////////////
  // RETURN ENHANCED RESULT
  ////////////////////////////////////////////////////////////

  return {

    ...horoscope,

    remedyIntelligence,
  };
}


//////////////////////////////////////////////////////////////
// MAIN HOROSCOPE GENERATOR
//////////////////////////////////////////////////////////////

export async function generateAutomatedHoroscope(
  input: HoroscopeAutomationInput
): Promise<HoroscopeAutomationResult> {

  ////////////////////////////////////////////////////////////
  // VALIDATE ZODIAC
  ////////////////////////////////////////////////////////////

  const zodiac =
    input.zodiac?.trim();


  if (!zodiac) {

    throw new Error(
      "Horoscope zodiac is required"
    );
  }


  ////////////////////////////////////////////////////////////
  // NORMALIZE DATE
  ////////////////////////////////////////////////////////////

  const date =
    normalizeDate(
      input.date
    );


  ////////////////////////////////////////////////////////////
  // VALIDATE DATE
  ////////////////////////////////////////////////////////////

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

    throw new Error(
      "Invalid horoscope date"
    );
  }


  ////////////////////////////////////////////////////////////
  // RESOLVE PERIOD
  ////////////////////////////////////////////////////////////

  const period =
    input.period ||
    "daily";


  ////////////////////////////////////////////////////////////
  // STEP 1
  //
  // RUN EXISTING HOROSCOPE SERVICE
  //
  // FLOW:
  //
  // Astro Engine
  //       ↓
  // Prediction Engine
  //       ↓
  // AI Editorial Layer
  //
  // Engine remains source of truth.
  ////////////////////////////////////////////////////////////

  const horoscope =
    await generateHoroscope({

      horoscopeDate:
        date,

      language:
        input.language,

      zodiacSign:
        zodiac,
    });


  ////////////////////////////////////////////////////////////
  // STEP 2
  //
  // AUTOMATIC REMEDY INTELLIGENCE
  //
  // Flow:
  //
  // Prediction planetary influence
  //          ↓
  // Primary planet
  //          ↓
  // Remedy Resolver
  //          ↓
  // Published Remedy Knowledge
  //          ↓
  // Resolved Remedy
  //
  ////////////////////////////////////////////////////////////

  const enhancedHoroscope =
    attachRemedyIntelligence(

      horoscope,

      zodiac,

      input.remedyKnowledge
    );


  ////////////////////////////////////////////////////////////
  // REMEDY DEBUG
  ////////////////////////////////////////////////////////////

  console.log(
    "🪬 HOROSCOPE REMEDY INTELLIGENCE",
    {

      zodiac,

      available:
        enhancedHoroscope
          .remedyIntelligence
          ?.available ||
        false,

      planet:
        enhancedHoroscope
          .remedyIntelligence
          ?.context
          ?.planet ||
        null,

      remedy:
        enhancedHoroscope
          .remedyIntelligence
          ?.remedy
          ?.title ||
        null,

      remedySlug:
        enhancedHoroscope
          .remedyIntelligence
          ?.remedy
          ?.source
          ?.slug ||
        null,
    }
  );


  ////////////////////////////////////////////////////////////
  // STEP 3
  //
  // MAP FINAL RESULT TO CMS FORMAT
  //
  // Horoscope now contains:
  //
  // Engine
  // Prediction
  // AI Editorial
  // Remedy Intelligence
  //
  ////////////////////////////////////////////////////////////

  const cmsData =
    mapHoroscopeToCms({

      horoscope:
        enhancedHoroscope,

      zodiac:
        zodiac,

      zodiacMaster:
        input.zodiacMaster,

      period,

      date,
    });


  ////////////////////////////////////////////////////////////
  // STEP 4
  //
  // RETURN AUTOMATION RESULT
  ////////////////////////////////////////////////////////////

  return {

    zodiac,

    period,

    cms:
      cmsData,

    generatedAt:
      new Date(),
  };
}


//////////////////////////////////////////////////////////////
// BULK DAILY GENERATOR
//
// 12 ZODIAC AUTOMATION
//
// Remedy knowledge is passed once and used
// automatically for every zodiac.
//
//////////////////////////////////////////////////////////////

export async function generateAllDailyHoroscopes(
  zodiacs: string[],
  date: Date,
  options?: {

    language?:
      HoroscopeLanguage;

    remedyKnowledge?:
      RemedyKnowledge[];

    zodiacMasters?:
      Record<string, any>;
  }
): Promise<HoroscopeAutomationResult[]> {

  const results:
    HoroscopeAutomationResult[] = [];


  ////////////////////////////////////////////////////////////
  // GENERATE EACH ZODIAC
  ////////////////////////////////////////////////////////////

  for (
    const zodiac of zodiacs
  ) {

    const normalizedZodiac =
      zodiac?.trim();


    if (!normalizedZodiac) {
      continue;
    }


    const zodiacMaster =
      options?.zodiacMasters
        ?.[normalizedZodiac];


    const horoscope =
      await generateAutomatedHoroscope({

        zodiac:
          normalizedZodiac,

        date,

        language:
          options?.language,

        period:
          "daily",

        zodiacMaster,

        remedyKnowledge:
          options?.remedyKnowledge,
      });


    results.push(
      horoscope
    );
  }


  return results;
}


//////////////////////////////////////////////////////////////
// DEFAULT EXPORT
//////////////////////////////////////////////////////////////

export default {

  generateAutomatedHoroscope,

  generateAllDailyHoroscopes,
};


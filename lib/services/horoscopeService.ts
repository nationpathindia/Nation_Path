//////////////////////////////////////////////////////////////
//
//
// NATIONPATH ASTRO HOROSCOPE SERVICE
//
// Production Horoscope Service Layer v3.0
//
// FLOW:
//
// Request
//    ↓
// Astro Engine
//    ↓
// Prediction Engine
//    ↓
// Remedy Intelligence
//    ↓
// AI Editorial Enhancement
//    ↓
// Final Horoscope Result
//
// RESPONSIBILITY:
//
// This service orchestrates the complete horoscope pipeline.
//
// RULES:
//
// Astro Engine / Prediction Engine = Source of Truth
// Remedy Intelligence = Remedy knowledge resolution layer
// AI = Editorial enhancement only
//
// NO:
// - Astrology calculation modification
// - Planetary modification
// - Prediction generation here
// - Hardcoded mantra
// - Hardcoded remedy knowledge
// - CMS horoscope generation
//
// Remedy-specific content must come from RemedyKnowledge.
// Resolver decides which already-known remedy knowledge is relevant.
//
// CMS remains the final persistence/publishing layer.
//
//////////////////////////////////////////////////////////////


import {
  calculateHoroscope,
} from "@/lib/astro/horoscope/engine";


import type {
  HoroscopeRequest,
  HoroscopeResult,
  HoroscopeLanguage,
} from "@/lib/astro/horoscope/types";


import {
  enhanceHoroscopeWithAI,
} from "@/lib/services/horoscopeAIService";


import {
  resolveCmsRemedies,
} from "@/lib/astro/horoscope/remedy";


import type {
  RemedyKnowledge,
  ResolvedRemedy,
} from "@/lib/astro/horoscope/remedy";





//////////////////////////////////////////////////////////////
// INPUT TYPE
//////////////////////////////////////////////////////////////


export interface HoroscopeServiceInput {

  horoscopeDate:
    Date | string;


  language?:
    HoroscopeLanguage;


  zodiacSign?:
    string;

}





//////////////////////////////////////////////////////////////
// REMEDY KNOWLEDGE PROVIDER
//
// IMPORTANT:
//
// The horoscope service does NOT contain remedy knowledge.
//
// A provider supplies already-known remedy knowledge.
//
// The provider may load knowledge from the existing
// Remedy Intelligence knowledge source.
//
// This service only passes that knowledge to the resolver.
//
// NO mantra is created here.
// NO remedy is created here.
//
//////////////////////////////////////////////////////////////


export type HoroscopeRemedyKnowledgeProvider =
  (
    input: {
      zodiacSign?: string;

      language:
        HoroscopeLanguage;
    }
  ) => Promise<RemedyKnowledge[]>;





//////////////////////////////////////////////////////////////
// DEFAULT PROVIDER
//
// No knowledge is invented here.
//
// Until the real Remedy Intelligence knowledge provider
// is connected, return an empty knowledge set.
//
// This prevents the horoscope engine from receiving
// fabricated remedies.
//
// Replace/connect this with the existing remedy knowledge
// service when available.
//
//////////////////////////////////////////////////////////////


let remedyKnowledgeProvider:
  HoroscopeRemedyKnowledgeProvider =
  async () => [];





//////////////////////////////////////////////////////////////
// CONFIGURE REMEDY KNOWLEDGE PROVIDER
//
// This allows the actual Remedy Intelligence knowledge
// source to be connected without changing the horoscope
// orchestration contract.
//
// Example:
//
// setHoroscopeRemedyKnowledgeProvider(
//   getPublishedRemedyKnowledge
// );
//
//////////////////////////////////////////////////////////////


export function setHoroscopeRemedyKnowledgeProvider(
  provider:
    HoroscopeRemedyKnowledgeProvider
): void {

  remedyKnowledgeProvider =
    provider;

}





//////////////////////////////////////////////////////////////
// DATE NORMALIZER
//////////////////////////////////////////////////////////////


function normalizeDate(
  value:
    Date | string
): Date {

  if (
    value instanceof Date
  ) {

    return value;

  }


  return new Date(
    value
  );

}





//////////////////////////////////////////////////////////////
// LANGUAGE RESOLVER
//////////////////////////////////////////////////////////////


function resolveLanguage(
  language?:
    HoroscopeLanguage
): HoroscopeLanguage {

  return (
    language
    ??
    ("english" as HoroscopeLanguage)
  );

}





//////////////////////////////////////////////////////////////
// ENGINE EXECUTION
//////////////////////////////////////////////////////////////


async function runAstroEngine(
  request:
    HoroscopeRequest
): Promise<HoroscopeResult> {

  return calculateHoroscope(
    request
  );

}





//////////////////////////////////////////////////////////////
// REMEDY RESULT CONTRACT
//////////////////////////////////////////////////////////////


type HoroscopeWithRemedy =
  HoroscopeResult & {

    remedyIntelligence?: {

      available:
        boolean;

      remedies:
        ResolvedRemedy[];

    };

  };





//////////////////////////////////////////////////////////////
// EXTRACT PLANETARY INFLUENCES
//
// IMPORTANT:
//
// We do NOT calculate planets here.
//
// We only read already-produced prediction output.
//
// Primary source:
//
// prediction.planetaryPredictions
//
// The Prediction Engine remains the source of truth.
//
//////////////////////////////////////////////////////////////


function getPlanetaryInfluences(
  horoscope:
    HoroscopeResult
) {

  const prediction:
    any =
    (horoscope as any)?.prediction;


  const planetaryPredictions =
    Array.isArray(
      prediction?.planetaryPredictions
    )
      ? prediction.planetaryPredictions
      : [];


  return planetaryPredictions
    .filter(
      (planet: any) =>
        typeof planet?.planet === "string"
        &&
        planet.planet.trim()
    )
    .map(
      (planet: any) => ({

        planet:
          planet.planet.trim(),

        strengthScore:
          typeof planet.strengthScore === "number"
            ? planet.strengthScore
            : undefined,

        dignity:
          typeof planet.dignity === "string"
            ? planet.dignity
            : undefined,

        influenceScore:
          typeof planet.influenceScore === "number"
            ? planet.influenceScore
            : undefined,

      })
    );

}





//////////////////////////////////////////////////////////////
// REMEDY INTELLIGENCE
//
// Flow:
//
// Existing Prediction Engine output
//        ↓
// Planetary influence
//        ↓
// Remedy Knowledge Provider
//        ↓
// Remedy Resolver
//        ↓
// ResolvedRemedy
//
// NO calculation.
// NO mantra generation.
// NO remedy generation.
//
//////////////////////////////////////////////////////////////


async function runRemedyIntelligence(
  horoscope:
    HoroscopeResult,
  zodiacSign:
    string | undefined,
  language:
    HoroscopeLanguage
): Promise<HoroscopeWithRemedy> {

  try {

    //////////////////////////////////////////////////////////
    // STEP 1
    //
    // Read already-known planetary influences.
    //////////////////////////////////////////////////////////

    const planetaryInfluences =
      getPlanetaryInfluences(
        horoscope
      );


    //////////////////////////////////////////////////////////
    // STEP 2
    //
    // Load remedy knowledge.
    //
    // The provider owns the knowledge source.
    // The service does not invent it.
    //////////////////////////////////////////////////////////

    const remedies =
      await remedyKnowledgeProvider({

        zodiacSign,

        language,

      });


    if (
      !Array.isArray(remedies)
      ||
      !remedies.length
      ||
      !planetaryInfluences.length
    ) {

      return {

        ...(horoscope as HoroscopeResult),

        remedyIntelligence: {

          available:
            false,

          remedies:
            [],

        },

      };

    }


    //////////////////////////////////////////////////////////
    // STEP 3
    //
    // Resolve remedies for every relevant planet.
    //
    // Resolver performs deterministic knowledge matching.
    //////////////////////////////////////////////////////////

    const resolvedRemedies:
      ResolvedRemedy[] = [];


    for (
      const influence
      of planetaryInfluences
    ) {

      const resolved =
        resolveCmsRemedies({

          remedies,

          planet:
            influence.planet,

          zodiacSign,

          strengthScore:
            influence.strengthScore,

          dignity:
            influence.dignity,

          limit:
            1,

        });


      resolvedRemedies.push(
        ...resolved
      );

    }


    //////////////////////////////////////////////////////////
    // STEP 4
    //
    // Deduplicate remedies.
    //
    // Same remedy may match more than one influence.
    //////////////////////////////////////////////////////////

    const uniqueRemedies =
      Array.from(

        new Map(

          resolvedRemedies.map(
            remedy => [

              `${remedy.source?.slug ?? ""}:${remedy.source?.planet ?? ""}`,

              remedy,

            ]
          )

        ).values()

      );


    //////////////////////////////////////////////////////////
    // STEP 5
    //
    // Return horoscope with resolved remedy intelligence.
    //////////////////////////////////////////////////////////

    return {

      ...(horoscope as HoroscopeResult),

      remedyIntelligence: {

        available:
          uniqueRemedies.length > 0,

        remedies:
          uniqueRemedies,

      },

    };

  }

  catch (error) {

    //////////////////////////////////////////////////////////
    // Remedy failure must NOT destroy horoscope generation.
    //////////////////////////////////////////////////////////

    console.error(

      "[HOROSCOPE_REMEDY_INTELLIGENCE_ERROR]",

      error

    );


    return {

      ...(horoscope as HoroscopeResult),

      remedyIntelligence: {

        available:
          false,

        remedies:
          [],

      },

    };

  }

}





//////////////////////////////////////////////////////////////
// AI ENHANCEMENT SAFE WRAPPER
//
// AI remains editorial only.
//
// It must not replace:
// - Astro calculation
// - Prediction Engine
// - Remedy knowledge
//
//////////////////////////////////////////////////////////////


async function runAIEnhancement(
  horoscope:
    HoroscopeResult
): Promise<HoroscopeResult> {

  try {

    return await enhanceHoroscopeWithAI(
      horoscope
    );

  }

  catch (error) {

    console.error(

      "[HOROSCOPE_AI_SERVICE_ERROR]",

      error

    );


    return horoscope;

  }

}





//////////////////////////////////////////////////////////////
// MAIN HOROSCOPE GENERATOR
//////////////////////////////////////////////////////////////


export async function generateHoroscope(

  input:
    HoroscopeServiceInput

): Promise<HoroscopeResult> {


  ////////////////////////////////////////////////////////////
  // STEP 0
  // NORMALIZE DATE
  ////////////////////////////////////////////////////////////

  const date =
    normalizeDate(
      input.horoscopeDate
    );


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
  // STEP 1
  // RESOLVE LANGUAGE
  ////////////////////////////////////////////////////////////

  const language =
    resolveLanguage(
      input.language
    );


  ////////////////////////////////////////////////////////////
  // STEP 2
  // BUILD ENGINE REQUEST
  ////////////////////////////////////////////////////////////

  const request:
    HoroscopeRequest =
  {

    date,

    language,

    zodiacSign:
      input.zodiacSign,

  };


  ////////////////////////////////////////////////////////////
  // STEP 3
  // DETERMINISTIC ASTRO + PREDICTION ENGINE
  //
  // SOURCE OF TRUTH
  ////////////////////////////////////////////////////////////

  const horoscope =
    await runAstroEngine(
      request
    );


  console.log(

    "🔥 RAW ASTRO / PREDICTION OUTPUT",

    {

      zodiac:
        request.zodiacSign,

      planets:
        (horoscope as any)?.planets,

      planetaryPredictions:
        (horoscope as any)
          ?.prediction
          ?.planetaryPredictions
          ?.length
        ?? 0,

    }

  );


  ////////////////////////////////////////////////////////////
  // STEP 4
  // REMEDY INTELLIGENCE
  //
  // Engine/Prediction output decides the planetary context.
  //
  // Remedy knowledge is resolved from the knowledge provider.
  //
  ////////////////////////////////////////////////////////////

  const withRemedies =
    await runRemedyIntelligence(

      horoscope,

      input.zodiacSign,

      language

    );


  console.log(

    "🪬 HOROSCOPE REMEDY INTELLIGENCE",

    {

      zodiac:
        input.zodiacSign,

      available:
        withRemedies
          .remedyIntelligence
          ?.available
        ?? false,

      remedyCount:
        withRemedies
          .remedyIntelligence
          ?.remedies
          ?.length
        ?? 0,

      remedies:
        withRemedies
          .remedyIntelligence
          ?.remedies
          ?.map(
            remedy => ({

              planet:
                remedy.source?.planet,

              slug:
                remedy.source?.slug,

              category:
                remedy.category,

              title:
                remedy.title,

            })
          ),

    }

  );


  ////////////////////////////////////////////////////////////
  // STEP 5
  // NATIONPATH AI PREMIUM EDITORIAL LAYER
  //
  // AI receives the already-resolved horoscope.
  //
  // AI does not generate remedy knowledge.
  //
  ////////////////////////////////////////////////////////////

  const enhanced =
    await runAIEnhancement(

      withRemedies

    );


  ////////////////////////////////////////////////////////////
  // STEP 6
  // FINAL RESULT
  ////////////////////////////////////////////////////////////

  return enhanced;

}





//////////////////////////////////////////////////////////////
// BACKWARD COMPATIBILITY
//////////////////////////////////////////////////////////////


export async function createHoroscope(

  input:
    HoroscopeServiceInput

): Promise<HoroscopeResult> {

  return generateHoroscope(
    input
  );

}





//////////////////////////////////////////////////////////////
// DEFAULT EXPORT
//////////////////////////////////////////////////////////////


export default {

  generateHoroscope,

  createHoroscope,

  setHoroscopeRemedyKnowledgeProvider,

};


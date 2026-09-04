//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO HOROSCOPE
//
// REMEDY INTELLIGENCE RESOLVER
//
// Production / Future-Proof Version
//
// Flow:
//
// Planetary Influence
//        ↓
// Remedy Context
//        ↓
// Published Remedy Knowledge
//        ↓
// Planet + Category Matching
//        ↓
// Deterministic Relevance Ranking
//        ↓
// ResolvedRemedy
//
// IMPORTANT:
// - No astronomy
// - No calculations
// - No prediction generation
// - No AI generation
// - No hardcoded mantra
// - No hardcoded remedy knowledge
// - No database access
// - No CMS access
//
// The resolver receives remedy knowledge from the service layer.
// Remedy-specific content always originates from Remedy CMS.
//
// Future connection:
//
// Astro Engine
//      ↓
// Prediction Engine
//      ↓
// Planetary Influence
//      ↓
// Remedy Intelligence
//      ↓
// Remedy Resolver
//      ↓
// HoroscopeResult.remedyIntelligence
//
//////////////////////////////////////////////////////////////

import type {
  RemedyCategory,
  RemedyContext,
  RemedyKnowledge,
  ResolvedRemedy,
} from "./types";

import {
  isPublishedRemedy,
  isRelevantRemedy,
  sortRemediesByRelevance,
  uniqueRemedies,
  normalizeRemedyText,
  normalizeRemedyStringArray,
} from "./helpers";

import {
  normalizeRemedyPlanet,
} from "./rules";


//////////////////////////////////////////////////////////////
// RESOLVER OPTIONS
//////////////////////////////////////////////////////////////

export interface RemedyResolverOptions {

  /**
   * Published + draft remedy knowledge supplied
   * by the service layer.
   */
  remedies: RemedyKnowledge[];

  /**
   * Planetary influence received from the
   * astrology/prediction layer.
   */
  planet: string;

  /**
   * Optional requested remedy category.
   */
  category?: RemedyCategory;

  /**
   * Optional zodiac context.
   */
  zodiacSign?: string;

  /**
   * Existing planetary strength.
   *
   * Resolver does NOT calculate this.
   */
  strengthScore?: number;

  /**
   * Existing planetary dignity.
   *
   * Resolver does NOT calculate this.
   */
  dignity?: string;

  /**
   * Maximum number of remedies to return.
   */
  limit?: number;

}


//////////////////////////////////////////////////////////////
// BUILD REMEDY CONTEXT
//////////////////////////////////////////////////////////////

export function createRemedyContext(

  planet: string,

  category?: RemedyCategory,

  zodiacSign?: string,

  strengthScore?: number,

  dignity?: string

): RemedyContext {

  return {

    planet:
      normalizeRemedyPlanet(
        planet
      ),

    category,

    zodiacSign:
      normalizeRemedyText(
        zodiacSign
      ) || undefined,

    strengthScore,

    dignity:
      normalizeRemedyText(
        dignity
      ) || undefined,

  };

}


//////////////////////////////////////////////////////////////
// FILTER PUBLISHED REMEDIES
//////////////////////////////////////////////////////////////

function getPublishedRemedies(

  remedies: RemedyKnowledge[]

): RemedyKnowledge[] {

  return remedies.filter(
    remedy =>
      isPublishedRemedy(
        remedy
      )
  );

}


//////////////////////////////////////////////////////////////
// RESOLVE REMEDIES
//
// This function only resolves existing knowledge.
//
// It does NOT create a remedy.
//
// It does NOT create a mantra.
//
// It does NOT calculate planetary weakness.
//
// It does NOT decide astrology.
//
// The planetary context has already been established
// upstream by the Astro / Prediction system.
//
//////////////////////////////////////////////////////////////

export function resolveRemedies(

  options: RemedyResolverOptions

): RemedyKnowledge[] {

  const {

    remedies,

    planet,

    category,

    limit = 5,

  } = options;


  ////////////////////////////////////////////////////////////
  // INPUT SAFETY
  ////////////////////////////////////////////////////////////

  if (
    !planet ||
    !Array.isArray(remedies) ||
    !remedies.length
  ) {

    return [];

  }


  ////////////////////////////////////////////////////////////
  // BUILD CONTEXT
  ////////////////////////////////////////////////////////////

  const context =
    createRemedyContext(

      planet,

      category,

      options.zodiacSign,

      options.strengthScore,

      options.dignity

    );


  if (
    !context.planet
  ) {

    return [];

  }


  ////////////////////////////////////////////////////////////
  // ONLY PUBLISHED KNOWLEDGE
  ////////////////////////////////////////////////////////////

  const published =
    getPublishedRemedies(
      remedies
    );


  ////////////////////////////////////////////////////////////
  // PLANET + CATEGORY RELEVANCE
  ////////////////////////////////////////////////////////////

  const relevant =
    published.filter(
      remedy =>
        isRelevantRemedy(
          remedy,
          context
        )
    );


  ////////////////////////////////////////////////////////////
  // REMOVE DUPLICATES
  ////////////////////////////////////////////////////////////

  const unique =
    uniqueRemedies(
      relevant
    );


  ////////////////////////////////////////////////////////////
  // DETERMINISTIC RANKING
  ////////////////////////////////////////////////////////////

  const ranked =
    sortRemediesByRelevance(
      unique,
      context
    );


  ////////////////////////////////////////////////////////////
  // SAFE LIMIT
  ////////////////////////////////////////////////////////////

  const safeLimit =
    Number.isFinite(limit)
      ? Math.max(
          1,
          Math.floor(limit)
        )
      : 5;


  return ranked.slice(
    0,
    safeLimit
  );

}


//////////////////////////////////////////////////////////////
// RESOLVE SINGLE BEST REMEDY
//////////////////////////////////////////////////////////////

export function resolvePrimaryRemedy(

  options: RemedyResolverOptions

): RemedyKnowledge | null {

  const remedies =
    resolveRemedies({

      ...options,

      limit: 1,

    });


  return remedies[0] ?? null;

}


//////////////////////////////////////////////////////////////
// RESOLVE REMEDIES BY CATEGORY
//////////////////////////////////////////////////////////////

export function resolveRemediesByCategory(

  remedies: RemedyKnowledge[],

  planet: string,

  category: RemedyCategory,

  limit = 5

): RemedyKnowledge[] {

  return resolveRemedies({

    remedies,

    planet,

    category,

    limit,

  });

}


//////////////////////////////////////////////////////////////
// NORMALIZE OPTIONAL ARRAY
//////////////////////////////////////////////////////////////

function normalizeOptionalArray(

  value?: string[]

): string[] | undefined {

  const normalized =
    normalizeRemedyStringArray(
      value
    );

  return normalized.length
    ? normalized
    : undefined;

}


//////////////////////////////////////////////////////////////
// BUILD RESOLVED REMEDY
//
// Converts RemedyKnowledge into the public
// ResolvedRemedy contract.
//
// ALL remedy-specific information comes directly
// from RemedyKnowledge.
//
// No remedy-specific text is invented here.
//
//////////////////////////////////////////////////////////////

export function buildResolvedRemedy(

  remedy: RemedyKnowledge | null,

  planet?: string,

  zodiacSign?: string

): ResolvedRemedy | null {


  ////////////////////////////////////////////////////////////
  // NO MATCH
  ////////////////////////////////////////////////////////////

  if (
    !remedy
  ) {

    return null;

  }


  ////////////////////////////////////////////////////////////
  // NORMALIZED PLANET
  ////////////////////////////////////////////////////////////

  const normalizedPlanet =
    normalizeRemedyPlanet(
      planet
    );


  ////////////////////////////////////////////////////////////
  // TITLE
  ////////////////////////////////////////////////////////////

  const title =
    normalizeRemedyText(
      remedy.remedy
    );


  if (
    !title
  ) {

    return null;

  }


  ////////////////////////////////////////////////////////////
  // PRACTICE
  //
  // CMS procedure is preferred.
  // Description is only fallback.
  //
  ////////////////////////////////////////////////////////////

  const practice =
    normalizeRemedyText(
      remedy.procedure
    ) ||

    normalizeRemedyText(
      remedy.description
    );


  ////////////////////////////////////////////////////////////
  // GUIDANCE
  //
  // CMS description is preferred.
  // Procedure is fallback.
  //
  ////////////////////////////////////////////////////////////

  const guidance =
    normalizeRemedyText(
      remedy.description
    ) ||

    normalizeRemedyText(
      remedy.procedure
    );


  ////////////////////////////////////////////////////////////
  // CONTEXTUAL REASON
  //
  // This is resolver metadata.
  //
  // It does NOT create:
  // - mantra
  // - ritual
  // - benefit
  // - timing
  // - gemstone
  // - remedy instruction
  //
  ////////////////////////////////////////////////////////////

  const reason =
    normalizedPlanet

      ? `This remedy is associated with ${normalizedPlanet} and was resolved from published remedy knowledge.`

      : "This remedy was resolved from published remedy knowledge relevant to the current planetary influence.";


  ////////////////////////////////////////////////////////////
  // SOURCE METADATA
  ////////////////////////////////////////////////////////////

  const sourcePlanet =
    normalizedPlanet ||
    undefined;

  const sourceZodiac =
    normalizeRemedyText(
      zodiacSign
    ) ||
    undefined;


  ////////////////////////////////////////////////////////////
  // RESOLVED REMEDY
  ////////////////////////////////////////////////////////////

  return {

    category:
      remedy.category,

    title,

    practice,

    guidance,

    reason,


    //////////////////////////////////////////////////////////
    // MANTRA
    //
    // DIRECT CMS KNOWLEDGE ONLY.
    //
    // NEVER GENERATED.
    // NEVER HARDcoded.
    //////////////////////////////////////////////////////////

    mantra:
      normalizeRemedyText(
        remedy.mantra
      ) ||
      undefined,


    //////////////////////////////////////////////////////////
    // BENEFITS
    //////////////////////////////////////////////////////////

    benefits:
      normalizeOptionalArray(
        remedy.benefits
      ),


    //////////////////////////////////////////////////////////
    // PRECAUTIONS
    //////////////////////////////////////////////////////////

    precautions:
      normalizeOptionalArray(
        remedy.precautions
      ),


    //////////////////////////////////////////////////////////
    // AVOID FOR
    //////////////////////////////////////////////////////////

    avoidFor:
      normalizeOptionalArray(
        remedy.avoidFor
      ),


    //////////////////////////////////////////////////////////
    // SUITABLE FOR
    //////////////////////////////////////////////////////////

    suitableFor:
      normalizeOptionalArray(
        remedy.suitableFor
      ),


    //////////////////////////////////////////////////////////
    // MATERIALS
    //////////////////////////////////////////////////////////

    materials:
      normalizeOptionalArray(
        remedy.materials
      ),


    //////////////////////////////////////////////////////////
    // DURATION
    //////////////////////////////////////////////////////////

    duration:
      normalizeRemedyText(
        remedy.duration
      ) ||
      undefined,


    //////////////////////////////////////////////////////////
    // GEMSTONE
    //////////////////////////////////////////////////////////

    gemstone:
      normalizeRemedyText(
        remedy.gemstone
      ) ||
      undefined,


    //////////////////////////////////////////////////////////
    // METAL
    //////////////////////////////////////////////////////////

    metal:
      normalizeRemedyText(
        remedy.metal
      ) ||
      undefined,


    //////////////////////////////////////////////////////////
    // DAY
    //////////////////////////////////////////////////////////

    day:
      normalizeRemedyText(
        remedy.day
      ) ||
      undefined,


    //////////////////////////////////////////////////////////
    // COLOR
    //////////////////////////////////////////////////////////

    color:
      normalizeRemedyText(
        remedy.color
      ) ||
      undefined,


    //////////////////////////////////////////////////////////
    // MEDIA
    //////////////////////////////////////////////////////////

    media:
      remedy.media
        ? {

            image:
              normalizeRemedyText(
                remedy.media.image
              ) ||
              undefined,

            video:
              normalizeRemedyText(
                remedy.media.video
              ) ||
              undefined,

          }
        : undefined,


    //////////////////////////////////////////////////////////
    // SOURCE
    //////////////////////////////////////////////////////////

    source: {

      slug:
        normalizeRemedyText(
          remedy.slug
        ) ||
        undefined,

      planet:
        sourcePlanet,

      zodiacSign:
        sourceZodiac,

    },

  };

}


//////////////////////////////////////////////////////////////
// RESOLVE PRIMARY CMS REMEDY
//
// Despite the name, this function does NOT access CMS.
//
// "CMS" means the RemedyKnowledge supplied to the resolver
// originated from the CMS/service layer.
//
//////////////////////////////////////////////////////////////

export function resolvePrimaryCmsRemedy(

  options: RemedyResolverOptions

): ResolvedRemedy | null {

  const remedy =
    resolvePrimaryRemedy(
      options
    );


  return buildResolvedRemedy(

    remedy,

    options.planet,

    options.zodiacSign

  );

}


//////////////////////////////////////////////////////////////
// RESOLVE MULTIPLE CMS REMEDIES
//////////////////////////////////////////////////////////////

export function resolveCmsRemedies(

  options: RemedyResolverOptions

): ResolvedRemedy[] {

  const remedies =
    resolveRemedies(
      options
    );


  return remedies

    .map(
      remedy =>
        buildResolvedRemedy(

          remedy,

          options.planet,

          options.zodiacSign

        )
    )

    .filter(
      (
        remedy
      ): remedy is ResolvedRemedy =>
        Boolean(remedy)
    );

}


//////////////////////////////////////////////////////////////
// DEBUG INFORMATION
//
// Safe diagnostic information only.
//
// No remedy content generation.
//
//////////////////////////////////////////////////////////////

export function getRemedyResolverDebug(

  options: RemedyResolverOptions

) {

  const context =
    createRemedyContext(

      options.planet,

      options.category,

      options.zodiacSign,

      options.strengthScore,

      options.dignity

    );


  const published =
    getPublishedRemedies(
      options.remedies
    );


  const relevant =
    published.filter(
      remedy =>
        isRelevantRemedy(
          remedy,
          context
        )
    );


  const ranked =
    sortRemediesByRelevance(
      uniqueRemedies(
        relevant
      ),
      context
    );


  return {

    planet:
      context.planet,

    category:
      context.category,

    zodiacSign:
      context.zodiacSign,

    strengthScore:
      context.strengthScore,

    dignity:
      context.dignity,

    totalRemedies:
      options.remedies.length,

    publishedRemedies:
      published.length,

    relevantRemedies:
      relevant.length,

    matchedSlugs:
      ranked.map(
        remedy =>
          remedy.slug
      ),

  };

}


//////////////////////////////////////////////////////////////
// END OF REMEDY RESOLVER
//
// LOCKED RESPONSIBILITY:
//
// Resolver:
// - receives knowledge
// - validates published status
// - matches planetary relevance
// - applies category routing
// - ranks deterministic matches
// - returns normalized remedy
//
// Resolver DOES NOT:
// - calculate planets
// - calculate weakness
// - generate predictions
// - generate mantra
// - generate remedy
// - call AI
// - call MongoDB
// - call CMS
//
// Therefore:
//
// "Jupiter → mantra"
// is NOT hardcoded here.
//
// Instead:
//
// Jupiter influence
//      ↓
// resolver context = Jupiter
//      ↓
// RemedyKnowledge.relatedPlanets includes Jupiter
//      ↓
// matching published remedy
//      ↓
// RemedyKnowledge.mantra
//      ↓
// ResolvedRemedy.mantra
//
// The actual mantra remains knowledge data.
//
//////////////////////////////////////////////////////////////
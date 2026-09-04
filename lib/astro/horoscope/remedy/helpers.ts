//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO HOROSCOPE
//
// REMEDY INTELLIGENCE HELPERS
//
// Purpose:
// Safe normalization and matching helpers for Remedy CMS.
//
// IMPORTANT:
// - No astronomy
// - No calculations
// - No prediction logic
// - No AI generation
// - No CMS database access
// - No remedy invention
//
// Actual remedy knowledge comes from RemedyIntelligence CMS.
//
//////////////////////////////////////////////////////////////

import type {
  RemedyCategory,
  RemedyContext,
  RemedyKnowledge,
} from "./types";

import {
  normalizeRemedyPlanet,
  isRemedyCategoryRelevant,
} from "./rules";


//////////////////////////////////////////////////////////////
// STRING NORMALIZATION
//////////////////////////////////////////////////////////////

export function normalizeRemedyText(
  value?: unknown
): string {

  if (
    typeof value !== "string"
  ) {
    return "";
  }

  return value
    .replace(/\s+/g, " ")
    .trim();

}


//////////////////////////////////////////////////////////////
// STRING ARRAY NORMALIZATION
//////////////////////////////////////////////////////////////

export function normalizeRemedyStringArray(
  value?: unknown
): string[] {

  if (
    !Array.isArray(value)
  ) {
    return [];
  }

  return Array.from(
    new Set(
      value
        .filter(
          item =>
            typeof item === "string"
        )
        .map(
          item =>
            normalizeRemedyText(item)
        )
        .filter(Boolean)
    )
  );

}


//////////////////////////////////////////////////////////////
// CASE-INSENSITIVE VALUE MATCH
//////////////////////////////////////////////////////////////

function normalizeMatchValue(
  value?: string
): string {

  return normalizeRemedyText(
    value
  )
    .toLowerCase();

}


//////////////////////////////////////////////////////////////
// ARRAY CONTAINS MATCH
//////////////////////////////////////////////////////////////

function arrayContainsValue(
  values: string[] | undefined,
  target?: string
): boolean {

  if (
    !target ||
    !values?.length
  ) {
    return false;
  }

  const normalizedTarget =
    normalizeMatchValue(
      target
    );

  return values.some(
    value =>
      normalizeMatchValue(
        value
      ) === normalizedTarget
  );

}


//////////////////////////////////////////////////////////////
// NORMALIZE CMS REMEDY
//////////////////////////////////////////////////////////////

export function normalizeRemedyKnowledge(
  record?: any
): RemedyKnowledge | null {

  if (
    !record
  ) {
    return null;
  }

  const remedy =
    normalizeRemedyText(
      record.remedy
    );

  const slug =
    normalizeRemedyText(
      record.slug
    )
    .toLowerCase();

  if (
    !remedy ||
    !slug
  ) {
    return null;
  }

  const category =
    normalizeRemedyText(
      record.category
    ) as RemedyCategory;

  const validCategories:
    RemedyCategory[] = [
      "mantra",
      "puja",
      "daan",
      "gemstone",
      "lifestyle",
      "other",
    ];

  const safeCategory =
    validCategories.includes(
      category
    )
      ? category
      : "other";

  return {

    remedy,

    slug,

    category:
      safeCategory,

    relatedPlanets:
      normalizeRemedyStringArray(
        record.relatedPlanets
      ),

    relatedDoshas:
      normalizeRemedyStringArray(
        record.relatedDoshas
      ),

    relatedProblems:
      normalizeRemedyStringArray(
        record.relatedProblems
      ),

    description:
      normalizeRemedyText(
        record.description
      ),

    benefits:
      normalizeRemedyStringArray(
        record.benefits
      ),

    procedure:
      normalizeRemedyText(
        record.procedure
      ),

    materials:
      normalizeRemedyStringArray(
        record.materials
      ),

    duration:
      normalizeRemedyText(
        record.duration
      ),

    precautions:
      normalizeRemedyStringArray(
        record.precautions
      ),

    suitableFor:
      normalizeRemedyStringArray(
        record.suitableFor
      ),

    avoidFor:
      normalizeRemedyStringArray(
        record.avoidFor
      ),

    mantra:
      normalizeRemedyText(
        record.mantra
      ),

    gemstone:
      normalizeRemedyText(
        record.gemstone
      ),

    metal:
      normalizeRemedyText(
        record.metal
      ),

    day:
      normalizeRemedyText(
        record.day
      ),

    color:
      normalizeRemedyText(
        record.color
      ),

    media: {

      image:
        normalizeRemedyText(
          record.media?.image
        ),

      video:
        normalizeRemedyText(
          record.media?.video
        ),

    },

    seo: {

      title:
        normalizeRemedyText(
          record.seo?.title
        ),

      description:
        normalizeRemedyText(
          record.seo?.description
        ),

      keywords:
        normalizeRemedyStringArray(
          record.seo?.keywords
        ),

    },

    status:
      record.status === "published"
        ? "published"
        : "draft",

  };

}


//////////////////////////////////////////////////////////////
// PUBLISHED REMEDY CHECK
//////////////////////////////////////////////////////////////

export function isPublishedRemedy(
  remedy?: RemedyKnowledge | null
): boolean {

  return (
    remedy?.status === "published"
  );

}


//////////////////////////////////////////////////////////////
// PLANET MATCH
//////////////////////////////////////////////////////////////

export function remedyMatchesPlanet(
  remedy: RemedyKnowledge,
  planet?: string
): boolean {

  if (
    !planet ||
    !remedy.relatedPlanets?.length
  ) {
    return false;
  }

  const normalizedPlanet =
    normalizeRemedyPlanet(
      planet
    );

  return remedy.relatedPlanets.some(
    relatedPlanet =>
      normalizeRemedyPlanet(
        relatedPlanet
      ) === normalizedPlanet
  );

}


//////////////////////////////////////////////////////////////
// CATEGORY MATCH
//////////////////////////////////////////////////////////////

export function remedyMatchesCategory(
  remedy: RemedyKnowledge,
  category: RemedyCategory
): boolean {

  return (
    remedy.category === category
  );

}


//////////////////////////////////////////////////////////////
// PLANET + CATEGORY RELEVANCE
//////////////////////////////////////////////////////////////

export function isRelevantRemedy(
  remedy: RemedyKnowledge,
  context: RemedyContext
): boolean {

  const planet =
    normalizeRemedyPlanet(
      context.planet
    );

  if (
    !planet
  ) {
    return false;
  }

  if (
    !remedyMatchesPlanet(
      remedy,
      planet
    )
  ) {
    return false;
  }

  return isRemedyCategoryRelevant(
    planet,
    remedy.category
  );

}


//////////////////////////////////////////////////////////////
// REMEDY MATCH SCORE
//
// This is ONLY a deterministic ordering score.
// It does not calculate astrology.
//
// Priority:
// 1. Planet match
// 2. Requested category relevance
// 3. Published status
// 4. Useful remedy content
//
//////////////////////////////////////////////////////////////

export function getRemedyMatchScore(
  remedy: RemedyKnowledge,
  context: RemedyContext
): number {

  let score = 0;

  const planet =
    normalizeRemedyPlanet(
      context.planet
    );

  if (
    remedyMatchesPlanet(
      remedy,
      planet
    )
  ) {
    score += 60;
  }

  if (
    context.category &&
    remedyMatchesCategory(
      remedy,
      context.category as RemedyCategory
    )
  ) {
    score += 20;
  }

  if (
    isPublishedRemedy(
      remedy
    )
  ) {
    score += 10;
  }

  if (
    remedy.mantra ||
    remedy.procedure ||
    remedy.description
  ) {
    score += 5;
  }

  if (
    remedy.avoidFor?.length ||
    remedy.precautions?.length
  ) {
    score += 5;
  }

  return score;

}


//////////////////////////////////////////////////////////////
// SORT REMEDIES BY RELEVANCE
//////////////////////////////////////////////////////////////

export function sortRemediesByRelevance(
  remedies: RemedyKnowledge[],
  context: RemedyContext
): RemedyKnowledge[] {

  return [
    ...remedies,
  ]
    .sort(
      (a, b) =>
        getRemedyMatchScore(
          b,
          context
        ) -
        getRemedyMatchScore(
          a,
          context
        )
    );

}


//////////////////////////////////////////////////////////////
// UNIQUE REMEDIES
//////////////////////////////////////////////////////////////

export function uniqueRemedies(
  remedies: RemedyKnowledge[]
): RemedyKnowledge[] {

  const seen =
    new Set<string>();

  return remedies.filter(
    remedy => {

      const key =
        remedy.slug
          .toLowerCase();

      if (
        seen.has(key)
      ) {
        return false;
      }

      seen.add(key);

      return true;

    }
  );

}


//////////////////////////////////////////////////////////////
// END OF REMEDY HELPERS
//////////////////////////////////////////////////////////////
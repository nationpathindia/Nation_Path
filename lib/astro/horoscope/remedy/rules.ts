//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO HOROSCOPE
//
// REMEDY INTELLIGENCE RULES
//
// Purpose:
// Determine which remedy knowledge is relevant to an
// already-known planetary influence.
//
// IMPORTANT:
// - No astronomy
// - No planetary calculations
// - No prediction generation
// - No mantra content
// - No hardcoded remedy knowledge
// - No CMS access
//
// Actual remedy content comes from RemedyIntelligence CMS.
//
//////////////////////////////////////////////////////////////

import type {
  RemedyCategory,
} from "./types";


//////////////////////////////////////////////////////////////
// PLANET REMEDY RULE
//////////////////////////////////////////////////////////////

export interface PlanetRemedyRule {

  planet: string;

  categories: RemedyCategory[];

}


//////////////////////////////////////////////////////////////
// PLANET → REMEDY CATEGORY RELEVANCE
//
// These are routing rules only.
//
// They do NOT select a specific remedy.
// They only tell the resolver which CMS categories are
// relevant when a planet becomes an active influence.
//
//////////////////////////////////////////////////////////////

export const PLANET_REMEDY_RULES:
  Record<string, PlanetRemedyRule> = {

  Sun: {

    planet: "Sun",

    categories: [
      "mantra",
      "puja",
      "daan",
      "lifestyle",
    ],

  },


  Moon: {

    planet: "Moon",

    categories: [
      "mantra",
      "puja",
      "daan",
      "lifestyle",
    ],

  },


  Mars: {

    planet: "Mars",

    categories: [
      "mantra",
      "puja",
      "daan",
      "lifestyle",
      "gemstone",
    ],

  },


  Mercury: {

    planet: "Mercury",

    categories: [
      "mantra",
      "puja",
      "daan",
      "lifestyle",
    ],

  },


  Jupiter: {

    planet: "Jupiter",

    categories: [
      "mantra",
      "puja",
      "daan",
      "lifestyle",
      "gemstone",
    ],

  },


  Venus: {

    planet: "Venus",

    categories: [
      "mantra",
      "puja",
      "daan",
      "lifestyle",
      "gemstone",
    ],

  },


  Saturn: {

    planet: "Saturn",

    categories: [
      "mantra",
      "puja",
      "daan",
      "lifestyle",
      "gemstone",
    ],

  },


  Rahu: {

    planet: "Rahu",

    categories: [
      "mantra",
      "puja",
      "daan",
      "lifestyle",
    ],

  },


  Ketu: {

    planet: "Ketu",

    categories: [
      "mantra",
      "puja",
      "daan",
      "lifestyle",
    ],

  },

};


//////////////////////////////////////////////////////////////
// PLANET NORMALIZATION
//////////////////////////////////////////////////////////////

export function normalizeRemedyPlanet(
  planet?: string
): string {

  if (!planet) {
    return "";
  }

  const normalized =
    planet
      .trim()
      .toLowerCase();

  const planets: Record<string, string> = {

    sun: "Sun",
    surya: "Sun",

    moon: "Moon",
    chandra: "Moon",

    mars: "Mars",
    mangal: "Mars",

    mercury: "Mercury",
    budh: "Mercury",

    jupiter: "Jupiter",
    guru: "Jupiter",

    venus: "Venus",
    shukra: "Venus",

    saturn: "Saturn",
    shani: "Saturn",

    rahu: "Rahu",

    ketu: "Ketu",

  };

  return planets[normalized] ?? planet.trim();

}


//////////////////////////////////////////////////////////////
// GET PLANET REMEDY RULE
//////////////////////////////////////////////////////////////

export function getPlanetRemedyRule(
  planet?: string
): PlanetRemedyRule | undefined {

  const normalizedPlanet =
    normalizeRemedyPlanet(
      planet
    );

  if (!normalizedPlanet) {
    return undefined;
  }

  return PLANET_REMEDY_RULES[
    normalizedPlanet
  ];

}


//////////////////////////////////////////////////////////////
// GET ALLOWED REMEDY CATEGORIES
//////////////////////////////////////////////////////////////

export function getRemedyCategoriesForPlanet(
  planet?: string
): RemedyCategory[] {

  const rule =
    getPlanetRemedyRule(
      planet
    );

  return rule?.categories ?? [];

}


//////////////////////////////////////////////////////////////
// CHECK CATEGORY RELEVANCE
//////////////////////////////////////////////////////////////

export function isRemedyCategoryRelevant(
  planet: string | undefined,
  category: RemedyCategory
): boolean {

  return getRemedyCategoriesForPlanet(
    planet
  ).includes(
    category
  );

}


//////////////////////////////////////////////////////////////
// END OF REMEDY RULES
//////////////////////////////////////////////////////////////
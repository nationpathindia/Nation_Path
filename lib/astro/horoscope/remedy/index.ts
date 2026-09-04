//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO HOROSCOPE
//
// REMEDY INTELLIGENCE MODULE
//
// Public exports only.
//
// IMPORTANT:
// - No astronomy
// - No calculations
// - No prediction generation
// - No AI generation
// - No database access
//
// CMS loading will remain in the service layer.
//
//////////////////////////////////////////////////////////////

export type {
  RemedyCategory,
  RemedyContext,
  RemedyKnowledge,
  ResolvedRemedy,
} from "./types";


export {
  normalizeRemedyText,
  normalizeRemedyStringArray,
  normalizeRemedyKnowledge,
  isPublishedRemedy,
  remedyMatchesPlanet,
  remedyMatchesCategory,
  isRelevantRemedy,
  getRemedyMatchScore,
  sortRemediesByRelevance,
  uniqueRemedies,
} from "./helpers";


export {
  normalizeRemedyPlanet,
  isRemedyCategoryRelevant,
  getRemedyCategoriesForPlanet,
} from "./rules";


export type {
  RemedyResolverOptions,
} from "./resolver";


export {
  createRemedyContext,
  resolveRemedies,
  resolvePrimaryRemedy,
  resolveRemediesByCategory,
  buildResolvedRemedy,
  resolvePrimaryCmsRemedy,
  resolveCmsRemedies,
  getRemedyResolverDebug,
} from "./resolver";


//////////////////////////////////////////////////////////////
// END OF PUBLIC REMEDY MODULE
//////////////////////////////////////////////////////////////


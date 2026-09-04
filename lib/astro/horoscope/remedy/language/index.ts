//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// REMEDY LANGUAGE INTELLIGENCE EXPORT HUB
//
// Premium Remedy Literature Layer
//
// FLOW:
//
// Real Astro / Remedy Intelligence
//          ↓
// Remedy Language Resolver
//          ↓
// Remedy Language Output
//          ↓
// Automation
//          ↓
// MongoDB Horoscope
//          ↓
// CMS API
//          ↓
// UI
//
// LOCKED RULES:
// - No calculations
// - No prediction rules
// - No astronomy
// - No CMS/database access
// - No automation logic
// - No AI generation
// - No hardcoded remedy knowledge
//
// This file is the public export boundary
// for the Remedy Language layer.
//
//////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////

export type {
  RemedyLanguageTone,
  RemedyLanguageContext,
  RemedyLanguageOutput,
  RemedyLanguageComposition,
} from "./types";


//////////////////////////////////////////////////////////////
// RESOLVER
//////////////////////////////////////////////////////////////

export {
  resolveRemedyLanguage,
  createRemedyLanguageContext,
  resolveRemedyTone,
} from "./resolver";


//////////////////////////////////////////////////////////////
// END OF REMEDY LANGUAGE EXPORT HUB
//////////////////////////////////////////////////////////////
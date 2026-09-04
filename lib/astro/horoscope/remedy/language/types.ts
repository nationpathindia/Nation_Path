//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// REMEDY LANGUAGE INTELLIGENCE TYPES
//
// Premium Remedy Literature Layer Contracts
//
// FLOW:
//
// ResolvedRemedy
//      ↓
// Remedy Language
//      ↓
// Automation
//      ↓
// MongoDB Horoscope
//      ↓
// CMS API
//      ↓
// UI
//
// IMPORTANT:
// - No astronomy
// - No calculations
// - No prediction rules
// - No CMS/database access
// - No AI generation
// - No hardcoded remedy knowledge
// - Remedy-specific content remains sourced from Resolver/CMS knowledge
//
//////////////////////////////////////////////////////////////

import type {
  ResolvedRemedy,
} from "../types";


//////////////////////////////////////////////////////////////
// REMEDY LANGUAGE LIFE AREA
//////////////////////////////////////////////////////////////

export type RemedyLanguageLifeArea =

  | "overall"

  | "personality"

  | "career"

  | "finance"

  | "relationship"

  | "health"

  | "mind"

  | "spirituality"

  | "education"

  | "communication"

  | "travel"

  | "research"

  | "ambition";


//////////////////////////////////////////////////////////////
// REMEDY LANGUAGE TONE
//////////////////////////////////////////////////////////////

export type RemedyLanguageTone =

  | "positive"

  | "neutral"

  | "caution";


//////////////////////////////////////////////////////////////
// REMEDY LANGUAGE CONTEXT
//
// Context supplied by the upstream intelligence layer.
//
// This layer receives an ALREADY RESOLVED remedy.
//
// It does NOT:
// - calculate planetary conditions
// - select remedies
// - access CMS
// - access database
// - generate AI content
//
//////////////////////////////////////////////////////////////

export interface RemedyLanguageContext {

  /**
   * Already-resolved remedy.
   *
   * SINGLE SOURCE OF TRUTH for remedy-specific
   * knowledge used by the language layer.
   */
  remedy:
    ResolvedRemedy;


  /**
   * Planetary influence associated with the
   * already-resolved remedy.
   */
  planet?:
    string;


  /**
   * Zodiac context supplied upstream.
   *
   * Narrative context only.
   */
  zodiacSign?:
    string;


  /**
   * Life area for which the remedy narrative
   * is being composed.
   */
  area:
    RemedyLanguageLifeArea;


  /**
   * Literary tone selected upstream.
   */
  tone:
    RemedyLanguageTone;


  /**
   * Actual strength received from upstream intelligence.
   *
   * Never calculated or modified here.
   */
  strengthScore?:
    number;


  /**
   * Planetary dignity received from upstream intelligence.
   *
   * Never calculated here.
   */
  dignity?:
    string;

}


//////////////////////////////////////////////////////////////
// REMEDY LANGUAGE METADATA
//////////////////////////////////////////////////////////////

export interface RemedyLanguageMetadata {

  planet?:
    string;

  zodiacSign?:
    string;

  area:
    RemedyLanguageLifeArea;

  tone:
    RemedyLanguageTone;

}


//////////////////////////////////////////////////////////////
// REMEDY LANGUAGE OUTPUT
//
// Literary interpretation of an already-resolved remedy.
//
// Remedy-specific facts must originate from ResolvedRemedy.
// The language layer does not invent remedy knowledge.
//
//////////////////////////////////////////////////////////////

export interface RemedyLanguageOutput {

  /**
   * Premium remedy headline.
   */
  headline:
    string;


  /**
   * Main narrative describing the already-resolved
   * remedy context.
   */
  description:
    string;


  /**
   * Practical guidance grounded in the
   * resolved remedy.
   */
  guidance:
    string;


  /**
   * Original resolved remedy.
   *
   * Preserved for downstream automation.
   */
  remedy:
    ResolvedRemedy;


  /**
   * Language metadata.
   */
  metadata:
    RemedyLanguageMetadata;

}


//////////////////////////////////////////////////////////////
// REMEDY LANGUAGE COMPOSITION
//
// Final narrative product passed to automation.
//
//////////////////////////////////////////////////////////////

export interface RemedyLanguageComposition {

  /**
   * Final premium headline.
   */
  headline:
    string;


  /**
   * Final remedy description.
   */
  description:
    string;


  /**
   * Final practical guidance.
   */
  guidance:
    string;


  /**
   * Actual resolved remedy data.
   *
   * This remains the source of remedy-specific
   * information.
   */
  remedy:
    ResolvedRemedy;


  /**
   * Composition metadata.
   */
  metadata:
    RemedyLanguageMetadata;

}


//////////////////////////////////////////////////////////////
// END OF REMEDY LANGUAGE TYPES
//////////////////////////////////////////////////////////////
//
// LOCKED.
//
// This file contains contracts only.
//
// Do not add:
// - planetary calculations
// - astrology rules
// - remedy selection logic
// - CMS/database access
// - AI generation
// - hardcoded remedy knowledge
//
// Resolver selects the remedy.
// Language layer expresses the selected remedy.
// Automation persists the final result.
//
//////////////////////////////////////////////////////////////
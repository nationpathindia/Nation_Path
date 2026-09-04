//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// LANGUAGE INTELLIGENCE TYPES
//
// Premium Literature Layer Contracts
//
// Responsibilities:
// - Planet literature output contract
// - Language context contract
// - Life-area routing
// - Tone routing
// - Real astro context routing
// - Final composition contract
//
// LOCKED RULES:
// - No calculations
// - No ephemeris
// - No astronomy
// - No prediction rules
// - No artificial planetary scoring
// - Strength score is received context only
// - Astro context is received context only
//////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////
// LIFE AREAS
//////////////////////////////////////////////////////////////

export type LanguageLifeArea =

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
// LANGUAGE TONE
//////////////////////////////////////////////////////////////

export type LanguageTone =

  | "positive"

  | "neutral"

  | "caution";



//////////////////////////////////////////////////////////////
// PLANET LANGUAGE RESULT
//////////////////////////////////////////////////////////////
//
// Output of the literature / language layer.
//
// IMPORTANT:
// This layer does NOT calculate planetary strength.
// It only receives contextual strength information
// from the prediction intelligence layer.
//
//////////////////////////////////////////////////////////////

export interface PlanetLanguageOutput {

  /**
   * Main premium horoscope statement.
   *
   * This is the primary sentence used by:
   * - headline
   * - prediction message
   * - narrative sections
   */
  statement:
    string;


  /**
   * Supporting explanation.
   *
   * Explains the meaning of the planetary influence
   * in the requested life area.
   */
  explanation:
    string;


  /**
   * Practical user guidance.
   *
   * This should be actionable and specific to the
   * planetary/life-area context.
   */
  advice:
    string;


  /**
   * Optional planetary strength received from the
   * prediction intelligence layer.
   *
   * The language layer MUST NOT calculate or modify
   * this value.
   */
  strengthScore?:
    number;

}



//////////////////////////////////////////////////////////////
// REAL ASTRO CONTEXT
//////////////////////////////////////////////////////////////
//
// Context supplied by the actual astrology calculation
// / prediction intelligence layer.
//
// IMPORTANT:
//
// This interface contains NO calculations.
//
// The language layer only reads values that already
// exist in the upstream astrology context.
//
// Missing values remain undefined.
//
// No fallback astrology is invented here.
//
//////////////////////////////////////////////////////////////

export interface PlanetAstroContext {

  /**
   * Rashi / zodiac placement of the planet.
   */
  rashi?: {

    /**
     * Human-readable Rashi name.
     *
     * Example:
     * Aries
     * Taurus
     */
    name?:
      string;


    /**
     * Raw sign identifier if available.
     *
     * Example:
     * aries
     * taurus
     */
    sign?:
      string;

  };


  /**
   * House placement supplied by the astrology layer.
   */
  house?: {

    /**
     * Actual house number.
     *
     * Example:
     * 1
     * 7
     * 10
     */
    number?:
      number;

  };


  /**
   * Whether the planet is actually retrograde.
   *
   * This value is received only.
   */
  retrograde?:
    boolean;


  /**
   * Nakshatra placement supplied by the
   * astrology calculation layer.
   */
  nakshatra?: {

    /**
     * Human-readable Nakshatra name.
     */
    name?:
      string;

  };

}



//////////////////////////////////////////////////////////////
// PLANET LANGUAGE CONTEXT
//////////////////////////////////////////////////////////////
//
// Context supplied to the language resolver.
//
// The resolver uses this information to select and
// contextualize appropriate literature.
//
// No astrology calculation belongs here.
//
//////////////////////////////////////////////////////////////

export interface PlanetLanguageContext {

  /**
   * Planet identifier.
   *
   * Examples:
   * Sun
   * Moon
   * Mars
   * Mercury
   * Jupiter
   * Venus
   * Saturn
   * Rahu
   * Ketu
   */
  planet:
    string;


  /**
   * Life area being composed.
   */
  area:
    LanguageLifeArea;


  /**
   * Literary tone selected by the intelligence layer.
   */
  tone:
    LanguageTone;


  /**
   * Optional planetary strength.
   *
   * Source:
   * Prediction / Astro intelligence layer.
   *
   * NOT calculated here.
   */
  strengthScore?:
    number;


  /**
   * Optional zodiac identity.
   *
   * Used only as narrative context.
   *
   * Must never become an artificial score modifier.
   */
  zodiac?:
    string;


  /**
   * Optional intelligence keywords.
   *
   * These may be supplied by the prediction layer
   * to improve literary relevance.
   */
  keywords?:
    string[];


  /**
   * Optional REAL astro context.
   *
   * Supplied by the upstream astrology / prediction
   * intelligence layer.
   *
   * The language layer only reads this information.
   *
   * It MUST NOT:
   * - calculate it
   * - modify it
   * - derive new astrology from it
   * - create fallback astrology
   */
  astroContext?:
    PlanetAstroContext;

}



//////////////////////////////////////////////////////////////
// FINAL COMPOSED LANGUAGE
//////////////////////////////////////////////////////////////
//
// Output of the multi-planet literature composer.
//
// This is a narrative product, not an astrology
// calculation result.
//
//////////////////////////////////////////////////////////////

export interface LanguageComposition {

  /**
   * Final premium headline.
   */
  headline:
    string;


  /**
   * Final descriptive literature.
   *
   * May combine dominant and supporting influences.
   */
  description:
    string;


  /**
   * Final practical user guidance.
   */
  guidance:
    string;


  /**
   * Composition metadata.
   */
  metadata?: {

    /**
     * Primary planet responsible for the composition.
     */
    planet:
      string;


    /**
     * Life area of the composition.
     */
    area:
      LanguageLifeArea;


    /**
     * Literary tone.
     */
    tone:
      LanguageTone;


    /**
     * Optional supporting explanation.
     */
    explanation?:
      string;

  };

}



//////////////////////////////////////////////////////////////
// END OF LANGUAGE INTELLIGENCE TYPES
//////////////////////////////////////////////////////////////
//
// LOCKED.
//
// This file contains contracts only.
//
// Do not add:
// - planetary calculations
// - zodiac scoring
// - prediction rules
// - ephemeris data
// - astronomy logic
//
// Strength and astro context values remain INPUTS from
// the upstream prediction / astrology intelligence layer.
//
// Language layer remains responsible only for
// premium literary expression.
//
//////////////////////////////////////////////////////////////


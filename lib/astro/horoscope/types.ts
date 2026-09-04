//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// Future Proof Horoscope Type System
//
// LOCKED
//
// Calculation
// Astronomy
// Rashi
// Nakshatra
// Houses
// Dasha
// D1 / D9
// Yoga
// Dosha
// Analysis
// Influence
// Interpretation
// Language Intelligence
// Remedy Intelligence
// Prediction
// Compatibility
//
// No CMS logic.
// No AI generation.
// No UI logic.
//
//////////////////////////////////////////////////////////////

import type {
  RashiInfo,
} from "../calculations/rashi";

import type {
  Planet,
} from "../client";

import type {
  CompatibilityResult,
} from "../types";

import type {
  PlanetInfluence,
} from "./influence";

import type {
  PlanetMetadata,
} from "./intelligence";

import type {
  PlanetStrengthResult,
} from "./strength";

import type {
  HoroscopeAnalysis,
} from "./analysis";

import type {
  HoroscopeInterpretation,
} from "./interpretation";

import type {
  HoroscopePrediction,
} from "./prediction";

import type {
  YogaAnalysis,
} from "../yoga/types";

import type {
  DoshaAnalysis,
} from "../dosha/types";

import type {
  LanguageComposition,
} from "./intelligence/language/types";

import type {
  RemedyIntelligenceResult,
} from "./remedy/types";


//////////////////////////////////////////////////////////////
// PLANET IDENTIFIER
//////////////////////////////////////////////////////////////

export type HoroscopePlanetId =
  | Planet
  | "Rahu"
  | "Ketu";


//////////////////////////////////////////////////////////////
// PLANET NAME
//////////////////////////////////////////////////////////////

export type PlanetName =
  | "Sun"
  | "Moon"
  | "Mars"
  | "Mercury"
  | "Jupiter"
  | "Venus"
  | "Saturn"
  | "Rahu"
  | "Ketu";


//////////////////////////////////////////////////////////////
// LANGUAGE SYSTEM
//////////////////////////////////////////////////////////////

export type HoroscopeLanguage =
  | "english"
  | "hindi"
  | "marathi"
  | "tamil"
  | "telugu"
  | "nepali"
  | "en"
  | "hi"
  | "ta"
  | "te"
  | "sa";


//////////////////////////////////////////////////////////////
// HOROSCOPE REQUEST
//////////////////////////////////////////////////////////////

export interface HoroscopeRequest {

  /**
   * Horoscope calculation date.
   */
  date: Date;

  /**
   * Requested output language / locale.
   */
  language?: HoroscopeLanguage;

  /**
   * Zodiac sign used by sign-based horoscope prediction.
   */
  zodiacSign?: string;

  /**
   * Future Kundli / birth-chart support.
   */
  birthDetails?: {

    date: Date;

    latitude: number;

    longitude: number;

    timezone?: string;

  };

}


//////////////////////////////////////////////////////////////
// PLANET DATA
//////////////////////////////////////////////////////////////

export interface HoroscopePlanet {

  /**
   * Planet identifier.
   */
  planet: HoroscopePlanetId;

  /**
   * Sidereal longitude in degrees.
   */
  longitude: number;

  /**
   * Retrograde state.
   */
  retrograde: boolean;

  /**
   * Rashi placement.
   */
  rashi: RashiInfo;

  /**
   * Planet Intelligence Database.
   */
  intelligence: PlanetMetadata;

  /**
   * Planet strength calculation.
   */
  strength: PlanetStrengthResult;

  /**
   * House placement.
   *
   * Available when birth details are supplied.
   */
  house?: {

    number: number;

    lord?: string;

  };

  /**
   * Nakshatra placement.
   */
  nakshatra?: {

    index: number;

    name: string;

    lord: string;

    pada: number;

    degree: number;

  };

}


//////////////////////////////////////////////////////////////
// PLANETARY SNAPSHOT
//////////////////////////////////////////////////////////////

export interface PlanetarySnapshot {

  sun: HoroscopePlanet;

  moon: HoroscopePlanet;

  mars: HoroscopePlanet;

  mercury: HoroscopePlanet;

  jupiter: HoroscopePlanet;

  venus: HoroscopePlanet;

  saturn: HoroscopePlanet;

  rahu: HoroscopePlanet;

  ketu: HoroscopePlanet;

}


//////////////////////////////////////////////////////////////
// HOROSCOPE SUMMARY
//////////////////////////////////////////////////////////////

export interface HoroscopeSummary {

  title: string;

  description: string;

  /**
   * Analytical themes.
   */
  themes?: string[];

  /**
   * General advice.
   */
  advice?: string[];

}


//////////////////////////////////////////////////////////////
// HOROSCOPE RESULT
//////////////////////////////////////////////////////////////

export interface HoroscopeResult {

  //////////////////////////////////////////////////////////////
  // BASIC INFORMATION
  //////////////////////////////////////////////////////////////

  date: Date;

  /**
   * Requested horoscope language / locale.
   *
   * Examples:
   * "en"
   * "hi"
   * "english"
   * "hindi"
   *
   * IMPORTANT:
   * This is only the requested language.
   * It is NOT LanguageComposition.
   */
  language: HoroscopeLanguage;


  //////////////////////////////////////////////////////////////
  // BASIC SIGNS
  //////////////////////////////////////////////////////////////

  /**
   * Sidereal Sun Rashi.
   */
  sunSign: RashiInfo;

  /**
   * Sidereal Moon Rashi.
   */
  moonSign: RashiInfo;

  /**
   * Ascendant / Lagna.
   *
   * Available when birth details are supplied.
   */
  ascendant?: {

    longitude: number;

    rashi: RashiInfo;

  };

  /**
   * Birth chart house data.
   *
   * Available when birth details are supplied.
   */
  houses?: {

    ascendant: number;

    mc: number;

    cusps: number[];

    houseSystem?: string;

  };


  //////////////////////////////////////////////////////////////
  // PLANETARY POSITIONS
  //////////////////////////////////////////////////////////////

  planets: PlanetarySnapshot;


  //////////////////////////////////////////////////////////////
  // DIVISIONAL CHARTS
  //////////////////////////////////////////////////////////////

  charts?: {

    /**
     * D1 / Rashi chart.
     */
    d1: {

      planets: PlanetarySnapshot;

      houses?: {

        ascendant: number;

        mc: number;

        cusps: number[];

        houseSystem?: string;

      };

    };

    /**
     * D9 / Navamsa chart.
     */
    d9: {

      type: "D9";

      planets: {

        planet: string;

        d1: {

          rashi: string;

          longitude: number;

        };

        d9: {

          rashi: string;

        };

        analysis: {

          dignity: string;

          strength: number;

          keywords: string[];

        };

      }[];

    };

  };


  //////////////////////////////////////////////////////////////
  // D1 + D9 COMBINED INTELLIGENCE
  //////////////////////////////////////////////////////////////

  d9Analysis?: {

    planet: string;

    d1: {

      rashi: string;

      strength: number;

    };

    d9: {

      rashi: string;

      strength: number;

    };

    result: {

      status: string;

      combinedStrength: number;

      keywords: string[];

    };

  }[];


  //////////////////////////////////////////////////////////////
  // YOGA / DOSHA
  //////////////////////////////////////////////////////////////

  yogas?: YogaAnalysis;

  doshas?: DoshaAnalysis;


  //////////////////////////////////////////////////////////////
  // NAKSHATRA ENGINE
  //
  // Phase 2
  //////////////////////////////////////////////////////////////

  nakshatra?: {

    moon?: {

      name: string;

      pada: number;

      longitude: number;

    };

    planets?: {

      planet: HoroscopePlanetId;

      name: string;

      pada: number;

      longitude: number;

    }[];

  };


  //////////////////////////////////////////////////////////////
  // VEDIC INTELLIGENCE ENGINE
  //
  // Phase 3
  //////////////////////////////////////////////////////////////

  vedicAnalysis?: {

    lagnaLord?: HoroscopePlanet;

    bhavaLords?: unknown[];

    yogas?: {

      name: string;

      description: string;

      planets: string[];

    }[];

    doshas?: {

      manglik?: boolean;

      kaalSarp?: boolean;

      grahan?: boolean;

    };

  };


  //////////////////////////////////////////////////////////////
  // DASHA ENGINE
  //
  // Phase 4
  //////////////////////////////////////////////////////////////

  dasha?: {

    current?: {

      mahadasha: string;

      antardasha: string;

      start?: Date;

      end?: Date;

    };

    vimshottari?: unknown[];

  };


  //////////////////////////////////////////////////////////////
  // ANALYTICAL INTELLIGENCE
  //////////////////////////////////////////////////////////////

  analysis?: HoroscopeAnalysis;


  //////////////////////////////////////////////////////////////
  // PLANET INFLUENCE
  //////////////////////////////////////////////////////////////

  influences: PlanetInfluence[];


  //////////////////////////////////////////////////////////////
  // INTERPRETATION ENGINE
  //////////////////////////////////////////////////////////////

  interpretation?: HoroscopeInterpretation;


  //////////////////////////////////////////////////////////////
  // LANGUAGE INTELLIGENCE
  //////////////////////////////////////////////////////////////
  //
  // `language` = requested language / locale.
  //
  // `languageIntelligence` = actual language /
  // literature intelligence output.
  //
  //////////////////////////////////////////////////////////////

  languageIntelligence?: LanguageComposition;


  //////////////////////////////////////////////////////////////
  // REMEDY INTELLIGENCE
  //////////////////////////////////////////////////////////////
  //
  // Receives already-resolved remedy intelligence.
  //
  // Remedy calculation/selection does NOT happen here.
  // CMS/database access does NOT happen here.
  //
  //////////////////////////////////////////////////////////////

  remedyIntelligence?: RemedyIntelligenceResult;


  //////////////////////////////////////////////////////////////
  // PREDICTION ENGINE
  //////////////////////////////////////////////////////////////

  prediction?: HoroscopePrediction;


  //////////////////////////////////////////////////////////////
  // BASIC RASHI COMPATIBILITY
  //////////////////////////////////////////////////////////////
  //
  // Basic zodiac-sign compatibility.
  //
  // Calculation source:
  // lib/astro/compatibility.ts
  //
  // Separate from:
  // - planetary compatibility
  // - Kundli matching
  // - Ashtakoota
  // - Guna Milan
  // - D1 / D9 marriage analysis
  //
  //////////////////////////////////////////////////////////////

  compatibility?: CompatibilityResult;


  //////////////////////////////////////////////////////////////
  // FUTURE PREDICTION MODULES
  //////////////////////////////////////////////////////////////

  predictions?: {

    career?: unknown;

    marriage?: unknown;

    finance?: unknown;

    health?: unknown;

    education?: unknown;

    yearly?: unknown;

  };


  //////////////////////////////////////////////////////////////
  // TRANSIT ENGINE
  //////////////////////////////////////////////////////////////

  transits?: {

    planet: HoroscopePlanetId;

    from: string;

    to: string;

  }[];


  //////////////////////////////////////////////////////////////
  // SCORING ENGINE
  //////////////////////////////////////////////////////////////

  overallScore?: number;


  //////////////////////////////////////////////////////////////
  // REPORT ENGINE
  //////////////////////////////////////////////////////////////

  report?: {

    generatedAt?: Date;

    format?: "pdf" | "json";

    version?: string;

  };


  //////////////////////////////////////////////////////////////
  // SUMMARY
  //////////////////////////////////////////////////////////////

  summary: HoroscopeSummary;

}


//////////////////////////////////////////////////////////////
// END OF TYPES
//////////////////////////////////////////////////////////////
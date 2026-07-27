//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
// Horoscope Prediction Type System
// Future Proof Prediction Architecture v3
//////////////////////////////////////////////////////////////


import type {

  HoroscopeLanguage,

} from "../types";





//////////////////////////////////////////////////////////////
// PREDICTION CATEGORY
//////////////////////////////////////////////////////////////

export type PredictionCategory =

  | "overall"
  | "personality"
  | "career"
  | "finance"
  | "relationship"
  | "health"
  | "mind"
  | "spirituality"
  | "energy"
  | "responsibility"
  | "ambition"
  | "education"
  | "communication"
  | "travel"
  | "family"
  | "comfort"
  | "research";

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
// PREDICTION SOURCE
//////////////////////////////////////////////////////////////

export type PredictionSource =

  | "strength"

  | "dignity"

  | "intelligence"

  | "rashi"

  | "retrograde"

  | "transit"

  | "nakshatra"

  | "house"

  | "aspect"

  | "yoga"

  | "dasha"

  | "dosha"

  | "compatibility"

  | "predictionEngine";








//////////////////////////////////////////////////////////////
// PREDICTION MESSAGE
//////////////////////////////////////////////////////////////
export interface PredictionMessage {


  category:

    PredictionCategory;



  title:

    string;



  prediction:

    string;



  keywords:

    string[];



  priority:

    number;



  /**
   * Prediction origin intelligence
   */

  source?:

    PredictionSource[];



  /**
   * Confidence scoring
   */

  confidence?:

    number;



  /**
   * Planetary influence weight
   */

  influenceScore?:

    number;



  /**
   * Short summary layer
   */

  summary?:

    string;



  /**
   * User actionable guidance
   */

guidance?:
  string;


  /**
   * Impact level
   */

  severity?:

    | "low"
    | "medium"
    | "high";



  /**
   * Additional AI / ranking metadata
   */

  tags?:

    string[];



  explanation?:

    string;



  recommendation?:

    string;



}

//////////////////////////////////////////////////////////////
// PLANET PREDICTION
//////////////////////////////////////////////////////////////

export interface PlanetPrediction {


  planet:

    string;



  strengthScore:

    number;



  dignity:

    string;



  message:

    string;



  positive:

    string[];



  caution:

    string[];



  keywords:

    string[];



  confidence?:

    number;



  influenceScore?:

    number;



  dominanceRank?:

    number;



}








//////////////////////////////////////////////////////////////
// LIFE AREA PREDICTION
//////////////////////////////////////////////////////////////

export interface LifePrediction {


  area:

    PredictionCategory;



  score:

    number;



  messages:

    PredictionMessage[];



  confidence?:

    number;



  dominantPlanet?:

    string;



  summary?:

    string;



  trend?:

    | "positive"

    | "challenging"

    | "balanced";


}








//////////////////////////////////////////////////////////////
// OPPORTUNITY / CAUTION ITEM
//////////////////////////////////////////////////////////////

export interface PredictionInsight {


  title:

    string;



  description:

    string;



  keywords:

    string[];



  priority:

    number;



  confidence?:

    number;



}








//////////////////////////////////////////////////////////////
// PREDICTION RANKING
//////////////////////////////////////////////////////////////

export interface PredictionRanking {


  title:

    string;



  category:

    PredictionCategory;



  score:

    number;



  confidence?:

    number;



  reason?:

    string;



}








//////////////////////////////////////////////////////////////
// NATURAL LANGUAGE NARRATIVE
//////////////////////////////////////////////////////////////

export interface PredictionNarrative {


  opening:

    string;



  development:

    string;



  advice:

    string;



  closing:

    string;



}








//////////////////////////////////////////////////////////////
// QUALITY CONTROL METADATA
//////////////////////////////////////////////////////////////
export interface PredictionQuality {


  duplicateRemoved:

    number;



  mergedPredictions:

    number;



  finalCount:

    number;



  /**
   * Overall prediction quality score
   */

  qualityScore?:

    number;



  /**
   * Message quality score
   */

  messageQuality?:

    number;



  /**
   * Insight quality score
   */

  insightQuality?:

    number;



  /**
   * Category balance score
   */

  balanceScore?:

    number;



}

//////////////////////////////////////////////////////////////
// FINAL HOROSCOPE PREDICTION
//////////////////////////////////////////////////////////////

export interface HoroscopePrediction {


  version?:

    string;



  language:

    HoroscopeLanguage;



  headline:

    string;



  overview:

    string;



  planetaryPredictions:

    PlanetPrediction[];



  lifePredictions:

    LifePrediction[];



  opportunities:

    PredictionInsight[];



  cautions:

    PredictionInsight[];



  guidance:

    string[];



  ////////////////////////////////////////////////////////////
  // INTELLIGENCE LAYERS
  ////////////////////////////////////////////////////////////


  predictionConfidence?:

    number;



  predictionRanking?:

    PredictionRanking[];



  naturalSummary?:

    string;



  narrative?:

    PredictionNarrative;



  quality?:

    PredictionQuality;



  generatedAt?:

    Date;



}
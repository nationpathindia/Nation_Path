//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// Prediction Type System v4.1
//
// Future Proof Intelligence Architecture
//
// Prediction Engine
// +
// Language Intelligence
// +
// Premium Reports
// +
// AI Enhancement
// +
// CMS Ready
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
  | "predictionEngine"
  | "languageEngine"
  | "aiEnhancement"
  | "cms";








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



  source?:

    PredictionSource[];



  confidence?:

    number;



  influenceScore?:

    number;



  summary?:

    string;



  explanation?:

    string;



  guidance?:

    string;



  recommendation?:

    string;



  challenge?:

    string;



  opportunity?:

    string;



  severity?:

    | "low"
    | "medium"
    | "high";



  tags?:

    string[];



  metadata?:

  {

    planet?:

      string;


    score?:

      number;


    tone?:

      "positive"
      |
      "neutral"
      |
      "caution";

  };


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



  language?:

  {

    statement:

      string;


    explanation:

      string;


    advice:

      string;

  };


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



  narrative?:

    string;


}








//////////////////////////////////////////////////////////////
// INSIGHT
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



  source?:

    PredictionSource[];



  type?:

    | "opportunity"
    | "caution";


}








//////////////////////////////////////////////////////////////
// RANKING
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



  impact?:

    | "low"
    | "medium"
    | "high";


}








//////////////////////////////////////////////////////////////
// NARRATIVE
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
// DOMINANT PLANET SUMMARY
//////////////////////////////////////////////////////////////

export interface DominantPlanetSummary {


  planet:

    string;



  strength:

    number;



  dignity:

    string;



  statement:

    string;



  explanation:

    string;



  advice:

    string;


}








//////////////////////////////////////////////////////////////
// LIFE AREA NARRATIVE
//////////////////////////////////////////////////////////////

export interface LifeAreaNarrative {


  area:

    PredictionCategory;



  score:

    number;



  headline:

    string;



  summary:

    string;



  guidance:

    string;



  planets?:

    string[];


}








//////////////////////////////////////////////////////////////
// PREDICTION BALANCE
//////////////////////////////////////////////////////////////

export interface PredictionBalance {


  positiveScore:

    number;



  cautionScore:

    number;



  balance:

    number;



  trend?:

    string;


}








//////////////////////////////////////////////////////////////
// ENGINE METADATA
//////////////////////////////////////////////////////////////

export interface PredictionEngineMetadata {


  engine:

    string;



  version:

    string;



  layers:

    string[];



  calculation:

    string;



  predictionMode:

    string;



  premiumReady:

    boolean;


}








//////////////////////////////////////////////////////////////
// QUALITY CONTROL
//////////////////////////////////////////////////////////////

export interface PredictionQuality {


  duplicateRemoved:

    number;



  mergedPredictions:

    number;



  finalCount:

    number;



  qualityScore?:

    number;



  messageQuality?:

    number;



  insightQuality?:

    number;



  balanceScore?:

    number;


}








//////////////////////////////////////////////////////////////
// FINAL HOROSCOPE PREDICTION RESPONSE
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




//////////////////////////////////////////////////////////////
// INTELLIGENCE LAYERS
//////////////////////////////////////////////////////////////


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






//////////////////////////////////////////////////////////////
// PREMIUM ENGINE OUTPUTS
//////////////////////////////////////////////////////////////

  dominantPlanetSummary?:

    DominantPlanetSummary[];



  lifeAreaNarrative?:

    LifeAreaNarrative[];



  predictionBalance?:

    PredictionBalance;



  engineMetadata?:

    PredictionEngineMetadata;






//////////////////////////////////////////////////////////////
// REQUEST META
//////////////////////////////////////////////////////////////

  zodiacSign?:

    string;



  generatedAt?:

    Date;



  engineVersion?:

    string;



  metadata?:

  {

    generatedBy?:

      "engine"
      |
      "ai"
      |
      "cms";



    cached?:

      boolean;



    requestId?:

      string;


  };


}
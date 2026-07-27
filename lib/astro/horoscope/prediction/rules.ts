//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
// Horoscope Prediction Rules
// Future Proof Intelligence Layer
//////////////////////////////////////////////////////////////


import type {
  PredictionCategory,
} from "./types";





//////////////////////////////////////////////////////////////
// PLANET PREDICTION THEMES
//////////////////////////////////////////////////////////////

export const PLANET_PREDICTION_THEMES:

Record<
  string,
  string[]
> = {


  Sun: [

    "leadership",

    "confidence",

    "authority",

    "recognition",

    "self expression",

  ],



  Moon: [

    "emotional intelligence",

    "mental clarity",

    "intuition",

    "creativity",

    "public connection",

  ],



  Mars: [

    "energy",

    "courage",

    "action",

    "competition",

    "determination",

  ],



  Mercury: [

    "communication",

    "learning",

    "business",

    "analysis",

    "planning",

  ],



  Jupiter: [

    "growth",

    "wisdom",

    "fortune",

    "knowledge",

    "expansion",

  ],



  Venus: [

    "relationships",

    "love",

    "creativity",

    "comfort",

    "luxury",

  ],



  Saturn: [

    "discipline",

    "responsibility",

    "patience",

    "career stability",

    "long term success",

  ],



  Rahu: [

    "innovation",

    "technology",

    "ambition",

    "foreign opportunities",

    "unexpected changes",

  ],



  Ketu: [

    "spirituality",

    "research",

    "intuition",

    "detachment",

    "inner growth",

  ],


};







//////////////////////////////////////////////////////////////
// PLANET LIFE AREA MAPPING
//////////////////////////////////////////////////////////////

export const PLANET_PREDICTION_AREAS:

Record<
  string,
  PredictionCategory[]
> = {



  Sun: [

    "overall",

    "personality",

    "career",

  ],



  Moon: [

    "mind",

    "relationship",

    "overall",

  ],



  Mars: [

    "energy",

    "personality",

    "career",

  ],



  Mercury: [

    "communication",

    "career",

    "finance",

    "education",

  ],



  Jupiter: [

    "overall",

    "career",

    "finance",

    "spirituality",

  ],



  Venus: [

    "relationship",

    "finance",

    "comfort",

  ],



  Saturn: [

    "career",

    "responsibility",

    "overall",

  ],



  Rahu: [

    "ambition",

    "career",

    "travel",

  ],



  Ketu: [

    "spirituality",

    "mind",

    "research",

  ],


};







//////////////////////////////////////////////////////////////
// SCORE THRESHOLDS
//////////////////////////////////////////////////////////////

export const PREDICTION_THRESHOLDS = {


  weak:
    40,



  moderate:
    60,



  strong:
    80,


};







//////////////////////////////////////////////////////////////
// DIGNITY INFLUENCE RULES
//////////////////////////////////////////////////////////////

export const DIGNITY_MODIFIERS:

Record<
  string,
  number
> = {


  exalted:
    20,


  own:
    15,


  friendly:
    10,


  neutral:
    0,


  enemy:
    -10,


  debilitated:
    -20,


};







//////////////////////////////////////////////////////////////
// RETROGRADE RULES
//////////////////////////////////////////////////////////////

export const RETROGRADE_EFFECTS = {


  positive:

    [

      "deep analysis",

      "internal reflection",

      "revision ability",

    ],



  caution:

    [

      "delay",

      "reconsideration",

      "slow progress",

    ],


};







//////////////////////////////////////////////////////////////
// PREDICTION MESSAGE PRIORITY
//////////////////////////////////////////////////////////////

export const PREDICTION_PRIORITY = {


  exceptional:
    90,


  strong:
    75,


  balanced:
    50,


  weak:
    30,


};

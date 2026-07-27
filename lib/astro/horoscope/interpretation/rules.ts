//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
// Horoscope Interpretation Intelligence Rules
//////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////
// PLANET POSITIVE THEMES
//////////////////////////////////////////////////////////////

export const PLANET_POSITIVE_THEMES: Record<
  string,
  string[]
> = {


  Sun: [

    "leadership",

    "confidence",

    "authority",

    "self expression",

    "recognition",

  ],


  Moon: [

    "emotional intelligence",

    "intuition",

    "mental strength",

    "creativity",

    "public connection",

  ],


  Mars: [

    "courage",

    "energy",

    "initiative",

    "competition",

    "determination",

  ],


  Mercury: [

    "communication",

    "learning",

    "analysis",

    "business skills",

    "intelligence",

  ],


  Jupiter: [

    "wisdom",

    "growth",

    "fortune",

    "knowledge",

    "guidance",

  ],


  Venus: [

    "relationships",

    "beauty",

    "creativity",

    "luxury",

    "harmony",

  ],


  Saturn: [

    "discipline",

    "patience",

    "responsibility",

    "long term success",

    "maturity",

  ],


  Rahu: [

    "innovation",

    "technology",

    "ambition",

    "foreign opportunities",

    "unconventional growth",

  ],


  Ketu: [

    "spiritual insight",

    "research ability",

    "detachment",

    "intuition",

    "inner wisdom",

  ],

};



//////////////////////////////////////////////////////////////
// PLANET CHALLENGE THEMES
//////////////////////////////////////////////////////////////

export const PLANET_CHALLENGE_THEMES: Record<
  string,
  string[]
> = {


  Sun: [

    "ego management",

    "authority conflicts",

    "self doubt",

  ],


  Moon: [

    "emotional fluctuations",

    "overthinking",

    "mental pressure",

  ],


  Mars: [

    "impulsiveness",

    "conflict",

    "aggression",

  ],


  Mercury: [

    "communication errors",

    "confusion",

    "over analysis",

  ],


  Jupiter: [

    "excess optimism",

    "misjudgment",

    "over expansion",

  ],


  Venus: [

    "relationship imbalance",

    "attachment",

    "luxury distractions",

  ],


  Saturn: [

    "delays",

    "pressure",

    "responsibility burden",

  ],


  Rahu: [

    "illusion",

    "obsession",

    "unrealistic desires",

  ],


  Ketu: [

    "detachment",

    "isolation",

    "lack of direction",

  ],

};



//////////////////////////////////////////////////////////////
// LIFE AREA PLANET MAPPING
//////////////////////////////////////////////////////////////

export const PLANET_LIFE_AREAS: Record<
  string,
  string[]
> = {


  Sun: [

    "personality",

    "career",

  ],


  Moon: [

    "mind",

    "relationship",

  ],


  Mars: [

    "career",

    "energy",

  ],


  Mercury: [

    "career",

    "finance",

  ],


  Jupiter: [

    "finance",

    "spirituality",

    "career",

  ],


  Venus: [

    "relationship",

    "finance",

  ],


  Saturn: [

    "career",

    "responsibility",

  ],


  Rahu: [

    "career",

    "ambition",

  ],


  Ketu: [

    "spirituality",

    "mind",

  ],

};



//////////////////////////////////////////////////////////////
// STRENGTH THRESHOLDS
//////////////////////////////////////////////////////////////

export const INTERPRETATION_THRESHOLDS = {


  veryStrong:
    85,


  strong:
    70,


  moderate:
    50,


  weak:
    40,


};
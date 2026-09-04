//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO HOROSCOPE
//
// REMEDY INTELLIGENCE KNOWLEDGE
//
// Purpose:
// Canonical remedy knowledge available to the Astro Remedy
// Intelligence Engine.
//
// IMPORTANT:
// - No astronomy
// - No calculations
// - No prediction generation
// - No AI generation
// - No CMS/database access
// - No dynamic selection logic
//
// This file contains KNOWLEDGE only.
//
// Selection is performed by:
// remedy/engine.ts
//
// Resolution is performed by:
// remedy/resolver.ts
//
// CMS is NOT read here.
//
// CMS may later store the final resolved horoscope result.
//
//////////////////////////////////////////////////////////////

import type {
  RemedyKnowledge,
} from "./types";


//////////////////////////////////////////////////////////////
// CANONICAL REMEDY KNOWLEDGE
//
// Structure:
//
// Planet
//    ↓
// Remedy knowledge
//
// The engine decides WHICH knowledge is relevant.
//
// This file does NOT inspect:
// - strength
// - dignity
// - influence score
// - prediction
// - transit
// - house
//
// Those decisions belong to the engine/rules layer.
//
//////////////////////////////////////////////////////////////

export const REMEDY_KNOWLEDGE:
  RemedyKnowledge[] = [

  ////////////////////////////////////////////////////////////
  // SUN
  ////////////////////////////////////////////////////////////

  {
    remedy:
      "Surya Mantra Practice",

    slug:
      "sun-surya-mantra",

    category:
      "mantra",

    relatedPlanets: [
      "Sun",
    ],

    description:
      "A traditional devotional practice associated with the Sun.",

    procedure:
      "Recite the prescribed Surya mantra with a calm and focused mind.",

    benefits: [
      "Supports a disciplined spiritual practice.",
      "Encourages focus and consistency.",
    ],

    suitableFor: [
      "Sun-related planetary guidance",
    ],

    precautions: [
      "Follow personal religious and spiritual preferences.",
    ],

    mantra:
      "Om Suryaya Namah",

    day:
      "Sunday",

    color:
      "Red",

    status:
      "published",
  },


  ////////////////////////////////////////////////////////////
  // MOON
  ////////////////////////////////////////////////////////////

  {
    remedy:
      "Chandra Mantra Practice",

    slug:
      "moon-chandra-mantra",

    category:
      "mantra",

    relatedPlanets: [
      "Moon",
    ],

    description:
      "A traditional devotional practice associated with the Moon.",

    procedure:
      "Recite the prescribed Chandra mantra with a calm and focused mind.",

    benefits: [
      "Supports a reflective spiritual practice.",
      "Encourages calm and consistency.",
    ],

    suitableFor: [
      "Moon-related planetary guidance",
    ],

    precautions: [
      "Follow personal religious and spiritual preferences.",
    ],

    mantra:
      "Om Chandraya Namah",

    day:
      "Monday",

    color:
      "White",

    status:
      "published",
  },


  ////////////////////////////////////////////////////////////
  // MARS
  ////////////////////////////////////////////////////////////

  {
    remedy:
      "Mangal Mantra Practice",

    slug:
      "mars-mangal-mantra",

    category:
      "mantra",

    relatedPlanets: [
      "Mars",
    ],

    description:
      "A traditional devotional practice associated with Mars.",

    procedure:
      "Recite the prescribed Mangal mantra with a calm and focused mind.",

    benefits: [
      "Supports disciplined spiritual practice.",
      "Encourages focused action.",
    ],

    suitableFor: [
      "Mars-related planetary guidance",
    ],

    precautions: [
      "Follow personal religious and spiritual preferences.",
    ],

    mantra:
      "Om Mangalaya Namah",

    day:
      "Tuesday",

    color:
      "Red",

    status:
      "published",
  },


  ////////////////////////////////////////////////////////////
  // MERCURY
  ////////////////////////////////////////////////////////////

  {
    remedy:
      "Budha Mantra Practice",

    slug:
      "mercury-budha-mantra",

    category:
      "mantra",

    relatedPlanets: [
      "Mercury",
    ],

    description:
      "A traditional devotional practice associated with Mercury.",

    procedure:
      "Recite the prescribed Budha mantra with a calm and focused mind.",

    benefits: [
      "Supports a focused spiritual practice.",
      "Encourages disciplined communication practice.",
    ],

    suitableFor: [
      "Mercury-related planetary guidance",
    ],

    precautions: [
      "Follow personal religious and spiritual preferences.",
    ],

    mantra:
      "Om Budhaya Namah",

    day:
      "Wednesday",

    color:
      "Green",

    status:
      "published",
  },


  ////////////////////////////////////////////////////////////
  // JUPITER
  ////////////////////////////////////////////////////////////

  {
    remedy:
      "Guru Mantra Practice",

    slug:
      "jupiter-guru-mantra",

    category:
      "mantra",

    relatedPlanets: [
      "Jupiter",
    ],

    description:
      "A traditional devotional practice associated with Jupiter.",

    procedure:
      "Recite the prescribed Guru mantra with a calm and focused mind.",

    benefits: [
      "Supports a reflective spiritual practice.",
      "Encourages learning and consistency.",
    ],

    suitableFor: [
      "Jupiter-related planetary guidance",
    ],

    precautions: [
      "Follow personal religious and spiritual preferences.",
    ],

    mantra:
      "Om Gurave Namah",

    day:
      "Thursday",

    color:
      "Yellow",

    status:
      "published",
  },


  ////////////////////////////////////////////////////////////
  // VENUS
  ////////////////////////////////////////////////////////////

  {
    remedy:
      "Shukra Mantra Practice",

    slug:
      "venus-shukra-mantra",

    category:
      "mantra",

    relatedPlanets: [
      "Venus",
    ],

    description:
      "A traditional devotional practice associated with Venus.",

    procedure:
      "Recite the prescribed Shukra mantra with a calm and focused mind.",

    benefits: [
      "Supports a consistent devotional practice.",
      "Encourages appreciation and balance.",
    ],

    suitableFor: [
      "Venus-related planetary guidance",
    ],

    precautions: [
      "Follow personal religious and spiritual preferences.",
    ],

    mantra:
      "Om Shukraya Namah",

    day:
      "Friday",

    color:
      "White",

    status:
      "published",
  },


  ////////////////////////////////////////////////////////////
  // SATURN
  ////////////////////////////////////////////////////////////

  {
    remedy:
      "Shani Mantra Practice",

    slug:
      "saturn-shani-mantra",

    category:
      "mantra",

    relatedPlanets: [
      "Saturn",
    ],

    description:
      "A traditional devotional practice associated with Saturn.",

    procedure:
      "Recite the prescribed Shani mantra with a calm and focused mind.",

    benefits: [
      "Supports disciplined spiritual practice.",
      "Encourages patience and consistency.",
    ],

    suitableFor: [
      "Saturn-related planetary guidance",
    ],

    precautions: [
      "Follow personal religious and spiritual preferences.",
    ],

    mantra:
      "Om Sham Shanicharaya Namah",

    day:
      "Saturday",

    color:
      "Black",

    status:
      "published",
  },


  ////////////////////////////////////////////////////////////
  // RAHU
  ////////////////////////////////////////////////////////////

  {
    remedy:
      "Rahu Mantra Practice",

    slug:
      "rahu-mantra",

    category:
      "mantra",

    relatedPlanets: [
      "Rahu",
    ],

    description:
      "A traditional devotional practice associated with Rahu.",

    procedure:
      "Recite the prescribed Rahu mantra with a calm and focused mind.",

    benefits: [
      "Supports a consistent devotional practice.",
      "Encourages focused spiritual reflection.",
    ],

    suitableFor: [
      "Rahu-related planetary guidance",
    ],

    precautions: [
      "Follow personal religious and spiritual preferences.",
    ],

    mantra:
      "Om Rahave Namah",

    day:
      "Saturday",

    color:
      "Dark Blue",

    status:
      "published",
  },


  ////////////////////////////////////////////////////////////
  // KETU
  ////////////////////////////////////////////////////////////

  {
    remedy:
      "Ketu Mantra Practice",

    slug:
      "ketu-mantra",

    category:
      "mantra",

    relatedPlanets: [
      "Ketu",
    ],

    description:
      "A traditional devotional practice associated with Ketu.",

    procedure:
      "Recite the prescribed Ketu mantra with a calm and focused mind.",

    benefits: [
      "Supports a reflective spiritual practice.",
      "Encourages focused spiritual discipline.",
    ],

    suitableFor: [
      "Ketu-related planetary guidance",
    ],

    precautions: [
      "Follow personal religious and spiritual preferences.",
    ],

    mantra:
      "Om Ketave Namah",

    day:
      "Tuesday",

    color:
      "Grey",

    status:
      "published",
  },

];


//////////////////////////////////////////////////////////////
// GET ALL KNOWLEDGE
//////////////////////////////////////////////////////////////

export function getRemedyKnowledge():
  RemedyKnowledge[] {

  return [
    ...REMEDY_KNOWLEDGE,
  ];

}


//////////////////////////////////////////////////////////////
// GET KNOWLEDGE FOR PLANET
//
// This is a simple knowledge lookup.
//
// It does NOT evaluate planetary strength,
// dignity, influence, prediction or timing.
//
//////////////////////////////////////////////////////////////

export function getRemedyKnowledgeForPlanet(
  planet: string
): RemedyKnowledge[] {

  const normalizedPlanet =
    planet
      .trim()
      .toLowerCase();

  if (!normalizedPlanet) {
    return [];
  }

  return REMEDY_KNOWLEDGE.filter(
    remedy =>
      remedy.relatedPlanets?.some(
        relatedPlanet =>
          relatedPlanet
            .trim()
            .toLowerCase()
          === normalizedPlanet
      )
  );

}


//////////////////////////////////////////////////////////////
// END OF REMEDY KNOWLEDGE
//////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// REMEDY LANGUAGE INTELLIGENCE RESOLVER
//
// Premium Remedy Literature Layer
//
// FLOW:
//
// ResolvedRemedy
//        ↓
// Literary Expression
//        ↓
// Automation
//        ↓
// MongoDB Horoscope
//        ↓
// CMS API
//        ↓
// UI
//
// IMPORTANT:
// - No astronomy
// - No calculations
// - No prediction rules
// - No remedy selection
// - No CMS/database access
// - No AI generation
// - No hardcoded mantra
// - No hardcoded remedy knowledge
//
//////////////////////////////////////////////////////////////

import type {
  ResolvedRemedy,
} from "../types";

import type {
  RemedyLanguageContext,
  RemedyLanguageOutput,
  RemedyLanguageTone,
  RemedyLanguageLifeArea,
} from "./types";


//////////////////////////////////////////////////////////////
// TEXT UTILITIES
//////////////////////////////////////////////////////////////

function cleanText(
  value: string
): string {

  return value
    .replace(/\s+/g, " ")
    .trim();

}


function capitalize(
  value: string
): string {

  if (!value) {
    return value;
  }

  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  );

}


//////////////////////////////////////////////////////////////
// PLANET NORMALIZER
//////////////////////////////////////////////////////////////

function normalizePlanet(
  planet?: string
): string {

  if (!planet) {
    return "";
  }

  return planet
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .split(" ")
    .map(capitalize)
    .join(" ");

}


//////////////////////////////////////////////////////////////
// TONE RESOLVER
//////////////////////////////////////////////////////////////

export function resolveRemedyTone(
  tone?: RemedyLanguageTone
): RemedyLanguageTone {

  return tone ?? "neutral";

}


//////////////////////////////////////////////////////////////
// CATEGORY LABEL
//////////////////////////////////////////////////////////////

function getCategoryLabel(
  category: ResolvedRemedy["category"]
): string {

  switch (category) {

    case "mantra":
      return "mantra practice";

    case "puja":
      return "devotional practice";

    case "daan":
      return "charitable practice";

    case "gemstone":
      return "gemstone practice";

    case "lifestyle":
      return "lifestyle practice";

    case "other":
    default:
      return "traditional practice";

  }

}


//////////////////////////////////////////////////////////////
// LIFE AREA LABEL
//////////////////////////////////////////////////////////////

function getLifeAreaLabel(
  area: RemedyLanguageLifeArea
): string {

  switch (area) {

    case "personality":
      return "personal development";

    case "career":
      return "career";

    case "finance":
      return "financial matters";

    case "relationship":
      return "relationships";

    case "health":
      return "well-being";

    case "mind":
      return "mental clarity";

    case "spirituality":
      return "spiritual growth";

    case "education":
      return "learning";

    case "communication":
      return "communication";

    case "travel":
      return "travel";

    case "research":
      return "research";

    case "ambition":
      return "ambition";

    case "overall":
    default:
      return "overall balance";

  }

}


//////////////////////////////////////////////////////////////
// STATEMENT BUILDER
//
// Frames the already-resolved remedy.
//
// No new remedy knowledge is introduced.
//
//////////////////////////////////////////////////////////////

function buildStatement(
  context: RemedyLanguageContext
): string {

  const remedy =
    context.remedy;

  const planet =
    normalizePlanet(
      context.planet ??
      remedy.source?.planet
    );

  const area =
    getLifeAreaLabel(
      context.area
    );

  const category =
    getCategoryLabel(
      remedy.category
    );

  const title =
    cleanText(
      remedy.title
    );

  if (planet) {

    return cleanText(
      `${planet} is connected with this ${category}, bringing attention to ${area}. ${title} is presented as a focused traditional practice within the available remedy guidance.`
    );

  }

  return cleanText(
    `${title} is presented as a ${category} for ${area}, based on the resolved remedy knowledge available for this context.`
  );

}


//////////////////////////////////////////////////////////////
// EXPLANATION BUILDER
//
// Priority:
//
// 1. Resolver reason
// 2. Resolver guidance
// 3. Resolver practice
// 4. Resolver description
//
// No invented remedy information.
//
//////////////////////////////////////////////////////////////

function buildExplanation(
  context: RemedyLanguageContext
): string {

  const remedy =
    context.remedy;

  if (
    typeof remedy.reason === "string" &&
    remedy.reason.trim()
  ) {

    return cleanText(
      remedy.reason
    );

  }

  if (
    typeof remedy.guidance === "string" &&
    remedy.guidance.trim()
  ) {

    return cleanText(
      remedy.guidance
    );

  }

  if (
    typeof remedy.practice === "string" &&
    remedy.practice.trim()
  ) {

    return cleanText(
      remedy.practice
    );

  }

  if (
    typeof remedy.description === "string" &&
    remedy.description.trim()
  ) {

    return cleanText(
      remedy.description
    );

  }

  return "";

}


//////////////////////////////////////////////////////////////
// GUIDANCE BUILDER
//
// Guidance remains completely grounded in
// ResolvedRemedy.
//
// No new ritual.
// No new mantra.
// No new timing.
// No new gemstone instruction.
// No invented benefit.
//
//////////////////////////////////////////////////////////////

function buildGuidance(
  context: RemedyLanguageContext
): string {

  const remedy =
    context.remedy;

  if (
    typeof remedy.practice === "string" &&
    remedy.practice.trim()
  ) {

    return cleanText(
      remedy.practice
    );

  }

  if (
    typeof remedy.guidance === "string" &&
    remedy.guidance.trim()
  ) {

    return cleanText(
      remedy.guidance
    );

  }

  if (
    typeof remedy.description === "string" &&
    remedy.description.trim()
  ) {

    return cleanText(
      remedy.description
    );

  }

  return cleanText(
    remedy.title
  );

}


//////////////////////////////////////////////////////////////
// DESCRIPTION COMPOSER
//
// Combines deterministic context framing with
// source-derived remedy explanation.
//
// The explanation remains untouched.
//
//////////////////////////////////////////////////////////////

function buildDescription(
  context: RemedyLanguageContext
): string {

  const statement =
    buildStatement(
      context
    );

  const explanation =
    buildExplanation(
      context
    );

  if (!explanation) {

    return statement;

  }

  return cleanText(
    `${statement} ${explanation}`
  );

}


//////////////////////////////////////////////////////////////
// MAIN LANGUAGE RESOLVER
//////////////////////////////////////////////////////////////

export function resolveRemedyLanguage(
  context: RemedyLanguageContext
): RemedyLanguageOutput {

  const tone =
    resolveRemedyTone(
      context.tone
    );

  const description =
    buildDescription(
      context
    );

  const guidance =
    buildGuidance(
      context
    );

  return {

    ////////////////////////////////////////////////////////////
    // HEADLINE
    ////////////////////////////////////////////////////////////

    headline:
      cleanText(
        context.remedy.title
      ),


    ////////////////////////////////////////////////////////////
    // DESCRIPTION
    ////////////////////////////////////////////////////////////

    description,


    ////////////////////////////////////////////////////////////
    // GUIDANCE
    ////////////////////////////////////////////////////////////

    guidance,


    ////////////////////////////////////////////////////////////
    // ORIGINAL RESOLVED REMEDY
    ////////////////////////////////////////////////////////////

    remedy:
      context.remedy,


    ////////////////////////////////////////////////////////////
    // METADATA
    ////////////////////////////////////////////////////////////

    metadata: {

      planet:
        context.planet ??
        context.remedy.source?.planet,

      zodiacSign:
        context.zodiacSign ??
        context.remedy.source?.zodiacSign,

      area:
        context.area,

      tone,

    },

  };

}


//////////////////////////////////////////////////////////////
// LANGUAGE CONTEXT BUILDER
//////////////////////////////////////////////////////////////

export function createRemedyLanguageContext(
  remedy: ResolvedRemedy,
  area: RemedyLanguageLifeArea = "overall",
  tone: RemedyLanguageTone = "neutral",
  planet?: string,
  zodiacSign?: string
): RemedyLanguageContext {

  return {

    remedy,

    planet,

    zodiacSign,

    area,

    tone,

  };

}


//////////////////////////////////////////////////////////////
// END OF REMEDY LANGUAGE RESOLVER
//////////////////////////////////////////////////////////////
//
// LOCKED.
//
// This resolver:
//
// - receives ResolvedRemedy
// - does not select remedies
// - does not access CMS
// - does not access MongoDB
// - does not calculate astrology
// - does not generate AI content
// - does not invent mantra/remedy knowledge
//
// It only creates deterministic literary expression
// around already-resolved remedy knowledge.
//
// Automation remains responsible for persistence
// into MongoDB Horoscope.
//
// CMS/API remains responsible for delivery to UI.
//
//////////////////////////////////////////////////////////////
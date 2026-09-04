//////////////////////////////////////////////////////////////
//
// NATIONPATH AI AUTOMATION
//
// ASTRO HOROSCOPE CMS MAPPER v4
//
// Engine Result
//        ↓
// Prediction Result
//        ↓
// Remedy Intelligence
//        ↓
// Zodiac Master Snapshot
//        ↓
// CMS Horoscope Document
//
// RESPONSIBILITY:
//
// ONLY TRANSFORMATION
//
// LOCKED:
//
// NO calculation
// NO prediction modification
// NO AI generation
// NO remedy generation
// NO remedy knowledge invention
// NO CMS/database access
//
// IMPORTANT:
//
// Engine output is the source of truth.
// Prediction output is the source of prediction intelligence.
// Remedy Intelligence is the source of resolved remedy data.
// Zodiac Master is the source of static zodiac identity.
//
//////////////////////////////////////////////////////////////

import type {

HoroscopeResult,

} from "@/lib/astro/horoscope/types";

import {

generateLuckyData,

} from "./lucky";

//////////////////////////////////////////////////////////////
// ZODIAC MASTER SNAPSHOT
//////////////////////////////////////////////////////////////

interface ZodiacMasterSnapshot {

zodiac:


string;


names?: {


english:

  string;

hindi?:

  string;

sanskrit?:

  string;

gujarati?:

  string;

nepali?:

  string;


};

identity?: {


rashi?:

  string;

sanskritName?:

  string;

dates?:

  string;

description?:

  string;

energy?:

  string;


};

////////////////////////////////////////////////////////////
// NAME INITIALS
//
// SOURCE:
// Zodiac Master TOP LEVEL nameInitials
//
// NEVER CALCULATE
// NEVER GENERATE
////////////////////////////////////////////////////////////

nameInitials?:


string[];


symbol?:


string;


element?:


string;


rulingPlanet?:


string;


media?: {


icon?:

  string;

banner?:

  string;


};

}

//////////////////////////////////////////////////////////////
// MAPPER INPUT
//////////////////////////////////////////////////////////////

interface MapperInput {

horoscope:


HoroscopeResult;


zodiac:


string;


zodiacMaster?:


ZodiacMasterSnapshot;


period:


| "daily"
| "weekly"
| "monthly"
| "yearly";


date:


Date;


}

//////////////////////////////////////////////////////////////
// INDIA TIME DATE RANGE
//////////////////////////////////////////////////////////////

function buildDateRange(

date:


Date,


period:


string


) {

const IST_OFFSET =


5.5 *
60 *
60 *
1000;


const istDate =


new Date(

  date.getTime()
  +
  IST_OFFSET

);


const startIST =


new Date(

  Date.UTC(

    istDate.getUTCFullYear(),

    istDate.getUTCMonth(),

    istDate.getUTCDate(),

    0,

    0,

    0,

    0

  )

);


const endIST =


new Date(

  startIST

);


if (


period === "daily"


) {


endIST.setUTCDate(

  endIST.getUTCDate()
  +
  1

);


}

if (


period === "weekly"


) {


endIST.setUTCDate(

  endIST.getUTCDate()
  +
  7

);


}

if (


period === "monthly"


) {


endIST.setUTCMonth(

  endIST.getUTCMonth()
  +
  1

);


}

if (


period === "yearly"


) {


endIST.setUTCFullYear(

  endIST.getUTCFullYear()
  +
  1

);


}

return {


startDate:

  new Date(

    startIST.getTime()
    -
    IST_OFFSET

  ),


endDate:

  new Date(

    endIST.getTime()
    -
    IST_OFFSET

  ),


};

}

//////////////////////////////////////////////////////////////
// PLANET INTELLIGENCE
//
// SINGLE SOURCE:
//
// prediction.planetaryPredictions
//
// DO NOT rebuild from:
//
// opportunities
// cautions
// ranking
//////////////////////////////////////////////////////////////

function mapPlanets(

planetaryPredictions:


any[] = []


) {

return planetaryPredictions.map(


(

  planet:

    any

) => ({

  planetKey:

    planet.planet
      ?.toLowerCase()
      ||
      "planet",


  name:

    planet.planet
    ||
    "Planet",


  title:

    `${

      planet.planet
      ||
      "Planet"

    } Influence`,


  message:

    planet.message
    ||
    "",


  strength:

    planet.strengthScore >= 80

      ? "High"

      : planet.strengthScore >= 50

        ? "Balanced"

        : "Low",


  energyLevel:

    planet.strengthScore >= 80

      ? "Strong"

      : planet.strengthScore >= 50

        ? "Balanced"

        : "Challenging",


  strengthScore:

    planet.strengthScore
    ??
    0,


  dignity:

    planet.dignity
    ||
    "",


  positive:

    planet.positive
    ||
    [],


  caution:

    planet.caution
    ||
    [],


  keywords:

    planet.keywords
    ||
    [],


  confidence:

    planet.confidence
    ??
    0,


  influenceScore:

    planet.influenceScore
    ??
    0,

})


);

}

//////////////////////////////////////////////////////////////
// LIFE INTELLIGENCE
//
// SINGLE SOURCE:
//
// prediction.lifePredictions
//
// DO NOT rebuild from predictionRanking.
//////////////////////////////////////////////////////////////

function mapLife(

lifePredictions:


any[] = []


) {

const findArea =


(

  area:

    string

) =>

  lifePredictions.find(

    (

      item:

        any

    ) =>

      item.area === area

  );


return {


career:

  findArea(

    "career"

  )
    ?.summary
    ||
    "",



love:

  findArea(

    "relationship"

  )
    ?.summary
    ||
    "",



finance:

  findArea(

    "finance"

  )
    ?.summary
    ||
    "",



health:

  findArea(

    "health"

  )
    ?.summary
    ||
    "",


};

}

//////////////////////////////////////////////////////////////
// REMEDY INTELLIGENCE MAPPER
//
// SOURCE:
//
// horoscope.remedyIntelligence
//
// This function ONLY transforms an already-resolved
// remedy into the CMS horoscope document.
//
// It does NOT:
//
// - select a remedy
// - calculate a remedy
// - generate a remedy
// - generate a mantra
// - invent a reason
// - access MongoDB
// - access CMS
//
//////////////////////////////////////////////////////////////

function mapRemedy(

horoscope:


HoroscopeResult


) {

const intelligence =


horoscope.remedyIntelligence;


////////////////////////////////////////////////////////////
// NO RESOLVED REMEDY
////////////////////////////////////////////////////////////

if (


!intelligence?.available
||
!intelligence.remedy


) {


return {

  available:

    false,

};


}

////////////////////////////////////////////////////////////
// RESOLVED REMEDY
//
// Every remedy-specific field comes directly from
// RemedyKnowledge through the resolver.
////////////////////////////////////////////////////////////

const remedy =


intelligence.remedy;


return {


available:

  true,



category:

  remedy.category,



title:

  remedy.title,



practice:

  remedy.practice,



guidance:

  remedy.guidance,



reason:

  remedy.reason,



mantra:

  remedy.mantra,



benefits:

  remedy.benefits,



precautions:

  remedy.precautions,



avoidFor:

  remedy.avoidFor,



suitableFor:

  remedy.suitableFor,



materials:

  remedy.materials,



duration:

  remedy.duration,



gemstone:

  remedy.gemstone,



metal:

  remedy.metal,



day:

  remedy.day,



color:

  remedy.color,



media:

  remedy.media,



source:

  remedy.source,



context:

  intelligence.context,


};

}

//////////////////////////////////////////////////////////////
// MAIN CMS MAPPER
//////////////////////////////////////////////////////////////

export function mapHoroscopeToCms(

input:


MapperInput


) {

const {


horoscope,

zodiac,

period,

date,

zodiacMaster,


} = input;

////////////////////////////////////////////////////////////
// ENGINE RESULT
//
// HoroscopeResult is the source.
//
////////////////////////////////////////////////////////////

const engine:


any =

  horoscope as any;


const prediction:


any =

  engine?.prediction;


console.log(


"🔥 FINAL HOROSCOPE CMS MAPPER v4",

{

  zodiac,



  headline:

    prediction?.headline,



  planetaryCount:

    prediction
      ?.planetaryPredictions
      ?.length
    ||
    0,



  lifeAreaCount:

    prediction
      ?.lifePredictions
      ?.length
    ||
    0,



  remedyAvailable:

    horoscope
      ?.remedyIntelligence
      ?.available
    ||
    false,



  remedyPlanet:

    horoscope
      ?.remedyIntelligence
      ?.context
      ?.planet
    ||
    null,



  remedyTitle:

    horoscope
      ?.remedyIntelligence
      ?.remedy
      ?.title
    ||
    null,



  remedySlug:

    horoscope
      ?.remedyIntelligence
      ?.remedy
      ?.source
      ?.slug
    ||
    null,



  nameInitials:

    zodiacMaster?.nameInitials
    ||
    [],

}


);

////////////////////////////////////////////////////////////
// DATE RANGE
////////////////////////////////////////////////////////////

const range =


buildDateRange(

  date,

  period

);


////////////////////////////////////////////////////////////
// ZODIAC ENGLISH NAME
////////////////////////////////////////////////////////////

const englishName =


zodiacMaster?.names?.english
||
zodiac;


////////////////////////////////////////////////////////////
// CMS DOCUMENT
////////////////////////////////////////////////////////////

return {


////////////////////////////////////////////////////////////
// BASIC
////////////////////////////////////////////////////////////

zodiac,


slug:

  `${zodiac}-${period}`,



////////////////////////////////////////////////////////////
// ZODIAC IDENTITY SNAPSHOT
//
// STATIC MASTER DATA ONLY
////////////////////////////////////////////////////////////

identity: {


  rashi:

    zodiacMaster
      ?.identity
      ?.rashi
    ||
    "",


  sanskritName:

    zodiacMaster
      ?.identity
      ?.sanskritName
    ||

    zodiacMaster
      ?.names
      ?.sanskrit
    ||

    "",


  dates:

    zodiacMaster
      ?.identity
      ?.dates
    ||
    "",


  description:

    zodiacMaster
      ?.identity
      ?.description
    ||
    "",


  energy:

    zodiacMaster
      ?.identity
      ?.energy
    ||
    "",


  element:

    zodiacMaster
      ?.element
    ||
    "",


  rulingPlanet:

    zodiacMaster
      ?.rulingPlanet
    ||
    "",


  symbol:

    zodiacMaster
      ?.symbol
    ||
    "",

},



////////////////////////////////////////////////////////////
// NAME INITIALS
//
// SINGLE CANONICAL SOURCE:
// Zodiac Master TOP LEVEL nameInitials
//
// NEVER CALCULATE
// NEVER GENERATE
////////////////////////////////////////////////////////////

nameInitials:

  zodiacMaster?.nameInitials
  ||
  [],



////////////////////////////////////////////////////////////
// META
////////////////////////////////////////////////////////////

meta: {


  period,



  language:

    prediction.language
    ||
    "english",



  status:

    "approved",



  startDate:

    range.startDate,



  endDate:

    range.endDate,



  scheduledAt:

    new Date(),



  slugDate:

    new Intl.DateTimeFormat(

      "en-CA",

      {

        timeZone:

          "Asia/Kolkata",

      }

    ).format(

      date

    ),



  version:

    "1.0",



  contentVersion:

    1,



  priority:

    1,



  featured: {

    homepage:

      true,

    trending:

      false,

    seo:

      true,

  },



  visibility: {

    public:

      true,

    premium:

      false,

    featured:

      true,

  },

},



////////////////////////////////////////////////////////////
// HERO
////////////////////////////////////////////////////////////

hero: {


  badge:

    `${period} Horoscope`,



  title:

    `${englishName} ${period} Horoscope`,



  subtitle:

    prediction
      ?.experience
      ?.primaryTheme
      ?.summary

    ||

    prediction?.headline

    ||

    prediction?.overview

    ||

    "",



  description:

    prediction?.overview

    ||

    prediction
      ?.experience
      ?.primaryTheme
      ?.summary

    ||

    "",



  cosmicLabel:

    "NationPath Astro Intelligence",



  theme:

    "cosmic",



  image:

    zodiacMaster
      ?.media
      ?.banner

    ||

    zodiacMaster
      ?.media
      ?.icon

    ||

    "",

},



////////////////////////////////////////////////////////////
// EDITORIAL
//
// DIRECT ENGINE / PREDICTION OUTPUT
////////////////////////////////////////////////////////////

editorial: {


  headline:

    prediction?.headline
    ||
    "",



  overview:

    prediction?.overview
    ||
    "",



  prediction:

    prediction
      ?.experience
      ?.primaryTheme
      ?.summary

    ||

    prediction?.overview

    ||

    "",



  quote:

    prediction
      ?.experience
      ?.primaryTheme
      ?.summary

    ||

    "Your cosmic journey unfolds through awareness and wisdom.",

},



////////////////////////////////////////////////////////////
// LIFE
//
// SOURCE:
// lifePredictions
////////////////////////////////////////////////////////////

life:

  mapLife(

    prediction
      ?.lifePredictions
    ||
    []

  ),



////////////////////////////////////////////////////////////
// INSIGHTS
//
// DIRECT PREDICTION OUTPUT
////////////////////////////////////////////////////////////

insights: {


  energy:

    prediction
      ?.predictionConfidence
      !=
      null

      ? `Confidence ${prediction.predictionConfidence}%`

      : "Balanced",



  guidance:

    Array.isArray(

      prediction?.guidance

    )

      ? prediction.guidance.join(

          " "

        )

      : "",



  strengths:

    (

      prediction?.opportunities

      ||
      []

    )

      .map(

        (

          item:

            any

        ) =>

          item.title

      ),



  challenges:

    (

      prediction?.cautions

      ||
      []

    )

      .map(

        (

          item:

            any

        ) =>

          item.title

      ),

},



////////////////////////////////////////////////////////////
// PLANETS
//
// SINGLE SOURCE:
// planetaryPredictions
////////////////////////////////////////////////////////////

planets:

  mapPlanets(

    prediction
      ?.planetaryPredictions
    ||
    []

  ),



////////////////////////////////////////////////////////////
// LUCK
//
// ENGINE OUTPUT FIRST.
//
// Existing lucky fallback retained.
////////////////////////////////////////////////////////////

lucky:

  prediction?.lucky

  ||

  generateLuckyData(

    zodiac

  ),



////////////////////////////////////////////////////////////
// REMEDY
//
// SINGLE SOURCE:
//
// horoscope.remedyIntelligence
//
// NO hardcoded remedy.
// NO prediction guidance fallback.
// NO manual remedy.
////////////////////////////////////////////////////////////

remedy:

  mapRemedy(

    horoscope

  ),



////////////////////////////////////////////////////////////
// PREMIUM
////////////////////////////////////////////////////////////

premium: {


  title:

    "Unlock Personal Astro Intelligence",



  description:

    "Detailed birth chart and personalized planetary insights.",



  features: [

    "Birth Chart",

    "Life Intelligence",

    "AI Astro Reports",

  ],

},



////////////////////////////////////////////////////////////
// SEO
////////////////////////////////////////////////////////////

seo: {


  title:

    `${englishName} ${period} Horoscope Today | NationPath Astro`,



  description:

    `Read ${englishName} horoscope with planetary insights, life guidance and Vedic astrology predictions.`,



  keywords: [

    `${zodiac} horoscope`,

    `${period} horoscope`,

    `${zodiac} rashifal`,

    "Vedic Astrology",

    "NationPath Astro",

  ],



  canonical:

    `/astro/horoscope/${zodiac}`,

},



////////////////////////////////////////////////////////////
// VERSION TRACKING
////////////////////////////////////////////////////////////

intelligence: {


  mapperVersion:

    "4.0",



  source:

    "nationpath-ai",



  generatedAt:

    new Date(),

},



////////////////////////////////////////////////////////////
// AUDIT
////////////////////////////////////////////////////////////

createdBy:

  "nationpath-ai",



updatedBy:

  "nationpath-ai",


};

}

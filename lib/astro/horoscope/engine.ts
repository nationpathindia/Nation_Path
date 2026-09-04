//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// Production Horoscope Calculation Engine
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
// Prediction
// Compatibility
//
// No CMS logic.
// No AI generation.
// No UI logic.
//
//////////////////////////////////////////////////////////////

import { Planet } from "../client";

import {
  getPlanetPosition,
  isRetrograde,
} from "../calculations/astronomy";

import {
  getMoonRashi,
  getSunRashi,
  getRashiIndex,
  getRashiName,
} from "../calculations/rashi";

import {
  buildPlanetInfluence,
} from "./influence";

import {
  getLocalizedSummary,
} from "./mapper";

import {
  getPlanetMetadata,
} from "./intelligence";

import {
  getPlanetName as getEnumPlanetName,
} from "./planetMapper";

import {
  calculatePlanetStrength,
} from "./strength";

import {
  analyzeHoroscope,
} from "./analysis";

import {
  interpretHoroscope,
} from "./interpretation";

import {
  predictHoroscope,
} from "./prediction";

import type {
  HoroscopeRequest,
  HoroscopeResult,
  HoroscopePlanet,
} from "./types";

import {
  calculateBirthHouses,
  getPlanetHouse,
} from "../calculations/houses";

import type {
  BirthHouseData,
} from "../calculations/houses";

import {
  getNakshatra,
} from "../calculations/nakshatra";

import {
  calculateVimshottariMahadasha,
  getCurrentDasha,
} from "../dasha/vimshottari";

import {
  calculateNavamsa,
} from "../charts/navamsa";

import {
  analyzeYogas,
} from "../yoga";

import {
  analyzeDoshas,
} from "../dosha";

import {
  analyzeD1D9,
} from "./d9Analysis";

import {
  analyzeMarriage,
} from "../analysis/marriage";

import {
  resolvePlanetLanguage,
  createLanguageContext,
  composeLanguage,
} from "./intelligence";


import {
  getCompatibility,
} from "../compatibility";

import type {
  ZodiacSign,
} from "../constants";




//////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////

const RAHU_SWISS_ID = 11 as Planet;

const CORE_PLANETS = Object.freeze([

  Planet.Sun,
  Planet.Moon,
  Planet.Mars,
  Planet.Mercury,
  Planet.Jupiter,
  Planet.Venus,
  Planet.Saturn,

] as const);


//////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////

function normalizeLongitude(
  longitude: number
): number {

  let value =
    longitude % 360;

  if (value < 0) {

    value += 360;

  }

  return value;

}


function createRashi(
  longitude: number
) {

  const normalized =
    normalizeLongitude(
      longitude
    );

  const index =
    getRashiIndex(
      normalized
    );

  return {

    index,

    name:
      getRashiName(
        index
      ),

    longitude:
      normalized,

  };

}


//////////////////////////////////////////////////////////////
// ZODIAC NORMALIZATION
//////////////////////////////////////////////////////////////

function normalizeZodiacSign(
  value?: string
): ZodiacSign | undefined {

  if (!value) {

    return undefined;

  }

  const normalized =
    value
      .trim()
      .toLowerCase();

  const signs: ZodiacSign[] = [

    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",

  ];

  return signs.find(

    sign =>
      sign.toLowerCase() === normalized

  );

}


//////////////////////////////////////////////////////////////
// PLANET BUILDER
//////////////////////////////////////////////////////////////

function buildPlanet(
  date: Date,
  planet: Planet
): HoroscopePlanet {

  const position =
    getPlanetPosition(
      date,
      planet
    );

  const longitude =
    normalizeLongitude(
      position.siderealLongitude
    );

  const planetName =
    getEnumPlanetName(
      planet
    );

  const rashi =
    createRashi(
      longitude
    );

  return {

    planet,

    longitude,

    retrograde:
      isRetrograde(
        date,
        planet
      ),

    rashi,

    nakshatra:
      getNakshatra(
        longitude
      ),

    intelligence:
      getPlanetMetadata(
        planetName
      ),

    strength:
      calculatePlanetStrength(
        planetName,
        rashi.name
      ),

  };

}


//////////////////////////////////////////////////////////////
// NODE BUILDER
//////////////////////////////////////////////////////////////

function buildNode(
  name: "Rahu" | "Ketu",
  longitude: number
): HoroscopePlanet {

  const normalized =
    normalizeLongitude(
      longitude
    );

  const rashi =
    createRashi(
      normalized
    );

  return {

    planet:
      name,

    longitude:
      normalized,

    retrograde:
      true,

    rashi,

    nakshatra:
      getNakshatra(
        normalized
      ),

    intelligence:
      getPlanetMetadata(
        name
      ),

    strength:
      calculatePlanetStrength(
        name,
        rashi.name
      ),

  };

}


//////////////////////////////////////////////////////////////
// RAHU / KETU
//////////////////////////////////////////////////////////////

function buildNodes(
  date: Date
) {

  const rahuPosition =
    getPlanetPosition(
      date,
      RAHU_SWISS_ID
    );

  const rahuLongitude =
    normalizeLongitude(
      rahuPosition.siderealLongitude
    );

  return {

    rahu:
      buildNode(
        "Rahu",
        rahuLongitude
      ),

    ketu:
      buildNode(
        "Ketu",
        normalizeLongitude(
          rahuLongitude + 180
        )
      ),

  };

}


//////////////////////////////////////////////////////////////
// MAIN HOROSCOPE CALCULATOR
//////////////////////////////////////////////////////////////

export function calculateHoroscope(
  request: HoroscopeRequest
): HoroscopeResult {

  const {

    date,

    language = "en",

  } = request;


  //////////////////////////////////////////////////////////////
  // ZODIAC CONTEXT
  //////////////////////////////////////////////////////////////

  const zodiacSign =
    normalizeZodiacSign(
      request.zodiacSign
    );


  //////////////////////////////////////////////////////////////
  // PLANET BUILD
  //////////////////////////////////////////////////////////////

  const planetMap =
    new Map<
      Planet,
      HoroscopePlanet
    >();

  for (
    const planet of CORE_PLANETS
  ) {

    planetMap.set(

      planet,

      buildPlanet(
        date,
        planet
      )

    );

  }


  //////////////////////////////////////////////////////////////
  // PLANET EXTRACTION
  //////////////////////////////////////////////////////////////

  const sun =
    planetMap.get(
      Planet.Sun
    )!;

  const moon =
    planetMap.get(
      Planet.Moon
    )!;

  const mars =
    planetMap.get(
      Planet.Mars
    )!;

  const mercury =
    planetMap.get(
      Planet.Mercury
    )!;

  const jupiter =
    planetMap.get(
      Planet.Jupiter
    )!;

  const venus =
    planetMap.get(
      Planet.Venus
    )!;

  const saturn =
    planetMap.get(
      Planet.Saturn
    )!;


  //////////////////////////////////////////////////////////////
  // NODES
  //////////////////////////////////////////////////////////////

  const {
    rahu,
    ketu,
  } =
    buildNodes(
      date
    );


  //////////////////////////////////////////////////////////////
  // SUN & MOON SIGN
  //////////////////////////////////////////////////////////////

  const sunSign =
    getSunRashi(
      date
    );

  const moonSign =
    getMoonRashi(
      date
    );


  //////////////////////////////////////////////////////////////
  // PLANETARY COLLECTION
  //////////////////////////////////////////////////////////////

  const planetCollection = {

    sun,

    moon,

    mars,

    mercury,

    jupiter,

    venus,

    saturn,

    rahu,

    ketu,

  };


  //////////////////////////////////////////////////////////////
  // VIMSHOTTARI DASHA
  //////////////////////////////////////////////////////////////

  const vimshottari =

    moon.nakshatra

      ?

    calculateVimshottariMahadasha(

      date,

      moon.nakshatra.lord

    )

      :

    [];

  const currentDasha =
    getCurrentDasha(
      vimshottari
    );


  //////////////////////////////////////////////////////////////
  // BIRTH CHART HOUSE ENGINE
  //////////////////////////////////////////////////////////////

  let houseData:
    BirthHouseData | undefined;


  if (
    request.birthDetails
  ) {

    houseData =
      calculateBirthHouses(

        request.birthDetails.date,

        request.birthDetails.latitude,

        request.birthDetails.longitude

      );


    Object
      .values(
        planetCollection
      )
      .forEach(

        planet => {

          planet.house = {

            number:
              getPlanetHouse(

                planet.longitude,

                houseData!

              ),

          };

        }

      );

  }


  //////////////////////////////////////////////////////////////
  // ASCENDANT / LAGNA
  //////////////////////////////////////////////////////////////

  const ascendant =

    houseData

      ?

    {

      longitude:
        houseData.ascendant,

      rashi:
        createRashi(
          houseData.ascendant
        ),

    }

      :

    undefined;


  //////////////////////////////////////////////////////////////
  // HOUSES OUTPUT
  //////////////////////////////////////////////////////////////

  const houses =

    houseData

      ?

    {

      ascendant:
        houseData.ascendant,

      mc:
        houseData.mc,

      cusps:
        houseData.cusps,

      houseSystem:
        "Placidus",

    }

      :

    undefined;


  //////////////////////////////////////////////////////////////
  // PLANETARY SNAPSHOT
  //////////////////////////////////////////////////////////////

  const planets =
    Object.freeze(
      planetCollection
    );


  //////////////////////////////////////////////////////////////
  // D1 / D9
  //////////////////////////////////////////////////////////////

  const navamsa =
    calculateNavamsa(

      Object.values(
        planets
      )

    );


  //////////////////////////////////////////////////////////////
  // YOGA ANALYSIS
  //////////////////////////////////////////////////////////////

  const yogaAnalysis =
    analyzeYogas(
      planets
    );


  //////////////////////////////////////////////////////////////
  // DOSHA ANALYSIS
  //////////////////////////////////////////////////////////////

  const doshaAnalysis =
    analyzeDoshas(
      planets
    );


  //////////////////////////////////////////////////////////////
  // D1 + D9 ANALYSIS
  //////////////////////////////////////////////////////////////

  const d9Analysis =
    analyzeD1D9(
      navamsa.planets
    );


  //////////////////////////////////////////////////////////////
  // ANALYSIS PIPELINE
  //////////////////////////////////////////////////////////////

  const analysis =
    analyzeHoroscope(
      planets
    );


  //////////////////////////////////////////////////////////////
  // INFLUENCE PIPELINE
  //////////////////////////////////////////////////////////////

  const influences =

    Object
      .values(
        planets
      )
      .map(

        planet =>

          buildPlanetInfluence(
            planet,
            language
          )

      );


  //////////////////////////////////////////////////////////////
  // INTERPRETATION PIPELINE
  //////////////////////////////////////////////////////////////

  const interpretation =
    interpretHoroscope(
      planets,
      language
    );


  //////////////////////////////////////////////////////////////
  // LANGUAGE INTELLIGENCE
  //////////////////////////////////////////////////////////////

  const languageOutputs =

    Object
      .values(
        planets
      )
      .map(

        planet => {

          const planetName =
            String(
              planet.planet
            );

          const strengthScore =
            planet.strength?.score ?? 50;

          const context =
            createLanguageContext(

              planetName,

              strengthScore,

              "overall",

              zodiacSign

            );

          return resolvePlanetLanguage(
            context
          );

        }

      );


  const languageComposition =
    composeLanguage(

      languageOutputs,

      "overall"

    );

  //////////////////////////////////////////////////////////////
  // PREDICTION ENGINE
  //////////////////////////////////////////////////////////////

  const prediction =
    predictHoroscope(

      planets,

      language,

      zodiacSign

    );


  //////////////////////////////////////////////////////////////
  // MARRIAGE INTELLIGENCE
  //////////////////////////////////////////////////////////////

  const marriageAnalysis =
    analyzeMarriage({

      planets:
        Object.values(
          planets
        ),

      ascendantSign:
        ascendant?.rashi.name,

      d9:
        navamsa,

    });


  //////////////////////////////////////////////////////////////
  // BASIC RASHI COMPATIBILITY
  //////////////////////////////////////////////////////////////

  const compatibility =
    zodiacSign
      ? getCompatibility(
          zodiacSign
        )
      : undefined;


  //////////////////////////////////////////////////////////////
  // FINAL HOROSCOPE RESULT
  //////////////////////////////////////////////////////////////

  return {

    date,

    language,


    //////////////////////////////////////////////////////////////
    // SIGNS
    //////////////////////////////////////////////////////////////

    sunSign,

    moonSign,


    //////////////////////////////////////////////////////////////
    // BIRTH CHART
    //////////////////////////////////////////////////////////////

    ascendant,

    houses,


    //////////////////////////////////////////////////////////////
    // PLANETS
    //////////////////////////////////////////////////////////////

    planets,


    //////////////////////////////////////////////////////////////
    // DIVISIONAL CHARTS
    //////////////////////////////////////////////////////////////

    charts: {

      d1: {

        planets,

        houses,

      },

      d9:
        navamsa,

    },


    //////////////////////////////////////////////////////////////
    // D1 + D9
    //////////////////////////////////////////////////////////////

    d9Analysis,


    //////////////////////////////////////////////////////////////
    // YOGA / DOSHA
    //////////////////////////////////////////////////////////////

    yogas:
      yogaAnalysis,

    doshas:
      doshaAnalysis,


    //////////////////////////////////////////////////////////////
    // ANALYSIS
    //////////////////////////////////////////////////////////////

    analysis,


    //////////////////////////////////////////////////////////////
    // INFLUENCES
    //////////////////////////////////////////////////////////////

    influences,


    //////////////////////////////////////////////////////////////
    // INTERPRETATION
    //////////////////////////////////////////////////////////////

    interpretation,


    //////////////////////////////////////////////////////////////
    // LANGUAGE INTELLIGENCE
    //////////////////////////////////////////////////////////////

    languageIntelligence:
      languageComposition,


    //////////////////////////////////////////////////////////////
    // PREDICTION
    //////////////////////////////////////////////////////////////

    prediction,


    //////////////////////////////////////////////////////////////
    // COMPATIBILITY
    //////////////////////////////////////////////////////////////

    compatibility,


    //////////////////////////////////////////////////////////////
    // ADVANCED PREDICTIONS
    //////////////////////////////////////////////////////////////

    predictions: {

      marriage:
        marriageAnalysis,

    },


    //////////////////////////////////////////////////////////////
    // DASHA
    //////////////////////////////////////////////////////////////

    dasha: {

      current:
        currentDasha,

      vimshottari,

    },


    //////////////////////////////////////////////////////////////
    // SUMMARY
    //////////////////////////////////////////////////////////////

    summary:

      getLocalizedSummary(

        "Daily Horoscope",

        "Planetary calculations generated from NationPath Vedic astrology engine.",

        language

      ),

  };

}


//////////////////////////////////////////////////////////////
// END OF ENGINE
//////////////////////////////////////////////////////////////
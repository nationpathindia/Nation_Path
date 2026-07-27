//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
// Future Proof Horoscope Type System
//////////////////////////////////////////////////////////////

import type {
  RashiInfo,
} from "../calculations/rashi";

import type {
  Planet,
} from "../client";


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


  date:
    Date;



  language?:
    HoroscopeLanguage;



  zodiacSign?:
    string;



  /**
   * Future Kundli Support
   */

  birthDetails?: {

    date:
      Date;


    latitude:
      number;


    longitude:
      number;


    timezone?:
      string;

  };


}



//////////////////////////////////////////////////////////////
// PLANET DATA
//////////////////////////////////////////////////////////////
export interface HoroscopePlanet {


  planet:
    HoroscopePlanetId;



  longitude:
    number;



  retrograde:
    boolean;



  rashi:
    RashiInfo;



  /**
   * Planet Intelligence Database
   */

  intelligence:
    PlanetMetadata;



  /**
   * Strength Calculation
   */

  strength:
    PlanetStrengthResult;



  /**
   * House Placement
   */

  house?: {

    number:
      number;


    lord?:
      string;

  };



  /**
   * Nakshatra System
   */

  nakshatra?: {

    index:
      number;


    name:
      string;


    lord:
      string;


    pada:
      number;


    degree:
      number;

  };


}



//////////////////////////////////////////////////////////////
// PLANETARY SNAPSHOT
//////////////////////////////////////////////////////////////

export interface PlanetarySnapshot {


  sun:
    HoroscopePlanet;


  moon:
    HoroscopePlanet;


  mars:
    HoroscopePlanet;


  mercury:
    HoroscopePlanet;


  jupiter:
    HoroscopePlanet;


  venus:
    HoroscopePlanet;


  saturn:
    HoroscopePlanet;


  rahu:
    HoroscopePlanet;


  ketu:
    HoroscopePlanet;


}

//////////////////////////////////////////////////////////////
// HOROSCOPE SUMMARY
//////////////////////////////////////////////////////////////

export interface HoroscopeSummary {


  title:
    string;


  description:
    string;



  /**
   * AI Interpretation Layer
   */

  themes?:
    string[];


  advice?:
    string[];


}



//////////////////////////////////////////////////////////////
// HOROSCOPE RESULT
//////////////////////////////////////////////////////////////

export interface HoroscopeResult {


  //////////////////////////////////////////////////////////////
  // BASIC INFORMATION
  //////////////////////////////////////////////////////////////

  date:
    Date;


  language:
    HoroscopeLanguage;



  //////////////////////////////////////////////////////////////
  // BASIC SIGNS
  //////////////////////////////////////////////////////////////

  sunSign:
    RashiInfo;



  moonSign:
    RashiInfo;


  ascendant?: {

    longitude:number;


    rashi:RashiInfo;

  };


  houses?: {

    ascendant:number;


    mc:number;


    cusps:number[];


    houseSystem?:string;

  };



  //////////////////////////////////////////////////////////////
  // PLANETARY POSITIONS
  //////////////////////////////////////////////////////////////

  planets:
    PlanetarySnapshot;

 //////////////////////////////////////////////////////////////
// DIVISIONAL CHARTS
//////////////////////////////////////////////////////////////
charts?: {

  d1:{

    planets:
      PlanetarySnapshot;


    houses?: {

      ascendant:number;

      mc:number;

      cusps:number[];

      houseSystem?:string;

    };

  };



  d9:{

    type:"D9";


    planets:{

      planet:string;


      d1:{

        rashi:string;

        longitude:number;

      };


      d9:{

        rashi:string;

      };


      analysis:{

        dignity:string;

        strength:number;

        keywords:string[];

      };


    }[];

  };


};


//////////////////////////////////////////////////////////////
// D1 + D9 COMBINED INTELLIGENCE
//////////////////////////////////////////////////////////////

d9Analysis?: {

  planet:string;


  d1:{

    rashi:string;

    strength:number;

  };


  d9:{

    rashi:string;

    strength:number;

  };


  result:{

    status:string;

    combinedStrength:number;

    keywords:string[];

  };

}[];


yogas?:

  YogaAnalysis;

  
doshas?:
  DoshaAnalysis;  

  //////////////////////////////////////////////////////////////
  // NAKSHATRA ENGINE
  // Phase 2
  //////////////////////////////////////////////////////////////

  nakshatra?: {


    moon?: {

      name:string;

      pada:number;

      longitude:number;

    };



    planets?: {

      planet:
        HoroscopePlanetId;


      name:string;


      pada:number;


      longitude:number;


    }[];

  };





  //////////////////////////////////////////////////////////////
  // VEDIC INTELLIGENCE ENGINE
  // Phase 3
  //////////////////////////////////////////////////////////////

  vedicAnalysis?: {


    lagnaLord?:HoroscopePlanet;


    bhavaLords?:unknown[];


    yogas?: {


      name:string;


      description:string;


      planets:string[];


    }[];



    doshas?: {


      manglik?:boolean;


      kaalSarp?:boolean;


      grahan?:boolean;


    };


  };





  //////////////////////////////////////////////////////////////
  // DASHA ENGINE
  // Phase 4
  //////////////////////////////////////////////////////////////

  dasha?: {


    current?: {


      mahadasha:string;


      antardasha:string;


      start?:Date;


      end?:Date;


    };



    vimshottari?:unknown[];


  };


  //////////////////////////////////////////////////////////////
  // ANALYTICAL INTELLIGENCE
  //////////////////////////////////////////////////////////////

  analysis?:
    HoroscopeAnalysis;




  //////////////////////////////////////////////////////////////
  // PLANET INFLUENCE
  //////////////////////////////////////////////////////////////

  influences:
    PlanetInfluence[];





  //////////////////////////////////////////////////////////////
  // INTERPRETATION ENGINE
  //////////////////////////////////////////////////////////////

  interpretation?:
    HoroscopeInterpretation;





  //////////////////////////////////////////////////////////////
  // PREDICTION ENGINE
  //////////////////////////////////////////////////////////////

  prediction?:
    HoroscopePrediction;





  //////////////////////////////////////////////////////////////
  // FUTURE PREDICTION MODULES
  //////////////////////////////////////////////////////////////

  predictions?: {


    career?:unknown;


    marriage?:unknown;


    finance?:unknown;


    health?:unknown;


    education?:unknown;


    yearly?:unknown;


  };





  //////////////////////////////////////////////////////////////
  // TRANSIT ENGINE
  //////////////////////////////////////////////////////////////

  transits?: {


    planet:
      HoroscopePlanetId;


    from:
      string;


    to:
      string;


  }[];





  //////////////////////////////////////////////////////////////
  // SCORING ENGINE
  //////////////////////////////////////////////////////////////

  overallScore?:
    number;





  //////////////////////////////////////////////////////////////
  // REPORT ENGINE
  //////////////////////////////////////////////////////////////

  report?: {


    generatedAt?:Date;


    format?:
      "pdf"
      |
      "json";


    version?:string;


  };





  //////////////////////////////////////////////////////////////
  // SUMMARY
  //////////////////////////////////////////////////////////////

  summary:
    HoroscopeSummary;



}
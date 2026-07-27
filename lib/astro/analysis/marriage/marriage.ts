//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO ENGINE
// Marriage Analysis - Main Intelligence Engine Phase-3
//////////////////////////////////////////////////////////////

import type {
  HoroscopePlanet,
} from "../../horoscope/types";


import type {
  NavamsaChart,
} from "../../charts/types";


import type {
  MarriageAnalysis,
} from "./types";



import {
  analyzeSeventhHouse,
} from "./seventhHouse";


import {
  analyzeSeventhLord,
} from "./seventhLord";


import {
  analyzeVenus,
} from "./venus";


import {
  analyzeJupiter,
} from "./jupiter";


import {
  analyzeMarriageDelay,
} from "./delay";


import {
  analyzeMarriageType,
} from "./marriageType";


import {
  analyzeMarriageTiming,
} from "./marriageTiming";


import {
  analyzeSeparationRisk,
} from "./separation";


import {
  analyzeMarriageNavamsa,
} from "./navamsa";


import {
  analyzeMarsMarriage,
} from "./mars";


import {
  analyzeSaturnMarriage,
} from "./saturn";


import {
  calculateMarriageScore,
} from "./score";


import {
  generateMarriageSummary,
} from "./summary";


import {
  generateMarriageRecommendations,
} from "./recommendation";






//////////////////////////////////////////////////////////////
// INPUT
//////////////////////////////////////////////////////////////

export interface MarriageEngineInput {


  planets:
    HoroscopePlanet[];


  ascendantSign?:
    string;


  d9?:
    NavamsaChart;


}







//////////////////////////////////////////////////////////////
// CONFIDENCE CALCULATOR
//////////////////////////////////////////////////////////////

function calculateMarriageConfidence(

  factors:number[]

):number {


  if(
    factors.length===0
  ){

    return 0;

  }



  return Math.round(

    factors.reduce(

      (sum,value)=>

        sum + value,

      0

    )

    /

    factors.length

  );

}









//////////////////////////////////////////////////////////////
// MAIN ENGINE
//////////////////////////////////////////////////////////////

export function analyzeMarriage(

  input:MarriageEngineInput

):MarriageAnalysis {



  const planets =

    input.planets ?? [];





  ////////////////////////////////////////////////////////////
  // CORE FACTORS
  ////////////////////////////////////////////////////////////


  const seventhHouse =

    analyzeSeventhHouse({

      planets,

    });





  const seventhLord =

    analyzeSeventhLord({

      planets,

      ascendantSign:
        input.ascendantSign,

    });





  const venus =

    analyzeVenus({

      planets,

    });





  const jupiter =

    analyzeJupiter({

      planets,

    });







  ////////////////////////////////////////////////////////////
  // ADVANCED PLANETARY INTELLIGENCE
  ////////////////////////////////////////////////////////////


  const mars =

    analyzeMarsMarriage({

      planets,

    });





  const saturn =

    analyzeSaturnMarriage({

      planets,

    });








  ////////////////////////////////////////////////////////////
  // OTHER ANALYSIS MODULES
  ////////////////////////////////////////////////////////////


  const delay =

    analyzeMarriageDelay({

      planets,

    });





  const marriageType =

    analyzeMarriageType({

      planets,

    });





  const timing =

    analyzeMarriageTiming({

      planets,

    });





  const separation =

    analyzeSeparationRisk({

      planets,

    });





  const navamsa =

    analyzeMarriageNavamsa(

      input.d9

    );









//////////////////////////////////////////////////////////////
// INTELLIGENT SCORE CALCULATION
//////////////////////////////////////////////////////////////

const score =

  calculateMarriageScore({

    seventhHouse:
      seventhHouse.score,


    seventhLord:
      seventhLord.score,


    venus:
      venus.score,


    jupiter:
      jupiter.score,


    saturn:
      saturn.score,


    mars:
      mars.score,


    navamsa:
      navamsa.score,



    // Risk Intelligence

    delayRisk:
      delay.score,


    separationRisk:
      separation.score,


    conflictRisk:
      mars.score < 50
        ? 40
        : 0,



    confidence:
      80,


  });

  ////////////////////////////////////////////////////////////
  // BASE RESULT
  ////////////////////////////////////////////////////////////


  const baseAnalysis = {


    seventhHouse,


    seventhLord,


    venus,


    jupiter,


    delay,


    separation,


    marriageType,


    timing,


    navamsa,


    score,



    // future intelligence layers

    mars,


    saturn,



    summary:"",


    recommendations:[],


    confidence:0,



    generatedAt:

      new Date(),



    version:

      "3.0.0",


  };









  ////////////////////////////////////////////////////////////
  // SUMMARY
  ////////////////////////////////////////////////////////////


  const summary =

    generateMarriageSummary(

      baseAnalysis

    );






  ////////////////////////////////////////////////////////////
  // RECOMMENDATION
  ////////////////////////////////////////////////////////////


  const recommendations =

    generateMarriageRecommendations(

      baseAnalysis

    );








  ////////////////////////////////////////////////////////////
  // FINAL CONFIDENCE
  ////////////////////////////////////////////////////////////


  const confidence =

    calculateMarriageConfidence([


      seventhHouse.confidence,


      seventhLord.confidence,


      venus.confidence,


      jupiter.confidence,


      navamsa.confidence,


      timing.confidence,


      mars.confidence,


      saturn.confidence,


    ]);







  return {


    ...baseAnalysis,


    summary,


    recommendations,


    confidence,


  };

}
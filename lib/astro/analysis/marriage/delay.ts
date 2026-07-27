//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO ENGINE
// Marriage Analysis - Delay
//////////////////////////////////////////////////////////////

import type {
  HoroscopePlanet,
} from "../../horoscope/types";


import type {
  DelayAnalysis,
} from "./types";


import {
  findPlanet,
  getPlanetStrength,
  clampScore,
} from "./helpers";



//////////////////////////////////////////////////////////////
// INPUT
//////////////////////////////////////////////////////////////

export interface DelayInput {

  planets:
    HoroscopePlanet[];

}



//////////////////////////////////////////////////////////////
// ANALYSIS
//////////////////////////////////////////////////////////////

export function analyzeMarriageDelay(
  input: DelayInput
): DelayAnalysis {


  const saturn =
    findPlanet(
      input.planets,
      "Saturn"
    );


  const mars =
    findPlanet(
      input.planets,
      "Mars"
    );


  const venus =
    findPlanet(
      input.planets,
      "Venus"
    );



  let score = 80;


  const remarks:string[] = [];



  let level:
    | "None"
    | "Low"
    | "Moderate"
    | "High"
    = "None";



  if(
    saturn
  ){

    score -= 20;

    remarks.push(
      "Saturn influence can create maturity and delay in marriage matters."
    );

  }



  if(
    mars &&
    mars.house?.number === 7
  ){

    score -= 15;

    remarks.push(
      "Mars influence on seventh house may create adjustment challenges."
    );

  }



  if(
    venus &&
    getPlanetStrength(venus) < 40
  ){

    score -= 15;

    remarks.push(
      "Weak Venus can delay relationship stability."
    );

  }



  score =
    clampScore(score);



  if(score >= 75){

    level = "None";

  }
  else if(score >= 60){

    level = "Low";

  }
  else if(score >= 40){

    level = "Moderate";

  }
  else {

    level = "High";

  }



  return {

    score,


    confidence:
      80,


    remarks,


    delay:
      level !== "None",


    level,

  };

}
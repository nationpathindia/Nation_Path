//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO ENGINE
// Marriage Analysis - Timing
//////////////////////////////////////////////////////////////

import type {
  HoroscopePlanet,
} from "../../horoscope/types";


import type {
  MarriageTimingAnalysis,
} from "./types";


import {
  findPlanet,
  getPlanetStrength,
} from "./helpers";



//////////////////////////////////////////////////////////////
// INPUT
//////////////////////////////////////////////////////////////

export interface MarriageTimingInput {

  planets:
    HoroscopePlanet[];

}



//////////////////////////////////////////////////////////////
// ANALYSIS
//////////////////////////////////////////////////////////////

export function analyzeMarriageTiming(
  input: MarriageTimingInput
): MarriageTimingAnalysis {


  const venus =
    findPlanet(
      input.planets,
      "Venus"
    );


  const jupiter =
    findPlanet(
      input.planets,
      "Jupiter"
    );


  const saturn =
    findPlanet(
      input.planets,
      "Saturn"
    );



  const indicators:string[] = [];



  let score = 50;



  if(
    venus &&
    getPlanetStrength(venus) >= 70
  ){

    score += 20;

    indicators.push(
      "Strong Venus supports timely relationship development."
    );

  }



  if(
    jupiter &&
    getPlanetStrength(jupiter) >= 70
  ){

    score += 15;

    indicators.push(
      "Strong Jupiter improves marriage prospects."
    );

  }



  if(
    saturn &&
    getPlanetStrength(saturn) >= 70
  ){

    score -= 15;

    indicators.push(
      "Strong Saturn may indicate maturity before commitment."
    );

  }



  let timing:
    | "Early"
    | "Normal"
    | "Delayed"
    | "Highly Delayed"
    | "Needs Further Validation";



  if(score >= 80){

    timing = "Early";

  }
  else if(score >= 60){

    timing = "Normal";

  }
  else if(score >= 40){

    timing = "Delayed";

  }
  else {

    timing = "Highly Delayed";

  }



  return {

    timing,

    confidence:
      75,

    score,

    indicators,

  };

}
//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO ENGINE
// Marriage Analysis - Separation Risk
//////////////////////////////////////////////////////////////

import type {
  HoroscopePlanet,
} from "../../horoscope/types";


import type {
  SeparationAnalysis,
} from "./types";


import {
  findPlanet,
  clampScore,
} from "./helpers";



//////////////////////////////////////////////////////////////
// INPUT
//////////////////////////////////////////////////////////////

export interface SeparationInput {

  planets:
    HoroscopePlanet[];

}



//////////////////////////////////////////////////////////////
// ANALYSIS
//////////////////////////////////////////////////////////////

export function analyzeSeparationRisk(
  input: SeparationInput
): SeparationAnalysis {


  const mars =
    findPlanet(
      input.planets,
      "Mars"
    );


  const saturn =
    findPlanet(
      input.planets,
      "Saturn"
    );


  const rahu =
    findPlanet(
      input.planets,
      "Rahu"
    );



  let riskScore = 20;



  const remarks:string[] = [];



  if(
    mars?.house?.number === 7
  ){

    riskScore += 20;

    remarks.push(
      "Mars influence may increase conflict tendencies."
    );

  }



  if(
    saturn?.house?.number === 7
  ){

    riskScore += 15;

    remarks.push(
      "Saturn influence may create emotional distance."
    );

  }



  if(
    rahu?.house?.number === 7
  ){

    riskScore += 20;

    remarks.push(
      "Rahu influence requires deeper relationship analysis."
    );

  }



  riskScore =
    clampScore(
      riskScore
    );



  let risk:
    | "Low"
    | "Moderate"
    | "High";



  if(riskScore < 35){

    risk = "Low";

  }
  else if(riskScore < 65){

    risk = "Moderate";

  }
  else {

    risk = "High";

  }



  return {

    score:
      riskScore,


    confidence:
      75,


    remarks,


    risk,

  };

}
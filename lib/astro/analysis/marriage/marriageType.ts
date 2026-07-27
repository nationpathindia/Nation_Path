//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO ENGINE
// Marriage Analysis - Marriage Type
//////////////////////////////////////////////////////////////

import type {
  HoroscopePlanet,
} from "../../horoscope/types";


import type {
  MarriageTypeAnalysis,
} from "./types";


import {
  findPlanet,
  clampScore,
} from "./helpers";



export interface MarriageTypeInput {

  planets:
    HoroscopePlanet[];

}



export function analyzeMarriageType(
  input: MarriageTypeInput
): MarriageTypeAnalysis {


  const venus =
    findPlanet(
      input.planets,
      "Venus"
    );


  const mercury =
    findPlanet(
      input.planets,
      "Mercury"
    );



  let loveScore = 30;

  let arrangedScore = 40;


  const indicators:string[] = [];



  if(venus){

    loveScore += 25;

    indicators.push(
      "Venus influence supports emotional attraction."
    );

  }



  if(mercury){

    loveScore += 10;

    indicators.push(
      "Mercury supports communication-based relationships."
    );

  }



  arrangedScore =
    clampScore(
      arrangedScore
    );


  loveScore =
    clampScore(
      loveScore
    );



  let type:
    | "Love"
    | "Arranged"
    | "Love-Cum-Arranged"
    | "Undetermined";



  if(
    loveScore > 70 &&
    arrangedScore > 60
  ){

    type =
      "Love-Cum-Arranged";

  }
  else if(
    loveScore > arrangedScore
  ){

    type =
      "Love";

  }
  else if(
    arrangedScore > loveScore
  ){

    type =
      "Arranged";

  }
  else {

    type =
      "Undetermined";

  }



  return {

    type,

    loveScore,

    arrangedScore,

    confidence:
      75,

    indicators,

  };

}
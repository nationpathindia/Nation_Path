//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO ENGINE
// Marriage Analysis - Seventh House
//////////////////////////////////////////////////////////////

import type {
  HoroscopePlanet,
} from "../../horoscope/types";


import type {
  SeventhHouseAnalysis,
} from "./types";


import {
  getHouseOccupants,
  getSeventhHouseNumber,
  countBenefics,
  countMalefics,
  clampScore,
} from "./helpers";



//////////////////////////////////////////////////////////////
// INPUT
//////////////////////////////////////////////////////////////

export interface SeventhHouseInput {

  planets:
    HoroscopePlanet[];

}



//////////////////////////////////////////////////////////////
// ANALYSIS
//////////////////////////////////////////////////////////////

export function analyzeSeventhHouse(
  input: SeventhHouseInput
): SeventhHouseAnalysis {


  const seventhHouse =
    getSeventhHouseNumber();



  const occupants =
    getHouseOccupants(
      input.planets,
      seventhHouse
    );



  const beneficInfluence =
    countBenefics(
      occupants
    );



  const maleficInfluence =
    countMalefics(
      occupants
    );



  let score = 50;



  /**
   * Benefic planets improve
   * relationship stability
   */

  score +=
    beneficInfluence * 15;



  /**
   * Malefic planets create
   * relationship pressure
   */

  score -=
    maleficInfluence * 12;



  score =
    clampScore(score);



  const remarks:string[] = [];



  if(
    beneficInfluence > 0
  ){

    remarks.push(
      "Benefic planetary influence supports marital harmony."
    );

  }



  if(
    maleficInfluence > 0
  ){

    remarks.push(
      "Malefic planetary influence may create relationship challenges."
    );

  }



  if(
    occupants.length === 0
  ){

    remarks.push(
      "Seventh house is unoccupied; lordship and aspect analysis become important."
    );

  }



  return {

    score,


    confidence:
      occupants.length > 0
        ? 85
        : 70,


    remarks,


    occupied:
      occupants.length > 0,


    beneficInfluence,


    maleficInfluence,

  };

}
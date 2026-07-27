//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO ENGINE
// Marriage Analysis - Seventh Lord
//////////////////////////////////////////////////////////////

import type {
  HoroscopePlanet,
} from "../../horoscope/types";


import type {
  SeventhLordAnalysis,
} from "./types";


import {
  findPlanet,
  getPlanetHouse,
  getPlanetSign,
  getPlanetStrength,
  getRashiLord,
  clampScore,
} from "./helpers";



//////////////////////////////////////////////////////////////
// INPUT
//////////////////////////////////////////////////////////////

export interface SeventhLordInput {

  planets:
    HoroscopePlanet[];

  ascendantSign?:
    string;

}



//////////////////////////////////////////////////////////////
// ANALYSIS
//////////////////////////////////////////////////////////////

export function analyzeSeventhLord(
  input: SeventhLordInput
): SeventhLordAnalysis {


  /**
   * Default fallback
   * Future ascendant engine will provide
   * exact 7th lord calculation.
   */

  const seventhSign =
    getSeventhSign(
      input.ascendantSign
    );



  const lordName =
    getRashiLord(
      seventhSign
    );



  const lord =
    findPlanet(
      input.planets,
      lordName
    );



  const strength =
    getPlanetStrength(
      lord
    );



  let score =
    strength;



  if(
    lord?.retrograde
  ){

    score -= 5;

  }



  score =
    clampScore(
      score
    );



  const remarks:string[] = [];



  if(lord){

    remarks.push(
      `${lordName} is the seventh lord placed in ${getPlanetHouse(lord)} house.`
    );


    if(strength >= 70){

      remarks.push(
        "Strong seventh lord supports relationship stability."
      );

    }


    if(strength < 40){

      remarks.push(
        "Weak seventh lord requires additional validation."
      );

    }

  }
  else {

    remarks.push(
      "Seventh lord planetary data unavailable."
    );

  }



  return {

    score,


    confidence:
      lord
        ? 85
        : 40,


    remarks,


    planet:
      lordName,


    house:
      getPlanetHouse(
        lord
      ),


    sign:
      getPlanetSign(
        lord
      ),


    dignity:
      getDignity(
        lord
      ),

  };

}



//////////////////////////////////////////////////////////////
// FUTURE ASCENDANT SUPPORT
//////////////////////////////////////////////////////////////

function getSeventhSign(
  ascendant?:string
):string {


  const signs = [

    "Mesha",
    "Vrishabha",
    "Mithuna",
    "Karka",
    "Simha",
    "Kanya",
    "Tula",
    "Vrischika",
    "Dhanu",
    "Makara",
    "Kumbha",
    "Meena",

  ];



  const index =
    signs.indexOf(
      ascendant ?? "Mesha"
    );



  if(index === -1){

    return "Tula";

  }



  return (
    signs[
      (index + 6) % 12
    ]
  );

}



//////////////////////////////////////////////////////////////
// DIGNITY
//////////////////////////////////////////////////////////////

function getDignity(
  planet?: HoroscopePlanet
):string {


  if(!planet){

    return "Unknown";

  }



  const rashi =
    planet.rashi.name;



  const metadata =
    planet.intelligence;



  if(
    metadata.exaltation === rashi
  ){

    return "Exalted";

  }



  if(
    metadata.debilitation === rashi
  ){

    return "Debilitated";

  }



  if(
    metadata.ownSigns.includes(
      rashi as never
    )
  ){

    return "Own Sign";

  }



  if(
    metadata.friendlySigns.includes(
      rashi as never
    )
  ){

    return "Friendly";

  }



  if(
    metadata.enemySigns.includes(
      rashi as never
    )
  ){

    return "Enemy";

  }



  return "Neutral";

}
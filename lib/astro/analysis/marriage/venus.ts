//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO ENGINE
// Marriage Analysis - Venus
//////////////////////////////////////////////////////////////

import type {
  HoroscopePlanet,
} from "../../horoscope/types";


import type {
  VenusAnalysis,
} from "./types";


import {
  findPlanet,
  getPlanetHouse,
  getPlanetSign,
  getPlanetStrength,
  clampScore,
} from "./helpers";



//////////////////////////////////////////////////////////////
// INPUT
//////////////////////////////////////////////////////////////

export interface VenusInput {

  planets:
    HoroscopePlanet[];

}



//////////////////////////////////////////////////////////////
// ANALYSIS
//////////////////////////////////////////////////////////////

export function analyzeVenus(
  input: VenusInput
): VenusAnalysis {


  const venus =
    findPlanet(
      input.planets,
      "Venus"
    );



  const strength =
    getPlanetStrength(
      venus
    );



  let score =
    strength;



  if(
    venus?.retrograde
  ){

    score -= 5;

  }



  score =
    clampScore(
      score
    );



  const remarks:string[] = [];



  if(!venus){

    remarks.push(
      "Venus planetary data unavailable."
    );

  }
  else {


    if(
      strength >= 70
    ){

      remarks.push(
        "Strong Venus supports affection, attraction and relationship harmony."
      );

    }



    if(
      strength < 40
    ){

      remarks.push(
        "Weak Venus may create challenges in emotional expression."
      );

    }



    if(
      venus.retrograde
    ){

      remarks.push(
        "Retrograde Venus requires deeper relationship analysis."
      );

    }

  }



  return {

    score,


    confidence:
      venus
        ? 90
        : 40,


    remarks,


    sign:
      getPlanetSign(
        venus
      ),


    house:
      getPlanetHouse(
        venus
      ),


    dignity:
      getVenusDignity(
        venus
      ),


    combust:
      false,

  };

}



//////////////////////////////////////////////////////////////
// VENUS DIGNITY
//////////////////////////////////////////////////////////////

function getVenusDignity(
  planet?: HoroscopePlanet
):string {


  if(!planet){

    return "Unknown";

  }



  const metadata =
    planet.intelligence;



  const sign =
    planet.rashi.name;



  if(
    metadata.exaltation === sign
  ){

    return "Exalted";

  }



  if(
    metadata.debilitation === sign
  ){

    return "Debilitated";

  }



  if(
    metadata.ownSigns.includes(
      sign as never
    )
  ){

    return "Own Sign";

  }



  if(
    metadata.friendlySigns.includes(
      sign as never
    )
  ){

    return "Friendly";

  }



  if(
    metadata.enemySigns.includes(
      sign as never
    )
  ){

    return "Enemy";

  }



  return "Neutral";

}
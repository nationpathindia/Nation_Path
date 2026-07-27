//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO ENGINE
// Marriage Analysis - Jupiter
//////////////////////////////////////////////////////////////

import type {
  HoroscopePlanet,
} from "../../horoscope/types";


import type {
  JupiterAnalysis,
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

export interface JupiterInput {

  planets:
    HoroscopePlanet[];

}



//////////////////////////////////////////////////////////////
// ANALYSIS
//////////////////////////////////////////////////////////////

export function analyzeJupiter(
  input: JupiterInput
): JupiterAnalysis {


  const jupiter =
    findPlanet(
      input.planets,
      "Jupiter"
    );



  const strength =
    getPlanetStrength(
      jupiter
    );



  let score =
    strength;



  if(
    jupiter?.retrograde
  ){

    score -= 5;

  }



  score =
    clampScore(
      score
    );



  const remarks:string[] = [];



  if(!jupiter){

    remarks.push(
      "Jupiter planetary data unavailable."
    );

  }
  else {


    if(
      strength >= 70
    ){

      remarks.push(
        "Strong Jupiter supports wisdom, guidance and marital stability."
      );

    }



    if(
      strength < 40
    ){

      remarks.push(
        "Weak Jupiter may require deeper relationship evaluation."
      );

    }



    if(
      jupiter.retrograde
    ){

      remarks.push(
        "Retrograde Jupiter indicates internalised growth patterns."
      );

    }

  }



  return {

    score,


    confidence:
      jupiter
        ? 85
        : 40,


    remarks,


    sign:
      getPlanetSign(
        jupiter
      ),


    house:
      getPlanetHouse(
        jupiter
      ),


    dignity:
      getJupiterDignity(
        jupiter
      ),


    combust:
      false,

  };

}



//////////////////////////////////////////////////////////////
// JUPITER DIGNITY
//////////////////////////////////////////////////////////////

function getJupiterDignity(
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
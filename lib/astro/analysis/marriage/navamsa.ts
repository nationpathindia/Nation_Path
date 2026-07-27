//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO ENGINE
// Marriage Analysis - Navamsa D9 Validation
//////////////////////////////////////////////////////////////

import type {
  NavamsaChart,
} from "../../charts/types";


import type {
  NavamsaMarriageAnalysis,
} from "./types";


import {
  clampScore,
} from "./helpers";



export function analyzeMarriageNavamsa(
  d9?:NavamsaChart
):NavamsaMarriageAnalysis {


  if(!d9){

    return {

      score:50,

      confidence:40,

      promise:false,

      remarks:[
        "Navamsa chart unavailable for validation."
      ]

    };

  }



  let score = 50;


  const remarks:string[]=[];



  const venus =
    d9.planets.find(
      planet =>
        planet.planet === "Venus"
    );



  if(venus){


    if(
      venus.analysis.strength >=70
    ){

      score +=15;

      remarks.push(
        "Strong Venus in Navamsa supports marriage harmony."
      );

    }


    else if(
      venus.analysis.strength <40
    ){

      score -=15;

      remarks.push(
        "Weak Venus in Navamsa may reduce relationship stability."
      );

    }


  }



  /*
    7th lord validation
    will be connected with
    existing seventhLord planet
    in next enhancement
  */


  if(
    score>=50
  ){

    remarks.push(
      "Navamsa provides supportive marriage confirmation."
    );

  }



  return {


    score:
      clampScore(score),


    confidence:
      75,


    promise:
      score>=50,


    remarks,


  };


}
//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO ENGINE
// Marriage Analysis - Saturn Influence Intelligence Layer
// Phase-2 Enhanced
//////////////////////////////////////////////////////////////

import type {
  HoroscopePlanet,
} from "../../horoscope/types";


import type {
  MarriageFactor,
} from "./types";


import {
  findPlanet,
  getPlanetHouse,
  getPlanetStrength,
  clampScore,
} from "./helpers";



//////////////////////////////////////////////////////////////
// SATURN ANALYSIS RESULT
//////////////////////////////////////////////////////////////

export interface SaturnAnalysis
extends MarriageFactor {

  delayIndicator:boolean;


  stabilityLevel:
    | "Weak"
    | "Balanced"
    | "Strong";


  commitmentLevel:
    | "Low"
    | "Moderate"
    | "High";

}



//////////////////////////////////////////////////////////////
// SATURN MARRIAGE ANALYZER
//////////////////////////////////////////////////////////////

export function analyzeSaturnMarriage(
  input:{
    planets:HoroscopePlanet[];
  }
):SaturnAnalysis {



  const saturn =
    findPlanet(
      input.planets,
      "Saturn"
    );



  if(!saturn){

    return {

      score:50,

      confidence:50,

      remarks:[

        "Saturn data unavailable for marriage analysis."

      ],

      delayIndicator:false,

      stabilityLevel:"Balanced",

      commitmentLevel:"Moderate",

    };

  }




  const house =
    getPlanetHouse(
      saturn
    );



  const strength =
    getPlanetStrength(
      saturn
    );



  let score = 60;


  let delayIndicator =
    false;



  let stabilityLevel:
    | "Weak"
    | "Balanced"
    | "Strong"
    =
    "Balanced";



  let commitmentLevel:
    | "Low"
    | "Moderate"
    | "High"
    =
    "Moderate";



  const remarks:string[]=[];




  ////////////////////////////////////////////////////////////
  // HOUSE INFLUENCE
  ////////////////////////////////////////////////////////////


  if(
    house===7
  ){

    score -=10;


    delayIndicator=true;


    remarks.push(

      "Saturn in seventh house may delay marriage but can provide long-term relationship stability."

    );

  }




  if(
    house===8 ||
    house===12
  ){

    score -=5;


    remarks.push(

      "Saturn influence requires patience and emotional maturity in relationship matters."

    );

  }




  if(
    house===2 ||
    house===4 ||
    house===5 ||
    house===11
  ){

    score +=5;


    remarks.push(

      "Supportive Saturn placement can improve commitment, responsibility and family stability."

    );

  }




  ////////////////////////////////////////////////////////////
  // STRENGTH ANALYSIS
  ////////////////////////////////////////////////////////////


  if(
    strength>=75
  ){

    score +=15;


    stabilityLevel="Strong";


    commitmentLevel="High";


    remarks.push(

      "Strong Saturn supports loyalty, patience and lasting relationship foundations."

    );

  }


  else if(
    strength>=50
  ){

    score +=5;


    stabilityLevel="Balanced";


    remarks.push(

      "Balanced Saturn supports mature decisions and responsible partnership."

    );

  }


  else {


    score -=12;


    stabilityLevel="Weak";


    commitmentLevel="Low";


    remarks.push(

      "Weak Saturn may create delays, insecurity or difficulty maintaining consistency."

    );

  }




  ////////////////////////////////////////////////////////////
  // FINAL RESULT
  ////////////////////////////////////////////////////////////


  return {


    score:

      clampScore(
        Math.round(score)
      ),



    confidence:

      85,



    remarks,



    delayIndicator,



    stabilityLevel,



    commitmentLevel,

  };


}
//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO ENGINE
// Marriage Analysis - Mars Influence Intelligence Layer
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
// MARS ANALYSIS RESULT
//////////////////////////////////////////////////////////////

export interface MarsAnalysis
extends MarriageFactor {

  conflictLevel:
    | "Low"
    | "Moderate"
    | "High";


  energyLevel:
    | "Weak"
    | "Balanced"
    | "Strong";


  manglikIndicator:boolean;

}



//////////////////////////////////////////////////////////////
// MARS MARRIAGE ANALYZER
//////////////////////////////////////////////////////////////

export function analyzeMarsMarriage(
  input:{
    planets:HoroscopePlanet[];
  }
):MarsAnalysis {



  const mars =
    findPlanet(
      input.planets,
      "Mars"
    );



  if(!mars){

    return {

      score:50,

      confidence:50,

      remarks:[
        "Mars data unavailable for marriage analysis."
      ],

      conflictLevel:"Moderate",

      energyLevel:"Balanced",

      manglikIndicator:false,

    };

  }




  const house =
    getPlanetHouse(
      mars
    );



  const strength =
    getPlanetStrength(
      mars
    );



  let score = 60;


  let conflictLevel:
    "Low"
    |
    "Moderate"
    |
    "High"
    = "Moderate";


  let energyLevel:
    "Weak"
    |
    "Balanced"
    |
    "Strong"
    = "Balanced";



  let manglikIndicator =
    false;



  const remarks:string[]=[];




  ////////////////////////////////////////////////////////////
  // HOUSE BASED ANALYSIS
  ////////////////////////////////////////////////////////////


  const sensitiveHouses = [

    1,

    4,

    7,

    8,

    12,

  ];



  if(
    sensitiveHouses.includes(
      house
    )
  ){

    manglikIndicator=true;


    score -=15;


    conflictLevel="High";


    remarks.push(

      "Mars placement indicates higher relationship intensity requiring patience and emotional balance."

    );

  }




  if(
    house===7
  ){

    score -=10;


    remarks.push(

      "Mars in seventh house may increase arguments and dominance tendencies."

    );

  }




  if(
    house===8
  ){

    score -=8;


    remarks.push(

      "Mars influence on eighth house requires careful handling of emotional reactions."

    );

  }




  ////////////////////////////////////////////////////////////
  // STRENGTH ANALYSIS
  ////////////////////////////////////////////////////////////


  if(
    strength>=75
  ){

    score +=12;


    energyLevel="Strong";


    remarks.push(

      "Strong Mars supports courage, passion and protective relationship energy."

    );

  }


  else if(
    strength>=50
  ){

    score +=5;


    energyLevel="Balanced";


    remarks.push(

      "Balanced Mars provides healthy motivation and initiative."

    );

  }


  else {


    score -=10;


    energyLevel="Weak";


    remarks.push(

      "Weak Mars may reduce patience and create frustration during conflicts."

    );

  }




  ////////////////////////////////////////////////////////////
  // FINAL SCORE NORMALIZATION
  ////////////////////////////////////////////////////////////


  return {


    score:

      clampScore(
        Math.round(score)
      ),



    confidence:

      85,



    remarks,



    conflictLevel,



    energyLevel,



    manglikIndicator,

  };

}
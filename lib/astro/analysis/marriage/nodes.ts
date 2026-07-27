//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO ENGINE
// Marriage Analysis - Rahu/Ketu Influence
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



export interface NodesAnalysis
extends MarriageFactor {}



export function analyzeNodesMarriage(
  input:{
    planets:HoroscopePlanet[];
  }
):NodesAnalysis {


  const rahu =
    findPlanet(
      input.planets,
      "Rahu"
    );


  const ketu =
    findPlanet(
      input.planets,
      "Ketu"
    );


  let score = 60;


  const remarks:string[]=[];



  if(!rahu && !ketu){

    return {

      score:50,

      confidence:50,

      remarks:[
        "Rahu and Ketu data unavailable."
      ]

    };

  }



  if(rahu){

    const rahuHouse =
      getPlanetHouse(rahu);


    const rahuStrength =
      getPlanetStrength(rahu);



    if(rahuHouse===7){

      score -=20;

      remarks.push(
        "Rahu in seventh house may create unconventional relationship patterns."
      );

    }



    if(rahuStrength>=70){

      remarks.push(
        "Strong Rahu increases attraction and unusual experiences."
      );

    }

  }



  if(ketu){

    const ketuHouse =
      getPlanetHouse(ketu);


    const ketuStrength =
      getPlanetStrength(ketu);



    if(ketuHouse===7){

      score -=15;

      remarks.push(
        "Ketu in seventh house may create emotional detachment."
      );

    }



    if(ketuStrength>=70){

      score +=5;

      remarks.push(
        "Strong Ketu supports spiritual understanding."
      );

    }

  }



  return {

    score:
      clampScore(score),

    confidence:
      80,

    remarks,

  };


}
//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO ENGINE
// Marriage Analysis - Intelligent Summary Engine Phase-2
//////////////////////////////////////////////////////////////

import type {
  MarriageAnalysis,
} from "./types";


export function generateMarriageSummary(

  analysis:MarriageAnalysis

):string {


  const positive:string[] = [];

  const challenges:string[] = [];



  if(
    analysis.seventhHouse.score >= 60
  ){

    positive.push(
      "supportive seventh house influences"
    );

  }



  if(
    analysis.jupiter.score >= 60
  ){

    positive.push(
      "beneficial Jupiter support for relationship growth"
    );

  }



  if(
    analysis.saturn.score >= 65
  ){

    positive.push(
      "strong Saturn influence indicating patience, responsibility and commitment potential"
    );

  }



  if(
    analysis.navamsa.promise
  ){

    positive.push(
      "supportive Navamsa confirmation for marriage potential"
    );

  }



  if(
    analysis.venus.score < 50
  ){

    challenges.push(
      "weak Venus influence may create challenges in emotional expression and relationship harmony"
    );

  }



  if(
    analysis.mars.conflictLevel === "High"
  ){

    challenges.push(
      "Mars influence may increase intensity and adjustment challenges"
    );

  }



  if(
    analysis.delay.level === "High"
  ){

    challenges.push(
      "delay factors indicate need for maturity and patience before commitment"
    );

  }



  if(
    analysis.separation.risk === "High" ||
    analysis.separation.risk === "Moderate"
  ){

    challenges.push(
      "relationship stability requires better communication and mutual understanding"
    );

  }




  let summary = "";



  if(
    positive.length > 0
  ){

    summary +=
      "Marriage prospects show supportive influences through " +
      positive.join(", ") +
      ". ";

  }



  if(
    challenges.length > 0
  ){

    summary +=
      "However, " +
      challenges.join(", ") +
      ".";

  }



  if(
    summary.length === 0
  ){

    summary =
      "Marriage indicators require balanced evaluation based on planetary influences.";

  }



  return summary.trim();

}
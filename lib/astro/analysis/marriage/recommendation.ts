//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO ENGINE
// Marriage Analysis - Intelligent Recommendation Engine Phase-2
//////////////////////////////////////////////////////////////

import type {
  MarriageAnalysis,
} from "./types";




//////////////////////////////////////////////////////////////
// MAIN RECOMMENDATION ENGINE
//////////////////////////////////////////////////////////////

export function generateMarriageRecommendations(

  analysis:MarriageAnalysis

):string[] {



const recommendations:string[] = [];





function addRecommendation(

text:string

){

if(

!recommendations.includes(text)

){

recommendations.push(text);

}

}








//////////////////////////////////////////////////////////////
// VENUS INTELLIGENCE
//////////////////////////////////////////////////////////////

if(

analysis.venus.score < 40

){

addRecommendation(

"Develop emotional expression, affection and communication skills to improve relationship harmony."

);

}

else if(

analysis.venus.score < 50

){

addRecommendation(

"Maintain emotional openness and mutual understanding for a balanced relationship."

);

}








//////////////////////////////////////////////////////////////
// MARS CONFLICT INTELLIGENCE
//////////////////////////////////////////////////////////////

if(

analysis.mars.conflictLevel === "High"

){


addRecommendation(

"Control impulsive reactions and avoid unnecessary conflicts. Patience and emotional balance will strengthen relationships."

);


}




if(

analysis.mars.manglikIndicator

){


addRecommendation(

"Mars influence suggests focusing on compatibility, patience and mutual respect before major commitments."

);


}








//////////////////////////////////////////////////////////////
// DELAY INTELLIGENCE
//////////////////////////////////////////////////////////////

if(

analysis.delay.delay

){


switch(

analysis.delay.level

){


case "High":

addRecommendation(

"Avoid rushing marriage decisions. Mature understanding and proper compatibility evaluation are important."

);

break;



case "Moderate":

addRecommendation(

"Allow relationships to develop naturally with patience and realistic expectations."

);

break;



case "Low":

addRecommendation(

"Small delays may help in better preparation and understanding between partners."

);

break;


}



}








//////////////////////////////////////////////////////////////
// SEPARATION / RISK INTELLIGENCE
//////////////////////////////////////////////////////////////

if(

analysis.separation.risk === "High"

){


addRecommendation(

"Focus on communication, emotional awareness and conflict resolution to protect relationship stability."

);


}



else if(

analysis.separation.risk === "Moderate"

){


addRecommendation(

"Maintain healthy communication and avoid misunderstandings in relationship matters."

);


}








//////////////////////////////////////////////////////////////
// SATURN POSITIVE INTELLIGENCE
//////////////////////////////////////////////////////////////

if(

analysis.saturn.stabilityLevel === "Strong"

){


addRecommendation(

"Strong Saturn influence supports long-term commitment through patience, responsibility and loyalty."

);


}



//////////////////////////////////////////////////////////////
// NAVAMSA SUPPORT
//////////////////////////////////////////////////////////////

if(

analysis.navamsa.promise

){


addRecommendation(

"Navamsa indicates supportive marriage potential when other factors are handled with maturity."

);


}








//////////////////////////////////////////////////////////////
// DEFAULT
//////////////////////////////////////////////////////////////

if(

recommendations.length === 0

){


addRecommendation(

"Maintain trust, communication and balanced decisions for a harmonious relationship."

);


}







//////////////////////////////////////////////////////////////
// LIMIT OUTPUT
//////////////////////////////////////////////////////////////

return recommendations.slice(0,5);



}
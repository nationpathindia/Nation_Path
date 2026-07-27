//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
// Prediction Prioritization Intelligence Layer
// Future Proof Ranking System v8 FINAL LOCK
//////////////////////////////////////////////////////////////

import type {

  PredictionRanking,

  PredictionCategory,

  PredictionInsight,

} from "./types";


import type {

  PredictionContext,

} from "./context";





//////////////////////////////////////////////////////////////
// SAFE HELPERS
//////////////////////////////////////////////////////////////

function safeArray<T>(

 value:T[] | undefined | null

):T[] {

 return Array.isArray(value)

 ? value

 : [];

}





function clamp(

 value:number

):number {

 return Math.max(

  0,

  Math.min(

   100,

   Math.round(value)

  )

 );

}





function normalizeText(

 value:string | undefined | null

):string {


 return (value ?? "")

 .toLowerCase()

 .replace(

  /[^a-z0-9]/g,

  ""

 );

}





function cleanName(

 value:string | undefined | null

):string {


 return (

  value ?? "Influence"

 )

 .replace(

  " influence",

  ""

 )

 .trim();


}





//////////////////////////////////////////////////////////////
// CATEGORY INTELLIGENCE
//////////////////////////////////////////////////////////////

function getCategoryImportance(

 category:PredictionCategory

):number {


 const weights:

 Partial<Record<PredictionCategory,number>>

 = {


  career:1.30,

  finance:1.25,

  relationship:1.20,

  health:1.20,

  education:1.15,

  communication:1.10,

  spirituality:1.10,

  ambition:1.10,

  personality:1.05,

  mind:1.05,

  family:1,

  travel:1,

  energy:1,

  responsibility:1,

  overall:.95


 };



 return weights[category] ?? 1;


}







//////////////////////////////////////////////////////////////
// CONFIDENCE RESOLUTION
//////////////////////////////////////////////////////////////

function resolveConfidence(

 value:number | undefined

):number {


 return clamp(

  value ?? 70

 );


}







//////////////////////////////////////////////////////////////
// ADVANCED SCORE ENGINE
//////////////////////////////////////////////////////////////

function calculateRankingScore(

 base:number,

 confidence:number,

 influence:number,

 importance:number,

 stability:number

):number {


 return clamp(


  (

   base * 0.45

  )

  +

  (

   confidence * 0.20

  )

  +

  (

   influence * 0.15

  )

  +

  (

   importance * 15

  )

  +

  (

   stability * 0.05

  )


 );


}







//////////////////////////////////////////////////////////////
// SCORE BALANCE ENGINE
//////////////////////////////////////////////////////////////

function normalizeRankingSpread(

 rankings:PredictionRanking[]

):PredictionRanking[] {


 if(rankings.length===0){

  return [];

 }



 const maxScore =

 rankings[0].score;



 return rankings.map(

 (item,index)=>{


  let score = item.score;



  if(index===0){

   score = Math.min(

    95,

    maxScore

   );

  }



  else if(index===1){

   score = Math.min(

    90,

    maxScore - 3

   );

  }



  else if(index===2){

   score = Math.min(

    86,

    maxScore - 7

   );

  }



  else {


   score = Math.min(

    score,

    82 - (index * 2)

   );


  }





  return {


   ...item,


   score:

   clamp(score)


  };


 }


 );


}







//////////////////////////////////////////////////////////////
// STABILITY INTELLIGENCE
//////////////////////////////////////////////////////////////

function calculateStability(

 score:number

):number {


 if(score>=80){

  return 100;

 }



 if(score>=60){

  return 80;

 }



 if(score>=40){

  return 60;

 }



 return 40;


}







//////////////////////////////////////////////////////////////
// REASON GENERATORS
//////////////////////////////////////////////////////////////

function generatePlanetReason(

 planet:string,

 score:number

):string {


 const name =

 cleanName(planet);



 if(score>=80){

 return (

 `${name} shows a dominant planetary pattern with strong influence, opportunities and meaningful impact in the current cycle.`

 );

 }



 return (

 `${name} creates a developing influence where awareness, patience and balanced decisions improve outcomes.`

 );


}







function generateLifeReason(

 area:string,

 score:number

):string {


 const name =

 cleanName(area);



 if(score>=80){

 return (

 `${name} becomes a highly active life area supported by planetary strength, confidence and positive development indicators.`

 );

 }



 return (

 `${name} shows gradual progress through consistent effort, awareness and practical improvement.`

 );


}







function generateInsightReason(

 title:string

):string {


 return (

 `${title} is prioritized through relevance, influence strength, confidence and predictive importance.`

 );


}
//////////////////////////////////////////////////////////////
// DUPLICATE RANKING INTELLIGENCE
//////////////////////////////////////////////////////////////

function createIdentity(

 item:PredictionRanking

):string {


 return normalizeText(

  `${item.category}-${item.title}`

 );


}





function removeDuplicateRankings(

 rankings:PredictionRanking[]

):PredictionRanking[] {


 const map =

 new Map<string,PredictionRanking>();



 for(const item of rankings){


  const key =

  createIdentity(item);



  const existing =

  map.get(key);



  if(

   !existing ||

   item.score > existing.score

  ){


   map.set(

    key,

    item

   );


  }


 }



 return Array.from(

  map.values()

 );


}







//////////////////////////////////////////////////////////////
// PLANET RANKING ENGINE
//////////////////////////////////////////////////////////////

function rankPlanetPredictions(

 context:PredictionContext

):PredictionRanking[] {



 return safeArray(

  context?.planetaryPredictions

 )


 .map(

 prediction => {



  const confidence =

  resolveConfidence(

   prediction.confidence

  );



  const influence =

  prediction.influenceScore

  ??

  prediction.strengthScore;



  const stability =

  calculateStability(

   prediction.strengthScore

  );



  const score =

  calculateRankingScore(

   prediction.strengthScore,

   confidence,

   influence,

   1,

   stability

  );





  return {


   title:

   `${prediction.planet} influence`,



   category:

   "overall",



   score,



   confidence,



   reason:

   generatePlanetReason(

    prediction.planet,

    score

   )


  };


 }


 );

}







//////////////////////////////////////////////////////////////
// LIFE AREA RANKING ENGINE
//////////////////////////////////////////////////////////////

function rankLifePredictions(

 context:PredictionContext

):PredictionRanking[] {



 return safeArray(

  context?.lifePredictions

 )


 .map(

 prediction => {



  const confidence =

  resolveConfidence(

   prediction.confidence

  );



  const importance =

  getCategoryImportance(

   prediction.area

  );



  const stability =

  calculateStability(

   prediction.score

  );



  const score =

  calculateRankingScore(

   prediction.score,

   confidence,

   prediction.score,

   importance,

   stability

  );





  return {


   title:

   `${prediction.area} influence`,



   category:

   prediction.area,



   score,



   confidence,



   reason:

   generateLifeReason(

    prediction.area,

    score

   )


  };


 }


 );

}







//////////////////////////////////////////////////////////////
// INSIGHT RANKING ENGINE
//////////////////////////////////////////////////////////////

function rankInsights(

 insights:PredictionInsight[] | undefined | null

):PredictionRanking[] {


 return safeArray(

  insights

 )


 .map(

 insight => {



  const confidence =

  resolveConfidence(

   insight.confidence

  );



  const stability =

  calculateStability(

   insight.priority

  );



  const score =

  calculateRankingScore(

   insight.priority,

   confidence,

   insight.priority,

   1,

   stability

  );





  return {


   title:

   insight.title,



   category:

   "overall",



   score,



   confidence,



   reason:

   generateInsightReason(

    insight.title

   )


  };


 }


 );

}







//////////////////////////////////////////////////////////////
// CATEGORY BALANCE ENGINE
//////////////////////////////////////////////////////////////

function balanceCategories(

 rankings:PredictionRanking[]

):PredictionRanking[] {


 const counter:

 Record<string,number>

 = {};



 return rankings.filter(

 item => {


  const category =

  item.category;



  counter[category] =

  (

   counter[category] ?? 0

  )

  +1;



  if(

   category === "overall"

   &&

   counter[category] > 3

  ){

   return false;

  }



  if(

   category !== "overall"

   &&

   counter[category] > 1

  ){

   return false;

  }



  return true;


 }

 );


}







//////////////////////////////////////////////////////////////
// FINAL RANKING BUILDER
//////////////////////////////////////////////////////////////

export function buildPredictionRanking(

 context:PredictionContext

):PredictionRanking[] {



 const combined = [


  ...rankPlanetPredictions(

   context

  ),



  ...rankLifePredictions(

   context

  ),



  ...rankInsights(

   context?.opportunities

  ),



  ...rankInsights(

   context?.cautions

  )


 ];






 const ranked =

 balanceCategories(


  removeDuplicateRankings(

   combined

  )


  .filter(

   item =>

   item.score >=45

  )


  .sort(

   (a,b)=>

   b.score -

   a.score

  )


 );






 return normalizeRankingSpread(

  ranked

 )

 .slice(

  0,

  10

 );


}
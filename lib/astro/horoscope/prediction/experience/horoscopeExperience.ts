//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// HOROSCOPE EXPERIENCE INTELLIGENCE
//
// Presentation Intelligence Layer
//
// Converts:
// Horoscope Prediction Output
//
// Into:
// Premium Horoscope Experience Structure
//
// No calculations.
// No ranking logic.
// No language generation.
//////////////////////////////////////////////////////////////


import type {

  HoroscopePrediction,

  PredictionRanking,

  PredictionCategory,

} from "../types";



//////////////////////////////////////////////////////////////
// EXPERIENCE OUTPUT TYPES
//////////////////////////////////////////////////////////////

export interface HoroscopeExperience {


  heroTheme: {


    title:string;


    planet?:string;


    score:number;


    reason?:string;


    theme?:string;


  };



  topInfluences:

    ExperienceInfluence[];




  keyAreas:

    ExperienceArea[];




  opportunities:

    string[];




  cautions:

    string[];




  guidance:

    string[];




  overview:

    string;

  luckyFactors: {

    number:string;

    color:string;

    direction:string;

    time:string;

  };


  narrative?:

    HoroscopePrediction["narrative"];


}







export interface ExperienceInfluence {


  title:string;


  category:string;


  score:number;


  confidence?:number;


  reason?:string;


}







export interface ExperienceArea {


  title:string;


  category?:PredictionCategory;


  score:number;


  confidence?:number;


  insight?:string;


}







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








function cleanTitle(

 value:string

):string {


 return value

 .replace(

  / influence/gi,

  ""

 )

 .replace(

  /_/g,

  " "

 )

 .trim()

 .replace(

  /^./,

  char =>

  char.toUpperCase()

 );


}








function cleanText(

 value:string | undefined

):string {


 return (value ?? "")

 .trim();


}








//////////////////////////////////////////////////////////////
// THEME MAPPING
//////////////////////////////////////////////////////////////

function resolveTheme(

 category:string

):string {


 const themes:

 Record<string,string>

 = {


  career:

   "Professional Growth",


  finance:

   "Financial Direction",


  relationship:

   "Relationship Balance",


  health:

   "Wellbeing Awareness",


  education:

   "Learning & Expansion",


  spirituality:

   "Inner Growth",


  communication:

   "Expression & Connection",


  mind:

   "Mental Clarity",


  overall:

   "Personal Growth",


 };




 return (

  themes[category]

  ??

  "Personal Development"

 );


}








//////////////////////////////////////////////////////////////
// HERO THEME BUILDER
//////////////////////////////////////////////////////////////

function buildHeroTheme(

 ranking:PredictionRanking[]

) {


 const top =

 ranking[0];




 if(!top){


  return {


   title:

    "Personal Growth Journey",


   score:

    0,


   theme:

    "Personal Development",


   reason:

    "Your horoscope highlights opportunities for awareness and balanced growth."


  };


 }





 return {


  title:

   cleanTitle(

    top.title

   ),



  planet:

   top.category === "overall"

   ? undefined

   : cleanTitle(top.title),



  score:

   top.score,



  theme:

   resolveTheme(

    top.category

   ),



  reason:

   top.reason,


 };


}








//////////////////////////////////////////////////////////////
// TOP INFLUENCES BUILDER
//////////////////////////////////////////////////////////////

function buildTopInfluences(

 ranking:PredictionRanking[]

):ExperienceInfluence[] {


 return safeArray(

  ranking

 )

 .slice(

  0,

  3

 )

 .map(

  item => ({


   title:

    cleanTitle(

     item.title

    ),



   category:

    item.category,



   score:

    item.score,



   confidence:

    item.confidence,



   reason:

    item.reason,


  })

 );


}








//////////////////////////////////////////////////////////////
// KEY AREA BUILDER
//////////////////////////////////////////////////////////////

function buildKeyAreas(

 prediction:HoroscopePrediction,

 ranking:PredictionRanking[]

):ExperienceArea[] {


 const rankedAreas =

 safeArray(

  ranking

 )

 .filter(

  item =>

   item.category !== "overall"

 );





 return rankedAreas

 .slice(

  0,

  5

 )

 .map(

  item => {



   const life =

   safeArray(

    prediction.lifePredictions

   )

   .find(

    area =>

    area.area === item.category

   );




   return {


    title:

     cleanTitle(

      item.title

     ),



    category:

     item.category,



    score:

     item.score,



    confidence:

     item.confidence,



    insight:

     cleanText(

      life?.summary

     )

     ||

     cleanText(

      item.reason

     ),


   };


  })


}








//////////////////////////////////////////////////////////////
// CLEAN INSIGHT LIST
//////////////////////////////////////////////////////////////

function cleanInsightList(

 values:string[]

):string[] {


 return Array.from(

  new Set(

   values

   .map(

    item =>

    cleanTitle(item)

   )

   .filter(Boolean)

  )

 );


}


//////////////////////////////////////////////////////////////
// LUCKY FACTORS BUILDER
//////////////////////////////////////////////////////////////

function buildLuckyFactors(

 prediction:HoroscopePrediction

){

 const strongest =

 prediction.planetaryPredictions?.[0];


 return {

  number:

    strongest?.strengthScore

    ?

    String(

      (strongest.strengthScore % 9) || 9

    )

    :

    "9",


  color:

    strongest?.planet

    ?

    strongest.planet

    :

    "Gold",


  direction:

    "East",


  time:

    "Morning",


 };

}





//////////////////////////////////////////////////////////////
// EXPERIENCE BUILDER
//////////////////////////////////////////////////////////////

export function createHoroscopeExperience(

 prediction:HoroscopePrediction

):HoroscopeExperience {



 const ranking =

 safeArray(

  prediction.predictionRanking

 );





 return {


  heroTheme:

   buildHeroTheme(

    ranking

   ),





  topInfluences:

   buildTopInfluences(

    ranking

   ),





  keyAreas:

   buildKeyAreas(

    prediction,

    ranking

   ),





  opportunities:

   cleanInsightList(

    safeArray(

     prediction.opportunities

    )

    .map(

     item =>

     item.title

    )

   ),


luckyFactors:

 buildLuckyFactors(

  prediction

),


  cautions:

   cleanInsightList(

    safeArray(

     prediction.cautions

    )

    .map(

     item =>

     item.title

    )

   ),





  guidance:

   safeArray(

    prediction.guidance

   ),





  overview:

   prediction.overview,





  narrative:

   prediction.narrative,


 };

}
//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// HOROSCOPE EXPERIENCE INTELLIGENCE
//
// Experience Section Builder v2
//
// Converts:
// Horoscope Prediction Data
//
// Into:
// Premium UI Experience Sections
//
// No calculations.
// No astrology logic.
// No UI logic.
//////////////////////////////////////////////////////////////

import type {

  HoroscopePrediction,

  LifePrediction,

  PredictionInsight,

} from "../types";


import {

  mapPredictionTheme,

} from "./themeMapper";





//////////////////////////////////////////////////////////////
// EXPERIENCE SECTION TYPES
//////////////////////////////////////////////////////////////

export interface ExperienceSection {


  id:

    string;


  type:

    | "life"
    | "opportunity"
    | "caution"
    | "theme";


  title:

    string;


  score:

    number;


  confidence?:

    number;


  summary:

    string;


  insights:

    string[];


  priority:

    "high"

    |

    "medium"

    |

    "low";


}







//////////////////////////////////////////////////////////////
// SAFE HELPERS
//////////////////////////////////////////////////////////////

function safeArray<T>(

 value:T[] | undefined | null

):T[] {


 return Array.isArray(value)

 ?

 value

 :

 [];

}




function resolvePriority(

 score:number

):

"high"

|

"medium"

|

"low"

{


 if(score >= 80){

  return "high";

 }


 if(score >= 60){

  return "medium";

 }


 return "low";


}




function cleanId(

 value:string

){

 return value

 .toLowerCase()

 .replace(

 /[^a-z0-9]+/g,

 "-"

 )

 .replace(

 /^-|-$|/g,

 ""

 );

}






//////////////////////////////////////////////////////////////
// LIFE AREA SECTION BUILDER
//////////////////////////////////////////////////////////////

function buildLifeSections(

 lifePredictions:LifePrediction[]

):ExperienceSection[] {


 return safeArray(

  lifePredictions

 )

 .slice(

  0,

  6

 )

 .map(

 life => ({


  id:

    `life-${cleanId(

      life.area

    )}`,



  type:

    "life",



  title:

    mapPredictionTheme(

      life.area

    ),



  score:

    life.score,



  confidence:

    life.confidence,



  summary:

    life.summary

    ??

    `${life.area} shows active planetary influence and development opportunities.`,



  insights:

    safeArray(

      life.messages

    )

    .slice(

      0,

      3

    )

    .map(

      message =>

      message.prediction

    ),



  priority:

    resolvePriority(

      life.score

    ),



 }))


}








//////////////////////////////////////////////////////////////
// INSIGHT SECTION BUILDER
//////////////////////////////////////////////////////////////

function buildInsightSections(

 insights:PredictionInsight[],

 type:

 "opportunity"

 |

 "caution"

):ExperienceSection[] {


 return safeArray(

  insights

 )

 .slice(

  0,

  5

 )

 .map(

 item => ({



  id:

    `${type}-${cleanId(

      item.title

    )}`,



  type,



  title:

    item.title,



  score:

    item.priority,



  confidence:

    item.confidence,



  summary:

    item.description,



  insights:

    safeArray(

      item.keywords

    ),



  priority:

    resolvePriority(

      item.priority

    ),



 }))


}







//////////////////////////////////////////////////////////////
// DUPLICATE PROTECTION
//////////////////////////////////////////////////////////////

function removeDuplicates(

 sections:ExperienceSection[]

){


 const memory =

 new Set<string>();


 return sections.filter(

 section => {


  if(memory.has(

    section.id

  )){


    return false;

  }


  memory.add(

    section.id

  );


  return true;


 })

}





//////////////////////////////////////////////////////////////
// COMPLETE EXPERIENCE BUILDER
//////////////////////////////////////////////////////////////

export function buildExperienceSections(

 prediction:HoroscopePrediction

):ExperienceSection[] {


 const sections = [

  ...buildLifeSections(

    prediction.lifePredictions

  ),


  ...buildInsightSections(

    prediction.opportunities,

    "opportunity"

  ),


  ...buildInsightSections(

    prediction.cautions,

    "caution"

  ),


 ];




 return removeDuplicates(

  sections

 )

 .sort(

  (a,b)=>

   b.score -

   a.score

 );

}
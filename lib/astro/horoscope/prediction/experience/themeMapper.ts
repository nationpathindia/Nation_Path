//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// HOROSCOPE EXPERIENCE INTELLIGENCE
//
// Theme Presentation Mapper
//
// Converts:
// Internal Prediction Categories
//
// Into:
// Premium User Experience Themes
//
// No astrology logic.
// No scoring.
// No calculations.
//////////////////////////////////////////////////////////////


import type {

  PredictionCategory,

} from "../types";





//////////////////////////////////////////////////////////////
// PREMIUM THEME MAP
//////////////////////////////////////////////////////////////

const THEME_MAP:

Partial<Record<PredictionCategory,string>>

= {


  overall:

    "Current Life Cycle",



  personality:

    "Personal Growth",



  career:

    "Career Growth",



  finance:

    "Financial Direction",



  relationship:

    "Relationship Harmony",



  health:

    "Wellbeing Balance",



  mind:

    "Mental Clarity",



  spirituality:

    "Inner Growth",



  energy:

    "Energy Balance",



  responsibility:

    "Responsibilities & Commitments",



  ambition:

    "Goals & Achievement",



  education:

    "Learning & Knowledge",



  communication:

    "Communication Strength",



  travel:

    "Travel & Exploration",



  family:

    "Family Connections",



  comfort:

    "Comfort & Stability",



  research:

    "Research & Discovery",


};







//////////////////////////////////////////////////////////////
// SAFE CATEGORY NORMALIZER
//////////////////////////////////////////////////////////////

function normalizeCategory(

  category:string

):string {


  return category

    .toLowerCase()

    .trim();


}








//////////////////////////////////////////////////////////////
// PUBLIC THEME RESOLVER
//////////////////////////////////////////////////////////////

export function mapPredictionTheme(

  category:PredictionCategory

):string {


  return (

    THEME_MAP[category]

    ??

    "Personal Development"

  );


}








//////////////////////////////////////////////////////////////
// STRING BASED RESOLVER
//
// Useful for API / dynamic data
//////////////////////////////////////////////////////////////

export function mapDynamicTheme(

  category:string

):string {


  const normalized =

    normalizeCategory(

      category

    );



  return (

    THEME_MAP[

      normalized as PredictionCategory

    ]

    ??

    capitalizeTheme(

      normalized

    )

  );


}








//////////////////////////////////////////////////////////////
// FALLBACK FORMATTER
//////////////////////////////////////////////////////////////

function capitalizeTheme(

  value:string

):string {


  if(!value){

    return "Personal Development";

  }



  return (

    value.charAt(0)

      .toUpperCase()

    +

    value.slice(1)

  );


}








//////////////////////////////////////////////////////////////
// THEME GROUPING
//////////////////////////////////////////////////////////////

export function getThemeGroup(

  category:PredictionCategory

):


"growth"

|

"stability"

|

"connection"

|

"awareness"

{


  switch(category){


    case "career":

    case "finance":

    case "ambition":

    case "education":

      return "growth";



    case "health":

    case "comfort":

    case "responsibility":

    case "energy":

      return "stability";



    case "relationship":

    case "family":

    case "communication":

      return "connection";



    default:

      return "awareness";


  }


}
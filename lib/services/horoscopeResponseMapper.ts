//////////////////////////////////////////////////////////////
// NATIONPATH HOROSCOPE RESPONSE MAPPER
//
// Engine Response → Frontend Intelligence Response
//
// Layer:
//
// Astro Engine
//      ↓
// Horoscope Prediction
//      ↓
// Experience Intelligence
//      ↓
// Response Mapper
//      ↓
// Premium Horoscope UI
//
// Locked:
// - No calculation changes
// - No prediction changes
// - No engine modification
//////////////////////////////////////////////////////////////


import type {
  HoroscopeResult,
  HoroscopeLanguage,
} from "@/lib/astro/horoscope/types";




//////////////////////////////////////////////////////////////
// FRONTEND TYPES
//////////////////////////////////////////////////////////////


export interface HoroscopeExperience {


  heroTheme?: {

    id?:string;

    type?:string;

    title?:string;

    score?:number;

    summary?:string;

    insights?:string[];

    priority?:string;

  };



  topThemes?:any[];



  keyAreas?:any[];



  opportunities?: {

    title:string;

    description:string;

  }[];



  cautions?: {

    title:string;

    description:string;

  }[];



  guidance?:string[];



  overview?:string;



  narrative?: {

    opening:string;

    development:string;

    advice:string;

    closing:string;

  };


}









export interface HoroscopeFrontendResponse {


  date:string;



  language:HoroscopeLanguage;



  zodiacSign:string;





  prediction:{



    headline:string;



    overview:string;



    naturalSummary?:string;



    guidance:string[];


    luckyFactors?: {

  number?: string;

  color?: string;

  direction?: string;

  time?: string;

};



    planets:{


      name:string;


      strengthScore:number;


      dignity:string;


      message:string;


      positive:string[];


      caution:string[];


    }[];







    life:{


      area:string;


      score:number;


      summary?:string;


      confidence?:number;


      dominantPlanet?:string;



      trend?:

      | "positive"

      | "challenging"

      | "balanced";





      messages:{


        category:string;


        title:string;


        prediction:string;


        guidance?:string;


        keywords:string[];


        priority:number;


        confidence?:number;


      }[];




    }[];







    opportunities:{


      title:string;


      description:string;


    }[];







    cautions:{


      title:string;


      description:string;


    }[];







    narrative?:{


      opening:string;


      development:string;


      advice:string;


      closing:string;


    };



  };







  ////////////////////////////////////////////////////////////
  // EXPERIENCE INTELLIGENCE
  ////////////////////////////////////////////////////////////

  experience?: HoroscopeExperience;



}









//////////////////////////////////////////////////////////////
// RESPONSE MAPPER
//////////////////////////////////////////////////////////////


export function mapHoroscopeResponse(

  horoscope: HoroscopeResult,

  zodiacSign:string

):HoroscopeFrontendResponse {



const prediction =

horoscope.prediction;






return {



date:

horoscope.date.toISOString(),





language:

horoscope.language,





zodiacSign,







prediction:{






headline:

prediction?.headline

??

"",







overview:

prediction?.overview

??

"",




naturalSummary:

prediction?.naturalSummary,



guidance:

prediction?.guidance

??

[],

luckyFactors:

(prediction as any)?.luckyFactors
??
undefined,







//////////////////////////////////////////////////////////////
// PLANET INTELLIGENCE
//////////////////////////////////////////////////////////////

planets:



prediction?.planetaryPredictions

?.

map(

planet => ({


name:

planet.planet,



strengthScore:

planet.strengthScore,



dignity:

planet.dignity,



message:

planet.message,



positive:

planet.positive

??

[],



caution:

planet.caution

??

[],



})

)

??

[],









//////////////////////////////////////////////////////////////
// LIFE DOMAIN INTELLIGENCE
//////////////////////////////////////////////////////////////

life:



prediction?.lifePredictions

?.

map(

life => ({



area:

life.area,





score:

life.score,





summary:

life.summary,





confidence:

life.confidence,





dominantPlanet:

life.dominantPlanet,





trend:

life.trend,







messages:

life.messages

?.

map(

message => ({



category:

message.category,





title:

message.title,





prediction:

message.prediction,





guidance:

message.guidance,





keywords:

message.keywords

??

[],





priority:

message.priority,





confidence:

message.confidence,



})

)

??

[],



})

)

??

[],









//////////////////////////////////////////////////////////////
// OPPORTUNITIES
//////////////////////////////////////////////////////////////

opportunities:



prediction?.opportunities

??

[],









//////////////////////////////////////////////////////////////
// CAUTIONS
//////////////////////////////////////////////////////////////

cautions:



prediction?.cautions

??

[],









//////////////////////////////////////////////////////////////
// NARRATIVE INTELLIGENCE
//////////////////////////////////////////////////////////////

narrative:

prediction?.narrative,






},







//////////////////////////////////////////////////////////////
// EXPERIENCE INTELLIGENCE
//////////////////////////////////////////////////////////////

experience:



(prediction as any)?.experience

??

(horoscope as any)?.experience

??

undefined,





};




}
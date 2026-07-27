//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
// Horoscope Prediction Helpers
// Future Proof Intelligence Utilities
//////////////////////////////////////////////////////////////


import type {
  HoroscopePlanet,
} from "../types";


import {

  PLANET_PREDICTION_THEMES,

  PREDICTION_THRESHOLDS,

  DIGNITY_MODIFIERS,

} from "./rules";


import type {

  PredictionSource,

} from "./types";


import {
  getPlanetName,
} from "../planetMapper";


//////////////////////////////////////////////////////////////
// PLANET IDENTIFIER
//////////////////////////////////////////////////////////////
export function getPredictionPlanetId(

  planet: HoroscopePlanet

): string {


  return getPlanetName(

    planet.planet

  );


}






//////////////////////////////////////////////////////////////
// PLANET KEYWORDS
//////////////////////////////////////////////////////////////

export function getPlanetKeywords(

  planet: HoroscopePlanet

): string[] {


  const intelligenceKeywords =

    planet.intelligence?.keywords
    ??
    [];



  const ruleThemes =

    PLANET_PREDICTION_THEMES[
      getPredictionPlanetId(
        planet
      )
    ]
    ??
    [];



  return uniqueStrings(

    [

      ...intelligenceKeywords,

      ...ruleThemes,

    ]

  );


}







//////////////////////////////////////////////////////////////
// STRENGTH EVALUATION
//////////////////////////////////////////////////////////////

export function isStrongPredictionPlanet(

  planet: HoroscopePlanet

): boolean {


  return (

    planet.strength.score >=

    PREDICTION_THRESHOLDS.strong

  );


}





export function isSupportivePredictionPlanet(

  planet: HoroscopePlanet

): boolean {


  return (

    planet.strength.score >=

    PREDICTION_THRESHOLDS.moderate

  );


}





export function isWeakPredictionPlanet(

  planet: HoroscopePlanet

): boolean {


  return (

    planet.strength.score <

    PREDICTION_THRESHOLDS.weak

  );


}







//////////////////////////////////////////////////////////////
// STRENGTH LABEL
//////////////////////////////////////////////////////////////

export function getPredictionStrengthLabel(

  planet: HoroscopePlanet

): string {


  const score =

    planet.strength.score;



  if(

    score >=

    PREDICTION_THRESHOLDS.strong

  ){

    return "very strong";

  }



  if(

    score >=

    PREDICTION_THRESHOLDS.moderate

  ){

    return "supportive";

  }



  if(

    score >=

    PREDICTION_THRESHOLDS.weak

  ){

    return "balanced";

  }



  return "requires attention";


}







//////////////////////////////////////////////////////////////
// DIGNITY SCORE MODIFIER
//////////////////////////////////////////////////////////////

export function getDignityModifier(

  planet: HoroscopePlanet

): number {


  return (

    DIGNITY_MODIFIERS[

      planet.strength.dignity

    ]

    ??

    0

  );


}







//////////////////////////////////////////////////////////////
// RETROGRADE CHECK
//////////////////////////////////////////////////////////////

export function getRetrogradeEffect(

  planet: HoroscopePlanet

): string[] {


  if(

    !planet.retrograde

  ){

    return [];

  }



  return [

    "internal reflection",

    "revision",

    "delayed external results",

  ];


}







//////////////////////////////////////////////////////////////
// PREDICTION SOURCES
//////////////////////////////////////////////////////////////

export function getPredictionSources(

  planet: HoroscopePlanet

): PredictionSource[] {


  const sources:

    PredictionSource[] = [

      "strength",

      "dignity",

      "intelligence",

    ];



  if(

    planet.retrograde

  ){

    sources.push(

      "retrograde"

    );

  }



  if(

    planet.rashi

  ){

    sources.push(

      "rashi"

    );

  }



  return sources;


}







//////////////////////////////////////////////////////////////
// MESSAGE BUILDER
//////////////////////////////////////////////////////////////

export function buildPredictionMessage(

  planet: HoroscopePlanet

): string {


  const name =

    getPredictionPlanetId(

      planet

    );



  const label =

    getPredictionStrengthLabel(

      planet

    );



  const dignity =

    planet.strength.dignity;



  const keywords =

    getPlanetKeywords(

      planet

    )

    .slice(

      0,

      3

    )

    .join(

      ", "

    );





  return (

    `${name} shows ${label} influence ` +

    `with ${dignity} dignity. ` +

    `Key areas: ${keywords}.`

  );


}







//////////////////////////////////////////////////////////////
// UNIQUE FILTER
//////////////////////////////////////////////////////////////

export function uniqueStrings(

  values: string[]

): string[] {


  return Array.from(

    new Set(

      values

    )

  );


}
//////////////////////////////////////////////////////////////
// PREDICTION THEMES
//////////////////////////////////////////////////////////////

export function getPredictionThemes(

  keywords: string[]

): string[] {


  const themeMap:

    Record<string,string> = {


      wisdom:
        "knowledge and higher understanding",


      growth:
        "personal development and expansion",


      fortune:
        "opportunities and positive possibilities",


      success:
        "achievement and progress",


      discipline:
        "patience and long term stability",


      creativity:
        "expression and innovation",


      harmony:
        "balance and relationships",


      courage:
        "confidence and decisive action",


      communication:
        "expression and connections",


    };



  return keywords

    .map(

      keyword =>

        themeMap[

          keyword.toLowerCase()

        ]

    )

    .filter(

      (theme): theme is string =>

        Boolean(theme)

    );


}
//////////////////////////////////////////////////////////////
// PREDICTION IMPACT INTELLIGENCE
// Step 2 Enhancement Layer
//////////////////////////////////////////////////////////////

export function calculatePlanetImpactScore(

  planet: HoroscopePlanet

): number {


  const strengthScore =

    planet.strength.score;



  const dignityBonus =

    getDignityModifier(

      planet

    );



  const retrogradeAdjustment =

    planet.retrograde

      ? -5

      : 0;



  return Math.max(

    0,

    Math.min(

      100,

      strengthScore +

      dignityBonus +

      retrogradeAdjustment

    )

  );

}





//////////////////////////////////////////////////////////////
// OPPORTUNITY DETECTION
//////////////////////////////////////////////////////////////

export function isOpportunityPlanet(

  planet: HoroscopePlanet

): boolean {


  const impactScore =

    calculatePlanetImpactScore(

      planet

    );



  const keywords =

    getPlanetKeywords(

      planet

    );



  return (

    impactScore >= 65

    &&

    keywords.length > 0

  );


}





//////////////////////////////////////////////////////////////
// CAUTION DETECTION
//////////////////////////////////////////////////////////////

export function isCautionPlanet(

  planet: HoroscopePlanet

): boolean {


  const impactScore =

    calculatePlanetImpactScore(

      planet

    );



  return (

    impactScore < 45

  );


}





//////////////////////////////////////////////////////////////
// INSIGHT CONTEXT BUILDER
//////////////////////////////////////////////////////////////

export function buildInsightContext(

  planet: HoroscopePlanet

) {


  return {


    planet:

      getPredictionPlanetId(

        planet

      ),



    strength:

      planet.strength.score,



    dignity:

      planet.strength.dignity,



    impact:

      calculatePlanetImpactScore(

        planet

      ),



    keywords:

      getPlanetKeywords(

        planet

      ),



    themes:

      getPredictionThemes(

        getPlanetKeywords(

          planet

        )

      ),



    retrograde:

      getRetrogradeEffect(

        planet

      ),



    sources:

      getPredictionSources(

        planet

      ),


  };

}
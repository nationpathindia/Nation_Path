//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
// Horoscope Prediction Intelligence Engine
// Enhanced Intelligence Version
//////////////////////////////////////////////////////////////


import type {

  HoroscopePlanet,

  HoroscopeLanguage,

} from "../types";



import type {

  HoroscopePrediction,

  PredictionMessage,

  PredictionCategory,

  PlanetPrediction,

  LifePrediction,

  PredictionInsight,

} from "./types";



import {

  PLANET_PREDICTION_AREAS,

} from "./rules";



import {

  getPredictionPlanetId,

  getPlanetKeywords,

  buildPredictionMessage,

  getPredictionSources,

  isSupportivePredictionPlanet,

  isWeakPredictionPlanet,

  uniqueStrings,

} from "./helpers";



import {

  PLANET_PREDICTION_TEMPLATES,

} from "./templates";

import {
  calculatePredictionConfidence,
} from "./confidence";

import {

  buildPredictionRanking,

} from "./prioritizer";


import {

  generateNaturalSummary,

  generateOpening,

  generateDevelopment,

  generateAdvice,

  generateClosing,

} from "./language";


import {

  calculatePredictionQuality,

} from "./quality";


import {

  createPredictionContext,

} from "./context";



import {
  generatePlanetPredictionLanguage,
} from "./languageAdapter";



//////////////////////////////////////////////////////////////
// TEMPLATE MESSAGE RESOLVER
//////////////////////////////////////////////////////////////

function getTemplateMessage(

  planet: HoroscopePlanet

): string {


  const planetName =

    getPredictionPlanetId(

      planet

    );



  const template =

    PLANET_PREDICTION_TEMPLATES[

      planetName

    ];



  if (!template) {


    return buildPredictionMessage(

      planet

    );


  }



  if (

    planet.strength.score >= 70

  ) {


    return template.strong;


  }



  if (

    planet.strength.score <= 40

  ) {


    return template.weak;


  }



  return template.neutral;


}





//////////////////////////////////////////////////////////////
// DOMINANT PLANET INTELLIGENCE
//////////////////////////////////////////////////////////////

function getDominantPlanets(

  planets: HoroscopePlanet[]

): HoroscopePlanet[] {


  return [...planets]

    .sort(

      (a,b) =>

        b.strength.score -

        a.strength.score

    )

    .slice(0,3);


}

//////////////////////////////////////////////////////////////
// HEADLINE INTELLIGENCE
//
// Connected with Language Intelligence Layer
// No hardcoded planetary combinations
//////////////////////////////////////////////////////////////

function generateHeadline(

  planets: HoroscopePlanet[]

): string {


  const strongest =

    planets[0];



  if (!strongest) {


    return (

      "Your planetary influences highlight current strengths, opportunities and personal growth patterns."

    );


  }



  const language =

    generatePlanetPredictionLanguage(

      strongest,

      "overall"

    );



  return (

    `${getPredictionPlanetId(

      strongest

    )} influence becomes a central theme in your current cycle. ${language.statement}`

  );


}



//////////////////////////////////////////////////////////////
// OVERVIEW INTELLIGENCE
//
// Connected with Language Intelligence Layer
// No hardcoded planetary text
//////////////////////////////////////////////////////////////

function generateOverview(

  planets: HoroscopePlanet[]

): string {


  const strongest =

    planets[0];



  if (!strongest) {


    return (

      "Your planetary analysis highlights important cosmic patterns influencing your journey."

    );


  }



  const language =

    generatePlanetPredictionLanguage(

      strongest,

      "overall"

    );



  return language.statement;

}

//////////////////////////////////////////////////////////////
// PLANET GUIDANCE GENERATOR
//
// Connected with Language Intelligence Layer
// No hardcoded planetary text
//////////////////////////////////////////////////////////////

function generatePlanetGuidance(

  planet: HoroscopePlanet

): string[] {


  const language =

    generatePlanetPredictionLanguage(

      planet,

      "overall"

    );



  return [

    language.advice,

    language.explanation,

  ];

}

//////////////////////////////////////////////////////////////
// FINAL GUIDANCE PRIORITIZATION
//////////////////////////////////////////////////////////////

function generateGuidance(

  planets: HoroscopePlanet[]

): string[] {


  const guidance =

    uniqueStrings(


      [...planets]

        .sort(

          (a,b) =>

            b.strength.score -

            a.strength.score

        )

        .flatMap(

          planet =>

            generatePlanetGuidance(

              planet

            )

        )

    );



  return guidance

    .filter(

      item =>

        item.length > 35

    )

    .slice(

      0,

      6

    );

}
//////////////////////////////////////////////////////////////
// PLANET PREDICTION BUILDER
//////////////////////////////////////////////////////////////

function buildPlanetPrediction(

  planet: HoroscopePlanet

): PlanetPrediction {


  return {


    planet:

      getPredictionPlanetId(

        planet

      ),



    strengthScore:

      planet.strength.score,



    dignity:

      planet.strength.dignity,



    message:

      getTemplateMessage(

        planet

      ),



    positive:

      isSupportivePredictionPlanet(

        planet

      )

        ?

        getPlanetKeywords(

          planet

        )

        :

        [],



    caution:

      isWeakPredictionPlanet(

        planet

      )

        ?

        getPlanetKeywords(

          planet

        )

        :

        [],



    keywords:

      getPlanetKeywords(

        planet

      ),


  };


}





//////////////////////////////////////////////////////////////
// LIFE AREA SCORE CALCULATOR
//////////////////////////////////////////////////////////////

function calculateLifeScore(

  messages: PredictionMessage[]

): number {


  if (

    messages.length === 0

  ) {


    return 0;


  }




  const total =

    messages.reduce(

      (sum,item) =>

        sum +

        item.priority,


      0

    );




  return Math.round(

    total /

    messages.length

  );


}





//////////////////////////////////////////////////////////////
// LIFE PREDICTION BUILDER
//////////////////////////////////////////////////////////////

function buildLifePredictions(

  planets: HoroscopePlanet[]

): LifePrediction[] {


  const areaMap =

    new Map<

      PredictionCategory,

      PredictionMessage[]

    >();



  const sortedPlanets =

    [...planets]

      .sort(

        (a,b) =>

          b.strength.score -

          a.strength.score

      );




  for (

    const planet of sortedPlanets

  ) {


    const planetName =

      getPredictionPlanetId(

        planet

      );



    const areas =

      PLANET_PREDICTION_AREAS[

        planetName

      ]

      ??

      [];




    for (

      const area of areas

    ) {


      const list =

        areaMap.get(

          area

        )

        ??

        [];




      const score =

        planet.strength.score;



      const strong =

        score >= 70;



      const weak =

        score <= 40;




     const keywords =

  uniqueStrings(

    getPlanetKeywords(

      planet

    )

      .filter(

        keyword =>

          keyword.toLowerCase() !== area.toLowerCase()

      )

  );
const language =
  generatePlanetPredictionLanguage(
    planet,
    area
  );


const strengthText =

  strong

    ?

    language.statement

    :

    language.explanation;



const challengeText =

  weak

    ?

    language.advice

    :

    language.explanation;



const opportunityText =

  language.statement;



const guidanceText =

  language.advice;



const summaryText =

  language.explanation;
      list.push({


        category:

          area,



        title:

          `${planetName} influence in ${area}`,



        prediction:
language.statement,



        keywords,



        priority:

          score,



        source:

          getPredictionSources(

            planet

          ),



        strength:

          strengthText,



        challenge:

          challengeText,



        opportunity:

          opportunityText,



       guidance:
language.advice,



       summary:
language.explanation,

      } as PredictionMessage);




      areaMap.set(

        area,

        list

      );


    }


  }





  return Array.from(

    areaMap.entries()

  )

  .map(

    ([area,messages]) => ({


      area,


      score:

        calculateLifeScore(

          messages

        ),



      messages:

        messages

          .sort(

            (a,b) =>

              b.priority -

              a.priority

          ),


    })

  )

  .sort(

    (a,b) =>

      b.score -

      a.score

  );


}


//////////////////////////////////////////////////////////////
// INSIGHT BUILDER
//////////////////////////////////////////////////////////////

function buildInsights(

  planets: HoroscopePlanet[],

  mode:

    "positive"

    |

    "caution"

): PredictionInsight[] {


  const result:

    PredictionInsight[]

    = [];





  for (

    const planet of planets

  ) {


    const active =


      mode === "positive"

        ?

        isSupportivePredictionPlanet(

          planet

        )

        :

        isWeakPredictionPlanet(

          planet

        );





    if (

      !active

    ) {


      continue;


    }





    result.push({


      title:

        `${getPredictionPlanetId(

          planet

        )} influence`,



      description:

        getTemplateMessage(

          planet

        ),



      keywords:

        getPlanetKeywords(

          planet

        ),



      priority:

        planet.strength.score,


    });


  }





  return result;


}







//////////////////////////////////////////////////////////////
// MAIN HOROSCOPE PREDICTION ENGINE
//////////////////////////////////////////////////////////////
export function predictHoroscope(

  snapshot:
    Record<
      string,
      HoroscopePlanet
    >,


  language:
    HoroscopeLanguage = "en",


  zodiacSign?:
    string


): HoroscopePrediction {

  ////////////////////////////////////////////////////////////
  // PLANET SNAPSHOT NORMALIZATION
  ////////////////////////////////////////////////////////////

 const planets =
  Object.values(
    snapshot ?? {}
  );




  ////////////////////////////////////////////////////////////
  // DOMINANT PLANET ANALYSIS
  ////////////////////////////////////////////////////////////

  const dominantPlanets =

    getDominantPlanets(

      planets

    );






  ////////////////////////////////////////////////////////////
  // CORE PREDICTION GENERATION
  ////////////////////////////////////////////////////////////

  const planetaryPredictions =

    planets.map(

      planet =>

        buildPlanetPrediction(

          planet

        )

    );




  const lifePredictions =

    buildLifePredictions(

      planets

    );




  const opportunities =

    buildInsights(

      planets,

      "positive"

    );




  const cautions =

    buildInsights(

      planets,

      "caution"

    );




  const guidance =

    generateGuidance(

      dominantPlanets

    );






  ////////////////////////////////////////////////////////////
  // BASE HOROSCOPE RESULT
  ////////////////////////////////////////////////////////////

  const predictionResult:

    HoroscopePrediction = {


      language,



      headline:

        generateHeadline(

          dominantPlanets

        ),




      overview:

        generateOverview(

          dominantPlanets

        ),




      planetaryPredictions,




      lifePredictions,




      opportunities,




      cautions,




      guidance,




      generatedAt:

        new Date(),


    };








  ////////////////////////////////////////////////////////////
  // STEP 4
  // PREDICTION CONFIDENCE INTELLIGENCE
  ////////////////////////////////////////////////////////////
const predictionContext =

  createPredictionContext({

    language,

 zodiacSign,

    phase:
      "analysis",

    planets,

    dominantPlanets,

    planetaryPredictions,

    lifePredictions,

    opportunities,

    cautions,

    guidance,


  });




const predictionConfidence =

  calculatePredictionConfidence(

    predictionContext

  );


  ////////////////////////////////////////////////////////////
  // STEP 5
  // PREDICTION PRIORITIZATION
  ////////////////////////////////////////////////////////////
const predictionRanking =

  buildPredictionRanking(

    predictionContext

  );

  ////////////////////////////////////////////////////////////
  // STEP 6
  // NATURAL LANGUAGE INTELLIGENCE
  ////////////////////////////////////////////////////////////

 const naturalSummary =

  generateNaturalSummary(

    planetaryPredictions,

    predictionRanking

  );




  const narrative =
{
  opening:

    generateOpening(

      predictionRanking

    ),


  development:

    generateDevelopment(

      predictionRanking

    ),


  advice:

    generateAdvice(

      lifePredictions

    ),


  closing:

    generateClosing(),

};







  ////////////////////////////////////////////////////////////
  // STEP 7
  // QUALITY OPTIMIZATION
  ////////////////////////////////////////////////////////////

  const quality =

    calculatePredictionQuality(

      lifePredictions.flatMap(

        area =>

          area.messages

      ),

      [

        ...opportunities,

        ...cautions,

      ]

    );








  ////////////////////////////////////////////////////////////
  // FINAL FUTURE PROOF RESPONSE
  ////////////////////////////////////////////////////////////

  return {


    ...predictionResult,



    predictionConfidence,



    predictionRanking,



    naturalSummary,



    narrative,



    quality,


  };



}
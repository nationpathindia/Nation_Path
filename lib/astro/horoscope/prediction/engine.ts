//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// HOROSCOPE PREDICTION INTELLIGENCE ENGINE v4.2
//
// Prediction Intelligence
// +
// Language Context Routing
// +
// Confidence Intelligence
// +
// Prediction Prioritization
// +
// Premium Narrative Foundation
// +
// Quality Intelligence
//
// NO calculations.
// NO ephemeris.
// NO planetary mathematics changes.
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

  updatePredictionPhase,

} from "./context";


import {

  generatePlanetPredictionLanguage,

} from "./languageAdapter";





//////////////////////////////////////////////////////////////
// SAFE NORMALIZATION
//////////////////////////////////////////////////////////////

function normalizePlanets(

  snapshot:
    Record<string, HoroscopePlanet>

): HoroscopePlanet[] {

  return Object.values(

    snapshot ?? {}

  )

  .filter(Boolean);

}





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


  if(!template){

    return buildPredictionMessage(

      planet

    );

  }


  if(

    planet.strength.score >= 70

  ){

    return template.strong;

  }


  if(

    planet.strength.score <= 40

  ){

    return template.weak;

  }


  return template.neutral;

}





//////////////////////////////////////////////////////////////
// DOMINANT PLANET ENGINE
//////////////////////////////////////////////////////////////

function getDominantPlanets(

  planets: HoroscopePlanet[]

): HoroscopePlanet[] {

  return [

    ...planets,

  ]

  .sort(

    (a,b)=>{

      const scoreDifference =

        b.strength.score -

        a.strength.score;


      if(scoreDifference !== 0){

        return scoreDifference;

      }


      return (

        getPredictionPlanetId(a)

          .localeCompare(

            getPredictionPlanetId(b)

          )

      );

    }

  )

  .slice(

    0,

    3

  );

}





//////////////////////////////////////////////////////////////
// HEADLINE INTELLIGENCE
//////////////////////////////////////////////////////////////

function generateHeadline(

  planets: HoroscopePlanet[],

  zodiacSign?: string

): string {

  const strongest =

    planets[0];


  if(!strongest){

    return (

      "Planetary influences highlight important patterns, opportunities and areas of focus during this period."

    );

  }


  const language =

    generatePlanetPredictionLanguage(

      strongest,

      "overall",

      zodiacSign

    );


  return (

    `${getPredictionPlanetId(

      strongest

    )} creates the primary influence for this phase. ${language.statement}`

  );

}





//////////////////////////////////////////////////////////////
// OVERVIEW INTELLIGENCE
//////////////////////////////////////////////////////////////

function generateOverview(

  planets: HoroscopePlanet[],

  zodiacSign?: string

): string {

  const strongest =

    planets[0];


  if(!strongest){

    return (

      "Planetary patterns indicate a period of awareness, growth and transformation."

    );

  }


  const language =

    generatePlanetPredictionLanguage(

      strongest,

      "overall",

      zodiacSign

    );


  return (

    `${language.statement} ${language.explanation}`

  );

}





//////////////////////////////////////////////////////////////
// GUIDANCE GENERATOR
//////////////////////////////////////////////////////////////

function generatePlanetGuidance(

  planet: HoroscopePlanet,

  zodiacSign?: string

): string[] {

  const language =

    generatePlanetPredictionLanguage(

      planet,

      "overall",

      zodiacSign

    );


  return [

    language.advice,

    language.explanation,

  ];

}





function generateGuidance(

  planets: HoroscopePlanet[],

  zodiacSign?: string

): string[] {

  const guidance =

    uniqueStrings(

      [

        ...planets,

      ]

      .sort(

        (a,b)=>

          b.strength.score -

          a.strength.score

      )

      .flatMap(

        planet =>

          generatePlanetGuidance(

            planet,

            zodiacSign

          )

      )

    );


  return guidance

    .filter(

      item =>

        item.length > 40

    )

    .slice(

      0,

      8

    );

}





//////////////////////////////////////////////////////////////
// PLANET PREDICTION BUILDER v4.2
//
// Language Intelligence
// +
// Planet Strength
//////////////////////////////////////////////////////////////

function buildPlanetPrediction(

  planet: HoroscopePlanet,

  zodiacSign?: string

): PlanetPrediction {

  const language =

    generatePlanetPredictionLanguage(

      planet,

      "overall",

      zodiacSign

    );


  const strengthScore =

    planet.strength.score;


  return {

    planet:

      getPredictionPlanetId(

        planet

      ),


    strengthScore,


    dignity:

      planet.strength.dignity,


    message:

      language.statement,


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


    confidence:

      strengthScore,


    influenceScore:

      strengthScore,


  };

}





//////////////////////////////////////////////////////////////
// LIFE AREA SCORE CONTEXT
//////////////////////////////////////////////////////////////

function calculateLifeAreaScore(

  planet: HoroscopePlanet,

  area: PredictionCategory,

  zodiacSign?: string

): number {

  let score =

    planet.strength.score;


  //
  // Zodiac context remains a lightweight
  // deterministic context modifier.
  //
  // No planetary calculation is performed here.
  //

  if(zodiacSign){

    const zodiacFactor =

      zodiacSign

      .split("")

      .reduce(

        (sum,char)=>

          sum +

          char.charCodeAt(0),

        0

      ) % 11;


    score +=

      zodiacFactor - 5;

  }


  return Math.max(

    0,

    Math.min(

      100,

      Math.round(score)

    )

  );

}





//////////////////////////////////////////////////////////////
// LIFE SCORE CALCULATOR
//////////////////////////////////////////////////////////////

function calculateLifeScore(

  messages: PredictionMessage[]

): number {

  if(messages.length === 0){

    return 0;

  }


  const total =

    messages.reduce(

      (sum,item)=>

        sum + item.priority,

      0

    );


  return Math.round(

    total /

    messages.length

  );

}





//////////////////////////////////////////////////////////////
// LIFE PREDICTION BUILDER v4.2
//
// Planet Intelligence
// +
// Area Intelligence
// +
// Zodiac Context
//////////////////////////////////////////////////////////////

function buildLifePredictions(

  planets: HoroscopePlanet[],

  zodiacSign?: string

): LifePrediction[] {

  const areaMap =

    new Map<

      PredictionCategory,

      PredictionMessage[]

    >();


  const sortedPlanets =

    [

      ...planets,

    ]

    .sort(

      (a,b)=>

        b.strength.score -

        a.strength.score

    );


  for(

    const planet of sortedPlanets

  ){

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


    for(

      const area of areas

    ){

      const messages =

        areaMap.get(

          area

        )

        ??

        [];


      const language =

        generatePlanetPredictionLanguage(

          planet,

          area,

          zodiacSign

        );


      const keywords =

        uniqueStrings(

          getPlanetKeywords(

            planet

          )

          .filter(

            keyword =>

              keyword.toLowerCase()

              !==

              area.toLowerCase()

          )

        );


      const score =

        calculateLifeAreaScore(

          planet,

          area,

          zodiacSign

        );


      const predictionMessage:

        PredictionMessage = {

        category:

          area,


        title:

          `${planetName} influence in ${area}`,


        prediction:

          language.statement,


        explanation:

          language.explanation,


        guidance:

          language.advice,


        recommendation:

          language.advice,


        summary:

          language.explanation,


        keywords,


        priority:

          score,


        source:

          getPredictionSources(

            planet

          ),


        confidence:

          score,


        influenceScore:

          score,


        severity:

          score >= 70

            ?

            "low"

            :

          score <= 40

            ?

            "high"

            :

            "medium",


        tags:

          [

            planetName,

            area,

          ],

      };


      messages.push(

        predictionMessage

      );


      areaMap.set(

        area,

        messages

      );

    }

  }


  console.log(

    "🔥 LIFE BUILD CHECK",

    {

      zodiac:

        zodiacSign,

      planets:

        sortedPlanets.map(

          p => ({

            planet:

              getPredictionPlanetId(p),

            strength:

              p.strength.score,

          })

        ),

      areas:

        Array.from(

          areaMap.entries()

        ).map(

          ([area,messages]) => ({

            area,

            scores:

              messages.map(

                m => m.priority

              ),

          })

        ),

    }

  );


  return Array.from(

    areaMap.entries()

  )

  .map(

    ([area,messages]) => {

      const score =

        calculateLifeScore(

          messages

        );


      const sortedMessages =

        [

          ...messages,

        ].sort(

          (a,b)=>

            b.priority -

            a.priority

        );


      const trend:

        "positive"

        |

        "challenging"

        |

        "balanced" =

        score >= 70

          ?

          "positive"

          :

        score <= 40

          ?

          "challenging"

          :

          "balanced";


      return {

        area,


        score,


        messages:

          sortedMessages,


        confidence:

          score,


        dominantPlanet:

          sortedMessages[0]?.title,


        summary:

          sortedMessages

          .slice(

            0,

            3

          )

          .map(

            item =>

              item.prediction

          )

          .join(" "),


        trend,

      };

    }

  )

  .sort(

    (a,b)=>

      b.score -

      a.score

  );

}





//////////////////////////////////////////////////////////////
// INSIGHT INTELLIGENCE ENGINE
//
// Opportunity + Caution
//////////////////////////////////////////////////////////////

function buildInsights(

  planets: HoroscopePlanet[],

  mode:

    "positive"

    |

    "caution",

  zodiacSign?: string

): PredictionInsight[] {

  const result:

    PredictionInsight[]

    = [];


  for(

    const planet of planets

  ){

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


    if(!active){

      continue;

    }


    const language =

      generatePlanetPredictionLanguage(

        planet,

        "overall",

        zodiacSign

      );


    result.push({

      title:

        `${getPredictionPlanetId(

          planet

        )} influence`,


      description:

        mode === "positive"

        ?

        language.statement

        :

        language.explanation,


      keywords:

        getPlanetKeywords(

          planet

        ),


      priority:

        planet.strength.score,


      confidence:

        planet.strength.score,


      source:

        getPredictionSources(

          planet

        ),

    });

  }


  return result.sort(

    (a,b)=>

      b.priority -

      a.priority

  );

}





//////////////////////////////////////////////////////////////
// DOMINANT PLANET PREMIUM SUMMARY
//////////////////////////////////////////////////////////////

function buildDominantPlanetSummary(

  planets: HoroscopePlanet[],

  zodiacSign?: string

){

  return planets.map(

    planet => {

      const language =

        generatePlanetPredictionLanguage(

          planet,

          "overall",

          zodiacSign

        );


      return {

        planet:

          getPredictionPlanetId(

            planet

          ),


        strength:

          planet.strength.score,


        dignity:

          planet.strength.dignity,


        statement:

          language.statement,


        explanation:

          language.explanation,


        advice:

          language.advice,

      };

    }

  );

}





//////////////////////////////////////////////////////////////
// LIFE AREA PREMIUM SYNTHESIS
//////////////////////////////////////////////////////////////

function buildLifeAreaNarrative(

  lifePredictions:

    LifePrediction[]

){

  return lifePredictions

    .map(

      area => {

        if(

          area.messages.length === 0

        ){

          return null;

        }


        const topMessages =

          area.messages.slice(

            0,

            3

          );


        return {

          area:

            area.area,


          score:

            area.score,


          headline:

            topMessages[0]?.title

            ??

            "",


          summary:

            topMessages

            .map(

              item =>

                item.prediction

            )

            .join(" "),


          guidance:

            topMessages

            .map(

              item =>

                item.guidance ?? ""

            )

            .filter(Boolean)

            .join(" "),


          planets:

            topMessages

            .map(

              item =>

                item.tags?.[0]

            )

            .filter(Boolean),

        };

      }

    )

    .filter(Boolean);

}





//////////////////////////////////////////////////////////////
// PREDICTION BALANCE INTELLIGENCE
//////////////////////////////////////////////////////////////

function calculatePredictionBalance(

  opportunities:

    PredictionInsight[],

  cautions:

    PredictionInsight[]

){

  const positiveScore =

    opportunities.reduce(

      (sum,item)=>

        sum + item.priority,

      0

    );


  const cautionScore =

    cautions.reduce(

      (sum,item)=>

        sum + item.priority,

      0

    );


  return {

    positiveScore,


    cautionScore,


    balance:

      positiveScore -

      cautionScore,


    trend:

      positiveScore > cautionScore

        ?

        "supportive"

        :

      positiveScore < cautionScore

        ?

        "challenging"

        :

        "balanced",

  };

}





//////////////////////////////////////////////////////////////
// PREMIUM ENGINE METADATA
//////////////////////////////////////////////////////////////

function buildEngineMetadata(){

  return {

    engine:

      "NationPath Astro Horoscope Intelligence Engine",


    version:

      "4.2",


    layers:

      [

        "Planet Intelligence",

        "Prediction Intelligence",

        "Language Context Routing",

        "Confidence Intelligence",

        "Prediction Prioritization",

        "Narrative Intelligence",

        "Quality Intelligence",

      ],


    calculation:

      "External Astro Calculation Layer",


    predictionMode:

      "Deterministic Intelligence",


    premiumReady:

      true,

  };

}





//////////////////////////////////////////////////////////////
// SAFETY NORMALIZER
//////////////////////////////////////////////////////////////

function normalizePredictionText(

  value:string

):string {

  if(

    !value ||

    value.trim().length < 10

  ){

    return (

      "Planetary influences indicate a period of awareness, growth and balanced decision making."

    );

  }


  return value;

}





//////////////////////////////////////////////////////////////
// MAIN HOROSCOPE PREDICTION ENGINE v4.2
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
  // 1. PLANET NORMALIZATION
  ////////////////////////////////////////////////////////////

  const planets =

    normalizePlanets(

      snapshot

    );


  ////////////////////////////////////////////////////////////
  // 2. DOMINANT PLANETS
  ////////////////////////////////////////////////////////////

  const dominantPlanets =

    getDominantPlanets(

      planets

    );


  ////////////////////////////////////////////////////////////
  // 3. NARRATIVE PLANET ORDER
  ////////////////////////////////////////////////////////////

  const narrativePlanets =

    [

      ...planets,

    ]

    .sort(

      (a,b) =>

        b.strength.score -

        a.strength.score

    );


  ////////////////////////////////////////////////////////////
  // 4. CORE PLANET PREDICTIONS
  ////////////////////////////////////////////////////////////

  const planetaryPredictions =

    narrativePlanets.map(

      planet =>

        buildPlanetPrediction(

          planet,

          zodiacSign

        )

    );


  ////////////////////////////////////////////////////////////
  // 5. LIFE PREDICTIONS
  ////////////////////////////////////////////////////////////

  const lifePredictions =

    buildLifePredictions(

      planets,

      zodiacSign

    );


  ////////////////////////////////////////////////////////////
  // 6. OPPORTUNITIES
  ////////////////////////////////////////////////////////////

  const opportunities =

    buildInsights(

      planets,

      "positive",

      zodiacSign

    );


  ////////////////////////////////////////////////////////////
  // 7. CAUTIONS
  ////////////////////////////////////////////////////////////

  const cautions =

    buildInsights(

      planets,

      "caution",

      zodiacSign

    );


  ////////////////////////////////////////////////////////////
  // 8. GUIDANCE
  ////////////////////////////////////////////////////////////

  const guidance =

    generateGuidance(

      dominantPlanets,

      zodiacSign

    );


  ////////////////////////////////////////////////////////////
  // 9. PREMIUM PLANET SUMMARY
  ////////////////////////////////////////////////////////////

  const dominantPlanetSummary =

    buildDominantPlanetSummary(

      dominantPlanets,

      zodiacSign

    );


  ////////////////////////////////////////////////////////////
  // 10. PREMIUM LIFE AREA NARRATIVE
  ////////////////////////////////////////////////////////////

  const lifeAreaNarrative =

    buildLifeAreaNarrative(

      lifePredictions

    );


  ////////////////////////////////////////////////////////////
  // 11. PREDICTION BALANCE
  ////////////////////////////////////////////////////////////

  const predictionBalance =

    calculatePredictionBalance(

      opportunities,

      cautions

    );


  ////////////////////////////////////////////////////////////
  // 12. ENGINE METADATA
  ////////////////////////////////////////////////////////////

  const engineMetadata =

    buildEngineMetadata();


  ////////////////////////////////////////////////////////////
  // 13. BASE RESULT
  ////////////////////////////////////////////////////////////

  const predictionResult:

    HoroscopePrediction = {

    version:

      "4.2",


    language,


    headline:

      normalizePredictionText(

        generateHeadline(

          dominantPlanets,

          zodiacSign

        )

      ),


    overview:

      normalizePredictionText(

        generateOverview(

          dominantPlanets,

          zodiacSign

        )

      ),


    planetaryPredictions,


    lifePredictions,


    opportunities,


    cautions,


    guidance,


    zodiacSign,


    generatedAt:

      new Date(),

  };


  ////////////////////////////////////////////////////////////
  // 14. SHARED PREDICTION CONTEXT
  //
  // Everything below this point uses the same
  // normalized prediction state.
  ////////////////////////////////////////////////////////////

  let predictionContext =

    createPredictionContext({

      language,


      zodiacSign,


      phase:

        "analysis",


      planets:

        narrativePlanets,


      dominantPlanets,


      planetaryPredictions,


      lifePredictions,


      opportunities,


      cautions,


      guidance,

    });


  ////////////////////////////////////////////////////////////
  // 15. CONFIDENCE INTELLIGENCE
  //
  // Confidence is calculated from the complete
  // prediction context.
  ////////////////////////////////////////////////////////////

  predictionContext =

    updatePredictionPhase(

      predictionContext,

      "quality"

    );


  const predictionConfidence =

    calculatePredictionConfidence(

      predictionContext

    );


  ////////////////////////////////////////////////////////////
  // 16. PRIORITIZATION INTELLIGENCE
  //
  // Ranking uses the same context and therefore
  // sees planetary predictions, life areas,
  // confidence inputs and insights together.
  ////////////////////////////////////////////////////////////

  predictionContext =

    updatePredictionPhase(

      predictionContext,

      "ranking"

    );


  const predictionRanking =

    buildPredictionRanking(

      predictionContext

    );


  ////////////////////////////////////////////////////////////
  // 17. LANGUAGE / NATURAL SUMMARY
  ////////////////////////////////////////////////////////////

  predictionContext =

    updatePredictionPhase(

      predictionContext,

      "language"

    );


  const naturalSummary =

    generateNaturalSummary(

      planetaryPredictions,

      predictionRanking,

      zodiacSign

    );


  ////////////////////////////////////////////////////////////
  // 18. PREMIUM NARRATIVE
  ////////////////////////////////////////////////////////////

  const narrative = {

    opening:

      generateOpening(

        predictionRanking

      ),


    development:

      generateDevelopment(

        predictionRanking,

        zodiacSign

      ),


    advice:

      generateAdvice(

        lifePredictions

      ),


    closing:

      generateClosing(),

  };


  ////////////////////////////////////////////////////////////
  // 19. QUALITY INTELLIGENCE
  ////////////////////////////////////////////////////////////

  predictionContext =

    updatePredictionPhase(

      predictionContext,

      "quality"

    );


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
  // 20. FINAL CONTEXT STATE
  ////////////////////////////////////////////////////////////

  predictionContext =

    updatePredictionPhase(

      predictionContext,

      "completed"

    );


  ////////////////////////////////////////////////////////////
  // 21. FINAL ENGINE OUTPUT
  ////////////////////////////////////////////////////////////

  return {

    ...predictionResult,


    predictionConfidence,


    predictionRanking,


    naturalSummary,


    narrative,


    quality,


    dominantPlanetSummary,


    lifeAreaNarrative,


    predictionBalance,


    engineMetadata,

  };

}
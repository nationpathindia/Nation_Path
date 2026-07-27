//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
// Prediction Context Intelligence Layer
// Future Proof Shared Prediction State v2
//////////////////////////////////////////////////////////////


import type {

  HoroscopePlanet,

  HoroscopeLanguage,

} from "../types";


import type {

  PlanetPrediction,

  LifePrediction,

  PredictionInsight,

} from "./types";





//////////////////////////////////////////////////////////////
// CONTEXT VERSION
//////////////////////////////////////////////////////////////

export const PREDICTION_CONTEXT_VERSION =

"v2-intelligence";





//////////////////////////////////////////////////////////////
// PREDICTION PHASE
//////////////////////////////////////////////////////////////

export type PredictionPhase =

  | "initialized"

  | "analysis"

  | "ranking"

  | "language"

  | "quality"

  | "completed";





//////////////////////////////////////////////////////////////
// PREDICTION CONTEXT
//////////////////////////////////////////////////////////////

export interface PredictionContext {


  ////////////////////////////////////////////////////////////
  // META
  ////////////////////////////////////////////////////////////

  version:

    string;


  phase:

    PredictionPhase;



  ////////////////////////////////////////////////////////////
  // LANGUAGE
  ////////////////////////////////////////////////////////////

  language:

    HoroscopeLanguage;

    
zodiacSign?:
  string;


  ////////////////////////////////////////////////////////////
  // PLANET DATA
  ////////////////////////////////////////////////////////////

  planets:

    HoroscopePlanet[];


    


  dominantPlanets:

    HoroscopePlanet[];




  ////////////////////////////////////////////////////////////
  // PLANET SUMMARY INTELLIGENCE
  ////////////////////////////////////////////////////////////

  activePlanetCount:

    number;



  dominantPlanetNames:

    string[];




  ////////////////////////////////////////////////////////////
  // GENERATED PREDICTIONS
  ////////////////////////////////////////////////////////////

  planetaryPredictions:

    PlanetPrediction[];



  lifePredictions:

    LifePrediction[];




  ////////////////////////////////////////////////////////////
  // INSIGHT LAYERS
  ////////////////////////////////////////////////////////////

  opportunities:

    PredictionInsight[];



  cautions:

    PredictionInsight[];



  guidance:

    string[];





  ////////////////////////////////////////////////////////////
  // FUTURE EXTENSIONS
  ////////////////////////////////////////////////////////////

  transitData?:

    unknown;



  dashaData?:

    unknown;



  yogaData?:

    unknown;



  nakshatraData?:

    unknown;




    

  houseData?:

    unknown;



}







//////////////////////////////////////////////////////////////
// CONTEXT BUILDER
//////////////////////////////////////////////////////////////

export function createPredictionContext(

  input:

  Omit<

    PredictionContext,

    "version"

    |

    "activePlanetCount"

    |

    "dominantPlanetNames"

  >

): PredictionContext {


  return {


    ...input,


    version:

      PREDICTION_CONTEXT_VERSION,


    activePlanetCount:

      input.planets.length,



    dominantPlanetNames:

      input.dominantPlanets.map(

        planet =>

        String(

          planet.strength.planet

        )

      ),


  };


}







//////////////////////////////////////////////////////////////
// CONTEXT VALIDATOR
//////////////////////////////////////////////////////////////

export function validatePredictionContext(

  context:PredictionContext

):boolean {


  return Boolean(

    context

    &&

    context.language

    &&

    Array.isArray(

      context.planets

    )

    &&

    Array.isArray(

      context.dominantPlanets

    )

    &&

    Array.isArray(

      context.planetaryPredictions

    )

    &&

    Array.isArray(

      context.lifePredictions

    )

  );


}







//////////////////////////////////////////////////////////////
// CONTEXT UPDATE HELPER
//////////////////////////////////////////////////////////////

export function updatePredictionPhase(

  context:PredictionContext,

  phase:PredictionPhase

):PredictionContext {


  return {


    ...context,


    phase,


  };


}
//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
// Prediction Confidence Intelligence Layer
// Production Future Proof Version
//////////////////////////////////////////////////////////////


import type {

  HoroscopePlanet,

} from "../types";


import type {

  PredictionContext,

} from "./context";





//////////////////////////////////////////////////////////////
// CONFIDENCE WEIGHTS
//////////////////////////////////////////////////////////////

const CONFIDENCE_WEIGHTS = {


  strength:

    30,


  dignity:

    25,


  support:

    20,


  consistency:

    15,


  dataQuality:

    10,


};





//////////////////////////////////////////////////////////////
// SCORE NORMALIZER
//////////////////////////////////////////////////////////////

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






//////////////////////////////////////////////////////////////
// PLANET STRENGTH ANALYSIS
//////////////////////////////////////////////////////////////

function calculateStrengthScore(

  planets:

    HoroscopePlanet[]

):number {


  if (

    planets.length === 0

  ) {

    return 50;

  }



  const total =

    planets.reduce(

      (

        sum,

        planet

      ) => {


        return (

          sum +

          (

            planet.strength?.score

            ??

            50

          )

        );


      },

      0

    );




  return total / planets.length;


}







//////////////////////////////////////////////////////////////
// DIGNITY INTELLIGENCE
//////////////////////////////////////////////////////////////

function calculateDignityScore(

  planets:

    HoroscopePlanet[]

):number {


  let score = 50;



  for (

    const planet of planets

  ) {


    const dignity =

      planet.strength?.dignity;



    switch(dignity) {


      case "exalted":

        score += 15;

        break;



      case "own":

        score += 10;

        break;



      case "friendly":

        score += 5;

        break;



      case "enemy":

        score -= 5;

        break;



      case "debilitated":

        score -= 15;

        break;



      default:

        break;


    }


  }




  return clamp(score);


}







//////////////////////////////////////////////////////////////
// NATURAL SUPPORT ANALYSIS
//////////////////////////////////////////////////////////////

function calculateSupportScore(

  planets:

    HoroscopePlanet[]

):number {


  let score = 50;



  for (

    const planet of planets

  ) {



    if (
  planet.intelligence.nature === "benefic"
) {


      score += 5;


    }



   if (
  planet.intelligence.nature === "malefic"
) {

      score -= 3;


    }


  }



  return clamp(score);


}







//////////////////////////////////////////////////////////////
// PREDICTION CONSISTENCY
//////////////////////////////////////////////////////////////

function calculateConsistencyScore(

  context:

    PredictionContext

):number {


  let score = 60;




  if (

    context.opportunities.length >

    0

  ) {


    score += 10;


  }




  if (

    context.cautions.length >

    0

  ) {


    score += 10;


  }




  if (

    context.guidance.length >

    0

  ) {


    score += 10;


  }



  return clamp(score);


}







//////////////////////////////////////////////////////////////
// DATA QUALITY ANALYSIS
//////////////////////////////////////////////////////////////

function calculateDataQualityScore(

  context:

    PredictionContext

):number {


  let score = 50;



  if (

    context.planets.length >= 7

  ) {


    score += 20;


  }



  if (

    context.planetaryPredictions.length >

    0

  ) {


    score += 15;


  }



  if (

    context.lifePredictions.length >

    0

  ) {


    score += 15;


  }



  return clamp(score);


}







//////////////////////////////////////////////////////////////
// MAIN CONFIDENCE ENGINE
//////////////////////////////////////////////////////////////

export function calculatePredictionConfidence(

  context:

    PredictionContext,

):number {



  const strength =

    calculateStrengthScore(

      context.planets

    );




  const dignity =

    calculateDignityScore(

      context.planets

    );




  const support =

    calculateSupportScore(

      context.planets

    );




  const consistency =

    calculateConsistencyScore(

      context

    );




  const dataQuality =

    calculateDataQualityScore(

      context

    );






  const finalScore =



    (

      strength *

      CONFIDENCE_WEIGHTS.strength

      /

      100

    )



    +



    (

      dignity *

      CONFIDENCE_WEIGHTS.dignity

      /

      100

    )



    +



    (

      support *

      CONFIDENCE_WEIGHTS.support

      /

      100

    )



    +



    (

      consistency *

      CONFIDENCE_WEIGHTS.consistency

      /

      100

    )



    +



    (

      dataQuality *

      CONFIDENCE_WEIGHTS.dataQuality

      /

      100

    );







  return clamp(

    finalScore

  );


}
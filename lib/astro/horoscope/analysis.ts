//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
// Advanced Horoscope Analysis Intelligence Engine
//////////////////////////////////////////////////////////////

import type {
  HoroscopePlanet,
} from "./types";



//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////

export interface HoroscopeAnalysis {

  /**
   * Overall Horoscope Index
   * 0 - 100
   */
  index: number;


  /**
   * Overall Rating
   */
  rating:
    | "Exceptional"
    | "Excellent"
    | "Good"
    | "Average"
    | "Challenging";


  /**
   * Dominant planets
   */
  dominantPlanets: string[];


  /**
   * Strongest planet
   */
  strongestPlanet?: string;


  /**
   * Weakest planet
   */
  weakestPlanet?: string;


  /**
   * Dominant sign
   */
  dominantSign?: string;


  /**
   * Benefic influence
   */
  beneficScore: number;


  /**
   * Malefic influence
   */
  maleficScore: number;


  /**
   * Overall balance
   */
  chartBalance: number;


  /**
   * Retrograde planets
   */
  retrogradePlanets: string[];


  /**
   * Retrograde count
   */
  retrogradeCount: number;


  /**
   * Occupied houses
   */
  occupiedHouses: number;


  /**
   * Positive indicators
   */
  positive: string[];


  /**
   * Challenges
   */
  challenges: string[];


  /**
   * Observations
   */
  observations: string[];

}



//////////////////////////////////////////////////////////////
// SNAPSHOT TYPE
//////////////////////////////////////////////////////////////

type HoroscopeSnapshot =
Record<
  string,
  HoroscopePlanet
>;



//////////////////////////////////////////////////////////////
// PLANET CLASSIFICATION
//////////////////////////////////////////////////////////////

const BENEFIC_PLANETS = new Set([

  "Jupiter",
  "Venus",
  "Mercury",
  "Moon",

]);


const MALEFIC_PLANETS = new Set([

  "Mars",
  "Saturn",
  "Rahu",
  "Ketu",

]);



//////////////////////////////////////////////////////////////
// PLANET WEIGHTS
//////////////////////////////////////////////////////////////

const PLANET_WEIGHT:
Record<string, number> = {

  Sun:
    1.2,

  Moon:
    1.3,

  Mars:
    1,

  Mercury:
    1,

  Jupiter:
    1.5,

  Venus:
    1.4,

  Saturn:
    1.2,

  Rahu:
    1,

  Ketu:
    1,

};



//////////////////////////////////////////////////////////////
// DIGNITY SCORING
//////////////////////////////////////////////////////////////

const DIGNITY_SCORE:
Record<
  HoroscopePlanet["strength"]["dignity"],
  number
> = {

  exalted:
    6,

  own:
    5,

  friendly:
    4,

  neutral:
    3,

  enemy:
    2,

  debilitated:
    1,

};



//////////////////////////////////////////////////////////////
// SCORE LIMITS
//////////////////////////////////////////////////////////////

const SCORE_LIMIT = {

  min:
    0,

  max:
    100,

};



//////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////

function unique(
  values: string[]
): string[] {

  return [
    ...new Set(
      values
    ),
  ];

}



function clamp(
  value: number,
  min: number,
  max: number
): number {

  return Math.max(

    min,

    Math.min(
      max,
      value
    )

  );

}



function normalizeScore(
  value: number
): number {

  return clamp(

    Math.round(
      value
    ),

    SCORE_LIMIT.min,

    SCORE_LIMIT.max

  );

}



function getPlanetWeight(
  planet: string
): number {

  return (

    PLANET_WEIGHT[planet]

    ??

    1

  );

}



function addUnique(
  target: string[],
  value: string
): void {

  if (
    !target.includes(value)
  ) {

    target.push(
      value
    );

  }

}



function getRating(
  score: number
): HoroscopeAnalysis["rating"] {


  if (
    score >= 90
  ) {

    return "Exceptional";

  }


  if (
    score >= 75
  ) {

    return "Excellent";

  }


  if (
    score >= 60
  ) {

    return "Good";

  }


  if (
    score >= 40
  ) {

    return "Average";

  }


  return "Challenging";

}



//////////////////////////////////////////////////////////////
// INPUT VALIDATION
//////////////////////////////////////////////////////////////

function isValidSnapshot(
  snapshot: HoroscopeSnapshot
): boolean {

  return (

    !!snapshot &&

    Object.keys(
      snapshot
    ).length > 0

  );

}
//////////////////////////////////////////////////////////////
// ANALYSIS ENGINE
//////////////////////////////////////////////////////////////

export function analyzeHoroscope(
  snapshot: HoroscopeSnapshot
): HoroscopeAnalysis {


  ////////////////////////////////////////////////////////////
  // EMPTY SNAPSHOT PROTECTION
  ////////////////////////////////////////////////////////////

  if (
    !isValidSnapshot(
      snapshot
    )
  ) {

    return {

      index:
        0,

      rating:
        "Challenging",

      dominantPlanets:
        [],

      strongestPlanet:
        undefined,

      weakestPlanet:
        undefined,

      dominantSign:
        undefined,

      beneficScore:
        0,

      maleficScore:
        0,

      chartBalance:
        0,

      retrogradePlanets:
        [],

      retrogradeCount:
        0,

      occupiedHouses:
        0,

      positive:
        [],

      challenges:
        [
          "No planetary snapshot available."
        ],

      observations:
        [
          "Horoscope analysis requires planetary data."
        ],

    };

  }




  ////////////////////////////////////////////////////////////
  // INITIAL STATE
  ////////////////////////////////////////////////////////////

  let score =
    50;



  const dominantPlanets:
    string[] = [];



  const retrogradePlanets:
    string[] = [];



  const positive:
    string[] = [];



  const challenges:
    string[] = [];



  const observations:
    string[] = [];



  const signDistribution =
    new Map<
      string,
      number
    >();



  const houseDistribution =
    new Map<
      number,
      number
    >();



  let beneficScore =
    0;



  let maleficScore =
    0;



  let strongestPlanet:
    string | undefined;



  let weakestPlanet:
    string | undefined;



  let strongestPower =
    -1;



  let weakestPower =
    Infinity;




  ////////////////////////////////////////////////////////////
  // PLANETARY ANALYSIS
  ////////////////////////////////////////////////////////////

  for (
    const planet of Object.values(
      snapshot
    )
  ) {


    const strength =
      planet.strength;



    const planetName =
      strength.planet;



    const dignityScore =
      DIGNITY_SCORE[
        strength.dignity
      ];



    const planetWeight =
      getPlanetWeight(
        planetName
      );



    const planetaryPower =
      dignityScore *
      planetWeight;




    //////////////////////////////////////////////////////////
    // STRONGEST PLANET
    //////////////////////////////////////////////////////////

    if (
      planetaryPower >
      strongestPower
    ) {

      strongestPower =
        planetaryPower;


      strongestPlanet =
        planetName;

    }




    //////////////////////////////////////////////////////////
    // WEAKEST PLANET
    //////////////////////////////////////////////////////////

    if (
      planetaryPower <
      weakestPower
    ) {

      weakestPower =
        planetaryPower;


      weakestPlanet =
        planetName;

    }




    //////////////////////////////////////////////////////////
    // SIGN DISTRIBUTION
    //////////////////////////////////////////////////////////

    const sign =
      planet.rashi.name;



    signDistribution.set(

      sign,

      (
        signDistribution.get(
          sign
        )
        ??
        0
      )
      +
      1

    );





    //////////////////////////////////////////////////////////
    // HOUSE DISTRIBUTION
    //////////////////////////////////////////////////////////

    if (
      planet.house
    ) {


      const house =
        planet.house.number;



      houseDistribution.set(

        house,

        (
          houseDistribution.get(
            house
          )
          ??
          0
        )
        +
        1

      );


    }




    //////////////////////////////////////////////////////////
    // BENEFIC PLANET ANALYSIS
    //////////////////////////////////////////////////////////

    if (
      BENEFIC_PLANETS.has(
        planetName
      )
    ) {


      beneficScore +=

        strength.score *
        planetWeight;



      if (
        strength.score >= 70
      ) {

        score +=
          3;

      }


    }




    //////////////////////////////////////////////////////////
    // MALEFIC PLANET ANALYSIS
    //////////////////////////////////////////////////////////

    if (
      MALEFIC_PLANETS.has(
        planetName
      )
    ) {


      const affliction =

        (
          100 -
          strength.score
        )

        *
        planetWeight

        *
        0.5;



      maleficScore +=
        affliction;



      if (
        strength.score < 40
      ) {

        score -=
          4;

      }


    }




    //////////////////////////////////////////////////////////
    // DIGNITY INTELLIGENCE
    //////////////////////////////////////////////////////////

    switch (
      strength.dignity
    ) {


      case "exalted":

        score +=
          15;


        addUnique(

          dominantPlanets,

          planetName

        );


        addUnique(

          positive,

          `${planetName} is exalted`

        );


        break;




      case "own":

        score +=
          12;


        addUnique(

          dominantPlanets,

          planetName

        );


        addUnique(

          positive,

          `${planetName} occupies own sign`

        );


        break;




      case "friendly":

        score +=
          7;


        addUnique(

          positive,

          `${planetName} receives friendly dignity`

        );


        break;




      case "neutral":

        score +=
          2;


        break;




      case "enemy":

        score -=
          10;


        addUnique(

          challenges,

          `${planetName} placed in enemy sign`

        );


        break;




      case "debilitated":

        score -=
          15;


        addUnique(

          challenges,

          `${planetName} is debilitated`

        );


        break;


    }
        //////////////////////////////////////////////////////////
    // RETROGRADE INTELLIGENCE
    //////////////////////////////////////////////////////////

    if (

      planet.retrograde &&

      planetName !== "Rahu" &&

      planetName !== "Ketu"

    ) {


      addUnique(

        retrogradePlanets,

        planetName

      );


      addUnique(

        challenges,

        `${planetName} is retrograde`

      );


      score -=
        2;


    }




    //////////////////////////////////////////////////////////
    // HIGH STRENGTH PLANET DETECTION
    //////////////////////////////////////////////////////////

    if (
      strength.score >= 85
    ) {


      addUnique(

        dominantPlanets,

        planetName

      );


    }



  }




  ////////////////////////////////////////////////////////////
  // DOMINANT SIGN ANALYSIS
  ////////////////////////////////////////////////////////////

  let dominantSign:
    string | undefined;



  let dominantSignCount =
    0;




  for (
    const [
      sign,
      count,
    ]
    of signDistribution
  ) {


    if (
      count >
      dominantSignCount
    ) {


      dominantSign =
        sign;


      dominantSignCount =
        count;


    }


  }





  ////////////////////////////////////////////////////////////
  // HOUSE DISTRIBUTION INTELLIGENCE
  ////////////////////////////////////////////////////////////

  const occupiedHouses =
    houseDistribution.size;



  if (
    occupiedHouses >= 8
  ) {


    addUnique(

      observations,

      "Planetary energy is distributed across multiple life areas."

    );


  }

  else if (
    occupiedHouses <= 4
  ) {


    addUnique(

      observations,

      "Planetary influence is concentrated in selected life areas."

    );


  }





  ////////////////////////////////////////////////////////////
  // PLANETARY OBSERVATIONS
  ////////////////////////////////////////////////////////////

  if (
    strongestPlanet
  ) {


    addUnique(

      observations,

      `Strongest planetary influence comes from ${strongestPlanet}.`

    );


  }




  if (
    weakestPlanet
  ) {


    addUnique(

      observations,

      `Weakest planetary area requires attention through ${weakestPlanet}.`

    );


  }




  if (
    dominantSign
  ) {


    addUnique(

      observations,

      `Highest planetary concentration is found in ${dominantSign}.`

    );


  }




  if (
    retrogradePlanets.length > 0
  ) {


    addUnique(

      observations,

      `${retrogradePlanets.length} retrograde planet(s) influence the horoscope pattern.`

    );


  }





  ////////////////////////////////////////////////////////////
  // BENEFIC / MALEFIC BALANCE ENGINE
  ////////////////////////////////////////////////////////////

  const beneficInfluence =

    beneficScore /
    10;



  const maleficInfluence =

    maleficScore /
    10;




  const balanceModifier =

    beneficInfluence -
    maleficInfluence;



  score +=
    balanceModifier;




  ////////////////////////////////////////////////////////////
  // FINAL SCORE NORMALIZATION
  ////////////////////////////////////////////////////////////

  score =
    normalizeScore(
      score
    );





  ////////////////////////////////////////////////////////////
  // CHART BALANCE CALCULATION
  ////////////////////////////////////////////////////////////

  const chartBalance =

    normalizeScore(

      score

      +

      (
        beneficScore /
        5
      )

      -

      (
        maleficScore /
        20
      )

    );





  ////////////////////////////////////////////////////////////
  // RATING
  ////////////////////////////////////////////////////////////

  const rating =
    getRating(
      score
    );
  ////////////////////////////////////////////////////////////
  // FINAL ANALYSIS RESULT
  ////////////////////////////////////////////////////////////

  return {


    index:

      score,



    rating,



    dominantPlanets:

      unique(
        dominantPlanets
      ),



    strongestPlanet,



    weakestPlanet,



    dominantSign,



    beneficScore:

      Math.round(
        beneficScore
      ),



    maleficScore:

      Math.round(
        maleficScore
      ),



    chartBalance,



    retrogradePlanets:

      unique(
        retrogradePlanets
      ),



    retrogradeCount:

      retrogradePlanets.length,



    occupiedHouses,



    positive:

      unique(
        positive
      ),



    challenges:

      unique(
        challenges
      ),



    observations:

      unique(
        observations
      ),


  };


}
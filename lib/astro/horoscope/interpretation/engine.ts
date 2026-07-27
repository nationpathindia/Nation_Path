//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
// Horoscope Interpretation Intelligence Engine
//////////////////////////////////////////////////////////////

import type {
  HoroscopePlanet,
} from "../types";


import type {
  HoroscopeLanguage,
  HoroscopeInterpretation,
  PlanetInterpretation,
  LifeAreaInterpretation,
  InterpretationMessage,
  InterpretationCategory,
} from "./types";


import {
  getPlanetList,
  getPositiveThemes,
  getChallengeThemes,
  getDignityMessage,
  getStrengthLabel,
  isStrongPlanet,
  isWeakPlanet,
  uniqueStrings,
} from "./helpers";


import {
  PLANET_LIFE_AREAS,
} from "./rules";



//////////////////////////////////////////////////////////////
// PLANET INSIGHT BUILDER
//////////////////////////////////////////////////////////////

function buildPlanetInsight(
  planet: HoroscopePlanet
): PlanetInterpretation {


  const name =
    String(
      planet.strength.planet
    );


  return {


    planet:
      name,


    influence:
      `${name} shows ${getStrengthLabel(planet)} influence with ${planet.strength.dignity} dignity.`,


    positive:

      getPositiveThemes(
        planet
      ),


    challenges:

      getChallengeThemes(
        planet
      ),


  };

}



//////////////////////////////////////////////////////////////
// MESSAGE BUILDER
//////////////////////////////////////////////////////////////

function buildLifeMessage(
  category: InterpretationCategory,
  planet: HoroscopePlanet
): InterpretationMessage {


  const name =
    String(
      planet.strength.planet
    );


  return {


    category,


    title:
      `${name} influence in ${category}`,


    summary:
      getDignityMessage(
        planet
      ),


    keywords:

      getPositiveThemes(
        planet
      ),


    priority:

      planet.strength.score,


  };

}



//////////////////////////////////////////////////////////////
// LIFE AREA BUILDER
//////////////////////////////////////////////////////////////

function buildLifeAreas(
  planets: HoroscopePlanet[]
): LifeAreaInterpretation[] {


  const map =
    new Map<
      InterpretationCategory,
      InterpretationMessage[]
    >();



  for (
    const planet of planets
  ) {


    const name =
      String(
        planet.strength.planet
      );


    const areas =
      PLANET_LIFE_AREAS[
        name
      ]
      ??
      [];



    for (
      const area of areas
    ) {


      const category =
        area as InterpretationCategory;


      const existing =
        map.get(
          category
        )
        ??
        [];



      existing.push(

        buildLifeMessage(
          category,
          planet
        )

      );


      map.set(
        category,
        existing
      );


    }

  }



  return Array
    .from(
      map.entries()
    )
    .map(
      (
        [
          area,
          messages,
        ]
      ) => {


        const strength =
          Math.round(

            messages.reduce(

              (
                total,
                message
              ) =>

                total +
                message.priority,

              0

            )
            /
            messages.length

          );



        return {

          area,

          strength,

          messages,

        };


      }
    );


}



//////////////////////////////////////////////////////////////
// MAIN INTERPRETATION ENGINE
//////////////////////////////////////////////////////////////

export function interpretHoroscope(
  snapshot:
  Record<
    string,
    HoroscopePlanet
  >,

  language:
  HoroscopeLanguage = "en"

): HoroscopeInterpretation {



  const planets =
    getPlanetList(
      snapshot
    );



  const planetaryInsights =
    planets.map(
      planet =>
        buildPlanetInsight(
          planet
        )
    );



  const positiveIndicators:string[] = [];

  const challenges:string[] = [];

  const dominantThemes:string[] = [];

  const recommendations:string[] = [];



  for (
    const planet of planets
  ) {


    if (
      isStrongPlanet(
        planet
      )
    ) {


      positiveIndicators.push(

        ...getPositiveThemes(
          planet
        )

      );


      dominantThemes.push(

        ...getPositiveThemes(
          planet
        )

      );


    }



    if (
      isWeakPlanet(
        planet
      )
    ) {


      challenges.push(

        ...getChallengeThemes(
          planet
        )

      );


      recommendations.push(

        `${planet.strength.planet} requires balanced attention and conscious effort.`

      );


    }

  }



  return {


    language,


    headline:

      "Planetary influences reveal your current cosmic patterns.",



    overview:

      "Your horoscope interpretation is generated through planetary strength, dignity and thematic intelligence.",



    dominantThemes:

      uniqueStrings(
        dominantThemes
      ),



    planetaryInsights,



    lifeAreas:

      buildLifeAreas(
        planets
      ),



    positiveIndicators:

      uniqueStrings(
        positiveIndicators
      ),



    challenges:

      uniqueStrings(
        challenges
      ),



    recommendations:

      uniqueStrings(
        recommendations
      ),


  };

}
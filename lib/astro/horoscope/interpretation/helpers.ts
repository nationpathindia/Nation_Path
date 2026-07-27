//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
// Horoscope Interpretation Helper Layer
//////////////////////////////////////////////////////////////

import type {
  HoroscopePlanet,
} from "../types";

import {
  PLANET_POSITIVE_THEMES,
  PLANET_CHALLENGE_THEMES,
  INTERPRETATION_THRESHOLDS,
} from "./rules";


//////////////////////////////////////////////////////////////
// PLANET STRENGTH HELPERS
//////////////////////////////////////////////////////////////

export function isStrongPlanet(
  planet: HoroscopePlanet
): boolean {

  return (
    planet.strength.score >=
    INTERPRETATION_THRESHOLDS.strong
  );

}



export function isVeryStrongPlanet(
  planet: HoroscopePlanet
): boolean {

  return (
    planet.strength.score >=
    INTERPRETATION_THRESHOLDS.veryStrong
  );

}



export function isWeakPlanet(
  planet: HoroscopePlanet
): boolean {

  return (
    planet.strength.score <
    INTERPRETATION_THRESHOLDS.weak
  );

}



//////////////////////////////////////////////////////////////
// PLANET NAME
//////////////////////////////////////////////////////////////

export function getPlanetId(
  planet: HoroscopePlanet
): string {

  return String(
    planet.strength.planet
  );

}



//////////////////////////////////////////////////////////////
// POSITIVE THEME BUILDER
//////////////////////////////////////////////////////////////

export function getPositiveThemes(
  planet: HoroscopePlanet
): string[] {


  const planetName =
    getPlanetId(
      planet
    );


  return (

    PLANET_POSITIVE_THEMES[
      planetName
    ]

    ??

    []

  );

}



//////////////////////////////////////////////////////////////
// CHALLENGE THEME BUILDER
//////////////////////////////////////////////////////////////

export function getChallengeThemes(
  planet: HoroscopePlanet
): string[] {


  const planetName =
    getPlanetId(
      planet
    );


  return (

    PLANET_CHALLENGE_THEMES[
      planetName
    ]

    ??

    []

  );

}



//////////////////////////////////////////////////////////////
// DIGNITY INTERPRETATION
//////////////////////////////////////////////////////////////

export function getDignityMessage(
  planet: HoroscopePlanet
): string {


  const name =
    getPlanetId(
      planet
    );


  switch(
    planet.strength.dignity
  ) {


    case "exalted":

      return (
        `${name} has exceptional strength and expresses its qualities positively.`
      );


    case "own":

      return (
        `${name} is comfortable in its own sign and provides stable influence.`
      );


    case "friendly":

      return (
        `${name} receives supportive planetary conditions.`
      );


    case "neutral":

      return (
        `${name} gives balanced results with gradual development.`
      );


    case "enemy":

      return (
        `${name} may require adjustment and conscious effort.`
      );


    case "debilitated":

      return (
        `${name} requires additional attention and strengthening.`
      );


    default:

      return (
        `${name} influence is being evaluated.`
      );

  }

}



//////////////////////////////////////////////////////////////
// PLANET POWER LABEL
//////////////////////////////////////////////////////////////

export function getStrengthLabel(
  planet: HoroscopePlanet
):

"very-strong"
| "strong"
| "moderate"
| "weak" {


  const score =
    planet.strength.score;


  if (
    score >=
    INTERPRETATION_THRESHOLDS.veryStrong
  ) {

    return "very-strong";

  }


  if (
    score >=
    INTERPRETATION_THRESHOLDS.strong
  ) {

    return "strong";

  }


  if (
    score >=
    INTERPRETATION_THRESHOLDS.moderate
  ) {

    return "moderate";

  }


  return "weak";

}



//////////////////////////////////////////////////////////////
// PLANET INTERPRETATION MESSAGE
//////////////////////////////////////////////////////////////

export function buildPlanetMessage(
  planet: HoroscopePlanet
): string {


  const name =
    getPlanetId(
      planet
    );


  const label =
    getStrengthLabel(
      planet
    );


  return (

    `${name} shows ${label} influence with ${planet.strength.dignity} dignity.`

  );

}



//////////////////////////////////////////////////////////////
// UNIQUE ARRAY HELPER
//////////////////////////////////////////////////////////////

export function uniqueStrings(
  values: string[]
): string[] {

  return [
    ...new Set(
      values
    ),
  ];

}



//////////////////////////////////////////////////////////////
// SAFE PLANET ITERATION
//////////////////////////////////////////////////////////////

export function getPlanetList(
  snapshot:
  Record<
    string,
    HoroscopePlanet
  >
): HoroscopePlanet[] {


  return Object
    .values(
      snapshot
    );

}
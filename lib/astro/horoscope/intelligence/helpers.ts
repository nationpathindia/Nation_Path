//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO INTELLIGENCE ENGINE
// Planet Intelligence Helpers
//////////////////////////////////////////////////////////////

import {
  PLANETS,
} from "./planets";


import type {
  LanguageCode,
  PlanetDescription,
  PlanetMetadata,
  PlanetName,
  PlanetTranslation,
} from "./types";



//////////////////////////////////////////////////////////////
// PLANET VALIDATION
//////////////////////////////////////////////////////////////

export function isPlanet(
  value: string
): value is PlanetName {

  return PLANETS.some(
    (planet) =>
      planet.id === value
  );

}



//////////////////////////////////////////////////////////////
// GET PLANET METADATA CORE ENGINE
//////////////////////////////////////////////////////////////

export function getPlanet(
  planet: PlanetName
): PlanetMetadata {


  const result =
    PLANETS.find(
      (item) =>
        item.id === planet
    );


  if (!result) {

    throw new Error(
      `Unknown planet intelligence: ${planet}`
    );

  }


  return result;

}



//////////////////////////////////////////////////////////////
// COMPATIBILITY ALIAS
// Future Engine Runtime Access
//////////////////////////////////////////////////////////////

export const getPlanetMetadata =
  getPlanet;



//////////////////////////////////////////////////////////////
// GET ALL PLANETS
//////////////////////////////////////////////////////////////

export function getPlanets():

readonly PlanetMetadata[] {

  return PLANETS;

}



//////////////////////////////////////////////////////////////
// GET PLANET NAME
//////////////////////////////////////////////////////////////

export function getPlanetName(
  planet: PlanetName,
  language: LanguageCode = "en"
): string {


  const metadata =
    getPlanet(
      planet
    );


  return (
    metadata.name[language]
    ||
    metadata.name.en
    ||
    planet
  );

}



//////////////////////////////////////////////////////////////
// GET PLANET DESCRIPTION
//////////////////////////////////////////////////////////////

export function getPlanetDescription(
  planet: PlanetName,
  language: LanguageCode = "en"
): string {


  const metadata =
    getPlanet(
      planet
    );


  return (
    metadata.description[language]
    ||
    metadata.description.en
    ||
    ""
  );

}



//////////////////////////////////////////////////////////////
// GET TRANSLATION MAP
//////////////////////////////////////////////////////////////

export function getPlanetTranslation(
  planet: PlanetName
): PlanetTranslation {


  return getPlanet(
    planet
  ).name;

}



//////////////////////////////////////////////////////////////
// GET DESCRIPTION MAP
//////////////////////////////////////////////////////////////

export function getPlanetDescriptions(
  planet: PlanetName
): PlanetDescription {


  return getPlanet(
    planet
  ).description;

}



//////////////////////////////////////////////////////////////
// SEARCH ENGINE
//////////////////////////////////////////////////////////////

export function findPlanetsByKeyword(
  keyword:string
): PlanetMetadata[] {


  const search =
    keyword.toLowerCase();


  return PLANETS.filter(
    (planet)=>

      planet.keywords.some(
        (item)=>
          item
          .toLowerCase()
          .includes(search)
      )

  );

}



//////////////////////////////////////////////////////////////
// PLANET TRAITS ENGINE
//////////////////////////////////////////////////////////////

export function getPlanetTraits(
  planet: PlanetName
){


  const metadata =
    getPlanet(
      planet
    );


  return {

    positive:
      metadata.positiveTraits ?? [],


    challenging:
      metadata.challengingTraits ?? [],


    professions:
      metadata.professions ?? [],


    remedies:
      metadata.remedies ?? [],

  };

}
//////////////////////////////////////////////////////////////
// GET ALL PLANET METADATA
//////////////////////////////////////////////////////////////

export function getAllPlanetMetadata():
readonly PlanetMetadata[] {

  return PLANETS;

}
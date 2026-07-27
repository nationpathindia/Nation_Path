//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
// Planet Name Mapper
//////////////////////////////////////////////////////////////

import {
  Planet,
} from "../client";

import type {
  HoroscopePlanetId,
  PlanetName,
} from "./types";


//////////////////////////////////////////////////////////////
// PLANET ENUM / STRING → STANDARD NAME
//////////////////////////////////////////////////////////////

export function getPlanetName(
  planet: HoroscopePlanetId
): PlanetName {


  /**
   * Shadow planets
   * Vedic Nodes
   */

  if (
    typeof planet === "string"
  ) {

    switch (planet) {

      case "Rahu":
        return "Rahu";


      case "Ketu":
        return "Ketu";


      default:
        throw new Error(
          `Unknown planet: ${planet}`
        );

    }

  }



  switch(planet) {


    case Planet.Sun:

      return "Sun";


    case Planet.Moon:

      return "Moon";


    case Planet.Mars:

      return "Mars";


    case Planet.Mercury:

      return "Mercury";


    case Planet.Jupiter:

      return "Jupiter";


    case Planet.Venus:

      return "Venus";


    case Planet.Saturn:

      return "Saturn";


    default:

      throw new Error(
        `Unknown planet enum: ${planet}`
      );


  }

}
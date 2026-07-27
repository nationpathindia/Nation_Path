//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO ENGINE
// Jaimini Darakaraka Calculation
// Future Proof Version
//////////////////////////////////////////////////////////////

import type {
  HoroscopePlanet,
} from "../horoscope/types";


import type {
  DarakarakaResult,
} from "./types";



//////////////////////////////////////////////////////////////
// CONFIGURATION
//////////////////////////////////////////////////////////////

const EXCLUDED_PLANETS =
  new Set<string>([
    "Rahu",
    "Ketu",
  ]);



//////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////

function normalizePlanetName(
  planet: HoroscopePlanet
): string {

  return String(
    planet.planet
  );

}



function getDegreesInSign(
  longitude:number
):number {

  return (
    longitude % 30
  );

}



//////////////////////////////////////////////////////////////
// ENGINE
//////////////////////////////////////////////////////////////

/**
 * Jaimini Darakaraka
 *
 * Lowest degree planet in sign
 * becomes Darakaraka.
 *
 * Future Ready:
 * - Swiss Ephemeris enum compatible
 * - Custom planet IDs compatible
 * - No dependency on string-only planets
 */

export function calculateDarakaraka(
  planets: HoroscopePlanet[]
): DarakarakaResult {


  const candidates = planets

    .filter(
      (planet) =>
        !EXCLUDED_PLANETS.has(
          normalizePlanetName(
            planet
          )
        )
    )


    .map(
      (planet) => ({

        planet,

        degreesInSign:
          getDegreesInSign(
            planet.longitude
          ),

      })
    )


    .sort(
      (a,b) =>
        a.degreesInSign -
        b.degreesInSign
    );



  const darakaraka =
    candidates[0];



  if(!darakaraka){

    return {

      planet:
        "Unknown",

      longitude:
        0,

    };

  }



  return {

    planet:
      String(
        darakaraka.planet.planet
      ),


    longitude:
      darakaraka.planet.longitude,

  };

}
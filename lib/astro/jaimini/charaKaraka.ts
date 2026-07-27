//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO ENGINE
// Jaimini Chara Karaka Engine
// Future Proof Version
//////////////////////////////////////////////////////////////

import type {
  HoroscopePlanet,
} from "../horoscope/types";



//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////

export type CharaKarakaName =
  | "Atmakaraka"
  | "Amatyakaraka"
  | "Bhratrukaraka"
  | "Matrukaraka"
  | "Putrakaraka"
  | "Gnatikaraka"
  | "Darakaraka";



export interface CharaKaraka {

  karaka:
    CharaKarakaName;


  planet:
    HoroscopePlanet;


  degreesInSign:
    number;

}



//////////////////////////////////////////////////////////////
// CONFIGURATION
//////////////////////////////////////////////////////////////

const KARAKA_ORDER:
  CharaKarakaName[] = [

  "Atmakaraka",
  "Amatyakaraka",
  "Bhratrukaraka",
  "Matrukaraka",
  "Putrakaraka",
  "Gnatikaraka",
  "Darakaraka",

];



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



function degreesInSign(
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
 * Classical Jaimini Chara Karaka
 *
 * Highest degree in sign
 *        ↓
 * Atmakaraka
 *
 * Lowest degree in sign
 *        ↓
 * Darakaraka
 *
 * Future Ready:
 * - Supports Swiss Ephemeris enum
 * - Supports custom planet IDs
 * - Rahu/Ketu exclusion configurable
 */

export function calculateCharaKarakas(
  planets: HoroscopePlanet[]
): CharaKaraka[] {



  const ordered =
    planets

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
            degreesInSign(
              planet.longitude
            ),

        })
      )


      .sort(
        (a,b) =>
          b.degreesInSign -
          a.degreesInSign
      );



  return ordered

    .slice(
      0,
      KARAKA_ORDER.length
    )

    .map(
      (item,index) => ({

        karaka:
          KARAKA_ORDER[index],


        planet:
          item.planet,


        degreesInSign:
          item.degreesInSign,

      })
    );

}
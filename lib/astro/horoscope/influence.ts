//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
// Planet Influence Runtime Layer
//////////////////////////////////////////////////////////////

import type {
  HoroscopePlanet,
  HoroscopeLanguage,
} from "./types";

import {
  translatePlanet,
  translateRashi,
  getLocalizedNature,
  getLocalizedKeywords,
} from "./mapper";


//////////////////////////////////////////////////////////////
// PLANET INFLUENCE RESULT
//////////////////////////////////////////////////////////////

export interface PlanetInfluence {


  planet:
    string;


  planetId:
    string;


  rashi:
    string;


  longitude:
    number;


  retrograde:
    boolean;


  nature:
    string;


  keywords:
    string[];



  strength: {

    score:
      number;


    dignity:
      string;

  };


}



//////////////////////////////////////////////////////////////
// BUILD PLANET INFLUENCE
//////////////////////////////////////////////////////////////

export function buildPlanetInfluence(
  planet: HoroscopePlanet,
  lang?: HoroscopeLanguage
): PlanetInfluence {


  /**
   * Intelligence database is
   * single source of truth
   */

  const metadata =
    planet.intelligence;



  const englishName =
    metadata.id;



  return {


    planet:
      translatePlanet(
        englishName,
        lang
      ),



    planetId:
      englishName,



    rashi:
      translateRashi(
        planet.rashi.name,
        lang
      ),



    longitude:
      planet.longitude,



    retrograde:
      planet.retrograde,



    nature:
      getLocalizedNature(
        metadata.nature,
        lang
      ),



    keywords:
      getLocalizedKeywords(
        englishName,
        metadata.keywords,
        lang
      ),



    strength: {


      score:
        planet.strength.score,


      dignity:
        planet.strength.dignity,


    },


  };

}
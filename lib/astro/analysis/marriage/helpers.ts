//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO ENGINE
// Marriage Analysis Helpers
// Future Proof Planet Resolver
//////////////////////////////////////////////////////////////

import type {
  HoroscopePlanet,
} from "../../horoscope/types";



//////////////////////////////////////////////////////////////
// PLANET NORMALIZER
//////////////////////////////////////////////////////////////

function normalizePlanetName(
  planet: HoroscopePlanet
): string {


  const value =
    planet.planet;



  if(typeof value === "string"){

    return value;

  }



  const swissPlanetMap:Record<number,string> = {

    0:"Sun",
    1:"Moon",
    2:"Mars",
    3:"Mercury",
    4:"Jupiter",
    5:"Venus",
    6:"Saturn",

  };


  return (
    swissPlanetMap[
      Number(value)
    ]
    ??
    String(value)

  );

}




//////////////////////////////////////////////////////////////
// PLANET FINDER
//////////////////////////////////////////////////////////////

export function findPlanet(
  planets: HoroscopePlanet[],
  name:string
): HoroscopePlanet | undefined {


  return planets.find(

    (planet)=>

      normalizePlanetName(
        planet
      )
      ===
      name

  );

}



//////////////////////////////////////////////////////////////
// HOUSE HELPERS
//////////////////////////////////////////////////////////////

export function getPlanetHouse(
  planet?:HoroscopePlanet
):number {

  return (
    planet?.house?.number
    ??
    0
  );

}



export function getHouseOccupants(
  planets:HoroscopePlanet[],
  house:number
):HoroscopePlanet[] {


  return planets.filter(

    planet =>

      planet.house?.number
      ===
      house

  );

}



//////////////////////////////////////////////////////////////
// SIGN HELPERS
//////////////////////////////////////////////////////////////

export function getPlanetSign(
  planet?:HoroscopePlanet
):string {


  return (

    planet?.rashi?.name

    ??

    "Unknown"

  );

}



//////////////////////////////////////////////////////////////
// STRENGTH HELPERS
//////////////////////////////////////////////////////////////

export function getPlanetStrength(
  planet?:HoroscopePlanet
):number {


  return (

    planet?.strength?.score

    ??

    0

  );

}



export function isStrongPlanet(
  planet?:HoroscopePlanet
):boolean {

  return (
    getPlanetStrength(planet)
    >=
    70
  );

}



export function isWeakPlanet(
  planet?:HoroscopePlanet
):boolean {

  return (
    getPlanetStrength(planet)
    <
    40
  );

}



//////////////////////////////////////////////////////////////
// NATURE HELPERS
//////////////////////////////////////////////////////////////

export function isBeneficPlanet(
  planet?:HoroscopePlanet
):boolean {


  return (

    planet?.intelligence?.nature
    ===
    "benefic"

  );

}



export function isMaleficPlanet(
  planet?:HoroscopePlanet
):boolean {


  return (

    planet?.intelligence?.nature
    ===
    "malefic"

  );

}



export function countBenefics(
  planets:HoroscopePlanet[]
):number {


  return planets.filter(
    isBeneficPlanet
  ).length;

}



export function countMalefics(
  planets:HoroscopePlanet[]
):number {


  return planets.filter(
    isMaleficPlanet
  ).length;

}



//////////////////////////////////////////////////////////////
// SCORE HELPERS
//////////////////////////////////////////////////////////////

export function clampScore(
  score:number
):number {


  return Math.max(

    0,

    Math.min(
      100,
      score
    )

  );

}



export function averageScore(
  values:number[]
):number {


  if(values.length===0){

    return 0;

  }


  return (

    values.reduce(
      (a,b)=>a+b,
      0
    )
    /
    values.length

  );

}



export function calculateConfidence(
  values:number[]
):number {


  if(values.length===0){

    return 0;

  }


  return clampScore(

    Math.round(
      averageScore(values)
    )

  );

}



//////////////////////////////////////////////////////////////
// SEVENTH HOUSE
//////////////////////////////////////////////////////////////

export function getSeventhHouseNumber():number {

  return 7;

}



//////////////////////////////////////////////////////////////
// RASHI LORD
//////////////////////////////////////////////////////////////

export function getRashiLord(
  rashi:string
):string {


const rulers:Record<string,string>={

  Mesha:"Mars",
  Vrishabha:"Venus",
  Mithuna:"Mercury",
  Karka:"Moon",
  Simha:"Sun",
  Kanya:"Mercury",
  Tula:"Venus",
  Vrischika:"Mars",
  Dhanu:"Jupiter",
  Makara:"Saturn",
  Kumbha:"Saturn",
  Meena:"Jupiter",

};


return (

  rulers[rashi]
  ??
  "Unknown"

);

}
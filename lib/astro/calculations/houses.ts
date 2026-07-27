//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOUSE CALCULATION ENGINE
// Swiss Ephemeris Birth Houses
// Production Vedic Astrology Foundation
//////////////////////////////////////////////////////////////

import {

  initializeSwissEphemeris,

  calculateHouses,

  dateToJulianDay,

  HouseSystem,

} from "../client";



//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////

export type HouseSystemType =
  HouseSystem;



export interface BirthHouse {


  number:number;


  cusp:number;


  // Future:
  // bhava strength
  // lord
  // occupants

}



export interface BirthHouseData {


  julianDay:number;


  ascendant:number;


  mc:number;


  houses:BirthHouse[];


  cusps:number[];


  houseSystem?:HouseSystemType;


}






//////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////

function normalizeDegrees(
  value:number
):number {


  return (
    (value % 360) + 360
  ) % 360;


}



function createHouseList(
  cusps:number[]
):BirthHouse[] {


  return Array.from(

    {
      length:12,
    },

    (_,index)=>{


      const number =
        index + 1;


      return {


        number,


        cusp:
          cusps[number],


      };


    }

  );


}





//////////////////////////////////////////////////////////////
// BIRTH HOUSE CALCULATION
//////////////////////////////////////////////////////////////

export function calculateBirthHouses(

  date:Date,

  latitude:number,

  longitude:number,

  system:
  HouseSystem =
  HouseSystem.Placidus

):BirthHouseData {



  initializeSwissEphemeris();



  const julianDay =
    dateToJulianDay(
      date
    );




  const result =
    calculateHouses(

      julianDay,

      latitude,

      longitude,

      system

    );




  const cusps =
    result.cusps.map(

      cusp =>

      normalizeDegrees(
        cusp
      )

    );




  return {


    julianDay,


    ascendant:

      normalizeDegrees(
        result.ascendant
      ),



    mc:

      normalizeDegrees(
        result.mc
      ),



    houses:

      createHouseList(
        cusps
      ),



    cusps,



    houseSystem:
      system,


  };


}






//////////////////////////////////////////////////////////////
// ASCENDANT
//////////////////////////////////////////////////////////////

export function getAscendant(

  houseData:BirthHouseData

):number {


  return houseData.ascendant;


}





//////////////////////////////////////////////////////////////
// MC
//////////////////////////////////////////////////////////////

export function getMC(

  houseData:BirthHouseData

):number {


  return houseData.mc;


}






//////////////////////////////////////////////////////////////
// PLANET HOUSE MAPPING
//////////////////////////////////////////////////////////////

export function getPlanetHouse(

  longitude:number,

  houseData:BirthHouseData

):number {


  const position =
    normalizeDegrees(
      longitude
    );



  const cusps =
    houseData.cusps;



  for(

    let house = 1;

    house <= 12;

    house++

  ){


    const currentCusp =
      cusps[house];



    const nextCusp =
      cusps[
        house === 12
        ? 1
        : house + 1
      ];




    if(
      nextCusp < currentCusp
    ){


      if(

        position >= currentCusp
        ||
        position < nextCusp

      ){

        return house;

      }


    }

    else {


      if(

        position >= currentCusp
        &&
        position < nextCusp

      ){

        return house;

      }


    }


  }



  return 1;


}






//////////////////////////////////////////////////////////////
// HOUSE SUMMARY
//////////////////////////////////////////////////////////////

export function getHouseSummary(

  houseData:BirthHouseData

){


  return {


    ascendant:
      houseData.ascendant,


    mc:
      houseData.mc,


    houses:
      houseData.houses.length,


    system:
      houseData.houseSystem,


  };


}





//////////////////////////////////////////////////////////////
// END OF HOUSE ENGINE
//////////////////////////////////////////////////////////////
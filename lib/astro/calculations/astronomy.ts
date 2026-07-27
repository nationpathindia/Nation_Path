import {
  initializeSwissEphemeris,

  calculatePosition,
  dateToJulianDay,
  getAyanamsa,

  Planet,
  CalculationFlag,
} from "../client";

import type {
  LunarPoint,
} from "@swisseph/node";


//////////////////////////////////////////////////////////////
// ASTRO BODY TYPES
//////////////////////////////////////////////////////////////

export type AstroBody =
  | Planet
  | LunarPoint.TrueNode;



//////////////////////////////////////////////////////////////
// PLANET POSITION
//////////////////////////////////////////////////////////////

export interface PlanetPosition {

  planet:
    AstroBody;

  julianDay:
    number;


  tropicalLongitude:
    number;


  siderealLongitude:
    number;


  latitude:
    number;


  distance:
    number;


  longitudeSpeed:
    number;


  latitudeSpeed:
    number;


  distanceSpeed:
    number;


  ayanamsa:
    number;

}



//////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////

export function normalizeDegrees(
  value: number
): number {

  return (
    (value % 360) + 360
  ) % 360;

}



//////////////////////////////////////////////////////////////
// JULIAN DAY
//////////////////////////////////////////////////////////////

export function toJulianDay(
  date: Date
): number {

  initializeSwissEphemeris();

  return dateToJulianDay(
    date
  );

}



//////////////////////////////////////////////////////////////
// AYANAMSA
//////////////////////////////////////////////////////////////

export function getAyanamsaDegrees(
  julianDay: number
): number {

  initializeSwissEphemeris();

  return getAyanamsa(
    julianDay
  );

}



//////////////////////////////////////////////////////////////
// PLANET / NODE POSITION
//////////////////////////////////////////////////////////////

export function getPlanetPosition(
  date: Date,
  body: AstroBody
): PlanetPosition {


  initializeSwissEphemeris();


  const jd =
    dateToJulianDay(
      date
    );


  const tropical =
    calculatePosition(

      jd,

      body,

      CalculationFlag.Speed

    );


  const ayanamsa =
    getAyanamsa(
      jd
    );


  const siderealLongitude =
    normalizeDegrees(

      tropical.longitude
      -
      ayanamsa

    );


  return {

    planet:
      body,


    julianDay:
      jd,


    tropicalLongitude:

      normalizeDegrees(
        tropical.longitude
      ),


    siderealLongitude,


    latitude:
      tropical.latitude,


    distance:
      tropical.distance,


    longitudeSpeed:
      tropical.longitudeSpeed,


    latitudeSpeed:
      tropical.latitudeSpeed,


    distanceSpeed:
      tropical.distanceSpeed,


    ayanamsa,

  };

}



//////////////////////////////////////////////////////////////
// SIDEREAL LONGITUDE
//////////////////////////////////////////////////////////////

export function getSiderealLongitude(
  date: Date,
  planet: Planet
): number {

  return getPlanetPosition(
    date,
    planet
  )
  .siderealLongitude;

}



//////////////////////////////////////////////////////////////
// TROPICAL LONGITUDE
//////////////////////////////////////////////////////////////

export function getTropicalLongitude(
  date: Date,
  planet: Planet
): number {

  return getPlanetPosition(
    date,
    planet
  )
  .tropicalLongitude;

}



//////////////////////////////////////////////////////////////
// RETROGRADE
//////////////////////////////////////////////////////////////

export function isRetrograde(
  date: Date,
  planet: Planet
): boolean {

  return (

    getPlanetPosition(
      date,
      planet
    )
    .longitudeSpeed < 0

  );

}
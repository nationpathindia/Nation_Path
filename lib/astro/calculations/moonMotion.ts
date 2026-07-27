import { getPlanetPosition } from "./astronomy";
import { Planet } from "../client";

export interface MoonMotion {
  longitude: number;
  latitude: number;
  distance: number;

  longitudeSpeed: number;
  latitudeSpeed: number;
  distanceSpeed: number;

  angularVelocityDegPerDay: number;
  angularVelocityDegPerHour: number;
  angularVelocityDegPerMinute: number;
  angularVelocityDegPerSecond: number;
}

export function getMoonMotion(
  date: Date
): MoonMotion {
  const moon = getPlanetPosition(
    date,
    Planet.Moon
  );

  return {
    longitude: moon.siderealLongitude,

    latitude: moon.latitude,

    distance: moon.distance,

    longitudeSpeed:
      moon.longitudeSpeed,

    latitudeSpeed:
      moon.latitudeSpeed,

    distanceSpeed:
      moon.distanceSpeed,

    angularVelocityDegPerDay:
      moon.longitudeSpeed,

    angularVelocityDegPerHour:
      moon.longitudeSpeed / 24,

    angularVelocityDegPerMinute:
      moon.longitudeSpeed /
      24 /
      60,

    angularVelocityDegPerSecond:
      moon.longitudeSpeed /
      24 /
      60 /
      60,
  };
}

/**
 * Convenience Helpers
 */

export function getMoonDailyMotion(
  date: Date
): number {
  return getMoonMotion(date)
    .angularVelocityDegPerDay;
}

export function getMoonHourlyMotion(
  date: Date
): number {
  return getMoonMotion(date)
    .angularVelocityDegPerHour;
}

export function getMoonAngularVelocity(
  date: Date
): number {
  return getMoonMotion(date)
    .angularVelocityDegPerSecond;
}
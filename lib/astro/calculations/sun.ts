import { Planet } from "../client";
import {
  getPlanetPosition,
  normalizeDegrees,
  type PlanetPosition,
} from "./astronomy";

export interface SunPosition extends PlanetPosition {}

export const RASHI_SIZE = 30;

export const RASHIS = [
  "Mesha",
  "Vrishabha",
  "Mithuna",
  "Karka",
  "Simha",
  "Kanya",
  "Tula",
  "Vrischika",
  "Dhanu",
  "Makara",
  "Kumbha",
  "Meena",
] as const;

export interface RashiInfo {
  index: number;
  name: string;
}

export function getSunPosition(
  date: Date
): SunPosition {
  return getPlanetPosition(date, Planet.Sun);
}

export function getSunLongitude(
  date: Date
): number {
  return getSunPosition(date).siderealLongitude;
}

export function getSunLatitude(
  date: Date
): number {
  return getSunPosition(date).latitude;
}

export function getSunDistance(
  date: Date
): number {
  return getSunPosition(date).distance;
}

export function getSunRashi(
  date: Date
): RashiInfo {
  const longitude = getSunLongitude(date);

  const index = Math.floor(
    normalizeDegrees(longitude) / RASHI_SIZE
  );

  return {
    index,
    name: RASHIS[index],
  };
}

export function isSunInRashi(
  date: Date,
  rashiIndex: number
): boolean {
  return (
    getSunRashi(date).index === rashiIndex
  );
}
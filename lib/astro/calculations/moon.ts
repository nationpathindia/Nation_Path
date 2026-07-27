import { Planet } from "../client";
import {
  getPlanetPosition,
  normalizeDegrees,
  type PlanetPosition,
} from "./astronomy";

export const NAKSHATRA_COUNT = 27;
export const PADA_COUNT = 4;

export const NAKSHATRA_SIZE = 360 / 27; // 13°20'
export const PADA_SIZE = NAKSHATRA_SIZE / 4; // 3°20'
export const RASHI_SIZE = 30;

export interface NakshatraInfo {
  index: number;
  name: string;
  pada: number;
  degrees: number;
}

export interface RashiInfo {
  index: number;
  name: string;
}

export const NAKSHATRAS = [
  "Ashwini",
  "Bharani",
  "Krittika",
  "Rohini",
  "Mrigashira",
  "Ardra",
  "Punarvasu",
  "Pushya",
  "Ashlesha",
  "Magha",
  "Purva Phalguni",
  "Uttara Phalguni",
  "Hasta",
  "Chitra",
  "Swati",
  "Vishakha",
  "Anuradha",
  "Jyeshtha",
  "Mula",
  "Purva Ashadha",
  "Uttara Ashadha",
  "Shravana",
  "Dhanishta",
  "Shatabhisha",
  "Purva Bhadrapada",
  "Uttara Bhadrapada",
  "Revati",
] as const;

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

export function getMoonPosition(date: Date): PlanetPosition {
  return getPlanetPosition(date, Planet.Moon);
}

export function getMoonLongitude(date: Date): number {
  return getMoonPosition(date).siderealLongitude;
}

export function getMoonLatitude(date: Date): number {
  return getMoonPosition(date).latitude;
}

export function getMoonDistance(date: Date): number {
  return getMoonPosition(date).distance;
}

export function getNakshatra(date: Date): NakshatraInfo {
  const longitude = getMoonLongitude(date);

  const index = Math.floor(longitude / NAKSHATRA_SIZE);

  const degrees = normalizeDegrees(
    longitude - index * NAKSHATRA_SIZE
  );

  const pada =
    Math.floor(degrees / PADA_SIZE) + 1;

  return {
    index,
    name: NAKSHATRAS[index],
    pada,
    degrees,
  };
}

export function getPada(date: Date): number {
  return getNakshatra(date).pada;
}

export function getMoonRashi(date: Date): RashiInfo {
  const longitude = getMoonLongitude(date);

  const index = Math.floor(longitude / RASHI_SIZE);

  return {
    index,
    name: RASHIS[index],
  };
}

export function isWaxingMoon(date: Date): boolean {
  const moon = getMoonLongitude(date);
  const sun = getPlanetPosition(
    date,
    Planet.Sun
  ).siderealLongitude;

  return normalizeDegrees(moon - sun) < 180;
}

export function isWaningMoon(date: Date): boolean {
  return !isWaxingMoon(date);
}
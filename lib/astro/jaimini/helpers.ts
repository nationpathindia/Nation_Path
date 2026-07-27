//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO ENGINE
// Jaimini Helper Functions
//////////////////////////////////////////////////////////////

import type { HoroscopePlanet } from "../horoscope/types";
import { RASHIS, RASHI_LORDS, type RashiName } from "./constants";

export function getRashiIndex(sign: string): number {
  return RASHIS.indexOf(sign as RashiName);
}

export function getRashiName(index: number): RashiName {
  return RASHIS[((index % 12) + 12) % 12];
}

export function getRashiLord(sign: string): string {
  return RASHI_LORDS[sign as RashiName];
}

export function getPlanet(
  planets: HoroscopePlanet[],
  name: string
): HoroscopePlanet | undefined {
  return planets.find((p) => p.planet === name);
}

export function getPlanetHouse(
  planet?: HoroscopePlanet
): number {
  return planet?.house?.number ?? 0;
}

export function getPlanetLongitude(
  planet?: HoroscopePlanet
): number {
  return planet?.longitude ?? 0;
}

export function getPlanetSign(
  planet?: HoroscopePlanet
): string {
  return planet?.rashi.name ?? "";
}
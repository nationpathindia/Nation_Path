import type { RashiName } from "../../calculations/rashi";

import type {
  PlanetName,
} from "../intelligence";

import {
  getAllPlanetMetadata,
} from "../intelligence";

import {
  calculatePlanetStrength,
} from "./engine";

import type {
  PlanetStrengthResult,
} from "./types";

export function calculateStrengths(
  planets: Record<
    PlanetName,
    RashiName
  >
): PlanetStrengthResult[] {
  return Object.entries(
    planets
  ).map(
    ([planet, rashi]) =>
      calculatePlanetStrength(
        planet as PlanetName,
        rashi as RashiName
      )
  );
}

export function calculateAllPlanetStrengths(
  rashi: RashiName
): PlanetStrengthResult[] {
  return getAllPlanetMetadata().map(
    (planet) =>
      calculatePlanetStrength(
        planet.id,
        rashi
      )
  );
}

export function getStrongestPlanet(
  strengths: PlanetStrengthResult[]
): PlanetStrengthResult | null {
  if (
    strengths.length === 0
  ) {
    return null;
  }

  return strengths.reduce(
    (strongest, current) =>
      current.score >
      strongest.score
        ? current
        : strongest
  );
}

export function getWeakestPlanet(
  strengths: PlanetStrengthResult[]
): PlanetStrengthResult | null {
  if (
    strengths.length === 0
  ) {
    return null;
  }

  return strengths.reduce(
    (weakest, current) =>
      current.score <
      weakest.score
        ? current
        : weakest
  );
}
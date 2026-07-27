import type { RashiName } from "../../calculations/rashi";

import {
  getPlanetMetadata,
} from "../intelligence";

import {
  PLANET_STRENGTH_SCORES,
} from "./constants";

import type {
  PlanetStrengthResult,
} from "./types";

import type {
  PlanetName,
} from "../intelligence";

export function calculatePlanetStrength(
  planet: PlanetName,
  rashi: RashiName
): PlanetStrengthResult {

  const metadata =
    getPlanetMetadata(
      planet
    );

  const isExalted =
    metadata.exaltation ===
    rashi;

  const isDebilitated =
    metadata.debilitation ===
    rashi;

  const isOwnSign =
    metadata.ownSigns.includes(
      rashi
    );

  const isFriendly =
    metadata.friendlySigns.includes(
      rashi
    );

  const isEnemy =
    metadata.enemySigns.includes(
      rashi
    );

  const isNeutral =
    metadata.neutralSigns.includes(
      rashi
    );

  let dignity:
    PlanetStrengthResult["dignity"];

  if (isExalted) {
    dignity =
      "exalted";
  } else if (
    isDebilitated
  ) {
    dignity =
      "debilitated";
  } else if (
    isOwnSign
  ) {
    dignity = "own";
  } else if (
    isFriendly
  ) {
    dignity =
      "friendly";
  } else if (
    isEnemy
  ) {
    dignity = "enemy";
  } else {
    dignity =
      "neutral";
  }

  return {
    planet,

    rashi,

    dignity,

    score:
      PLANET_STRENGTH_SCORES[
        dignity
      ],

    isExalted,

    isDebilitated,

    isOwnSign,

    isFriendly,

    isNeutral,

    isEnemy,
  };
}
import type { PlanetName } from "../intelligence";
import type { RashiName } from "../../calculations/rashi";

export type PlanetDignity =
  | "exalted"
  | "debilitated"
  | "own"
  | "friendly"
  | "neutral"
  | "enemy";

export interface PlanetStrengthResult {
  planet: PlanetName;

  rashi: RashiName;

  dignity: PlanetDignity;

  score: number;

  isExalted: boolean;

  isDebilitated: boolean;

  isOwnSign: boolean;

  isFriendly: boolean;

  isNeutral: boolean;

  isEnemy: boolean;
}
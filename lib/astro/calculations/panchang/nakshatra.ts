import { normalizeDegrees } from "../astronomy";
import { getMoonLongitude } from "../moon";

import {
  NAKSHATRAS,
  NAKSHATRA_SIZE,
  TOTAL_NAKSHATRAS,
} from "./constants";

export interface NakshatraInfo {
  /** 0-26 */
  index: number;

  /** Ashwini ... Revati */
  name: string;

  /** 1-4 */
  pada: number;

  /** Moon longitude */
  degree: number;
}

/**
 * Returns Nakshatra Index (0-26)
 */
export function getNakshatraIndex(
  date: Date
): number {
  const moonLongitude = normalizeDegrees(
    getMoonLongitude(date)
  );

  return Math.min(
    Math.floor(
      moonLongitude / NAKSHATRA_SIZE
    ),
    TOTAL_NAKSHATRAS - 1
  );
}

/**
 * Returns Pada (1-4)
 */
export function getNakshatraPada(
  date: Date
): number {
  const moonLongitude = normalizeDegrees(
    getMoonLongitude(date)
  );

  const offset =
    moonLongitude % NAKSHATRA_SIZE;

  return Math.floor(
    offset / (NAKSHATRA_SIZE / 4)
  ) + 1;
}

/**
 * Main Nakshatra Engine
 */
export function getNakshatra(
  date: Date
): NakshatraInfo {
  const moonLongitude = normalizeDegrees(
    getMoonLongitude(date)
  );

  const index =
    getNakshatraIndex(date);

  return {
    index,
    name: NAKSHATRAS[index],
    pada: getNakshatraPada(date),
    degree: moonLongitude,
  };
}

/**
 * Helper
 */
export function isNakshatra(
  date: Date,
  index: number
): boolean {
  return (
    getNakshatraIndex(date) === index
  );
}
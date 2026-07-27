import { normalizeDegrees } from "../astronomy";
import { getSunLongitude } from "../sun";
import { getMoonLongitude } from "../moon";

import {
  YOGAS,
  YOGA_SIZE,
  TOTAL_YOGAS,
} from "./constants";

export interface YogaInfo {
  /** 0-26 */
  index: number;

  /** Vishkumbha ... Vaidhriti */
  name: string;

  /** Sun + Moon Longitude */
  degree: number;
}

/**
 * Sun + Moon longitude
 * Always normalized to 0–360°
 */
export function getSunMoonSum(
  date: Date
): number {
  const sun = normalizeDegrees(
    getSunLongitude(date)
  );

  const moon = normalizeDegrees(
    getMoonLongitude(date)
  );

  return normalizeDegrees(
    sun + moon
  );
}

/**
 * Returns Yoga Index (0-26)
 */
export function getYogaIndex(
  date: Date
): number {
  const degree = getSunMoonSum(date);

  return Math.min(
    Math.floor(
      degree / YOGA_SIZE
    ),
    TOTAL_YOGAS - 1
  );
}

/**
 * Main Yoga Engine
 */
export function getYoga(
  date: Date
): YogaInfo {
  const degree =
    getSunMoonSum(date);

  const index =
    getYogaIndex(date);

  return {
    index,
    name: YOGAS[index],
    degree,
  };
}

/**
 * Helper
 */
export function isYoga(
  date: Date,
  index: number
): boolean {
  return (
    getYogaIndex(date) === index
  );
}
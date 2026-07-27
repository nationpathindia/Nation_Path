import { getSunMoonDifference } from "./helpers";

import {
  TITHIS,
  TITHI_SIZE,
  TOTAL_TITHIS,
} from "./constants";

export interface TithiInfo {
  index: number;
  name: string;

  paksha: "Shukla" | "Krishna";

  degree: number;
}

export function getTithiIndex(
  date: Date
): number {
  const diff =
    getSunMoonDifference(date);

  return Math.min(
    Math.floor(diff / TITHI_SIZE),
    TOTAL_TITHIS - 1
  );
}

export function getPaksha(
  date: Date
): "Shukla" | "Krishna" {
  return getTithiIndex(date) < 15
    ? "Shukla"
    : "Krishna";
}

export function getTithi(
  date: Date
): TithiInfo {
  const degree =
    getSunMoonDifference(date);

  const index =
    getTithiIndex(date);

  return {
    index,
    name: TITHIS[index],
    paksha:
      index < 15
        ? "Shukla"
        : "Krishna",
    degree,
  };
}

export function isShuklaPaksha(
  date: Date
): boolean {
  return getPaksha(date) === "Shukla";
}

export function isKrishnaPaksha(
  date: Date
): boolean {
  return getPaksha(date) === "Krishna";
}
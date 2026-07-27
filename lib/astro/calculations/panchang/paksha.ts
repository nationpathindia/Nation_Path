import { getSunMoonDifference } from "./helpers";


export const PAKSHA_COUNT = 2;


export const PAKSHAS = [
  "Shukla",
  "Krishna",
] as const;


export type PakshaName =
  (typeof PAKSHAS)[number];


export interface PakshaInfo {

  index: number;

  name: PakshaName;

  degree: number;
}


/**
 * Returns Paksha Index
 *
 * 0 - Shukla Paksha
 * 1 - Krishna Paksha
 */
export function getPakshaIndex(
  date: Date
): number {

  const difference =
    getSunMoonDifference(date);


  return difference < 180
    ? 0
    : 1;
}


/**
 * Returns Paksha Name
 */
export function getPakshaName(
  index: number
): PakshaName {

  return (
    PAKSHAS[index] ??
    "Shukla"
  );
}


/**
 * Main Paksha Engine
 */
export function getPaksha(
  date: Date
): PakshaInfo {

  const degree =
    getSunMoonDifference(date);


  const index =
    getPakshaIndex(date);


  return {

    index,

    name:
      getPakshaName(index),

    degree,

  };
}


/**
 * Helpers
 */
export function isShuklaPaksha(
  date: Date
): boolean {

  return (
    getPakshaIndex(date) === 0
  );
}


export function isKrishnaPaksha(
  date: Date
): boolean {

  return (
    getPakshaIndex(date) === 1
  );
}
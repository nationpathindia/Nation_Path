import { normalizeDegrees } from "./astronomy";
import { getMoonLongitude } from "./moon";
import { getSunLongitude } from "./sun";


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


export type RashiName =
  (typeof RASHIS)[number];


export interface RashiInfo {

  index: number;

  name: RashiName;

  longitude: number;
}


/**
 * Longitude → Rashi Index
 *
 * 0-29.999  = Mesha
 * 30-59.999 = Vrishabha
 */
export function getRashiIndex(
  longitude: number
): number {

  const normalized =
    normalizeDegrees(
      longitude
    );

  return Math.floor(
    normalized /
      RASHI_SIZE
  );
}


/**
 * Index → Rashi Name
 */
export function getRashiName(
  index: number
): RashiName {

  return (
    RASHIS[index] ??
    "Mesha"
  );
}


/**
 * Moon Sign
 */
export function getMoonRashi(
  date: Date
): RashiInfo {

  const longitude =
    normalizeDegrees(
      getMoonLongitude(date)
    );


  const index =
    getRashiIndex(
      longitude
    );


  return {

    index,

    name:
      getRashiName(index),

    longitude,

  };
}


/**
 * Sun Sign
 */
export function getSunRashi(
  date: Date
): RashiInfo {

  const longitude =
    normalizeDegrees(
      getSunLongitude(date)
    );


  const index =
    getRashiIndex(
      longitude
    );


  return {

    index,

    name:
      getRashiName(index),

    longitude,

  };
}


/**
 * Check helper
 */
export function isRashi(
  date: Date,
  index: number,
  planet:
    "Sun" | "Moon"
): boolean {

  const rashi =
    planet === "Sun"
      ? getSunRashi(date)
      : getMoonRashi(date);


  return (
    rashi.index === index
  );
}
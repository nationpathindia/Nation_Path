import { normalizeDegrees } from "../astronomy";
import { getMoonLongitude } from "../moon";

import {
  NAKSHATRAS,
  NAKSHATRA_SIZE,
  TOTAL_NAKSHATRAS,
} from "./constants";

import { findLongitudeTransition } from "./transition";

const SEARCH_WINDOW_MS =
  3 * 24 * 60 * 60 * 1000;

export interface NakshatraTiming {
  index: number;

  name: string;

  start: Date;

  end: Date;

  startLongitude: number;

  endLongitude: number;
}

export interface NakshatraTransition {
  date: Date;

  from: string;

  to: string;

  index: number;
}

/**
 * Moon longitude -> Nakshatra Index
 */
export function getNakshatraIndex(
  longitude: number
): number {
  const value = normalizeDegrees(longitude);

  return Math.min(
    Math.floor(value / NAKSHATRA_SIZE),
    TOTAL_NAKSHATRAS - 1
  );
}

/**
 * Nakshatra Name
 */
export function getNakshatraName(
  index: number
): string {
  return (
    NAKSHATRAS[index] ??
    "Unknown"
  );
}

/**
 * Current Nakshatra
 */
export function getNakshatraTiming(
  date: Date
): NakshatraTiming {

  const longitude =
    normalizeDegrees(
      getMoonLongitude(date)
    );

  const index =
    getNakshatraIndex(
      longitude
    );

  const start =
    findPreviousNakshatraTransition(
      date
    ).date;

  const end =
    findNextNakshatraTransition(
      date
    ).date;

  return {
    index,

    name:
      getNakshatraName(index),

    start,

    end,

    startLongitude:
      index *
      NAKSHATRA_SIZE,

    endLongitude:
      (index + 1) *
      NAKSHATRA_SIZE,
  };
}

/**
 * Previous Boundary
 */
export function findPreviousNakshatraTransition(
  date: Date
): NakshatraTransition {

  const longitude =
    normalizeDegrees(
      getMoonLongitude(date)
    );

  const current =
    getNakshatraIndex(
      longitude
    );

  const previous =
    (
      current -
      1 +
      TOTAL_NAKSHATRAS
    ) %
    TOTAL_NAKSHATRAS;

  const boundary =
    current *
    NAKSHATRA_SIZE;

  const result =
    findLongitudeTransition({

      start: new Date(
        date.getTime() -
          SEARCH_WINDOW_MS
      ),

      end: date,

      targetLongitude:
        boundary,

      longitude:
        getMoonLongitude,
    });

  return {

    date:
      result.date,

    from:
      getNakshatraName(
        previous
      ),

    to:
      getNakshatraName(
        current
      ),

    index:
      previous,
  };
}

/**
 * Next Boundary
 */
export function findNextNakshatraTransition(
  date: Date
): NakshatraTransition {

  const longitude =
    normalizeDegrees(
      getMoonLongitude(date)
    );

  const current =
    getNakshatraIndex(
      longitude
    );

  const next =
    (
      current + 1
    ) %
    TOTAL_NAKSHATRAS;

  const boundary =
    next *
    NAKSHATRA_SIZE;

  const result =
    findLongitudeTransition({

      start: date,

      end: new Date(
        date.getTime() +
          SEARCH_WINDOW_MS
      ),

      targetLongitude:
        boundary,

      longitude:
        getMoonLongitude,
    });

  return {

    date:
      result.date,

    from:
      getNakshatraName(
        current
      ),

    to:
      getNakshatraName(
        next
      ),

    index:
      next,
  };
}

/**
 * Helpers
 */
export function findNakshatraStart(
  date: Date
): Date {

  return findPreviousNakshatraTransition(
    date
  ).date;
}

export function findNakshatraEnd(
  date: Date
): Date {

  return findNextNakshatraTransition(
    date
  ).date;
}
import { findLongitudeTransition } from "./transition";
import { getSunMoonDifference } from "./helpers";

import {
  TITHIS,
  TITHI_SIZE,
  TOTAL_TITHIS,
} from "./constants";

export interface TithiTiming {
  index: number;

  name: string;

  start: Date;

  end: Date;

  startDegree: number;

  endDegree: number;
}

const SEARCH_WINDOW_MS =
  48 * 60 * 60 * 1000;


export function getTithiIndexFromDegree(
  degree: number
): number {
  return Math.min(
    Math.floor(degree / TITHI_SIZE),
    TOTAL_TITHIS - 1
  );
}


export function getTithiTiming(
  date: Date
): TithiTiming {

  const degree =
    getSunMoonDifference(date);

  const index =
    getTithiIndexFromDegree(
      degree
    );


  const startDegree =
    index * TITHI_SIZE;

  const endDegree =
    (index + 1) * TITHI_SIZE;


  return {
    index,

    name:
      TITHIS[index],

    start:
      findPreviousTithiTransition(
        date,
        startDegree
      ),

    end:
      findNextTithiTransition(
        date,
        endDegree
      ),

    startDegree,

    endDegree,
  };
}


export function findPreviousTithiTransition(
  date: Date,
  targetDegree: number
): Date {

  return findLongitudeTransition({

    start: new Date(
      date.getTime() -
        SEARCH_WINDOW_MS
    ),

    end: date,

    targetLongitude:
      targetDegree,

    longitude:
      getSunMoonDifference,

  }).date;
}


export function findNextTithiTransition(
  date: Date,
  targetDegree: number
): Date {

  return findLongitudeTransition({

    start: date,

    end: new Date(
      date.getTime() +
        SEARCH_WINDOW_MS
    ),

    targetLongitude:
      targetDegree,

    longitude:
      getSunMoonDifference,

  }).date;
}


export function findTithiStart(
  date: Date
): Date {

  return getTithiTiming(date)
    .start;
}


export function findTithiEnd(
  date: Date
): Date {

  return getTithiTiming(date)
    .end;
}
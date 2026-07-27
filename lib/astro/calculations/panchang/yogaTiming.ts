import { findLongitudeTransition } from "./transition";
import { getSunMoonSum } from "./yoga";

import {
  YOGAS,
  YOGA_SIZE,
  TOTAL_YOGAS,
} from "./constants";

export interface YogaTiming {
  index: number;

  name: string;

  start: Date;

  end: Date;

  startDegree: number;

  endDegree: number;
}

const SEARCH_WINDOW_MS =
  72 * 60 * 60 * 1000;


export function getYogaIndexFromDegree(
  degree: number
): number {
  return Math.min(
    Math.floor(degree / YOGA_SIZE),
    TOTAL_YOGAS - 1
  );
}


export function getYogaTiming(
  date: Date
): YogaTiming {

  const degree =
    getSunMoonSum(date);

  const index =
    getYogaIndexFromDegree(
      degree
    );


  const startDegree =
    index * YOGA_SIZE;

  const endDegree =
    (index + 1) * YOGA_SIZE;


  return {

    index,

    name:
      YOGAS[index],

    start:
      findPreviousYogaTransition(
        date,
        startDegree
      ),

    end:
      findNextYogaTransition(
        date,
        endDegree
      ),

    startDegree,

    endDegree,
  };
}


export function findPreviousYogaTransition(
  date: Date,
  targetDegree: number
): Date {

  return findLongitudeTransition({

    start:
      new Date(
        date.getTime() -
          SEARCH_WINDOW_MS
      ),

    end:
      date,

    targetLongitude:
      targetDegree,

    longitude:
      getSunMoonSum,

  }).date;
}


export function findNextYogaTransition(
  date: Date,
  targetDegree: number
): Date {

  return findLongitudeTransition({

    start:
      date,

    end:
      new Date(
        date.getTime() +
          SEARCH_WINDOW_MS
      ),

    targetLongitude:
      targetDegree,

    longitude:
      getSunMoonSum,

  }).date;
}


export function findYogaStart(
  date: Date
): Date {

  return getYogaTiming(date)
    .start;
}


export function findYogaEnd(
  date: Date
): Date {

  return getYogaTiming(date)
    .end;
}
import { findLongitudeTransition } from "./transition";
import { getSunMoonDifference } from "./helpers";

import {
  KARANAS,
  KARANA_SIZE,
} from "./constants";


export interface KaranaTiming {

  index: number;

  name: string;

  slot: number;

  start: Date;

  end: Date;

  startDegree: number;

  endDegree: number;
}


const SEARCH_WINDOW_MS =
  48 * 60 * 60 * 1000;


/**
 * Returns current Karana slot
 *
 * Total:
 * 360 / 6 = 60 slots
 */
export function getKaranaSlotFromDegree(
  degree: number
): number {

  return Math.floor(
    degree / KARANA_SIZE
  );
}


/**
 * Classical Karana sequence
 *
 * Slot 0:
 * Kimstughna
 *
 * Slots 1-56:
 * Bava → Balava → Kaulava
 * → Taitila → Garaja
 * → Vanija → Vishti
 *
 * Slots 57-59:
 * Shakuni
 * Chatushpada
 * Naga
 */
export function getKaranaIndexFromSlot(
  slot: number
): number {

  if (slot === 0) {
    return 10; // Kimstughna
  }


  if (slot >= 57) {

    return (
      slot - 55
    );
  }


  return (
    (slot - 1) % 7
  );
}


/**
 * Main Karana Timing
 */
export function getKaranaTiming(
  date: Date
): KaranaTiming {


  const degree =
    getSunMoonDifference(date);


  const slot =
    getKaranaSlotFromDegree(
      degree
    );


  const index =
    getKaranaIndexFromSlot(
      slot
    );


  const startDegree =
    slot *
    KARANA_SIZE;


  const endDegree =
    (slot + 1) *
    KARANA_SIZE;


  return {

    index,

    slot,

    name:
      KARANAS[index],


    start:
      findPreviousKaranaTransition(
        date,
        startDegree
      ),


    end:
      findNextKaranaTransition(
        date,
        endDegree
      ),


    startDegree,

    endDegree,

  };
}


/**
 * Previous Karana Boundary
 */
export function findPreviousKaranaTransition(
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
      getSunMoonDifference,

  }).date;
}


/**
 * Next Karana Boundary
 */
export function findNextKaranaTransition(
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
      getSunMoonDifference,

  }).date;
}


/**
 * Helpers
 */
export function findKaranaStart(
  date: Date
): Date {

  return getKaranaTiming(date)
    .start;
}


export function findKaranaEnd(
  date: Date
): Date {

  return getKaranaTiming(date)
    .end;
}
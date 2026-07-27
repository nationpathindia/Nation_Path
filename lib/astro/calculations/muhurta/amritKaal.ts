import type { DurationResult } from "../duration";

import {
  calculateDuration,
} from "../duration";

import { normalizeDegrees } from "../astronomy";
import { getMoonLongitude } from "../moon";

import * as MuhurtaConstants from "./constants";

import {
  findNextNakshatraTransition,
  findPreviousNakshatraTransition,
  getNakshatraIndex,
} from "../panchang/nakshatraTiming";



export interface AmritKaalPeriod {

  name: "Amrit Kaal";

  category: "amrit";

  nature: "auspicious";


  start: Date;

  end: Date;


  duration: DurationResult;


  triggerLongitude: number;


  fromNakshatra: string;

  toNakshatra: string;


  reason:
    | "CLASSICAL_AMRIT_KAAL";

}



/**
 * Ghati -> milliseconds
 */
function ghatiToMilliseconds(
  ghati: number
): number {

  return (
    ghati *
    MuhurtaConstants.MINUTES_PER_GHATI *
    60 *
    1000
  );

}



/**
 * Vighati -> milliseconds
 *
 * 60 Vighati = 1 Ghati
 */
function vighatiToMilliseconds(
  vighati: number
): number {

  return (
    (vighati / 60) *
    MuhurtaConstants.MINUTES_PER_GHATI *
    60 *
    1000
  );

}



/**
 * Get departing Nakshatra index
 */
function getDepartingNakshatraIndex(
  transitionDate: Date
): number {


  const before =
    new Date(
      transitionDate.getTime() - 1000
    );



  const longitude =
    normalizeDegrees(
      getMoonLongitude(
        before
      )
    );



  return getNakshatraIndex(
    longitude
  );

}



/**
 * Get Amrit offset
 */
function getAmritOffset(
  index: number
): number {

  const table =
    MuhurtaConstants.AMRIT_KAAL_OFFSET_VIGHATI;



  const safeIndex =
    Math.min(
      Math.max(
        index,
        0
      ),
      table.length - 1
    );



  return (
    table[safeIndex] ?? 0
  );

}



/**
 * Build Amrit Kaal
 *
 * Transition
 * +
 * Offset
 * +
 * Duration
 */
function buildAmritKaalFromTransition(
  transitionDate: Date,
  from: string,
  to: string
): AmritKaalPeriod {


  const nakshatraIndex =
    getDepartingNakshatraIndex(
      transitionDate
    );



  const offset =
    getAmritOffset(
      nakshatraIndex
    );



  const start =
    new Date(
      transitionDate.getTime() +
      vighatiToMilliseconds(
        offset
      )
    );



  const end =
    new Date(
      start.getTime() +
      ghatiToMilliseconds(
        MuhurtaConstants.AMRIT_KAAL_DURATION_GHATI
      )
    );



  return {

    name: "Amrit Kaal",

    category: "amrit",

    nature: "auspicious",


    start,

    end,


    duration:
      calculateDuration(
        start,
        end
      ),


    triggerLongitude:
      normalizeDegrees(
        getMoonLongitude(
          start
        )
      ),


    fromNakshatra:
      from,


    toNakshatra:
      to,


    reason:
      "CLASSICAL_AMRIT_KAAL",

  };

}



/**
 * Get Amrit Kaal around date
 */
export function getAmritKaal(
  date: Date
): AmritKaalPeriod[] {


  const previous =
    findPreviousNakshatraTransition(
      date
    );


  const next =
    findNextNakshatraTransition(
      date
    );



  return [

    buildAmritKaalFromTransition(
      previous.date,
      previous.from,
      previous.to
    ),


    buildAmritKaalFromTransition(
      next.date,
      next.from,
      next.to
    ),

  ].sort(
    (a, b) =>
      a.start.getTime()
      -
      b.start.getTime()
  );

}



/**
 * Check active Amrit Kaal
 */
export function isAmritKaal(
  date: Date
): boolean {

  return getAmritKaal(date)
    .some(
      period =>
        date >= period.start &&
        date <= period.end
    );

}



/**
 * Generate windows
 */
export function getAmritKaalWindows(
  startDate: Date,
  endDate: Date
): AmritKaalPeriod[] {


  const windows:
    AmritKaalPeriod[] = [];


  const visited =
    new Set<number>();



  let cursor =
    new Date(
      startDate
    );



  const STEP =
    6 *
    60 *
    60 *
    1000;



  while(
    cursor <= endDate
  ) {


    const transition =
      findNextNakshatraTransition(
        cursor
      );



    const key =
      transition.date.getTime();



    if(
      !visited.has(key)
    ) {


      const window =
        buildAmritKaalFromTransition(
          transition.date,
          transition.from,
          transition.to
        );



      if(
        window.end >= startDate &&
        window.start <= endDate
      ) {

        windows.push(
          window
        );

      }



      visited.add(
        key
      );

    }



    cursor =
      new Date(
        cursor.getTime() +
        STEP
      );

  }



  return windows.sort(
    (a, b) =>
      a.start.getTime()
      -
      b.start.getTime()
  );

}
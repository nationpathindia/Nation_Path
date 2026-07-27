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



export interface VarjyamPeriod {

  name: "Varjyam";

  category: "varjyam";

  nature: "inauspicious";


  start: Date;

  end: Date;


  duration: DurationResult;


  triggerLongitude: number;


  fromNakshatra: string;

  toNakshatra: string;


  reason:
    | "CLASSICAL_TYAJYA_PERIOD";

}



/**
 * Ghati -> milliseconds
 *
 * 1 Ghati = 24 minutes
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
 * Resolve classical Varjyam offset
 *
 * Table index belongs to
 * departing Nakshatra.
 */
function getVarjyamOffset(
  nakshatraIndex: number
): number {


  const table =
    MuhurtaConstants.VARJYAM_OFFSET_VIGHATI;



  const safeIndex =
    Math.min(
      Math.max(
        nakshatraIndex,
        0
      ),
      table.length - 1
    );



  return (
    table[safeIndex] ?? 0
  );

}



/**
 * Get departing Nakshatra
 *
 * Classical offset applies
 * to the Nakshatra ending.
 */
function getDepartingNakshatraIndex(
  transitionDate: Date
): number {


  const beforeTransition =
    new Date(
      transitionDate.getTime() - 1000
    );



  const longitude =
    normalizeDegrees(
      getMoonLongitude(
        beforeTransition
      )
    );



  return getNakshatraIndex(
    longitude
  );

}



/**
 * Exact transition longitude
 */
function getTransitionLongitude(
  transitionDate: Date
): number {

  return normalizeDegrees(
    getMoonLongitude(
      transitionDate
    )
  );

}



/**
 * Build Varjyam from Nakshatra transition
 *
 * Formula:
 *
 * Transition
 * +
 * Classical Vighati Offset
 * +
 * 2.25 Ghati duration
 */
function buildVarjyamFromTransition(
  transitionDate: Date,
  from: string,
  to: string
): VarjyamPeriod {


  const nakshatraIndex =
    getDepartingNakshatraIndex(
      transitionDate
    );



  const offset =
    getVarjyamOffset(
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
        MuhurtaConstants.VARJYAM_DURATION_GHATI
      )
    );



  return {

    name: "Varjyam",

    category: "varjyam",

    nature: "inauspicious",


    start,

    end,


    duration:
      calculateDuration(
        start,
        end
      ),


    triggerLongitude:
      getTransitionLongitude(
        transitionDate
      ),


    fromNakshatra:
      from,


    toNakshatra:
      to,


    reason:
      "CLASSICAL_TYAJYA_PERIOD",

  };

}



/**
 * Get Varjyam around date
 */
export function getVarjyam(
  date: Date
): VarjyamPeriod[] {


  const previous =
    findPreviousNakshatraTransition(
      date
    );


  const next =
    findNextNakshatraTransition(
      date
    );



  return [

    buildVarjyamFromTransition(
      previous.date,
      previous.from,
      previous.to
    ),


    buildVarjyamFromTransition(
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
 * Check active Varjyam
 */
export function isVarjyam(
  date: Date
): boolean {

  return getVarjyam(date)
    .some(
      period =>
        date >= period.start &&
        date <= period.end
    );

}



/**
 * Generate all Varjyam windows
 * between dates
 */
export function getVarjyamWindows(
  startDate: Date,
  endDate: Date
): VarjyamPeriod[] {


  const windows:
    VarjyamPeriod[] = [];



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
        buildVarjyamFromTransition(
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
import { calculateSunrise } from "../sunrise";
import { calculateSunset } from "../sunset";
import { divideTimeRange } from "../timeDivision";

import type { RiseSetRequest } from "../riseSet";
import type {
  MuhurtaPeriod,
  MuhurtaCategory,
  MuhurtaNature,
} from "./types";

import { DAY_PARTS } from "./constants";


/**
 * Weekday Mapping
 *
 * JavaScript:
 * 0 = Sunday
 * 1 = Monday
 * 2 = Tuesday
 * 3 = Wednesday
 * 4 = Thursday
 * 5 = Friday
 * 6 = Saturday
 *
 * Mapping values are 1-based:
 *
 * 1 = first day part
 * 8 = eighth day part
 */
export type MuhurtaWeekdayMap =
  Record<number, number>;



export interface MuhurtaMetadata {

  name: string;

  category: MuhurtaCategory;

  nature: MuhurtaNature;

}



export function calculateDayMuhurta(
  request: RiseSetRequest,
  mapping: MuhurtaWeekdayMap,
  metadata: MuhurtaMetadata
): MuhurtaPeriod {

  const sunrise =
    calculateSunrise(request);


  const sunset =
    calculateSunset(request);



  const parts =
    divideTimeRange(
      sunrise.date,
      sunset.date,
      DAY_PARTS
    );



  const weekday =
    request.date.getUTCDay();



  const partIndex =
    mapping[weekday];



  if (partIndex === undefined) {

    throw new Error(
      `No ${metadata.name} mapping found for weekday ${weekday}.`
    );

  }



  const selected =
    parts[partIndex - 1];



  if (!selected) {

    throw new Error(
      `Invalid ${metadata.name} part index ${partIndex}. Expected value between 1 and ${DAY_PARTS}.`
    );

  }



  return {

    name: metadata.name,

    category: metadata.category,

    nature: metadata.nature,

    index: selected.index,

    start: selected.start,

    end: selected.end,

    duration: selected.duration,

  };

}
import { calculateSunrise } from "../sunrise";
import { calculateSunset } from "../sunset";

import type { RiseSetRequest } from "../riseSet";
import type { MuhurtaPeriod } from "./types";

import { divideTimeRange } from "../timeDivision";


/**
 * Calculate Abhijit Muhurat
 *
 * Traditional Rule:
 *
 * Day duration is divided into 15 equal parts.
 * The 8th part is considered Abhijit Muhurat.
 *
 * Sunrise → Sunset
 *       ↓
 * 15 equal divisions
 *       ↓
 * Part 8 = Abhijit
 */
export function calculateAbhijitMuhurat(
  request: RiseSetRequest
): MuhurtaPeriod {

  const sunrise =
    calculateSunrise(request);


  const sunset =
    calculateSunset(request);



  if (
    sunset.date.getTime() <=
    sunrise.date.getTime()
  ) {
    throw new Error(
      "Invalid sunrise and sunset calculation."
    );
  }



  const divisions =
    divideTimeRange(
      sunrise.date,
      sunset.date,
      15
    );



  const abhijit =
    divisions[7];



  if (!abhijit) {
    throw new Error(
      "Unable to calculate Abhijit Muhurat."
    );
  }



  return {

    name: "Abhijit Muhurat",

    category: "abhijit",

    nature: "auspicious",

    index: abhijit.index,

    start: abhijit.start,

    end: abhijit.end,

    duration: abhijit.duration,

  };

}
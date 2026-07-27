import { calculateSunrise } from "../sunrise";
import { calculateDuration } from "../duration";

import type { RiseSetRequest } from "../riseSet";
import type { MuhurtaPeriod } from "./types";

import {
  subtractMilliseconds,
} from "../../utils/date";


const MINUTE =
  60 * 1000;


/**
 * Brahma Muhurat:
 *
 * Sunrise se pehle ka
 * 96 minute ka auspicious period.
 *
 * Traditional:
 *
 * Sunrise - 96 min
 *       |
 *       |
 * Sunrise - 48 min
 */
const BRAHMA_START_OFFSET =
  96 * MINUTE;


const BRAHMA_END_OFFSET =
  48 * MINUTE;



export function calculateBrahmaMuhurat(
  request: RiseSetRequest
): MuhurtaPeriod {


  const sunrise =
    calculateSunrise(request);



  const start =
    subtractMilliseconds(
      sunrise.date,
      BRAHMA_START_OFFSET
    );


  const end =
    subtractMilliseconds(
      sunrise.date,
      BRAHMA_END_OFFSET
    );



  if (
    end.getTime() <= start.getTime()
  ) {
    throw new Error(
      "Invalid Brahma Muhurat calculation."
    );
  }



  return {

    name: "Brahma Muhurat",

    category: "brahma",

    nature: "auspicious",

    index: 0,

    start,

    end,

    duration:
      calculateDuration(
        start,
        end
      ),

  };

}
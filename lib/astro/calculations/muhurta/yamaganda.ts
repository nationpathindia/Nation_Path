import type { RiseSetRequest } from "../riseSet";
import type { MuhurtaPeriod } from "./types";

import { calculateDayMuhurta } from "./engine";

import { YAMAGANDA_PART } from "./constants";


export function calculateYamaganda(
  request: RiseSetRequest
): MuhurtaPeriod {

  return calculateDayMuhurta(
    request,

    YAMAGANDA_PART,

    {
      name: "Yamaganda Kaal",

      category: "yamaganda",

      nature: "inauspicious",
    }
  );

}
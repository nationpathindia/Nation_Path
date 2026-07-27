import type { RiseSetRequest } from "../riseSet";
import type { MuhurtaPeriod } from "./types";

import { calculateDayMuhurta } from "./engine";

import { GULIKA_KAAL_PART } from "./constants";


export function calculateGulikaKaal(
  request: RiseSetRequest
): MuhurtaPeriod {

  return calculateDayMuhurta(
    request,

    GULIKA_KAAL_PART,

    {
      name: "Gulika Kaal",

      category: "gulika",

      nature: "inauspicious",
    }
  );

}
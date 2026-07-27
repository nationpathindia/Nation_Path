import type { RiseSetRequest } from "../riseSet";
import type { MuhurtaPeriod } from "./types";

import { calculateDayMuhurta } from "./engine";

import { RAHU_KAAL_PART } from "./constants";

export function calculateRahuKaal(
  request: RiseSetRequest
): MuhurtaPeriod {
  return calculateDayMuhurta(
    request,
    RAHU_KAAL_PART,
    {
      name: "Rahu Kaal",
      category: "rahu",
      nature: "inauspicious",
    }
  );
}
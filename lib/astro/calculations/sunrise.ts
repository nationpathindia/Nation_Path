import { Planet, RiseTransitFlag } from "../client";

import {
  calculateRiseSet,
  RiseSetRequest,
  RiseSetResult,
} from "./riseSet";

export type SunriseRequest = RiseSetRequest;
export type SunriseResult = RiseSetResult;

/**
 * Calculates Sunrise.
 */
export function calculateSunrise(
  request: SunriseRequest
): SunriseResult {
  return calculateRiseSet(
    Planet.Sun,
    RiseTransitFlag.Rise,
    request
  );
}
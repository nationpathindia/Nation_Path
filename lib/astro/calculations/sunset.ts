import { Planet, RiseTransitFlag } from "../client";

import {
  calculateRiseSet,
  RiseSetRequest,
  RiseSetResult,
} from "./riseSet";

export type SunsetRequest = RiseSetRequest;
export type SunsetResult = RiseSetResult;

/**
 * Calculates Sunset.
 */
export function calculateSunset(
  request: SunsetRequest
): SunsetResult {
  return calculateRiseSet(
    Planet.Sun,
    RiseTransitFlag.Set,
    request
  );
}
import { Planet, RiseTransitFlag } from "../client";

import {
  calculateRiseSet,
  RiseSetRequest,
  RiseSetResult,
} from "./riseSet";

export type MoonsetRequest = RiseSetRequest;
export type MoonsetResult = RiseSetResult;

/**
 * Calculates Moonset.
 */
export function calculateMoonset(
  request: MoonsetRequest
): MoonsetResult {
  return calculateRiseSet(
    Planet.Moon,
    RiseTransitFlag.Set,
    request
  );
}
import { Planet, RiseTransitFlag } from "../client";

import {
  calculateRiseSet,
  RiseSetRequest,
  RiseSetResult,
} from "./riseSet";

export type MoonriseRequest = RiseSetRequest;
export type MoonriseResult = RiseSetResult;

/**
 * Calculates Moonrise.
 */
export function calculateMoonrise(
  request: MoonriseRequest
): MoonriseResult {
  return calculateRiseSet(
    Planet.Moon,
    RiseTransitFlag.Rise,
    request
  );
}
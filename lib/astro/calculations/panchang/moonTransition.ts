import { getMoonLongitude } from "../moon";
import { normalizeDegrees } from "../astronomy";

import {
  findLongitudeTransition,
  TransitionResult,
} from "./transition";

const SEARCH_STEP_HOURS = 6;
const STEP_MS = SEARCH_STEP_HOURS * 60 * 60 * 1000;

export function findNextMoonLongitudeTransition(
  date: Date,
  targetLongitude: number
): TransitionResult {
  const start = new Date(date);
  let end = new Date(date);

  targetLongitude = normalizeDegrees(targetLongitude);

  while (true) {
    end = new Date(end.getTime() + STEP_MS);

    const startDiff = normalizeDegrees(
      targetLongitude - getMoonLongitude(start)
    );

    const endDiff = normalizeDegrees(
      targetLongitude - getMoonLongitude(end)
    );

    if (endDiff <= startDiff) {
      break;
    }

    // Safety guard (~30 days)
    if (end.getTime() - start.getTime() > 30 * 24 * STEP_MS) {
      throw new Error(
        "Unable to locate next Moon longitude transition."
      );
    }
  }

  return findLongitudeTransition({
    start,
    end,
    targetLongitude,
    longitude: getMoonLongitude,
  });
}

export function findPreviousMoonLongitudeTransition(
  date: Date,
  targetLongitude: number
): TransitionResult {
  let start = new Date(date);
  const end = new Date(date);

  targetLongitude = normalizeDegrees(targetLongitude);

  while (true) {
    start = new Date(start.getTime() - STEP_MS);

    const startDiff = normalizeDegrees(
      getMoonLongitude(start) - targetLongitude
    );

    const endDiff = normalizeDegrees(
      getMoonLongitude(end) - targetLongitude
    );

    if (startDiff >= endDiff) {
      break;
    }

    // Safety guard (~30 days)
    if (end.getTime() - start.getTime() > 30 * 24 * STEP_MS) {
      throw new Error(
        "Unable to locate previous Moon longitude transition."
      );
    }
  }

  return findLongitudeTransition({
    start,
    end,
    targetLongitude,
    longitude: getMoonLongitude,
  });
}
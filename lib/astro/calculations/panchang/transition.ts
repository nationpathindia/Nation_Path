import { normalizeDegrees } from "../astronomy";
import { binarySearchEvent } from "../core/ephemerisSearch";

export interface TransitionResult {
  date: Date;
  longitude: number;
}

export interface LongitudeTransitionOptions {
  start: Date;
  end: Date;

  targetLongitude?: number;
  target?: number;

  toleranceMs?: number;

  longitude: (date: Date) => number;
}

function angularDistance(
  longitude: number,
  target: number
): number {
  return normalizeDegrees(longitude - target);
}

/**
 * Generic Longitude Transition Engine
 *
 * Supports:
 * 1. New Object API
 * 2. Legacy Object API (target)
 */
export function findLongitudeTransition(
  options: LongitudeTransitionOptions
): TransitionResult {

  const targetLongitude =
    options.targetLongitude ??
    options.target;

  if (targetLongitude === undefined) {
    throw new Error(
      "findLongitudeTransition(): targetLongitude is required."
    );
  }

  const target =
    normalizeDegrees(targetLongitude);

  const result =
    binarySearchEvent({
      start: options.start,
      end: options.end,

      toleranceMs:
        options.toleranceMs,

      evaluator(date) {
        return normalizeDegrees(
          options.longitude(date)
        );
      },

      condition(previous, current) {

        const prevDistance =
          angularDistance(
            previous,
            target
          );

        const currentDistance =
          angularDistance(
            current,
            target
          );

        return (
          currentDistance <
          prevDistance
        );
      },
    });

  return {
    date: result.date,

    longitude:
      normalizeDegrees(
        result.value
      ),
  };
}
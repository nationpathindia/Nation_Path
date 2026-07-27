import { normalizeDegrees } from "../astronomy";
import { getSunLongitude } from "../sun";
import { getMoonLongitude } from "../moon";

/**
 * Returns Moon - Sun angular separation
 * Range: 0° - 360°
 */
export function getSunMoonDifference(
  date: Date
): number {
  const sun = normalizeDegrees(
    getSunLongitude(date)
  );

  const moon = normalizeDegrees(
    getMoonLongitude(date)
  );

  return normalizeDegrees(
    moon - sun
  );
}
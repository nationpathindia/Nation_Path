import { calculateSunrise } from "./sunrise";
import { calculateSunset } from "./sunset";
import { calculateDuration, DurationResult } from "./duration";

import type { RiseSetRequest } from "./riseSet";

export function calculateDayDuration(
  request: RiseSetRequest
): DurationResult {
  const sunrise = calculateSunrise(request);

  const sunset = calculateSunset(request);

  return calculateDuration(
    sunrise.date,
    sunset.date
  );
}
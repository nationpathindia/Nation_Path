import { calculateSunrise } from "./sunrise";
import { calculateSunset } from "./sunset";
import { calculateDuration, DurationResult } from "./duration";

import type { RiseSetRequest } from "./riseSet";

export function calculateNightDuration(
  request: RiseSetRequest
): DurationResult {
  const sunset = calculateSunset(request);

  const nextDay = new Date(request.date);

  nextDay.setUTCDate(nextDay.getUTCDate() + 1);

  const nextSunrise = calculateSunrise({
    ...request,
    date: nextDay,
  });

  return calculateDuration(
    sunset.date,
    nextSunrise.date
  );
}
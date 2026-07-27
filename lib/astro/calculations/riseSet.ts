import {
  initializeSwissEphemeris,
  calculateRiseTransitSet,
  dateToJulianDay,
  julianDayToDate,
  Planet,
  RiseTransitFlag,
} from "../client";

import { swissDateTimeToDate } from "../utils/datetime";

export interface RiseSetRequest {
  date: Date;
  latitude: number;
  longitude: number;
  altitude?: number;
}

export interface RiseSetResult {
  julianDay: number;
  date: Date;
  unix: number;
}

export function calculateRiseSet(
  body: Planet,
  eventType: RiseTransitFlag,
  request: RiseSetRequest
): RiseSetResult {
  initializeSwissEphemeris();

  const startJulianDay = dateToJulianDay(request.date);

  const result = calculateRiseTransitSet(
    startJulianDay,
    body,
    eventType,
    request.longitude,
    request.latitude,
    request.altitude ?? 0
  );

  const swissDate = julianDayToDate(result.time);

  const eventDate = swissDateTimeToDate(swissDate);

  return {
    julianDay: result.time,
    date: eventDate,
    unix: eventDate.getTime(),
  };
}
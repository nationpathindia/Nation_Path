/**
 * Swiss Ephemeris DateTime -> JavaScript Date utilities.
 *
 * Centralized conversion layer used throughout the Astro Engine.
 */

export interface SwissDateTimeLike {
  year: number;
  month: number;
  day: number;
  hour: number;
}

export function swissDateTimeToDate(
  value: SwissDateTimeLike
): Date {
  const hours = Math.floor(value.hour);

  const minuteFloat = (value.hour - hours) * 60;
  const minutes = Math.floor(minuteFloat);

  const secondFloat = (minuteFloat - minutes) * 60;
  const seconds = Math.floor(secondFloat);

  const milliseconds = Math.round(
    (secondFloat - seconds) * 1000
  );

  return new Date(
    Date.UTC(
      value.year,
      value.month - 1,
      value.day,
      hours,
      minutes,
      seconds,
      milliseconds
    )
  );
}

export function swissDateTimeToISOString(
  value: SwissDateTimeLike
): string {
  return swissDateTimeToDate(value).toISOString();
}
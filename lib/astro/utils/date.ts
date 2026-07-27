/**
 * Reusable UTC date arithmetic utilities.
 * Used throughout the NationPathIndia Astro Engine.
 */

export function addMilliseconds(
  date: Date,
  milliseconds: number
): Date {
  return new Date(date.getTime() + milliseconds);
}

export function subtractMilliseconds(
  date: Date,
  milliseconds: number
): Date {
  return new Date(date.getTime() - milliseconds);
}

export function differenceMilliseconds(
  start: Date,
  end: Date
): number {
  return end.getTime() - start.getTime();
}

export function midpoint(
  start: Date,
  end: Date
): Date {
  return new Date(
    start.getTime() +
      (end.getTime() - start.getTime()) / 2
  );
}

export function cloneDate(
  date: Date
): Date {
  return new Date(date.getTime());
}
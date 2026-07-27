// lib/astro/client.ts

import {
  setEphemerisPath,
  setSiderealMode,

  calculatePosition,
  calculateRiseTransitSet,
  calculateHouses,

  dateToJulianDay,
  julianDay,
  julianDayToDate,

  getAyanamsa,
  setTopocentric,
  close,

  Planet,
  HouseSystem,
  SiderealMode,
  RiseTransitFlag,
  CalculationFlag,
  CalendarType,
} from "@swisseph/node";

let initialized = false;

/**
 * Initializes Swiss Ephemeris.
 *
 * Uses bundled ephemeris files by default.
 * Pass a custom path only if you maintain your own ephemeris dataset.
 */
export function initializeSwissEphemeris(
  ephemerisPath?: string | null
): void {
  if (initialized) return;

  if (ephemerisPath) {
    setEphemerisPath(ephemerisPath);
  }

  // NationPath standard ayanamsa
  setSiderealMode(SiderealMode.Lahiri);

  initialized = true;
}

/**
 * Returns whether Swiss Ephemeris has already been initialized.
 */
export function isSwissInitialized(): boolean {
  return initialized;
}

/**
 * Shutdown Swiss Ephemeris.
 * Mostly useful for scripts/tests.
 */
export function shutdownSwissEphemeris(): void {
  if (!initialized) return;

  close();
  initialized = false;
}

export {
  calculatePosition,
  calculateRiseTransitSet,
  calculateHouses,

  dateToJulianDay,
  julianDay,
  julianDayToDate,

  getAyanamsa,
  setTopocentric,

  Planet,
  HouseSystem,
  SiderealMode,
  RiseTransitFlag,
  CalculationFlag,
  CalendarType,
};
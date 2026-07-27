import { getSunMoonDifference } from "./panchang/helpers";


export const MOON_PHASE_COUNT = 8;


/**
 * Traditional 8 Moon Phases
 */
export const MOON_PHASES = [
  "New Moon",
  "Waxing Crescent",
  "First Quarter",
  "Waxing Gibbous",
  "Full Moon",
  "Waning Gibbous",
  "Last Quarter",
  "Waning Crescent",
] as const;


export type MoonPhaseName =
  (typeof MOON_PHASES)[number];



export interface MoonPhaseInfo {

  index: number;

  name: MoonPhaseName;

  angle: number;

  illumination: number;

}



/**
 * Returns lunar age angle
 *
 * 0°  = New Moon
 * 180° = Full Moon
 */
export function getMoonPhaseAngle(
  date: Date
): number {

  return getSunMoonDifference(date);

}



/**
 * Returns Moon Phase Index
 *
 * Each phase = 45°
 */
export function getMoonPhaseIndex(
  date: Date
): number {

  const angle =
    getMoonPhaseAngle(date);


  return Math.min(
    Math.floor(angle / 45),
    MOON_PHASE_COUNT - 1
  );

}



/**
 * Returns illumination %
 *
 * Formula:
 * (1 - cos(angle)) / 2
 */
export function getMoonIllumination(
  date: Date
): number {

  const angle =
    getMoonPhaseAngle(date);


  const radians =
    angle *
    Math.PI /
    180;


  return (
    (1 -
      Math.cos(radians)) /
    2
  ) * 100;

}



/**
 * Main Moon Phase Engine
 */
export function getMoonPhase(
  date: Date
): MoonPhaseInfo {


  const angle =
    getMoonPhaseAngle(date);


  const index =
    getMoonPhaseIndex(date);



  return {

    index,

    name:
      MOON_PHASES[index],

    angle,

    illumination:
      getMoonIllumination(date),

  };

}



/**
 * Helpers
 */

export function isNewMoon(
  date: Date
): boolean {

  return (
    getMoonPhaseIndex(date) === 0
  );

}



export function isFullMoon(
  date: Date
): boolean {

  return (
    getMoonPhaseIndex(date) === 4
  );

}
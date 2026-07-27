import { getSunMoonDifference } from "../panchang/helpers";

export type MoonPhase =
  | "New Moon"
  | "Waxing Crescent"
  | "First Quarter"
  | "Waxing Gibbous"
  | "Full Moon"
  | "Waning Gibbous"
  | "Last Quarter"
  | "Waning Crescent";

export interface MoonPhaseInfo {
  angle: number;
  phase: MoonPhase;

  waxing: boolean;
  waning: boolean;

  isNewMoon: boolean;
  isFullMoon: boolean;
}

const PHASE_SIZE = 45;
const EPSILON = 0.0001;

export function getMoonPhase(
  date: Date
): MoonPhaseInfo {
  const angle = getSunMoonDifference(date);

  const normalized =
    ((angle % 360) + 360) % 360;

  const isNewMoon =
    normalized <= EPSILON ||
    normalized >= 360 - EPSILON;

  const isFullMoon =
    Math.abs(normalized - 180) <= EPSILON;

  const waxing =
    normalized > EPSILON &&
    normalized < 180;

  const waning =
    normalized > 180 &&
    normalized < 360 - EPSILON;

  let phase: MoonPhase;

  if (normalized < PHASE_SIZE) {
    phase = "New Moon";
  } else if (normalized < PHASE_SIZE * 2) {
    phase = "Waxing Crescent";
  } else if (normalized < PHASE_SIZE * 3) {
    phase = "First Quarter";
  } else if (normalized < PHASE_SIZE * 4) {
    phase = "Waxing Gibbous";
  } else if (normalized < PHASE_SIZE * 5) {
    phase = "Full Moon";
  } else if (normalized < PHASE_SIZE * 6) {
    phase = "Waning Gibbous";
  } else if (normalized < PHASE_SIZE * 7) {
    phase = "Last Quarter";
  } else {
    phase = "Waning Crescent";
  }

  return {
    angle: normalized,
    phase,

    waxing,
    waning,

    isNewMoon,
    isFullMoon,
  };
}

export function getMoonPhaseName(
  date: Date
): MoonPhase {
  return getMoonPhase(date).phase;
}

export function isNewMoon(
  date: Date
): boolean {
  return getMoonPhase(date).isNewMoon;
}

export function isFullMoon(
  date: Date
): boolean {
  return getMoonPhase(date).isFullMoon;
}

export function isWaxingMoon(
  date: Date
): boolean {
  return getMoonPhase(date).waxing;
}

export function isWaningMoon(
  date: Date
): boolean {
  return getMoonPhase(date).waning;
}
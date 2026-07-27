//////////////////////////////////////////////////////////////
// NATIONPATH ASTROLOGY HELPERS
//////////////////////////////////////////////////////////////

import {
  SCORE,
  WEEK_DAYS,
  ZODIAC_SIGNS,
  type ZodiacSign,
} from "./constants";

import type {
  AstrologyContext,
  AstrologyRequest,
  CompatibilityResult,
  MoonTransit,
  Panchang,
} from "./types";

//////////////////////////////////////////////////////////////
// ZODIAC HELPERS
//////////////////////////////////////////////////////////////

export function normalizeZodiac(input: string): ZodiacSign {
  const normalized =
    input.trim().charAt(0).toUpperCase() +
    input.trim().slice(1).toLowerCase();

  if (isValidZodiac(normalized)) {
    return normalized;
  }

  throw new Error(`Invalid zodiac sign: ${input}`);
}

export function isValidZodiac(
  sign: string
): sign is ZodiacSign {
  return ZODIAC_SIGNS.includes(sign as ZodiacSign);
}

//////////////////////////////////////////////////////////////
// DATE HELPERS
//////////////////////////////////////////////////////////////

export function getISODate(
  date: Date = new Date()
): string {
  return date.toISOString().split("T")[0];
}

export function getWeekDay(
  date: Date = new Date()
): string {
  return WEEK_DAYS[date.getDay()];
}

//////////////////////////////////////////////////////////////
// SCORE HELPERS
//////////////////////////////////////////////////////////////

export function clampScore(score: number): number {
  return Math.min(
    SCORE.MAX,
    Math.max(SCORE.MIN, Math.round(score))
  );
}

//////////////////////////////////////////////////////////////
// TIME HELPERS
//////////////////////////////////////////////////////////////

export function formatTime(
  date: Date
): string {
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

//////////////////////////////////////////////////////////////
// CONTEXT FACTORY
//////////////////////////////////////////////////////////////

export function createAstrologyContext(
  request: AstrologyRequest,
  panchang: Panchang,
  moon: MoonTransit,
  compatibility: CompatibilityResult
): AstrologyContext {
  return {
    zodiacSign: request.zodiacSign,
    horoscopeDate: request.horoscopeDate ?? new Date(),
    panchang,
    moon,
    compatibility,
  };
}

//////////////////////////////////////////////////////////////
// DEFAULT OBJECTS
//////////////////////////////////////////////////////////////

export function createEmptyPanchang(): Panchang {
  return {
    date: getISODate(),

    tithi: "",
    nakshatra: "",
    yoga: "",
    karana: "",

    sunrise: "",
    sunset: "",

    moonrise: "",
    moonset: "",

    rahuKaal: "",
    abhijitMuhurat: "",
    amritKaal: "",
  };
}

export function createEmptyMoonTransit(): MoonTransit {
  return {
    moonSign: "Aries",
    moonPhase: "",
    currentTransit: "",
    planetInfluence: "",
  };
}

export function createEmptyCompatibility(): CompatibilityResult {
  return {
    compatibleSigns: [],
    avoidSigns: [],
    score: 0,
  };
}

//////////////////////////////////////////////////////////////
// ASSERTION
//////////////////////////////////////////////////////////////

export function assert(
  condition: unknown,
  message: string
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

//////////////////////////////////////////////////////////////
// DEFAULT EXPORT
//////////////////////////////////////////////////////////////

export default {
  normalizeZodiac,
  isValidZodiac,

  getISODate,
  getWeekDay,

  clampScore,
  formatTime,

  createAstrologyContext,

  createEmptyPanchang,
  createEmptyMoonTransit,
  createEmptyCompatibility,

  assert,
};
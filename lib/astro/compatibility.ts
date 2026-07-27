//////////////////////////////////////////////////////////////
// NATIONPATH ASTROLOGY COMPATIBILITY ENGINE
//////////////////////////////////////////////////////////////

import type { ZodiacSign } from "./constants";
import type { CompatibilityResult } from "./types";

//////////////////////////////////////////////////////////////
// COMPATIBILITY MATRIX
//////////////////////////////////////////////////////////////

const COMPATIBILITY: Record<
  ZodiacSign,
  {
    compatible: ZodiacSign[];
    avoid: ZodiacSign[];
    score: number;
  }
> = {
  Aries: {
    compatible: ["Leo", "Sagittarius", "Gemini"],
    avoid: ["Cancer", "Capricorn"],
    score: 90,
  },

  Taurus: {
    compatible: ["Virgo", "Capricorn", "Pisces"],
    avoid: ["Leo", "Aquarius"],
    score: 88,
  },

  Gemini: {
    compatible: ["Libra", "Aquarius", "Aries"],
    avoid: ["Virgo", "Pisces"],
    score: 86,
  },

  Cancer: {
    compatible: ["Scorpio", "Pisces", "Taurus"],
    avoid: ["Aries", "Libra"],
    score: 89,
  },

  Leo: {
    compatible: ["Aries", "Sagittarius", "Libra"],
    avoid: ["Scorpio", "Taurus"],
    score: 91,
  },

  Virgo: {
    compatible: ["Taurus", "Capricorn", "Cancer"],
    avoid: ["Gemini", "Sagittarius"],
    score: 87,
  },

  Libra: {
    compatible: ["Gemini", "Aquarius", "Leo"],
    avoid: ["Cancer", "Capricorn"],
    score: 89,
  },

  Scorpio: {
    compatible: ["Cancer", "Pisces", "Virgo"],
    avoid: ["Leo", "Aquarius"],
    score: 88,
  },

  Sagittarius: {
    compatible: ["Aries", "Leo", "Aquarius"],
    avoid: ["Virgo", "Pisces"],
    score: 90,
  },

  Capricorn: {
    compatible: ["Taurus", "Virgo", "Scorpio"],
    avoid: ["Aries", "Libra"],
    score: 87,
  },

  Aquarius: {
    compatible: ["Gemini", "Libra", "Sagittarius"],
    avoid: ["Taurus", "Scorpio"],
    score: 89,
  },

  Pisces: {
    compatible: ["Cancer", "Scorpio", "Capricorn"],
    avoid: ["Gemini", "Sagittarius"],
    score: 90,
  },
};

//////////////////////////////////////////////////////////////
// PUBLIC API
//////////////////////////////////////////////////////////////

export async function getCompatibility(
  zodiacSign: ZodiacSign
): Promise<CompatibilityResult> {
  const result = COMPATIBILITY[zodiacSign];

  return {
    compatibleSigns: result.compatible,
    avoidSigns: result.avoid,
    score: result.score,
  };
}

//////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////

export function isCompatible(
  first: ZodiacSign,
  second: ZodiacSign
): boolean {
  return COMPATIBILITY[first].compatible.includes(second);
}

export function getCompatibilityScore(
  zodiacSign: ZodiacSign
): number {
  return COMPATIBILITY[zodiacSign].score;
}

//////////////////////////////////////////////////////////////
// DEFAULT EXPORT
//////////////////////////////////////////////////////////////

export default {
  getCompatibility,
  isCompatible,
  getCompatibilityScore,
};
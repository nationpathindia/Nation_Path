//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO ENGINE
// Calculation Types
//////////////////////////////////////////////////////////////

/**
 * Geographic coordinates.
 */
export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

/**
 * Astronomical observation date.
 */
export interface AstroDate {
  date: Date;
}

/**
 * Julian Day representation.
 */
export interface JulianDay {
  value: number;
}

/**
 * Sunrise / Sunset calculation.
 */
export interface SunTimes {
  sunrise: Date;
  sunset: Date;
  solarNoon: Date;
  dayLength: number; // seconds
}

/**
 * Solar position.
 */
export interface SunPosition {
  rightAscension: number;
  declination: number;
  azimuth: number;
  altitude: number;
  apparentLongitude: number;
}

/**
 * Moon position.
 */
export interface MoonPosition {
  rightAscension: number;
  declination: number;
  azimuth: number;
  altitude: number;
  longitude: number;
  latitude: number;
  distance: number;
}

/**
 * Moon illumination.
 */
export interface MoonIllumination {
  fraction: number;
  phase: number;
  angle: number;
}

/**
 * Moon phase.
 */
export interface MoonPhase {
  name:
    | "New Moon"
    | "Waxing Crescent"
    | "First Quarter"
    | "Waxing Gibbous"
    | "Full Moon"
    | "Waning Gibbous"
    | "Last Quarter"
    | "Waning Crescent";

  illumination: number;

  age: number;
}

/**
 * Zodiac longitude.
 */
export interface ZodiacPosition {
  sign: string;

  degree: number;

  longitude: number;
}

/**
 * Panchang.
 */
export interface PanchangData {
  tithi: string;

  nakshatra: string;

  yoga: string;

  karana: string;
}

/**
 * Muhurat.
 */
export interface MuhuratData {
  rahuKaal: string;

  yamaganda: string;

  gulikaKaal: string;

  abhijitMuhurat: string;

  amritKaal: string;
}
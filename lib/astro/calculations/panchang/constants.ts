/**
 * ==========================================================
 * NationPath Astro Engine
 * Panchang Constants
 * ==========================================================
 */

/* ==========================================================
   ANGULAR CONSTANTS
========================================================== */

export const FULL_CIRCLE = 360;

export const TITHI_SIZE = 12; // 360 / 30
export const NAKSHATRA_SIZE = FULL_CIRCLE / 27;
export const YOGA_SIZE = FULL_CIRCLE / 27;
export const KARANA_SIZE = 6; // Half Tithi

/* ==========================================================
   TOTAL COUNTS
========================================================== */

export const TOTAL_TITHIS = 30;
export const TOTAL_NAKSHATRAS = 27;
export const TOTAL_YOGAS = 27;
export const TOTAL_KARANAS = 11;
export const TOTAL_VARAS = 7;

/* ==========================================================
   TITHIS
========================================================== */

export const TITHIS = [
  "Pratipada",
  "Dvitiya",
  "Tritiya",
  "Chaturthi",
  "Panchami",
  "Shashthi",
  "Saptami",
  "Ashtami",
  "Navami",
  "Dashami",
  "Ekadashi",
  "Dwadashi",
  "Trayodashi",
  "Chaturdashi",
  "Purnima",

  "Pratipada",
  "Dvitiya",
  "Tritiya",
  "Chaturthi",
  "Panchami",
  "Shashthi",
  "Saptami",
  "Ashtami",
  "Navami",
  "Dashami",
  "Ekadashi",
  "Dwadashi",
  "Trayodashi",
  "Chaturdashi",
  "Amavasya",
] as const;

export type TithiName = (typeof TITHIS)[number];

/* ==========================================================
   NAKSHATRAS
========================================================== */

export const NAKSHATRAS = [
  "Ashwini",
  "Bharani",
  "Krittika",
  "Rohini",
  "Mrigashira",
  "Ardra",
  "Punarvasu",
  "Pushya",
  "Ashlesha",
  "Magha",
  "Purva Phalguni",
  "Uttara Phalguni",
  "Hasta",
  "Chitra",
  "Swati",
  "Vishakha",
  "Anuradha",
  "Jyeshtha",
  "Mula",
  "Purva Ashadha",
  "Uttara Ashadha",
  "Shravana",
  "Dhanishta",
  "Shatabhisha",
  "Purva Bhadrapada",
  "Uttara Bhadrapada",
  "Revati",
] as const;

export type NakshatraName = (typeof NAKSHATRAS)[number];

/* ==========================================================
   YOGAS
========================================================== */

export const YOGAS = [
  "Vishkumbha",
  "Priti",
  "Ayushman",
  "Saubhagya",
  "Shobhana",
  "Atiganda",
  "Sukarma",
  "Dhriti",
  "Shoola",
  "Ganda",
  "Vriddhi",
  "Dhruva",
  "Vyaghata",
  "Harshana",
  "Vajra",
  "Siddhi",
  "Vyatipata",
  "Variyana",
  "Parigha",
  "Shiva",
  "Siddha",
  "Sadhya",
  "Shubha",
  "Shukla",
  "Brahma",
  "Indra",
  "Vaidhriti",
] as const;

export type YogaName = (typeof YOGAS)[number];

/* ==========================================================
   KARANAS
========================================================== */

export const KARANAS = [
  "Bava",
  "Balava",
  "Kaulava",
  "Taitila",
  "Garaja",
  "Vanija",
  "Vishti",
  "Shakuni",
  "Chatushpada",
  "Naga",
  "Kimstughna",
] as const;

export type KaranaName = (typeof KARANAS)[number];

/* ==========================================================
   VARAS
========================================================== */

export const VARAS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export type VaraName = (typeof VARAS)[number];
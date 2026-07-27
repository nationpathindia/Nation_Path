//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO ENGINE
// Jaimini Constants
//////////////////////////////////////////////////////////////

export const RASHIS = [
  "Mesha",
  "Vrishabha",
  "Mithuna",
  "Karka",
  "Simha",
  "Kanya",
  "Tula",
  "Vrischika",
  "Dhanu",
  "Makara",
  "Kumbha",
  "Meena",
] as const;

export type RashiName = typeof RASHIS[number];

export const RASHI_LORDS: Record<RashiName, string> = {
  Mesha: "Mars",
  Vrishabha: "Venus",
  Mithuna: "Mercury",
  Karka: "Moon",
  Simha: "Sun",
  Kanya: "Mercury",
  Tula: "Venus",
  Vrischika: "Mars",
  Dhanu: "Jupiter",
  Makara: "Saturn",
  Kumbha: "Saturn",
  Meena: "Jupiter",
};

export const JAIMINI_CHARA_KARAKAS = [
  "Atmakaraka",
  "Amatyakaraka",
  "Bhratrukaraka",
  "Matrukaraka",
  "Putrakaraka",
  "Gnatikaraka",
  "Darakaraka",
] as const;
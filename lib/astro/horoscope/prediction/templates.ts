/**
 * ============================================================
 * NationPath Astro SDK
 * Horoscope Prediction Templates
 * ============================================================
 *
 * Converts planetary intelligence into human-readable
 * horoscope interpretation.
 *
 * No calculations here.
 * No planetary logic here.
 * Only language templates.
 * ============================================================
 */


import type { PlanetName } from "./types";


export type PredictionTone =
  | "positive"
  | "neutral"
  | "caution";


export interface PlanetPredictionTemplate {
  strong: string;
  weak: string;
  neutral: string;
}


export type PredictionTemplateMap = Record<
  PlanetName,
  PlanetPredictionTemplate
>;



/**
 * ============================================================
 * PLANET PREDICTION TEMPLATES
 * ============================================================
 */

export const PLANET_PREDICTION_TEMPLATES: PredictionTemplateMap = {

  Sun: {
    strong:
      "Leadership, confidence and recognition become important themes. Your ability to take responsibility and inspire others is strengthened.",

    weak:
      "Focus on rebuilding confidence, self-expression and personal discipline. Avoid unnecessary ego conflicts.",

    neutral:
      "A balanced phase for developing confidence, authority and personal identity.",
  },


  Moon: {
    strong:
      "Emotional intelligence, creativity and intuition receive supportive energy. This period encourages better emotional understanding.",

    weak:
      "Emotional balance and mental clarity require attention. Avoid overthinking and maintain inner stability.",

    neutral:
      "A steady phase for emotional growth, imagination and personal reflection.",
  },


  Mars: {
    strong:
      "Courage, determination and action-oriented energy increase. This supports ambitious efforts and overcoming challenges.",

    weak:
      "Control impulsive decisions and focus energy through patience, planning and discipline.",

    neutral:
      "A phase where controlled effort and strategic action bring better results.",
  },


  Mercury: {
    strong:
      "Communication, learning ability and analytical skills receive positive support. Good period for knowledge and planning.",

    weak:
      "Take extra care with communication, decisions and detailed planning.",

    neutral:
      "A balanced period for learning, discussions and practical thinking.",
  },


  Jupiter: {
    strong:
      "Wisdom, expansion and opportunities receive supportive influence. Growth through knowledge and guidance is highlighted.",

    weak:
      "Avoid overconfidence and focus on learning, ethics and disciplined growth.",

    neutral:
      "A period of gradual development through experience and understanding.",
  },


  Venus: {
    strong:
      "Creativity, relationships and appreciation for beauty receive positive influence. Harmony becomes an important theme.",

    weak:
      "Relationships and personal values require attention. Focus on balance and emotional maturity.",

    neutral:
      "A balanced phase for creativity, relationships and personal enjoyment.",
  },


  Saturn: {
    strong:
      "Discipline, responsibility and long-term progress become powerful themes. Consistent effort brings meaningful results.",

    weak:
      "Patience and structure are required. Avoid shortcuts and focus on steady improvement.",

    neutral:
      "A period encouraging responsibility, patience and practical growth.",
  },


  Rahu: {
    strong:
      "Innovation, ambition and unconventional opportunities become active. Strategic thinking can create progress.",

    weak:
      "Avoid confusion, unrealistic expectations and impulsive choices.",

    neutral:
      "A phase for learning through new experiences and adapting to change.",
  },


  Ketu: {
    strong:
      "Spiritual awareness, research ability and deeper understanding receive support.",

    weak:
      "Maintain clarity and avoid unnecessary detachment from important responsibilities.",

    neutral:
      "A period for reflection, learning and inner development.",
  },

};
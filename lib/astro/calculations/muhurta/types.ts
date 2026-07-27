import type { DurationResult } from "../duration";
import type { VarjyamPeriod } from "./varjyam";
import type { AmritKaalPeriod } from "./amritKaal";

/**
 * ============================================================
 * NationPath Astro SDK
 * Muhurta Types
 * ============================================================
 *
 * Shared type definitions for all Muhurta calculations.
 *
 * Covers:
 * - Rahu Kaal
 * - Gulika Kaal
 * - Yamaganda
 * - Abhijit Muhurat
 * - Brahma Muhurat
 * - Varjyam
 * - Amrit Kaal
 *
 * ============================================================
 */

///////////////////////////////////////////////////////////////
// MUHURTA CATEGORY
///////////////////////////////////////////////////////////////

export type MuhurtaCategory =
  | "rahu"
  | "gulika"
  | "yamaganda"
  | "abhijit"
  | "brahma"
  | "varjyam"
  | "amrit";

///////////////////////////////////////////////////////////////
// MUHURTA NATURE
///////////////////////////////////////////////////////////////

export type MuhurtaNature =
  | "auspicious"
  | "inauspicious"
  | "neutral";

///////////////////////////////////////////////////////////////
// ENGINE INFO
///////////////////////////////////////////////////////////////

export interface MuhurtaEngineInfo {
  /**
   * Engine Version
   */
  version: string;

  /**
   * Engine Name
   */
  system: string;
}

///////////////////////////////////////////////////////////////
// MUHURTA PERIOD
///////////////////////////////////////////////////////////////

export interface MuhurtaPeriod {
  /**
   * Display Name
   */
  name: string;

  /**
   * Internal Category
   */
  category: MuhurtaCategory;

  /**
   * Auspicious / Inauspicious / Neutral
   */
  nature: MuhurtaNature;

  /**
   * Day Division Index
   *
   * Rahu/Gulika/Yamaganda:
   * 1-8
   *
   * Others:
   * 0
   */
  index: number;

  /**
   * Start Time (UTC)
   */
  start: Date;

  /**
   * End Time (UTC)
   */
  end: Date;

  /**
   * Duration Object
   */
  duration: DurationResult;
}

///////////////////////////////////////////////////////////////
// INAUSPICIOUS GROUP
///////////////////////////////////////////////////////////////

export interface InauspiciousMuhurtas {
  rahu: MuhurtaPeriod;

  gulika: MuhurtaPeriod;

  yamaganda: MuhurtaPeriod;

  varjyam: VarjyamPeriod[];
}

///////////////////////////////////////////////////////////////
// AUSPICIOUS GROUP
///////////////////////////////////////////////////////////////

export interface AuspiciousMuhurtas {
  abhijit: MuhurtaPeriod;

  brahma: MuhurtaPeriod;

  amritKaal: AmritKaalPeriod[];
}

///////////////////////////////////////////////////////////////
// COMPLETE RESPONSE
///////////////////////////////////////////////////////////////

export interface AllMuhurtasResult {
  /**
   * Engine generation timestamp
   */
  generatedAt: Date;

  /**
   * Engine metadata
   */
  engine: MuhurtaEngineInfo;

  /**
   * Original request date
   */
  date: Date;

  /**
   * Inauspicious Muhurtas
   */
  inauspicious: InauspiciousMuhurtas;

  /**
   * Auspicious Muhurtas
   */
  auspicious: AuspiciousMuhurtas;
}
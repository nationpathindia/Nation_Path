import { getSunMoonDifference } from "./helpers";

import {
  KARANAS,
  KARANA_SIZE,
} from "./constants";


export interface KaranaInfo {

  index: number;

  name: string;

  degree: number;

  slot: number;
}


/**
 * Karana slot
 *
 * One Karana = 6°
 * 360 / 6 = 60 slots
 */
export function getKaranaSlot(
  date: Date
): number {

  const diff =
    getSunMoonDifference(date);

  return Math.floor(
    diff / KARANA_SIZE
  );
}


/**
 * Classical Karana Index
 *
 * 60 Karana slots:
 *
 * Slot 0  : Kimstughna
 *
 * Slots 1-56:
 * Repeating 7 Karana cycle
 *
 * Slots 57-59:
 * Shakuni
 * Chatushpada
 * Naga
 */
export function getKaranaIndex(
  date: Date
): number {

  const slot =
    getKaranaSlot(date);


  // First fixed Karana
  if (slot === 0) {
    return 10; // Kimstughna
  }


  // Last three fixed Karanas
  if (slot >= 57) {

    return (
      slot - 55
    );
  }


  /**
   * Repeating Karana cycle:
   *
   * Bava
   * Balava
   * Kaulava
   * Taitila
   * Garaja
   * Vanija
   * Vishti
   */
  const repeatingIndex =
    (slot - 1) % 7;


  return repeatingIndex;
}


/**
 * Main Karana
 */
export function getKarana(
  date: Date
): KaranaInfo {

  const degree =
    getSunMoonDifference(date);


  const slot =
    getKaranaSlot(date);


  const index =
    getKaranaIndex(date);


  return {

    index,

    slot,

    name:
      KARANAS[index],

    degree,

  };
}


/**
 * Helper
 */
export function isKarana(
  date: Date,
  index: number
): boolean {

  return (
    getKaranaIndex(date) === index
  );
}
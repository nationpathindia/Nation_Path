import type { RiseSetRequest } from "../riseSet";

import type {
  AllMuhurtasResult,
} from "./types";

import {
  MUHURTA_ENGINE_VERSION,
} from "./constants";

import {
  calculateRahuKaal,
} from "./rahu";

import {
  calculateGulikaKaal,
} from "./gulika";

import {
  calculateYamaganda,
} from "./yamaganda";

import {
  calculateAbhijitMuhurat,
} from "./abhijit";

import {
  calculateBrahmaMuhurat,
} from "./brahma";

import {
  getVarjyam,
} from "./varjyam";

import {
  getAmritKaal,
} from "./amritKaal";


/**
 * ============================================================
 * NationPath Astro SDK
 * Muhurta Aggregator
 * ============================================================
 *
 * Production Muhurta aggregation layer.
 *
 * Combines:
 *
 * Inauspicious:
 * - Rahu Kaal
 * - Gulika Kaal
 * - Yamaganda
 * - Varjyam
 *
 * Auspicious:
 * - Abhijit Muhurat
 * - Brahma Muhurat
 * - Amrit Kaal
 *
 * ============================================================
 */

export function calculateAllMuhurtas(
  request: RiseSetRequest
): AllMuhurtasResult {

  const {
    date,
  } = request;


  const result: AllMuhurtasResult = {

    date,

    generatedAt: new Date(),

    engine: {

      version: MUHURTA_ENGINE_VERSION,

      system:
        "NationPath Astro SDK",

    },


    inauspicious: {

      rahu:
        calculateRahuKaal(
          request
        ),


      gulika:
        calculateGulikaKaal(
          request
        ),


      yamaganda:
        calculateYamaganda(
          request
        ),


      varjyam:
        getVarjyam(
          date
        ),

    },


    auspicious: {

      abhijit:
        calculateAbhijitMuhurat(
          request
        ),


      brahma:
        calculateBrahmaMuhurat(
          request
        ),


      amritKaal:
        getAmritKaal(
          date
        ),

    },

  };


  return result;

}
//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE SERVICE
// Production Horoscope Service Layer
//////////////////////////////////////////////////////////////

import {
  calculateHoroscope,
} from "@/lib/astro/horoscope/engine";


import type {
  HoroscopeRequest,
  HoroscopeResult,
} from "@/lib/astro/horoscope/types";


import type {
  HoroscopeLanguage,
} from "@/lib/astro/horoscope/types";



//////////////////////////////////////////////////////////////
// INPUT TYPE
//////////////////////////////////////////////////////////////

export interface HoroscopeServiceInput {


  horoscopeDate:
    Date | string;



  language?:
    HoroscopeLanguage;



  zodiacSign?:
    string;


}



//////////////////////////////////////////////////////////////
// DATE NORMALIZER
//////////////////////////////////////////////////////////////

function normalizeDate(
  value: Date | string
): Date {


  if (
    value instanceof Date
  ) {

    return value;

  }


  return new Date(
    value
  );

}



//////////////////////////////////////////////////////////////
// MAIN GENERATOR
//////////////////////////////////////////////////////////////

export async function generateHoroscope(
  input: HoroscopeServiceInput
): Promise<HoroscopeResult> {


  const date =
    normalizeDate(
      input.horoscopeDate
    );


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

    throw new Error(
      "Invalid horoscope date"
    );

  }



  const language =
  input.language
  ??
  ("english" as HoroscopeLanguage);

  const request:
  HoroscopeRequest =
{
  date,

  language,

  zodiacSign:
    input.zodiacSign,

};



  return calculateHoroscope(
    request
  );

}



//////////////////////////////////////////////////////////////
// BACKWARD COMPATIBILITY ALIAS
//////////////////////////////////////////////////////////////

export async function createHoroscope(
  input: HoroscopeServiceInput
): Promise<HoroscopeResult> {


  return generateHoroscope(
    input
  );

}
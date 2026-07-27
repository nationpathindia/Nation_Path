//////////////////////////////////////////////////////////////
// NATIONPATH AI HOROSCOPE ADAPTER
// Engine Result → AI Context Transformer
//////////////////////////////////////////////////////////////

import type {
  HoroscopeResult,
} from "@/lib/astro/horoscope/types";


//////////////////////////////////////////////////////////////
// AI HOROSCOPE CONTEXT
//////////////////////////////////////////////////////////////

export interface AIHoroscopeContext {

  date: string;

  language: string;

  sunSign: {

    name: string;

    longitude: number;

  };


  moonSign: {

    name: string;

    longitude: number;

  };


  planets: unknown;


  analysis?: unknown;


  influences: unknown;


  interpretation?: unknown;


  prediction?: unknown;


  summary: {

    title: string;

    description: string;

  };

}



//////////////////////////////////////////////////////////////
// HOROSCOPE RESULT ADAPTER
//////////////////////////////////////////////////////////////

export function adaptHoroscopeForAI(
  horoscope: HoroscopeResult
): AIHoroscopeContext {


  return {

    date:
      horoscope.date.toISOString(),


    language:
      horoscope.language,


    sunSign: {

      name:
        horoscope.sunSign.name,


      longitude:
        horoscope.sunSign.longitude,

    },


    moonSign: {

      name:
        horoscope.moonSign.name,


      longitude:
        horoscope.moonSign.longitude,

    },


    planets:
      horoscope.planets,


    analysis:
      horoscope.analysis,


    influences:
      horoscope.influences,


    interpretation:
      horoscope.interpretation,


    prediction:
      horoscope.prediction,


    summary:
      horoscope.summary,

  };

}



//////////////////////////////////////////////////////////////
// DEFAULT EXPORT
//////////////////////////////////////////////////////////////

export default {

  adaptHoroscopeForAI,

};
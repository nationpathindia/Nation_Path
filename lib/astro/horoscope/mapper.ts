//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
// Multilingual Localization Engine
//////////////////////////////////////////////////////////////

import {
  hiDictionary,
} from "./languages/hi";

import {
  taDictionary,
} from "./languages/ta";

import {
  teDictionary,
} from "./languages/te";

import {
  neDictionary,
} from "./languages/ne";


import type {
  HoroscopeLanguage,
} from "./types";


//////////////////////////////////////////////////////////////
// DICTIONARY REGISTRY
//////////////////////////////////////////////////////////////

const dictionaries = {

  hi:
    hiDictionary,

  ta:
    taDictionary,

  te:
    teDictionary,

  ne:
    neDictionary,

} as const;



type DictionaryLanguage =
  keyof typeof dictionaries;



//////////////////////////////////////////////////////////////
// SUMMARY TYPE
//////////////////////////////////////////////////////////////

export interface LocalizedSummary {

  title:
    string;


  description:
    string;

}



//////////////////////////////////////////////////////////////
// GET DICTIONARY
//////////////////////////////////////////////////////////////

function getDictionary(
  lang?: HoroscopeLanguage
) {


  if (
    !lang ||
    lang === "en"
  ) {

    return null;

  }


  return (
    dictionaries[
      lang as DictionaryLanguage
    ]
    ||
    null
  );

}



//////////////////////////////////////////////////////////////
// PLANET TRANSLATION
//////////////////////////////////////////////////////////////

export function translatePlanet(
  name: string,
  lang?: HoroscopeLanguage
): string {


  const dict =
    getDictionary(lang);


  if (!dict) {

    return name;

  }


  return (
    dict.planets?.[
      name as keyof typeof dict.planets
    ]
    ||
    name
  );

}



//////////////////////////////////////////////////////////////
// RASHI TRANSLATION
//////////////////////////////////////////////////////////////

export function translateRashi(
  name: string,
  lang?: HoroscopeLanguage
): string {


  const dict =
    getDictionary(lang);


  if (!dict) {

    return name;

  }


  return (
    dict.rashis?.[
      name as keyof typeof dict.rashis
    ]
    ||
    name
  );

}



//////////////////////////////////////////////////////////////
// NATURE TRANSLATION
//////////////////////////////////////////////////////////////

export function getLocalizedNature(
  nature:
    | "benefic"
    | "malefic"
    | "neutral",

  lang?: HoroscopeLanguage

): string {


  const dict =
    getDictionary(lang);


  if (!dict) {

    return nature;

  }


  return (
    dict.labels?.[
      nature
    ]
    ||
    nature
  );

}



//////////////////////////////////////////////////////////////
// KEYWORD TRANSLATION
//////////////////////////////////////////////////////////////

export function getLocalizedKeywords(
  planetName: string,
  defaultKeywords: string[],
  lang?: HoroscopeLanguage

): string[] {


  const dict =
    getDictionary(lang);


  if (!dict) {

    return defaultKeywords;

  }


  return (
    dict.keywords?.[
      planetName as keyof typeof dict.keywords
    ]
    ||
    defaultKeywords
  );

}



//////////////////////////////////////////////////////////////
// SUMMARY TRANSLATION
//////////////////////////////////////////////////////////////

export function getLocalizedSummary(
  defaultTitle: string,
  defaultDesc: string,
  lang?: HoroscopeLanguage

): LocalizedSummary {


  const dict =
    getDictionary(lang);



  if (!dict) {

    return {

      title:
        defaultTitle,


      description:
        defaultDesc,

    };

  }



  return {

    title:
      dict.labels?.title
      ||
      defaultTitle,


    description:
      dict.labels?.description
      ||
      defaultDesc,

  };

}
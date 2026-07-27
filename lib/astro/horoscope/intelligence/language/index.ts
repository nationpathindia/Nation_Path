//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// LANGUAGE INTELLIGENCE EXPORT HUB
//
// Premium Literature Layer
//
// No calculations.
// No prediction rules.
//////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////
// CORE TYPES
//////////////////////////////////////////////////////////////

export type {

  LanguageLifeArea,

  LanguageTone,

  PlanetLanguageOutput,

  PlanetLanguageContext,

  LanguageComposition,

} from "./types";




//////////////////////////////////////////////////////////////
// RESOLVER
//////////////////////////////////////////////////////////////

export {

  resolvePlanetLanguage,

  createLanguageContext,

  resolveTone,

} from "./resolver";




//////////////////////////////////////////////////////////////
// COMPOSER
//////////////////////////////////////////////////////////////

export {

  composeLanguage,

  composeSingleLanguage,

} from "./composer";




//////////////////////////////////////////////////////////////
// PLANET LIBRARIES
//////////////////////////////////////////////////////////////

export {

  generateSunLanguage,

  SUN_LIBRARY,

} from "./planets/sun";



export {

  generateMoonLanguage,

  MOON_LIBRARY,

} from "./planets/moon";



export {

  generateMarsLanguage,

  MARS_LIBRARY,

} from "./planets/mars";



export {

  generateMercuryLanguage,

  MERCURY_LIBRARY,

} from "./planets/mercury";



export {

  generateJupiterLanguage,

  JUPITER_LIBRARY,

} from "./planets/jupiter";



export {

  generateVenusLanguage,

  VENUS_LIBRARY,

} from "./planets/venus";



export {

  generateSaturnLanguage,

  SATURN_LIBRARY,

} from "./planets/saturn";



export {

  generateRahuLanguage,

  RAHU_LIBRARY,

} from "./planets/rahu";



export {

  generateKetuLanguage,

  KETU_LIBRARY,

} from "./planets/ketu";
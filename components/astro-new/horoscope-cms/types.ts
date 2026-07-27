//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// CMS HOROSCOPE EXPERIENCE TYPES
//
// CMS SINGLE SOURCE OF TRUTH
//
// NO ENGINE
// NO CALCULATION
// NO AI GENERATION
//////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////
// HERO CMS
//////////////////////////////////////////////////////////////

export interface CmsHoroscopeHero {

  badge?: string;

  title?: string;

  subtitle?: string;

  description?: string;

  image?: string;

  cosmicLabel?: string;

  theme?: string;

  background?: string;

}





//////////////////////////////////////////////////////////////
// IDENTITY CMS
//////////////////////////////////////////////////////////////

export interface CmsHoroscopeIdentity {

  rashi?: string;

  sanskritName?: string;

  sanskrit?: string;

  dates?: string;

  symbol?: string;

  element?: string;

  rulingPlanet?: string;

  nature?: string;

  energy?: string;

  description?: string;

}





//////////////////////////////////////////////////////////////
// TRAITS CMS
//////////////////////////////////////////////////////////////

export interface CmsHoroscopeTraits {

  strengths?: string[];

  weaknesses?: string[];

  personality?: string;

}





//////////////////////////////////////////////////////////////
// EDITORIAL CMS
//////////////////////////////////////////////////////////////

export interface CmsHoroscopeEditorial {

  headline?: string;

  overview?: string;

  prediction?: string;

  quote?: string;

}





//////////////////////////////////////////////////////////////
// LIFE INTELLIGENCE CMS
//////////////////////////////////////////////////////////////

export interface CmsHoroscopeLife {

  career?: string;

  love?: string;

  finance?: string;

  health?: string;

}





//////////////////////////////////////////////////////////////
// COSMIC INSIGHTS CMS
//////////////////////////////////////////////////////////////

export interface CmsHoroscopeInsights {

  planetaryInfluence?: string;

  energy?: string;

  guidance?: string;

  remedy?: string;

  strengths?: string[];

  challenges?: string[];

}





//////////////////////////////////////////////////////////////
// PLANETARY INTELLIGENCE CMS
//////////////////////////////////////////////////////////////

export interface CmsHoroscopePlanet {

  planetKey?: string;

  name?: string;

  title?: string;

  message?: string;

  strength?: string;

  icon?: string;

  energyLevel?: string;

}





//////////////////////////////////////////////////////////////
// ZODIAC EXPLORER CMS
//////////////////////////////////////////////////////////////
export interface CmsZodiacItem {

  zodiac: string;

  slug: string;

  name?: string;

  image?: string;

  symbol?: string;

  planet?: string;

  energy?: string;

  element?: string;

  active?: boolean;

}

//////////////////////////////////////////////////////////////
// LUCKY FACTORS CMS
//////////////////////////////////////////////////////////////

export interface CmsHoroscopeLucky {

  number?: string;

  color?: string;

  direction?: string;

  time?: string;

  gemstone?: string;

  metal?: string;

}





//////////////////////////////////////////////////////////////
// REMEDY CMS
//////////////////////////////////////////////////////////////

export interface CmsHoroscopeRemedy {

  category?: string;

  title?: string;

  practice?: string;

  guidance?: string;

  reason?: string;

}





//////////////////////////////////////////////////////////////
// VEDIC CMS
//////////////////////////////////////////////////////////////

export interface CmsHoroscopeVedic {

  favorable?: string[];

  avoid?: string[];

}





//////////////////////////////////////////////////////////////
// COMPATIBILITY CMS
//////////////////////////////////////////////////////////////

export interface CmsHoroscopeCompatibility {

  title?: string;

  description?: string;

  link?: string;

}





//////////////////////////////////////////////////////////////
// PREMIUM CMS
//////////////////////////////////////////////////////////////

export interface CmsHoroscopePremium {

  title?: string;

  description?: string;

  features?: string[];

}





//////////////////////////////////////////////////////////////
// SEO CMS
//////////////////////////////////////////////////////////////

export interface CmsHoroscopeSEO {

  title?: string;

  description?: string;

  keywords?: string[];

  ogImage?: string;

  canonical?: string;

}





//////////////////////////////////////////////////////////////
// MAIN CMS HOROSCOPE DATA
//////////////////////////////////////////////////////////////

export interface CmsHoroscopeData {

  zodiac?: string;

  slug?: string;


  symbol?: string;

  element?: string;

  modality?: string;

  rulingPlanet?: string;



  hero?: CmsHoroscopeHero;


  identity?: CmsHoroscopeIdentity;


  traits?: CmsHoroscopeTraits;


  editorial?: CmsHoroscopeEditorial;


  life?: CmsHoroscopeLife;


  insights?: CmsHoroscopeInsights;


  planets?: CmsHoroscopePlanet[];



  // NEW
  // Zodiac Explorer Rail
  zodiacList?: CmsZodiacItem[];



  lucky?: CmsHoroscopeLucky;


  remedy?: CmsHoroscopeRemedy;


  vedic?: CmsHoroscopeVedic;


  compatibility?: CmsHoroscopeCompatibility;


  premium?: CmsHoroscopePremium;


  seo?: CmsHoroscopeSEO;

}





//////////////////////////////////////////////////////////////
// API RESPONSE
//////////////////////////////////////////////////////////////

export interface CmsHoroscopeResponse {

  success?: boolean;


  data?: CmsHoroscopeData;


  cms?: CmsHoroscopeData;


  message?: string;

}
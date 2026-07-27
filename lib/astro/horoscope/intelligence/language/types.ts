//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// LANGUAGE INTELLIGENCE TYPES
//
// Literature Layer Contracts
//
// No calculations.
// No prediction rules.
//////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////
// LIFE AREAS
//////////////////////////////////////////////////////////////

export type LanguageLifeArea =

  | "overall"
  | "personality"
  | "career"
  | "finance"
  | "relationship"
  | "health"
  | "mind"
  | "spirituality"
  | "education"
  | "communication"
  | "travel"
  | "research"
  | "ambition";




//////////////////////////////////////////////////////////////
// LANGUAGE TONE
//////////////////////////////////////////////////////////////

export type LanguageTone =

  | "positive"
  | "neutral"
  | "caution";




//////////////////////////////////////////////////////////////
// PLANET LANGUAGE RESULT
//////////////////////////////////////////////////////////////

export interface PlanetLanguageOutput {


  /**
   * Main premium horoscope sentence
   */

  statement:

    string;



  /**
   * Explanation layer
   */

  explanation:

    string;



  /**
   * User guidance layer
   */

  advice:

    string;



}




//////////////////////////////////////////////////////////////
// PLANET LANGUAGE CONTEXT
//////////////////////////////////////////////////////////////

export interface PlanetLanguageContext {


  planet:

    string;



  area:

    LanguageLifeArea;



  tone:

    LanguageTone;



  strengthScore?:

    number;



  zodiac?:

    string;



  keywords?:

    string[];



}




//////////////////////////////////////////////////////////////
// FINAL COMPOSED LANGUAGE
//////////////////////////////////////////////////////////////

export interface LanguageComposition {


  headline:

    string;



  description:

    string;



  guidance:

    string;



  metadata?: {


    planet:

      string;



    area:

      LanguageLifeArea;



    tone:

      LanguageTone;


  };


}
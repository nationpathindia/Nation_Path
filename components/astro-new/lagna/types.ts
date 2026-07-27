//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// LAGNA INTELLIGENCE
//
// DATA CONTRACTS
//
// Purpose:
// Stable UI layer contract
//
// Future:
// API response mapping
//
// IMPORTANT:
// Does not contain calculation logic
//////////////////////////////////////////////////////////////



export interface LagnaProfile {


  /**
   * Ascendant / Rising Sign
   *
   * Example:
   * Leo
   * Taurus
   * Virgo
   */
  ascendant: string;



  /**
   * Element associated with Lagna
   *
   * Example:
   * Fire
   * Earth
   * Air
   * Water
   */
  element: string;



  /**
   * Planet ruling the Ascendant
   *
   * Example:
   * Sun
   * Venus
   * Mercury
   */
  rulingPlanet: string;



  /**
   * Main identity statement
   *
   * Example:
   * "The world experiences you as a confident creator..."
   */
  identity: string;




  /**
   * External personality patterns
   */
  personality: LagnaInsight[];



  /**
   * Natural abilities
   */
  strengths: LagnaInsight[];



  /**
   * Growth and guidance path
   */
  guidance: LagnaInsight[];



  /**
   * Optional premium information
   */
  premium?: {


    title: string;

    description: string;

  };


}





export interface LagnaInsight {


  /**
   * Section title
   *
   * Example:
   * Leadership Presence
   */
  title: string;




  /**
   * Explanation
   */
  description: string;




  /**
   * Optional keyword
   *
   * Example:
   * Confidence
   * Creativity
   */
  keyword?: string;



}
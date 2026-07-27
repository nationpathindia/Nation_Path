//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// SATURN LANGUAGE INTELLIGENCE
//
// Literature Layer Only
//
// No calculations.
// No prediction rules.
// No planetary astronomy.
//////////////////////////////////////////////////////////////

import type {
  LanguageLifeArea,
  LanguageTone,
  PlanetLanguageOutput,
} from "../types";



//////////////////////////////////////////////////////////////
// SATURN LITERATURE DATABASE
//////////////////////////////////////////////////////////////

const SATURN_LIBRARY = {


  positive: {


    overall:
      "Saturn strengthens discipline, patience and long-term transformation. This influence supports growth through responsibility, commitment and consistent effort.",


    career:
      "Saturn supports professional achievement through dedication, structure and perseverance. Long-term success develops through patience and disciplined action.",


    finance:
      "Saturn encourages stable financial growth through planning, responsibility and careful management of resources.",


    relationship:
      "Saturn strengthens relationships through loyalty, maturity and understanding of responsibilities. Stable connections grow through commitment and patience.",


    education:
      "Saturn supports deep learning through discipline, focus and consistent practice. Knowledge develops through persistence.",


    spirituality:
      "Saturn encourages inner maturity through reflection, patience and acceptance of personal growth processes.",


    health:
      "Saturn supports well-being through routine, discipline and maintaining consistent healthy practices.",


    communication:
      "Saturn encourages thoughtful communication through patience, maturity and careful expression.",


    responsibility:
      "Saturn strengthens the ability to handle duties with seriousness, commitment and practical wisdom.",


  },



  neutral: {


    overall:
      "Saturn indicates gradual progress through patience, responsibility and learning from experience.",


    career:
      "Saturn suggests steady professional development through effort, structure and commitment to improvement.",


    finance:
      "Saturn highlights the importance of financial discipline, planning and controlled decisions.",


    relationship:
      "Saturn encourages building relationships through trust, maturity and realistic expectations.",


    education:
      "Saturn supports progress through regular practice, focus and dedication toward learning goals.",


    spirituality:
      "Saturn creates opportunities for deeper understanding through patience and self-reflection.",


    health:
      "Saturn emphasizes the importance of routine, balance and consistent personal care.",


    communication:
      "Saturn supports careful communication where clarity and responsibility create stronger connections.",


    responsibility:
      "Saturn highlights duties that require patience, organization and long-term commitment.",


  },



  caution: {


    overall:
      "Saturn asks for patience during demanding phases. Progress improves when challenges are approached with discipline rather than frustration.",


    career:
      "Saturn advises avoiding shortcuts and focusing on steady improvement. Professional growth may require persistence and strategic effort.",


    finance:
      "Saturn suggests careful financial decisions and avoiding unnecessary risks. Stability comes through planning and restraint.",


    relationship:
      "Saturn encourages emotional maturity and patience. Relationships require understanding rather than rigid expectations.",


    education:
      "Saturn reminds you that meaningful achievement requires consistency, effort and dedication.",


    spirituality:
      "Saturn encourages accepting personal lessons and developing wisdom through patience and self-awareness.",


    health:
      "Saturn suggests creating stronger routines and avoiding neglect of important personal responsibilities.",


    communication:
      "Saturn advises avoiding excessive seriousness and maintaining balanced expression with others.",


    responsibility:
      "Saturn reminds you to handle obligations carefully while maintaining patience and confidence.",


  },


};




//////////////////////////////////////////////////////////////
// SATURN INTERPRETER
//////////////////////////////////////////////////////////////

export function generateSaturnLanguage(

  area:
    LanguageLifeArea = "overall",


  tone:
    LanguageTone = "neutral"


): PlanetLanguageOutput {


  const toneLibrary =

    SATURN_LIBRARY[tone];



  const statement =

    toneLibrary[area]

    ??

    toneLibrary.overall;




  return {


    statement,


    explanation:

      "Saturn represents discipline, responsibility, patience and long-term development. Its expression changes according to the life area being explored.",



    advice:

      tone === "caution"

        ?

        "Accept gradual progress and focus on consistent improvement rather than immediate results."

        :

        "Continue building strong foundations through discipline and patience.",


  };


}




//////////////////////////////////////////////////////////////
// EXPORT LIBRARY
//////////////////////////////////////////////////////////////

export {

  SATURN_LIBRARY,

};
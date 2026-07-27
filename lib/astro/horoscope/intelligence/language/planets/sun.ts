//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// SUN LANGUAGE INTELLIGENCE
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
// SUN LITERATURE DATABASE
//////////////////////////////////////////////////////////////

const SUN_LIBRARY = {


  positive: {


    overall:
      "Sun strengthens confidence, purpose and self-expression. This influence supports personal growth through clarity, leadership and conscious action.",


    personality:
      "Sun enhances individuality, confidence and the ability to express personal strengths with greater awareness.",


    career:
      "Sun supports career development through leadership, responsibility and recognition. Progress grows when confidence is combined with purposeful action.",


    finance:
      "Sun encourages financial growth through confidence, planning and responsible use of personal abilities.",


    relationship:
      "Sun supports relationships through honesty, respect and healthy self-expression. Balance between individuality and connection becomes important.",


    health:
      "Sun encourages vitality through discipline, confidence and maintaining positive personal habits.",


    mind:
      "Sun strengthens clarity, determination and the ability to make decisions with greater confidence.",


    spirituality:
      "Sun supports self-awareness, inner strength and understanding of personal purpose.",


    education:
      "Sun encourages focused learning, confidence in abilities and development of personal talents.",


    communication:
      "Sun improves expression through confidence, clarity and authentic communication.",


    ambition:
      "Sun strengthens ambition and encourages purposeful movement toward meaningful goals.",


  },



  neutral: {


    overall:
      "Sun highlights themes of identity, confidence and personal development through awareness and steady effort.",


    personality:
      "Sun encourages understanding personal strengths while developing confidence with balance and humility.",


    career:
      "Sun indicates opportunities to develop leadership abilities through responsibility and consistent effort.",


    finance:
      "Sun suggests building financial confidence through planning and responsible choices.",


    relationship:
      "Sun encourages maintaining individuality while respecting the needs of others.",


    health:
      "Sun highlights the importance of discipline, energy management and balanced routines.",


    mind:
      "Sun supports clearer thinking and stronger awareness of personal decisions.",


    spirituality:
      "Sun encourages reflection on identity, purpose and personal values.",


    education:
      "Sun supports focused learning through confidence and dedication.",


    communication:
      "Sun encourages direct and clear expression while maintaining awareness.",


    ambition:
      "Sun highlights the importance of steady progress toward meaningful objectives.",


  },



  caution: {


    overall:
      "Sun asks for balance between confidence and humility. Personal strength becomes more effective when guided by awareness.",


    personality:
      "Sun encourages avoiding excessive pride and developing confidence through self-awareness.",


    career:
      "Sun advises balancing ambition with cooperation and avoiding unnecessary conflicts in professional matters.",


    finance:
      "Sun suggests avoiding impulsive financial decisions based only on confidence or immediate desire.",


    relationship:
      "Sun reminds you to balance personal expectations with understanding and respect for others.",


    health:
      "Sun encourages maintaining discipline and avoiding neglect of personal energy and routine.",


    mind:
      "Sun suggests reducing rigid thinking and remaining open to different perspectives.",


    spirituality:
      "Sun encourages moving beyond ego and developing deeper awareness of purpose.",


    education:
      "Sun reminds you to combine confidence with continuous learning and openness.",


    communication:
      "Sun advises expressing opinions with confidence while remaining receptive to others.",


    ambition:
      "Sun suggests directing ambition wisely and avoiding decisions driven only by recognition.",


  },


};




//////////////////////////////////////////////////////////////
// SUN INTERPRETER
//////////////////////////////////////////////////////////////

export function generateSunLanguage(

  area:
    LanguageLifeArea = "overall",


  tone:
    LanguageTone = "neutral"


): PlanetLanguageOutput {


  const toneLibrary =

    SUN_LIBRARY[tone];



  const statement =

    toneLibrary[area]

    ??

    toneLibrary.overall;




  return {


    statement,


    explanation:

      "Sun represents identity, confidence, leadership and personal purpose. Its expression changes according to the life area being explored.",



    advice:

      tone === "caution"

        ?

        "Balance confidence with humility and allow awareness to guide decisions."

        :

        "Use your strengths with clarity, responsibility and purposeful action.",


  };


}




//////////////////////////////////////////////////////////////
// EXPORT LIBRARY
//////////////////////////////////////////////////////////////

export {

  SUN_LIBRARY,

};
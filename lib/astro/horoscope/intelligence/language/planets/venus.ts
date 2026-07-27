//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// VENUS LANGUAGE INTELLIGENCE
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
// VENUS LITERATURE DATABASE
//////////////////////////////////////////////////////////////

const VENUS_LIBRARY = {


  positive: {


    overall:
      "Venus brings themes of harmony, creativity and emotional refinement. This influence supports appreciation, connection and the ability to create balance in life.",


    career:
      "Venus supports professional progress through creativity, collaboration and refined skills. Success can develop through diplomacy, presentation and relationship-building.",


    finance:
      "Venus encourages financial improvement through balanced choices, appreciation of value and thoughtful management of resources.",


    relationship:
      "Venus strengthens emotional connection, affection and mutual understanding. Relationships benefit through kindness, respect and emotional openness.",


    education:
      "Venus supports creative learning, artistic expression and the ability to understand ideas through imagination and observation.",


    spirituality:
      "Venus encourages finding deeper meaning through compassion, beauty and appreciation of harmony in life.",


    health:
      "Venus supports well-being through balance, relaxation and creating healthier emotional environments.",


    communication:
      "Venus improves communication through warmth, diplomacy and understanding of emotional expression.",


    comfort:
      "Venus highlights the importance of creating peaceful surroundings and appreciating meaningful experiences.",


  },



  neutral: {


    overall:
      "Venus indicates a period of learning balance between personal desires, relationships and emotional needs.",


    career:
      "Venus suggests steady progress through cooperation, creativity and maintaining positive professional connections.",


    finance:
      "Venus encourages practical awareness of spending habits and understanding the true value of resources.",


    relationship:
      "Venus supports emotional growth through patience, communication and mutual understanding.",


    education:
      "Venus encourages creative approaches to learning and developing personal talents.",


    spirituality:
      "Venus supports inner balance through appreciation, compassion and emotional awareness.",


    health:
      "Venus highlights the importance of maintaining balance between comfort, lifestyle and personal discipline.",


    communication:
      "Venus encourages thoughtful expression and maintaining harmony in interactions.",


    comfort:
      "Venus suggests creating balance between enjoyment and responsibility.",


  },



  caution: {


    overall:
      "Venus asks for balance between desires and responsibilities. Emotional choices become stronger when guided by awareness.",


    career:
      "Venus advises avoiding decisions based only on popularity or comfort. Long-term value should remain the focus.",


    finance:
      "Venus suggests controlling unnecessary expenses and making financial choices with greater awareness.",


    relationship:
      "Venus encourages emotional maturity and avoiding expectations that create imbalance in connections.",


    education:
      "Venus reminds you to combine creativity with consistency and discipline.",


    spirituality:
      "Venus encourages looking beyond external attraction and developing deeper understanding.",


    health:
      "Venus suggests maintaining moderation and avoiding excessive comfort-oriented habits.",


    communication:
      "Venus advises balancing charm with honesty and clear expression.",


    comfort:
      "Venus reminds you that true satisfaction comes from balance rather than excess.",


  },


};




//////////////////////////////////////////////////////////////
// VENUS INTERPRETER
//////////////////////////////////////////////////////////////

export function generateVenusLanguage(

  area:
    LanguageLifeArea = "overall",


  tone:
    LanguageTone = "neutral"


): PlanetLanguageOutput {


  const toneLibrary =

    VENUS_LIBRARY[tone];



  const statement =

    toneLibrary[area]

    ??

    toneLibrary.overall;




  return {


    statement,


    explanation:

      "Venus represents harmony, relationships, creativity and personal values. Its expression changes according to the life area being explored.",



    advice:

      tone === "caution"

        ?

        "Maintain emotional balance and make choices with awareness."

        :

        "Develop harmony, creativity and meaningful connections through conscious decisions.",


  };


}




//////////////////////////////////////////////////////////////
// EXPORT LIBRARY
//////////////////////////////////////////////////////////////

export {

  VENUS_LIBRARY,

};
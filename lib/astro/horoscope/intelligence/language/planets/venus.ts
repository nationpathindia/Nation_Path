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
      "Venus brings harmony, creativity and emotional refinement. This influence supports appreciation, meaningful connections and the ability to create balance between desires and responsibilities.",


    personality:
      "Venus enhances charm, creativity and emotional understanding. Personal expression becomes stronger through kindness, appreciation and refined qualities.",


    career:
      "Venus supports professional growth through creativity, collaboration and relationship-building. Success develops when skills are combined with diplomacy and thoughtful presentation.",


    finance:
      "Venus encourages financial improvement through understanding value, balanced choices and responsible appreciation of resources.",


    relationship:
      "Venus strengthens affection, emotional connection and mutual understanding. Relationships grow through respect, kindness and genuine appreciation.",


    health:
      "Venus supports well-being through balance, relaxation and creating a positive emotional environment. Harmony between lifestyle and inner peace becomes important.",


    mind:
      "Venus encourages emotional awareness, creativity and the ability to find beauty and balance in thoughts and experiences.",


    spirituality:
      "Venus supports inner harmony through compassion, gratitude and deeper understanding of love, values and connection.",


    education:
      "Venus supports creative learning, artistic expression and developing knowledge through imagination and appreciation.",


    communication:
      "Venus improves communication through warmth, diplomacy and understanding emotional expressions.",


    ambition:
      "Venus supports meaningful ambitions through creativity, cooperation and building valuable connections.",


    travel:
      "Venus encourages enjoyable experiences, cultural appreciation and learning through meaningful interactions.",


    research:
      "Venus supports exploration of creativity, human values and understanding emotional patterns.",


  },



  neutral: {


    overall:
      "Venus indicates a phase of balancing personal desires, relationships and emotional values through awareness and maturity.",


    personality:
      "Venus highlights personal charm, creativity and the importance of maintaining emotional balance.",


    career:
      "Venus suggests steady progress through cooperation, creativity and maintaining positive professional relationships.",


    finance:
      "Venus encourages awareness of spending patterns and developing a balanced understanding of value and comfort.",


    relationship:
      "Venus supports relationships through patience, communication and mutual respect.",


    health:
      "Venus highlights the importance of balance between comfort, lifestyle choices and personal discipline.",


    mind:
      "Venus encourages emotional reflection and developing a balanced approach toward thoughts and desires.",


    spirituality:
      "Venus supports personal growth through compassion, appreciation and understanding deeper values.",


    education:
      "Venus encourages creative approaches to learning and developing personal talents.",


    communication:
      "Venus supports thoughtful expression and maintaining harmony during interactions.",


    ambition:
      "Venus highlights progress through cooperation, creativity and meaningful goals.",


    travel:
      "Venus indicates learning through experiences, relationships and appreciation of new environments.",


    research:
      "Venus supports exploring creativity, values and human connections through observation.",


  },



  caution: {


    overall:
      "Venus asks for balance between desires and responsibilities. Choices become stronger when guided by awareness and long-term understanding.",


    personality:
      "Venus encourages avoiding dependence on external approval and developing confidence through inner balance.",


    career:
      "Venus advises avoiding decisions based only on comfort or popularity. Professional value grows through consistent effort and purpose.",


    finance:
      "Venus suggests controlling unnecessary expenses and evaluating choices before seeking comfort or luxury.",


    relationship:
      "Venus reminds you to balance emotional expectations with understanding, patience and mutual respect.",


    health:
      "Venus encourages moderation and avoiding excessive comfort-oriented habits that affect balance.",


    mind:
      "Venus suggests avoiding emotional attachment to temporary desires and maintaining clarity in decisions.",


    spirituality:
      "Venus encourages looking beyond external attraction and developing deeper emotional understanding.",


    education:
      "Venus reminds you to combine creativity with discipline and consistent learning.",


    communication:
      "Venus advises balancing charm with honesty and expressing feelings with awareness.",


    ambition:
      "Venus suggests aligning ambitions with meaningful values instead of seeking only recognition.",


    travel:
      "Venus advises maintaining awareness between enjoyment and practical responsibilities during experiences.",


    research:
      "Venus encourages looking beyond appearances and developing deeper understanding through observation.",


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

      area === "relationship"

        ?

        "Venus represents affection, harmony and emotional connection. Its influence develops through understanding, respect and the ability to create meaningful bonds."

        :

      area === "finance"

        ?

        "Venus connects resources with value, appreciation and balanced choices. Financial understanding improves when comfort is guided by awareness."

        :

      area === "career"

        ?

        "Venus influences creativity, cooperation and social intelligence. Professional progress develops through diplomacy, presentation and relationship skills."

        :

      area === "education"

        ?

        "Venus supports creative thinking, artistic expression and learning through appreciation and imagination."

        :

        "Venus represents harmony, creativity, relationships and personal values. Its expression changes according to the life area being explored.",



    advice:

      tone === "caution"

        ?

        "Maintain balance between desires and responsibilities while making thoughtful decisions."

        :

      area === "relationship"

        ?

        "Build connections through kindness, patience and genuine understanding."

        :

      area === "career"

        ?

        "Use creativity, cooperation and communication skills to create meaningful progress."

        :

      area === "finance"

        ?

        "Balance enjoyment with responsibility while making financial decisions."

        :

        "Create harmony through awareness, appreciation and balanced choices.",


  };


}





//////////////////////////////////////////////////////////////
// EXPORT LIBRARY
//////////////////////////////////////////////////////////////

export {

  VENUS_LIBRARY,

};
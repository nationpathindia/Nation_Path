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


    personality:
      "Saturn develops maturity, self-control and inner strength. Personal growth improves through patience, responsibility and learning from experience.",


    career:
      "Saturn supports professional achievement through dedication, structure and perseverance. Long-term success develops through disciplined action and steady improvement.",


    finance:
      "Saturn encourages stable financial progress through planning, responsibility and careful management of resources.",


    relationship:
      "Saturn strengthens relationships through loyalty, maturity and commitment. Strong connections develop through patience and mutual responsibility.",


    health:
      "Saturn supports well-being through discipline, routine and maintaining consistent personal practices.",


    mind:
      "Saturn improves focus, patience and practical thinking. Mental strength develops through experience and thoughtful decisions.",


    spirituality:
      "Saturn encourages inner maturity through reflection, acceptance and deeper understanding of personal lessons.",


    education:
      "Saturn supports deep learning through discipline, concentration and continuous practice. Knowledge develops through persistence.",


    communication:
      "Saturn encourages thoughtful communication through maturity, patience and responsible expression.",


    ambition:
      "Saturn strengthens ambition through endurance, planning and the ability to work steadily toward meaningful goals.",


    responsibility:
      "Saturn enhances the ability to handle duties with seriousness, commitment and practical wisdom.",


    travel:
      "Saturn supports purposeful experiences where patience, planning and responsibility create meaningful growth.",


    research:
      "Saturn encourages detailed investigation, patience and deeper understanding through consistent effort.",


  },



  neutral: {


    overall:
      "Saturn indicates gradual progress through patience, responsibility and learning from experience.",


    personality:
      "Saturn highlights maturity, discipline and the importance of developing inner stability.",


    career:
      "Saturn suggests steady professional development through effort, structure and commitment to improvement.",


    finance:
      "Saturn highlights financial discipline, planning and controlled decision-making.",


    relationship:
      "Saturn encourages relationships built through trust, patience and realistic understanding.",


    health:
      "Saturn emphasizes routine, balance and consistent personal care.",


    mind:
      "Saturn encourages practical thinking, patience and managing challenges with awareness.",


    spirituality:
      "Saturn creates opportunities for deeper understanding through reflection and self-development.",


    education:
      "Saturn supports progress through regular practice, focus and dedication toward learning goals.",


    communication:
      "Saturn supports careful communication where responsibility and clarity create stronger connections.",


    ambition:
      "Saturn highlights the importance of steady effort and long-term planning toward achievement.",


    responsibility:
      "Saturn highlights duties requiring patience, organization and commitment.",


    travel:
      "Saturn suggests meaningful experiences through planning, discipline and purposeful movement.",


    research:
      "Saturn supports exploration through patience, structure and detailed observation.",


  },



  caution: {


    overall:
      "Saturn asks for patience during demanding phases. Progress improves when challenges are approached with discipline rather than frustration.",


    personality:
      "Saturn encourages avoiding excessive seriousness and developing confidence through patience and self-awareness.",


    career:
      "Saturn advises avoiding shortcuts and focusing on steady improvement. Professional growth requires persistence and strategic effort.",


    finance:
      "Saturn suggests careful financial choices and avoiding unnecessary risks. Stability develops through planning and restraint.",


    relationship:
      "Saturn reminds you that strong relationships require patience, understanding and emotional maturity.",


    health:
      "Saturn encourages maintaining routines and avoiding neglect of important personal responsibilities.",


    mind:
      "Saturn suggests reducing negative thinking and focusing on practical solutions with patience.",


    spirituality:
      "Saturn encourages accepting lessons and developing wisdom through reflection and awareness.",


    education:
      "Saturn reminds you that meaningful achievement requires consistency, effort and dedication.",


    communication:
      "Saturn advises balancing seriousness with openness and maintaining flexibility in conversations.",


    ambition:
      "Saturn suggests balancing ambition with patience and avoiding pressure for immediate results.",


    responsibility:
      "Saturn reminds you to handle obligations carefully while maintaining confidence and balance.",


    travel:
      "Saturn advises careful planning and patience during transitions or important journeys.",


    research:
      "Saturn encourages avoiding rushed conclusions and developing understanding through detailed analysis.",


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

      area === "career"

        ?

        "Saturn represents discipline, professional responsibility and long-term achievement. Growth develops through consistency, patience and structured effort."

        :

      area === "finance"

        ?

        "Saturn connects stability with planning, restraint and responsible management. Financial strength develops through careful decisions."

        :

      area === "education"

        ?

        "Saturn represents dedication, concentration and learning through persistence. Knowledge grows through regular practice."

        :

      area === "relationship"

        ?

        "Saturn influences commitment, loyalty and maturity in connections. Strong relationships develop through patience and understanding."

        :

        "Saturn represents discipline, responsibility, patience and long-term development. Its expression changes according to the life area being explored.",



    advice:

      tone === "caution"

        ?

        "Stay patient, maintain discipline and focus on gradual improvement."

        :

      area === "career"

        ?

        "Build progress through consistency, responsibility and long-term planning."

        :

      area === "finance"

        ?

        "Follow disciplined financial habits and prioritize stability over quick results."

        :

      "Continue developing patience, discipline and strong foundations for future growth.",


  };


}





//////////////////////////////////////////////////////////////
// EXPORT LIBRARY
//////////////////////////////////////////////////////////////

export {

  SATURN_LIBRARY,

};
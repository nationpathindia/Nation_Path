//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// JUPITER LANGUAGE INTELLIGENCE
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
// JUPITER LITERATURE DATABASE
//////////////////////////////////////////////////////////////

const JUPITER_LIBRARY = {


  positive: {


    overall:
      "Jupiter's expansive influence encourages growth through wisdom, learning and meaningful opportunities. This phase supports broader vision and positive development.",


    career:
      "Jupiter supports professional expansion through knowledge, experience and strategic decisions. Growth can emerge when ambition is combined with guidance and continuous learning.",


    finance:
      "Jupiter encourages financial growth through thoughtful planning, knowledge and long-term vision. Prosperity improves when opportunities are approached with discipline and awareness.",


    relationship:
      "Jupiter promotes mature connections built on understanding, respect and shared growth. Relationships benefit through patience, generosity and emotional wisdom.",


    education:
      "Jupiter strengthens learning, curiosity and the desire to gain deeper understanding. This influence supports studies, guidance and intellectual development.",


    spirituality:
      "Jupiter enhances inner exploration, higher understanding and connection with deeper values. Reflection and wisdom become important sources of growth.",


    health:
      "Jupiter encourages balanced improvement through awareness, positive habits and a broader understanding of personal well-being.",


    communication:
      "Jupiter supports meaningful expression through knowledge, clarity and thoughtful communication.",


  },



  neutral: {


    overall:
      "Jupiter indicates gradual development through experience, patience and continuous learning. Progress grows through awareness and practical understanding.",


    career:
      "Jupiter suggests steady professional development through skill improvement, responsibility and better decision-making.",


    finance:
      "Jupiter highlights the importance of balanced financial choices, planning and responsible growth.",


    relationship:
      "Jupiter encourages relationships to develop through maturity, understanding and shared responsibilities.",


    education:
      "Jupiter supports learning through consistency, curiosity and willingness to explore new perspectives.",


    spirituality:
      "Jupiter creates opportunities for reflection, personal understanding and gradual inner growth.",


    health:
      "Jupiter encourages maintaining balance through mindful choices and consistent improvement.",


    communication:
      "Jupiter supports thoughtful communication where experience and knowledge improve expression.",


  },



  caution: {


    overall:
      "Jupiter asks for balance between optimism and practical judgment. Growth becomes stronger when confidence is guided by awareness.",


    career:
      "Jupiter advises avoiding excessive confidence in professional decisions. Careful planning and realistic evaluation create stronger progress.",


    finance:
      "Jupiter suggests reviewing financial choices carefully and avoiding unnecessary risks created by overconfidence.",


    relationship:
      "Jupiter encourages maintaining humility and understanding to avoid expectations becoming a source of imbalance.",


    education:
      "Jupiter reminds you to remain disciplined and focused instead of depending only on natural ability.",


    spirituality:
      "Jupiter encourages genuine understanding and avoids following beliefs without personal reflection.",


    health:
      "Jupiter suggests maintaining moderation and avoiding excess while building healthier routines.",


    communication:
      "Jupiter advises balancing confidence with listening and openness to different perspectives.",


  },


};




//////////////////////////////////////////////////////////////
// JUPITER INTERPRETER
//////////////////////////////////////////////////////////////

export function generateJupiterLanguage(

  area:
    LanguageLifeArea = "overall",


  tone:
    LanguageTone = "neutral"


): PlanetLanguageOutput {


  const toneLibrary =

    JUPITER_LIBRARY[tone];



  const statement =

    toneLibrary[area]

    ??

    toneLibrary.overall;




  return {


    statement,


    explanation:

  area === "career"

    ?

    "Jupiter highlights growth through experience, guidance and strategic vision. Professional progress improves when knowledge is combined with responsible action."

    :

  area === "finance"

    ?

    "Jupiter connects prosperity with wisdom, planning and long-term thinking. Financial growth becomes stronger through awareness and disciplined choices."

    :

  area === "education"

    ?

    "Jupiter strengthens curiosity, learning and the search for deeper understanding. Knowledge becomes a foundation for future development."

    :

  area === "spirituality"

    ?

    "Jupiter encourages reflection, wisdom and connection with deeper values. Growth comes through understanding and inner awareness."

    :

    "Jupiter reflects expansion, wisdom and meaningful development. Its influence encourages learning, awareness and balanced growth.",



advice:

  tone === "caution"

    ?

    "Balance optimism with practical evaluation before making important decisions."

    :

  area === "career"

    ?

    "Use knowledge, mentorship and strategic thinking to create steady professional progress."

    :

  area === "finance"

    ?

    "Make thoughtful financial decisions by combining opportunity with discipline."

    :

  area === "education"

    ?

    "Continue learning consistently and apply knowledge with patience and curiosity."

    :

    "Continue learning, improving and applying wisdom in daily choices.",
  };


}




//////////////////////////////////////////////////////////////
// EXPORT LIBRARY
//////////////////////////////////////////////////////////////

export {

  JUPITER_LIBRARY,

};
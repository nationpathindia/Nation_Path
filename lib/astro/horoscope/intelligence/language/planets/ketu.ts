//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// KETU LANGUAGE INTELLIGENCE
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
// KETU LITERATURE DATABASE
//////////////////////////////////////////////////////////////

const KETU_LIBRARY = {


  positive: {


    overall:
      "Ketu encourages inner awareness, deep understanding and transformation through reflection. This influence supports wisdom beyond external achievements.",


    personality:
      "Ketu strengthens intuition, independence and the ability to understand experiences from a deeper perspective.",


    career:
      "Ketu supports specialized knowledge, research-oriented work and growth through focused expertise.",


    finance:
      "Ketu encourages a balanced approach toward material goals and wiser understanding of long-term values.",


    relationship:
      "Ketu brings depth to relationships by encouraging understanding beyond surface-level connections.",


    health:
      "Ketu supports awareness of inner balance, mindful habits and understanding personal needs.",


    mind:
      "Ketu enhances intuition, observation and the ability to look beyond obvious patterns.",


    spirituality:
      "Ketu strengthens spiritual awareness, meditation, inner exploration and connection with deeper wisdom.",


    education:
      "Ketu supports advanced learning, research and discovering hidden knowledge through dedication.",


    travel:
      "Ketu encourages meaningful journeys that create reflection, learning and inner transformation.",


    research:
      "Ketu enhances investigation, analysis and interest in hidden or unexplored subjects.",


    communication:
      "Ketu encourages thoughtful expression, silence when needed and communication with deeper meaning.",


    ambition:
      "Ketu transforms ambition by shifting focus from external recognition toward meaningful purpose.",


  },



  neutral: {


    overall:
      "Ketu indicates a period of reflection, learning and understanding deeper aspects of personal growth.",


    personality:
      "Ketu highlights independence, intuition and the importance of inner awareness.",


    career:
      "Ketu suggests growth through specialization, patience and developing unique abilities.",


    finance:
      "Ketu encourages understanding priorities and maintaining balance between material goals and personal values.",


    relationship:
      "Ketu highlights the importance of emotional understanding and respecting personal space.",


    health:
      "Ketu emphasizes awareness, mindfulness and maintaining inner balance.",


    mind:
      "Ketu encourages observation, reflection and reducing unnecessary distractions.",


    spirituality:
      "Ketu supports self-discovery, reflection and deeper understanding of personal beliefs.",


    education:
      "Ketu encourages focused learning and exploring subjects beyond ordinary understanding.",


    travel:
      "Ketu indicates experiences that encourage reflection and personal discovery.",


    research:
      "Ketu supports exploration, investigation and deeper analysis of hidden information.",


    communication:
      "Ketu encourages meaningful communication with awareness and thoughtfulness.",


    ambition:
      "Ketu highlights the importance of aligning goals with deeper purpose and values.",


  },



  caution: {


    overall:
      "Ketu asks for balance between detachment and responsibility. Inner growth becomes meaningful when connected with practical awareness.",


    personality:
      "Ketu advises avoiding excessive isolation and maintaining healthy connections with others.",


    career:
      "Ketu suggests avoiding lack of direction and maintaining commitment toward important responsibilities.",


    finance:
      "Ketu reminds you to avoid ignoring practical financial matters while seeking deeper priorities.",


    relationship:
      "Ketu encourages avoiding emotional distance and maintaining understanding within relationships.",


    health:
      "Ketu suggests paying attention to physical needs while focusing on inner development.",


    mind:
      "Ketu advises avoiding excessive withdrawal and maintaining clarity in thoughts and decisions.",


    spirituality:
      "Ketu encourages balancing spiritual exploration with daily responsibilities.",


    education:
      "Ketu suggests maintaining consistency and completing learning journeys patiently.",


    travel:
      "Ketu advises awareness during unfamiliar experiences and maintaining practical planning.",


    research:
      "Ketu encourages patience and verification while exploring complex subjects.",


    communication:
      "Ketu advises expressing thoughts clearly instead of relying only on silence or assumptions.",


    ambition:
      "Ketu reminds you to balance detachment with practical goals and responsibilities.",


  },


};




//////////////////////////////////////////////////////////////
// KETU INTERPRETER
//////////////////////////////////////////////////////////////

export function generateKetuLanguage(

  area:
    LanguageLifeArea = "overall",


  tone:
    LanguageTone = "neutral"


): PlanetLanguageOutput {


  const toneLibrary =

    KETU_LIBRARY[tone];



  const statement =

    toneLibrary[area]

    ??

    toneLibrary.overall;




  return {


    statement,


    explanation:

      "Ketu represents intuition, spirituality, research and inner transformation. Its expression changes according to the life area being explored.",



    advice:

      tone === "caution"

        ?

        "Maintain balance between inner reflection and practical responsibilities."

        :

        "Use awareness, intuition and deeper understanding to guide your journey.",


  };


}




//////////////////////////////////////////////////////////////
// EXPORT LIBRARY
//////////////////////////////////////////////////////////////

export {

  KETU_LIBRARY,

};
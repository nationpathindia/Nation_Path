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
      "Ketu encourages inner awareness, deep understanding and transformation through reflection. This influence supports wisdom beyond external achievements and develops awareness of deeper purpose.",


    personality:
      "Ketu strengthens intuition, independence and inner observation. Personal growth develops through self-awareness and understanding unique experiences.",


    career:
      "Ketu supports specialized knowledge, research-oriented work and growth through expertise, investigation and focused abilities.",


    finance:
      "Ketu encourages a balanced relationship with material goals by developing awareness of priorities and long-term values.",


    relationship:
      "Ketu brings depth to relationships by encouraging understanding beyond surface connections and appreciating emotional awareness.",


    health:
      "Ketu supports mindful living, inner balance and awareness of personal needs through reflection and conscious habits.",


    mind:
      "Ketu enhances intuition, observation and the ability to recognize deeper patterns beyond ordinary thinking.",


    spirituality:
      "Ketu strengthens spiritual awareness, meditation and inner exploration. This influence supports deeper understanding of consciousness and purpose.",


    education:
      "Ketu supports advanced learning, research and discovering hidden knowledge through dedication and curiosity.",


    communication:
      "Ketu encourages meaningful expression, thoughtful silence and communication guided by deeper understanding.",


    ambition:
      "Ketu transforms ambition by shifting focus from external recognition toward meaningful contribution and inner purpose.",


    travel:
      "Ketu encourages journeys that create reflection, learning and personal transformation through new experiences.",


    research:
      "Ketu enhances investigation, analysis and interest in hidden knowledge, patterns and unexplored subjects.",


  },



  neutral: {


    overall:
      "Ketu indicates a period of reflection, learning and understanding deeper aspects of personal growth.",


    personality:
      "Ketu highlights independence, intuition and developing awareness of personal thoughts and experiences.",


    career:
      "Ketu suggests growth through specialization, patience and developing unique abilities over time.",


    finance:
      "Ketu encourages understanding priorities and maintaining balance between material needs and personal values.",


    relationship:
      "Ketu highlights emotional understanding, personal space and deeper awareness within connections.",


    health:
      "Ketu emphasizes mindfulness, awareness and maintaining inner balance.",


    mind:
      "Ketu encourages reflection, observation and reducing unnecessary distractions.",


    spirituality:
      "Ketu supports self-discovery, reflection and deeper understanding of personal beliefs.",


    education:
      "Ketu encourages focused learning and exploring subjects beyond ordinary perspectives.",


    communication:
      "Ketu supports thoughtful communication where awareness and meaning become important.",


    ambition:
      "Ketu highlights aligning goals with deeper purpose rather than only external achievement.",


    travel:
      "Ketu indicates experiences that encourage reflection, learning and personal discovery.",


    research:
      "Ketu supports exploration, investigation and deeper analysis of complex information.",


  },



  caution: {


    overall:
      "Ketu asks for balance between detachment and responsibility. Inner growth becomes meaningful when connected with practical awareness.",


    personality:
      "Ketu advises avoiding excessive isolation and maintaining healthy emotional connections with others.",


    career:
      "Ketu suggests avoiding uncertainty and maintaining commitment toward important responsibilities and goals.",


    finance:
      "Ketu reminds you to maintain practical financial awareness while exploring deeper priorities.",


    relationship:
      "Ketu encourages avoiding emotional distance and creating balance between independence and connection.",


    health:
      "Ketu suggests paying attention to physical needs while focusing on inner development.",


    mind:
      "Ketu advises avoiding excessive withdrawal and maintaining clarity in thoughts and decisions.",


    spirituality:
      "Ketu encourages balancing spiritual exploration with everyday responsibilities and practical awareness.",


    education:
      "Ketu reminds you to maintain consistency and complete learning paths with patience.",


    communication:
      "Ketu advises expressing thoughts clearly instead of depending only on silence or assumptions.",


    ambition:
      "Ketu reminds you to balance detachment with practical goals and responsibilities.",


    travel:
      "Ketu advises careful awareness during unfamiliar experiences and maintaining practical planning.",


    research:
      "Ketu encourages patience, verification and careful analysis while exploring complex subjects.",


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

      area === "research"

        ?

        "Ketu represents investigation, hidden knowledge and deeper analysis. Its influence supports exploring subjects beyond ordinary understanding."

        :

      area === "spirituality"

        ?

        "Ketu represents inner transformation, awareness and spiritual understanding. Growth develops through reflection and self-discovery."

        :

      area === "education"

        ?

        "Ketu supports focused learning, specialized knowledge and exploring deeper aspects of information."

        :

      area === "relationship"

        ?

        "Ketu influences emotional depth, independence and understanding beyond surface-level connections."

        :

        "Ketu represents intuition, spirituality, research and inner transformation. Its expression changes according to the life area being explored.",



    advice:

      tone === "caution"

        ?

        "Maintain balance between inner reflection and practical responsibilities."

        :

      area === "research"

        ?

        "Explore deeply, verify information and develop understanding through patience."

        :

      area === "spirituality"

        ?

        "Use reflection and awareness while maintaining balance with daily responsibilities."

        :

        "Use intuition, awareness and deeper understanding to guide decisions.",


  };


}





//////////////////////////////////////////////////////////////
// EXPORT LIBRARY
//////////////////////////////////////////////////////////////

export {

  KETU_LIBRARY,

};
//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// MERCURY LANGUAGE INTELLIGENCE
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
// MERCURY LITERATURE DATABASE
//////////////////////////////////////////////////////////////

const MERCURY_LIBRARY = {


  positive: {


    overall:
      "Mercury strengthens intelligence, adaptability and communication skills. This influence supports learning, analysis and practical decision-making.",


    personality:
      "Mercury enhances curiosity, observation and the ability to understand situations through logic and awareness.",


    career:
      "Mercury supports professional growth through communication, analytical thinking and strategic problem-solving. Skills and knowledge become important assets.",


    finance:
      "Mercury encourages financial progress through planning, calculations and intelligent decision-making.",


    relationship:
      "Mercury improves relationships through open communication, understanding and thoughtful expression.",


    health:
      "Mercury supports well-being through awareness, balanced thinking and better management of daily routines.",


    mind:
      "Mercury enhances mental clarity, curiosity and the ability to process information effectively.",


    education:
      "Mercury supports learning, memory and intellectual development through observation and consistent practice.",


    communication:
      "Mercury strengthens expression, conversation skills and the ability to share ideas clearly.",


    travel:
      "Mercury supports movement, networking and learning through new experiences and interactions.",


    research:
      "Mercury encourages investigation, analysis and discovering deeper understanding through information.",


  },



  neutral: {


    overall:
      "Mercury indicates a period of learning, communication and adapting to changing situations with awareness.",


    personality:
      "Mercury highlights curiosity, flexibility and the importance of balanced thinking.",


    career:
      "Mercury suggests gradual improvement through skill development, communication and practical knowledge.",


    finance:
      "Mercury encourages careful planning and logical evaluation before financial decisions.",


    relationship:
      "Mercury supports relationships through honest conversations and better understanding.",


    health:
      "Mercury highlights the connection between mental balance and daily habits.",


    mind:
      "Mercury encourages observation, reflection and improving mental clarity.",


    education:
      "Mercury supports steady learning through curiosity and consistent effort.",


    communication:
      "Mercury encourages thoughtful expression and effective exchange of ideas.",


    travel:
      "Mercury indicates growth through experiences, connections and new information.",


    research:
      "Mercury supports exploration through analysis, questioning and attention to detail.",


  },



  caution: {


    overall:
      "Mercury asks for careful communication and thoughtful decisions. Mental activity becomes stronger when guided by patience and clarity.",


    personality:
      "Mercury encourages avoiding excessive overthinking and maintaining balance between logic and intuition.",


    career:
      "Mercury advises reviewing details carefully and avoiding rushed decisions in professional matters.",


    finance:
      "Mercury suggests avoiding impulsive choices and focusing on accurate evaluation before financial commitments.",


    relationship:
      "Mercury reminds you that communication requires patience, listening and emotional understanding.",


    health:
      "Mercury encourages reducing mental stress and creating better balance between activity and rest.",


    mind:
      "Mercury suggests managing excessive thoughts and maintaining mental focus.",


    education:
      "Mercury advises improving concentration and avoiding distractions during learning.",


    communication:
      "Mercury encourages thinking before speaking and maintaining clarity during important discussions.",


    travel:
      "Mercury suggests careful planning and attention to details during movement or transitions.",


    research:
      "Mercury advises verifying information carefully and avoiding conclusions without proper analysis.",


  },


};




//////////////////////////////////////////////////////////////
// MERCURY INTERPRETER
//////////////////////////////////////////////////////////////

export function generateMercuryLanguage(

  area:
    LanguageLifeArea = "overall",


  tone:
    LanguageTone = "neutral"


): PlanetLanguageOutput {


  const toneLibrary =

    MERCURY_LIBRARY[tone];



  const statement =

    toneLibrary[area]

    ??

    toneLibrary.overall;



return {


  statement,


  explanation:

    area === "career"

      ?

      "Mercury highlights professional intelligence, strategic thinking and the ability to solve problems through communication and analysis."

      :

    area === "finance"

      ?

      "Mercury connects financial progress with planning, calculation and informed decisions. Awareness becomes an important strength."

      :

    area === "education"

      ?

      "Mercury represents curiosity, learning ability and intellectual development. Knowledge grows through observation and consistent practice."

      :

    area === "communication"

      ?

      "Mercury influences expression, understanding and the exchange of ideas. Clear communication becomes a valuable personal strength."

      :

    area === "research"

      ?

      "Mercury supports investigation, analysis and discovering deeper patterns through information and logical thinking."

      :

      "Mercury represents intelligence, adaptability and learning ability. Its influence develops through awareness, observation and practical thinking.",



  advice:

    tone === "caution"

      ?

      "Slow down, verify information and communicate with greater awareness."

      :

    area === "career"

      ?

      "Use analytical skills, communication and strategic thinking to create professional growth."

      :

    area === "education"

      ?

      "Continue learning with curiosity, consistency and practical application of knowledge."

      :

    area === "finance"

      ?

      "Combine planning with careful analysis before making important financial decisions."

      :

    area === "communication"

      ?

      "Express ideas clearly while maintaining patience and understanding."

      :

      "Use knowledge, observation and communication skills to create better outcomes.",


};

}




//////////////////////////////////////////////////////////////
// EXPORT LIBRARY
//////////////////////////////////////////////////////////////

export {

  MERCURY_LIBRARY,

};
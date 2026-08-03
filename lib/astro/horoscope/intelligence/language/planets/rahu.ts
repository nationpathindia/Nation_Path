//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// RAHU LANGUAGE INTELLIGENCE v2
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
// RAHU LITERATURE DATABASE
//////////////////////////////////////////////////////////////

const RAHU_LIBRARY = {


  positive: {


    overall:
      "Rahu expands curiosity, ambition and the desire to explore unexplored possibilities. This influence supports innovation, transformation and growth through unconventional experiences.",


    personality:
      "Rahu strengthens originality, imagination and independent thinking. Personal evolution develops through exploring different perspectives and discovering unique strengths.",


    career:
      "Rahu supports professional expansion through technology, innovation and strategic thinking. Growth can emerge when ambition is combined with awareness and ethical direction.",


    finance:
      "Rahu encourages exploring new financial opportunities through research, creativity and calculated decisions. Prosperity improves when ambition is guided by practical evaluation.",


    relationship:
      "Rahu creates unique relationship experiences by bringing different perspectives and encouraging deeper understanding beyond traditional expectations.",


    health:
      "Rahu supports awareness of lifestyle patterns and encourages creating balance while adapting to changing circumstances.",


    mind:
      "Rahu enhances imagination, curiosity and the ability to think beyond conventional boundaries. This influence supports discovering new ideas and possibilities.",


    spirituality:
      "Rahu encourages exploration of hidden knowledge, transformation and deeper understanding beyond ordinary experiences.",


    education:
      "Rahu supports advanced learning, technology-based knowledge and exploration of uncommon subjects through curiosity and experimentation.",


    travel:
      "Rahu creates growth through unfamiliar environments, foreign connections and experiences that expand awareness.",


    research:
      "Rahu strengthens investigation, analysis and the ability to discover hidden patterns through deeper exploration.",


    ambition:
      "Rahu intensifies ambition and encourages pursuing significant goals through strategy, innovation and determination.",


    communication:
      "Rahu supports modern communication, networking and expressing unconventional ideas with creativity.",


  },



  neutral: {


    overall:
      "Rahu indicates a phase of exploration, adaptation and learning through experiences that challenge familiar patterns.",


    personality:
      "Rahu highlights curiosity, independence and the desire to understand different possibilities before choosing a direction.",


    career:
      "Rahu suggests professional growth through adaptability, technology and understanding changing environments.",


    finance:
      "Rahu encourages evaluating opportunities carefully and balancing excitement with practical judgment.",


    relationship:
      "Rahu highlights the importance of clarity, honesty and understanding differences within connections.",


    health:
      "Rahu emphasizes awareness of habits and maintaining stability during changing situations.",


    mind:
      "Rahu encourages observing thoughts carefully and maintaining clarity while handling new influences.",


    spirituality:
      "Rahu supports learning through experiences that expand awareness and challenge existing beliefs.",


    education:
      "Rahu encourages exploring new fields of knowledge and developing unconventional learning approaches.",


    travel:
      "Rahu highlights learning through movement, cultural experiences and unfamiliar environments.",


    research:
      "Rahu supports deeper investigation, analysis and curiosity toward complex subjects.",


    ambition:
      "Rahu highlights strong desires while encouraging patience, planning and balanced decision-making.",


    communication:
      "Rahu encourages adapting expression according to changing social and technological environments.",


  },



  caution: {


    overall:
      "Rahu asks for awareness while following desires and ambitions. Growth becomes meaningful when curiosity is balanced with discipline and clarity.",


    personality:
      "Rahu advises avoiding confusion between genuine goals and temporary attractions. Self-awareness helps create better direction.",


    career:
      "Rahu suggests avoiding shortcuts and focusing on sustainable progress through ethical choices and consistent effort.",


    finance:
      "Rahu encourages careful evaluation before taking risks influenced by excitement or unrealistic expectations.",


    relationship:
      "Rahu reminds you to maintain honesty and avoid misunderstandings created by assumptions or unrealistic desires.",


    health:
      "Rahu suggests maintaining balance and avoiding extreme habits while adapting to changing circumstances.",


    mind:
      "Rahu encourages reducing distractions and maintaining mental clarity during periods of rapid change.",


    spirituality:
      "Rahu advises seeking deeper understanding instead of following curiosity without proper reflection.",


    education:
      "Rahu reminds you to maintain focus and complete learning goals with discipline.",


    travel:
      "Rahu advises careful planning and awareness while exploring unfamiliar situations.",


    research:
      "Rahu encourages verification and patience before accepting conclusions from complex information.",


    ambition:
      "Rahu reminds you to balance strong desires with realistic planning and responsible action.",


    communication:
      "Rahu advises avoiding confusion and choosing words carefully during important conversations.",


  },


};



//////////////////////////////////////////////////////////////
// RAHU INTERPRETER
//////////////////////////////////////////////////////////////

export function generateRahuLanguage(

  area:
    LanguageLifeArea = "overall",


  tone:
    LanguageTone = "neutral"


): PlanetLanguageOutput {


  const toneLibrary =
    RAHU_LIBRARY[tone];


  const statement =
    toneLibrary[area]
    ??
    toneLibrary.overall;



  return {


    statement,



    explanation:

      area === "career"

      ?

      "Rahu influences ambition, innovation and adaptability in professional environments. Growth develops through strategic thinking and understanding new opportunities."

      :

      area === "research"

      ?

      "Rahu represents curiosity, investigation and discovering hidden patterns. Knowledge expands through deeper exploration and analysis."

      :

      area === "spirituality"

      ?

      "Rahu encourages transformation through unusual experiences and deeper questioning of existing beliefs."

      :

      "Rahu represents innovation, ambition and transformation. Its influence develops through exploration, awareness and learning from new experiences.",



    advice:

      tone === "caution"

      ?

      "Maintain clarity, patience and discipline while exploring new opportunities."

      :

      area === "career"

      ?

      "Use innovation and strategic thinking while maintaining ethical and balanced decisions."

      :

      area === "finance"

      ?

      "Evaluate opportunities carefully and combine ambition with practical planning."

      :

      "Explore new possibilities while maintaining awareness and responsible choices.",


  };


}



//////////////////////////////////////////////////////////////
// EXPORT LIBRARY
//////////////////////////////////////////////////////////////

export {

  RAHU_LIBRARY,

};
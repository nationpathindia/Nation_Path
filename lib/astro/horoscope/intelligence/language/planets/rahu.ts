//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// RAHU LANGUAGE INTELLIGENCE
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
      "Rahu activates innovation, ambition and unconventional thinking. This influence supports exploration of new opportunities and different paths of growth.",


    personality:
      "Rahu encourages originality, curiosity and the ability to think beyond traditional boundaries.",


    career:
      "Rahu supports professional growth through innovation, technology, strategy and opportunities connected with new environments.",


    finance:
      "Rahu encourages exploring new financial possibilities through creativity, research and calculated decisions.",


    relationship:
      "Rahu brings unique experiences and encourages understanding different perspectives within relationships.",


    health:
      "Rahu supports awareness of lifestyle patterns and encourages creating balance through conscious choices.",


    mind:
      "Rahu expands imagination, curiosity and the desire to discover new ideas and possibilities.",


    spirituality:
      "Rahu encourages deeper exploration of hidden knowledge, transformation and unconventional wisdom.",


    education:
      "Rahu supports learning through experimentation, technology and exploring advanced subjects.",


    travel:
      "Rahu creates possibilities through foreign connections, new environments and unfamiliar experiences.",


    research:
      "Rahu strengthens investigation, curiosity and the ability to explore complex subjects.",


    ambition:
      "Rahu intensifies ambition and encourages pursuing unique goals through strategic thinking.",


    communication:
      "Rahu supports modern communication, networking and expressing innovative ideas.",


  },



  neutral: {


    overall:
      "Rahu indicates a phase of exploration, change and learning through unfamiliar experiences.",


    personality:
      "Rahu highlights curiosity, independence and the desire to discover different possibilities.",


    career:
      "Rahu suggests growth through adaptability, technology and understanding changing professional environments.",


    finance:
      "Rahu encourages careful evaluation of opportunities and avoiding decisions based only on attraction.",


    relationship:
      "Rahu highlights the importance of understanding differences and maintaining clarity in connections.",


    health:
      "Rahu emphasizes awareness of habits and maintaining balance in changing circumstances.",


    mind:
      "Rahu encourages observing thoughts carefully and maintaining clarity during periods of change.",


    spirituality:
      "Rahu supports learning through experiences that challenge existing beliefs and perspectives.",


    education:
      "Rahu encourages exploration of new subjects and unconventional learning approaches.",


    travel:
      "Rahu highlights growth through movement, cultural experiences and new environments.",


    research:
      "Rahu supports deeper investigation and curiosity toward hidden information.",


    ambition:
      "Rahu highlights strong desires while encouraging thoughtful planning and direction.",


    communication:
      "Rahu encourages adapting communication methods according to changing environments.",


  },



  caution: {


    overall:
      "Rahu asks for awareness while pursuing desires. Growth becomes meaningful when ambition is balanced with clarity and discipline.",


    personality:
      "Rahu advises avoiding confusion between genuine goals and temporary attractions.",


    career:
      "Rahu suggests avoiding shortcuts and focusing on ethical growth through consistent effort.",


    finance:
      "Rahu encourages careful analysis before taking risks based on excitement or uncertainty.",


    relationship:
      "Rahu reminds you to maintain honesty and clarity instead of assumptions or unrealistic expectations.",


    health:
      "Rahu suggests avoiding imbalance and paying attention to lifestyle choices.",


    mind:
      "Rahu encourages reducing distractions and maintaining mental clarity during rapid changes.",


    spirituality:
      "Rahu advises seeking wisdom beyond curiosity and avoiding misleading influences.",


    education:
      "Rahu suggests maintaining focus and completing learning goals with discipline.",


    travel:
      "Rahu advises careful planning and awareness while exploring unfamiliar situations.",


    research:
      "Rahu encourages verifying information carefully before accepting conclusions.",


    ambition:
      "Rahu reminds you to balance strong desires with patience and realistic planning.",


    communication:
      "Rahu advises avoiding misunderstandings and choosing words with greater awareness.",


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

      "Rahu represents innovation, ambition, transformation and experiences beyond traditional boundaries. Its expression changes according to the life area being explored.",



    advice:

      tone === "caution"

        ?

        "Maintain clarity, patience and awareness while exploring new possibilities."

        :

        "Use innovation and ambition with discipline to create meaningful progress.",


  };


}




//////////////////////////////////////////////////////////////
// EXPORT LIBRARY
//////////////////////////////////////////////////////////////

export {

  RAHU_LIBRARY,

};
//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// MARS LANGUAGE INTELLIGENCE
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
// MARS LITERATURE DATABASE
//////////////////////////////////////////////////////////////

const MARS_LIBRARY = {


  positive: {


    overall:
      "Mars activates courage, determination and the ability to take meaningful action. This influence supports confidence, initiative and focused progress.",


    personality:
      "Mars strengthens confidence, independence and the willingness to face challenges with determination.",


    career:
      "Mars supports career advancement through initiative, courage and focused effort. Success develops when energy is directed toward constructive goals.",


    finance:
      "Mars encourages financial progress through decisive action, calculated risks and strong motivation to achieve goals.",


    relationship:
      "Mars brings passion, protection and strong emotional energy. Relationships improve when strength is balanced with patience.",


    health:
      "Mars supports vitality, physical energy and active efforts toward maintaining strength and discipline.",


    mind:
      "Mars enhances determination, focus and the ability to act decisively during important situations.",


    spirituality:
      "Mars encourages inner strength, discipline and courage to overcome personal limitations.",


    education:
      "Mars supports competitive learning, determination and the drive to achieve challenging goals.",


    ambition:
      "Mars strengthens ambition, motivation and the ability to transform intentions into action.",


    communication:
      "Mars supports direct expression, confidence and the courage to communicate clearly.",


  },



  neutral: {


    overall:
      "Mars indicates a period where focused action, discipline and balanced effort can create progress.",


    personality:
      "Mars highlights personal drive, independence and the importance of managing energy wisely.",


    career:
      "Mars suggests progress through initiative, practical effort and maintaining focus on objectives.",


    finance:
      "Mars encourages careful action and balanced decisions while pursuing financial goals.",


    relationship:
      "Mars highlights passion and strong feelings while encouraging patience and understanding.",


    health:
      "Mars emphasizes maintaining energy through discipline, activity and balanced routines.",


    mind:
      "Mars encourages focused thinking and directing energy toward productive outcomes.",


    spirituality:
      "Mars supports personal transformation through courage, discipline and self-control.",


    education:
      "Mars encourages determination and consistent effort toward learning goals.",


    ambition:
      "Mars highlights the importance of directing motivation through patience and strategy.",


    communication:
      "Mars supports confident expression while maintaining awareness of tone and timing.",


  },



  caution: {


    overall:
      "Mars asks for control over impulsive reactions. Strength becomes more effective when guided by patience and awareness.",


    personality:
      "Mars encourages balancing confidence with patience and avoiding unnecessary conflicts.",


    career:
      "Mars advises controlling impatience and directing competitive energy toward productive results.",


    finance:
      "Mars suggests avoiding rushed financial decisions and evaluating risks carefully.",


    relationship:
      "Mars reminds you to balance passion with understanding and avoid reacting emotionally.",


    health:
      "Mars encourages managing stress, excessive activity and impulsive habits through discipline.",


    mind:
      "Mars suggests calming restless thoughts and focusing energy on meaningful priorities.",


    spirituality:
      "Mars encourages transforming aggression into courage, discipline and inner strength.",


    education:
      "Mars advises maintaining patience and consistency instead of relying only on motivation.",


    ambition:
      "Mars suggests balancing strong desires with strategy and long-term planning.",


    communication:
      "Mars advises choosing words carefully and avoiding unnecessary confrontation.",


  },


};




//////////////////////////////////////////////////////////////
// MARS INTERPRETER
//////////////////////////////////////////////////////////////

export function generateMarsLanguage(

  area:
    LanguageLifeArea = "overall",


  tone:
    LanguageTone = "neutral"


): PlanetLanguageOutput {


  const toneLibrary =

    MARS_LIBRARY[tone];



  const statement =

    toneLibrary[area]

    ??

    toneLibrary.overall;




  return {


    statement,


    explanation:

      "Mars represents energy, courage, action and determination. Its expression changes according to the life area being explored.",



    advice:

      tone === "caution"

        ?

        "Channel energy carefully and allow patience to guide important actions."

        :

        "Use determination and courage while maintaining balance and awareness.",


  };


}




//////////////////////////////////////////////////////////////
// EXPORT LIBRARY
//////////////////////////////////////////////////////////////

export {

  MARS_LIBRARY,

};
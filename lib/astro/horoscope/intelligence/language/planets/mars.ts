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
      "Mars activates courage, determination and purposeful action. This influence supports initiative, confidence and the ability to move forward with focus.",


    personality:
      "Mars strengthens independence, confidence and the ability to face challenges with determination and resilience.",


    career:
      "Mars supports professional progress through initiative, leadership and focused effort. Results improve when motivation is directed toward meaningful goals.",


    finance:
      "Mars encourages financial progress through decisive thinking, disciplined action and practical management of opportunities.",


    relationship:
      "Mars brings passion, loyalty and protective energy. Relationships grow stronger when strength is balanced with understanding.",


    health:
      "Mars supports physical vitality, discipline and active efforts toward maintaining strength and well-being.",


    mind:
      "Mars enhances focus, determination and the ability to make clear decisions during important situations.",


    spirituality:
      "Mars encourages inner strength, discipline and courage to overcome personal limitations.",


    education:
      "Mars supports competitive learning, persistence and the motivation to achieve challenging objectives.",


    ambition:
      "Mars strengthens ambition and the ability to transform ideas into consistent action.",


    communication:
      "Mars supports direct expression, confidence and the courage to communicate with clarity.",


    travel:
      "Mars supports adventurous experiences, exploration and confidence while adapting to new environments.",


    research:
      "Mars encourages investigation, determination and focused effort toward discovering deeper insights.",


  },




  neutral: {


    overall:
      "Mars indicates a phase where focused effort, discipline and balanced action can create gradual progress.",


    personality:
      "Mars highlights personal drive, independence and the importance of managing motivation wisely.",


    career:
      "Mars suggests progress through initiative, practical effort and maintaining focus on important objectives.",


    finance:
      "Mars encourages thoughtful decisions and controlled effort while pursuing financial goals.",


    relationship:
      "Mars highlights passion and strong emotions while encouraging patience and mutual understanding.",


    health:
      "Mars emphasizes maintaining physical balance through activity, discipline and healthy routines.",


    mind:
      "Mars encourages focused thinking and directing attention toward productive outcomes.",


    spirituality:
      "Mars supports personal transformation through discipline, courage and self-control.",


    education:
      "Mars encourages consistent effort, determination and active participation in learning.",


    ambition:
      "Mars highlights the importance of combining motivation with planning and patience.",


    communication:
      "Mars supports confident expression while maintaining awareness of timing and approach.",


    travel:
      "Mars encourages learning through movement, experiences and adapting to new situations.",


    research:
      "Mars supports focused observation and persistent effort while exploring complex subjects.",


  },




  caution: {


    overall:
      "Mars asks for control over impulsive reactions. Strength becomes more effective when guided by patience and awareness.",


    personality:
      "Mars encourages balancing confidence with patience and avoiding unnecessary conflicts or reactions.",


    career:
      "Mars advises controlling impatience and directing competitive energy toward constructive achievements.",


    finance:
      "Mars suggests avoiding rushed decisions and evaluating risks before taking financial actions.",


    relationship:
      "Mars reminds you to balance passion with understanding and avoid reactions driven by temporary emotions.",


    health:
      "Mars encourages managing stress, excessive activity and maintaining disciplined routines.",


    mind:
      "Mars suggests calming restless thoughts and focusing attention on meaningful priorities.",


    spirituality:
      "Mars encourages transforming intensity into discipline, courage and personal growth.",


    education:
      "Mars advises maintaining consistency and patience instead of depending only on motivation.",


    ambition:
      "Mars suggests balancing strong desires with strategy and long-term planning.",


    communication:
      "Mars advises choosing words carefully and avoiding unnecessary disagreements.",


    travel:
      "Mars encourages patience and awareness while handling unexpected situations during journeys.",


    research:
      "Mars suggests avoiding rushed conclusions and combining determination with careful analysis.",


  },


};





//////////////////////////////////////////////////////////////
// MARS DYNAMIC EXPLANATION
//////////////////////////////////////////////////////////////

function getMarsExplanation(

  area: LanguageLifeArea

): string {


  switch(area){


    case "career":

      return "Mars influences initiative, leadership and the ability to direct effort toward professional goals.";


    case "finance":

      return "Mars influences decision-making, risk approach and the motivation behind financial actions.";


    case "relationship":

      return "Mars influences passion, emotional intensity and the way strength is expressed within relationships.";


    case "health":

      return "Mars reflects physical drive, discipline and the connection between energy and personal routines.";


    case "education":

      return "Mars influences determination, competition and the willingness to overcome learning challenges.";


    case "communication":

      return "Mars influences confidence, direct expression and the ability to communicate with force and clarity.";


    case "ambition":

      return "Mars represents motivation, persistence and the ability to convert intentions into action.";


    case "spirituality":

      return "Mars reflects inner courage, discipline and the strength required for personal transformation.";


    default:

      return "Mars represents courage, action, determination and personal drive. Its expression changes according to the life area being explored.";

  }


}





//////////////////////////////////////////////////////////////
// MARS DYNAMIC GUIDANCE
//////////////////////////////////////////////////////////////

function getMarsAdvice(

  area: LanguageLifeArea,

  tone: LanguageTone

): string {


  if(tone === "caution"){


    return "Channel energy carefully and allow patience to guide important decisions and actions.";

  }



  switch(area){


    case "career":

      return "Direct your motivation toward focused goals while maintaining discipline and teamwork.";


    case "health":

      return "Maintain active routines while balancing effort with proper recovery.";


    case "relationship":

      return "Express passion with patience and allow understanding to guide interactions.";


    case "education":

      return "Use determination consistently and approach challenges with persistence.";


    case "finance":

      return "Combine confidence with careful planning before making important choices.";


    default:

      return "Use determination and courage while maintaining balance and awareness.";

  }


}





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

      getMarsExplanation(

        area

      ),



    advice:

      getMarsAdvice(

        area,

        tone

      ),


  };


}






//////////////////////////////////////////////////////////////
// EXPORT LIBRARY
//////////////////////////////////////////////////////////////

export {

  MARS_LIBRARY,

};
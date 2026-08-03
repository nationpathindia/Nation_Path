//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// MOON LANGUAGE INTELLIGENCE
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
// MOON LITERATURE DATABASE
//////////////////////////////////////////////////////////////

const MOON_LIBRARY = {


  positive: {


    overall:
      "Moon enhances emotional awareness, intuition and inner understanding. This influence supports creativity, reflection and deeper connection with personal feelings.",


    personality:
      "Moon strengthens sensitivity, imagination and emotional intelligence. Personal growth develops through awareness of thoughts, feelings and personal reactions.",


    career:
      "Moon supports professional growth through creativity, adaptability and emotional intelligence. Understanding people and situations becomes an important strength.",


    finance:
      "Moon encourages balanced financial decisions by improving awareness of emotional influences and personal priorities.",


    relationship:
      "Moon strengthens emotional bonds through care, empathy and genuine understanding. Relationships benefit from openness and emotional maturity.",


    health:
      "Moon supports well-being through emotional balance, peaceful routines and awareness of personal needs.",


    mind:
      "Moon enhances intuition, imagination and mental awareness. This period supports reflection and deeper understanding of thoughts.",


    spirituality:
      "Moon encourages inner exploration, emotional healing and connection with deeper feelings and awareness.",


    education:
      "Moon supports learning through curiosity, imagination and intuitive understanding. Creative approaches improve knowledge development.",


    communication:
      "Moon improves expression through emotional awareness, empathy and the ability to understand different perspectives.",


    travel:
      "Moon supports meaningful experiences through openness, curiosity and emotional connection with new environments.",


    research:
      "Moon encourages deeper observation, intuition and exploring hidden patterns through thoughtful analysis.",


    ambition:
      "Moon supports ambition through emotional understanding, adaptability and awareness of personal motivations.",


  },



  neutral: {


    overall:
      "Moon indicates a phase of emotional observation, reflection and gradual understanding of personal needs.",


    personality:
      "Moon highlights emotional patterns and encourages awareness of personal strengths and natural reactions.",


    career:
      "Moon suggests using creativity, adaptability and emotional intelligence while handling professional situations.",


    finance:
      "Moon encourages practical financial choices by balancing feelings with logical thinking.",


    relationship:
      "Moon supports relationships through patience, emotional understanding and thoughtful communication.",


    health:
      "Moon emphasizes maintaining emotional balance and creating supportive daily routines.",


    mind:
      "Moon highlights the importance of clarity, reflection and managing thoughts with awareness.",


    spirituality:
      "Moon supports personal reflection and developing deeper connection with inner awareness.",


    education:
      "Moon encourages learning through curiosity, observation and creative thinking.",


    communication:
      "Moon supports gentle expression and emotionally aware conversations.",


    travel:
      "Moon encourages learning through experiences and emotional connection with surroundings.",


    research:
      "Moon supports observation, patience and understanding subtle patterns through careful attention.",


    ambition:
      "Moon highlights emotional awareness as an important factor in maintaining steady progress.",


  },



  caution: {


    overall:
      "Moon asks for emotional balance and awareness. Decisions become stronger when feelings are guided by clarity and patience.",


    personality:
      "Moon encourages observing emotional reactions carefully and avoiding unnecessary sensitivity during challenging situations.",


    career:
      "Moon advises maintaining emotional stability and avoiding decisions based only on temporary feelings.",


    finance:
      "Moon encourages avoiding emotional spending and making financial choices with greater awareness.",


    relationship:
      "Moon reminds you to balance emotional expectations with understanding and open communication.",


    health:
      "Moon suggests giving attention to stress management, rest and emotional stability.",


    mind:
      "Moon encourages reducing overthinking and creating mental clarity through balance and reflection.",


    spirituality:
      "Moon advises developing inner peace instead of becoming overwhelmed by changing emotions.",


    education:
      "Moon suggests maintaining focus and consistency while managing distractions.",


    communication:
      "Moon encourages expressing feelings clearly while avoiding emotional reactions.",


    travel:
      "Moon advises maintaining flexibility and emotional balance during changing experiences.",


    research:
      "Moon suggests avoiding confusion by combining intuition with careful observation and analysis.",


    ambition:
      "Moon encourages balancing emotions with practical decisions while pursuing important goals.",


  },


};





//////////////////////////////////////////////////////////////
// MOON DYNAMIC EXPLANATION
//////////////////////////////////////////////////////////////

function getMoonExplanation(

  area: LanguageLifeArea

): string {


  switch(area){


    case "relationship":

      return "Moon influences emotional connection, empathy and the way feelings are expressed within relationships.";


    case "career":

      return "Moon influences adaptability, creativity and emotional intelligence in professional situations.";


    case "finance":

      return "Moon influences emotional patterns connected with choices, priorities and financial decisions.";


    case "health":

      return "Moon reflects the connection between emotional balance, rest and personal well-being.";


    case "education":

      return "Moon influences curiosity, imagination and the ability to absorb knowledge through observation.";


    case "spirituality":

      return "Moon represents inner awareness, reflection and emotional connection with deeper understanding.";


    case "communication":

      return "Moon influences emotional expression, listening ability and understanding between people.";


    case "mind":

      return "Moon reflects thought patterns, intuition and the emotional side of decision-making.";


    default:

      return "Moon represents emotions, intuition, imagination and inner understanding. Its expression changes according to the life area being explored.";

  }


}






//////////////////////////////////////////////////////////////
// MOON GUIDANCE
//////////////////////////////////////////////////////////////

function getMoonAdvice(

  area: LanguageLifeArea,

  tone: LanguageTone

): string {


  if(tone === "caution"){


    return (

      "Maintain emotional balance and allow clarity to guide important decisions."

    );


  }



  switch(area){


    case "relationship":

      return "Use empathy, patience and emotional awareness to strengthen connections.";


    case "career":

      return "Use adaptability and emotional intelligence to handle professional situations wisely.";


    case "health":

      return "Maintain peaceful routines and support emotional stability through balanced habits.";


    case "education":

      return "Continue learning through curiosity, creativity and consistent attention.";


    default:

      return "Use emotional awareness as a strength while maintaining inner stability.";

  }


}






//////////////////////////////////////////////////////////////
// MOON INTERPRETER
//////////////////////////////////////////////////////////////

export function generateMoonLanguage(

  area:

    LanguageLifeArea = "overall",


  tone:

    LanguageTone = "neutral"


): PlanetLanguageOutput {



  const toneLibrary =

    MOON_LIBRARY[tone];



  const statement =

    toneLibrary[area]

    ??

    toneLibrary.overall;



  return {


    statement,


    explanation:

      getMoonExplanation(

        area

      ),



    advice:

      getMoonAdvice(

        area,

        tone

      ),


  };


}






//////////////////////////////////////////////////////////////
// EXPORT LIBRARY
//////////////////////////////////////////////////////////////

export {

  MOON_LIBRARY,

};
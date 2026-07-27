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
      "Moon strengthens sensitivity, imagination and emotional intelligence. Personal growth develops through awareness of thoughts and feelings.",


    career:
      "Moon supports professional growth through creativity, adaptability and understanding people. Emotional intelligence becomes an important strength.",


    finance:
      "Moon encourages balanced financial decisions by developing awareness of emotional influences on choices and priorities.",


    relationship:
      "Moon strengthens emotional bonds through care, empathy and genuine understanding. Relationships benefit from openness and compassion.",


    health:
      "Moon supports well-being through emotional balance, rest and maintaining a peaceful inner environment.",


    mind:
      "Moon enhances intuition, imagination and emotional awareness. This period supports reflection and better understanding of personal thoughts.",


    spirituality:
      "Moon encourages inner exploration, meditation and deeper connection with emotional wisdom.",


    education:
      "Moon supports learning through imagination, observation and intuitive understanding.",


    communication:
      "Moon improves expression through emotional awareness and the ability to understand others.",


  },



  neutral: {


    overall:
      "Moon indicates a phase of emotional observation, reflection and gradual understanding of personal needs.",


    personality:
      "Moon highlights emotional patterns and encourages awareness of personal strengths and reactions.",


    career:
      "Moon suggests using creativity, adaptability and emotional intelligence while handling professional situations.",


    finance:
      "Moon encourages careful financial choices by balancing feelings with practical thinking.",


    relationship:
      "Moon supports relationships through patience, emotional understanding and thoughtful communication.",


    health:
      "Moon emphasizes maintaining emotional balance and paying attention to mental well-being.",


    mind:
      "Moon highlights the importance of clarity, reflection and managing thoughts with awareness.",


    spirituality:
      "Moon supports personal reflection and developing a deeper connection with inner awareness.",


    education:
      "Moon encourages learning through curiosity, observation and creative approaches.",


    communication:
      "Moon supports gentle expression and emotionally aware conversations.",


  },



  caution: {


    overall:
      "Moon asks for emotional balance and awareness. Decisions become stronger when feelings are guided by clarity and patience.",


    personality:
      "Moon suggests observing emotional reactions carefully and avoiding unnecessary sensitivity during challenging moments.",


    career:
      "Moon advises maintaining emotional stability and avoiding decisions based only on temporary feelings.",


    finance:
      "Moon encourages avoiding emotional spending and making financial choices with greater awareness.",


    relationship:
      "Moon reminds you to balance emotional expectations with understanding and open communication.",


    health:
      "Moon suggests giving attention to stress management, rest and emotional stability.",


    mind:
      "Moon encourages reducing overthinking and creating greater mental clarity through balance and reflection.",


    spirituality:
      "Moon advises developing inner peace rather than becoming overwhelmed by changing emotions.",


    education:
      "Moon suggests maintaining focus and consistency while managing distractions.",


    communication:
      "Moon encourages expressing feelings clearly while avoiding emotional reactions.",


  },


};




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

      "Moon represents emotions, intuition, imagination and mental patterns. Its expression changes according to the life area being explored.",



    advice:

      tone === "caution"

        ?

        "Maintain emotional balance and allow clarity to guide important decisions."

        :

        "Use emotional awareness as a strength while maintaining inner stability.",


  };


}




//////////////////////////////////////////////////////////////
// EXPORT LIBRARY
//////////////////////////////////////////////////////////////

export {

  MOON_LIBRARY,

};
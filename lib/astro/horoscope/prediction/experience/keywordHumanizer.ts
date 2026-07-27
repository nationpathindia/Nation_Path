//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// HOROSCOPE EXPERIENCE INTELLIGENCE
//
// Keyword Humanizer
//
// Converts:
// Internal Engine Keywords
//
// Into:
// Premium User Facing Themes
//
// No prediction logic.
// No calculations.
//////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////
// KEYWORD EXPERIENCE MAP
//////////////////////////////////////////////////////////////

const KEYWORD_MAP:

Record<string,string>

= {


  authority:

    "Leadership & Responsibility",


  leadership:

    "Leadership & Recognition",


  ego:

    "Self Awareness",


  government:

    "Professional Authority",


  father:

    "Family Guidance",


  health:

    "Wellbeing Awareness",


  success:

    "Achievement & Progress",


  power:

    "Personal Strength",


  confidence:

    "Confidence & Self Expression",


  recognition:

    "Recognition & Growth",


  "self expression":

    "Creative Expression",



  mind:

    "Mental Clarity",


  emotion:

    "Emotional Balance",


  intuition:

    "Inner Awareness",


  peace:

    "Peace & Stability",


  memory:

    "Learning & Reflection",


  imagination:

    "Creativity & Vision",


  nurturing:

    "Care & Support",


  "emotional intelligence":

    "Emotional Understanding",


  creativity:

    "Innovation & Expression",


  "public connection":

    "Social Connection",



  courage:

    "Courage & Initiative",


  energy:

    "Drive & Motivation",


  discipline:

    "Discipline & Long Term Growth",


  communication:

    "Communication Strength",


  wisdom:

    "Wisdom & Learning",


  growth:

    "Personal Expansion",


  fortune:

    "New Opportunities",


  wealth:

    "Financial Growth",


  stability:

    "Long Term Stability",

};








//////////////////////////////////////////////////////////////
// NORMALIZER
//////////////////////////////////////////////////////////////

function normalizeKeyword(

 keyword:string

):string {


 return keyword

  .toLowerCase()

  .trim();


}








//////////////////////////////////////////////////////////////
// SINGLE KEYWORD FORMATTER
//////////////////////////////////////////////////////////////

export function humanizeKeyword(

 keyword:string

):string {


 const normalized =

 normalizeKeyword(

  keyword

 );



 return (

  KEYWORD_MAP[normalized]

  ??

  formatFallbackKeyword(

    normalized

  )

 );


}








//////////////////////////////////////////////////////////////
// MULTIPLE KEYWORDS FORMATTER
//////////////////////////////////////////////////////////////

export function humanizeKeywords(

 keywords:string[]

):string[] {


 return Array.from(

  new Set(

   keywords

    .filter(Boolean)

    .map(

      keyword =>

      humanizeKeyword(

        keyword

      )

    )

  )

 );


}








//////////////////////////////////////////////////////////////
// FALLBACK FORMATTER
//////////////////////////////////////////////////////////////

function formatFallbackKeyword(

 keyword:string

):string {


 if(!keyword){

  return "Personal Development";

 }



 return keyword

  .split(" ")

  .map(

    word =>

    word

      .charAt(0)

      .toUpperCase()

      +

      word.slice(1)

  )

  .join(" ");


}








//////////////////////////////////////////////////////////////
// PREMIUM THEME PICKER
//////////////////////////////////////////////////////////////

export function getPrimaryTheme(

 keywords:string[]

):string {


 const themes =

 humanizeKeywords(

  keywords

 );



 return (

  themes[0]

  ??

  "Personal Growth"

 );


}
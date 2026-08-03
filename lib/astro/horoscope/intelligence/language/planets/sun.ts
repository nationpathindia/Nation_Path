//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// SUN LANGUAGE INTELLIGENCE
//
// Production Literature Layer
//
// No calculations.
// No prediction rules.
// No astronomy.
//////////////////////////////////////////////////////////////

import type {
  LanguageLifeArea,
  LanguageTone,
  PlanetLanguageOutput,
} from "../types";



//////////////////////////////////////////////////////////////
// SUN LITERATURE DATABASE
//////////////////////////////////////////////////////////////

const SUN_LIBRARY = {


positive: {

overall: [

"Sun strengthens confidence, purpose and self-expression. Personal growth develops through clarity, leadership and conscious action.",

"Sun highlights inner confidence and personal identity. Progress improves when abilities are expressed with awareness and responsibility.",

"Sun supports individuality, leadership and the courage to take meaningful steps forward.",

"Sun brings focus toward confidence, recognition and purposeful decisions. Strong results come through disciplined effort.",

"Sun encourages personal development by connecting confidence with clarity and responsible action.",

],


personality: [

"Sun enhances individuality and helps express personal strengths with greater confidence and awareness.",

"Sun supports self-understanding, confidence and a stronger connection with personal abilities.",

"Sun encourages authentic expression while building inner strength and self-belief.",

"Sun highlights personal qualities that create confidence and a clearer sense of direction.",

"Sun supports personality development through awareness, courage and balanced confidence.",

],


career: [

"Sun supports professional growth through leadership, responsibility and recognition. Progress develops through purposeful action.",

"Sun encourages career advancement by strengthening confidence, decision-making and leadership abilities.",

"Sun highlights opportunities where responsibility and determination can improve professional direction.",

"Sun supports workplace progress through initiative, discipline and effective expression.",

"Sun strengthens career efforts by encouraging confidence and responsible leadership.",

],


finance: [

"Sun encourages financial confidence through planning, discipline and effective use of personal abilities.",

"Sun supports financial decisions when confidence is combined with practical thinking.",

"Sun highlights the importance of managing resources with awareness and responsibility.",

"Sun encourages stability through disciplined choices and thoughtful financial planning.",

"Sun supports financial improvement through confidence and better decision-making.",

],


relationship: [

"Sun supports relationships through honesty, respect and balanced self-expression.",

"Sun encourages healthier connections by combining individuality with understanding.",

"Sun highlights the importance of confidence while maintaining emotional balance in relationships.",

"Sun supports relationships where honesty and mutual respect create stronger bonds.",

"Sun encourages expressing feelings clearly while respecting the perspective of others.",

],


health: [

"Sun encourages vitality through discipline, confidence and balanced personal habits.",

"Sun supports well-being through consistent routines and awareness of personal energy.",

"Sun highlights the importance of maintaining strength through healthy choices.",

"Sun encourages better balance between activity, rest and personal discipline.",

"Sun supports improvement through positive habits and conscious lifestyle decisions.",

],


mind: [

"Sun strengthens clarity, determination and confidence in personal decisions.",

"Sun supports focused thinking and stronger awareness of personal priorities.",

"Sun encourages mental strength through confidence and clear understanding.",

"Sun highlights the ability to make decisions with greater purpose and awareness.",

"Sun supports a clearer mindset through confidence and self-reflection.",

],


spirituality: [

"Sun supports self-awareness, inner strength and understanding of personal purpose.",

"Sun encourages deeper awareness of identity and connection with inner values.",

"Sun highlights personal growth through reflection and understanding of purpose.",

"Sun supports inner confidence through awareness and conscious development.",

"Sun encourages discovering strength through self-awareness and reflection.",

],


education: [

"Sun encourages focused learning, confidence in abilities and development of personal talents.",

"Sun supports education through dedication, clarity and belief in personal potential.",

"Sun highlights learning progress through discipline and focused effort.",

"Sun encourages students to develop skills with confidence and consistency.",

"Sun supports knowledge growth through determination and self-belief.",

],


communication: [

"Sun improves expression through confidence, clarity and authentic communication.",

"Sun supports communication that reflects honesty, confidence and awareness.",

"Sun encourages clearer expression through self-belief and thoughtful words.",

"Sun strengthens communication by improving confidence and presence.",

"Sun highlights the value of expressing ideas with clarity and purpose.",

],


ambition: [

"Sun strengthens ambition and encourages purposeful movement toward meaningful goals.",

"Sun supports determination by connecting ambition with responsibility.",

"Sun highlights the importance of confidence while pursuing long-term objectives.",

"Sun encourages progress through focus, discipline and personal commitment.",

"Sun supports ambitious efforts when guided by clarity and patience.",

],


},



neutral: {

overall: [

"Sun highlights identity, confidence and personal development through awareness and steady effort.",

"Sun reflects a period of understanding personal strengths and developing confidence gradually.",

"Sun encourages balance between self-expression, responsibility and personal growth.",

"Sun shows the importance of building confidence through experience and awareness.",

"Sun supports gradual improvement through clarity and disciplined action.",

],

},



caution: {

overall: [

"Sun asks for balance between confidence and humility. Strength becomes more effective when guided by awareness.",

"Sun reminds you to combine ambition with patience and understanding.",

"Sun encourages avoiding excessive pride while developing genuine confidence.",

"Sun suggests using personal power responsibly and considering different viewpoints.",

"Sun highlights the importance of balancing recognition with inner growth.",

],


}

};





//////////////////////////////////////////////////////////////
// SUN INTERPRETER
//////////////////////////////////////////////////////////////

export function generateSunLanguage(

area: LanguageLifeArea = "overall",

tone: LanguageTone = "neutral"

): PlanetLanguageOutput {


const sentences =

SUN_LIBRARY[tone][area]

??

SUN_LIBRARY[tone].overall;



const index =

new Date().getDate()

%

sentences.length;



return {


statement:

sentences[index],



explanation:

"Sun represents identity, confidence, leadership and personal purpose. Its expression changes according to the life area being explored.",



advice:

tone === "caution"

?

"Balance confidence with humility and allow awareness to guide decisions."

:

"Use your strengths with clarity, responsibility and purposeful action.",

};


}



export {

SUN_LIBRARY,

};
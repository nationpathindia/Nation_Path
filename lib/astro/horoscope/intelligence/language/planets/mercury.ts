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
"Mercury enhances curiosity, observation and mental flexibility. Personal growth develops through awareness and understanding.",


career:
"Mercury supports professional development through communication, analytical thinking and strategic problem-solving. Knowledge becomes an important advantage.",


finance:
"Mercury encourages financial progress through planning, calculation and informed decision-making.",


relationship:
"Mercury improves relationships through honest communication, understanding and thoughtful expression.",


health:
"Mercury supports well-being through awareness, balanced thinking and better management of daily habits.",


mind:
"Mercury enhances mental clarity, curiosity and the ability to process information effectively.",


education:
"Mercury supports learning, memory and intellectual growth through observation and consistent practice.",


communication:
"Mercury strengthens expression, conversation skills and the ability to share ideas with clarity.",


travel:
"Mercury supports movement, networking and learning through experiences and interactions.",


research:
"Mercury encourages investigation, analysis and discovering deeper understanding through information.",


ambition:
"Mercury strengthens ambition through strategy, knowledge and the ability to adapt to changing situations.",


},




neutral: {


overall:
"Mercury indicates a phase of learning, communication and adapting to changing situations with awareness.",


personality:
"Mercury highlights curiosity, flexibility and the importance of balanced thinking.",


career:
"Mercury suggests gradual improvement through skill development, communication and practical knowledge.",


finance:
"Mercury encourages careful planning and logical evaluation before financial decisions.",


relationship:
"Mercury supports relationships through honest conversations and better understanding.",


health:
"Mercury highlights the connection between mental balance and daily routines.",


mind:
"Mercury encourages observation, reflection and improving clarity of thought.",


education:
"Mercury supports steady learning through curiosity and consistent effort.",


communication:
"Mercury encourages thoughtful expression and effective exchange of ideas.",


travel:
"Mercury indicates growth through experiences, connections and new information.",


research:
"Mercury supports exploration through analysis, questioning and attention to detail.",


ambition:
"Mercury highlights the importance of planning, knowledge and intelligent action while pursuing goals.",


},




caution: {


overall:
"Mercury asks for careful communication and thoughtful decisions. Mental activity becomes stronger when guided by patience and clarity.",


personality:
"Mercury encourages avoiding excessive overthinking and maintaining balance between logic and intuition.",


career:
"Mercury advises reviewing details carefully and avoiding rushed professional decisions.",


finance:
"Mercury suggests avoiding impulsive choices and focusing on accurate evaluation before commitments.",


relationship:
"Mercury reminds you that communication requires patience, listening and emotional understanding.",


health:
"Mercury encourages reducing mental stress and creating balance between activity and rest.",


mind:
"Mercury suggests managing excessive thoughts and maintaining mental focus.",


education:
"Mercury advises improving concentration and avoiding distractions during learning.",


communication:
"Mercury encourages thinking before speaking and maintaining clarity during important discussions.",


travel:
"Mercury suggests careful planning and attention to details during movement or transitions.",


research:
"Mercury advises verifying information carefully before reaching conclusions.",


ambition:
"Mercury encourages balancing quick thinking with patience and realistic planning.",


},


};





//////////////////////////////////////////////////////////////
// MERCURY DYNAMIC EXPLANATION
//////////////////////////////////////////////////////////////

function getMercuryExplanation(

area: LanguageLifeArea

): string {


switch(area){


case "career":

return "Mercury influences professional intelligence, strategic thinking and the ability to solve problems through communication and analysis.";


case "finance":

return "Mercury influences financial decisions through calculation, planning and awareness of information.";


case "education":

return "Mercury represents learning ability, curiosity and intellectual development through observation and practice.";


case "communication":

return "Mercury influences expression, understanding and the exchange of ideas between people.";


case "research":

return "Mercury supports investigation, logical thinking and discovering patterns through detailed observation.";


case "relationship":

return "Mercury influences conversations, understanding and the way thoughts are shared within relationships.";


case "mind":

return "Mercury reflects thought processes, reasoning ability and mental adaptability.";


case "ambition":

return "Mercury influences strategy, planning and the intelligent approach toward achieving goals.";


default:

return "Mercury represents intelligence, adaptability and learning ability. Its influence develops through awareness, observation and practical thinking.";


}


}






//////////////////////////////////////////////////////////////
// MERCURY DYNAMIC GUIDANCE
//////////////////////////////////////////////////////////////

function getMercuryAdvice(

area: LanguageLifeArea,

tone: LanguageTone

): string {


if(tone === "caution"){

return "Slow down, verify information and communicate with greater awareness.";

}



switch(area){


case "career":

return "Use analytical skills, communication and strategic thinking to create professional growth.";


case "education":

return "Continue learning with curiosity, consistency and practical application of knowledge.";


case "finance":

return "Combine planning with careful analysis before making important financial decisions.";


case "communication":

return "Express ideas clearly while maintaining patience and understanding.";


case "relationship":

return "Use honest communication and active listening to strengthen connections.";


case "research":

return "Observe details carefully and combine curiosity with logical evaluation.";


default:

return "Use knowledge, observation and communication skills to create better outcomes.";


}


}






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

getMercuryExplanation(

area

),



advice:

getMercuryAdvice(

area,

tone

),


};


}






//////////////////////////////////////////////////////////////
// EXPORT LIBRARY
//////////////////////////////////////////////////////////////

export {

MERCURY_LIBRARY,

};
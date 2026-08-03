//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// JUPITER LANGUAGE INTELLIGENCE v2
//
// Production Literature Layer
//
// No calculations.
// No prediction rules.
// No astronomy.
//
// Responsibility:
// Convert Jupiter influence into dynamic
// human-readable horoscope language.
//////////////////////////////////////////////////////////////

import type {
  LanguageLifeArea,
  LanguageTone,
  PlanetLanguageOutput,
} from "../types";



//////////////////////////////////////////////////////////////
// JUPITER LITERATURE DATABASE
//////////////////////////////////////////////////////////////

const JUPITER_LIBRARY = {


positive: {


overall: [

"Growth develops through wisdom, learning and meaningful experiences. Broader understanding creates opportunities for thoughtful progress.",

"Expansion becomes stronger through knowledge, guidance and long-term vision. Progress improves when opportunities are approached with awareness.",

"Personal development is supported through maturity, experience and balanced decision making.",

"New perspectives create meaningful improvement when learning is combined with practical choices.",

"A phase of growth and understanding develops through patience, knowledge and purposeful action.",

],



career: [

"Professional growth improves through knowledge, experience and strategic thinking. Continuous learning strengthens future progress.",

"Career opportunities develop through guidance, skill improvement and responsible professional decisions.",

"Long-term success becomes stronger when ambition is combined with preparation and wisdom.",

"Professional understanding expands through mentorship, learning and disciplined effort.",

"Career development improves through experience, planning and consistent improvement.",

],



finance: [

"Financial growth improves through planning, awareness and long-term thinking. Responsible choices create stronger stability.",

"Prosperity develops when opportunities are handled with patience, knowledge and practical judgment.",

"Better financial understanding supports disciplined management of resources.",

"Financial improvement becomes possible through thoughtful planning and balanced decisions.",

"Stability increases when opportunities are combined with responsibility and awareness.",

],



relationship: [

"Relationships grow through maturity, understanding and emotional wisdom. Mutual respect strengthens connections.",

"Deeper bonds develop through patience, generosity and meaningful communication.",

"Strong connections are created through trust, shared growth and understanding.",

"Harmony improves when compassion and emotional balance guide interactions.",

"Relationships become stronger through acceptance, maturity and thoughtful communication.",

],



education: [

"Learning expands through curiosity, guidance and deeper understanding. Knowledge becomes a foundation for growth.",

"Studies improve through focus, exploration and willingness to understand new perspectives.",

"Intellectual development grows when experience and learning work together.",

"Understanding improves through patience, observation and continuous learning.",

"Knowledge becomes stronger through discipline, curiosity and thoughtful study.",

],



spirituality: [

"Inner growth develops through reflection, wisdom and connection with deeper values.",

"Personal awareness expands through learning, understanding and meaningful experiences.",

"Deeper purpose becomes clearer through reflection and conscious awareness.",

"Wisdom develops through patience, experience and inner exploration.",

"Personal evolution improves when knowledge connects with deeper understanding.",

],



health: [

"Well-being improves through awareness, balanced habits and positive lifestyle choices.",

"Health progress develops through discipline, optimism and mindful routines.",

"Balance becomes important through consistency and practical wellness decisions.",

"Improvement grows through awareness and a broader approach toward personal health.",

"Physical and personal growth improve when daily habits remain balanced.",

],



communication: [

"Expression improves through knowledge, clarity and thoughtful communication.",

"Communication becomes stronger through patience, understanding and meaningful exchange.",

"Ideas develop when learning is combined with mature expression.",

"Conversations create progress through awareness, guidance and respect.",

"Communication improves through knowledge, patience and deeper understanding.",

],


},




neutral: {


overall: [

"Growth develops gradually through experience, patience and continuous learning.",

"Progress improves through awareness, understanding and practical decisions.",

"Development continues through knowledge, guidance and thoughtful choices.",

"Improvement comes through maturity, experience and consistent effort.",

"A learning phase supports gradual expansion and personal development.",

],



career: [

"Professional development improves through experience, preparation and better planning.",

"Career direction becomes clearer through patience, learning and responsible choices.",

"Progress develops through skill improvement and consistent professional effort.",

"Career growth benefits from discipline, preparation and long-term thinking.",

"Professional improvement continues through knowledge and practical experience.",

],



finance: [

"Financial matters improve through balanced choices and responsible planning.",

"Resources require awareness, patience and practical management.",

"Stability develops through structured decisions and disciplined choices.",

"Financial understanding improves through experience and careful evaluation.",

"Future security strengthens through thoughtful resource management.",

],



relationship: [

"Relationships develop through patience, maturity and mutual understanding.",

"Emotional growth improves through respectful communication and awareness.",

"Connections become stronger through trust and balanced expectations.",

"Understanding develops through shared experiences and patience.",

"Relationships grow slowly through awareness and emotional maturity.",

],



education: [

"Learning improves through consistency, curiosity and continuous effort.",

"Knowledge develops through patience and exploration.",

"Growth comes through observation, guidance and practical learning.",

"Education benefits from discipline and broader understanding.",

"Progress improves through study, dedication and experience.",

],



spirituality: [

"Reflection supports personal understanding and gradual inner development.",

"Awareness grows through learning and meaningful experiences.",

"Deeper values become clearer through patience and reflection.",

"Wisdom develops through personal experiences and understanding.",

"Inner growth improves through awareness and patience.",

],



health: [

"Balance improves through mindful choices and consistent routines.",

"Well-being develops through awareness and positive habits.",

"Health progress requires patience and disciplined improvement.",

"Personal wellness improves through practical lifestyle decisions.",

"Balance remains important for maintaining healthy progress.",

],



communication: [

"Expression improves through awareness, patience and experience.",

"Communication develops through understanding and thoughtful expression.",

"Meaningful discussions improve through maturity and learning.",

"Ideas become clearer through experience and reflection.",

"Communication benefits from patience and awareness.",

],


},




caution: {


overall: [

"Growth requires balance between confidence and practical judgment. Awareness creates better decisions.",

"Important choices improve when optimism is combined with realistic thinking.",

"Patience and evaluation help avoid unnecessary expectations.",

"Progress becomes stronger when ambition remains balanced with humility.",

"Wisdom develops through moderation, awareness and practical understanding.",

],



career: [

"Professional decisions require careful planning and realistic expectations.",

"Career progress improves when ambition is balanced with preparation.",

"Steady improvement is more valuable than depending only on quick results.",

"Professional choices benefit from patience and responsibility.",

"Long-term success requires awareness and disciplined effort.",

],



finance: [

"Financial decisions require careful evaluation and responsible planning.",

"Optimism should remain balanced with practical financial thinking.",

"Expansion requires patience and proper evaluation of commitments.",

"Financial opportunities should be approached with awareness.",

"Moderation helps create stronger financial stability.",

],



relationship: [

"Relationships improve when expectations remain balanced with understanding.",

"Patience and emotional awareness support stronger connections.",

"Healthy boundaries create better emotional balance.",

"Communication improves when assumptions are replaced with understanding.",

"Maturity helps manage emotional expectations.",

],



education: [

"Learning improves through discipline and consistent effort.",

"Knowledge becomes stronger when ability is supported by practice.",

"Practical application is important along with information gathering.",

"Confidence should remain balanced with preparation.",

"Continuous improvement creates better learning outcomes.",

],



spirituality: [

"Inner growth requires awareness, sincerity and personal reflection.",

"Wisdom develops through experience rather than only belief.",

"Understanding becomes deeper when reflection guides learning.",

"Balance between faith and awareness supports growth.",

"Personal exploration creates meaningful understanding.",

],



health: [

"Well-being requires moderation and balanced lifestyle choices.",

"Consistency remains important for maintaining healthy routines.",

"Awareness helps avoid excess and imbalance.",

"Personal health improves through disciplined habits.",

"Balance remains essential for sustainable improvement.",

],



communication: [

"Expression improves when confidence is balanced with listening.",

"Thoughtful communication creates better understanding.",

"Different viewpoints should be considered before decisions.",

"Patience improves conversations and relationships.",

"Respectful expression creates stronger connections.",

],


},


};





//////////////////////////////////////////////////////////////
// JUPITER INTERPRETER
//////////////////////////////////////////////////////////////

export function generateJupiterLanguage(

  area: LanguageLifeArea = "overall",

  tone: LanguageTone = "neutral"

): PlanetLanguageOutput {


  const sentences =

    JUPITER_LIBRARY[tone][area]

    ??

    JUPITER_LIBRARY[tone].overall;



  const index =

    new Date().getDate()

    %

    sentences.length;



  return {


    statement:

      sentences[index],



    explanation:

      "Jupiter represents expansion, wisdom, learning and guidance. Its influence develops through awareness, experience and balanced decisions.",



    advice:

      tone === "caution"

      ?

      "Balance confidence with practical thinking before making important decisions."

      :

      "Continue learning, improving and applying wisdom in daily choices.",


  };


}





export {

  JUPITER_LIBRARY,

};
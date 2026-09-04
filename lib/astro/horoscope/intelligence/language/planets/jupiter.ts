//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// JUPITER LANGUAGE INTELLIGENCE v3
//
// Production Literature Layer
//
// No calculations.
// No prediction rules.
// No planetary astronomy.
//
// Responsibility:
// Convert Jupiter influence into rich,
// human-readable horoscope language.
//
// This layer provides:
// - Planet-specific literature
// - Life-area language
// - Tone-aware expression
// - Dynamic explanation
// - Dynamic guidance
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

  ////////////////////////////////////////////////////////////
  // POSITIVE
  ////////////////////////////////////////////////////////////

  positive: {

    overall: [
      "Growth develops through wisdom, learning and meaningful experiences. Broader understanding creates opportunities for thoughtful progress.",
      "Expansion becomes stronger through knowledge, guidance and long-term vision. Progress improves when opportunities are approached with awareness.",
      "Personal development is supported through maturity, experience and balanced decision-making.",
      "New perspectives create meaningful improvement when learning is combined with practical choices.",
      "A phase of growth and understanding develops through patience, knowledge and purposeful action.",
    ],

    personality: [
      "Jupiter strengthens optimism, wisdom and confidence in personal growth. A broader perspective helps you understand your abilities more clearly.",
      "Personal confidence grows through experience, learning and a willingness to see beyond immediate circumstances.",
      "A generous and constructive outlook becomes an important source of personal development.",
      "Wisdom develops when confidence is supported by humility, awareness and meaningful experience.",
      "You may find greater clarity by trusting growth while remaining open to learning from others.",
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

    health: [
      "Well-being improves through awareness, balanced habits and positive lifestyle choices.",
      "Health progress develops through discipline, optimism and mindful routines.",
      "Balance becomes important through consistency and practical wellness decisions.",
      "Improvement grows through awareness and a broader approach toward personal health.",
      "Physical and personal growth improve when daily habits remain balanced.",
    ],

    mind: [
      "Mental clarity expands through learning, reflection and broader understanding. New perspectives can improve decision-making.",
      "A more optimistic outlook supports clearer thinking and constructive problem-solving.",
      "The mind benefits from knowledge, reflection and willingness to consider different perspectives.",
      "Understanding deepens when curiosity is combined with patience and experience.",
      "Mental growth becomes stronger through continuous learning and thoughtful reflection.",
    ],

    spirituality: [
      "Inner growth develops through reflection, wisdom and connection with deeper values.",
      "Personal awareness expands through learning, understanding and meaningful experiences.",
      "Deeper purpose becomes clearer through reflection and conscious awareness.",
      "Wisdom develops through patience, experience and inner exploration.",
      "Personal evolution improves when knowledge connects with deeper understanding.",
    ],

    education: [
      "Learning expands through curiosity, guidance and deeper understanding. Knowledge becomes a foundation for growth.",
      "Studies improve through focus, exploration and willingness to understand new perspectives.",
      "Intellectual development grows when experience and learning work together.",
      "Understanding improves through patience, observation and continuous learning.",
      "Knowledge becomes stronger through discipline, curiosity and thoughtful study.",
    ],

    communication: [
      "Expression improves through knowledge, clarity and thoughtful communication.",
      "Communication becomes stronger through patience, understanding and meaningful exchange.",
      "Ideas develop when learning is combined with mature expression.",
      "Conversations create progress through awareness, guidance and respect.",
      "Communication improves through knowledge, patience and deeper understanding.",
    ],

    travel: [
      "Travel and new experiences expand understanding by exposing you to different ideas, cultures and perspectives.",
      "Movement creates opportunities for learning, exploration and broader awareness.",
      "New environments can encourage personal growth when experiences are approached with curiosity.",
      "Travel becomes meaningful when exploration is combined with learning and reflection.",
      "Broader experiences can strengthen confidence, knowledge and appreciation of different perspectives.",
    ],

    research: [
      "Research benefits from curiosity, patience and the desire to understand subjects at a deeper level.",
      "Deeper knowledge develops when exploration is combined with disciplined observation and thoughtful analysis.",
      "Investigation becomes more productive through broader perspectives and continuous learning.",
      "Complex subjects become clearer when curiosity is supported by experience and structured thinking.",
      "Knowledge expands through patient inquiry, meaningful evidence and willingness to explore beyond familiar ideas.",
    ],

    ambition: [
      "Ambition grows through vision, knowledge and confidence in long-term development.",
      "Purposeful goals become easier to pursue when ambition is supported by preparation and wisdom.",
      "Expansion becomes meaningful when personal ambition is connected with learning and responsible action.",
      "Long-term goals benefit from optimism, experience and a broader understanding of possibilities.",
      "Progress strengthens when confidence is combined with patience, preparation and clear direction.",
    ],

  },



  ////////////////////////////////////////////////////////////
  // NEUTRAL
  ////////////////////////////////////////////////////////////

  neutral: {

    overall: [
      "Growth develops gradually through experience, patience and continuous learning.",
      "Progress improves through awareness, understanding and practical decisions.",
      "Development continues through knowledge, guidance and thoughtful choices.",
      "Improvement comes through maturity, experience and consistent effort.",
      "A learning phase supports gradual expansion and personal development.",
    ],

    personality: [
      "Personal development continues through experience, reflection and a willingness to learn.",
      "Confidence develops gradually when knowledge is supported by practical experience.",
      "A balanced outlook helps you understand strengths and areas that still require growth.",
      "Personal maturity develops through patience, observation and meaningful experiences.",
      "Growth becomes steadier when optimism remains connected with self-awareness.",
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

    health: [
      "Balance improves through mindful choices and consistent routines.",
      "Well-being develops through awareness and positive habits.",
      "Health progress requires patience and disciplined improvement.",
      "Personal wellness improves through practical lifestyle decisions.",
      "Balance remains important for maintaining healthy progress.",
    ],

    mind: [
      "Mental development continues through reflection, learning and practical understanding.",
      "Clarity improves when thoughts are given time to develop through experience.",
      "The mind benefits from patience, observation and continued learning.",
      "Understanding becomes stronger through reflection and exposure to new perspectives.",
      "Mental balance develops through awareness and thoughtful decision-making.",
    ],

    spirituality: [
      "Reflection supports personal understanding and gradual inner development.",
      "Awareness grows through learning and meaningful experiences.",
      "Deeper values become clearer through patience and reflection.",
      "Wisdom develops through personal experiences and understanding.",
      "Inner growth improves through awareness and patience.",
    ],

    education: [
      "Learning improves through consistency, curiosity and continuous effort.",
      "Knowledge develops through patience and exploration.",
      "Growth comes through observation, guidance and practical learning.",
      "Education benefits from discipline and broader understanding.",
      "Progress improves through study, dedication and experience.",
    ],

    communication: [
      "Expression improves through awareness, patience and experience.",
      "Communication develops through understanding and thoughtful expression.",
      "Meaningful discussions improve through maturity and learning.",
      "Ideas become clearer through experience and reflection.",
      "Communication benefits from patience and awareness.",
    ],

    travel: [
      "Travel creates opportunities for experience, observation and learning.",
      "New environments can gradually broaden understanding and perspective.",
      "Movement becomes more meaningful when experiences are approached with awareness.",
      "Travel supports learning through exposure to different situations and viewpoints.",
      "New experiences can contribute to personal development when approached patiently.",
    ],

    research: [
      "Research develops through patience, observation and continuous learning.",
      "Understanding improves through careful exploration and thoughtful evaluation.",
      "Complex subjects become clearer through consistent investigation.",
      "Knowledge grows through questioning, observation and practical experience.",
      "Research benefits from patience and a willingness to examine different perspectives.",
    ],

    ambition: [
      "Ambition develops gradually through experience, preparation and clearer direction.",
      "Goals become easier to manage when confidence is supported by practical planning.",
      "Progress benefits from patience, learning and consistent effort.",
      "Long-term objectives develop through preparation and responsible decision-making.",
      "Ambition becomes more productive when connected with realistic planning.",
    ],

  },



  ////////////////////////////////////////////////////////////
  // CAUTION
  ////////////////////////////////////////////////////////////

  caution: {

    overall: [
      "Growth requires balance between confidence and practical judgment. Awareness creates better decisions.",
      "Important choices improve when optimism is combined with realistic thinking.",
      "Patience and evaluation help avoid unnecessary expectations.",
      "Progress becomes stronger when ambition remains balanced with humility.",
      "Wisdom develops through moderation, awareness and practical understanding.",
    ],

    personality: [
      "Confidence should remain balanced with humility and awareness of personal limitations.",
      "Optimism is valuable, but thoughtful reflection can prevent unnecessary assumptions.",
      "Personal growth improves when confidence remains open to feedback and experience.",
      "Avoid expecting immediate progress; maturity develops through patience and self-awareness.",
      "A balanced perspective helps prevent overconfidence and unrealistic expectations.",
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

    health: [
      "Well-being requires moderation and balanced lifestyle choices.",
      "Consistency remains important for maintaining healthy routines.",
      "Awareness helps avoid excess and imbalance.",
      "Personal health improves through disciplined habits.",
      "Balance remains essential for sustainable improvement.",
    ],

    mind: [
      "Avoid allowing optimism or excessive thinking to replace careful evaluation.",
      "Mental clarity improves when expectations remain realistic and grounded.",
      "Take time to evaluate ideas before allowing enthusiasm to influence important decisions.",
      "A broader perspective is useful, but practical details should not be overlooked.",
      "Patience and reflection can prevent unnecessary mental pressure or unrealistic expectations.",
    ],

    spirituality: [
      "Inner growth requires awareness, sincerity and personal reflection.",
      "Wisdom develops through experience rather than only belief.",
      "Understanding becomes deeper when reflection guides learning.",
      "Balance between faith and awareness supports growth.",
      "Personal exploration creates meaningful understanding.",
    ],

    education: [
      "Learning improves through discipline and consistent effort.",
      "Knowledge becomes stronger when ability is supported by practice.",
      "Practical application is important along with information gathering.",
      "Confidence should remain balanced with preparation.",
      "Continuous improvement creates better learning outcomes.",
    ],

    communication: [
      "Expression improves when confidence is balanced with listening.",
      "Thoughtful communication creates better understanding.",
      "Different viewpoints should be considered before decisions.",
      "Patience improves conversations and relationships.",
      "Respectful expression creates stronger connections.",
    ],

    travel: [
      "Travel plans benefit from realistic preparation and attention to practical details.",
      "Avoid assuming that every opportunity will develop exactly as expected.",
      "New experiences should be approached with curiosity as well as practical awareness.",
      "Patience can help manage unexpected changes during movement or travel.",
      "Broader experiences are valuable, but preparation remains important.",
    ],

    research: [
      "Research requires patience and careful evaluation rather than quick conclusions.",
      "Broader ideas should still be supported by evidence and thoughtful verification.",
      "Avoid allowing assumptions to replace detailed investigation.",
      "Complex subjects require disciplined observation and realistic interpretation.",
      "Careful verification strengthens understanding and prevents unnecessary conclusions.",
    ],

    ambition: [
      "Ambition requires realistic planning and patience rather than relying only on optimism.",
      "Large goals become manageable when enthusiasm is supported by preparation.",
      "Avoid expecting immediate expansion; consistent effort creates stronger progress.",
      "Confidence should remain balanced with practical evaluation of opportunities.",
      "Long-term success requires patience, humility and disciplined execution.",
    ],

  },

} as const;



//////////////////////////////////////////////////////////////
// JUPITER EXPLANATION
//////////////////////////////////////////////////////////////

function getJupiterExplanation(

  area: LanguageLifeArea

): string {

  switch (area) {

    case "personality":

      return "Jupiter influences optimism, wisdom, confidence and personal development through experience and broader understanding.";

    case "career":

      return "Jupiter influences professional growth through knowledge, guidance, experience and long-term vision.";

    case "finance":

      return "Jupiter influences financial thinking through expansion, opportunity, resource awareness and responsible judgment.";

    case "relationship":

      return "Jupiter influences relationships through maturity, generosity, understanding and shared growth.";

    case "health":

      return "Jupiter reflects growth through balanced habits, awareness and a constructive approach toward well-being.";

    case "mind":

      return "Jupiter influences mental expansion through learning, reflection, knowledge and broader perspectives.";

    case "spirituality":

      return "Jupiter represents wisdom, higher understanding, reflection and the search for deeper meaning.";

    case "education":

      return "Jupiter influences learning through curiosity, guidance, knowledge and the development of broader understanding.";

    case "communication":

      return "Jupiter influences communication through knowledge, mature expression, understanding and meaningful exchange.";

    case "travel":

      return "Jupiter reflects growth through exploration, new experiences, broader perspectives and exposure to different environments.";

    case "research":

      return "Jupiter supports deeper understanding through curiosity, exploration, knowledge and the search for meaningful insight.";

    case "ambition":

      return "Jupiter influences ambition through vision, confidence, learning and the ability to think beyond immediate limitations.";

    default:

      return "Jupiter represents expansion, wisdom, learning and guidance. Its expression develops through experience, awareness and broader understanding.";

  }

}



//////////////////////////////////////////////////////////////
// JUPITER GUIDANCE
//////////////////////////////////////////////////////////////

function getJupiterAdvice(

  area: LanguageLifeArea,

  tone: LanguageTone

): string {

  ////////////////////////////////////////////////////////////
  // CAUTION OVERRIDE
  ////////////////////////////////////////////////////////////

  if (tone === "caution") {

    switch (area) {

      case "career":

        return "Balance ambition with preparation and evaluate professional opportunities carefully before committing.";

      case "finance":

        return "Review financial commitments carefully and combine optimism with practical planning.";

      case "relationship":

        return "Keep expectations realistic, listen carefully and allow mutual understanding to guide relationships.";

      case "education":

        return "Stay consistent with study and support confidence with preparation and practical application.";

      case "travel":

        return "Plan carefully, remain adaptable and avoid assuming that every situation will develop as expected.";

      case "research":

        return "Verify information carefully and allow evidence and patience to guide deeper investigation.";

      case "ambition":

        return "Keep long-term goals realistic and combine confidence with disciplined preparation.";

      default:

        return "Balance optimism with practical thinking and allow patience to guide important decisions.";

    }

  }



  ////////////////////////////////////////////////////////////
  // POSITIVE / NEUTRAL GUIDANCE
  ////////////////////////////////////////////////////////////

  switch (area) {

    case "career":

      return "Continue learning, seek useful guidance and direct professional ambition toward long-term development.";

    case "finance":

      return "Use opportunities thoughtfully and combine growth with responsible resource management.";

    case "relationship":

      return "Cultivate mutual respect, meaningful communication and shared emotional growth.";

    case "health":

      return "Maintain balanced routines and support well-being through consistent, practical habits.";

    case "mind":

      return "Keep learning, remain open to new perspectives and allow reflection to strengthen clarity.";

    case "spirituality":

      return "Use reflection and learning to develop deeper understanding while remaining grounded in daily responsibilities.";

    case "education":

      return "Continue exploring knowledge with curiosity, consistency and practical application.";

    case "communication":

      return "Share knowledge thoughtfully, listen carefully and allow understanding to guide important conversations.";

    case "travel":

      return "Approach new experiences with curiosity, openness and a willingness to learn from different perspectives.";

    case "research":

      return "Explore deeply, remain patient and combine curiosity with structured observation.";

    case "ambition":

      return "Keep your vision broad while supporting long-term goals with preparation and consistent effort.";

    case "personality":

      return "Build confidence through learning, experience and an open-minded approach to personal growth.";

    default:

      return "Continue learning, improving and applying wisdom in daily choices.";

  }

}



//////////////////////////////////////////////////////////////
// JUPITER LITERATURE SELECTOR
//////////////////////////////////////////////////////////////

function selectJupiterSentence(

  area: LanguageLifeArea,

  tone: LanguageTone

): string {

  const toneLibrary =

    JUPITER_LIBRARY[tone];



  const sentences =

    toneLibrary[area]

    ?? toneLibrary.overall;



  ////////////////////////////////////////////////////////////
  // Deterministic daily variation
  //
  // Keeps output stable during the same day while allowing
  // the literature layer to rotate naturally across days.
  ////////////////////////////////////////////////////////////

  const index =

    new Date().getDate()

    %

    sentences.length;



  return sentences[index];

}



//////////////////////////////////////////////////////////////
// JUPITER INTERPRETER
//////////////////////////////////////////////////////////////

export function generateJupiterLanguage(

  area: LanguageLifeArea = "overall",

  tone: LanguageTone = "neutral"

): PlanetLanguageOutput {

  return {

    statement:

      selectJupiterSentence(

        area,

        tone

      ),



    explanation:

      getJupiterExplanation(

        area

      ),



    advice:

      getJupiterAdvice(

        area,

        tone

      ),

  };

}



//////////////////////////////////////////////////////////////
// EXPORT LIBRARY
//////////////////////////////////////////////////////////////

export {

  JUPITER_LIBRARY,

};
//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// MERCURY LANGUAGE INTELLIGENCE v3
//
// Production Literature Layer
//
// No calculations.
// No prediction rules.
// No planetary astronomy.
//
// Responsibility:
// Convert Mercury influence into dynamic,
// human-readable horoscope language.
//
// Architecture:
// Prediction Intelligence
//        ↓
// Tone + Life Area
//        ↓
// Mercury Literature
//        ↓
// PlanetLanguageOutput
//////////////////////////////////////////////////////////////

import type {
  LanguageLifeArea,
  LanguageTone,
  PlanetLanguageOutput,
} from "../types";



//////////////////////////////////////////////////////////////
// MERCURY LITERATURE DATABASE
//////////////////////////////////////////////////////////////

const MERCURY_LIBRARY: Record<
  LanguageTone,
  Partial<Record<LanguageLifeArea, string[]>>
> = {


  ////////////////////////////////////////////////////////////
  // POSITIVE
  ////////////////////////////////////////////////////////////

  positive: {

    overall: [
      "Mercury strengthens clarity, adaptability and intelligent decision-making. New information becomes easier to understand, organize and apply.",
      "Mental agility becomes a valuable strength as communication, observation and practical thinking support meaningful progress.",
      "This phase favors learning, useful connections and thoughtful decisions. Clear thinking helps turn information into practical opportunities.",
      "Curiosity opens new possibilities as ideas, conversations and experience combine to create better understanding.",
      "Mercury encourages a flexible and alert approach to life, helping you recognize useful information and respond with greater confidence.",
    ],


    personality: [
      "Curiosity, observation and mental flexibility become important strengths. You may find it easier to understand different perspectives and adapt to changing situations.",
      "Mercury enhances your ability to observe details, connect ideas and express yourself with greater confidence.",
      "A sharper awareness of people and situations helps you respond intelligently rather than reacting automatically.",
      "Your natural curiosity can become a powerful source of personal growth when it is combined with patience and thoughtful observation.",
      "Mental adaptability allows you to learn from experiences and refine the way you understand yourself and others.",
    ],


    career: [
      "Professional progress is supported by communication, analysis and strategic thinking. The ability to understand information quickly can become a meaningful advantage.",
      "Career opportunities improve when knowledge is combined with clear communication, practical planning and intelligent problem-solving.",
      "Mercury favors work involving communication, analysis, coordination and the exchange of ideas. Skill development can open useful professional pathways.",
      "Your ability to organize information and communicate solutions can strengthen professional credibility and create new opportunities.",
      "Progress develops through better decisions, useful connections and the practical application of knowledge.",
    ],


    finance: [
      "Financial decisions benefit from careful analysis, planning and accurate information. Better understanding can support more effective resource management.",
      "Mercury encourages practical financial thinking, helping you compare options and make decisions with greater awareness.",
      "Financial progress becomes stronger when opportunities are evaluated logically rather than emotionally.",
      "Clear information and disciplined planning can help improve the way you manage resources and respond to financial opportunities.",
      "Thoughtful calculation and informed choices can create greater confidence around financial planning.",
    ],


    relationship: [
      "Relationships benefit from open communication, curiosity and a willingness to understand different perspectives. Meaningful conversations can strengthen connection.",
      "Mercury supports relationships through honest expression, attentive listening and the ability to discuss important matters calmly.",
      "Better communication creates room for trust and understanding. Sharing thoughts openly can bring greater clarity to important connections.",
      "Intellectual connection and meaningful conversation can deepen relationships when communication remains respectful and genuine.",
      "Understanding grows when both people feel heard. Thoughtful dialogue can create greater emotional and practical harmony.",
    ],


    health: [
      "Well-being benefits from mental clarity, organized routines and greater awareness of daily habits.",
      "A balanced approach to activity, rest and mental stimulation can support a healthier sense of overall well-being.",
      "Mercury encourages paying attention to the relationship between mental activity and everyday routines.",
      "Better organization and mindful habits can help create greater balance between productivity and recovery.",
      "Awareness of stress, routine and mental workload can support more sustainable daily well-being.",
    ],


    mind: [
      "Mental clarity and curiosity become valuable strengths. You may find it easier to connect information and understand complex situations.",
      "Mercury supports sharper observation, flexible thinking and the ability to approach problems from different perspectives.",
      "Ideas flow more effectively when curiosity is combined with structure and focused attention.",
      "Your ability to analyze situations and recognize patterns can help you make more informed choices.",
      "Mental flexibility allows you to learn quickly while adapting your perspective as new information becomes available.",
    ],


    spirituality: [
      "Mercury supports spiritual understanding through study, reflection and thoughtful exploration of different perspectives.",
      "Questions and curiosity can become pathways toward deeper understanding when explored with patience and openness.",
      "Spiritual learning benefits from observation, reading and meaningful conversations that expand your perspective.",
      "A thoughtful approach to belief and personal philosophy can help connect knowledge with inner understanding.",
      "Mercury encourages exploring spiritual ideas with curiosity while allowing personal experience to shape understanding.",
    ],


    education: [
      "Learning becomes more engaging as curiosity, memory and analytical thinking work together. Consistent practice can turn information into lasting understanding.",
      "Mercury strongly supports study through observation, questioning and active engagement with new ideas.",
      "Complex subjects become easier to approach when information is organized into practical and understandable steps.",
      "Intellectual growth improves through curiosity, repetition and the willingness to explore different perspectives.",
      "Learning progresses when knowledge is not simply collected but actively understood, tested and applied.",
    ],


    communication: [
      "Communication becomes clearer and more effective when ideas are organized before they are expressed.",
      "Mercury strengthens conversation, explanation and the ability to connect with others through meaningful exchange.",
      "Your words can carry greater influence when clarity is combined with patience and genuine listening.",
      "Ideas become easier to share as confidence, observation and thoughtful expression work together.",
      "Meaningful conversations can open opportunities, resolve uncertainty and strengthen important connections.",
    ],


    travel: [
      "Travel can bring useful information, new connections and opportunities to learn through direct experience.",
      "Movement and changing environments encourage curiosity, adaptability and exposure to new perspectives.",
      "Journeys become more rewarding when approached with flexibility and an openness to learning from unexpected experiences.",
      "Travel supports networking, exploration and the discovery of ideas that can broaden your perspective.",
      "New environments can stimulate curiosity and provide practical lessons through observation and interaction.",
    ],


    research: [
      "Mercury supports investigation through observation, questioning and careful analysis of information.",
      "Research becomes productive when curiosity is combined with attention to detail and logical evaluation.",
      "The ability to compare information and recognize patterns can lead to deeper understanding.",
      "Complex subjects become easier to explore when information is organized, questioned and examined from multiple perspectives.",
      "Mercury encourages intellectual curiosity and the disciplined search for useful knowledge.",
    ],


    ambition: [
      "Ambition becomes more effective when supported by strategy, knowledge and adaptability.",
      "Mercury helps turn ideas into practical plans by encouraging intelligent preparation and flexible thinking.",
      "Your goals can move forward through better information, stronger communication and thoughtful strategy.",
      "Strategic thinking allows you to adapt your approach without losing sight of the larger objective.",
      "Progress becomes easier when ambition is guided by knowledge rather than urgency alone.",
    ],

  },


  ////////////////////////////////////////////////////////////
  // NEUTRAL
  ////////////////////////////////////////////////////////////

  neutral: {

    overall: [
      "Mercury brings a period of learning, communication and adaptation. Progress develops through awareness and practical thinking.",
      "Mental activity remains important as new information and changing situations encourage thoughtful responses.",
      "This phase supports gradual improvement through observation, communication and consistent learning.",
      "Progress develops through understanding situations clearly and adapting decisions as circumstances change.",
      "Mercury encourages a balanced approach in which curiosity is supported by patience and practical judgment.",
    ],


    personality: [
      "Curiosity and flexibility remain active, encouraging you to observe situations before forming conclusions.",
      "Mercury highlights the importance of balanced thinking, communication and openness to different perspectives.",
      "Personal understanding develops through observation, conversation and learning from everyday experiences.",
      "Your thinking becomes clearer when curiosity is balanced with patience and emotional awareness.",
      "Adaptability remains useful as changing experiences reveal new ways of understanding yourself and others.",
    ],


    career: [
      "Career development improves gradually through communication, skill building and practical experience.",
      "Professional progress benefits from clear planning, useful conversations and continued learning.",
      "Mercury encourages strengthening skills that involve communication, organization and analytical thinking.",
      "Career direction becomes clearer as experience provides better information for future decisions.",
      "Consistent improvement in knowledge and communication can support steady professional development.",
    ],


    finance: [
      "Financial matters benefit from practical planning, careful comparison and awareness of available information.",
      "Resources are best managed through logical decisions and a clear understanding of priorities.",
      "Financial progress develops gradually when planning remains consistent and commitments are evaluated carefully.",
      "Mercury encourages reviewing information before making important financial choices.",
      "A balanced approach to money can develop through better organization and practical decision-making.",
    ],


    relationship: [
      "Relationships develop through communication, patience and a willingness to understand different viewpoints.",
      "Meaningful conversations can gradually improve understanding and reduce unnecessary uncertainty.",
      "Mercury highlights the importance of expressing thoughts clearly while also listening carefully.",
      "Connections become steadier when assumptions are replaced by honest and respectful conversation.",
      "Relationship growth develops through shared understanding, thoughtful communication and emotional awareness.",
    ],


    health: [
      "Well-being benefits from balanced routines and greater awareness of mental and physical needs.",
      "Mercury highlights the importance of managing mental activity alongside everyday responsibilities.",
      "Consistent routines can support better balance between productivity, rest and personal well-being.",
      "Awareness of stress and daily habits can help maintain a steadier sense of balance.",
      "Healthy progress develops through practical routines and attention to changing personal needs.",
    ],


    mind: [
      "Mercury encourages observation, reflection and gradual improvement in mental clarity.",
      "Thought processes become more balanced when information is organized and unnecessary distractions are reduced.",
      "Curiosity remains active, creating opportunities to understand situations through careful observation.",
      "Mental clarity develops through patience, learning and the willingness to reconsider assumptions.",
      "A balanced approach to information can help maintain focus while adapting to new ideas.",
    ],


    spirituality: [
      "Spiritual understanding develops gradually through reflection, study and personal experience.",
      "Mercury encourages exploring deeper questions through learning and thoughtful observation.",
      "Personal philosophy becomes clearer when knowledge is combined with reflection and lived experience.",
      "Reflection and meaningful conversations can provide new perspectives on personal values and beliefs.",
      "Spiritual growth develops through curiosity, awareness and an openness to understanding different viewpoints.",
    ],


    education: [
      "Learning improves through consistency, curiosity and active engagement with information.",
      "Knowledge develops gradually when study is supported by observation, practice and patience.",
      "Mercury encourages asking useful questions and connecting new information with existing understanding.",
      "Educational progress benefits from organized study and consistent attention to important details.",
      "Learning becomes more effective when information is understood rather than simply memorized.",
    ],


    communication: [
      "Communication develops through thoughtful expression, patience and careful listening.",
      "Mercury encourages exchanging ideas clearly while remaining open to different perspectives.",
      "Conversations become more productive when information is shared with clarity and awareness.",
      "Meaningful communication develops through understanding, observation and appropriate timing.",
      "Clear expression and attentive listening can gradually improve important interactions.",
    ],


    travel: [
      "Travel brings opportunities for learning, observation and adapting to changing environments.",
      "New experiences can broaden understanding through direct interaction with different people and situations.",
      "Movement remains productive when flexibility and practical planning work together.",
      "Travel encourages curiosity and provides opportunities to gather useful experiences and information.",
      "Journeys can support personal learning when new environments are approached with awareness.",
    ],


    research: [
      "Research progresses through careful observation, questioning and organized information gathering.",
      "Mercury supports investigation when curiosity is combined with patience and attention to detail.",
      "Understanding develops gradually as information is compared and examined from different perspectives.",
      "Complex questions become clearer through systematic observation and thoughtful analysis.",
      "Research benefits from maintaining curiosity while allowing evidence and careful evaluation to guide conclusions.",
    ],


    ambition: [
      "Ambition develops through planning, knowledge and the ability to adapt to changing circumstances.",
      "Mercury encourages turning ideas into practical steps rather than relying only on motivation.",
      "Goals become clearer as experience provides better information for strategic decisions.",
      "Progress improves when ambition is supported by preparation, communication and flexible thinking.",
      "A thoughtful strategy can help maintain direction while adapting to new opportunities.",
    ],

  },


  ////////////////////////////////////////////////////////////
  // CAUTION
  ////////////////////////////////////////////////////////////

  caution: {

    overall: [
      "Mercury asks for greater clarity before important decisions. Too much mental activity can create confusion when information is not organized carefully.",
      "This phase benefits from slowing down, checking details and separating useful information from unnecessary distractions.",
      "Progress improves when quick thinking is balanced with patience, verification and practical judgment.",
      "Important choices require careful communication and a willingness to reconsider assumptions before acting.",
      "Mental flexibility is valuable, but clarity becomes more important when several possibilities compete for attention.",
    ],


    personality: [
      "Mercury advises avoiding excessive overthinking and giving yourself enough time to understand situations clearly.",
      "Mental activity can become distracting when every detail receives equal attention. Focus on what is genuinely important.",
      "Flexibility is useful, but constantly changing direction may create unnecessary uncertainty.",
      "Try to balance analytical thinking with emotional awareness instead of relying entirely on logic.",
      "Clearer self-understanding develops when observation is combined with patience rather than immediate judgment.",
    ],


    career: [
      "Professional decisions require careful review of information, deadlines and communication before commitments are made.",
      "Avoid rushing through important work. Reviewing details can prevent misunderstandings and unnecessary corrections.",
      "Career progress benefits from organized thinking rather than reacting to every new opportunity immediately.",
      "Miscommunication can create avoidable complications, so clarify expectations before important professional decisions.",
      "Focus on completing priorities carefully instead of allowing too many competing ideas to divide attention.",
    ],


    finance: [
      "Financial decisions require accurate information and careful evaluation. Avoid acting simply because an opportunity appears attractive.",
      "Review numbers, terms and commitments carefully before making important financial choices.",
      "Mental speed should not replace financial discipline. Take time to compare options and understand consequences.",
      "Avoid impulsive purchases or commitments when important details remain unclear.",
      "Financial stability improves when decisions are based on verified information rather than assumptions or short-term excitement.",
    ],


    relationship: [
      "Mercury asks for patience in conversations. Words can be misunderstood when assumptions replace genuine listening.",
      "Avoid overanalyzing every message or interaction. Clear and direct communication can reduce unnecessary uncertainty.",
      "Relationship tension can ease when both sides are given enough space to explain their perspective.",
      "Think before responding during sensitive conversations, especially when emotions are already active.",
      "Healthy communication requires listening as carefully as expressing your own thoughts.",
    ],


    health: [
      "Mental overload can affect daily balance, making it important to create space for rest and recovery.",
      "Pay attention to stress, irregular routines and excessive mental stimulation.",
      "Well-being improves when productivity is balanced with sufficient rest and moments of mental quiet.",
      "Avoid allowing constant information and activity to overwhelm your daily rhythm.",
      "A calmer routine can help restore balance when the mind remains excessively active.",
    ],


    mind: [
      "Mercury advises reducing mental clutter and focusing on the information that genuinely requires attention.",
      "Overthinking can make simple decisions appear more complicated than they are. Return to facts and priorities.",
      "Too many possibilities may create hesitation, so organize your thoughts before choosing a direction.",
      "Mental clarity improves when distractions are reduced and important information is reviewed carefully.",
      "Give yourself time to process information rather than forcing immediate conclusions.",
    ],


    spirituality: [
      "Mercury encourages balancing intellectual questioning with patience and personal reflection.",
      "Too much analysis can sometimes distance you from direct experience. Allow understanding to develop naturally.",
      "Spiritual questions may require reflection rather than immediate answers.",
      "Avoid allowing conflicting information to create unnecessary uncertainty about your personal values.",
      "Let learning support reflection without turning every spiritual question into an intellectual debate.",
    ],


    education: [
      "Concentration requires attention as distractions can interfere with learning progress.",
      "Avoid collecting information without giving yourself enough time to understand and practice it.",
      "Review important concepts carefully before moving to more complex material.",
      "Learning improves when mental activity is structured rather than divided across too many subjects.",
      "Patience and repetition can be more useful than trying to absorb everything at once.",
    ],


    communication: [
      "Mercury advises thinking before speaking, especially when conversations involve sensitive subjects.",
      "Misunderstandings can arise when messages are incomplete or assumptions are left unexplained.",
      "Listen carefully before responding, particularly when different viewpoints are involved.",
      "Clear communication requires both accurate expression and genuine attention to what others are saying.",
      "Avoid unnecessary arguments created by reacting too quickly to incomplete information.",
    ],


    travel: [
      "Travel requires careful planning, attention to details and flexibility around changing circumstances.",
      "Double-check schedules, documents and important arrangements before moving forward.",
      "Unexpected changes can become easier to manage when plans include enough practical flexibility.",
      "Avoid rushing during transitions and give yourself sufficient time to handle important details.",
      "Awareness and preparation can reduce unnecessary confusion during journeys or unfamiliar situations.",
    ],


    research: [
      "Mercury advises verifying information carefully before accepting conclusions.",
      "Incomplete information can create misleading conclusions, so compare reliable evidence before deciding.",
      "Avoid allowing curiosity to become scattered across too many unrelated subjects.",
      "Careful documentation and attention to detail become especially important when working with complex information.",
      "Take time to distinguish useful evidence from assumptions, speculation or incomplete data.",
    ],


    ambition: [
      "Mercury advises balancing quick ideas with realistic planning and disciplined execution.",
      "Too many competing goals can dilute progress, so identify the priorities that deserve focused attention.",
      "Avoid changing direction repeatedly simply because a new idea appears attractive.",
      "Strategic thinking becomes more effective when plans are reviewed carefully before action.",
      "Ambition benefits from patience, preparation and clear priorities rather than constant urgency.",
    ],

  },

};





//////////////////////////////////////////////////////////////
// MERCURY DYNAMIC EXPLANATION
//////////////////////////////////////////////////////////////

function getMercuryExplanation(

  area: LanguageLifeArea

): string {


  switch (area) {


    case "personality":

      return "Mercury influences curiosity, observation, adaptability and the way personal experiences are understood and expressed.";


    case "career":

      return "Mercury influences professional intelligence, communication, strategic thinking and the ability to solve problems through information and analysis.";


    case "finance":

      return "Mercury influences financial decisions through calculation, information, comparison and practical planning.";


    case "relationship":

      return "Mercury influences relationships through communication, listening, interpretation and the exchange of thoughts and perspectives.";


    case "health":

      return "Mercury reflects the relationship between mental activity, daily routines, awareness and personal balance.";


    case "mind":

      return "Mercury represents thought processes, reasoning, observation, curiosity and mental adaptability.";


    case "spirituality":

      return "Mercury supports spiritual exploration through learning, questioning, reflection and the development of personal understanding.";


    case "education":

      return "Mercury represents learning ability, curiosity, memory, observation and the practical application of knowledge.";


    case "communication":

      return "Mercury influences expression, listening, interpretation and the ability to exchange ideas clearly.";


    case "travel":

      return "Mercury influences movement, networking, adaptability and learning through changing environments and experiences.";


    case "research":

      return "Mercury supports investigation, information gathering, logical comparison and the recognition of meaningful patterns.";


    case "ambition":

      return "Mercury influences strategy, planning, adaptability and the intelligent organization of goals and resources.";


    default:

      return "Mercury represents intelligence, communication, adaptability and learning. Its expression develops through observation, information and practical thinking.";

  }

}





//////////////////////////////////////////////////////////////
// MERCURY DYNAMIC GUIDANCE
//////////////////////////////////////////////////////////////

function getMercuryAdvice(

  area: LanguageLifeArea,

  tone: LanguageTone

): string {


  if (tone === "caution") {

    switch (area) {

      case "career":
        return "Review important details, clarify expectations and avoid rushing professional decisions.";

      case "finance":
        return "Verify information, compare options carefully and avoid making financial commitments impulsively.";

      case "relationship":
        return "Listen carefully, avoid assumptions and give important conversations enough time and clarity.";

      case "education":
        return "Reduce distractions, study consistently and give yourself enough time to understand important concepts.";

      case "communication":
        return "Think before responding, listen actively and make your meaning clear.";

      case "research":
        return "Verify evidence carefully and separate reliable information from assumptions before reaching conclusions.";

      case "mind":
        return "Reduce mental clutter, focus on priorities and give yourself time to process important information.";

      case "travel":
        return "Double-check arrangements and allow enough time to handle unexpected changes calmly.";

      case "ambition":
        return "Prioritize your goals, review your strategy and avoid changing direction too quickly.";

      default:
        return "Slow down, verify important information and allow clarity to guide your decisions.";

    }

  }


  switch (area) {

    case "personality":
      return "Stay curious while giving yourself time to observe, understand and respond thoughtfully.";

    case "career":
      return "Use communication, analysis and strategic thinking to strengthen your professional direction.";

    case "finance":
      return "Combine practical planning with careful analysis before making important financial choices.";

    case "relationship":
      return "Use honest communication, attentive listening and understanding to strengthen meaningful connections.";

    case "health":
      return "Maintain organized routines while balancing mental activity with sufficient rest and recovery.";

    case "mind":
      return "Use curiosity productively while maintaining focus on the information that truly matters.";

    case "spirituality":
      return "Explore ideas with curiosity while allowing reflection and personal experience to shape understanding.";

    case "education":
      return "Learn actively, practice consistently and connect new information with practical understanding.";

    case "communication":
      return "Express ideas clearly and give equal importance to listening and understanding.";

    case "travel":
      return "Stay flexible, remain observant and use new experiences as opportunities to learn.";

    case "research":
      return "Combine curiosity with careful observation, logical evaluation and attention to detail.";

    case "ambition":
      return "Turn ideas into practical plans and remain adaptable as new information becomes available.";

    default:
      return "Use knowledge, observation and communication skills to create clearer and more practical outcomes.";

  }

}





//////////////////////////////////////////////////////////////
// MERCURY INTERPRETER
//////////////////////////////////////////////////////////////

export function generateMercuryLanguage(

  area: LanguageLifeArea = "overall",

  tone: LanguageTone = "neutral"

): PlanetLanguageOutput {


  const toneLibrary =

    MERCURY_LIBRARY[tone];


  const sentences =

    toneLibrary[area]

    ??

    toneLibrary.overall

    ??

    MERCURY_LIBRARY.neutral.overall!;


  const index =

    new Date().getDate()

    %

    sentences.length;


  return {


    statement:

      sentences[index],


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


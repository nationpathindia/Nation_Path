//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// SUN LANGUAGE INTELLIGENCE
//
// Production Literature Layer v2
//
// No calculations.
// No prediction rules.
// No astronomy.
// Literature only.
//////////////////////////////////////////////////////////////

import type {
  LanguageLifeArea,
  LanguageTone,
  PlanetLanguageOutput,
} from "../types";

//////////////////////////////////////////////////////////////
// SUN LITERATURE DATABASE
//////////////////////////////////////////////////////////////

const SUN_LIBRARY: Record<
  LanguageTone,
  Partial<Record<LanguageLifeArea, string[]>>
> = {

  ////////////////////////////////////////////////////////////
  // POSITIVE
  ////////////////////////////////////////////////////////////

  positive: {

    overall: [
      "Sun strengthens your sense of direction and makes it easier to act from a clear understanding of what matters most. Progress comes when confidence is matched with responsibility.",
      "Sun brings greater visibility to personal strengths, encouraging you to take ownership of important decisions rather than waiting for circumstances to define your path.",
      "Sun supports a period of stronger self-belief and purposeful action. The more clearly you understand your priorities, the more effectively you can direct your energy.",
      "Sun emphasizes confidence, identity and purposeful movement. This is a useful phase for stepping forward without losing sight of responsibility.",
      "Sun encourages you to recognize where your natural authority can be used constructively, turning confidence into consistent progress."
    ],

    personality: [
      "Sun strengthens individuality and makes personal qualities more visible. Confidence grows when you act from genuine self-understanding rather than seeking constant approval.",
      "Sun encourages a stronger sense of identity. You may become more aware of the qualities that distinguish you and more willing to express them naturally.",
      "Sun supports personal maturity by connecting confidence with responsibility. Your strongest expression comes from knowing when to lead and when to listen.",
      "Sun highlights self-belief and personal presence. This can help you become more decisive without becoming overly dependent on outside validation.",
      "Sun encourages authentic self-expression. Confidence becomes most constructive when it reflects who you are rather than who you feel expected to be."
    ],

    career: [
      "Sun strengthens professional visibility and encourages you to take ownership of important responsibilities. Leadership becomes more effective when backed by preparation and accountability.",
      "Sun supports career progress through initiative and clearer professional direction. Opportunities improve when you are willing to be seen for the work you can genuinely handle.",
      "Sun can increase recognition for competence and leadership. Use this momentum to establish credibility rather than simply seeking attention.",
      "Sun encourages greater authority in professional matters. Decisions made with confidence, structure and accountability can strengthen your long-term position.",
      "Sun favors purposeful career movement. Taking responsibility for outcomes can distinguish you more strongly than simply trying to stand out."
    ],

    finance: [
      "Sun encourages stronger financial self-management. Confidence is useful when it leads to clearer priorities, disciplined spending and deliberate resource decisions.",
      "Sun supports financial progress through ownership and planning. The key is to make money decisions from a defined strategy rather than short-term confidence.",
      "Sun brings attention to personal resources and financial independence. Better results can come from knowing what deserves investment and what should be restrained.",
      "Sun favors practical financial confidence. Strong decisions are more likely when ambition is supported by budgeting, patience and awareness of consequences.",
      "Sun encourages you to take greater responsibility for financial direction. Consistency and deliberate choices can turn confidence into tangible stability."
    ],

    relationship: [
      "Sun encourages healthier relationships through honest self-expression and mutual respect. Stronger bonds develop when confidence leaves room for another person's perspective.",
      "Sun brings greater awareness of how your personality affects close connections. Authenticity helps relationships when it is balanced with consideration.",
      "Sun supports relationships in which both people can express themselves openly. Avoiding unnecessary competition can allow warmth and respect to grow.",
      "Sun highlights individuality within relationships. You can protect your own identity without making every disagreement a question of who is right.",
      "Sun encourages direct and sincere communication with people who matter to you. Confidence becomes attractive when it is accompanied by generosity and respect."
    ],

    health: [
      "Sun supports vitality when your daily rhythm is organized around consistency rather than extremes. Sustainable habits are more useful than short bursts of effort.",
      "Sun draws attention to personal energy and physical routine. A balanced relationship between activity, recovery and discipline can improve overall well-being.",
      "Sun encourages stronger awareness of how lifestyle choices affect your energy. Regular routines can help you use periods of high motivation constructively.",
      "Sun supports vitality through disciplined habits. The focus is less on doing everything at once and more on maintaining a rhythm you can sustain.",
      "Sun highlights the connection between confidence and healthy routine. Taking care of your energy can improve how effectively you handle responsibilities."
    ],

    mind: [
      "Sun strengthens mental clarity by helping you identify what deserves your attention. Decisions become easier when priorities are defined rather than constantly shifting.",
      "Sun supports a more decisive mindset. Confidence can reduce unnecessary hesitation, especially when you have already considered the practical consequences.",
      "Sun encourages clearer thinking around personal priorities and direction. Strong judgment comes from combining conviction with reflection.",
      "Sun brings greater awareness of your own decision-making patterns. This can help you replace self-doubt with measured confidence.",
      "Sun supports mental focus and purposeful thinking. Concentrating on what you can influence can make your decisions more effective."
    ],

    spirituality: [
      "Sun turns attention toward identity, purpose and the values that give direction to personal growth. Reflection can reveal where outer success and inner meaning need better alignment.",
      "Sun encourages a deeper understanding of purpose. Confidence becomes more meaningful when it grows from values rather than recognition alone.",
      "Sun supports inner development through self-awareness. Understanding why you pursue something can be as important as achieving it.",
      "Sun highlights the relationship between identity and purpose. Quiet reflection can help distinguish genuine aspiration from the desire to prove yourself.",
      "Sun encourages personal growth through conscious self-understanding. Inner confidence becomes stronger when it does not depend entirely on external recognition."
    ],

    education: [
      "Sun supports learning through confidence, concentration and willingness to take ownership of your progress. Consistent effort can turn ability into measurable improvement.",
      "Sun encourages students to trust their capacity while remaining open to correction. Confidence is most useful when it increases commitment to learning.",
      "Sun strengthens focus and academic self-belief. Clear goals can help direct energy toward subjects and skills that require sustained attention.",
      "Sun favors learning through active participation. Asking questions, presenting ideas and taking responsibility for weak areas can accelerate development.",
      "Sun supports educational growth by connecting confidence with discipline. Natural ability becomes more valuable when supported by regular practice."
    ],

    communication: [
      "Sun strengthens communication by giving greater confidence to your voice. Clear expression becomes more effective when certainty is balanced with attentive listening.",
      "Sun supports direct and purposeful communication. Your ideas may carry more impact when you explain them clearly instead of trying to dominate the conversation.",
      "Sun encourages stronger presence in conversations, presentations and important discussions. Confidence can improve expression when paired with respect.",
      "Sun highlights the value of speaking with conviction while remaining receptive to feedback. This balance can make your communication more persuasive.",
      "Sun supports communication that is clear, confident and authentic. Saying what you mean without unnecessary force can strengthen trust."
    ],

    ambition: [
      "Sun strengthens ambition by giving greater clarity to the goals you want to pursue. Progress improves when determination is supported by a realistic sense of responsibility.",
      "Sun encourages purposeful ambition rather than movement for recognition alone. Clear priorities can help direct your strongest efforts toward meaningful outcomes.",
      "Sun supports the confidence required to pursue larger goals. The important step is turning motivation into disciplined action.",
      "Sun brings stronger drive toward achievement and visibility. Sustainable progress comes from building capability alongside ambition.",
      "Sun encourages you to take your aspirations seriously while remaining patient with the process required to achieve them."
    ],

    travel: [
      "Sun favors travel that expands confidence, independence and perspective. Experiences become more valuable when they contribute to a clearer understanding of your direction.",
      "Sun can make travel more personally meaningful, especially when it gives you opportunities to step outside familiar roles and see yourself differently.",
      "Sun supports journeys connected with learning, visibility or personal growth. Planning well can help you make better use of the experience.",
      "Sun encourages exploration that strengthens independence and confidence. New environments may reveal abilities that are less visible in routine surroundings.",
      "Sun highlights the value of purposeful movement. Travel can be especially useful when it exposes you to people, ideas or situations that broaden your outlook."
    ],

    research: [
      "Sun supports research through confidence in your ability to pursue a question deeply. Clear objectives can help prevent strong curiosity from becoming scattered effort.",
      "Sun encourages you to take ownership of difficult subjects and develop your own informed position. Persistence becomes an advantage when supported by evidence.",
      "Sun strengthens confidence in analytical work, especially when you are willing to present conclusions clearly and defend them responsibly.",
      "Sun favors focused investigation and intellectual independence. Strong results can emerge when confidence is paired with careful verification.",
      "Sun encourages research that has a clear purpose. Knowing what you are trying to establish can make your investigation more efficient and meaningful."
    ],

  },

  ////////////////////////////////////////////////////////////
  // NEUTRAL
  ////////////////////////////////////////////////////////////

  neutral: {

    overall: [
      "Sun places attention on identity, confidence and personal direction. This is a phase for understanding how you use your strengths rather than forcing immediate results.",
      "Sun brings awareness to questions of purpose and self-expression. Progress develops gradually as confidence becomes more grounded in experience.",
      "Sun highlights the balance between personal authority and responsibility. The period is better used for steady development than unnecessary demonstrations of strength.",
      "Sun encourages a clearer understanding of personal priorities. Confidence can develop naturally when decisions are made with awareness.",
      "Sun keeps attention on personal growth, recognition and direction. Consistency matters more than trying to create immediate impact."
    ],

    personality: [
      "Sun brings greater awareness of personal identity and the way you express yourself. Confidence develops through experience rather than constant external validation.",
      "Sun highlights individual strengths while encouraging a more balanced relationship with confidence and responsibility.",
      "Sun creates an opportunity to understand which parts of your personality feel authentic and which are shaped by expectations around you.",
      "Sun encourages measured self-expression. You can become more confident without needing every situation to confirm your importance.",
      "Sun keeps personal development in focus, particularly the relationship between self-belief, responsibility and emotional maturity."
    ],

    career: [
      "Sun keeps professional direction and responsibility in focus. This is a useful period for strengthening your position through consistent work and clear priorities.",
      "Sun highlights the role of confidence in professional decisions, while reminding you that credibility develops through repeated performance.",
      "Sun encourages a measured approach to career visibility. Recognition is more sustainable when supported by dependable work.",
      "Sun brings attention to leadership and responsibility without requiring dramatic changes. Small improvements in professional ownership can matter.",
      "Sun supports gradual professional development through clarity, accountability and awareness of where your contribution is most valuable."
    ],

    finance: [
      "Sun brings attention to financial independence and responsible resource management. Clear priorities can help maintain a stable direction.",
      "Sun encourages greater awareness of how confidence influences financial decisions. Practical judgment remains more important than impulse.",
      "Sun highlights personal responsibility around money. A structured approach can help distinguish useful spending from unnecessary pressure.",
      "Sun keeps financial direction connected with discipline and self-management. Gradual improvement is more reliable than chasing quick results.",
      "Sun encourages thoughtful resource decisions and a clearer understanding of what financial stability means for you personally."
    ],

    relationship: [
      "Sun highlights individuality within close relationships. Healthy connections benefit from confidence that does not overshadow mutual understanding.",
      "Sun brings awareness to how personal pride and self-expression influence relationships. Honest communication can maintain balance.",
      "Sun encourages clearer expression of needs while leaving space for the other person's perspective.",
      "Sun keeps attention on respect, authenticity and personal boundaries. Strong relationships can accommodate individuality without unnecessary competition.",
      "Sun supports a balanced approach to connection, where confidence and consideration can exist together."
    ],

    health: [
      "Sun brings attention to vitality and personal routine. Consistency can be more useful than making abrupt changes to daily habits.",
      "Sun encourages awareness of energy levels and lifestyle balance. A sustainable rhythm can support better functioning.",
      "Sun highlights the value of regular routines and responsible self-care without suggesting the need for extremes.",
      "Sun keeps personal energy and discipline in focus. Paying attention to rest as well as activity can improve balance.",
      "Sun supports gradual improvement through awareness of daily habits and how they affect your available energy."
    ],

    mind: [
      "Sun highlights clarity, confidence and personal priorities. Taking time to define what matters can reduce unnecessary mental noise.",
      "Sun encourages a more deliberate approach to decisions. Confidence can develop as you learn from your own experience.",
      "Sun brings attention to self-belief and mental direction without demanding immediate conclusions.",
      "Sun supports clearer thinking through reflection on priorities, responsibilities and long-term direction.",
      "Sun keeps the mind focused on purposeful decisions and a more balanced understanding of personal strengths."
    ],

    spirituality: [
      "Sun brings attention to purpose and self-awareness. Reflection can help connect personal ambition with deeper values.",
      "Sun encourages examination of identity and the reasons behind important goals. Inner clarity develops gradually.",
      "Sun highlights personal meaning and conscious growth rather than external recognition alone.",
      "Sun supports reflection on what gives your efforts genuine purpose and direction.",
      "Sun keeps inner development connected with self-understanding, values and a clearer sense of purpose."
    ],

    education: [
      "Sun highlights confidence and personal responsibility in learning. Steady effort can gradually strengthen existing abilities.",
      "Sun encourages a balanced relationship with academic confidence, allowing curiosity and discipline to develop together.",
      "Sun brings attention to learning goals and the importance of taking ownership of weaker areas.",
      "Sun supports gradual educational progress through focus, participation and consistent practice.",
      "Sun keeps personal potential in focus while reminding you that ability becomes stronger through disciplined learning."
    ],

    communication: [
      "Sun highlights confidence in expression and the importance of communicating with clarity.",
      "Sun encourages direct communication while keeping awareness of how your words affect others.",
      "Sun brings greater attention to personal presence in conversations and presentations.",
      "Sun supports clearer expression when confidence is balanced with listening and consideration.",
      "Sun keeps communication connected with authenticity, purpose and thoughtful expression."
    ],

    ambition: [
      "Sun keeps ambition connected with identity and long-term direction. Clear priorities can help maintain steady progress.",
      "Sun encourages confidence in pursuing meaningful goals without creating unnecessary pressure for immediate results.",
      "Sun highlights personal drive while reminding you that sustainable achievement develops over time.",
      "Sun supports measured ambition through clarity, commitment and consistent effort.",
      "Sun brings awareness to the difference between genuine aspiration and the need for recognition."
    ],

    travel: [
      "Sun highlights travel as an opportunity to gain perspective and confidence. Meaningful experiences can influence personal direction.",
      "Sun encourages purposeful movement and exposure to environments that broaden understanding.",
      "Sun brings attention to independence and personal growth through new surroundings.",
      "Sun supports travel experiences that encourage learning, confidence and a broader perspective.",
      "Sun keeps exploration connected with self-discovery and purposeful experience."
    ],

    research: [
      "Sun highlights confidence and ownership in research. Clear objectives can help maintain direction.",
      "Sun encourages independent investigation while keeping attention on evidence and disciplined reasoning.",
      "Sun brings focus to intellectual confidence and the ability to develop a considered position.",
      "Sun supports research through persistence, clarity and willingness to examine ideas carefully.",
      "Sun keeps analytical work connected with purpose, confidence and responsible conclusions."
    ],

  },

  ////////////////////////////////////////////////////////////
  // CAUTION
  ////////////////////////////////////////////////////////////

  caution: {

    overall: [
      "Sun asks for a careful balance between confidence and pride. Progress can slow when the need to prove yourself becomes stronger than the actual objective.",
      "Sun suggests reviewing how personal ambition influences decisions. Confidence is useful, but it becomes less constructive when feedback is ignored.",
      "Sun brings attention to the risk of overestimating control. Strong intentions work better when combined with patience and awareness of circumstances.",
      "Sun encourages you to protect confidence without turning every disagreement into a challenge to your authority.",
      "Sun highlights the need to separate genuine leadership from the desire for recognition. Quiet consistency may produce better results than forceful action."
    ],

    personality: [
      "Sun asks you to watch for excessive pride or sensitivity to criticism. Confidence becomes stronger when it can tolerate honest feedback.",
      "Sun suggests avoiding the need to constantly establish your importance. Authentic confidence does not require every situation to revolve around you.",
      "Sun can make personal reactions stronger when identity feels challenged. Pause before treating disagreement as disrespect.",
      "Sun encourages humility alongside self-belief. Recognizing your limitations can strengthen rather than diminish your authority.",
      "Sun highlights the difference between confidence and defensiveness. The ability to reconsider yourself can be a sign of maturity."
    ],

    career: [
      "Sun advises against forcing recognition or authority at work. Professional credibility is better protected through dependable performance than unnecessary confrontation.",
      "Sun suggests being careful with workplace pride. A strong position can weaken if feedback is interpreted as a personal challenge.",
      "Sun asks you to balance leadership with collaboration. Trying to control every decision may create resistance that could have been avoided.",
      "Sun highlights the risk of acting too quickly from professional confidence. Review consequences before making high-visibility decisions.",
      "Sun encourages responsible use of authority. Recognition is more durable when colleagues can trust your judgment as well as your ambition."
    ],

    finance: [
      "Sun asks for restraint when financial confidence becomes overconfidence. Avoid decisions made mainly to demonstrate independence or status.",
      "Sun suggests reviewing spending and investment choices carefully before acting on optimism. Confidence should remain connected to actual resources.",
      "Sun highlights the risk of tying financial decisions to pride or recognition. Practical limits are more important than appearances.",
      "Sun encourages caution around unnecessary financial commitments. A strong desire for control does not remove the need for planning.",
      "Sun asks you to protect financial stability by separating genuine opportunity from the urge to prove what you can afford."
    ],

    relationship: [
      "Sun asks for humility in close relationships. Attempts to always be right can create distance even when your intentions are good.",
      "Sun suggests watching for pride during disagreements. Listening fully before responding can prevent unnecessary tension.",
      "Sun highlights the risk of making relationships revolve around personal needs or recognition.",
      "Sun encourages you to express yourself without turning confidence into dominance. Mutual respect is essential when emotions are strong.",
      "Sun asks for greater flexibility in relationships. A willingness to acknowledge another person's perspective can protect important bonds."
    ],

    health: [
      "Sun suggests avoiding extremes driven by confidence or impatience. Pushing harder is not always the same as making progress.",
      "Sun asks for better balance between activity and recovery. Ignoring signs of fatigue can reduce the effectiveness of otherwise positive routines.",
      "Sun highlights the risk of overcommitting energy. Sustainable habits are preferable to forcing rapid changes.",
      "Sun encourages attention to rest and routine when personal drive becomes excessive.",
      "Sun asks you to respect your limits and avoid treating constant productivity as the only measure of well-being."
    ],

    mind: [
      "Sun asks for caution around excessive certainty. A strong opinion becomes more useful when there is still room to reconsider it.",
      "Sun suggests slowing down when pride or frustration begins influencing decisions. Perspective can improve the quality of judgment.",
      "Sun highlights the risk of becoming too attached to your own interpretation of a situation.",
      "Sun encourages reflection before decisive action, particularly when your sense of authority feels challenged.",
      "Sun asks you to distinguish conviction from rigidity. Mental strength includes the ability to revise a position when evidence changes."
    ],

    spirituality: [
      "Sun asks you to look beyond external recognition when considering personal purpose. Inner development can be weakened when achievement becomes the only measure of worth.",
      "Sun suggests examining whether ambition is serving your values or simply feeding the need for validation.",
      "Sun highlights the importance of humility in personal growth. Not every lesson needs to confirm your existing identity.",
      "Sun encourages deeper reflection on purpose when external success feels less satisfying than expected.",
      "Sun asks for a quieter form of self-awareness, one that does not depend on being noticed or affirmed."
    ],

    education: [
      "Sun asks students to avoid letting confidence become resistance to correction. Feedback can reveal gaps that ability alone cannot overcome.",
      "Sun suggests balancing academic ambition with patience. Trying to prove competence too quickly can interfere with genuine learning.",
      "Sun highlights the risk of overlooking difficult subjects because they challenge confidence.",
      "Sun encourages humility in learning. Asking for help when necessary can strengthen progress rather than diminish independence.",
      "Sun asks for disciplined study instead of relying too heavily on natural ability or previous success."
    ],

    communication: [
      "Sun asks for care with tone and certainty. Speaking confidently can lose its impact when others feel they are not being heard.",
      "Sun suggests avoiding overly forceful expression during disagreements. Clarity does not require dominance.",
      "Sun highlights the risk of turning communication into a contest of authority.",
      "Sun encourages listening before responding when conversations become personally charged.",
      "Sun asks you to protect the strength of your message by removing unnecessary defensiveness."
    ],

    ambition: [
      "Sun asks you to examine whether ambition is driven by meaningful goals or by the need to prove yourself.",
      "Sun suggests avoiding pressure for immediate recognition. Strong foundations are more valuable than visible but unstable progress.",
      "Sun highlights the risk of taking on too much simply to demonstrate capability.",
      "Sun encourages disciplined ambition rather than competitive urgency. Not every opportunity needs to become a test of your strength.",
      "Sun asks for patience with long-term goals. Confidence can remain strong without demanding immediate confirmation."
    ],

    travel: [
      "Sun suggests avoiding overly ambitious travel plans that leave little room for rest or unexpected changes.",
      "Sun asks for practical planning when travel becomes connected with proving independence or capability.",
      "Sun highlights the importance of flexibility in unfamiliar environments. Confidence should not become resistance to changing circumstances.",
      "Sun encourages meaningful exploration without turning every journey into a performance or achievement.",
      "Sun asks you to balance independence with awareness when moving through unfamiliar situations."
    ],

    research: [
      "Sun asks you to guard against becoming too attached to an early conclusion. Confidence in an idea should not replace verification.",
      "Sun suggests testing assumptions carefully before presenting a strong position.",
      "Sun highlights the risk of allowing intellectual pride to narrow the investigation.",
      "Sun encourages openness to evidence that challenges your preferred interpretation.",
      "Sun asks for disciplined reasoning when confidence in your analytical ability becomes particularly strong."
    ],

  },

};

//////////////////////////////////////////////////////////////
// VARIATION HELPERS
//////////////////////////////////////////////////////////////

function getStableIndex(
  area: LanguageLifeArea,
  tone: LanguageTone,
  length: number
): number {

  if (length <= 1) {
    return 0;
  }

  const seed =
    `${area}:${tone}:sun`
      .split("")
      .reduce(
        (sum, char) =>
          sum + char.charCodeAt(0),
        0
      );

  return seed % length;
}

//////////////////////////////////////////////////////////////
// EXPLANATION LIBRARY
//////////////////////////////////////////////////////////////

const SUN_EXPLANATIONS: Record<
  LanguageTone,
  Partial<Record<LanguageLifeArea, string[]>>
> = {

  positive: {
    overall: [
      "The Sun emphasizes identity, confidence and purposeful action, making personal direction an important part of how this influence is experienced.",
      "This influence is centered on self-expression, responsibility and the conscious use of personal strengths.",
    ],

    career: [
      "In professional matters, the Sun is expressed through visibility, leadership, responsibility and the way personal authority is used.",
      "Career themes become more connected with recognition, ownership and purposeful contribution under this influence.",
    ],

    finance: [
      "Financially, the Sun relates to independence, resource ownership and the confidence to make deliberate choices.",
      "The financial expression of the Sun is strongest when confidence is supported by practical responsibility.",
    ],

    relationship: [
      "In relationships, the Sun emphasizes individuality, honest expression and the balance between personal identity and mutual respect.",
      "The relational side of the Sun is expressed through confidence, openness and the ability to maintain individuality without creating unnecessary competition.",
    ],
  },

  neutral: {
    overall: [
      "The Sun represents identity, confidence and personal purpose, so its influence often becomes visible through questions of direction and self-expression.",
      "This influence centers on the relationship between self-belief, responsibility and purposeful development.",
    ],

    career: [
      "Professionally, the Sun relates to responsibility, visibility and the gradual development of authority.",
      "Career expression under the Sun is connected with recognition, contribution and personal ownership.",
    ],

    finance: [
      "Financially, the Sun relates to independence, personal resources and responsible decision-making.",
      "The Sun's financial expression concerns how confidence and self-management shape resource choices.",
    ],

    relationship: [
      "In relationships, the Sun represents individuality, self-expression and the ability to maintain confidence without losing mutual respect.",
      "Its relational expression is shaped by the balance between personal identity and consideration for others.",
    ],
  },

  caution: {
    overall: [
      "The challenging side of the Sun can appear when confidence becomes pride or when recognition becomes more important than the underlying purpose.",
      "This influence requires awareness of the boundary between healthy self-belief and excessive attachment to authority or validation.",
    ],

    career: [
      "Professionally, the caution lies in using authority constructively rather than turning recognition or control into a source of unnecessary conflict.",
      "Career pressure can become more difficult when personal pride starts influencing professional judgment.",
    ],

    finance: [
      "Financial caution under the Sun concerns overconfidence, status-driven decisions and the tendency to underestimate practical limits.",
      "The financial lesson is to keep confidence connected with actual resources and long-term stability.",
    ],

    relationship: [
      "In relationships, the caution concerns pride, dominance and the difficulty of accepting another person's perspective.",
      "The relational challenge is maintaining individuality without allowing self-importance to weaken mutual understanding.",
    ],
  },

};

//////////////////////////////////////////////////////////////
// ADVICE LIBRARY
//////////////////////////////////////////////////////////////

const SUN_ADVICE: Record<
  LanguageTone,
  Partial<Record<LanguageLifeArea, string[]>>
> = {

  positive: {
    overall: [
      "Use confidence to take responsibility for meaningful decisions, while remaining open to feedback.",
      "Let your strengths become visible through consistent action rather than through the need to prove yourself.",
    ],

    career: [
      "Take ownership of important work and let reliability strengthen the authority you are building.",
      "Lead where your experience supports it, and make recognition a result of contribution rather than the main objective.",
    ],

    finance: [
      "Set clear financial priorities and let discipline guide decisions when confidence is high.",
      "Use financial confidence to build stability rather than increasing commitments simply because you feel capable.",
    ],

    relationship: [
      "Express yourself honestly while making equal room for the other person's needs and perspective.",
      "Protect individuality without turning differences into contests of importance.",
    ],
  },

  neutral: {
    overall: [
      "Build confidence through experience, responsibility and honest self-reflection.",
      "Allow personal direction to develop steadily rather than forcing immediate certainty.",
    ],

    career: [
      "Strengthen professional credibility through consistent responsibility and clear priorities.",
      "Focus on dependable contribution before seeking greater visibility or authority.",
    ],

    finance: [
      "Keep financial choices practical and aligned with clearly defined priorities.",
      "Review resources carefully and let discipline support financial independence.",
    ],

    relationship: [
      "Communicate your needs clearly while preserving space for mutual understanding.",
      "Let confidence support openness rather than becoming a reason to control the relationship.",
    ],
  },

  caution: {
    overall: [
      "Pause before acting from pride, and ask whether the decision serves the goal or simply protects your ego.",
      "Keep confidence grounded in evidence, responsibility and willingness to reconsider.",
    ],

    career: [
      "Avoid unnecessary power struggles and let the quality of your work establish your position.",
      "Before making a high-visibility decision, consider how it affects both the objective and the people involved.",
    ],

    finance: [
      "Avoid status-driven commitments and make decisions according to actual resources.",
      "Give major financial choices enough time for practical review before acting on confidence.",
    ],

    relationship: [
      "During disagreement, listen fully before defending your position.",
      "Choose mutual understanding over the need to win an argument.",
    ],
  },

};

//////////////////////////////////////////////////////////////
// SAFE LIBRARY RESOLUTION
//////////////////////////////////////////////////////////////

function resolveLibraryText(
  library: Record<
    LanguageTone,
    Partial<Record<LanguageLifeArea, string[]>>
  >,
  tone: LanguageTone,
  area: LanguageLifeArea
): string {

  const toneLibrary =
    library[tone];

  const candidates =
    toneLibrary[area]
    ??
    toneLibrary.overall
    ??
    library.neutral.overall
    ??
    [];

  if (!candidates.length) {
    return "Sun encourages greater awareness of identity, purpose and responsible self-expression.";
  }

  const index =
    getStableIndex(
      area,
      tone,
      candidates.length
    );

  return candidates[index];
}

//////////////////////////////////////////////////////////////
// SUN INTERPRETER
//////////////////////////////////////////////////////////////

export function generateSunLanguage(
  area: LanguageLifeArea = "overall",
  tone: LanguageTone = "neutral"
): PlanetLanguageOutput {

  const statement =
    resolveLibraryText(
      SUN_LIBRARY,
      tone,
      area
    );

  const explanation =
    resolveLibraryText(
      SUN_EXPLANATIONS,
      tone,
      area
    );

  const advice =
    resolveLibraryText(
      SUN_ADVICE,
      tone,
      area
    );

  return {

    statement,

    explanation,

    advice,

  };

}

//////////////////////////////////////////////////////////////
// EXPORT
//////////////////////////////////////////////////////////////

export {
  SUN_LIBRARY,
};


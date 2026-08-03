//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// NATURAL LANGUAGE INTELLIGENCE LAYER
//
// Production Version v4.1 FUTURE PROOF LOCK
//
// Responsibilities:
//
// Prediction Data
//        ↓
// Context Intelligence
//        ↓
// Narrative Intelligence
//        ↓
// Premium Horoscope Language
//
// Does NOT:
// - Calculate planets
// - Modify astrology rules
// - Change scoring
// - Change planetary strength
// - Change API contract
//////////////////////////////////////////////////////////////

import type {

  PredictionRanking,

  PlanetPrediction,

  LifePrediction,

} from "./types";



//////////////////////////////////////////////////////////////
// ENGINE STATUS
//////////////////////////////////////////////////////////////

export const LANGUAGE_ENGINE_STATUS =

"PRODUCTION";


export const LANGUAGE_ENGINE_VERSION =

"v4.1-FUTURE-PROOF";





//////////////////////////////////////////////////////////////
// SAFE UTILITIES
//////////////////////////////////////////////////////////////

function safeArray<T>(

  value:T[] | undefined | null

):T[] {

  return Array.isArray(value)

    ? value

    : [];

}





function normalizeText(

  value:string | undefined | null

):string {

  return (

    value ?? ""

  )

  .toLowerCase()

  .replace(

    /[^a-z0-9\s]/g,

    ""

  )

  .replace(

    /\s+/g,

    " "

  )

  .trim();

}





function capitalize(

  value:string

):string {

  if(!value){

    return "";

  }


  return (

    value.charAt(0).toUpperCase()

    +

    value.slice(1)

  );

}





function cleanTitle(

  value:string | undefined | null

):string {

  return (

    value ?? ""

  )

  .replace(

    / influence/gi,

    ""

  )

  .trim();

}





function clamp(

  value:number

):number {

  return Math.max(

    0,

    Math.min(

      100,

      Math.round(value)

    )

  );

}





//////////////////////////////////////////////////////////////
// CONTEXT MEMORY SYSTEM v2
//////////////////////////////////////////////////////////////

function createMemoryKey(

  entity:string,

  context?:string,

  theme?:string

):string {


  return [

    normalizeText(entity),

    normalizeText(context),

    normalizeText(theme)

  ]

  .filter(Boolean)

  .join("_");

}





function uniqueSentences(

  values:string[]

):string[] {


  const memory = new Set<string>();


  return values.filter(

    value => {


      const key = normalizeText(

        value

      );


      if(

        !key ||

        memory.has(key)

      ){

        return false;

      }


      memory.add(key);


      return true;

    }

  );

}






//////////////////////////////////////////////////////////////
// TONE INTELLIGENCE
//////////////////////////////////////////////////////////////

type LanguageTone =

"strong"

|

"balanced"

|

"caution";





function getTone(

 score:number

):LanguageTone {


  if(score >= 85){

    return "strong";

  }


  if(score >= 60){

    return "balanced";

  }


  return "caution";

}





//////////////////////////////////////////////////////////////
// ZODIAC LANGUAGE INTELLIGENCE
//////////////////////////////////////////////////////////////

type ZodiacProfile = {

  nature:string;

  communication:string;

  guidance:string;

  growth:string;

};





const ZODIAC_LANGUAGE_PROFILE:

Record<string,ZodiacProfile> = {


  aries:{

    nature:

    "initiative, courage and forward movement",

    communication:

    "direct expression balanced with patience",

    guidance:

    "channel energy through thoughtful decisions",

    growth:

    "confidence and purposeful action"

  },



  taurus:{

    nature:

    "stability, patience and practical growth",

    communication:

    "calm expression and reliable choices",

    guidance:

    "build progress through consistency",

    growth:

    "steady improvement and long term results"

  },



  gemini:{

    nature:

    "learning, communication and new ideas",

    communication:

    "curiosity, adaptability and thoughtful exchange",

    guidance:

    "combine flexibility with focused thinking",

    growth:

    "knowledge and intelligent decisions"

  },



  cancer:{

    nature:

    "emotional awareness, care and protection",

    communication:

    "sensitivity combined with clear expression",

    guidance:

    "trust intuition while maintaining balance",

    growth:

    "emotional strength and inner stability"

  },



  leo:{

    nature:

    "creativity, confidence and self expression",

    communication:

    "authentic expression with humility",

    guidance:

    "lead with awareness and responsibility",

    growth:

    "personal confidence and recognition"

  },



  virgo:{

    nature:

    "analysis, improvement and practical solutions",

    communication:

    "clarity, detail and thoughtful planning",

    guidance:

    "focus on improvement without overthinking",

    growth:

    "skill development and practical success"

  },



  libra:{

    nature:

    "balance, relationships and cooperation",

    communication:

    "diplomacy and understanding",

    guidance:

    "maintain harmony through wise choices",

    growth:

    "partnerships and balanced progress"

  },



  scorpio:{

    nature:

    "transformation, depth and determination",

    communication:

    "honest expression and emotional awareness",

    guidance:

    "use intensity with patience",

    growth:

    "inner strength and meaningful change"

  },



  sagittarius:{

    nature:

    "exploration, learning and expansion",

    communication:

    "optimism and broader perspectives",

    guidance:

    "combine enthusiasm with responsibility",

    growth:

    "wisdom and new experiences"

  },



  capricorn:{

    nature:

    "discipline, ambition and achievement",

    communication:

    "practical thinking and maturity",

    guidance:

    "progress through patience and structure",

    growth:

    "long term success"

  },



  aquarius:{

    nature:

    "innovation, independence and future thinking",

    communication:

    "original ideas and open perspectives",

    guidance:

    "balance individuality with cooperation",

    growth:

    "creative solutions and new possibilities"

  },



  pisces:{

    nature:

    "intuition, compassion and imagination",

    communication:

    "emotional understanding and creativity",

    guidance:

    "follow intuition with practical awareness",

    growth:

    "spiritual understanding and inspiration"

  }


};





function getZodiacProfile(

 zodiac?:string

):ZodiacProfile {


  return (

    ZODIAC_LANGUAGE_PROFILE[

      normalizeText(zodiac)

    ]

    ??

    {

      nature:

      "personal growth and awareness",

      communication:

      "clear expression and understanding",

      guidance:

      "balanced decisions",

      growth:

      "continuous improvement"

    }

  );

}

//////////////////////////////////////////////////////////////
// NARRATIVE VARIATION INTELLIGENCE v1
//////////////////////////////////////////////////////////////

function getNarrativeVariation(
  zodiac?: string,
  area?: string
): string {

  const sign = normalizeText(zodiac);
  const theme = normalizeText(area);


  if(sign === "aries"){
    return "with initiative and confident action";
  }

  if(sign === "taurus"){
    return "through patience, stability and practical choices";
  }

  if(sign === "gemini"){
    return "through learning, communication and adaptability";
  }

  if(sign === "cancer"){
    return "through emotional awareness and thoughtful decisions";
  }

  if(sign === "leo"){
    return "through creativity, confidence and self-expression";
  }

  if(sign === "virgo"){
    return "through analysis, improvement and careful planning";
  }

  if(sign === "libra"){
    return "through balance, cooperation and meaningful connections";
  }

  if(sign === "scorpio"){
    return "through transformation, depth and focused determination";
  }

  if(sign === "sagittarius"){
    return "through exploration, wisdom and broader perspectives";
  }

  if(sign === "capricorn"){
    return "through discipline, structure and long-term vision";
  }

  if(sign === "aquarius"){
    return "through innovation, originality and future thinking";
  }

  if(sign === "pisces"){
    return "through intuition, creativity and compassionate understanding";
  }


  return "through awareness and balanced progress";

}

//////////////////////////////////////////////////////////////
// PLANET LANGUAGE INTELLIGENCE v4.1
//////////////////////////////////////////////////////////////

type PlanetProfile = {

  identity:string;

  strong:string;

  balanced:string;

  caution:string;

};





const PLANET_LANGUAGE_PROFILE:

Record<string,PlanetProfile> = {



  sun:{

    identity:

    "confidence, leadership and personal expression",

    strong:

    "Sun strengthens confidence, leadership and the ability to express personal strengths clearly. This phase supports decisive action and stronger self-belief.",

    balanced:

    "Sun supports steady confidence and encourages responsible expression of abilities. Balanced choices help build recognition over time.",

    caution:

    "Sun asks for awareness around pride and personal expectations. Humility and patience help transform ambition into positive progress."

  },





  moon:{

    identity:

    "emotional awareness, intuition and inner balance",

    strong:

    "Moon enhances emotional understanding, intuition and inner stability. This period supports reflection, creativity and meaningful connections.",

    balanced:

    "Moon encourages emotional balance and thoughtful responses. Awareness of feelings helps create better decisions.",

    caution:

    "Moon requires emotional patience and calm reflection. Avoiding unnecessary reactions can protect inner peace."

  },





  mars:{

    identity:

    "action, courage and determination",

    strong:

    "Mars increases motivation, courage and the ability to take initiative. Focused energy can create meaningful progress.",

    balanced:

    "Mars supports steady effort and practical action. Controlled determination helps achieve better outcomes.",

    caution:

    "Mars requires patience before major actions. Managing impulses and using energy wisely creates better results."

  },





  mercury:{

    identity:

    "communication, intelligence and adaptability",

    strong:

    "Mercury sharpens communication, learning ability and decision making. This phase supports ideas, discussions and new opportunities.",

    balanced:

    "Mercury supports thoughtful communication and practical learning. Clear expression improves progress.",

    caution:

    "Mercury asks for careful communication and attention to details. Patience helps avoid misunderstandings."

  },





  jupiter:{

    identity:

    "growth, wisdom and expansion",

    strong:

    "Jupiter expands opportunities through wisdom, learning and positive guidance. This phase supports growth and broader possibilities.",

    balanced:

    "Jupiter encourages gradual growth through knowledge and experience. Consistent effort creates lasting improvement.",

    caution:

    "Jupiter reminds you to balance optimism with practical planning. Awareness helps manage expectations."

  },





  venus:{

    identity:

    "relationships, creativity and harmony",

    strong:

    "Venus enhances harmony, creativity and meaningful connections. This period supports appreciation and positive relationships.",

    balanced:

    "Venus encourages balance in relationships and personal interests. Patience supports emotional stability.",

    caution:

    "Venus asks for balanced choices in desires and relationships. Awareness helps maintain harmony."

  },





  saturn:{

    identity:

    "discipline, responsibility and long term growth",

    strong:

    "Saturn rewards discipline, patience and consistent effort. Structured actions can create strong foundations.",

    balanced:

    "Saturn encourages responsibility and gradual progress. Persistence becomes an important strength.",

    caution:

    "Saturn requires patience during delays or challenges. Discipline and acceptance help overcome obstacles."

  },





  rahu:{

    identity:

    "ambition, innovation and unusual opportunities",

    strong:

    "Rahu creates opportunities through innovation, ambition and new experiences. Awareness can help channel this energy positively.",

    balanced:

    "Rahu encourages exploration and new perspectives. Practical thinking helps use opportunities wisely.",

    caution:

    "Rahu requires clarity before major decisions. Avoiding confusion and unrealistic expectations brings balance."

  },





  ketu:{

    identity:

    "intuition, research and inner transformation",

    strong:

    "Ketu supports deeper understanding, intuition and personal transformation. Reflection can reveal valuable insights.",

    balanced:

    "Ketu encourages observation and inner awareness. Quiet focus supports meaningful growth.",

    caution:

    "Ketu asks for grounding and clarity. Staying connected with practical responsibilities creates balance."

  }

};





function getPlanetProfile(

 planet:string

):PlanetProfile {


  return (

    PLANET_LANGUAGE_PROFILE[

      normalizeText(planet)

    ]

    ??

    {

      identity:

      "personal growth and awareness",

      strong:

      `${capitalize(planet)} supports positive development and meaningful progress.`,

      balanced:

      `${capitalize(planet)} encourages steady improvement through awareness.`,

      caution:

      `${capitalize(planet)} requires patience and thoughtful decisions.`

    }

  );

}








//////////////////////////////////////////////////////////////
// CONTEXT COMPOSER
//////////////////////////////////////////////////////////////

type LanguageContext = {

  zodiac?:string;

  planet?:string;

  area?:string;

  score:number;

  tone:LanguageTone;

};





function createLanguageContext(

 data:{

   zodiac?:string;

   planet?:string;

   area?:string;

   score:number;

 }

):LanguageContext {


  return {

    zodiac:data.zodiac,

    planet:data.planet,

    area:data.area,

    score:data.score,

    tone:getTone(data.score)

  };

}








//////////////////////////////////////////////////////////////
// PREMIUM PLANET SENTENCE GENERATOR
//////////////////////////////////////////////////////////////

function generatePlanetSentence(

 planet:PlanetPrediction,

 zodiac?:string

):string {


  const context = createLanguageContext({

    zodiac,

    planet:planet.planet,

    score:planet.strengthScore

  });



  const profile = getPlanetProfile(

    planet.planet

  );



  if(context.tone === "strong"){

    return profile.strong;

  }



  if(context.tone === "caution"){

    return profile.caution;

  }



  return profile.balanced;

}







//////////////////////////////////////////////////////////////
// PLANET SUPPORT SENTENCE
//////////////////////////////////////////////////////////////

function generatePlanetPositive(

 planet:PlanetPrediction

):string {


  const profile = getPlanetProfile(

    planet.planet

  );


  return (

    `${capitalize(planet.planet)} supports growth through ${profile.identity}.`

  );

}







//////////////////////////////////////////////////////////////
// PLANET CAUTION SENTENCE
//////////////////////////////////////////////////////////////

function generatePlanetCaution(

 planet:PlanetPrediction

):string {


  return (

    `${capitalize(planet.planet)} requires awareness, patience and balanced decisions to use its influence constructively.`

  );

}
//////////////////////////////////////////////////////////////
// RANKING INTELLIGENCE v4.1
//////////////////////////////////////////////////////////////

function isNoiseRanking(

 ranking:PredictionRanking

):boolean {


  const title = normalizeText(

    ranking.title

  );


  return (

    title.includes("overall")

    ||

    title.includes("general")

  );

}





function shouldUseRanking(

 ranking:PredictionRanking

):boolean {


  return (

    !isNoiseRanking(ranking)

    &&

    ranking.score >=45

  );

}








//////////////////////////////////////////////////////////////
// ZODIAC AWARE RANKING LANGUAGE
//////////////////////////////////////////////////////////////
function generateRankingSentence(

  ranking:PredictionRanking,

  zodiac?:string

):string {

 console.log(
    "RANKING INTELLIGENCE CHECK",
    {
      zodiac,
      title: ranking.title,
      score: ranking.score
    }
  );
  
  const name = capitalize(

    cleanTitle(

      ranking.title

    )

  );


  const normalizedName = normalizeText(

    name

  );


  const profile = getZodiacProfile(

    zodiac

  );


  const tone = getTone(

    ranking.score

  );



  ////////////////////////////////////////////////////////////
  // COMMUNICATION INTELLIGENCE
  ////////////////////////////////////////////////////////////

  if(

    normalizedName.includes("communication")

  ){


    if(

      normalizeText(zodiac)

      ===

      "gemini"

    ){

      return (

        `${name} becomes a major strength through learning, adaptability and thoughtful exchange. Curiosity and clear expression can create meaningful progress.`

      );

    }



    if(

      normalizeText(zodiac)

      ===

      "aries"

    ){

      return (

        `${name} improves when confidence and direct expression are balanced with patience. Thoughtful communication creates stronger results.`

      );

    }


  }





  ////////////////////////////////////////////////////////////
  // SPIRITUALITY INTELLIGENCE
  ////////////////////////////////////////////////////////////

  if(

    normalizedName.includes("spiritual")

  ){


    return (

      `${name} develops through reflection, awareness and deeper understanding. Inner balance and thoughtful choices support meaningful personal growth.`

    );

  }





  ////////////////////////////////////////////////////////////
  // CAREER INTELLIGENCE
  ////////////////////////////////////////////////////////////

  if(

    normalizedName.includes("career")

  ){


    return (

      `${name} progresses through focused effort, skill development and responsible decisions. ${capitalize(profile.growth)} can help create better opportunities.`

    );

  }





  ////////////////////////////////////////////////////////////
  // FINANCE INTELLIGENCE
  ////////////////////////////////////////////////////////////

  if(

    normalizedName.includes("finance")

    ||

    normalizedName.includes("wealth")

    ||

    normalizedName.includes("money")

  ){


    return (

      `${name} benefits from practical planning and balanced decisions. Awareness and discipline can support long term stability.`

    );

  }





  ////////////////////////////////////////////////////////////
  // RELATIONSHIP INTELLIGENCE
  ////////////////////////////////////////////////////////////

  if(

    normalizedName.includes("love")

    ||

    normalizedName.includes("relationship")

  ){


    return (

      `${name} grows through understanding, emotional balance and meaningful connections. Thoughtful actions help strengthen relationships.`

    );

  }





  ////////////////////////////////////////////////////////////
  // STRONG INFLUENCE
  ////////////////////////////////////////////////////////////

  if(

    tone === "strong"

  ){


    return (

      `${name} becomes an important area of growth during this phase. ${capitalize(profile.growth)} helps you use available opportunities with awareness and purpose.`

    );

  }





  ////////////////////////////////////////////////////////////
  // CAUTION INFLUENCE
  ////////////////////////////////////////////////////////////

  if(

    tone === "caution"

  ){


    return (

      `${name} requires thoughtful attention during this period. ${profile.guidance} helps maintain stability while moving forward.`

    );

  }





  ////////////////////////////////////////////////////////////
  // BALANCED INFLUENCE
  ////////////////////////////////////////////////////////////

  return (

    `${name} moves through a balanced phase ${getNarrativeVariation(zodiac,name)}. Consistent effort and awareness support gradual improvement.`

  );

}

//////////////////////////////////////////////////////////////
// LIFE AREA LANGUAGE INTELLIGENCE
//////////////////////////////////////////////////////////////

function generateLifeSentence(

 life:LifePrediction,

 zodiac?:string

):string {


  const area = capitalize(

    life.area

  );


  const tone = getTone(

    life.score

  );


  const profile = getZodiacProfile(

    zodiac

  );


if(tone === "strong"){

  return (

    `${area} receives supportive influence during this phase. ` +
    `Progress develops through focused actions, awareness and balanced decisions. ` +
    `${capitalize(zodiac ?? "Your")} energy supports meaningful growth by applying personal strengths wisely.`

  );

}





if(tone === "caution"){


  return (

    `${area} requires patience and thoughtful attention during this period. ` +
    `Balanced choices, awareness and practical understanding can help manage challenges effectively.`

  );

}





return (

  `${area} moves through a balanced phase where consistency, awareness and thoughtful decisions support gradual improvement.`

);
}










//////////////////////////////////////////////////////////////
// GUIDANCE INTELLIGENCE v4.1
//
// IMPORTANT:
//
// Does NOT expose:
// life.messages.guidance
//
// Creates fresh human language
// from:
// area
// score
// zodiac
// theme
//////////////////////////////////////////////////////////////

function generateSmartGuidance(

 life:LifePrediction,

 zodiac?:string

):string {


  const area = normalizeText(

    life.area

  );


  const profile = getZodiacProfile(

    zodiac

  );


  const tone = getTone(

    life.score

  );





  if(area.includes("career")){


    if(tone === "strong"){

      return (

        `Career opportunities improve when ${profile.guidance}. Focused actions can help convert potential into achievement.`

      );

    }


    return (

      `Career progress benefits from patience, planning and ${profile.communication}. Consistent effort can create better direction.`

    );

  }





  if(area.includes("finance")){


    return (

      `Financial decisions require awareness and practical thinking. Balanced planning helps create stability and long term improvement.`

    );

  }





  if(area.includes("love") || area.includes("relationship")){


    return (

      `Relationships grow through understanding, communication and emotional balance. Thoughtful actions strengthen connections.`

    );

  }





  if(area.includes("health")){


    return (

      `Well-being improves through balance, discipline and awareness of personal needs. Small consistent habits support better outcomes.`

    );

  }





  return (

    `${capitalize(life.area)} benefits from awareness, patience and ${profile.guidance}. Balanced decisions support positive growth.`

  );

}







//////////////////////////////////////////////////////////////
// GUIDANCE CLEANER
//////////////////////////////////////////////////////////////

function cleanGuidance(

 messages:string[]

):string[] {


  return uniqueSentences(

    messages.filter(

      message => {


        const key = normalizeText(

          message

        );


        return (

          key.length > 25

        );

      }

    )

  );

}







//////////////////////////////////////////////////////////////
// BUILD GUIDANCE
//////////////////////////////////////////////////////////////

function buildGuidanceSentence(

 lifePredictions:LifePrediction[],

 zodiac?:string

):string[] {


  return safeArray(

    lifePredictions

  )

  .slice(

    0,

    6

  )

  .map(

    life =>

    generateSmartGuidance(

      life,

      zodiac

    )

  );

}









//////////////////////////////////////////////////////////////
// LANGUAGE CLEAN FILTER
//////////////////////////////////////////////////////////////

function cleanLanguage(

 sentences:string[]

):string[] {


  return uniqueSentences(

    sentences

  )

  .filter(

    sentence =>

    normalizeText(sentence).length > 25

  )

  .slice(

    0,

    12

  );

}
//////////////////////////////////////////////////////////////
// NATURAL SUMMARY BUILDER v4.1
//////////////////////////////////////////////////////////////

function buildSummarySentences(

 planetaryPredictions:PlanetPrediction[],

 predictionRanking:PredictionRanking[],

 zodiacSign?:string

):string[] {


  const sentences:string[] = [];

  const profile = getZodiacProfile(

    zodiacSign

  );



  ////////////////////////////////////////////////////////////
  // ZODIAC OPENING
  ////////////////////////////////////////////////////////////

  if(zodiacSign){


    sentences.push(

      `${capitalize(zodiacSign)} enters a phase focused on ${profile.nature}. This period highlights awareness, growth and meaningful choices.`

    );

  }





  ////////////////////////////////////////////////////////////
  // PLANETARY STORY
  ////////////////////////////////////////////////////////////

  for(

    const planet of safeArray(

      planetaryPredictions

    )

    .slice(

      0,

      4

    )

  ){


    sentences.push(

      generatePlanetSentence(

        planet,

        zodiacSign

      )

    );

  }





  ////////////////////////////////////////////////////////////
  // LIFE DIRECTION

  for(

    const ranking of safeArray(

      predictionRanking

    )

    .filter(

      shouldUseRanking

    )

    .slice(

      0,

      3

    )

  ){


    sentences.push(

      generateRankingSentence(

        ranking,

        zodiacSign

      )

    );

  }




  return cleanLanguage(

    sentences

  );

}








//////////////////////////////////////////////////////////////
// NATURAL SUMMARY EXPORT
//////////////////////////////////////////////////////////////
export function generateNaturalSummary(

  planetaryPredictions: PlanetPrediction[],

  predictionRanking: PredictionRanking[],

  zodiacSign?: string

): string {


  console.log(
    "LANGUAGE ENGINE INPUT",
    {
      zodiacSign,

      planetsCount:
      planetaryPredictions?.length ?? 0,

      rankingsCount:
      predictionRanking?.length ?? 0,

      firstPlanet:
      planetaryPredictions?.[0]?.planet,

      firstRanking:
      predictionRanking?.[0]?.title
    }
  );



  const result = buildSummarySentences(

    planetaryPredictions,

    predictionRanking,

    zodiacSign

  );



  console.log(
    "LANGUAGE ENGINE OUTPUT",
    {
      zodiacSign,

      sentencesCount:
      result.length,

      sentences:
      result
    }
  );



  if(result.length === 0){


    return (

      `${capitalize(zodiacSign ?? "Your")} horoscope reflects planetary influences, personal strengths and opportunities for growth.`

    );

  }



  return result.join(

    " "

  );

}



//////////////////////////////////////////////////////////////
// OPENING INTELLIGENCE
//////////////////////////////////////////////////////////////

export function generateOpening(

 predictionRanking:PredictionRanking[],

 zodiacSign?:string

):string {


  const profile = getZodiacProfile(

    zodiacSign

  );


  const top = safeArray(

    predictionRanking

  )[0];



  if(!top){


    return (

      `${capitalize(zodiacSign ?? "Your")} horoscope reflects important planetary patterns and ${capitalize(profile.growth)}.`

    );

  }




  return (

    `${capitalize(zodiacSign ?? "Your")} enters a phase where ${cleanTitle(top.title)} receives attention through ${profile.nature}. Awareness and balanced decisions become important.`

  );

}









//////////////////////////////////////////////////////////////
// DEVELOPMENT INTELLIGENCE
//////////////////////////////////////////////////////////////

export function generateDevelopment(

 predictionRanking:PredictionRanking[],

 zodiacSign?:string

):string {

 console.log(
    "DEVELOPMENT INPUT CHECK",
    {
      zodiacSign,
      firstRanking: predictionRanking?.[0],
      count: predictionRanking?.length
    }
  );


  const sentences = safeArray(

    predictionRanking

  )

  .filter(

    shouldUseRanking

  )

  .slice(

    0,

    5

  )

  .map(

    item =>

    generateRankingSentence(

      item,

      zodiacSign

    )

  );



  return cleanLanguage(

    sentences

  )

  .join(

    " "

  );

}









//////////////////////////////////////////////////////////////
// LIFE NARRATIVE EXPORT
//////////////////////////////////////////////////////////////

export function generateLifeNarrative(

 lifePredictions:LifePrediction[],

 zodiacSign?:string

):string {


  const sentences = safeArray(

    lifePredictions

  )

  .slice(

    0,

    5

  )

  .map(

    life =>

    generateLifeSentence(

      life,

      zodiacSign

    )

  );



  return cleanLanguage(

    sentences

  )

  .join(

    " "

  );

}








//////////////////////////////////////////////////////////////
// COMPLETE STORY BUILDER
//////////////////////////////////////////////////////////////

export function buildCompleteNarrative(

 predictionRanking:PredictionRanking[],

 lifePredictions:LifePrediction[],

 zodiacSign?:string

):string {


  const sections = [

    generateDevelopment(

      predictionRanking,

      zodiacSign

    ),


    generateLifeNarrative(

      lifePredictions,

      zodiacSign

    ),


  ];



  return cleanLanguage(

    sections

  )

  .join(

    " "

  );

}









//////////////////////////////////////////////////////////////
// ADVICE GENERATOR
//////////////////////////////////////////////////////////////

export function generateAdvice(

 lifePredictions:LifePrediction[],

 zodiacSign?:string

):string {


  return cleanGuidance(

    buildGuidanceSentence(

      lifePredictions,

      zodiacSign

    )

  )

  .join(

    " "

  );

}









//////////////////////////////////////////////////////////////
// COMPLETE NARRATIVE GENERATOR
//////////////////////////////////////////////////////////////

export function generateNarrative(

 predictionRanking:PredictionRanking[],

 lifePredictions:LifePrediction[],

 zodiacSign?:string

):string {


 console.log(
    "NARRATIVE INPUT CHECK",
    {
      zodiacSign,
      rankings: predictionRanking?.length,
      life: lifePredictions?.length
    }
  );

  const sections = [

    generateOpening(

      predictionRanking,

      zodiacSign

    ),


    generateDevelopment(

      predictionRanking,

      zodiacSign

    ),


    generateLifeNarrative(

      lifePredictions,

      zodiacSign

    ),


    generateAdvice(

      lifePredictions,

      zodiacSign

    ),


    generateClosing()

  ];



  return cleanLanguage(

    sections

  )

  .join(

    " "

  );

}








//////////////////////////////////////////////////////////////
// FINAL CLOSING INTELLIGENCE
//////////////////////////////////////////////////////////////

export function generateClosing():string {


  return (

    "Use this guidance for awareness, reflection and balanced decisions while continuing your personal journey."

  );

}








//////////////////////////////////////////////////////////////
// OPPORTUNITY LANGUAGE
//////////////////////////////////////////////////////////////

function generateOpportunitySentence(

 ranking:PredictionRanking,

 zodiacSign?:string

):string {


  const profile = getZodiacProfile(

    zodiacSign

  );


  return (

    `${capitalize(cleanTitle(ranking.title))} presents opportunities through ${profile.growth}. Awareness and preparation can help create meaningful progress.`

  );

}






export function buildOpportunityNarrative(

 opportunities:PredictionRanking[],

 zodiacSign?:string

):string {


  return cleanLanguage(

    safeArray(opportunities)

    .filter(shouldUseRanking)

    .slice(0,5)

    .map(

      item =>

      generateOpportunitySentence(

        item,

        zodiacSign

      )

    )

  )

  .join(" ");

}








//////////////////////////////////////////////////////////////
// CAUTION LANGUAGE
//////////////////////////////////////////////////////////////

function generateCautionSentence(

 ranking:PredictionRanking,

 zodiacSign?:string

):string {


  const profile = getZodiacProfile(

    zodiacSign

  );


  return (

    `${capitalize(cleanTitle(ranking.title))} requires mindful decisions. ${profile.guidance} helps maintain stability during challenges.`

  );

}






export function buildCautionNarrative(

 cautions:PredictionRanking[],

 zodiacSign?:string

):string {


  return cleanLanguage(

    safeArray(cautions)

    .filter(

      item => item.score < 70

    )

    .slice(

      0,

      5

    )

    .map(

      item =>

      generateCautionSentence(

        item,

        zodiacSign

      )

    )

  )

  .join(" ");

}









//////////////////////////////////////////////////////////////
// LANGUAGE QUALITY INTELLIGENCE
//////////////////////////////////////////////////////////////

export function calculateLanguageQuality(

 text:string

):number {


  if(!text){

    return 0;

  }



  const lengthScore = Math.min(

    40,

    Math.round(

      text.length / 10

    )

  );



  const sentenceCount = text

  .split(".")

  .filter(Boolean)

  .length;



  const structureScore = Math.min(

    30,

    sentenceCount * 3

  );



  return clamp(

    lengthScore

    +

    structureScore

    +

    30

  );

}









//////////////////////////////////////////////////////////////
// LANGUAGE PROFILE
//////////////////////////////////////////////////////////////

export function getLanguageProfile(){


  return {


    version:

    LANGUAGE_ENGINE_VERSION,


    status:

    LANGUAGE_ENGINE_STATUS,


    mode:

    "future-proof-narrative-engine",



    features:[


      "zodiac_personality_engine",

      "planet_language_profiles",

      "context_composer",

      "premium_narrative_generation",

      "smart_guidance",

      "duplicate_memory_v2",

      "multilingual_ready"


    ]


  };

}









//////////////////////////////////////////////////////////////
// FINAL LANGUAGE ENGINE LOCK
//////////////////////////////////////////////////////////////

/*

NATIONPATH ASTRO

Language Intelligence Engine:

v4.1 FUTURE PROOF LOCK


Flow:

Prediction Data

↓

Context Intelligence

↓

Planet + Zodiac Personality

↓

Premium Narrative

↓

User Horoscope Experience


*/
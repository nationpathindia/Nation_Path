//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
// Natural Language Intelligence Layer
// Production Future Proof Version v11 FINAL POLISH LOCK
//////////////////////////////////////////////////////////////

import type {

  PredictionRanking,

  PlanetPrediction,

  LifePrediction,

} from "./types";





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


  return (value ?? "")

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





function cleanTitle(

  value:string | undefined | null

):string {


  return (value ?? "")

    .replace(

      " influence",

      ""

    )

    .replace(

      "Influence",

      ""

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
// ENTITY MEMORY INTELLIGENCE
//////////////////////////////////////////////////////////////

function createEntityKey(

  value:string

):string {


  return normalizeText(

    cleanTitle(value)

  );

}





function removeEntityDuplicates(

  sentences:string[]

):string[] {


  const memory =

  new Set<string>();



  return sentences.filter(

    sentence => {


      const words =

      normalizeText(

        sentence

      )

      .split(" ");





      const entity =

      words

      .filter(

        word =>

        word.length > 3

      )

      .slice(

        0,

        2

      )

      .join("");





      if(

        !entity ||

        memory.has(entity)

      ){

        return false;

      }





      memory.add(

        entity

      );



      return true;


    }

  );


}







//////////////////////////////////////////////////////////////
// SENTENCE QUALITY ENGINE
//////////////////////////////////////////////////////////////
function cleanSentences(

  sentences:string[]

):string[] {


  const seen = new Set<string>();

  const patternMemory = new Set<string>();


  return removeEntityDuplicates(

    sentences

  )

  .filter(

    sentence => {


      const normalized =

        normalizeText(

          sentence

        );



      if(

        !normalized ||

        normalized.length < 25

      ){

        return false;

      }



      if(

        seen.has(

          normalized

        )

      ){

        return false;

      }



      seen.add(

        normalized

      );



      /*
        Remove template repetition.

        Example:
        Moon becomes a major active theme...
        Jupiter becomes a major active theme...
      */


      const pattern =

        normalized

        .replace(

          /\b(sun|moon|mars|mercury|jupiter|venus|saturn|rahu|ketu)\b/g,

          ""

        )

        .replace(

          /\b(spirituality|communication|education|career|finance|mind|overall|love)\b/g,

          ""

        )

        .replace(

          /\s+/g,

          " "

        )

        .trim();



      if(

        patternMemory.has(

          pattern

        )

      ){

        return false;

      }



      patternMemory.add(

        pattern

      );



      return true;

    }

  )

  .slice(

    0,

    6

  );

}

//////////////////////////////////////////////////////////////
// CATEGORY FILTER
//////////////////////////////////////////////////////////////

function isSystemNoise(

 ranking:PredictionRanking

):boolean {


  const title =

  normalizeText(

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

    !isSystemNoise(

      ranking

    )

    &&

    ranking.score >=45

  );


}





//////////////////////////////////////////////////////////////
// TONE RESOLUTION
//////////////////////////////////////////////////////////////

function getTone(

 score:number

 ):

 "high"

 |

 "medium"

 |

 "low" {


  if(score >=85){

    return "high";

  }



  if(score >=60){

    return "medium";

  }



  return "low";


}

//////////////////////////////////////////////////////////////
// PLANET LANGUAGE INTELLIGENCE
//////////////////////////////////////////////////////////////

function generatePlanetSentence(

  planet:PlanetPrediction

):string {


  const name =

  capitalize(

    planet.planet

  );



  const tone =

  getTone(

    planet.strengthScore

  );





  if(tone === "high"){


    return (

      `${name} carries a strong planetary influence in this cycle, supporting confidence, growth, awareness and meaningful progress.`

    );


  }





  if(tone === "low"){


    return (

      `${name} encourages patience, balance and thoughtful decisions to handle challenges with greater awareness.`

    );


  }





  return (

    `${name} supports steady improvement through consistency, practical action and conscious effort.`

  );


}







//////////////////////////////////////////////////////////////
// RANKING LANGUAGE INTELLIGENCE
//////////////////////////////////////////////////////////////

function generateRankingSentence(

  ranking:PredictionRanking

):string {


  const name =

  capitalize(

    cleanTitle(

      ranking.title

    )

  );



  const tone =

  getTone(

    ranking.score

  );







  if(tone === "high"){


    return (

      `${name} becomes a major active theme during this period, bringing valuable opportunities, growth and noticeable developments.`

    );


  }





  if(tone === "medium"){


    return (

      `${name} remains an important area where focused effort, awareness and consistent actions can create positive progress.`

    );


  }





  return (

    `${name} requires patience, practical attention and balanced decisions for better outcomes.`

  );


}







//////////////////////////////////////////////////////////////
// LIFE AREA LANGUAGE INTELLIGENCE
//////////////////////////////////////////////////////////////

function generateLifeSentence(

  life:LifePrediction

):string {


  const area =

  capitalize(

    life.area

  );



  const tone =

  getTone(

    life.score

  );







  if(tone === "high"){


    return (

      `${area} receives strong supportive energy in this cycle, creating opportunities for growth, confidence and meaningful development.`

    );


  }





  if(tone === "low"){


    return (

      `${area} needs conscious attention. Patience, balance and consistent improvement can help manage current challenges.`

    );


  }





  return (

    `${area} shows positive movement where awareness, discipline and steady effort can create gradual improvement.`

  );


}







//////////////////////////////////////////////////////////////
// OPPORTUNITY LANGUAGE ENGINE
//////////////////////////////////////////////////////////////

function generateOpportunitySentence(

  ranking:PredictionRanking

):string {


  const name =

  capitalize(

    cleanTitle(

      ranking.title

    )

  );



  return (

    `${name} presents meaningful possibilities where preparation, awareness and consistent effort can support positive progress.`

  );


}







//////////////////////////////////////////////////////////////
// CAUTION LANGUAGE ENGINE
//////////////////////////////////////////////////////////////

function generateCautionSentence(

  ranking:PredictionRanking

):string {


  const name =

  capitalize(

    cleanTitle(

      ranking.title

    )

  );



  return (

    `${name} requires awareness, patience and balanced decisions to maintain stability and avoid unnecessary difficulties.`

  );


}







//////////////////////////////////////////////////////////////
// NATURAL SUMMARY SENTENCE BUILDER
//////////////////////////////////////////////////////////////

function buildSummarySentences(

 planetaryPredictions:PlanetPrediction[],

 predictionRanking:PredictionRanking[]

):string[] {


  const sentences:string[] = [];



  const used =

  new Set<string>();







  for(

    const planet of safeArray(

      planetaryPredictions

    ).slice(

      0,

      3

    )

  ){



    const key =

    createEntityKey(

      planet.planet

    );



    if(!used.has(key)){


      sentences.push(

        generatePlanetSentence(

          planet

        )

      );



      used.add(key);

    }


  }








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



    const key =

    createEntityKey(

      ranking.title

    );



    if(!used.has(key)){


      sentences.push(

        generateRankingSentence(

          ranking

        )

      );



      used.add(key);

    }


  }





  return cleanSentences(

    sentences

  );


}







//////////////////////////////////////////////////////////////
// NATURAL SUMMARY EXPORT
//////////////////////////////////////////////////////////////

export function generateNaturalSummary(

  planetaryPredictions:PlanetPrediction[],

  predictionRanking:PredictionRanking[]

):string {


  const result =

  buildSummarySentences(

    planetaryPredictions,

    predictionRanking

  );





  if(result.length === 0){


    return (

      "Your horoscope analysis highlights important planetary patterns, opportunities and areas of personal growth."

    );


  }





  return result.join(

    " "

  );


}
//////////////////////////////////////////////////////////////
// STORY MEMORY ENGINE
//////////////////////////////////////////////////////////////

function createStoryKey(

  value:string

):string {


  return normalizeText(

    cleanTitle(

      value

    )

  );

}





function removeStoryDuplicates(

  sentences:string[]

):string[] {


  const memory =

  new Set<string>();



  return sentences.filter(

    sentence => {


      const key =

      createStoryKey(

        sentence

      );



      if(

        !key ||

        memory.has(key)

      ){

        return false;

      }



      memory.add(

        key

      );



      return true;


    }

  );


}







//////////////////////////////////////////////////////////////
// COMPLETE NARRATIVE BUILDER
//////////////////////////////////////////////////////////////

export function buildCompleteNarrative(

  predictionRanking:PredictionRanking[],

  lifePredictions:LifePrediction[]

):string {


  const narrative:string[] = [];



  const usedEntities =

  new Set<string>();







  ////////////////////////////////////////////////////////////
  // LIFE STORY
  ////////////////////////////////////////////////////////////

  for(

    const life of safeArray(

      lifePredictions

    )

    .slice(

      0,

      5

    )

  ){



    const key =

    createStoryKey(

      life.area

    );



    if(

      !usedEntities.has(key)

    ){



      narrative.push(

        generateLifeSentence(

          life

        )

      );



      usedEntities.add(

        key

      );

    }


  }








  ////////////////////////////////////////////////////////////
  // RANKING STORY
  ////////////////////////////////////////////////////////////

  for(

    const ranking of safeArray(

      predictionRanking

    )

    .filter(

      shouldUseRanking

    )

    .slice(

      0,

      5

    )

  ){



    const key =

    createStoryKey(

      ranking.title

    );



    if(

      !usedEntities.has(key)

    ){



      narrative.push(

        generateRankingSentence(

          ranking

        )

      );



      usedEntities.add(

        key

      );

    }


  }







  const finalStory =

  cleanSentences(

    removeStoryDuplicates(

      narrative

    )

  );







  if(

    finalStory.length === 0

  ){



    return (

      "Your horoscope analysis reflects planetary influences, personal strengths and areas where awareness supports continuous growth."

    );


  }







  return finalStory.join(

    " "

  );


}







//////////////////////////////////////////////////////////////
// OPENING INTELLIGENCE
//////////////////////////////////////////////////////////////

export function generateOpening(

  predictionRanking:PredictionRanking[]

):string {


  const top =

  safeArray(

    predictionRanking

  )[0];





  if(!top){


    return (

      "Your horoscope analysis reveals important planetary patterns and personal growth directions."

    );


  }






  return (

    `Your current cycle highlights ${capitalize(cleanTitle(top.title))} as a central theme influencing upcoming experiences.`

  );


}







//////////////////////////////////////////////////////////////
// DEVELOPMENT INTELLIGENCE
//////////////////////////////////////////////////////////////

export function generateDevelopment(

  predictionRanking:PredictionRanking[]

):string {


  const sentences =

  safeArray(

    predictionRanking

  )

  .filter(

    shouldUseRanking

  )

  .slice(

    0,

    3

  )

  .map(

    item =>

    generateRankingSentence(

      item

    )

  );







  return cleanSentences(

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

  lifePredictions:LifePrediction[]

):string {


  const sentences =

  safeArray(

    lifePredictions

  )

  .slice(

    0,

    5

  )

  .map(

    life =>

    generateLifeSentence(

      life

    )

  );







  return cleanSentences(

    sentences

  )

  .join(

    " "

  );


}







//////////////////////////////////////////////////////////////
// GUIDANCE INTELLIGENCE
//////////////////////////////////////////////////////////////

export function generateAdvice(

  lifePredictions:LifePrediction[]

):string {


  const advice =

safeArray(
  lifePredictions
)

.flatMap(

  life =>

  safeArray(
    life.messages
  )

  .map(

    message =>

    message.guidance ?? ""

  )

  .filter(Boolean)

);


  return cleanSentences(

    advice

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
// COMPLETE NARRATIVE GENERATOR
//////////////////////////////////////////////////////////////

export function generateNarrative(

  predictionRanking:PredictionRanking[],

  lifePredictions:LifePrediction[]

):string {


  const sections = [


    generateOpening(

      predictionRanking

    ),



    generateDevelopment(

      predictionRanking

    ),



    generateLifeNarrative(

      lifePredictions

    ),



    generateAdvice(

      lifePredictions

    ),



    generateClosing()



  ];







  return cleanSentences(

    sections

  )

  .join(

    " "

  );


}







//////////////////////////////////////////////////////////////
// OPPORTUNITY / CAUTION PUBLIC SUPPORT
//////////////////////////////////////////////////////////////

export function buildOpportunityNarrative(

  opportunities:PredictionRanking[]

):string {


  const sentences =

  safeArray(

    opportunities

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

    generateOpportunitySentence(

      item

    )

  );







  return cleanSentences(

    sentences

  )

  .join(

    " "

  );


}







export function buildCautionNarrative(

  cautions:PredictionRanking[]

):string {


  const sentences =

  safeArray(

    cautions

  )

  .filter(

    item =>

    item.score < 70

  )

  .slice(

    0,

    5

  )

  .map(

    item =>

    generateCautionSentence(

      item

    )

  );







  return cleanSentences(

    sentences

  )

  .join(

    " "

  );


}







//////////////////////////////////////////////////////////////
// LANGUAGE QUALITY METADATA SUPPORT
//////////////////////////////////////////////////////////////

export function calculateLanguageQuality(

 text:string

):number {


  if(!text){

    return 0;

  }





  const lengthScore =

  Math.min(

    40,

    Math.round(

      text.length / 10

    )

  );







  const sentenceCount =

  text

  .split(".")

  .filter(Boolean)

  .length;







  const structureScore =

  Math.min(

    30,

    sentenceCount * 3

  );

const words =

text

.split(" ")

.map(

word =>

normalizeText(word)

)

.filter(Boolean);



const duplicatePenalty =

words.length !== new Set(words).size

?

5

:

0;



  return clamp(

    lengthScore +

    structureScore -

    duplicatePenalty +

    30

  );


}

//////////////////////////////////////////////////////////////
// FINAL LANGUAGE ENGINE LOCK
//////////////////////////////////////////////////////////////

export const LANGUAGE_ENGINE_VERSION =

"v11-FINAL-POLISH-LOCK";


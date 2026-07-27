//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
// Prediction Quality Intelligence Layer
// Production Future Proof Version v9 FINAL LOCK
//////////////////////////////////////////////////////////////

import type {

  PredictionMessage,

  PredictionInsight,

  PlanetPrediction,

  LifePrediction,

  PredictionQuality,

} from "./types";





//////////////////////////////////////////////////////////////
// SAFE CORE UTILITIES
//////////////////////////////////////////////////////////////

function safeArray<T>(

  value:T[] | undefined | null

):T[] {

  return Array.isArray(value)

    ? value

    : [];

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





//////////////////////////////////////////////////////////////
// SEMANTIC INTELLIGENCE
//////////////////////////////////////////////////////////////

const SEMANTIC_GROUPS:Record<string,string[]> = {


 education:[

  "education",

  "learning",

  "knowledge",

  "study",

  "wisdom"

 ],


 spirituality:[

  "spirituality",

  "moksha",

  "inner",

  "intuition",

  "karma"

 ],


 communication:[

  "communication",

  "speech",

  "intelligence",

  "expression",

  "mercury"

 ],


 finance:[

  "finance",

  "wealth",

  "money",

  "income",

  "resources"

 ],


 relationship:[

  "relationship",

  "love",

  "marriage",

  "partnership",

  "emotion"

 ],


 ambition:[

  "ambition",

  "career",

  "success",

  "growth",

  "achievement"

 ]

};





function normalizeConcept(

 value:string

):string {


 const text = normalizeText(value);



 for(const key of Object.keys(SEMANTIC_GROUPS)){


  if(

   SEMANTIC_GROUPS[key].some(

    word =>

    text.includes(word)

   )

  ){

   return key;

  }


 }



 return text;

}





//////////////////////////////////////////////////////////////
// QUALITY SCORING INTELLIGENCE
//////////////////////////////////////////////////////////////

function calculateItemQuality(

  priority:number | undefined,

  confidence:number | undefined,

  textLength:number

):number {


 const priorityScore =

 clamp(priority ?? 0);



 const confidenceScore =

 clamp(confidence ?? 50);



 const textScore =

 Math.min(

  textLength / 2,

  100

 );



 return clamp(

  (

   priorityScore * 0.5

  )

  +

  (

   confidenceScore * 0.3

  )

  +

  (

   textScore * 0.2

  )

 );


}







//////////////////////////////////////////////////////////////
// SMART DUPLICATE RESOLUTION
//////////////////////////////////////////////////////////////

function createFingerprint(

 category:string | undefined,

 title:string | undefined,

 description?:string

):string {


 const concept =

 normalizeConcept(

  `${category ?? ""} ${title ?? ""} ${description ?? ""}`

 );



 return concept;

}





function mergeDuplicates<

T extends {

 title?:string;

 category?:string;

 description?:string;

 priority?:number;

 confidence?:number;

}

>(

 items:T[]

):{

 result:T[];

 removed:number;

}

{


 const map =

 new Map<string,T>();



 let removed = 0;



 for(const item of items){



  const key =

  createFingerprint(

   item.category,

   item.title,

   item.description

  );



  if(!key){

   continue;

  }





  const existing =

  map.get(key);





  if(!existing){


   map.set(

    key,

    item

   );


   continue;

  }





  const currentScore =

  calculateItemQuality(

   item.priority,

   item.confidence,

   JSON.stringify(item).length

  );





  const existingScore =

  calculateItemQuality(

   existing.priority,

   existing.confidence,

   JSON.stringify(existing).length

  );





  if(currentScore > existingScore){


   map.set(

    key,

    item

   );


  }





  removed++;


 }



 return {


  result:

  Array.from(

   map.values()

  ),



  removed


 };


}
//////////////////////////////////////////////////////////////
// TEXT QUALITY INTELLIGENCE
//////////////////////////////////////////////////////////////

function isHighQualityText(

 value:string | undefined

):boolean {


 if(!value){

  return false;

 }


 const clean =

 normalizeText(value);



 return (

  clean.length >= 25

  &&

  clean.split(" ").length >= 5

 );


}







//////////////////////////////////////////////////////////////
// MESSAGE QUALITY OPTIMIZER
//////////////////////////////////////////////////////////////

export function optimizePredictionMessages(

 messages:PredictionMessage[] | undefined | null

):PredictionMessage[] {


 const merged =

 mergeDuplicates(

  safeArray(messages)

 );



 return merged.result

 .filter(

 message => {


  const score =

  calculateItemQuality(

   message.priority,

   message.confidence,

   message.prediction?.length ?? 0

  );



  return (

   Boolean(message.title)

   &&

   isHighQualityText(

    message.prediction

   )

   &&

   score >=45

  );


 }

 )

 .sort(

 (a,b)=>{


  return (

   calculateItemQuality(

    b.priority,

    b.confidence,

    b.prediction?.length ?? 0

   )

   -

   calculateItemQuality(

    a.priority,

    a.confidence,

    a.prediction?.length ?? 0

   )

  );


 }

 );


}







//////////////////////////////////////////////////////////////
// INSIGHT QUALITY OPTIMIZER
//////////////////////////////////////////////////////////////

export function optimizeInsights(

 insights:PredictionInsight[] | undefined | null

):PredictionInsight[] {


 const merged =

 mergeDuplicates(

  safeArray(insights)

 );



 return merged.result

 .filter(

 insight => {


  const score =

  calculateItemQuality(

   insight.priority,

   insight.confidence,

   insight.description?.length ?? 0

  );



  return (

   Boolean(insight.title)

   &&

   isHighQualityText(

    insight.description

   )

   &&

   score >=45

  );


 }

 )

 .sort(

 (a,b)=>{


  return (

   calculateItemQuality(

    b.priority,

    b.confidence,

    b.description?.length ?? 0

   )

   -

   calculateItemQuality(

    a.priority,

    a.confidence,

    a.description?.length ?? 0

   )

  );


 }

 );


}







//////////////////////////////////////////////////////////////
// LIFE PREDICTION QUALITY ENGINE
//////////////////////////////////////////////////////////////

export function optimizeLifePredictions(

 predictions:LifePrediction[] | undefined | null

):LifePrediction[] {


 return safeArray(predictions)

 .map(

 prediction => ({


  ...prediction,


  messages:

  optimizePredictionMessages(

   prediction.messages

  )


 })

 )


 .filter(

 prediction => {


  return (

   Boolean(prediction.area)

   &&

   prediction.messages.length > 0

  );


 }

 )


 .map(

 prediction => ({


  ...prediction,


  score:

  clamp(

   prediction.score

  )


 })

 )


 .sort(

 (a,b)=>{


  return b.score - a.score;


 }

 );


}







//////////////////////////////////////////////////////////////
// PLANET PREDICTION QUALITY ENGINE
//////////////////////////////////////////////////////////////

export function optimizePlanetPredictions(

 predictions:PlanetPrediction[] | undefined | null

):PlanetPrediction[] {


 return safeArray(predictions)

 .filter(

 planet => {


  return (

   Boolean(planet.planet)

   &&

   typeof planet.strengthScore === "number"

   &&

   planet.strengthScore >=25

  );


 }

 )

 .sort(

 (a,b)=>{


  return (

   b.strengthScore

   -

   a.strengthScore

  );


 }

 );


}







//////////////////////////////////////////////////////////////
// CATEGORY BALANCE INTELLIGENCE
//////////////////////////////////////////////////////////////

function calculateCategoryBalance(

 items:PredictionMessage[]

):PredictionMessage[] {


 const counter:

 Record<string,number>

 = {};



 return items.filter(

 item => {


  const category =

  normalizeConcept(

   item.category ?? "general"

  );



  counter[category] =

  (

   counter[category] ?? 0

  )

  +1;



  if(

   counter[category] > 3

  ){

   return false;

  }



  return true;


 }

 );


}







//////////////////////////////////////////////////////////////
// QUALITY REPORT BUILDER
//////////////////////////////////////////////////////////////

export function buildPredictionQuality(

  originalCount:number,

  finalCount:number,

  duplicateRemoved:number,

  messageQuality:number,

  insightQuality:number,

  balanceScore:number

):PredictionQuality {


  const qualityScore =

    Math.round(

      (

        messageQuality * 0.35

        +

        insightQuality * 0.25

        +

        balanceScore * 0.25

        +

        (

          finalCount > 0

            ? 100

            : 0

        ) * 0.15

      )

    );



  return {


    duplicateRemoved:

      Math.max(

        duplicateRemoved,

        0

      ),



    mergedPredictions:

      Math.max(

        duplicateRemoved,

        0

      ),



    finalCount:

      Math.max(

        finalCount,

        0

      ),



    qualityScore:

      clamp(

        qualityScore

      ),



    messageQuality:

      clamp(

        messageQuality

      ),



    insightQuality:

      clamp(

        insightQuality

      ),



    balanceScore:

      clamp(

        balanceScore

      ),


  };


}









//////////////////////////////////////////////////////////////
// QUALITY SCORE HELPERS
//////////////////////////////////////////////////////////////

function calculateCollectionQuality(

  items:number,

  valid:number

):number {


  if(items === 0){

    return 0;

  }



  return clamp(

    (

      valid /

      items

    )

    *

    100

  );


}







//////////////////////////////////////////////////////////////
// COMPLETE QUALITY PIPELINE
//////////////////////////////////////////////////////////////

export function calculatePredictionQuality(

  messages:PredictionMessage[] | undefined | null,


  insights:PredictionInsight[] | undefined | null


):PredictionQuality {


  const originalMessages =

    safeArray(

      messages

    );



  const originalInsights =

    safeArray(

      insights

    );




  const originalCount =

    originalMessages.length

    +

    originalInsights.length;





  const messageMerge =

    mergeDuplicates(

      originalMessages

    );



  const insightMerge =

    mergeDuplicates(

      originalInsights

    );





  let optimizedMessages =

    optimizePredictionMessages(

      messageMerge.result

    );



  const optimizedInsights =

    optimizeInsights(

      insightMerge.result

    );





  optimizedMessages =

    calculateCategoryBalance(

      optimizedMessages

    );







  const finalCount =

    optimizedMessages.length

    +

    optimizedInsights.length;







  const messageQuality =

    calculateCollectionQuality(

      messageMerge.result.length,

      optimizedMessages.length

    );







  const insightQuality =

    calculateCollectionQuality(

      insightMerge.result.length,

      optimizedInsights.length

    );







  const balanceScore =

    calculateCollectionQuality(

      optimizedMessages.length,

      optimizedMessages.length

    );







  return buildPredictionQuality(

    originalCount,


    finalCount,


    messageMerge.removed

    +

    insightMerge.removed,


    messageQuality,


    insightQuality,


    balanceScore


  );


}
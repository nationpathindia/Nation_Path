//////////////////////////////////////////////////////////////
// NATIONPATH AI HOROSCOPE ENHANCEMENT SERVICE
//
// Deterministic Horoscope + AI Premium Language Layer
//
// NationPath AI Core v1
//
// Rules:
//
// Astro Engine = Source of Truth
//
// AI:
// - Editorial enhancement only
// - Language improvement only
// - No calculation
// - No prediction modification
// - No score modification
//
// NO OPENAI
// NO EXTERNAL PROVIDER
//////////////////////////////////////////////////////////////


import type {
  HoroscopeResult,
} from "@/lib/astro/horoscope/types";


import type {
  AstroLanguage,
} from "@/lib/astro/types";


import {
  buildPredictionEnhancementPrompt,
} from "@/lib/nationpath-ai/prompts";


import {
  executeAIStructured,
} from "@/lib/nationpath-ai/executor";



//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////

interface AIEnhancedPrediction {

  headline?: string;

  overview?: string;

  naturalSummary?: string;


  guidance?: string[];


  planetaryPredictions?: any[];


  lifePredictions?: any[];


  opportunities?: any[];


  cautions?: any[];


  narrative?: {

    opening?: string;

    development?: string;

    advice?: string;

    closing?: string;

  };

}



//////////////////////////////////////////////////////////////
// LANGUAGE NORMALIZER
//////////////////////////////////////////////////////////////

function normalizeLanguage(
  language:string
):AstroLanguage {


 switch(language){


  case "hindi":

    return "hindi";


  case "marathi":

    return "marathi";


  case "tamil":

    return "tamil";


  case "telugu":

    return "telugu";


  case "nepali":

    return "nepali";


  default:

    return "english";


 }

}





//////////////////////////////////////////////////////////////
// TEXT NORMALIZER
//////////////////////////////////////////////////////////////

function normalizeText(
 text:string
):string {


 return text

  .toLowerCase()

  .replace(/[^\w\s]/g,"")

  .replace(/\s+/g," ")

  .trim();


}







//////////////////////////////////////////////////////////////
// DUPLICATE REMOVER
//////////////////////////////////////////////////////////////

function removeDuplicateText(
 items:string[] = []
):string[] {


 const seen =
  new Set<string>();


 return items.filter(
  item=>{


   const key =
    normalizeText(item);


   if(
    seen.has(key)
   ){

    return false;

   }


   seen.add(key);


   return true;


  }
 );


}







//////////////////////////////////////////////////////////////
// AI GENERIC CONTENT FILTER
//////////////////////////////////////////////////////////////

function isGenericAIText(
 text:string
):boolean {


 const blocked = [


  "supports confidence",


  "positive development",


  "growth patterns",


  "natural abilities",


  "continue developing your strengths",


  "use this supportive energy wisely",


  "this energy helps you",


  "this period brings",


  "a positive phase",


 ];



 const value =
  normalizeText(text);



 return blocked.some(
  phrase =>

   value.includes(
    normalizeText(phrase)
   )

 );


}







//////////////////////////////////////////////////////////////
// SENTENCE CLEANER
//////////////////////////////////////////////////////////////

function cleanSentence(
 text?:string
):string | undefined {


 if(
  !text
 ){

  return text;

 }



 const sentences =

  text

   .split(".")

   .map(
    item =>
     item.trim()
   )

   .filter(Boolean);




 const seen =
  new Set<string>();



 const cleaned =

  sentences.filter(
   sentence=>{


    const key =
     normalizeText(sentence);



    if(
     seen.has(key)
    ){

     return false;

    }



    seen.add(key);


    return true;


   }
  );




 return cleaned.length

 ?

 cleaned.join(". ") + "."


 :

 text;


}







//////////////////////////////////////////////////////////////
// SAFE AI TEXT PICKER
//////////////////////////////////////////////////////////////

function safeEnhancedText(
 enhanced:string | undefined | null,
 fallback:string
):string {


 if(
  !enhanced
 ){

  return fallback;

 }



 if(
  isGenericAIText(enhanced)
 ){

  return fallback;

 }



 return (

  cleanSentence(enhanced)

  ??

  fallback

 );


}
//////////////////////////////////////////////////////////////
// PLANET PREDICTION MERGER
//////////////////////////////////////////////////////////////

function mergePlanetPrediction(
  original:any[] = [],
  enhanced:any[] = []
){


 return original.map(
  planet=>{


   const updated =

    enhanced.find(
     item =>
      item.name === planet.name
    );



   if(
    !updated
   ){

    return planet;

   }



   return {


    ...planet,



    message:

     safeEnhancedText(

      updated.message,

      planet.message

     ),




    positive:

     updated.positive?.length

     ?

     updated.positive

     :

     planet.positive,





    caution:

     updated.caution?.length

     ?

     updated.caution

     :

     planet.caution,



   };


  }
 );


}







//////////////////////////////////////////////////////////////
// LIFE PREDICTION MERGER
//////////////////////////////////////////////////////////////

function mergeLifePredictions(
 original:any[] = [],
 enhanced:any[] = []
){


 return original.map(
  (
   section,
   index
  )=>{


   const aiSection =
    enhanced[index];



   if(
    !aiSection
   ){

    return section;

   }



   return {


    ...section,



    summary:

     safeEnhancedText(

      aiSection.summary,

      section.summary

     ),





    messages:


     (section.messages ?? [])

      .map(
       (
        message,
        messageIndex
       )=>{


        const aiMessage =

         aiSection.messages?.[
          messageIndex
         ];



        if(
         !aiMessage
        ){

         return message;

        }



        return {


         ...message,



         title:

          aiMessage.title

          ??

          message.title,





         prediction:

          safeEnhancedText(

           aiMessage.prediction,

           message.prediction

          ),





         summary:

          cleanSentence(

           aiMessage.summary

          )

          ??

          message.summary,





         guidance:

          safeEnhancedText(

           aiMessage.guidance,

           message.guidance

          ),





         explanation:

          cleanSentence(

           aiMessage.explanation

          )

          ??

          message.explanation,





         recommendation:

          cleanSentence(

           aiMessage.recommendation

          )

          ??

          message.recommendation,



        };


       }
      ),


   };


  }
 );


}








//////////////////////////////////////////////////////////////
// OPPORTUNITY MERGER
//////////////////////////////////////////////////////////////

function mergeOpportunities(
 original:any[] = [],
 enhanced:any[] = []
){


 return original.map(
  (
   item,
   index
  )=>{


   const aiItem =
    enhanced[index];



   if(
    !aiItem
   ){

    return item;

   }



   return {


    ...item,



    title:

     aiItem.title

     ??

     item.title,





    description:

     safeEnhancedText(

      aiItem.description,

      item.description

     ),



   };


  }
 );


}








//////////////////////////////////////////////////////////////
// CAUTION MERGER
//////////////////////////////////////////////////////////////

function mergeCautions(
 original:any[] = [],
 enhanced:any[] = []
){


 return original.map(
  (
   item,
   index
  )=>{


   const aiItem =
    enhanced[index];



   if(
    !aiItem
   ){

    return item;

   }



   return {


    ...item,



    title:

     aiItem.title

     ??

     item.title,





    description:

     safeEnhancedText(

      aiItem.description,

      item.description

     ),



   };


  }
 );


}








//////////////////////////////////////////////////////////////
// NARRATIVE MERGER
//////////////////////////////////////////////////////////////

function mergeNarrative(
 original:any,
 enhanced:any
){


 if(
  !enhanced
 ){

  return original;

 }



 return {


  opening:

   safeEnhancedText(

    enhanced.opening,

    original?.opening ?? ""

   ),





  development:

   safeEnhancedText(

    enhanced.development,

    original?.development ?? ""

   ),





  advice:

   safeEnhancedText(

    enhanced.advice,

    original?.advice ?? ""

   ),





  closing:

   safeEnhancedText(

    enhanced.closing,

    original?.closing ?? ""

   ),



 };


}








//////////////////////////////////////////////////////////////
// COMPLETE PREDICTION MERGER
//////////////////////////////////////////////////////////////

function mergeEnhancedPrediction(
 original:any,
 enhanced:AIEnhancedPrediction
){


 return {


  ...original,



  ////////////////////////////////////////////////////////////
  // MAIN CONTENT
  ////////////////////////////////////////////////////////////


  headline:

   safeEnhancedText(

    enhanced.headline,

    original.headline

   ),





  overview:

   safeEnhancedText(

    enhanced.overview,

    original.overview

   ),





  naturalSummary:

   safeEnhancedText(

    enhanced.naturalSummary,

    original.naturalSummary ?? ""

   ),





  guidance:


   enhanced.guidance?.length


   ?


   removeDuplicateText(

    enhanced.guidance

   )


   :


   original.guidance,







  ////////////////////////////////////////////////////////////
  // PLANETS
  ////////////////////////////////////////////////////////////


  planetaryPredictions:


   mergePlanetPrediction(

    original.planetaryPredictions,

    enhanced.planetaryPredictions

   ),







  ////////////////////////////////////////////////////////////
  // LIFE
  ////////////////////////////////////////////////////////////


  lifePredictions:


   mergeLifePredictions(

    original.lifePredictions,

    enhanced.lifePredictions

   ),







  ////////////////////////////////////////////////////////////
  // OPPORTUNITIES
  ////////////////////////////////////////////////////////////


  opportunities:


   mergeOpportunities(

    original.opportunities,

    enhanced.opportunities

   ),







  ////////////////////////////////////////////////////////////
  // CAUTIONS
  ////////////////////////////////////////////////////////////


  cautions:


   mergeCautions(

    original.cautions,

    enhanced.cautions

   ),







  ////////////////////////////////////////////////////////////
  // NARRATIVE
  ////////////////////////////////////////////////////////////


  narrative:


   mergeNarrative(

    original.narrative,

    enhanced.narrative

   ),



 };


}
//////////////////////////////////////////////////////////////
// MAIN HOROSCOPE AI ENHANCER
//////////////////////////////////////////////////////////////

export async function enhanceHoroscopeWithAI(
  horoscope: HoroscopeResult
): Promise<HoroscopeResult> {


 if(
  !horoscope.prediction
 ){

  return horoscope;

 }



 try {


  const language =

   normalizeLanguage(

    horoscope.language

   );





  const prompt =

   buildPredictionEnhancementPrompt(

    horoscope.prediction,

    language

   );







  const result =

   await executeAIStructured<AIEnhancedPrediction>(

    {


     systemPrompt:

`You are NationPath AI Premium Horoscope Editor.

You are an editorial enhancement layer only.

The NationPath Astro Engine is the only source of astrology truth.

STRICT RULES:

Never:
- calculate astrology
- modify planets
- modify scores
- modify rankings
- modify remedies
- modify timings
- add new predictions

Only improve:

- language quality
- readability
- emotional intelligence
- professional presentation

Return structured JSON only.

Preserve original meaning.`,





     userPrompt:

      prompt,





   module:

 "astro",



    }

   );







  if(
   !result.success
  ){


   console.warn(

    "[HOROSCOPE_AI_FALLBACK]",

    result.error

   );


   return horoscope;


  }







  const enhanced =

   result.data;





  if(
   !enhanced
  ){

   return horoscope;

  }








  return {


   ...horoscope,



   prediction:


    mergeEnhancedPrediction(

     horoscope.prediction,

     enhanced

    ),



  };





 }

 catch(error){



  console.error(

   "[HOROSCOPE_AI_ENHANCEMENT_ERROR]",

   error

  );



  return horoscope;


 }


}




//////////////////////////////////////////////////////////////
// DEFAULT EXPORT
//////////////////////////////////////////////////////////////

export default {


 enhanceHoroscopeWithAI,


};





//////////////////////////////////////////////////////////////
// END OF NATIONPATH AI HOROSCOPE ENHANCEMENT SERVICE
//
// Astro Engine
//        ↓
// Prediction Engine
//        ↓
// NationPath AI Editorial Layer
//        ↓
// Premium Horoscope Experience
//
// Calculations Immutable
//
// NO OPENAI
// NO EXTERNAL PROVIDER
//////////////////////////////////////////////////////////////
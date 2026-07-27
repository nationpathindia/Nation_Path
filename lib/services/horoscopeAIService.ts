//////////////////////////////////////////////////////////////
// NATIONPATH AI HOROSCOPE ENHANCEMENT SERVICE
// Deterministic Horoscope + AI Premium Language Layer
// Production v2.1
//////////////////////////////////////////////////////////////

import type {
  HoroscopeResult,
} from "@/lib/astro/horoscope/types";

import type {
  AstroLanguage,
} from "@/lib/astro/types";


import {
  buildPredictionEnhancementPrompt,
} from "@/lib/ai/prompts";


import {
  executeAIStructured,
} from "@/lib/ai/executor";


import {
  PredictionEnhancementSchema,
} from "@/lib/ai/schemas";



//////////////////////////////////////////////////////////////
// LANGUAGE NORMALIZER
//////////////////////////////////////////////////////////////

function normalizeLanguage(
  language:string
): AstroLanguage {

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
){

 return text
  .toLowerCase()
  .replace(/[^\w\s]/g,"")
  .replace(/\s+/g," ")
  .trim();

}




//////////////////////////////////////////////////////////////
// DUPLICATE FILTER
//////////////////////////////////////////////////////////////

function removeDuplicateText(
 items:string[]
){

 const seen =
   new Set<string>();


 return items.filter(item=>{

   const key =
    normalizeText(item);


   if(
    seen.has(key)
   ){
    return false;
   }


   seen.add(key);


   return true;

 });

}




//////////////////////////////////////////////////////////////
// GENERIC AI QUALITY FILTER
//////////////////////////////////////////////////////////////

function isGenericAIText(
 text:string
){

 const blocked = [

   "supports confidence",

   "positive development",

   "growth patterns",

   "natural abilities",

   "continue developing your strengths",

   "use this supportive energy wisely",

 ];


 const value =
   normalizeText(text);



 return blocked.some(
   word =>
    value.includes(
      normalizeText(word)
    )
 );


}




//////////////////////////////////////////////////////////////
// SENTENCE CLEANER
//////////////////////////////////////////////////////////////

function cleanSentence(
 text?:string
){

 if(!text)
   return text;


 const sentences =
   text
    .split(".")
    .map(
      x=>x.trim()
    )
    .filter(Boolean);



 const seen =
   new Set<string>();


 const cleaned =
   sentences.filter(sentence=>{


     const key =
       normalizeText(sentence);



     if(
       seen.has(key)
     ){
       return false;
     }


     seen.add(key);


     return true;


   });



 return cleaned.length
   ? cleaned.join(". ") + "."
   : text;


}




//////////////////////////////////////////////////////////////
// SAFE ARRAY PICKER
//////////////////////////////////////////////////////////////

function safeEnhancedText(
 enhanced:string | null | undefined,
 fallback:string
)

{

 if(!enhanced)
   return fallback;


 if(
   isGenericAIText(enhanced)
 ){
   return fallback;
 }


 return cleanSentence(enhanced)
   ??
   fallback;

}




//////////////////////////////////////////////////////////////
// PLANET MERGE
//////////////////////////////////////////////////////////////

function mergePlanetPrediction(
 original:any[],
 enhanced:any[]
){

 return original.map(
   planet=>{


    const updated =
      enhanced.find(
        item =>
          item.name === planet.name
      );


    if(!updated)
      return planet;



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
// LIFE MERGE
//////////////////////////////////////////////////////////////

function mergeLifePredictions(
 original:any[],
 enhanced:any[]
){

 return original.map(
   (section,index)=>{


    const aiSection =
      enhanced[index];


    if(!aiSection)
      return section;



    return {

      ...section,


      summary:
        safeEnhancedText(
          aiSection.summary,
          section.summary
        ),



      messages:

       (section.messages ?? []).map(
          (message,msgIndex)=>{


            const aiMessage =
              aiSection.messages?.[msgIndex];


            if(!aiMessage)
              return message;



            return {

              ...message,


              title:
                aiMessage.title
                ||
                message.title,


              prediction:
                safeEnhancedText(
                  aiMessage.prediction,
                  message.prediction
                ),


              summary:
                cleanSentence(
                  aiMessage.summary
                ),


              guidance:
                safeEnhancedText(
                  aiMessage.guidance,
                  message.guidance
                ),


              explanation:
                cleanSentence(
                  aiMessage.explanation
                ),


              recommendation:
                cleanSentence(
                  aiMessage.recommendation
                ),


            };


          }
        ),


    };


   }

 );


}
//////////////////////////////////////////////////////////////
// MAIN AI ENHANCER
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


    const prompt =
      buildPredictionEnhancementPrompt(

        horoscope.prediction,

        normalizeLanguage(
          horoscope.language
        )

      );




    const result =
      await executeAIStructured({

        systemPrompt:

`You are NationPath AI Premium Horoscope Editor.

Your role is only editorial enhancement.

The astrology engine output is final.

Never:
- change calculations
- modify planets
- modify scores
- modify rankings
- add new predictions
- add remedies

Improve only:
- language quality
- readability
- emotional intelligence
- professional astrology writing style

Avoid repetitive AI generated sentences.

Return premium human-written horoscope content.`, 

        userPrompt:
          prompt,



        schema:
          PredictionEnhancementSchema,



        schemaName:
          "PredictionEnhancementSchema",


      });





    if(
      !result.success
    ){

      return horoscope;

    }





    const enhanced =
      result.output;



    const original =
      horoscope.prediction;





    return {


      ...horoscope,



      prediction:{


        ...original,



        //////////////////////////////////////////////////////
        // MAIN CONTENT
        //////////////////////////////////////////////////////


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







        //////////////////////////////////////////////////////
        // PLANETS
        //////////////////////////////////////////////////////


        planetaryPredictions:


          mergePlanetPrediction(

            original.planetaryPredictions,

            enhanced.planetaryPredictions

          ),






        //////////////////////////////////////////////////////
        // LIFE AREAS
        //////////////////////////////////////////////////////


        lifePredictions:


          mergeLifePredictions(

            original.lifePredictions,

            enhanced.lifePredictions

          ),






        //////////////////////////////////////////////////////
        // OPPORTUNITIES
        //////////////////////////////////////////////////////


        opportunities:


          original.opportunities.map(

            (item,index)=>{


              const ai =
                enhanced.opportunities?.[index];



              if(!ai)
                return item;



              return {


                ...item,


                title:
                  ai.title || item.title,



                description:

                  safeEnhancedText(

                    ai.description,

                    item.description

                  ),


              };


            }

          ),







        //////////////////////////////////////////////////////
        // CAUTIONS
        //////////////////////////////////////////////////////


        cautions:


          original.cautions.map(

            (item,index)=>{


              const ai =
                enhanced.cautions?.[index];



              if(!ai)
                return item;



              return {


                ...item,


                title:
                  ai.title || item.title,



                description:

                  safeEnhancedText(

                    ai.description,

                    item.description

                  ),


              };


            }

          ),







        //////////////////////////////////////////////////////
        // NARRATIVE
        //////////////////////////////////////////////////////


        narrative:


        enhanced.narrative

        ?

        {


          opening:

            safeEnhancedText(

              enhanced.narrative.opening,

              original.narrative?.opening ?? ""

            ),



          development:

            safeEnhancedText(

              enhanced.narrative.development,

              original.narrative?.development ?? ""

            ),



          advice:

            safeEnhancedText(

              enhanced.narrative.advice,

              original.narrative?.advice ?? ""

            ),



          closing:

            safeEnhancedText(

              enhanced.narrative.closing,

              original.narrative.closing

            ),


        }


        :

        original.narrative,



      },


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
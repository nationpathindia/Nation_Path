//////////////////////////////////////////////////////////////
// NATIONPATH AI ENGINE
//
// Internal Intelligence Runtime
//
// NO OPENAI
// NO EXTERNAL PROVIDER
//
// Pipeline:
//
// Request
//   ↓
// Context Processing
//   ↓
// Intelligence Router
//   ↓
// Module Intelligence
//   ↓
// Quality Layer
//   ↓
// Response
//
// NationPath AI Core v1
//////////////////////////////////////////////////////////////


import type {
  NationPathAIRequest,
} from "./client";


import AI_CONFIG from "./constants";



//////////////////////////////////////////////////////////////
// NEWS PIPELINE
//////////////////////////////////////////////////////////////

import {
  generateNewsArticle
} from "./adapters/newsAdapter";


import type {
  NewsGenerationRequest
} from "./types";








//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////

interface EngineContext {


  module:string;


  systemPrompt:string;


  userPrompt:string;


  context:Record<string,any>;


}





interface IntelligencePayload {


  module:string;


  intelligence:string;


  context:any;


  generated?:boolean;


}








//////////////////////////////////////////////////////////////
// TEXT NORMALIZER
//////////////////////////////////////////////////////////////

function normalizeText(

 text?:string

){


 if(!text)

  return "";



 return text

  .trim()

  .replace(

    /\s+/g,

    " "

  );


}








//////////////////////////////////////////////////////////////
// QUALITY LAYER
//////////////////////////////////////////////////////////////

function qualityFilter(

 value:any

){



 if(typeof value === "string"){


   return normalizeText(
     value
   );


 }



 return value;


}






function applyQualityLayer(

 response:any

){



 return {


  ...response,



  output:

    qualityFilter(

      response.output

    )


 };


}









//////////////////////////////////////////////////////////////
// MODULE ROUTER
//////////////////////////////////////////////////////////////

function resolveModule(

 module?:string

){



 switch(module){



  case "astro":

    return "ASTRO_INTELLIGENCE";



  case "news":

    return "NEWS_INTELLIGENCE";



  case "kids":

    return "KIDS_INTELLIGENCE";



  case "content":

    return "CONTENT_INTELLIGENCE";



  default:

    return "GENERAL_INTELLIGENCE";


 }



}









//////////////////////////////////////////////////////////////
// CONTEXT BUILDER
//////////////////////////////////////////////////////////////

function buildContext(

 request:NationPathAIRequest

):EngineContext {



 return {


  module:

    resolveModule(

      request.module

    ),



  systemPrompt:

    normalizeText(

      request.systemPrompt

    ),



  userPrompt:

    normalizeText(

      request.userPrompt

    ),



  context:

    request.context
    ||
    {},



 };



}









//////////////////////////////////////////////////////////////
// ASTRO INTELLIGENCE
//////////////////////////////////////////////////////////////

function processAstro(

 context:EngineContext

):IntelligencePayload {



 return {


  module:

    context.module,



  intelligence:

    "ASTRO_EDITORIAL_ENHANCEMENT",



  context:

    context.context,



 };



}









//////////////////////////////////////////////////////////////
// NEWS INTELLIGENCE
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// NEWS INTELLIGENCE
//////////////////////////////////////////////////////////////

async function processNews(

  context:EngineContext

):Promise<IntelligencePayload>{



  const newsContext =

    context.context
    ||
    {};





  const request:NewsGenerationRequest = {



    rawNews:

      context.userPrompt,





    category:

      newsContext.category
      ||
      "general",





    articleType:

      newsContext.articleType
      ||
      "news",





    keywords:

      Array.isArray(
        newsContext.keywords
      )

      ?

      newsContext.keywords

      :

      [],





    location:

      newsContext.location
      ||
      "",





    source:

      newsContext.source
      ||
      "",





  };







  const article =

    await generateNewsArticle(

      request

    );








  return {



    module:

      context.module,





    intelligence:

      "NEWS_ARTICLE_GENERATION",





    generated:

      true,





    context:



      {



        ...newsContext,



        article,



        newsroom:

          {


            reviewed:

              false,



            published:

              false,



            requiresHumanApproval:

              true



          }



      }





  };



}






//////////////////////////////////////////////////////////////
// KIDS INTELLIGENCE
//////////////////////////////////////////////////////////////

function processKids(

 context:EngineContext

):IntelligencePayload {



 return {


  module:

    context.module,



  intelligence:

    "KIDS_CONTENT_INTELLIGENCE",



  context:

    context.context,



 };


}









//////////////////////////////////////////////////////////////
// CONTENT INTELLIGENCE
//////////////////////////////////////////////////////////////

function processContent(

 context:EngineContext

):IntelligencePayload {



 return {


  module:

    context.module,



  intelligence:

    "CONTENT_LANGUAGE_INTELLIGENCE",



  context:

    context.context,



 };


}









//////////////////////////////////////////////////////////////
// GENERAL INTELLIGENCE
//////////////////////////////////////////////////////////////

function processGeneral(

 context:EngineContext

):IntelligencePayload {



 return {


  module:

    context.module,



  intelligence:

    "GENERAL_LANGUAGE_INTELLIGENCE",



  context:

    context.context,



 };


}









//////////////////////////////////////////////////////////////
// INTELLIGENCE ROUTER
//////////////////////////////////////////////////////////////

async function processIntelligence(

 context:EngineContext

)
:Promise<IntelligencePayload>{



 switch(context.module){



  case "ASTRO_INTELLIGENCE":


    return processAstro(

      context

    );





  case "NEWS_INTELLIGENCE":


    return processNews(

      context

    );





  case "KIDS_INTELLIGENCE":


    return processKids(

      context

    );





  case "CONTENT_INTELLIGENCE":


    return processContent(

      context

    );





  default:


    return processGeneral(

      context

    );



 }



}









//////////////////////////////////////////////////////////////
// MAIN EXECUTOR
//////////////////////////////////////////////////////////////

export async function executeNationPathAI(

 request:NationPathAIRequest

){



 const context =


   buildContext(

     request

   );







 const intelligence =


   await processIntelligence(

     context

   );








 const response = {



  success:


    true,



  engine:


    AI_CONFIG.ENGINE,



  version:


    AI_CONFIG.VERSION,



  module:


    intelligence.module,



  intelligence:


    intelligence.intelligence,



  system:


    context.systemPrompt,



  input:


    context.userPrompt,



  context:


    intelligence.context,



  generated:


    intelligence.generated
    ||
    false,



  timestamp:


    new Date()

    .toISOString()



 };







 return applyQualityLayer(


   {


    ...response,



    output:


      intelligence.generated


      ?


      intelligence.context.article



      :


      JSON.stringify(

        response,

        null,

        2

      )



   }



 );



}









//////////////////////////////////////////////////////////////
// DEFAULT EXPORT
//////////////////////////////////////////////////////////////

export default {


 executeNationPathAI,


};
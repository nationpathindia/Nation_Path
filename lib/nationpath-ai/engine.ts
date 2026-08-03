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

  context:Record<string,any>;

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
  .replace(/\s+/g," ");

}





//////////////////////////////////////////////////////////////
// QUALITY LAYER
//////////////////////////////////////////////////////////////

function qualityFilter(
 value:any
){

 if(typeof value === "string"){

   return normalizeText(value);

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
   ),


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
// MODULE INTELLIGENCE
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







function processNews(
 context:EngineContext
):IntelligencePayload {


 return {


  module:
   context.module,


  intelligence:

   "NEWS_EDITORIAL_ENHANCEMENT",


  context:
   context.context,


 };


}







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


  success:true,


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

    false,



  timestamp:

    new Date()
    .toISOString(),


 };




 return applyQualityLayer(

   {

    ...response,


    output:

      JSON.stringify(
        response,
        null,
        2
      ),


   }

 );


}








//////////////////////////////////////////////////////////////
// DEFAULT EXPORT
//////////////////////////////////////////////////////////////

export default {


 executeNationPathAI,


};
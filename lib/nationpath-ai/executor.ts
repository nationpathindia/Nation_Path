//////////////////////////////////////////////////////////////
// NATIONPATH AI EXECUTOR
//
// Internal AI Runtime Executor
//
// NO OPENAI
// NO EXTERNAL PROVIDER
//
// Responsibility:
//
// Client
//      ↓
// Executor
//      ↓
// Engine
//      ↓
// Intelligence Modules
//      ↓
// Response
//
// NationPath AI Core v1
//////////////////////////////////////////////////////////////


import {
  executeNationPathAI,
} from "./engine";


import type {
  NationPathAIRequest,
} from "./client";


import type {
  AIProvider,
  AIModel,
  AIResponse,
} from "./types";





//////////////////////////////////////////////////////////////
// REGISTRY
//////////////////////////////////////////////////////////////


export const AIProviders = {


  "nationpath-ai": {


    name:
      "NationPath Internal AI",


    internal:
      true,


    external:
      false,


  },


} as const;







export const AIModels = {


  "nationpath-core-v1": {


    name:
      "NationPath Core v1",


    provider:
      "nationpath-ai",


    internal:
      true,


  },


} as const;









//////////////////////////////////////////////////////////////
// EXECUTOR TYPES
//////////////////////////////////////////////////////////////


export interface AIExecutionOptions {


  provider?:
    AIProvider;



  model?:
    AIModel;



  language?:
    string;



  temperature?:
    number;



  maxOutputTokens?:
    number;


}





export interface AIExecutionResult<T = any>
extends AIResponse<T>{


  output?:any;


}


//////////////////////////////////////////////////////////////
// LOGGER
//////////////////////////////////////////////////////////////


function logAI(
 message:string,
 data?:any
){


 if(
  process.env.NODE_ENV !== "production"
 ){

  console.log(

   "[NATIONPATH_AI_EXECUTOR]",

   message,

   data || ""

  );

 }


}









//////////////////////////////////////////////////////////////
// TIMER
//////////////////////////////////////////////////////////////


function startTimer(){

 return performance.now();

}





function calculateDuration(
 start:number
){

 return Math.round(

   performance.now()
   -
   start

 );


}









//////////////////////////////////////////////////////////////
// INTERNAL VALIDATORS
//////////////////////////////////////////////////////////////


function resolveProvider(

 provider?:AIProvider

):AIProvider{


 if(
  provider &&
  provider in AIProviders
 ){

  return provider;

 }


 return "nationpath-ai";


}







function resolveModel(

 model?:AIModel

):AIModel{


 if(
  model &&
  model in AIModels
 ){

  return model;

 }


 return "nationpath-core-v1";


}









//////////////////////////////////////////////////////////////
// RESPONSE BUILDER
//////////////////////////////////////////////////////////////


function createMeta(

 durationMs:number,

 provider:AIProvider,

 model:AIModel,

 module?:string

){


 return {


  engine:

    "NationPath-AI",



  version:

    "nationpath-ai-v1",



  module,



  provider,



  model,



  durationMs,


 };


}








//////////////////////////////////////////////////////////////
// MAIN AI EXECUTOR
//////////////////////////////////////////////////////////////


export async function executeAI<T = any>(


 request:NationPathAIRequest,


 options?:AIExecutionOptions


):Promise<AIExecutionResult<T>>{


 const started =

  startTimer();




 const provider =

  resolveProvider(

    options?.provider

  );





 const model =

  resolveModel(

    options?.model

  );






 try{


  logAI(

   "Execution started",

   {

    provider,

    model,

    module:
      request.module,

   }

  );






  const result =

   await executeNationPathAI(

    request

   );







  return {


 success:true,


 data:

  result as T,


 output:

  result,



 meta:

  createMeta(

     calculateDuration(

      started

     ),

     provider,

     model,

     request.module

    ),



  };





 }

 catch(error){



  console.error(

   "[NATIONPATH_AI_EXECUTOR_ERROR]",

   error

  );





  return {


   success:false,



   error:

    error instanceof Error

    ?

    error.message

    :

    "NationPath AI execution failed",



   meta:

    createMeta(

     calculateDuration(

      started

     ),

     provider,

     model,

     request.module

    ),


  };



 }



}






//////////////////////////////////////////////////////////////
// SAFE EXECUTOR
//////////////////////////////////////////////////////////////


export async function executeAISafe<T = any>(


 request:NationPathAIRequest,


 options?:AIExecutionOptions


):Promise<AIExecutionResult<T>>{


 try{


  return await executeAI<T>(

   request,

   options

  );


 }

 catch(error){



  return {


   success:false,


   error:

    error instanceof Error

    ?

    error.message

    :

    "Safe execution failed",



  };



 }



}
//////////////////////////////////////////////////////////////
// JSON EXECUTOR
//////////////////////////////////////////////////////////////


export async function executeAIJSON<T = any>(


 request:NationPathAIRequest,


 options?:AIExecutionOptions


):Promise<AIExecutionResult<T>>{


 const result =

  await executeAI<any>(

   request,

   options

  );





 if(!result.success){


  return result as AIExecutionResult<T>;


 }





 try{


  const raw =

   result.data;



  const parsed =


   typeof raw === "string"


   ?


   JSON.parse(raw)


   :


   raw;





  return {


   success:true,


   data:

    parsed as T,



   meta:

    result.meta,


  };



 }

 catch(error){



  return {


   success:false,


   error:


    error instanceof Error


    ?


    error.message


    :


    "JSON parsing failed",



   meta:

    result.meta,


  };



 }



}









//////////////////////////////////////////////////////////////
// STRUCTURED EXECUTOR
//////////////////////////////////////////////////////////////


export async function executeAIStructured<

 T = any

>(


 request:NationPathAIRequest,


 options?:AIExecutionOptions


):Promise<AIExecutionResult<T>>{



 const result =

  await executeAIJSON<T>(

   request,

   options

  );





 if(!result.success){


  return result;


 }





 return {


  success:true,


  data:

   result.data,


  meta:

   result.meta,


 };



}









//////////////////////////////////////////////////////////////
// SAFE STRUCTURED EXECUTOR
//////////////////////////////////////////////////////////////


export async function executeAIStructuredSafe<

 T = any

>(


 request:NationPathAIRequest,


 options?:AIExecutionOptions


):Promise<AIExecutionResult<T>>{


 try{


  return await executeAIStructured<T>(

   request,

   options

  );



 }

 catch(error){



  console.error(

   "[NATIONPATH_AI_STRUCTURED_ERROR]",

   error

  );




  return {


   success:false,


   error:

    error instanceof Error

    ?


    error.message


    :


    "Structured execution failed",



  };



 }


}









//////////////////////////////////////////////////////////////
// STREAM EXECUTOR
//////////////////////////////////////////////////////////////


export async function executeAIStream(


 request:NationPathAIRequest,


 options?:AIExecutionOptions


):Promise<AsyncGenerator<string>>{



 async function* stream(){



  const result =

   await executeAI(

    request,

    options

   );





  if(!result.success){


   yield JSON.stringify({


    success:false,


    error:

     result.error,


   });


   return;


  }







  const output =

   JSON.stringify(

    result.data

   );







  const chunks =

   output.match(

    /.{1,50}/g

   )

   ||

   [];






  for(
    const chunk of chunks
  ){


   yield chunk;


  }





 }




 return stream();



}









//////////////////////////////////////////////////////////////
// CONNECTION CHECK
//////////////////////////////////////////////////////////////


export async function checkAIConnection(){


 try{


  const result =

   await executeAISafe(

    {


     systemPrompt:

      "NationPath AI runtime health check",



     userPrompt:

      "Reply with runtime status",



     module:

      "general",


    }


   );






  return {


   success:

    result.success,



   message:


    result.success


    ?


    "NationPath AI Connected"


    :


    "NationPath AI Failed",



   engine:

    "NationPath-AI",



  };




 }

 catch(error){



  return {


   success:false,


   message:

    "NationPath AI unavailable",



   engine:

    "NationPath-AI",



  };


 }



}









//////////////////////////////////////////////////////////////
// COST ESTIMATION
//////////////////////////////////////////////////////////////


export function estimateCost(){



 return 0;



}









//////////////////////////////////////////////////////////////
// REGISTRY HELPERS
//////////////////////////////////////////////////////////////


export function getAIProviders(){


 return AIProviders;


}





export function getAIModels(){


 return AIModels;


}









//////////////////////////////////////////////////////////////
// DEFAULT EXPORT
//////////////////////////////////////////////////////////////


export default {


 executeAI,


 executeAISafe,


 executeAIJSON,


 executeAIStructured,


 executeAIStructuredSafe,


 executeAIStream,


 checkAIConnection,


 estimateCost,


 AIProviders,


 AIModels,


};
//////////////////////////////////////////////////////////////
// RUNTIME GUARDS
//////////////////////////////////////////////////////////////


export function isAIProviderAvailable(

 provider:AIProvider

){


 return (

  provider in AIProviders

 );


}







export function isAIModelAvailable(

 model:AIModel

){


 return (

  model in AIModels

 );


}









//////////////////////////////////////////////////////////////
// REQUEST NORMALIZER
//////////////////////////////////////////////////////////////


export function normalizeAIRequest(

 request:NationPathAIRequest

):NationPathAIRequest{


 return {


  systemPrompt:

   request.systemPrompt

   ?

   request.systemPrompt.trim()

   :

   "",




  userPrompt:

   request.userPrompt

   ?

   request.userPrompt.trim()

   :

   "",





  context:

   request.context

   ||

   {},





  module:

   request.module

   ||

   "general",



 };



}









//////////////////////////////////////////////////////////////
// EXECUTION WRAPPER
//////////////////////////////////////////////////////////////


export async function runNationPathAIRuntime<

 T = any

>(


 request:NationPathAIRequest,


 options?:AIExecutionOptions


):Promise<AIExecutionResult<T>>{


 const normalized =

  normalizeAIRequest(

   request

  );




 return executeAI<T>(


  normalized,


  options


 );



}









//////////////////////////////////////////////////////////////
// MODULE HEALTH
//////////////////////////////////////////////////////////////


export function getAIRuntimeStatus(){


 return {


  engine:

   "NationPath-AI",



  version:

   "nationpath-ai-v1",



  provider:

   Object.keys(

    AIProviders

   ),



  models:

   Object.keys(

    AIModels

   ),



  internal:

   true,



  external:

   false,



 };



}









//////////////////////////////////////////////////////////////
// FINAL EXPORT MAP
//////////////////////////////////////////////////////////////


export const NationPathAIRuntime = {


 executeAI,


 executeAISafe,


 executeAIJSON,


 executeAIStructured,


 executeAIStructuredSafe,


 executeAIStream,



 runNationPathAIRuntime,



 checkAIConnection,


 estimateCost,



 getAIProviders,


 getAIModels,


 getAIRuntimeStatus,



 isAIProviderAvailable,


 isAIModelAvailable,



};









//////////////////////////////////////////////////////////////
// END OF NATIONPATH AI EXECUTOR
//
// NationPath AI Core v1
//
// Internal Runtime Only
//
// NO OPENAI
// NO EXTERNAL PROVIDER
//////////////////////////////////////////////////////////////
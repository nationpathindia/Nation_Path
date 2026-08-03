//////////////////////////////////////////////////////////////
// NATIONPATH AI CLIENT
//
// Internal AI Runtime Client
//
// NO OPENAI
// NO EXTERNAL PROVIDER
//
// Responsibility:
//
// NationPath AI
//        ↓
// Runtime Layer
//        ↓
// Intelligence Modules
//
// Astro
// News
// Kids
// Premium
//
// Production Foundation v1
//////////////////////////////////////////////////////////////


import {
  executeNationPathAI,
} from "./engine";



//////////////////////////////////////////////////////////////
// AI CONFIG
//////////////////////////////////////////////////////////////

export const DEFAULT_AI_CONFIG = {


  version:
    "nationpath-ai-v1",



  temperature:
    0.7,



  maxTokens:
    2048,


};





//////////////////////////////////////////////////////////////
// AI REQUEST TYPE
//////////////////////////////////////////////////////////////
export interface NationPathAIRequest {


  systemPrompt:string;


  userPrompt:string;



  context?:Record<string,any>;



  module?:
    | "astro"
    | "news"
    | "kids"
    | "content"
    | "general";



  config?:Record<string,any>;



  schema?:any;



  schemaName?:string;


}

//////////////////////////////////////////////////////////////
// AI RESPONSE TYPE
//////////////////////////////////////////////////////////////

export interface NationPathAIResponse {


 success:boolean;


 output?:any;


 error?:string;



 meta?:{


   engine:string;


   version:string;


   module?:string;


 };



}









//////////////////////////////////////////////////////////////
// MAIN AI CLIENT
//////////////////////////////////////////////////////////////

export async function nationPathAI(
 request:NationPathAIRequest
):Promise<NationPathAIResponse>{



try{


 const result =

 await executeNationPathAI({


   ...request,


   config:
     DEFAULT_AI_CONFIG,


 });



 return {


   success:true,


   output:result,


   meta:{


    engine:
      "NationPath-AI",


    version:
      DEFAULT_AI_CONFIG.version,


    module:
      request.module,


   },


 };



}
catch(error){


 console.error(

 "[NATIONPATH_AI_CLIENT_ERROR]",

 error

 );



 return {


  success:false,


  error:

   error instanceof Error

   ?

   error.message

   :

   "AI execution failed",



  meta:{


   engine:
    "NationPath-AI",


   version:
    DEFAULT_AI_CONFIG.version,


  },


 };

}



}








//////////////////////////////////////////////////////////////
// HEALTH CHECK
//////////////////////////////////////////////////////////////

export async function checkAIConnection(){



try{


 const result =

 await nationPathAI({


  systemPrompt:

  "You are NationPath AI runtime.",



  userPrompt:

  "Reply OK",



  module:
    "general",



 });



 return {


  success:
   result.success,


  message:

   result.success

   ?

   "NationPath AI Connected"

   :

   "NationPath AI Failed",



 };



}
catch(error){



return {


 success:false,


 message:

 "NationPath AI unavailable",



};


}



}
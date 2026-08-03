//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// LANGUAGE INTELLIGENCE COMPOSER v7
//
// Premium Narrative Assembly Layer
//
// Combines:
// Planet Literature
// +
// Dominant Influence
// +
// Supporting Influences
// +
// Guidance Intelligence
// +
// Narrative Memory Control
//
// No calculations.
// No prediction rules.
// No astronomy.
//////////////////////////////////////////////////////////////


import type {

  LanguageComposition,

  PlanetLanguageOutput,

  LanguageLifeArea,

  LanguageTone,

} from "./types";



import type {

  NarrativeContext,

} from "../narrativeContext";



import {

  hasUsedStatement,

  rememberStatement,

  hasUsedExplanation,

  rememberExplanation,

  hasUsedAdvice,

  rememberAdvice,

} from "../narrativeContext";





//////////////////////////////////////////////////////////////
// TEXT UTILITIES
//////////////////////////////////////////////////////////////

function cleanText(

  value:string

):string {


  return value

    .replace(/\s+/g," ")

    .trim();


}





function normalizeSentence(

  value:string

):string {


  return value

    .toLowerCase()

    .replace(

      /[^a-z0-9]/g,

      ""

    );


}





function uniqueSentences(

  sentences:string[]

):string[] {


  const memory =

    new Set<string>();


  return sentences.filter(

    sentence=>{


      const key =

        normalizeSentence(

          sentence

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
// PLANET IDENTIFIER
//////////////////////////////////////////////////////////////

function extractPlanetName(

 text:string

):string {


 const match =

   text.match(

    /(Sun|Moon|Mars|Mercury|Jupiter|Venus|Saturn|Rahu|Ketu)/i

   );



 return match

 ?

 match[0]

 :

 "Planetary";


}









//////////////////////////////////////////////////////////////
// NARRATIVE TRANSITIONS
//////////////////////////////////////////////////////////////

const TRANSITIONS = [


 "Together, these influences create a period of awareness, growth and balanced progress.",


 "These planetary patterns encourage learning through experience while maintaining clarity and patience.",


 "The combined influence supports thoughtful decisions and meaningful personal development.",


];





function getTransition(){


 return TRANSITIONS[

   new Date().getDate()

   %

   TRANSITIONS.length

 ];


}









//////////////////////////////////////////////////////////////
// DOMINANT PLANET DETECTION
//////////////////////////////////////////////////////////////

function selectDominantOutput(

 outputs:PlanetLanguageOutput[]

){


 if(

  outputs.length===0

 ){

  return undefined;

 }




 return outputs

 .slice()

 .sort(

  (a:any,b:any)=>{


    const aScore =

      a.strengthScore ?? 0;



    const bScore =

      b.strengthScore ?? 0;



    return bScore-aScore;


  }

 )

 [0];


}









//////////////////////////////////////////////////////////////
// MEMORY CONTROL
//////////////////////////////////////////////////////////////

function addStatement(

 context:NarrativeContext | undefined,

 text:string

):

{

 text:string;

 context:NarrativeContext | undefined;

}

{


 if(

  !context

 ){

  return {

    text,

    context,

  };

 }



 if(

  hasUsedStatement(

    context,

    text

  )

 ){

  return {

    text:"",

    context,

  };

 }



 return {

  text,

  context:

    rememberStatement(

      context,

      text

    ),

 };


}







function addExplanation(

 context:NarrativeContext | undefined,

 text:string

){




 if(

  !context

 ){

  return {

    text,

    context,

  };

 }



 if(

  hasUsedExplanation(

    context,

    text

  )

 ){

  return {

    text:"",

    context,

  };

 }



 return {

  text,

  context:

    rememberExplanation(

      context,

      text

    ),

 };


}







function addAdvice(

 context:NarrativeContext | undefined,

 text:string

){



 if(

  !context

 ){

  return {

    text,

    context,

  };

 }



 if(

  hasUsedAdvice(

    context,

    text

  )

 ){

  return {

    text:"",

    context,

  };

 }



 return {

  text,

  context:

    rememberAdvice(

      context,

      text

    ),

 };


}









//////////////////////////////////////////////////////////////
// HEADLINE BUILDER
//////////////////////////////////////////////////////////////

function buildHeadline(

 outputs:PlanetLanguageOutput[],

 context?:NarrativeContext

){


 const dominant =

 selectDominantOutput(

  outputs

 );



 if(!dominant){


  return (

   "Your planetary influences reveal important patterns for growth and awareness."

  );


 }



 const planet =

 extractPlanetName(

  dominant.statement

 );




 const result =

 addStatement(

  context,

  dominant.statement

 );



 return (

 `${planet} creates the primary influence for this phase. ${cleanText(result.text || dominant.statement)}`

 );


}









//////////////////////////////////////////////////////////////
// DESCRIPTION BUILDER
//////////////////////////////////////////////////////////////

function buildDescription(

 outputs:PlanetLanguageOutput[],

 context?:NarrativeContext

):string {


 if(outputs.length===0){

  return (

   "Planetary influences create a phase of reflection, learning and balanced progress."

  );

 }



 let memoryContext = context;



 const sentences:string[]=[];



 const dominant =

 selectDominantOutput(

  outputs

 );




 const items = [


  dominant,


  ...outputs.filter(

   item => item !== dominant

  ).slice(

   0,

   3

  ),


 ];




 items.forEach(

  item=>{


   if(!item){

    return;

   }



   const result =

    addStatement(

      memoryContext,

      item.statement

    );



   memoryContext =

    result.context;



   if(result.text){

    sentences.push(

     result.text

    );

   }



  }

 );




 sentences.push(

  getTransition()

 );




 return cleanText(

  uniqueSentences(

   sentences

  )

  .join(" ")

 );


}









//////////////////////////////////////////////////////////////
// GUIDANCE BUILDER
//////////////////////////////////////////////////////////////

function buildGuidance(

 outputs:PlanetLanguageOutput[],

 context?:NarrativeContext

):string {



 let memoryContext=context;



 const guidance:string[]=[];



 outputs.forEach(

 item=>{


  if(!item.advice){

   return;

  }



  const result =

   addAdvice(

    memoryContext,

    item.advice

   );



  memoryContext =

    result.context;



  if(

   result.text &&

   !result.text

   .toLowerCase()

   .includes("represents")

  ){

   guidance.push(

    result.text

   );

  }


 }

 );




 return cleanText(

  uniqueSentences(

   guidance

  )

  .slice(

   0,

   4

  )

  .join(" ")

 );


}









//////////////////////////////////////////////////////////////
// METADATA BUILDER
//////////////////////////////////////////////////////////////

function buildMetadata(

 outputs:PlanetLanguageOutput[],

 area:LanguageLifeArea,

 context?:NarrativeContext

){


 let memoryContext=context;



 const explanations:string[]=[];



 outputs.forEach(

 item=>{


  if(!item.explanation){

   return;

  }



  const result =

   addExplanation(

    memoryContext,

    item.explanation

   );



  memoryContext =

    result.context;



  if(result.text){

   explanations.push(

    result.text

   );

  }


 }

 );





 const tone:LanguageTone="neutral";



 return {


  planet:


   uniqueSentences(

    explanations

   )

   .slice(

    0,

    4

   )

   .join(" "),



  area,


  tone,


 };


}









//////////////////////////////////////////////////////////////
// MAIN COMPOSER
//////////////////////////////////////////////////////////////

export function composeLanguage(

 outputs:PlanetLanguageOutput[],

 area:LanguageLifeArea="overall",

 context?:NarrativeContext

):LanguageComposition {



 const validOutputs =

 outputs.filter(Boolean);



 return {


  headline:

   buildHeadline(

    validOutputs,

    context

   ),



  description:

   buildDescription(

    validOutputs,

    context

   ),



  guidance:

   buildGuidance(

    validOutputs,

    context

   ),



  metadata:

   buildMetadata(

    validOutputs,

    area,

    context

   ),



 };


}









//////////////////////////////////////////////////////////////
// SINGLE PLANET COMPOSER
//////////////////////////////////////////////////////////////

export function composeSingleLanguage(

 output:PlanetLanguageOutput,

 area:LanguageLifeArea="overall"

):LanguageComposition {



 const tone:LanguageTone="neutral";



 return {


  headline:

   `${extractPlanetName(output.statement)} influence during this phase.`,



  description:

   cleanText(

    output.statement

   ),



  guidance:

   cleanText(

    output.advice

   ),



  metadata:{


   planet:

    cleanText(

     output.explanation

    ),



   area,



   tone,


  },


 };


}
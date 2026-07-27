//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// LANGUAGE INTELLIGENCE COMPOSER
//
// Combines:
// Planet Literature
// +
// Life Context
// +
// Guidance
//
// No calculations.
// No prediction rules.
//////////////////////////////////////////////////////////////


import type {

  LanguageComposition,

  PlanetLanguageOutput,

  LanguageLifeArea,

} from "./types";




//////////////////////////////////////////////////////////////
// SAFE TEXT UTILITIES
//////////////////////////////////////////////////////////////

function cleanText(

  value:string

):string {


  return value

    .replace(

      /\s+/g,

      " "

    )

    .trim();

}




function uniqueSentences(

  sentences:string[]

):string[] {


  const memory =

    new Set<string>();



  return sentences.filter(

    sentence => {


      const key =

        sentence

        .toLowerCase()

        .replace(

          /[^a-z0-9]/g,

          ""

        );



      if(

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
// TRANSITION LIBRARY
//////////////////////////////////////////////////////////////

const TRANSITIONS = [

  "This influence creates a deeper connection between personal growth and practical experiences.",


  "Together, these patterns highlight opportunities for awareness, development and balanced decisions.",


  "The current phase encourages learning through experience while maintaining clarity and patience.",


];





//////////////////////////////////////////////////////////////
// BUILD HEADLINE
//////////////////////////////////////////////////////////////

function buildHeadline(

 outputs:PlanetLanguageOutput[]

):string {


  if(outputs.length === 0){


    return (

      "Your planetary influences reveal important patterns for growth and awareness."

    );


  }




  return (

    "Your current planetary cycle highlights growth, awareness and meaningful personal development."

  );


}





//////////////////////////////////////////////////////////////
// BUILD DESCRIPTION
//////////////////////////////////////////////////////////////

function buildDescription(

 outputs:PlanetLanguageOutput[]

):string {


  const sentences =


    outputs.map(

      item =>

        item.statement

    );




  const combined =

    uniqueSentences(

      sentences

    )

    .slice(

      0,

      5

    );





  if(combined.length === 0){


    return (

      "Planetary influences are creating a period of reflection, learning and balanced progress."

    );


  }





  return cleanText(

    combined.join(

      " "

    )

  );


}





//////////////////////////////////////////////////////////////
// BUILD GUIDANCE
//////////////////////////////////////////////////////////////

function buildGuidance(

 outputs:PlanetLanguageOutput[]

):string {


  const advice =


    outputs.map(

      item =>

        item.advice

    );




  const filtered =

    uniqueSentences(

      advice

    )

    .slice(

      0,

      3

    );




  return cleanText(

    filtered.join(

      " "

    )

  );


}





//////////////////////////////////////////////////////////////
// MAIN COMPOSER
//////////////////////////////////////////////////////////////

export function composeLanguage(

  outputs:PlanetLanguageOutput[],

  area:LanguageLifeArea = "overall"

):LanguageComposition {


  const validOutputs =

    outputs.filter(Boolean);





  return {


    headline:

      buildHeadline(

        validOutputs

      ),




    description:

      buildDescription(

        validOutputs

      ),




    guidance:

      buildGuidance(

        validOutputs

      ),



    metadata:{


      planet:

        validOutputs

          .map(

            item =>

              item.explanation

          )

          .join(

            ", "

          ),



      area,


      tone:

        "neutral",


    },


  };


}





//////////////////////////////////////////////////////////////
// SINGLE PLANET COMPOSER
//////////////////////////////////////////////////////////////

export function composeSingleLanguage(

 output:PlanetLanguageOutput,

 area:LanguageLifeArea = "overall"

):LanguageComposition {


  return {


    headline:

      "Planetary influence and personal growth direction.",



    description:

      output.statement,



    guidance:

      output.advice,



    metadata:{


      planet:

        output.explanation,


      area,


      tone:

        "neutral",


    },


  };


}
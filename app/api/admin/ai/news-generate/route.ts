//////////////////////////////////////////////////////////////
// NATIONPATH AI NEWS GENERATE API
//
// Admin Newsroom Assistant
//
// NO OPENAI
// NO EXTERNAL PROVIDER
//
// Flow:
//
// Raw News
//    ↓
// NationPath AI
//    ↓
// News Intelligence
//    ↓
// Generated Draft
//
// Human Review Required
//////////////////////////////////////////////////////////////


import {
  NextRequest,
  NextResponse
} from "next/server";


import {
  nationPathAI
} from "@/lib/nationpath-ai/client";





//////////////////////////////////////////////////////////////
// CONFIG
//////////////////////////////////////////////////////////////

export const dynamic =
  "force-dynamic";







//////////////////////////////////////////////////////////////
// POST
//////////////////////////////////////////////////////////////

export async function POST(

 request:NextRequest

){


 try {



  const body =

    await request.json();






  const {


    rawNews,


    category,


    articleType,


    keywords,


    source



  } = body;








  ////////////////////////////////////////////////////////////
  // VALIDATION
  ////////////////////////////////////////////////////////////

  if(

    !rawNews
    ||
    typeof rawNews !== "string"

  ){


    return NextResponse.json(

      {


        success:false,


        error:

          "Raw news content required"



      },


      {
        status:400
      }

    );


  }








  ////////////////////////////////////////////////////////////
  // NATIONPATH AI EXECUTION
  ////////////////////////////////////////////////////////////

  const result =

    await nationPathAI({



      module:

        "news",





      systemPrompt:


        `

        You are NationPath News Intelligence.

        Convert raw news into structured newsroom
        article data.

        Never publish automatically.
        Human editor review required.

        `,





      userPrompt:


        rawNews,





      context:{


        category:

          category
          ||
          "general",



        articleType:

          articleType
          ||
          "news",



        keywords:

          keywords
          ||
          [],



        source:

          source
          ||
          ""



      }





    });









  ////////////////////////////////////////////////////////////
  // RESPONSE
  ////////////////////////////////////////////////////////////

  return NextResponse.json(


    {


      success:

        result.success,



      data:

        result.output,



      meta:


        result.meta



    }


  );







 }

 catch(error){



  console.error(

    "[NEWS_AI_GENERATE_ERROR]",

    error

  );



  return NextResponse.json(

    {


      success:false,


      error:

        error instanceof Error

        ?

        error.message

        :

        "News AI generation failed"



    },


    {

      status:500

    }


  );



 }

}
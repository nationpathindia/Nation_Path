//////////////////////////////////////////////////////////////
// NATIONPATH BIRTH CHART INTERPRETATION CMS ADMIN API
//
// GET  -> List Birth Chart Interpretations
// POST -> Create Interpretation
//
// Responsibility:
// Astrology knowledge management only.
//
// Does NOT:
// - calculate birth chart
// - modify astro engine
// - generate predictions
// - modify Swiss Ephemeris
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";

import BirthChartInterpretation from "@/app/models/BirthChartInterpretation";



export const dynamic = "force-dynamic";







//////////////////////////////////////////////////////////////
// GET ALL INTERPRETATIONS
//////////////////////////////////////////////////////////////

export async function GET(){


  try{


    await connectMongoDB();




    const interpretations =


      await (BirthChartInterpretation as any)

      .find({})

      .sort({

        priority:-1,

        createdAt:-1,

      })

      .lean();





    return NextResponse.json(

      {

        success:true,

        count:interpretations.length,

        data:interpretations,

      }

    );



  }


  catch(error:any){


    console.error(

      "[BIRTH_CHART_INTERPRETATION_GET_ERROR]",

      error

    );




    return NextResponse.json(

      {

        success:false,

        message:

          "Failed to fetch birth chart interpretations",


        error:

          error.message,

      },

      {

        status:500,

      }

    );


  }


}









//////////////////////////////////////////////////////////////
// CREATE INTERPRETATION
//////////////////////////////////////////////////////////////

export async function POST(

 req:NextRequest

){


 try{


    await connectMongoDB();




    const body =

      await req.json();







    if(

      !body.title ||

      !body.slug ||

      !body.subject ||

      !body.interpretation

    ){


      return NextResponse.json(

        {

          success:false,


          message:

          "Title, slug, subject and interpretation are required",


        },

        {

          status:400,

        }

      );


    }









    const title =

      String(body.title)

      .trim();





    const slug =


      String(body.slug)

      .trim()

      .toLowerCase();





    const subject =


      String(body.subject)

      .trim();





    const interpretation =


      String(body.interpretation)

      .trim();









    const existing =


      await (BirthChartInterpretation as any)

      .findOne({

        slug,

      });







    if(existing){


      return NextResponse.json(

        {

          success:false,


          message:

          "Birth chart interpretation already exists",

        },

        {

          status:409,

        }

      );


    }









    const payload = {



      title,



      slug,



      subject,



      category:

        body.category || "general",




      planet:

        body.planet || null,




      house:

        body.house || null,




      zodiac:

        body.zodiac || null,




      aspect:

        body.aspect || null,




      keywords:

        body.keywords || [],




      interpretation,




      positiveEffects:

        body.positiveEffects || [],




      negativeEffects:

        body.negativeEffects || [],




      remedies:

        body.remedies || [],




      strengths:

        body.strengths || [],




      weaknesses:

        body.weaknesses || [],




      examples:

        body.examples || "",




      language:

        body.language || "multi",




      seo:

        body.seo || {},




      priority:

        body.priority || 1,




      status:


        body.status === "published"

        ?

        "published"

        :

        "draft",



    };









    const created =


      await (BirthChartInterpretation as any)

      .create(payload);









    return NextResponse.json(

      {

        success:true,


        message:

        "Birth chart interpretation created successfully",



        data:created,


      },

      {

        status:201,

      }

    );





 }


 catch(error:any){



    console.error(

      "[BIRTH_CHART_INTERPRETATION_CREATE_ERROR]",

      error

    );






    if(error.code === 11000){



      return NextResponse.json(

        {

          success:false,


          message:

          "Duplicate slug",

        },

        {

          status:409,

        }

      );


    }







    return NextResponse.json(

      {

        success:false,


        message:

        "Failed to create birth chart interpretation",


        error:

        error.message,

      },

      {

        status:500,

      }

    );



 }


}
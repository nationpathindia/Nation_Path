//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO FAQ INTELLIGENCE CMS ADMIN API
//
// GET  -> List FAQ
// POST -> Create FAQ
//
// Responsibility:
// Astrology FAQ knowledge management only.
//
// Does NOT:
// - calculate astrology
// - modify astro engine
// - generate predictions
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";

import AstroFAQ from "@/app/models/AstroFAQ";



export const dynamic = "force-dynamic";









//////////////////////////////////////////////////////////////
// GET ALL FAQ
//////////////////////////////////////////////////////////////

export async function GET(){


  try{


    await connectMongoDB();





    const faqs =


      await (AstroFAQ as any)

      .find({})

      .sort({


        priority:-1,


        createdAt:-1,


      })

      .lean();








    return NextResponse.json(

      {


        success:true,


        count:faqs.length,


        data:faqs,


      }


    );



  }


  catch(error:any){



    console.error(

      "[ASTRO_FAQ_GET_ERROR]",

      error

    );







    return NextResponse.json(

      {


        success:false,


        message:

          "Failed to fetch astro FAQ",



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
// CREATE FAQ
//////////////////////////////////////////////////////////////

export async function POST(

  req:NextRequest

){


  try{


    await connectMongoDB();





    const body =

      await req.json();









    if(

      !body.question ||

      !body.slug ||

      !body.answer

    ){


      return NextResponse.json(

        {


          success:false,


          message:

            "Question, slug and answer are required",


        },


        {


          status:400,


        }


      );


    }









    const question =


      String(body.question)

      .trim();









    const slug =


      String(body.slug)

      .trim()

      .toLowerCase();









    const answer =


      String(body.answer)

      .trim();









    const existing =


      await (AstroFAQ as any)

      .findOne({

        slug,

      });









    if(existing){


      return NextResponse.json(

        {


          success:false,


          message:

            "FAQ already exists",


        },


        {


          status:409,


        }


      );


    }









    const payload = {





      question,





      slug,





      answer,






      category:


        body.category || "general",






      language:


        body.language || "english",






      relatedZodiac:


        body.relatedZodiac || [],






      relatedPlanets:


        body.relatedPlanets || [],






      relatedDoshas:


        body.relatedDoshas || [],






      relatedYogas:


        body.relatedYogas || [],






      relatedDashas:


        body.relatedDashas || [],






      relatedRemedies:


        body.relatedRemedies || [],






      keywords:


        body.keywords || [],






      priority:


        body.priority || 1,






      seo:


        body.seo || {},






      status:


        body.status === "published"

        ?

        "published"

        :

        "draft",



    };









    const created =


      await (AstroFAQ as any)

      .create(payload);









    return NextResponse.json(

      {


        success:true,


        message:

          "Astro FAQ created successfully",



        data:created,


      },


      {


        status:201,


      }


    );






  }


  catch(error:any){



    console.error(

      "[ASTRO_FAQ_CREATE_ERROR]",

      error

    );








    if(error.code === 11000){


      return NextResponse.json(

        {


          success:false,


          message:

            "Duplicate FAQ slug",


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

          "Failed to create astro FAQ",



        error:

          error.message,


      },


      {


        status:500,


      }


    );



  }


}
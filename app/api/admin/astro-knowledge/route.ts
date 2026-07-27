//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO KNOWLEDGE CMS ADMIN API
//
// GET  -> List knowledge articles
// POST -> Create knowledge article
//
// Responsibility:
// Astrology educational content management only.
//
// Does NOT:
// - calculate astrology
// - modify astro engine
// - generate predictions
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";

import AstroKnowledge from "@/app/models/AstroKnowledge";



export const dynamic = "force-dynamic";









//////////////////////////////////////////////////////////////
// GET ALL KNOWLEDGE
//////////////////////////////////////////////////////////////

export async function GET(){


  try{


    await connectMongoDB();





    const knowledge =


      await (AstroKnowledge as any)

      .find({})

      .sort({

        createdAt:-1,

      })

      .lean();







    return NextResponse.json(

      {


        success:true,


        count:knowledge.length,


        data:knowledge,


      }


    );



  }


  catch(error:any){



    console.error(

      "[ASTRO_KNOWLEDGE_GET_ERROR]",

      error

    );







    return NextResponse.json(

      {


        success:false,


        message:

          "Failed to fetch astro knowledge",



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
// CREATE KNOWLEDGE ARTICLE
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

      !body.slug

    ){


      return NextResponse.json(

        {


          success:false,


          message:

            "Title and slug are required",


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









    const existing =


      await (AstroKnowledge as any)

      .findOne({

        slug,

      });









    if(existing){


      return NextResponse.json(

        {


          success:false,


          message:

            "Knowledge article already exists",


        },


        {


          status:409,


        }


      );


    }









    const payload = {





      title,





      slug,






      category:


        body.category || "other",






      language:


        body.language || "english",






      shortDescription:


        body.shortDescription || "",






      content:


        body.content || "",






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






      faq:


        body.faq || [],






      tags:


        body.tags || [],






      media:


        body.media || {},






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


      await (AstroKnowledge as any)

      .create(payload);









    return NextResponse.json(

      {


        success:true,


        message:

          "Astro knowledge created successfully",



        data:created,


      },


      {


        status:201,


      }


    );






  }


  catch(error:any){



    console.error(

      "[ASTRO_KNOWLEDGE_CREATE_ERROR]",

      error

    );








    if(error.code === 11000){


      return NextResponse.json(

        {


          success:false,


          message:

            "Duplicate knowledge slug",


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

          "Failed to create astro knowledge",



        error:

          error.message,


      },


      {


        status:500,


      }


    );



  }


}
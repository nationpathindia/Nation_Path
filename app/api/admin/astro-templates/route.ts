//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO TEMPLATE CMS ADMIN API
//
// GET  -> List templates
// POST -> Create template
//
// Responsibility:
// AI + Prediction response template management only.
//
// Does NOT:
// - calculate planetary positions
// - modify astro engine
// - generate predictions
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";

import AstroTemplate from "@/app/models/AstroTemplate";



export const dynamic = "force-dynamic";









//////////////////////////////////////////////////////////////
// GET ALL ASTRO TEMPLATES
//////////////////////////////////////////////////////////////

export async function GET(){


  try{


    await connectMongoDB();





    const templates =


      await (AstroTemplate as any)

      .find({})

      .sort({

        createdAt:-1,

      })

      .lean();









    return NextResponse.json(

      {


        success:true,


        count:templates.length,


        data:templates,


      }


    );



  }


  catch(error:any){



    console.error(


      "[ASTRO_TEMPLATE_GET_ERROR]",


      error


    );







    return NextResponse.json(

      {


        success:false,


        message:


          "Failed to fetch astro templates",



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
// CREATE ASTRO TEMPLATE
//////////////////////////////////////////////////////////////

export async function POST(

  req:NextRequest

){


  try{


    await connectMongoDB();





    const body =

      await req.json();









    if(

      !body.templateName ||

      !body.slug

    ){


      return NextResponse.json(

        {


          success:false,


          message:


            "Template name and slug are required",


        },


        {


          status:400,


        }


      );


    }









    const templateName =


      String(body.templateName)

      .trim();









    const slug =


      String(body.slug)

      .trim()

      .toLowerCase();












    const existing =


      await (AstroTemplate as any)

      .findOne({

        slug,

      });









    if(existing){


      return NextResponse.json(

        {


          success:false,


          message:


            "Astro template already exists",


        },


        {


          status:409,


        }


      );


    }












    const payload = {



      templateName,



      slug,





      category:


        body.category || "daily_rashifal",





      language:


        body.language || "hindi",









      structure:


        body.structure || {},









      variables:


        body.variables || {},









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


      await (AstroTemplate as any)

      .create(payload);












    return NextResponse.json(

      {


        success:true,


        message:


          "Astro template created successfully",



        data:created,


      },


      {


        status:201,


      }


    );








  }


  catch(error:any){





    console.error(


      "[ASTRO_TEMPLATE_CREATE_ERROR]",


      error


    );









    if(error.code === 11000){


      return NextResponse.json(

        {


          success:false,


          message:


            "Duplicate astro template entry",


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


          "Failed to create astro template",



        error:


          error.message,


      },


      {


        status:500,


      }


    );



  }


}
//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO SCORE CMS ADMIN API
//
// GET  -> List scoring rules
// POST -> Create scoring rule
//
// Responsibility:
// Astrology scoring rule management only.
//
// Does NOT:
// - calculate planetary positions
// - modify astro engine
// - generate predictions
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";

import AstroScore from "@/app/models/AstroScore";



export const dynamic = "force-dynamic";









//////////////////////////////////////////////////////////////
// GET ALL ASTRO SCORES
//////////////////////////////////////////////////////////////

export async function GET(){


  try{


    await connectMongoDB();





    const scores =


      await (AstroScore as any)

      .find({})

      .sort({

        createdAt:-1,

      })

      .lean();









    return NextResponse.json(

      {


        success:true,


        count:scores.length,


        data:scores,


      }


    );



  }


  catch(error:any){



    console.error(


      "[ASTRO_SCORE_GET_ERROR]",


      error


    );









    return NextResponse.json(

      {


        success:false,


        message:


          "Failed to fetch astro scores",



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
// CREATE ASTRO SCORE
//////////////////////////////////////////////////////////////

export async function POST(

  req:NextRequest

){


  try{


    await connectMongoDB();





    const body =

      await req.json();









    if(

      !body.name ||

      !body.slug

    ){


      return NextResponse.json(

        {


          success:false,


          message:


            "Name and slug are required",


        },


        {


          status:400,


        }


      );


    }









    const name =


      String(body.name)

      .trim();









    const slug =


      String(body.slug)

      .trim()

      .toLowerCase();












    const existing =


      await (AstroScore as any)

      .findOne({

        slug,

      });









    if(existing){


      return NextResponse.json(

        {


          success:false,


          message:


            "Astro score already exists",


        },


        {


          status:409,


        }


      );


    }












    const payload = {



      name,



      slug,





      type:


        body.type || "planet",









      target:


        body.target || {},









      score:


        body.score || {},









      weight:


        body.weight || 1,









      priority:


        body.priority || 1,









      category:


        body.category || "career",









      conditions:


        body.conditions || {},









      description:


        body.description || "",









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


      await (AstroScore as any)

      .create(payload);












    return NextResponse.json(

      {


        success:true,


        message:


          "Astro score created successfully",



        data:created,


      },


      {


        status:201,


      }


    );








  }


  catch(error:any){





    console.error(


      "[ASTRO_SCORE_CREATE_ERROR]",


      error


    );









    if(error.code === 11000){


      return NextResponse.json(

        {


          success:false,


          message:


            "Duplicate astro score entry",


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


          "Failed to create astro score",



        error:


          error.message,


      },


      {


        status:500,


      }


    );



  }


}
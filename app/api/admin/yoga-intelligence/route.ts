//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Yoga Intelligence Admin API
//
// GET  -> List Yoga knowledge
// POST -> Create Yoga knowledge
//
// Responsibility:
// Yoga knowledge management only.
//
// Does NOT:
// - calculate yoga
// - modify astro engine
// - generate predictions
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";

import YogaIntelligence from "@/app/models/YogaIntelligence";



export const dynamic = "force-dynamic";





//////////////////////////////////////////////////////////////
// GET ALL YOGA
//////////////////////////////////////////////////////////////

export async function GET(){


  try{


    await connectMongoDB();




    const yoga =

      await (YogaIntelligence as any)

      .find({})

      .sort({

        createdAt:-1,

      })

      .lean();






    return NextResponse.json(

      {


        success:true,


        count:yoga.length,


        data:yoga,


      }


    );



  }



  catch(error:any){



    console.error(

      "[YOGA_INTELLIGENCE_GET_ERROR]",

      error

    );






    return NextResponse.json(

      {


        success:false,


        message:

        "Failed to fetch yoga intelligence",



        error:error.message,



      },


      {


        status:500,


      }


    );



  }


}









//////////////////////////////////////////////////////////////
// CREATE YOGA
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

      !body.slug ||

      !body.description

    ){


      return NextResponse.json(

        {


          success:false,


          message:

          "Name, slug and description are required",


        },


        {


          status:400,


        }


      );


    }









    const slug =


      String(body.slug)

      .trim()

      .toLowerCase();







    const existing =


      await (YogaIntelligence as any)

      .findOne({

        slug,

      });







    if(existing){



      return NextResponse.json(

        {


          success:false,


          message:

          "Yoga already exists",


        },


        {


          status:409,


        }


      );



    }









    const payload = {



      name:

      String(body.name).trim(),




      slug,






      names:

      body.names || {},







      category:

      body.category || "other",






      type:

      body.type || "",







      planets:


      Array.isArray(body.planets)

      ?

      body.planets

      :

      [],







      houses:


      Array.isArray(body.houses)

      ?

      body.houses

      :

      [],







      formation:

      body.formation || "",







      positiveEffects:


      Array.isArray(body.positiveEffects)

      ?

      body.positiveEffects

      :

      [],






      negativeEffects:


      Array.isArray(body.negativeEffects)

      ?

      body.negativeEffects

      :

      [],







      challenges:


      Array.isArray(body.challenges)

      ?

      body.challenges

      :

      [],







      career:

      body.career || "",






      finance:

      body.finance || "",






      marriage:

      body.marriage || "",






      health:

      body.health || "",






      spirituality:

      body.spirituality || "",







      remedies:

      body.remedies || {},






      description:

      body.description || "",







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


      await (YogaIntelligence as any)

      .create(payload);









    return NextResponse.json(

      {


        success:true,


        message:

        "Yoga created successfully",


        data:created,


      },


      {


        status:201,


      }


    );





  }



  catch(error:any){



    console.error(

      "[YOGA_INTELLIGENCE_CREATE_ERROR]",

      error

    );







    if(error.code === 11000){



      return NextResponse.json(

        {


          success:false,


          message:

          "Duplicate yoga entry",


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

        "Failed to create yoga",


        error:error.message,



      },


      {


        status:500,


      }


    );



  }


}
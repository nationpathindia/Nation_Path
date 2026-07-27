//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO BUSINESS INTELLIGENCE CMS ADMIN API
//
// GET  -> List Business Intelligence
// POST -> Create Business Intelligence
//
// Responsibility:
// Astrology knowledge management only.
//
// Does NOT:
// - calculate astrology
// - modify prediction engine
// - modify Swiss Ephemeris
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";

import BusinessIntelligence from "@/app/models/BusinessIntelligence";



export const dynamic = "force-dynamic";









//////////////////////////////////////////////////////////////
// GET ALL BUSINESS INTELLIGENCE
//////////////////////////////////////////////////////////////

export async function GET(){


  try{


    await connectMongoDB();





    const data =


      await (BusinessIntelligence as any)

      .find({})

      .sort({

        createdAt:-1,

      })

      .lean();








    return NextResponse.json(

      {

        success:true,

        count:data.length,

        data,

      }

    );



  }


  catch(error:any){


    console.error(

      "[BUSINESS_INTELLIGENCE_GET_ERROR]",

      error

    );






    return NextResponse.json(

      {

        success:false,

        message:

        "Failed to fetch business intelligence",

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
// CREATE BUSINESS INTELLIGENCE
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









    const slug =


      String(body.slug)

      .trim()

      .toLowerCase();









    const existing =


      await (BusinessIntelligence as any)

      .findOne({

        slug,

      });








    if(existing){


      return NextResponse.json(

        {

          success:false,

          message:

          "Business intelligence already exists",

        },

        {

          status:409,

        }

      );


    }











    const payload = {


      ...body,


      slug,




      status:


        body.status === "published"

        ?

        "published"

        :

        "draft",


    };












    const created =


      await (BusinessIntelligence as any)

      .create(payload);











    return NextResponse.json(

      {


        success:true,


        message:

        "Business intelligence created successfully",




        data:created,


      },

      {

        status:201,

      }

    );








 }


 catch(error:any){





    console.error(

      "[BUSINESS_INTELLIGENCE_CREATE_ERROR]",

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

        "Failed to create business intelligence",

        error:

        error.message,

      },

      {

        status:500,

      }

    );



 }


}
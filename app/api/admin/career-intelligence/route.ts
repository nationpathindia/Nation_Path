//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CAREER INTELLIGENCE CMS ADMIN API
//
// GET  -> List Career Intelligence
// POST -> Create Career Intelligence
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

import CareerIntelligence from "@/app/models/CareerIntelligence";



export const dynamic = "force-dynamic";









//////////////////////////////////////////////////////////////
// GET ALL CAREER INTELLIGENCE
//////////////////////////////////////////////////////////////

export async function GET(){


  try{


    await connectMongoDB();




    const data =


      await (CareerIntelligence as any)

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

      "[CAREER_INTELLIGENCE_GET_ERROR]",

      error

    );





    return NextResponse.json(

      {

        success:false,

        message:

        "Failed to fetch career intelligence",

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
// CREATE CAREER INTELLIGENCE
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


      await (CareerIntelligence as any)

      .findOne({

        slug,

      });







    if(existing){


      return NextResponse.json(

        {

          success:false,

          message:

          "Career intelligence already exists",

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


      await (CareerIntelligence as any)

      .create(payload);








    return NextResponse.json(

      {

        success:true,


        message:

        "Career intelligence created successfully",



        data:created,


      },

      {

        status:201,

      }

    );






 }


 catch(error:any){



    console.error(

      "[CAREER_INTELLIGENCE_CREATE_ERROR]",

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

        "Failed to create career intelligence",

        error:

        error.message,

      },

      {

        status:500,

      }

    );



 }


}
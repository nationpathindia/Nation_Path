//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO FOREIGN SETTLEMENT INTELLIGENCE CMS ADMIN API
//
// GET  -> List Foreign Settlement Intelligence
// POST -> Create Foreign Settlement Intelligence
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

import ForeignSettlementIntelligence from "@/app/models/ForeignSettlementIntelligence";



export const dynamic = "force-dynamic";









//////////////////////////////////////////////////////////////
// GET ALL FOREIGN SETTLEMENT INTELLIGENCE
//////////////////////////////////////////////////////////////

export async function GET(){


  try{


    await connectMongoDB();






    const data =


      await (ForeignSettlementIntelligence as any)

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

      "[FOREIGN_SETTLEMENT_INTELLIGENCE_GET_ERROR]",

      error

    );







    return NextResponse.json(

      {

        success:false,

        message:

        "Failed to fetch foreign settlement intelligence",

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
// CREATE FOREIGN SETTLEMENT INTELLIGENCE
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


      await (ForeignSettlementIntelligence as any)

      .findOne({

        slug,

      });








    if(existing){


      return NextResponse.json(

        {

          success:false,

          message:

          "Foreign settlement intelligence already exists",

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


      await (ForeignSettlementIntelligence as any)

      .create(payload);











    return NextResponse.json(

      {


        success:true,



        message:


        "Foreign settlement intelligence created successfully",




        data:created,


      },

      {

        status:201,

      }

    );








 }


 catch(error:any){





    console.error(

      "[FOREIGN_SETTLEMENT_INTELLIGENCE_CREATE_ERROR]",

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

        "Failed to create foreign settlement intelligence",

        error:

        error.message,

      },

      {

        status:500,

      }

    );



 }


}
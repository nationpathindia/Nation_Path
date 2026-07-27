//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Lagna Intelligence API
//
// GET  : Fetch all lagna intelligence records
// POST : Create new lagna intelligence record
//
// IMPORTANT:
// This API only manages knowledge/content.
// No astrology calculation happens here.
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";

import LagnaIntelligence from "@/app/models/LagnaIntelligence";





//////////////////////////////////////////////////////////////
// GET ALL
//////////////////////////////////////////////////////////////

export async function GET(){


  try{


    await connectMongoDB();



    const data = await LagnaIntelligence

      .find({})

      .sort({

        createdAt:-1,

      });





    return NextResponse.json({

      success:true,

      data,

    });





  }


  catch(error){



    console.error(

      "Lagna Intelligence GET Error:",

      error

    );





    return NextResponse.json(

      {


        success:false,


        message:"Failed to fetch lagna intelligence",


      },


      {


        status:500,


      }


    );



  }


}












//////////////////////////////////////////////////////////////
// CREATE
//////////////////////////////////////////////////////////////

export async function POST(

  req:NextRequest

){


  try{


    await connectMongoDB();




    const body = await req.json();






    if(

      !body.lagna ||

      !body.slug ||

      !body.description

    ){



      return NextResponse.json(


        {


          success:false,


          message:

          "Lagna, slug and description are required",


        },


        {


          status:400,


        }


      );


    }








    const existing =

      await LagnaIntelligence.findOne({


        slug:body.slug,


      });







    if(existing){



      return NextResponse.json(


        {


          success:false,


          message:

          "Slug already exists",


        },


        {


          status:400,


        }


      );



    }








    const created =

      await LagnaIntelligence.create({


        ...body,


      });







    return NextResponse.json(


      {


        success:true,


        message:

        "Lagna intelligence created successfully",


        data:created,


      },


      {


        status:201,


      }


    );







  }


  catch(error){



    console.error(


      "Lagna Intelligence POST Error:",


      error


    );







    return NextResponse.json(


      {


        success:false,


        message:

        "Failed to create lagna intelligence",


      },


      {


        status:500,


      }


    );



  }


}
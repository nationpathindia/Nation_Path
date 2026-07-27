//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Compatibility Intelligence API
//
// GET  : Fetch all compatibility intelligence records
// POST : Create new compatibility intelligence record
//
// IMPORTANT:
// This API only manages knowledge/content.
// No astrology calculation happens here.
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";

import CompatibilityIntelligence from "@/app/models/CompatibilityIntelligence";





//////////////////////////////////////////////////////////////
// GET ALL
//////////////////////////////////////////////////////////////

export async function GET(){


  try{


    await connectMongoDB();



    const data = await CompatibilityIntelligence

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


      "Compatibility Intelligence GET Error:",


      error


    );







    return NextResponse.json(


      {


        success:false,


        message:

        "Failed to fetch compatibility intelligence",


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

      !body.title ||

      !body.slug ||

      !body.description

    ){



      return NextResponse.json(


        {


          success:false,


          message:

          "Title, slug and description are required",


        },


        {


          status:400,


        }


      );



    }










    const existing =

      await CompatibilityIntelligence.findOne({


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

      await CompatibilityIntelligence.create({


        ...body,


      });









    return NextResponse.json(


      {


        success:true,


        message:

        "Compatibility intelligence created successfully",



        data:created,


      },


      {


        status:201,


      }


    );








  }


  catch(error){



    console.error(


      "Compatibility Intelligence POST Error:",


      error


    );







    return NextResponse.json(


      {


        success:false,


        message:

        "Failed to create compatibility intelligence",


      },


      {


        status:500,


      }


    );



  }


}
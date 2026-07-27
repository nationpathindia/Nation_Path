//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Dasha Intelligence API
//
// GET  : Fetch all dasha intelligence records
// POST : Create new dasha intelligence record
//
// IMPORTANT:
// This API only manages knowledge/content.
// No astrology calculation happens here.
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";

import DashaIntelligence from "@/app/models/DashaIntelligence";



//////////////////////////////////////////////////////////////
// GET ALL
//////////////////////////////////////////////////////////////

export async function GET(){

  try{


    await connectMongoDB();



    const data = await DashaIntelligence
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
      "Dasha Intelligence GET Error:",
      error
    );


    return NextResponse.json(

      {

        success:false,

        message:"Failed to fetch dasha intelligence",

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
      !body.planet ||
      !body.slug ||
      !body.description
    ){

      return NextResponse.json(

        {

          success:false,

          message:
          "Planet, slug and description are required",

        },

        {
          status:400,
        }

      );

    }






    const existing =
      await DashaIntelligence.findOne({

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
      await DashaIntelligence.create({

        ...body,

      });






    return NextResponse.json(

      {

        success:true,

        message:
        "Dasha intelligence created successfully",

        data:created,

      },

      {

        status:201,

      }

    );





  }

  catch(error){


    console.error(

      "Dasha Intelligence POST Error:",

      error

    );



    return NextResponse.json(

      {

        success:false,

        message:
        "Failed to create dasha intelligence",

      },

      {

        status:500,

      }

    );


  }


}
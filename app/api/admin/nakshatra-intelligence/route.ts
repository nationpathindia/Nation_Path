//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Nakshatra Intelligence API
//
// GET  : Fetch all nakshatra intelligence records
// POST : Create new nakshatra intelligence record
//
// IMPORTANT:
// This API only manages knowledge/content.
// No astrology calculation happens here.
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";

import NakshatraIntelligence from "@/app/models/NakshatraIntelligence";



//////////////////////////////////////////////////////////////
// GET ALL
//////////////////////////////////////////////////////////////

export async function GET(){

  try{

    await connectMongoDB();



    const data = await NakshatraIntelligence
      .find({})
      .sort({
        number:1,
      });



    return NextResponse.json({

      success:true,

      data,

    });



  }

  catch(error){


    console.error(

      "Nakshatra Intelligence GET Error:",

      error

    );



    return NextResponse.json(

      {

        success:false,

        message:"Failed to fetch nakshatra intelligence",

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

      !body.nakshatra ||

      !body.slug ||

      !body.number

    ){

      return NextResponse.json(

        {

          success:false,

          message:
          "Nakshatra, slug and number are required",

        },

        {

          status:400,

        }

      );

    }





    const existingSlug =
      await NakshatraIntelligence.findOne({

        slug:body.slug,

      });




    if(existingSlug){

      return NextResponse.json(

        {

          success:false,

          message:"Slug already exists",

        },

        {

          status:400,

        }

      );

    }





    const existingNumber =
      await NakshatraIntelligence.findOne({

        number:body.number,

      });




    if(existingNumber){

      return NextResponse.json(

        {

          success:false,

          message:"Nakshatra number already exists",

        },

        {

          status:400,

        }

      );

    }





    const created =
      await NakshatraIntelligence.create({

        ...body,

      });





    return NextResponse.json(

      {

        success:true,

        message:
        "Nakshatra intelligence created successfully",

        data:created,

      },

      {

        status:201,

      }

    );



  }

  catch(error){


    console.error(

      "Nakshatra Intelligence POST Error:",

      error

    );



    return NextResponse.json(

      {

        success:false,

        message:
        "Failed to create nakshatra intelligence",

      },

      {

        status:500,

      }

    );


  }

}
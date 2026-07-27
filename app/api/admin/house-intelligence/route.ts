//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// House Intelligence API
//
// GET  : Fetch all house intelligence records
// POST : Create new house intelligence record
//
// IMPORTANT:
// This API only manages knowledge/content.
// No astrology calculation happens here.
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";

import HouseIntelligence from "@/app/models/HouseIntelligence";



//////////////////////////////////////////////////////////////
// GET ALL
//////////////////////////////////////////////////////////////

export async function GET(){


  try{


    await connectMongoDB();



    const data = await HouseIntelligence
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

      "House Intelligence GET Error:",

      error

    );



    return NextResponse.json(


      {

        success:false,

        message:
        "Failed to fetch house intelligence",

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

      !body.houseNumber ||

      !body.slug ||

      !body.description

    ){


      return NextResponse.json(


        {

          success:false,

          message:
          "House number, slug and description are required",

        },


        {

          status:400,

        }


      );


    }







    const existing =

      await HouseIntelligence.findOne({

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

      await HouseIntelligence.create({


        ...body,


      });








    return NextResponse.json(


      {


        success:true,


        message:
        "House intelligence created successfully",


        data:created,


      },


      {


        status:201,


      }


    );






  }


  catch(error){



    console.error(


      "House Intelligence POST Error:",


      error


    );





    return NextResponse.json(


      {


        success:false,


        message:
        "Failed to create house intelligence",


      },


      {


        status:500,


      }


    );



  }


}
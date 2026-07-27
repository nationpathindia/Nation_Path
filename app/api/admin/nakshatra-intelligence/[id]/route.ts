//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Nakshatra Intelligence Dynamic API
//
// GET    : Single record
// PUT    : Update record
// DELETE : Remove record
//
// IMPORTANT:
// Knowledge management only.
// No astrology calculation.
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";

import NakshatraIntelligence from "@/app/models/NakshatraIntelligence";



//////////////////////////////////////////////////////////////
// GET SINGLE
//////////////////////////////////////////////////////////////

export async function GET(

  req:NextRequest,

  {
    params,
  }:{
    params:{
      id:string;
    }
  }

){

  try{

    await connectMongoDB();



    const data =
      await NakshatraIntelligence.findById(
        params.id
      );



    if(!data){

      return NextResponse.json(

        {

          success:false,

          message:"Nakshatra intelligence not found",

        },

        {

          status:404,

        }

      );

    }



    return NextResponse.json({

      success:true,

      data,

    });

  }

  catch(error){

    console.error(

      "Nakshatra Intelligence GET ID Error:",

      error

    );



    return NextResponse.json(

      {

        success:false,

        message:"Failed to fetch record",

      },

      {

        status:500,

      }

    );

  }

}





//////////////////////////////////////////////////////////////
// UPDATE
//////////////////////////////////////////////////////////////

export async function PUT(

  req:NextRequest,

  {
    params,
  }:{
    params:{
      id:string;
    }
  }

){

  try{

    await connectMongoDB();



    const body =
      await req.json();




    if(body.slug){

      const existingSlug =
        await NakshatraIntelligence.findOne({

          slug:body.slug,

          _id:{
            $ne:params.id,
          },

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

    }




    if(body.number){

      const existingNumber =
        await NakshatraIntelligence.findOne({

          number:body.number,

          _id:{
            $ne:params.id,
          },

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

    }




    const updated =
      await NakshatraIntelligence.findByIdAndUpdate(

        params.id,

        {

          ...body,

        },

        {

          new:true,

        }

      );




    if(!updated){

      return NextResponse.json(

        {

          success:false,

          message:"Nakshatra intelligence not found",

        },

        {

          status:404,

        }

      );

    }




    return NextResponse.json({

      success:true,

      message:
      "Nakshatra intelligence updated successfully",

      data:updated,

    });

  }

  catch(error){

    console.error(

      "Nakshatra Intelligence UPDATE Error:",

      error

    );



    return NextResponse.json(

      {

        success:false,

        message:"Failed to update record",

      },

      {

        status:500,

      }

    );

  }

}





//////////////////////////////////////////////////////////////
// DELETE
//////////////////////////////////////////////////////////////

export async function DELETE(

  req:NextRequest,

  {
    params,
  }:{
    params:{
      id:string;
    }
  }

){

  try{

    await connectMongoDB();



    const deleted =

      await NakshatraIntelligence.findByIdAndDelete(

        params.id

      );



    if(!deleted){

      return NextResponse.json(

        {

          success:false,

          message:"Nakshatra intelligence not found",

        },

        {

          status:404,

        }

      );

    }




    return NextResponse.json({

      success:true,

      message:
      "Nakshatra intelligence deleted successfully",

    });

  }

  catch(error){

    console.error(

      "Nakshatra Intelligence DELETE Error:",

      error

    );



    return NextResponse.json(

      {

        success:false,

        message:"Failed to delete record",

      },

      {

        status:500,

      }

    );

  }

}
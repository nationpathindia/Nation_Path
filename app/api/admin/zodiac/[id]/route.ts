//////////////////////////////////////////////////////////////
// NATIONPATH ZODIAC CMS ADMIN API
//
// PUT    -> Update zodiac
// DELETE -> Remove zodiac
//
// Responsibility:
// Admin master data management only.
//
// Does NOT:
// - calculate horoscope
// - modify astro engine
// - generate predictions
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import mongoose from "mongoose";

import { connectMongoDB } from "@/lib/mongodb";

import Zodiac from "@/app/models/Zodiac";



export const dynamic = "force-dynamic";







//////////////////////////////////////////////////////////////
// UPDATE ZODIAC
//////////////////////////////////////////////////////////////

export async function PUT(

  req: NextRequest,

  context:{
    params:Promise<{
      id:string;
    }>
  }

){


  try{


    await connectMongoDB();




    const {

      id

    } = await context.params;





    if(!id || !mongoose.Types.ObjectId.isValid(id)){


      return NextResponse.json(

        {

          success:false,

          message:

            "Invalid Zodiac ID",

        },

        {

          status:400,

        }

      );


    }






    const body =

      await req.json();







    const updateData:any = {



      ...body,



    };







    if(body.zodiac){


      updateData.zodiac =

        String(body.zodiac)

        .trim()

        .toLowerCase();


    }






    if(body.slug){


      updateData.slug =

        String(body.slug)

        .trim()

        .toLowerCase();


    }







    const updatedZodiac =

      await (Zodiac as any)

      .findByIdAndUpdate(

        id,

        {

          $set:updateData,

        },

        {

          new:true,

          runValidators:true,

        }

      );








    if(!updatedZodiac){


      return NextResponse.json(

        {

          success:false,

          message:

            "Zodiac not found",

        },

        {

          status:404,

        }

      );


    }








    return NextResponse.json(

      {

        success:true,

        message:

          "Zodiac updated successfully",

        data:

          updatedZodiac,

      }

    );





  }


  catch(error:any){



    console.error(

      "[ZODIAC_UPDATE_ERROR]",

      error

    );




    return NextResponse.json(

      {

        success:false,

        message:

          "Failed to update zodiac",

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
// DELETE ZODIAC
//////////////////////////////////////////////////////////////

export async function DELETE(

  req:NextRequest,

  context:{
    params:Promise<{
      id:string;
    }>
  }

){


  try{


    await connectMongoDB();




    const {

      id

    } = await context.params;







    if(!id || !mongoose.Types.ObjectId.isValid(id)){


      return NextResponse.json(

        {

          success:false,

          message:

            "Invalid Zodiac ID",

        },

        {

          status:400,

        }

      );


    }








    const deletedZodiac =

      await (Zodiac as any)

      .findByIdAndDelete(

        id

      );









    if(!deletedZodiac){


      return NextResponse.json(

        {

          success:false,

          message:

            "Zodiac not found",

        },

        {

          status:404,

        }

      );


    }








    return NextResponse.json(

      {

        success:true,

        message:

          "Zodiac deleted successfully",

        data:

          deletedZodiac,

      }

    );





  }


  catch(error:any){



    console.error(

      "[ZODIAC_DELETE_ERROR]",

      error

    );





    return NextResponse.json(

      {

        success:false,

        message:

          "Failed to delete zodiac",

        error:

          error.message,

      },

      {

        status:500,

      }

    );


  }


}
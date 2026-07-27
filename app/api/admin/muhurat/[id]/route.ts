//////////////////////////////////////////////////////////////
// NATIONPATH MUHURAT CMS ADMIN API
//
// GET    -> Single Muhurat
// PUT    -> Update Muhurat
// DELETE -> Remove Muhurat
//
// Responsibility:
// Admin master data management only.
//
// Does NOT:
// - calculate muhurat
// - run astrology engine
// - generate predictions
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import mongoose from "mongoose";

import { connectMongoDB } from "@/lib/mongodb";

import Muhurat from "@/app/models/Muhurat";



export const dynamic = "force-dynamic";









//////////////////////////////////////////////////////////////
// GET SINGLE MUHURAT
//////////////////////////////////////////////////////////////

export async function GET(

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







    if(

      !id ||

      !mongoose.Types.ObjectId.isValid(id)

    ){


      return NextResponse.json(

        {


          success:false,


          message:

            "Invalid Muhurat ID",


        },


        {


          status:400,


        }


      );


    }









    const muhurat =


      await (Muhurat as any)

      .findById(id)

      .lean();







    if(!muhurat){


      return NextResponse.json(

        {


          success:false,


          message:

            "Muhurat not found",


        },


        {


          status:404,


        }


      );


    }








    return NextResponse.json(

      {


        success:true,


        data:muhurat,


      }


    );



  }


  catch(error:any){



    console.error(

      "[MUHURAT_GET_SINGLE_ERROR]",

      error

    );





    return NextResponse.json(

      {


        success:false,


        message:

          "Failed to fetch Muhurat",


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
// UPDATE MUHURAT
//////////////////////////////////////////////////////////////

export async function PUT(

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








    if(

      !id ||

      !mongoose.Types.ObjectId.isValid(id)

    ){


      return NextResponse.json(

        {


          success:false,


          message:

            "Invalid Muhurat ID",


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









    if(body.title){


      updateData.title =

        String(body.title)

        .trim();


    }








    if(body.slug){


      updateData.slug =

        String(body.slug)

        .trim()

        .toLowerCase();


    }








    const updated =


      await (Muhurat as any)

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









    if(!updated){


      return NextResponse.json(

        {


          success:false,


          message:

            "Muhurat not found",


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

          "Muhurat updated successfully",


        data:updated,


      }


    );





  }


  catch(error:any){



    console.error(

      "[MUHURAT_UPDATE_ERROR]",

      error

    );






    return NextResponse.json(

      {


        success:false,


        message:

          "Failed to update Muhurat",


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
// DELETE MUHURAT
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







    if(

      !id ||

      !mongoose.Types.ObjectId.isValid(id)

    ){


      return NextResponse.json(

        {


          success:false,


          message:

            "Invalid Muhurat ID",


        },


        {


          status:400,


        }


      );


    }









    const deleted =


      await (Muhurat as any)

      .findByIdAndDelete(id);









    if(!deleted){


      return NextResponse.json(

        {


          success:false,


          message:

            "Muhurat not found",


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

          "Muhurat deleted successfully",


        data:deleted,


      }


    );






  }


  catch(error:any){



    console.error(

      "[MUHURAT_DELETE_ERROR]",

      error

    );






    return NextResponse.json(

      {


        success:false,


        message:

          "Failed to delete Muhurat",


        error:

          error.message,


      },


      {


        status:500,


      }


    );



  }


}
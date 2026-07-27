//////////////////////////////////////////////////////////////
// NATIONPATH PANCHANG CMS ADMIN API
//
// GET    -> Single Panchang
// PUT    -> Update Panchang
// DELETE -> Remove Panchang
//
// Responsibility:
// Admin master data management only.
//
// Does NOT:
// - calculate astronomy
// - run Swiss Ephemeris
// - generate predictions
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import mongoose from "mongoose";

import { connectMongoDB } from "@/lib/mongodb";

import Panchang from "@/app/models/Panchang";



export const dynamic = "force-dynamic";







//////////////////////////////////////////////////////////////
// GET SINGLE PANCHANG
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

            "Invalid Panchang ID",


        },


        {


          status:400,


        }


      );


    }








    const panchang =


      await (Panchang as any)

      .findById(id)

      .lean();







    if(!panchang){


      return NextResponse.json(

        {


          success:false,


          message:

            "Panchang not found",


        },


        {


          status:404,


        }


      );


    }








    return NextResponse.json(

      {


        success:true,


        data:panchang,


      }


    );




  }


  catch(error:any){


    console.error(

      "[PANCHANG_GET_SINGLE_ERROR]",

      error

    );



    return NextResponse.json(

      {


        success:false,


        message:

          "Failed to fetch Panchang",


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
// UPDATE PANCHANG
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

            "Invalid Panchang ID",


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








    if(body.date){


      updateData.date =

        String(body.date)

        .trim();


    }








    if(body.location){


      updateData.location =

        String(body.location)

        .trim();


    }








    const updatedPanchang =


      await (Panchang as any)

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








    if(!updatedPanchang){


      return NextResponse.json(

        {


          success:false,


          message:

            "Panchang not found",


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

          "Panchang updated successfully",


        data:

          updatedPanchang,


      }


    );






  }


  catch(error:any){


    console.error(

      "[PANCHANG_UPDATE_ERROR]",

      error

    );




    return NextResponse.json(

      {


        success:false,


        message:

          "Failed to update Panchang",


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
// DELETE PANCHANG
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

            "Invalid Panchang ID",


        },


        {


          status:400,


        }


      );


    }








    const deletedPanchang =


      await (Panchang as any)

      .findByIdAndDelete(id);









    if(!deletedPanchang){


      return NextResponse.json(

        {


          success:false,


          message:

            "Panchang not found",


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

          "Panchang deleted successfully",


        data:

          deletedPanchang,


      }


    );







  }


  catch(error:any){



    console.error(

      "[PANCHANG_DELETE_ERROR]",

      error

    );




    return NextResponse.json(

      {


        success:false,


        message:

          "Failed to delete Panchang",


        error:

          error.message,


      },


      {


        status:500,


      }


    );



  }


}
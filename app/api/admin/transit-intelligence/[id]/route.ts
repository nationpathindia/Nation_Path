//////////////////////////////////////////////////////////////
// NATIONPATH TRANSIT INTELLIGENCE CMS ADMIN API
//
// GET    -> Single transit rule
// PUT    -> Update transit rule
// DELETE -> Remove transit rule
//
// Responsibility:
// Planetary transit knowledge management only.
//
// Does NOT:
// - calculate planetary positions
// - modify Swiss Ephemeris
// - generate predictions
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import mongoose from "mongoose";

import { connectMongoDB } from "@/lib/mongodb";

import TransitIntelligence from "@/app/models/TransitIntelligence";



export const dynamic = "force-dynamic";









//////////////////////////////////////////////////////////////
// GET SINGLE TRANSIT RULE
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


            "Invalid Transit ID",


        },


        {


          status:400,


        }


      );


    }









    const transit =


      await (TransitIntelligence as any)

      .findById(id)

      .lean();









    if(!transit){


      return NextResponse.json(

        {


          success:false,


          message:


            "Transit rule not found",


        },


        {


          status:404,


        }


      );


    }









    return NextResponse.json({


      success:true,


      data:transit,


    });



  }


  catch(error:any){



    console.error(


      "[TRANSIT_GET_SINGLE_ERROR]",


      error


    );









    return NextResponse.json(

      {


        success:false,


        message:


          "Failed to fetch transit rule",



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
// UPDATE TRANSIT RULE
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


            "Invalid Transit ID",


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









    if(body.name){


      updateData.name =


        String(body.name)

        .trim();


    }









    if(body.slug){


      updateData.slug =


        String(body.slug)

        .trim()

        .toLowerCase();


    }









    if(body.planet){


      updateData.planet =


        String(body.planet)

        .trim()

        .toLowerCase();


    }









    const updated =


      await (TransitIntelligence as any)

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


            "Transit rule not found",


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


          "Transit rule updated successfully",



        data:updated,


      }


    );



  }


  catch(error:any){



    console.error(


      "[TRANSIT_UPDATE_ERROR]",


      error


    );









    return NextResponse.json(

      {


        success:false,


        message:


          "Failed to update transit rule",



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
// DELETE TRANSIT RULE
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


            "Invalid Transit ID",


        },


        {


          status:400,


        }


      );


    }









    const deleted =


      await (TransitIntelligence as any)

      .findByIdAndDelete(id);









    if(!deleted){


      return NextResponse.json(

        {


          success:false,


          message:


            "Transit rule not found",


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


          "Transit rule deleted successfully",



        data:deleted,


      }


    );





  }


  catch(error:any){



    console.error(


      "[TRANSIT_DELETE_ERROR]",


      error


    );









    return NextResponse.json(

      {


        success:false,


        message:


          "Failed to delete transit rule",



        error:


          error.message,


      },


      {


        status:500,


      }


    );


  }


}
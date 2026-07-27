//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO SCORE CMS ADMIN API
//
// GET    -> Single scoring rule
// PUT    -> Update scoring rule
// DELETE -> Remove scoring rule
//
// Responsibility:
// Astrology scoring rule management only.
//
// Does NOT:
// - calculate planetary positions
// - modify astro engine
// - generate predictions
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import mongoose from "mongoose";

import { connectMongoDB } from "@/lib/mongodb";

import AstroScore from "@/app/models/AstroScore";



export const dynamic = "force-dynamic";









//////////////////////////////////////////////////////////////
// GET SINGLE ASTRO SCORE
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


            "Invalid Astro Score ID",


        },


        {


          status:400,


        }


      );


    }









    const score =


      await (AstroScore as any)

      .findById(id)

      .lean();









    if(!score){


      return NextResponse.json(

        {


          success:false,


          message:


            "Astro score not found",


        },


        {


          status:404,


        }


      );


    }









    return NextResponse.json({


      success:true,


      data:score,


    });



  }


  catch(error:any){



    console.error(


      "[ASTRO_SCORE_GET_SINGLE_ERROR]",


      error


    );









    return NextResponse.json(

      {


        success:false,


        message:


          "Failed to fetch astro score",



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
// UPDATE ASTRO SCORE
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


            "Invalid Astro Score ID",


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









    const updated =


      await (AstroScore as any)

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


            "Astro score not found",


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


          "Astro score updated successfully",



        data:updated,


      }


    );



  }


  catch(error:any){



    console.error(


      "[ASTRO_SCORE_UPDATE_ERROR]",


      error


    );









    return NextResponse.json(

      {


        success:false,


        message:


          "Failed to update astro score",



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
// DELETE ASTRO SCORE
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


            "Invalid Astro Score ID",


        },


        {


          status:400,


        }


      );


    }









    const deleted =


      await (AstroScore as any)

      .findByIdAndDelete(id);









    if(!deleted){


      return NextResponse.json(

        {


          success:false,


          message:


            "Astro score not found",


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


          "Astro score deleted successfully",



        data:deleted,


      }


    );





  }


  catch(error:any){



    console.error(


      "[ASTRO_SCORE_DELETE_ERROR]",


      error


    );









    return NextResponse.json(

      {


        success:false,


        message:


          "Failed to delete astro score",



        error:


          error.message,


      },


      {


        status:500,


      }


    );


  }


}
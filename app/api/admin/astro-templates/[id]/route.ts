//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO TEMPLATE CMS ADMIN API
//
// GET    -> Single template
// PUT    -> Update template
// DELETE -> Remove template
//
// Responsibility:
// AI + Prediction response template management only.
//
// Does NOT:
// - calculate planetary positions
// - modify astro engine
// - generate predictions
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import mongoose from "mongoose";

import { connectMongoDB } from "@/lib/mongodb";

import AstroTemplate from "@/app/models/AstroTemplate";



export const dynamic = "force-dynamic";









//////////////////////////////////////////////////////////////
// GET SINGLE ASTRO TEMPLATE
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


            "Invalid Astro Template ID",


        },


        {


          status:400,


        }


      );


    }









    const template =


      await (AstroTemplate as any)

      .findById(id)

      .lean();









    if(!template){


      return NextResponse.json(

        {


          success:false,


          message:


            "Astro template not found",


        },


        {


          status:404,


        }


      );


    }









    return NextResponse.json({


      success:true,


      data:template,


    });



  }


  catch(error:any){



    console.error(


      "[ASTRO_TEMPLATE_GET_SINGLE_ERROR]",


      error


    );









    return NextResponse.json(

      {


        success:false,


        message:


          "Failed to fetch astro template",



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
// UPDATE ASTRO TEMPLATE
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


            "Invalid Astro Template ID",


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









    if(body.templateName){


      updateData.templateName =


        String(body.templateName)

        .trim();


    }









    if(body.slug){


      updateData.slug =


        String(body.slug)

        .trim()

        .toLowerCase();


    }









    const updated =


      await (AstroTemplate as any)

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


            "Astro template not found",


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


          "Astro template updated successfully",



        data:updated,


      }


    );



  }


  catch(error:any){



    console.error(


      "[ASTRO_TEMPLATE_UPDATE_ERROR]",


      error


    );









    return NextResponse.json(

      {


        success:false,


        message:


          "Failed to update astro template",



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
// DELETE ASTRO TEMPLATE
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


            "Invalid Astro Template ID",


        },


        {


          status:400,


        }


      );


    }









    const deleted =


      await (AstroTemplate as any)

      .findByIdAndDelete(id);









    if(!deleted){


      return NextResponse.json(

        {


          success:false,


          message:


            "Astro template not found",


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


          "Astro template deleted successfully",



        data:deleted,


      }


    );





  }


  catch(error:any){



    console.error(


      "[ASTRO_TEMPLATE_DELETE_ERROR]",


      error


    );









    return NextResponse.json(

      {


        success:false,


        message:


          "Failed to delete astro template",



        error:


          error.message,


      },


      {


        status:500,


      }


    );


  }


}
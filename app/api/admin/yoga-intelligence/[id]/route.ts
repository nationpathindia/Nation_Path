//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Yoga Intelligence Dynamic API
//
// GET    -> Single Yoga
// PUT    -> Update Yoga
// DELETE -> Delete Yoga
//
// Responsibility:
// Knowledge management only.
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";

import YogaIntelligence from "@/app/models/YogaIntelligence";



export const dynamic = "force-dynamic";







//////////////////////////////////////////////////////////////
// GET SINGLE YOGA
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





    const yoga =

      await (YogaIntelligence as any)

      .findById(

        params.id

      )

      .lean();







    if(!yoga){


      return NextResponse.json(

        {


          success:false,


          message:

          "Yoga not found",


        },


        {


          status:404,


        }


      );


    }








    return NextResponse.json(

      {


        success:true,


        data:yoga,


      }


    );





  }


  catch(error:any){



    console.error(

      "[YOGA_INTELLIGENCE_GET_ID_ERROR]",

      error

    );





    return NextResponse.json(

      {


        success:false,


        message:

        "Failed to fetch yoga",


        error:error.message,


      },


      {


        status:500,


      }


    );



  }


}









//////////////////////////////////////////////////////////////
// UPDATE YOGA
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






    const updated =


      await (YogaIntelligence as any)

      .findByIdAndUpdate(


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


          message:

          "Yoga not found",


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

        "Yoga updated successfully",


        data:updated,


      }


    );





  }


  catch(error:any){



    console.error(

      "[YOGA_INTELLIGENCE_UPDATE_ERROR]",

      error

    );







    return NextResponse.json(

      {


        success:false,


        message:

        "Failed to update yoga",


        error:error.message,


      },


      {


        status:500,


      }


    );



  }


}









//////////////////////////////////////////////////////////////
// DELETE YOGA
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


      await (YogaIntelligence as any)

      .findByIdAndDelete(

        params.id

      );







    if(!deleted){


      return NextResponse.json(

        {


          success:false,


          message:

          "Yoga not found",


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

        "Yoga deleted successfully",


      }


    );






  }


  catch(error:any){



    console.error(

      "[YOGA_INTELLIGENCE_DELETE_ERROR]",

      error

    );







    return NextResponse.json(

      {


        success:false,


        message:

        "Failed to delete yoga",


        error:error.message,


      },


      {


        status:500,


      }


    );



  }


}
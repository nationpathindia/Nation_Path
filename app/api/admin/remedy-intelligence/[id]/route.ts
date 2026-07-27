//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO REMEDY INTELLIGENCE CMS DYNAMIC API
//
// GET    -> Single remedy
// PUT    -> Update remedy
// DELETE -> Delete remedy
//
// Responsibility:
// Astrology remedy knowledge management only.
//
// Does NOT:
// - calculate remedies
// - modify astro engine
// - generate predictions
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";

import RemedyIntelligence from "@/app/models/RemedyIntelligence";



export const dynamic = "force-dynamic";








//////////////////////////////////////////////////////////////
// GET SINGLE REMEDY
//////////////////////////////////////////////////////////////

export async function GET(

  req:NextRequest,

  context:{
    params:{
      id:string;
    }
  }

){


  try{


    await connectMongoDB();




    const { id } = context.params;






    const remedy =


      await (RemedyIntelligence as any)

      .findById(id)

      .lean();







    if(!remedy){


      return NextResponse.json(

        {


          success:false,


          message:

            "Remedy not found",


        },


        {


          status:404,


        }


      );


    }









    return NextResponse.json(

      {


        success:true,


        data:remedy,


      }


    );



  }


  catch(error:any){



    console.error(

      "[REMEDY_INTELLIGENCE_SINGLE_GET_ERROR]",

      error

    );






    return NextResponse.json(

      {


        success:false,


        message:

          "Failed to fetch remedy",


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
// UPDATE REMEDY
//////////////////////////////////////////////////////////////

export async function PUT(

  req:NextRequest,

  context:{
    params:{
      id:string;
    }
  }

){


  try{


    await connectMongoDB();




    const { id } = context.params;





    const body =

      await req.json();








    if(body.remedy){


      body.remedy =


        String(body.remedy)

        .trim();


    }








    if(body.slug){


      body.slug =


        String(body.slug)

        .trim()

        .toLowerCase();


    }








    if(body.status){


      body.status =


        body.status === "published"

        ?

        "published"

        :

        "draft";


    }









    const updated =


      await (RemedyIntelligence as any)

      .findByIdAndUpdate(


        id,


        {


          $set:body,


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

            "Remedy not found",


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

          "Remedy updated successfully",



        data:updated,


      }


    );



  }


  catch(error:any){



    console.error(

      "[REMEDY_INTELLIGENCE_UPDATE_ERROR]",

      error

    );









    if(error.code === 11000){


      return NextResponse.json(

        {


          success:false,


          message:

            "Duplicate remedy slug",


        },


        {


          status:409,


        }


      );


    }








    return NextResponse.json(

      {


        success:false,


        message:

          "Failed to update remedy",


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
// DELETE REMEDY
//////////////////////////////////////////////////////////////

export async function DELETE(

  req:NextRequest,

  context:{
    params:{
      id:string;
    }
  }

){


  try{


    await connectMongoDB();




    const { id } = context.params;







    const deleted =


      await (RemedyIntelligence as any)

      .findByIdAndDelete(id);







    if(!deleted){


      return NextResponse.json(

        {


          success:false,


          message:

            "Remedy not found",


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

          "Remedy deleted successfully",


      }


    );



  }


  catch(error:any){



    console.error(

      "[REMEDY_INTELLIGENCE_DELETE_ERROR]",

      error

    );







    return NextResponse.json(

      {


        success:false,


        message:

          "Failed to delete remedy",


        error:

          error.message,


      },


      {


        status:500,


      }


    );



  }


}
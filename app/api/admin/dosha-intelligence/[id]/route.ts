//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO DOSHA INTELLIGENCE CMS DYNAMIC API
//
// GET    -> Single dosha intelligence
// PUT    -> Update dosha intelligence
// DELETE -> Delete dosha intelligence
//
// Responsibility:
// Astrology dosha knowledge management only.
//
// Does NOT:
// - calculate dosha
// - analyze horoscope
// - modify astro engine
// - generate predictions
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";

import DoshaIntelligence from "@/app/models/DoshaIntelligence";


export const dynamic = "force-dynamic";





//////////////////////////////////////////////////////////////
// GET SINGLE DOSHA INTELLIGENCE
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





    const dosha =


      await (DoshaIntelligence as any)

      .findById(id)

      .lean();







    if(!dosha){


      return NextResponse.json(

        {


          success:false,


          message:

            "Dosha intelligence not found",


        },


        {


          status:404,


        }


      );


    }








    return NextResponse.json(

      {


        success:true,


        data:dosha,


      }


    );



  }


  catch(error:any){



    console.error(

      "[DOSHA_INTELLIGENCE_SINGLE_GET_ERROR]",

      error

    );






    return NextResponse.json(

      {


        success:false,


        message:

          "Failed to fetch dosha intelligence",


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
// UPDATE DOSHA INTELLIGENCE
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









    if(body.slug){


      body.slug =

        String(body.slug)

        .trim()

        .toLowerCase();


    }







    if(body.dosha){


      body.dosha =

        String(body.dosha)

        .trim();


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


      await (DoshaIntelligence as any)

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

            "Dosha intelligence not found",


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

          "Dosha intelligence updated successfully",



        data:updated,


      }


    );



  }


  catch(error:any){



    console.error(

      "[DOSHA_INTELLIGENCE_UPDATE_ERROR]",

      error

    );






    if(error.code === 11000){


      return NextResponse.json(

        {


          success:false,


          message:

            "Duplicate dosha intelligence slug",


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

          "Failed to update dosha intelligence",


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
// DELETE DOSHA INTELLIGENCE
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


      await (DoshaIntelligence as any)

      .findByIdAndDelete(id);







    if(!deleted){


      return NextResponse.json(

        {


          success:false,


          message:

            "Dosha intelligence not found",


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

          "Dosha intelligence deleted successfully",


      }


    );



  }


  catch(error:any){



    console.error(

      "[DOSHA_INTELLIGENCE_DELETE_ERROR]",

      error

    );







    return NextResponse.json(

      {


        success:false,


        message:

          "Failed to delete dosha intelligence",


        error:

          error.message,


      },


      {


        status:500,


      }


    );



  }


}
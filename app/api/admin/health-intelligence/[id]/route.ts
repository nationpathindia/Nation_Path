//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HEALTH INTELLIGENCE CMS DYNAMIC API
//
// GET    -> Single Health Intelligence
// PUT    -> Update Health Intelligence
// DELETE -> Delete Health Intelligence
//
// Responsibility:
// Astrology health knowledge management only.
//
// Does NOT:
// - provide medical diagnosis
// - calculate astrology
// - modify astro engine
// - modify Swiss Ephemeris
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";

import HealthIntelligence from "@/app/models/HealthIntelligence";



export const dynamic = "force-dynamic";









//////////////////////////////////////////////////////////////
// GET SINGLE HEALTH INTELLIGENCE
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








    const health =


      await (HealthIntelligence as any)

      .findById(id)

      .lean();








    if(!health){


      return NextResponse.json(

        {

          success:false,


          message:

          "Health intelligence not found",

        },

        {

          status:404,

        }

      );


    }









    return NextResponse.json(

      {

        success:true,

        data:health,

      }

    );




  }


  catch(error:any){



    console.error(

      "[HEALTH_INTELLIGENCE_SINGLE_GET_ERROR]",

      error

    );







    return NextResponse.json(

      {

        success:false,


        message:

          "Failed to fetch health intelligence",


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
// UPDATE HEALTH INTELLIGENCE
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









    if(body.title){


      body.title =


        String(body.title)

        .trim();


    }









    if(body.slug){


      body.slug =


        String(body.slug)

        .trim()

        .toLowerCase();


    }









    if(body.interpretation){


      body.interpretation =


        String(body.interpretation)

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


      await (HealthIntelligence as any)

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

          "Health intelligence not found",

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

        "Health intelligence updated successfully",



        data:updated,


      }

    );







  }


  catch(error:any){



    console.error(

      "[HEALTH_INTELLIGENCE_UPDATE_ERROR]",

      error

    );









    if(error.code === 11000){



      return NextResponse.json(

        {

          success:false,


          message:

          "Duplicate health intelligence slug",

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

        "Failed to update health intelligence",


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
// DELETE HEALTH INTELLIGENCE
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


      await (HealthIntelligence as any)

      .findByIdAndDelete(id);









    if(!deleted){


      return NextResponse.json(

        {

          success:false,


          message:

          "Health intelligence not found",

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

        "Health intelligence deleted successfully",


      }

    );




  }


  catch(error:any){



    console.error(

      "[HEALTH_INTELLIGENCE_DELETE_ERROR]",

      error

    );









    return NextResponse.json(

      {

        success:false,


        message:

        "Failed to delete health intelligence",



        error:

        error.message,


      },


      {

        status:500,

      }

    );



  }


}
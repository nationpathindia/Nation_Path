//////////////////////////////////////////////////////////////
// NATIONPATH PLANET INTELLIGENCE CMS ADMIN API
//
// GET    -> Single planet
// PUT    -> Update planet
// DELETE -> Remove planet
//
// Responsibility:
// Planet knowledge master management only.
//
// Does NOT:
// - calculate planetary positions
// - modify astro engine
// - generate predictions
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import mongoose from "mongoose";

import { connectMongoDB } from "@/lib/mongodb";

import PlanetIntelligence from "@/app/models/PlanetIntelligence";



export const dynamic = "force-dynamic";









//////////////////////////////////////////////////////////////
// GET SINGLE PLANET
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

            "Invalid Planet ID",

        },

        {

          status:400,

        }

      );


    }








    const planet =


      await (PlanetIntelligence as any)

      .findById(id)

      .lean();








    if(!planet){


      return NextResponse.json(

        {

          success:false,

          message:

            "Planet not found",

        },

        {

          status:404,

        }

      );


    }









    return NextResponse.json({

      success:true,

      data:planet,

    });



  }


  catch(error:any){


    console.error(

      "[PLANET_GET_SINGLE_ERROR]",

      error

    );




    return NextResponse.json(

      {

        success:false,

        message:

          "Failed to fetch planet",

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
// UPDATE PLANET
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

            "Invalid Planet ID",

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








    if(body.planet){


      updateData.planet =

        String(body.planet)

        .trim()

        .toLowerCase();


    }







    if(body.slug){


      updateData.slug =

        String(body.slug)

        .trim()

        .toLowerCase();


    }








    const updated =


      await (PlanetIntelligence as any)

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

            "Planet not found",

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

          "Planet updated successfully",

        data:updated,

      }

    );



  }


  catch(error:any){



    console.error(

      "[PLANET_UPDATE_ERROR]",

      error

    );





    return NextResponse.json(

      {

        success:false,

        message:

          "Failed to update planet",

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
// DELETE PLANET
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

            "Invalid Planet ID",

        },

        {

          status:400,

        }

      );


    }








    const deleted =


      await (PlanetIntelligence as any)

      .findByIdAndDelete(id);








    if(!deleted){


      return NextResponse.json(

        {

          success:false,

          message:

            "Planet not found",

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

          "Planet deleted successfully",

        data:deleted,

      }

    );





  }


  catch(error:any){



    console.error(

      "[PLANET_DELETE_ERROR]",

      error

    );






    return NextResponse.json(

      {

        success:false,

        message:

          "Failed to delete planet",

        error:

          error.message,

      },

      {

        status:500,

      }

    );


  }


}
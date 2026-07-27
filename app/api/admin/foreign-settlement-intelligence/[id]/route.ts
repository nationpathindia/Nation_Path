//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO FOREIGN SETTLEMENT INTELLIGENCE CMS ADMIN API
//
// GET    -> Single Foreign Settlement Intelligence
// PUT    -> Update Foreign Settlement Intelligence
// DELETE -> Delete Foreign Settlement Intelligence
//
// Responsibility:
// Astrology knowledge management only.
//
// Does NOT:
// - calculate astrology
// - modify prediction engine
// - modify Swiss Ephemeris
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";

import ForeignSettlementIntelligence from "@/app/models/ForeignSettlementIntelligence";



export const dynamic = "force-dynamic";









//////////////////////////////////////////////////////////////
// GET SINGLE FOREIGN SETTLEMENT INTELLIGENCE
//////////////////////////////////////////////////////////////

export async function GET(

 req:NextRequest,

 context:any

){


  try{


    await connectMongoDB();





    const { id } = context.params;






    const data =


      await (ForeignSettlementIntelligence as any)

      .findById(id)

      .lean();








    if(!data){


      return NextResponse.json(

        {

          success:false,

          message:

          "Foreign settlement intelligence not found",

        },

        {

          status:404,

        }

      );


    }








    return NextResponse.json(

      {

        success:true,

        data,

      }

    );



  }


  catch(error:any){


    console.error(

      "[FOREIGN_SETTLEMENT_INTELLIGENCE_SINGLE_GET_ERROR]",

      error

    );








    return NextResponse.json(

      {

        success:false,

        message:

        "Failed to fetch foreign settlement intelligence",

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
// UPDATE FOREIGN SETTLEMENT INTELLIGENCE
//////////////////////////////////////////////////////////////

export async function PUT(

 req:NextRequest,

 context:any

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








    const updated =


      await (ForeignSettlementIntelligence as any)

      .findByIdAndUpdate(

        id,

        body,

        {

          new:true,

        }

      );








    if(!updated){


      return NextResponse.json(

        {

          success:false,

          message:

          "Foreign settlement intelligence not found",

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

        "Foreign settlement intelligence updated successfully",

        data:updated,

      }

    );





  }


  catch(error:any){


    console.error(

      "[FOREIGN_SETTLEMENT_INTELLIGENCE_UPDATE_ERROR]",

      error

    );








    if(error.code === 11000){


      return NextResponse.json(

        {

          success:false,

          message:

          "Duplicate slug",

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

        "Failed to update foreign settlement intelligence",

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
// DELETE FOREIGN SETTLEMENT INTELLIGENCE
//////////////////////////////////////////////////////////////

export async function DELETE(

 req:NextRequest,

 context:any

){


  try{


    await connectMongoDB();





    const { id } = context.params;








    const deleted =


      await (ForeignSettlementIntelligence as any)

      .findByIdAndDelete(id);








    if(!deleted){


      return NextResponse.json(

        {

          success:false,

          message:

          "Foreign settlement intelligence not found",

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

        "Foreign settlement intelligence deleted successfully",

      }

    );





  }


  catch(error:any){


    console.error(

      "[FOREIGN_SETTLEMENT_INTELLIGENCE_DELETE_ERROR]",

      error

    );








    return NextResponse.json(

      {

        success:false,

        message:

        "Failed to delete foreign settlement intelligence",

        error:

        error.message,

      },

      {

        status:500,

      }

    );


  }


}
//////////////////////////////////////////////////////////////
// NATIONPATH BIRTH CHART INTERPRETATION CMS DYNAMIC API
//
// GET    -> Single Interpretation
// PUT    -> Update Interpretation
// DELETE -> Delete Interpretation
//
// Responsibility:
// Astrology birth chart knowledge management only.
//
// Does NOT:
// - calculate astrology
// - modify astro engine
// - modify Swiss Ephemeris
// - generate predictions
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";

import BirthChartInterpretation from "@/app/models/BirthChartInterpretation";



export const dynamic = "force-dynamic";









//////////////////////////////////////////////////////////////
// GET SINGLE INTERPRETATION
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






    const interpretation =


      await (BirthChartInterpretation as any)

      .findById(id)

      .lean();







    if(!interpretation){


      return NextResponse.json(

        {

          success:false,

          message:

            "Birth chart interpretation not found",

        },

        {

          status:404,

        }

      );


    }







    return NextResponse.json(

      {

        success:true,

        data:interpretation,

      }

    );



  }


  catch(error:any){



    console.error(

      "[BIRTH_CHART_INTERPRETATION_SINGLE_GET_ERROR]",

      error

    );





    return NextResponse.json(

      {

        success:false,

        message:

          "Failed to fetch birth chart interpretation",


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
// UPDATE INTERPRETATION
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









    if(body.subject){


      body.subject =


        String(body.subject)

        .trim();


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


      await (BirthChartInterpretation as any)

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

            "Birth chart interpretation not found",

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

          "Birth chart interpretation updated successfully",



        data:updated,


      }

    );





  }


  catch(error:any){



    console.error(

      "[BIRTH_CHART_INTERPRETATION_UPDATE_ERROR]",

      error

    );








    if(error.code === 11000){



      return NextResponse.json(

        {

          success:false,


          message:

            "Duplicate interpretation slug",


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

          "Failed to update birth chart interpretation",



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
// DELETE INTERPRETATION
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


      await (BirthChartInterpretation as any)

      .findByIdAndDelete(id);









    if(!deleted){


      return NextResponse.json(

        {

          success:false,


          message:

            "Birth chart interpretation not found",

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

          "Birth chart interpretation deleted successfully",


      }

    );



  }


  catch(error:any){



    console.error(

      "[BIRTH_CHART_INTERPRETATION_DELETE_ERROR]",

      error

    );









    return NextResponse.json(

      {

        success:false,


        message:

          "Failed to delete birth chart interpretation",



        error:

          error.message,


      },


      {

        status:500,

      }

    );



  }


}
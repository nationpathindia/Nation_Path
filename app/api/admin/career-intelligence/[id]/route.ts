//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CAREER INTELLIGENCE CMS ADMIN API
//
// GET    -> Single Career Intelligence
// PUT    -> Update Career Intelligence
// DELETE -> Delete Career Intelligence
//
// Responsibility:
// Astrology knowledge management only.
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";

import CareerIntelligence from "@/app/models/CareerIntelligence";



export const dynamic = "force-dynamic";







//////////////////////////////////////////////////////////////
// GET SINGLE CAREER INTELLIGENCE
//////////////////////////////////////////////////////////////

export async function GET(

  req:NextRequest,

  {

    params

  }:{

    params:{
      id:string
    }

  }

){


  try{


    await connectMongoDB();




    const data =


      await (CareerIntelligence as any)

      .findById(

        params.id

      )

      .lean();






    if(!data){


      return NextResponse.json(

        {

          success:false,

          message:

          "Career intelligence not found",

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

      "[CAREER_INTELLIGENCE_GET_SINGLE_ERROR]",

      error

    );





    return NextResponse.json(

      {

        success:false,

        message:

        "Failed to fetch career intelligence",

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
// UPDATE CAREER INTELLIGENCE
//////////////////////////////////////////////////////////////

export async function PUT(

 req:NextRequest,


 {

  params


 }:{

  params:{
    id:string
  }

 }

){


  try{


    await connectMongoDB();





    const body =

      await req.json();







    const data =


      await (CareerIntelligence as any)

      .findByIdAndUpdate(

        params.id,

        body,

        {

          new:true,

        }

      );







    if(!data){


      return NextResponse.json(

        {

          success:false,

          message:

          "Career intelligence not found",

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

        "Career intelligence updated successfully",

        data,

      }

    );



  }


  catch(error:any){



    console.error(

      "[CAREER_INTELLIGENCE_UPDATE_ERROR]",

      error

    );





    return NextResponse.json(

      {

        success:false,

        message:

        "Failed to update career intelligence",

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
// DELETE CAREER INTELLIGENCE
//////////////////////////////////////////////////////////////

export async function DELETE(

 req:NextRequest,


 {

  params


 }:{

  params:{
    id:string
  }

 }

){



  try{



    await connectMongoDB();






    const data =


      await (CareerIntelligence as any)

      .findByIdAndDelete(

        params.id

      );







    if(!data){


      return NextResponse.json(

        {

          success:false,

          message:

          "Career intelligence not found",

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

        "Career intelligence deleted successfully",

      }

    );





  }


  catch(error:any){



    console.error(

      "[CAREER_INTELLIGENCE_DELETE_ERROR]",

      error

    );






    return NextResponse.json(

      {

        success:false,

        message:

        "Failed to delete career intelligence",

        error:

        error.message,

      },

      {

        status:500,

      }

    );


  }


}
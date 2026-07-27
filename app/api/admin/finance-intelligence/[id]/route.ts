//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO FINANCE INTELLIGENCE CMS ADMIN API
//
// GET    -> Single Finance Intelligence
// PUT    -> Update Finance Intelligence
// DELETE -> Delete Finance Intelligence
//
// Responsibility:
// Astrology knowledge management only.
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";

import FinanceIntelligence from "@/app/models/FinanceIntelligence";



export const dynamic = "force-dynamic";









//////////////////////////////////////////////////////////////
// GET SINGLE FINANCE INTELLIGENCE
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


      await (FinanceIntelligence as any)

      .findById(

        params.id

      )

      .lean();







    if(!data){



      return NextResponse.json(

        {

          success:false,

          message:

          "Finance intelligence not found",

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

      "[FINANCE_INTELLIGENCE_GET_SINGLE_ERROR]",

      error

    );






    return NextResponse.json(

      {

        success:false,

        message:

        "Failed to fetch finance intelligence",

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
// UPDATE FINANCE INTELLIGENCE
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


      await (FinanceIntelligence as any)

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

          "Finance intelligence not found",

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

        "Finance intelligence updated successfully",


        data,


      }

    );





  }


  catch(error:any){



    console.error(

      "[FINANCE_INTELLIGENCE_UPDATE_ERROR]",

      error

    );






    return NextResponse.json(

      {


        success:false,


        message:

        "Failed to update finance intelligence",


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
// DELETE FINANCE INTELLIGENCE
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


      await (FinanceIntelligence as any)

      .findByIdAndDelete(


        params.id


      );








    if(!data){



      return NextResponse.json(

        {

          success:false,

          message:

          "Finance intelligence not found",

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

        "Finance intelligence deleted successfully",

      }

    );





  }


  catch(error:any){



    console.error(

      "[FINANCE_INTELLIGENCE_DELETE_ERROR]",

      error

    );







    return NextResponse.json(

      {

        success:false,

        message:

        "Failed to delete finance intelligence",

        error:

        error.message,

      },

      {

        status:500,

      }

    );



  }


}
//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Lagna Intelligence Dynamic API
//
// GET    : Single record
// PUT    : Update record
// DELETE : Remove record
//
// IMPORTANT:
// Knowledge management only.
// No astrology calculation.
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";

import LagnaIntelligence from "@/app/models/LagnaIntelligence";





//////////////////////////////////////////////////////////////
// GET SINGLE
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




    const data =

      await LagnaIntelligence.findById(

        params.id

      );





    if(!data){



      return NextResponse.json(


        {


          success:false,


          message:"Lagna intelligence not found",


        },


        {


          status:404,


        }


      );



    }








    return NextResponse.json({


      success:true,


      data,


    });







  }


  catch(error){



    console.error(


      "Lagna Intelligence GET ID Error:",


      error


    );





    return NextResponse.json(


      {


        success:false,


        message:"Failed to fetch record",


      },


      {


        status:500,


      }


    );



  }


}













//////////////////////////////////////////////////////////////
// UPDATE
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



    const body =

      await req.json();







    const updated =

      await LagnaIntelligence.findByIdAndUpdate(


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


          message:"Lagna intelligence not found",


        },


        {


          status:404,


        }


      );



    }







    return NextResponse.json({



      success:true,



      message:

      "Lagna intelligence updated successfully",



      data:updated,



    });








  }


  catch(error){



    console.error(


      "Lagna Intelligence UPDATE Error:",


      error


    );







    return NextResponse.json(


      {


        success:false,


        message:"Failed to update record",


      },


      {


        status:500,


      }


    );



  }


}












//////////////////////////////////////////////////////////////
// DELETE
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





    const deleted =


      await LagnaIntelligence.findByIdAndDelete(


        params.id


      );







    if(!deleted){



      return NextResponse.json(


        {


          success:false,


          message:"Lagna intelligence not found",


        },


        {


          status:404,


        }


      );



    }








    return NextResponse.json({


      success:true,


      message:

      "Lagna intelligence deleted successfully",



    });







  }


  catch(error){



    console.error(


      "Lagna Intelligence DELETE Error:",


      error


    );







    return NextResponse.json(


      {


        success:false,


        message:"Failed to delete record",


      },


      {


        status:500,


      }


    );



  }


}
//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Compatibility Intelligence Dynamic API
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

import CompatibilityIntelligence from "@/app/models/CompatibilityIntelligence";





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

      await CompatibilityIntelligence.findById(

        params.id

      );





    if(!data){



      return NextResponse.json(


        {


          success:false,


          message:"Compatibility intelligence not found",


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


      "Compatibility Intelligence GET ID Error:",


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

      await CompatibilityIntelligence.findByIdAndUpdate(


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


          message:"Compatibility intelligence not found",


        },


        {


          status:404,


        }


      );



    }







    return NextResponse.json({



      success:true,



      message:

      "Compatibility intelligence updated successfully",



      data:updated,



    });








  }


  catch(error){



    console.error(


      "Compatibility Intelligence UPDATE Error:",


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


      await CompatibilityIntelligence.findByIdAndDelete(


        params.id


      );







    if(!deleted){



      return NextResponse.json(


        {


          success:false,


          message:"Compatibility intelligence not found",


        },


        {


          status:404,


        }


      );



    }








    return NextResponse.json({


      success:true,


      message:

      "Compatibility intelligence deleted successfully",



    });







  }


  catch(error){



    console.error(


      "Compatibility Intelligence DELETE Error:",


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
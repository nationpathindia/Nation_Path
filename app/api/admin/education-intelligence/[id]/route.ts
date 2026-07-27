//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO EDUCATION INTELLIGENCE CMS DYNAMIC API
//
// GET    -> Single Education Intelligence
// PUT    -> Update Education Intelligence
// DELETE -> Delete Education Intelligence
//
// Responsibility:
// Astrology education knowledge management only.
//
// Does NOT:
// - calculate astrology
// - modify astro engine
// - modify Swiss Ephemeris
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";

import EducationIntelligence from "@/app/models/EducationIntelligence";



export const dynamic = "force-dynamic";









//////////////////////////////////////////////////////////////
// GET SINGLE EDUCATION INTELLIGENCE
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








    const education =


      await (EducationIntelligence as any)

      .findById(id)

      .lean();








    if(!education){


      return NextResponse.json(

        {

          success:false,


          message:

          "Education intelligence not found",

        },


        {

          status:404,

        }

      );


    }








    return NextResponse.json(

      {

        success:true,

        data:education,

      }

    );



  }


  catch(error:any){



    console.error(

      "[EDUCATION_INTELLIGENCE_SINGLE_GET_ERROR]",

      error

    );








    return NextResponse.json(

      {

        success:false,


        message:

          "Failed to fetch education intelligence",



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
// UPDATE EDUCATION INTELLIGENCE
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


      await (EducationIntelligence as any)

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

          "Education intelligence not found",

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

        "Education intelligence updated successfully",




        data:updated,


      }

    );






  }


  catch(error:any){



    console.error(

      "[EDUCATION_INTELLIGENCE_UPDATE_ERROR]",

      error

    );









    if(error.code === 11000){



      return NextResponse.json(

        {

          success:false,


          message:

          "Duplicate education intelligence slug",

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

        "Failed to update education intelligence",



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
// DELETE EDUCATION INTELLIGENCE
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


      await (EducationIntelligence as any)

      .findByIdAndDelete(id);









    if(!deleted){


      return NextResponse.json(

        {

          success:false,


          message:

          "Education intelligence not found",

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

        "Education intelligence deleted successfully",


      }

    );



  }


  catch(error:any){



    console.error(

      "[EDUCATION_INTELLIGENCE_DELETE_ERROR]",

      error

    );









    return NextResponse.json(

      {

        success:false,


        message:

        "Failed to delete education intelligence",




        error:

        error.message,


      },


      {

        status:500,

      }

    );



  }


}
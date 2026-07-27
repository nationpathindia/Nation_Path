//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO FINANCE INTELLIGENCE CMS ADMIN API
//
// GET  -> List Finance Intelligence
// POST -> Create Finance Intelligence
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

import FinanceIntelligence from "@/app/models/FinanceIntelligence";



export const dynamic = "force-dynamic";








//////////////////////////////////////////////////////////////
// GET ALL FINANCE INTELLIGENCE
//////////////////////////////////////////////////////////////

export async function GET(){


  try{


    await connectMongoDB();






    const data =


      await (FinanceIntelligence as any)

      .find({})

      .sort({

        createdAt:-1,

      })

      .lean();








    return NextResponse.json(

      {

        success:true,

        count:data.length,

        data,

      }

    );




  }


  catch(error:any){



    console.error(

      "[FINANCE_INTELLIGENCE_GET_ERROR]",

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
// CREATE FINANCE INTELLIGENCE
//////////////////////////////////////////////////////////////

export async function POST(

 req:NextRequest

){


 try{


    await connectMongoDB();






    const body =


      await req.json();







    if(


      !body.title ||


      !body.slug


    ){



      return NextResponse.json(

        {


          success:false,


          message:

          "Title and slug are required",


        },

        {


          status:400,


        }

      );


    }







    const slug =



      String(body.slug)

      .trim()

      .toLowerCase();







    const existing =


      await (FinanceIntelligence as any)

      .findOne({

        slug,

      });







    if(existing){



      return NextResponse.json(

        {


          success:false,


          message:

          "Finance intelligence already exists",


        },

        {


          status:409,


        }

      );



    }








    const payload = {


      ...body,



      slug,



      status:


        body.status === "published"


        ?


        "published"


        :


        "draft",


    };









    const created =


      await (FinanceIntelligence as any)

      .create(payload);









    return NextResponse.json(

      {


        success:true,


        message:


        "Finance intelligence created successfully",




        data:created,


      },

      {


        status:201,


      }

    );





 }


 catch(error:any){



    console.error(


      "[FINANCE_INTELLIGENCE_CREATE_ERROR]",


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

        "Failed to create finance intelligence",



        error:

        error.message,


      },

      {


        status:500,


      }

    );



 }


}
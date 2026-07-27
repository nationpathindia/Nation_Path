//////////////////////////////////////////////////////////////
// NATIONPATH MUHURAT CMS ADMIN API
//
// GET  -> List Muhurat database
// POST -> Create Muhurat entry
//
// Responsibility:
// Admin master data management only.
//
// Does NOT:
// - calculate muhurat
// - run astrology engine
// - generate predictions
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";

import Muhurat from "@/app/models/Muhurat";



export const dynamic = "force-dynamic";








//////////////////////////////////////////////////////////////
// GET ALL MUHURAT
//////////////////////////////////////////////////////////////

export async function GET(){


  try{


    await connectMongoDB();





    const list =


      await (Muhurat as any)

        .find({})

        .sort({

          createdAt:-1,

        })

        .lean();








    return NextResponse.json(

      {


        success:true,


        count:list.length,


        data:list,


      }


    );



  }


  catch(error:any){


    console.error(

      "[MUHURAT_GET_ERROR]",

      error

    );





    return NextResponse.json(

      {


        success:false,


        message:

          "Failed to fetch Muhurat data",


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
// CREATE MUHURAT
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

      !body.slug ||

      !body.date

    ){


      return NextResponse.json(

        {


          success:false,


          message:

            "Title, slug and date are required",


        },


        {


          status:400,


        }


      );


    }









    const title =

      String(body.title)

      .trim();






    const slug =

      String(body.slug)

      .trim()

      .toLowerCase();









    const existing =


      await (Muhurat as any)

      .findOne({

        slug,

      });








    if(existing){


      return NextResponse.json(

        {


          success:false,


          message:

            "Muhurat already exists",


        },


        {


          status:409,


        }


      );


    }









    const payload = {



      title,



      slug,



      category:

        body.category || "Puja",





      date:

        body.date,








      timing:{


        start:

          body.timing?.start || "",



        end:

          body.timing?.end || "",


      },








      astrology:{


        tithi:

          body.astrology?.tithi || "",



        nakshatra:

          body.astrology?.nakshatra || "",



        yoga:

          body.astrology?.yoga || "",


      },









      suitableFor:

        Array.isArray(body.suitableFor)

        ?

        body.suitableFor

        :

        [],








      avoidFor:

        Array.isArray(body.avoidFor)

        ?

        body.avoidFor

        :

        [],









      benefits:

        Array.isArray(body.benefits)

        ?

        body.benefits

        :

        [],









      description:

        body.description || "",









      doshaRules:

        body.doshaRules || "",









      seo:{


        title:

          body.seo?.title || "",



        description:

          body.seo?.description || "",


      },








      status:


        body.status === "published"

        ?

        "published"

        :

        "draft",



    };









    const muhurat =


      await (Muhurat as any)

      .create(payload);









    return NextResponse.json(

      {


        success:true,


        message:

          "Muhurat created successfully",


        data:muhurat,


      },


      {


        status:201,


      }


    );






  }


  catch(error:any){



    console.error(

      "[MUHURAT_CREATE_ERROR]",

      error

    );






    if(error.code === 11000){


      return NextResponse.json(

        {


          success:false,


          message:

            "Duplicate Muhurat entry",


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

          "Failed to create Muhurat",


        error:

          error.message,


      },


      {


        status:500,


      }


    );



  }


}
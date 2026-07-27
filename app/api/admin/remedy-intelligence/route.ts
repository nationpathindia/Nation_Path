//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO REMEDY INTELLIGENCE CMS ADMIN API
//
// GET  -> List remedies
// POST -> Create remedy
//
// Responsibility:
// Astrology remedy knowledge management only.
//
// Does NOT:
// - calculate remedies
// - modify astro engine
// - generate predictions
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";

import RemedyIntelligence from "@/app/models/RemedyIntelligence";



export const dynamic = "force-dynamic";







//////////////////////////////////////////////////////////////
// GET ALL REMEDIES
//////////////////////////////////////////////////////////////

export async function GET(){


  try{


    await connectMongoDB();




    const remedies =


      await (RemedyIntelligence as any)

      .find({})

      .sort({

        createdAt:-1,

      })

      .lean();







    return NextResponse.json(

      {


        success:true,


        count:remedies.length,


        data:remedies,


      }


    );



  }


  catch(error:any){



    console.error(

      "[REMEDY_INTELLIGENCE_GET_ERROR]",

      error

    );







    return NextResponse.json(

      {


        success:false,


        message:

          "Failed to fetch remedies",



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
// CREATE REMEDY
//////////////////////////////////////////////////////////////

export async function POST(

  req:NextRequest

){


  try{


    await connectMongoDB();





    const body =

      await req.json();









    if(

      !body.remedy ||

      !body.slug

    ){


      return NextResponse.json(

        {


          success:false,


          message:

            "Remedy name and slug are required",


        },


        {


          status:400,


        }


      );


    }









    const remedy =


      String(body.remedy)

      .trim();







    const slug =


      String(body.slug)

      .trim()

      .toLowerCase();









    const existing =


      await (RemedyIntelligence as any)

      .findOne({

        slug,

      });









    if(existing){


      return NextResponse.json(

        {


          success:false,


          message:

            "Remedy already exists",


        },


        {


          status:409,


        }


      );


    }













    const payload = {





      remedy,





      slug,






      category:


        body.category || "other",






      relatedPlanets:


        body.relatedPlanets || [],






      relatedDoshas:


        body.relatedDoshas || [],






      relatedProblems:


        body.relatedProblems || [],






      description:


        body.description || "",






      benefits:


        body.benefits || [],






      procedure:


        body.procedure || "",






      materials:


        body.materials || [],






      duration:


        body.duration || "",






      precautions:


        body.precautions || [],






      suitableFor:


        body.suitableFor || [],






      avoidFor:


        body.avoidFor || [],






      mantra:


        body.mantra || "",






      gemstone:


        body.gemstone || "",






      metal:


        body.metal || "",






      day:


        body.day || "",






      color:


        body.color || "",






      media:


        body.media || {},






      seo:


        body.seo || {},






      status:


        body.status === "published"

        ?

        "published"

        :

        "draft",



    };












    const created =


      await (RemedyIntelligence as any)

      .create(payload);









    return NextResponse.json(

      {


        success:true,


        message:

          "Remedy intelligence created successfully",



        data:created,


      },


      {


        status:201,


      }


    );






  }


  catch(error:any){





    console.error(

      "[REMEDY_INTELLIGENCE_CREATE_ERROR]",

      error

    );








    if(error.code === 11000){


      return NextResponse.json(

        {


          success:false,


          message:

            "Duplicate remedy entry",


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

          "Failed to create remedy",



        error:

          error.message,


      },


      {


        status:500,


      }


    );



  }


}